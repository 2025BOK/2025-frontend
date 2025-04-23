<!--가게 목록 페이지 : 등록된 가게들의 리스트를 보여주는 페이지 -->

<template>
    <v-container>
      <v-card>
        <v-card-title>
          <span>가게 목록</span>
          <v-spacer />
          <!--v-select로 필터 2개 생성-->
          <v-select
            v-model="filter.reviewType1"
            :items="type1options"
            label="음식 종류"
            dense
            style="max-width: 150px"
            class="mr-2"
            />
          <v-select
          v-model="filter.reviewType2"
            :items="type2options"
            label="분위기"
            dense
            style="max-width: 150px"
            class="mr-2"
            />
          <v-btn color="gray" small class="mr-3" @click="searchStores">검색</v-btn>
          <v-btn color="pink darken-1" small dark class="mr-3" @click="resetFilter">초기화</v-btn>    
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="stores"
          class="elevation-1"
        >
          <template #item.actions="{ item }">
            <v-btn color="gray" small class="mr-2" @click="goEdit(item.storeNo)">수정</v-btn>
            <v-btn color="pink darken-1" small dark @click="deleteStore(item.storeNo)">삭제</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </template>
  
<script>
  import axios from 'axios'
  
  export default {
  name: 'StoreList',
  data() {
    return {
        filter:{
            reviewType1: null,
            reviewType2: null
        },
        type1options: [
            { text: '전체', value: null },
            { text: '한식', value: 1 },
            { text: '일식', value: 2 },
            { text: '중식', value: 3 },
            { text: '양식', value: 4 },
            { text: '분식', value: 5 }
        ],
        type2options: [
            { text: '전체', value: null },
            { text: '분위기 있는', value: 1 },
            { text: '조용한', value: 2 },
            { text: '인스타 감성', value: 3 },
            { text: '격식 있는', value: 4 }
        ],
      headers: [
        { text: '가게 번호', value: 'storeNo' },
        { text: '이름', value: 'storeNm' },
        { text: '위치', value: 'storeLoc' },
        { text: '동작', value: 'actions', sortable: false } // 수정 , 삭제 버튼 동작작
      ],
      stores: []
    }
  },
  created() {
    this.fetchStores()
  },
  methods: {
    async fetchStores() {

    // 임시 더미 데이터 등록 
    this.stores=[
        {
            storeNo: 1,
            storeNm: '참치공방',
            storeLoc: '서울 중구 세종대로 64 1층'
        },
        {
            storeNo: 2,
            storeNm: '금성회관',
            storeLoc: '서울 중구 남대문로1길 30 1층'
        }
    ]
      try {
        const res = await axios.get('/store')
        this.stores = res.data
      } catch (err) {
        alert('가게 목록을 불러오지 못했습니다.') // 에러 뜰시시
      }
    },
    async deleteStore(storeNo) { // 삭제시
      if (!confirm('정말 삭제하시겠습니까?')) return 
      try {
        await axios.delete(`/store/${storeNo}`)
        alert('삭제 완료!')
        this.fetchStores()
      } catch (err) {
        alert('삭제 실패')
      }
    },
    goEdit(storeNo) { //
      this.$router.push(`/store/edit/${storeNo}`)
    }
  
  }
}
</script>