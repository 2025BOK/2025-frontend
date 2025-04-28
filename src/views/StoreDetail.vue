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

        <h3>리뷰 목록</h3>
        <v-list dense v-if="store.reviewList?.length">
          <v-list-item v-for="(review, index) in store.reviewList" :key="index">
            <v-list-item-content>
              <v-list-item-title>리뷰 #{{ review.reviewNo || index + 1 }}</v-list-item-title>
              <v-list-item-subtitle>{{ review.content || '내용 없음' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <p v-else>등록된 리뷰가 없습니다.</p>
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