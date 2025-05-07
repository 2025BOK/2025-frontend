<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title>
        <v-row align="center" justify="space-between" class="w-100">
          <div class="headline">{{ store.storeNm }}</div>
          <v-btn color="green" small class="mt-4" @click="goToReviewForm">리뷰 등록하기</v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <p><strong>위치:</strong> {{ store.storeLoc }}</p>
        <p><strong>평균 점수:</strong> {{ store.rateAverage ?? '평점 없음' }}</p>
        <p><strong>음식 종류 (reviewType1):</strong> {{ store.reviewType1 ?? '없음' }}</p>
        <p><strong>식당 분위기 (reviewType2):</strong> {{ store.reviewType2 ?? '없음' }}</p>

        <v-divider class="my-4" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StoreDetail',
  data() {
    return {
      store: {}
    }
  },
  created() {
    this.fetchStoreDetail()
  },
  methods: {
    async fetchStoreDetail() {
      const storeNo = this.$route.params.storeNo
      try {
        const res = await axios.get(`http://localhost:8080/store/${storeNo}`)
        console.log('가게 상세:', res.data)
        this.store = res.data // ✅ 서버 응답을 실제로 세팅
      } catch (error) {
        console.error('가게 상세 조회 실패', error)
      }
    },
    goToReviewForm() {
      const storeNo = this.$route.params.storeNo
      this.$router.push(`/review/${storeNo}/register`)
    }
  }
}
</script>