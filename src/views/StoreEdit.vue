<!-- 가게 수정정 페이지-->

<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title>가게 수정</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="storeNm"
          label="가게 이름"
          required
          outlined
        />
        <v-text-field
          v-model="storeLoc"
          label="가게 위치"
          required
          outlined
        />
        <v-select
          v-model="reviewType1"
          :items="type1Options"
          label="음식 종류 선택"
          dense
          outlined
        />
        <v-select
          v-model="reviewType2"
          :items="type2Options"
          label="분위기 선택"
          dense
          outlined
        />
        <v-btn
          color="primary"
          class="mt-4"
          block
          @click="updateStore"
        >
          수정 완료
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StoreEdit',
  data() {
    return {
      storeNo: null,
      storeNm: '',
      storeLoc: '',
      reviewType1: null,
      reviewType2: null,
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
      ]
    }
  },
  created() {
    this.storeNo = this.$route.params.storeNo
    this.fetchStore()
  },
  methods: {
    async fetchStore() {
      try {
        const res = await axios.get(`http://localhost:8080/store/${this.storeNo}`)
        const store = res.data
        this.storeNm = store.storeNm
        this.storeLoc = store.storeLoc
        this.reviewType1 = store.reviewType1
        this.reviewType2 = store.reviewType2
      } catch (err) {
        console.error('❌ 가게 정보 불러오기 실패:', err)
        alert('가게 정보를 불러올 수 없습니다.')
      }
    },
    async updateStore() {
      try {
        await axios.put(`http://localhost:8080/store/${this.storeNo}`, {
          storeNm: this.storeNm,
          storeLoc: this.storeLoc,
          reviewType1: this.reviewType1,
          reviewType2: this.reviewType2
        })
        alert('수정 완료!')
        this.$router.push('/store')
      } catch (err) {
        console.error('❌ 수정 실패:', err)
        alert('수정에 실패했습니다.')
      }
    }
  }
}
</script>