<!-- 리뷰 상세 페이지 -->


<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title class="headline">{{ store.storeNm }}
            <v-btn color="green" small calss="mt-4" @click="goToReviewForm">가게 등록</v-btn>
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
  //import axios from 'axios'
  
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
       // const storeNo = this.$route.params.storeNo
  
        // 더미 데이터 사용
        // const res = await axios.get(`/store/${storeNo}`)
  
        this.store = {
          storeNm: '참치공방',
          storeLoc: '서울 중구 세종대로 64 1층',
          rateAverage: 4.5,
          reviewType1: 1,  // 음식 종류 예시 (1: 한식)
          reviewType2: 2,  // 분위기 예시 (2: 조용함)
          reviewList: [
            { reviewNo: 1, content: '신선하고 맛있어요!' },
            { reviewNo: 2, content: '분위기가 좋아요.' }
          ]
        }
      },
      goToreviewForm() { // 상세페이지만 리뷰 등록버튼이 보임
      this.$router.push(`/store/${this.$route.params.storeNo}/review/register`)
    }
    }
  }
  </script>