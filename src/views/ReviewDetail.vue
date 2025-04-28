<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title class="headline">
          리뷰 상세 
          <span v-if="review && review.storeEntity">
          (가게이름: {{ review.storeEntity.storeNm }})
        </span>
        </v-card-title>
        <v-card-text>
  
          <!-- 에러 발생 시 -->
          <div v-if="error">
            <v-alert type="error">리뷰를 불러오는 데 실패했습니다.</v-alert>
          </div>
  
          <!-- 아직 로딩 중이거나, 데이터가 없을 때 -->
          <div v-else-if="!review">
            <p>로딩 중이거나, 리뷰를 찾을 수 없습니다.</p>
          </div>
  
          <!-- 정상적으로 review가 있을 때 -->
          <div v-else>
            <v-list two-line>
              <!-- 리뷰 내용 -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>내용</v-list-item-title>
                  <v-list-item-subtitle>{{ review.reviewCtn }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
  
              <!-- 평점 -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>평점</v-list-item-title>
                  <v-list-item-subtitle>{{ review.reviewRate }} / 5.0</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
  
              <!-- 이미지 (선택) -->
              <v-list-item v-if="review.reviewImg">
                <v-list-item-content>
                  <v-list-item-title>이미지</v-list-item-title>
                  <v-list-item-subtitle>
                    <a :href="review.reviewImg" target="_blank">사진 보기</a>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
  
              <!-- 음식 종류 -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>음식 종류</v-list-item-title>
                  <v-list-item-subtitle>{{ review.reviewType1 }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
  
              <!-- 식당 분위기 -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>식당 분위기</v-list-item-title>
                  <v-list-item-subtitle>{{ review.reviewType2 }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
  
          <!-- 뒤로 가기 -->
          <v-btn color="primary" class="mt-4" @click="goBack">
            뒤로 가기
          </v-btn>
  
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ReviewDetail',
    // 라우터에서 넘어온 파라미터(reviewNo)를 props로 받음
    props: ['reviewNo'],
  
    data() {
      return {
        review: null,  // 서버에서 받아온 리뷰 객체
        error: false   // 에러 표시 플래그
      };
    },
  
    created() {
      this.loadReview();
    },
  
    methods: {
      async loadReview() {
        try {
          // proxy 설정이 되어 있으면 도메인 없이 절대 경로 호출
          const res = await axios.get(`/review/${this.reviewNo}`, {
            withCredentials: true
          });
          this.review = res.data;
        } catch (e) {
          console.error('리뷰 불러오기 실패:', e);
          this.error = true;
        }
      },
  
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>