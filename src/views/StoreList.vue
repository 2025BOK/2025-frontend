<!-- 가게목록 조회 페이지 : 목록조회 , 검색 , 삭제 , 수정 버튼 추가가-->
<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>가게 목록</span>
        <v-spacer />
        <v-btn color="primary" small @click="goToRegister">
          가게 등록
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="filter.reviewType1"
              :items="type1Options"
              label="음식 종류"
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="filter.reviewType2"
              :items="type2Options"
              label="분위기"
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-btn color="grey" small @click="searchStores">검색</v-btn>
            <v-btn color="pink darken-1" small class="ml-2" dark @click="resetFilter">
              초기화
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="stores"
        :loading="loading"
        class="elevation-1"
      >
        <template #item.actions="{ item }">
          <v-btn color="green" small class="mr-2" @click="goToReview(item.storeNo)">리뷰 등록</v-btn>
          <v-btn color="blue" small class="mr-2" @click="goEdit(item.storeNo)">
            수정
          </v-btn>
          <v-btn color="red" small dark @click="confirmDelete(item.storeNo)">
            삭제
          </v-btn>
        </template>
      </v-data-table>
      <v-list two-line>
        <v-list-item v-for="store in stores" :key="store.storeNo" @click="goDetail(store)">
          <v-list-content>
            <v-list-item-title>{{store.storeNm}}</v-list-item-title>
            <v-list-item-subtitle>{{store.storeLoc}}</v-list-item-subtitle>
          </v-list-content>
        </v-list-item>
      </v-list>
      <template v-if="stores.length === 0 && !loading">
        <v-card-text class="text-center py-4">
          등록된 가게가 없습니다.
        </v-card-text>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StoreList',
  data() {
    return {
      stores: [], // 가게 목록
      filter: {
        reviewType1: null,
        reviewType2: null
      },
      type1Options: [
        { text: '전체', value: null },
        { text: '한식', value: 1 },
        { text: '일식', value: 2 },
        { text: '중식', value: 3 },
        { text: '양식', value: 4 },
        { text: '동남아', value: 5 },
        { text: '분식', value: 6 }

      ],
      type2Options: [
        { text: '전체', value: null },
        { text: '격식 있는', value: 1 },
        { text: '조용한', value: 2 },
        { text: '인스타 감성', value: 3 },
        { text: '단체 좌석 보유', value: 4 },
        { text: '가성비', value: 5 }
      ],
      headers: [
        { text: '가게 번호', value: 'storeNo' },
        { text: '가게 이름', value: 'storeNm' },
        { text: '가게 위치', value: 'storeLoc' },
        { text: '동작', value: 'actions', sortable: false }
      ],
      loading: false
    }
  },
  created() {
    this.fetchStores()
  },
  methods: {
    async fetchStores() {
      this.loading = true
      try {
        const res = await axios.get('http://localhost:8080/store')
        console.log('✅ 가져온 가게 목록:', res.data)
        this.stores = res.data
      } catch (err) {
        console.error('❌ 가게 목록 조회 실패:', err)
        alert('가게 목록을 불러오지 못했습니다.')
      } finally {
        this.loading = false
      }
    },

    async searchStores() {
      try {
        const res = await axios.post('http://localhost:8080/store/search', {
          reviewType1: this.filter.reviewType1,
          reviewType2: this.filter.reviewType2
        })
        this.stores = res.data
        //url 쿼리에도 반영
        this.$router.replace({ query: { ...this.filter } })
      } catch (err) {
        console.error('❌ 검색 실패:', err)
        alert('검색 실패')
      }
    },
    goToReview(storeNo) {
  this.$router.push(`/review/${storeNo}/register`);
    },
    async confirmDelete(storeNo) {
      if (!confirm('정말 삭제하시겠습니까?')) return
      try {
        await axios.delete(`http://localhost:8080/store/${storeNo}`)
        alert('삭제 완료!')
        this.fetchStores()
      } catch (err) {
        console.error('❌ 삭제 실패:', err)
        alert('삭제 실패')
      }
    },
    resetFilter() {
      this.filter.reviewType1 = null
      this.filter.reviewType2 = null
      this.fetchStores()
    },
    goDetail(store) {
      this.$router.push(`/store/${store.storeNo}`)
    },
    goEdit(storeNo) {
      this.$router.push(`/store/edit/${storeNo}`)
    },
    goToRegister() {
      this.$router.push('/store/register')
    },
    mounted() {
    // URL 쿼리가 있으면 필터에 적용
    if (this.$route.query.reviewType1) {
      this.filter.reviewType1 = Number(this.$route.query.reviewType1)
    }
    if (this.$route.query.reviewType2) {
      this.filter.reviewType2 = Number(this.$route.query.reviewType2)
      }
    }
  }
}
</script>