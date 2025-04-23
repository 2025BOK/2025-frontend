<!--리뷰 등록 페이지-->


<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title class="headline">리뷰 등록</v-card-title>
        <v-card-text>
          <v-textarea v-model="reviewCtn" label="리뷰 내용" auto-grow outlined />
          <v-text-field v-model.number="reviewRate" label="평점 (0.0 ~ 5.0)" type="number" step="0.1" min="0" max="5" />
  
          <v-text-field v-model="reviewImg" label="이미지 URL (선택)" />
  
          <v-select
            v-model="reviewType1"
            :items="type1options"
            label="음식 종류"
            dense
            outlined
          />
          <v-select
            v-model="reviewType2"
            :items="type2options"
            label="식당 분위기"
            dense
            outlined
          />
  
          <v-btn color="green" class="mt-4" @click="submitReview">
            리뷰 등록하기
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'ReviewForm',
    data() {
      return {
        userNo: 1, // 현재 로그인 기능 없으므로 더미값 생성성
        reviewRate: 4.0,
        reviewImg: '',
        reviewCtn: '',
        reviewType1: '',
        reviewType2: '',
        type1Options: [
          { text: '한식', value: '1' },
          { text: '중식', value: '2' },
          { text: '일식', value: '3' },
          { text: '양식', value: '4' },
          { text: '동남아', value: '5' },
          { text: '분식식', value: '6' }
        ],
        type2Options: [
          { text: '혼밥 가능', value: '1' },
          { text: '트렌디함', value: '2' },
          { text: '가성비', value: '3' },
          { text: '단체 회식', value: '4' },
          { text: '테이크아웃만 가능', value: '5' }
        ]
      }
    },
    methods: {
      async submitReview() {
        const storeNo = this.$route.params.storeNo
        try {
          await axios.post(`/review/${storeNo}/register`, {
            userNo: this.userNo,
            reviewRate: this.reviewRate,
            reviewImg: this.reviewImg,
            reviewCtn: this.reviewCtn,
            reviewType1: this.reviewType1,
            reviewType2: this.reviewType2
          })
          alert('리뷰가 등록되었습니다!')
          this.$router.push(`/store/${storeNo}`)
        } catch (err) {
          alert('리뷰 등록 실패!')
        }
      }
    }
  }
  </script>
