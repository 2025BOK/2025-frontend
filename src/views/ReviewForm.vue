<!-- 리뷰 등록 페이지 -->
<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title class="headline">리뷰 등록</v-card-title>
      <v-card-text>
        <v-textarea v-model="reviewDate" label="방문 날짜짜" auto-grow outlined />
        <v-textarea v-model="reviewCtn" label="리뷰 내용" auto-grow outlined />
        <v-text-field v-model.number="reviewRate" label="평점 (0.0 ~ 5.0)" type="number" step="0.1" min="0" max="5" />
        <v-text-field v-model="reviewImg" label="이미지 url(선택)" />
        <v-select
          v-model="reviewType1"
          :items="type1Options"
          label="음식 종류"
          item-text="text"
          item-value="value"
          dense
          outlined
        />
        <v-select
          v-model="reviewType2"
          :items="type2Options"
          item-text="text"
          item-value="value"
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
      reviewDate:'',
      reviewRate: '',
      reviewCtn: '',
      reviewImg: '',
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
      ],
      filter: {
        reviewType1: null,
        reviewType2: null
      }
    }
  },
  methods: {
  async submitReview() {
    const storeNo = this.$route.params.storeNo;
    try {
      const response = await axios.post(`http://localhost:8080/review/${storeNo}/register`, {
        reviewDate: this.reviewDate,
        reviewRate: this.reviewRate,
        reviewCtn: this.reviewCtn,
        reviewType1: this.reviewType1,
        reviewType2: this.reviewType2,
        reviewImg: this.reviewImg 
        }
      )

      const reviewNo = response.data.reviewNo;  // 서버에서 리뷰 번호를 받는다
      alert('리뷰 등록 성공!')

      // 리뷰 상세 페이지로 리다이렉트
      this.$router.push(`/review/${reviewNo}`) // 해당 리뷰의 상세 페이지로 이동

    } catch (err) {
      console.error('❌ 리뷰 등록 실패:', err.response?.data || err.message);
      alert('리뷰 등록 실패!');
    }
    }
  }
}
</script>