<!-- 리뷰 등록 페이지 -->
<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title class="headline">리뷰 작성하기✍🏻</v-card-title>
      <v-card-text>
        <v-textarea v-model="reviewCtn" label="리뷰내용" auto-grow outlined />
        <v-text-field
          v-model="reviewRate"
          label="리뷰평점 (0.0 ~ 5.0)"
          type="text"
          outlined
          @input="validateReviewRate"
        />
        <v-file-input
          v-model="reviewImg"
          label="이미지 업로드 (선택)"
          accept="image/*"
          prepend-icon="mdi-camera"
        />
        <div v-if="reviewImg">
          <img :src="previewUrl" alt="업로드한 이미지" style="max-width: 300px; margin-top: 20px;" />
        </div>

        <v-select
          v-model="reviewType1"
          :items="type1Options"
          item-text="text"
          item-value="value"
          label="음식 종류"
          outlined
        />
        <v-select
          v-model="reviewType2"
          :items="type2Options"
          item-text="text"
          item-value="value"
          label="분위기"
          outlined
        />
        <div class="btn-box">
          <v-btn class="mt-4" @click="goBack">뒤로 가기</v-btn>
          <v-btn color="#87CEEB" class="mt-4" @click="submitReview">
            리뷰 등록하기
          </v-btn>
        </div>
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
      storeNo: 1,
      userNo: 1,
      reviewRate: 0.0,
      reviewImg: '',
      reviewCtn: '',
      reviewType1: '',
      reviewType2: '',
      previewUrl: null,

      type1Options: [
        { text: '한식', value: 1 },
        { text: '중식', value: 2 },
        { text: '일식', value: 3 },
        { text: '양식', value: 4 },
        { text: '동남아', value: 5 },
        { text: '분식', value: 6 }
      ],
      type2Options: [
        { text: '혼밥 가능', value: 1 },
        { text: '트렌디함', value: 2 },
        { text: '가성비', value: 3 },
        { text: '단체 회식', value: 4 },
        { text: '테이크아웃만 가능', value: 5 },
        { text: '동네 밥집', value: 6 }
      ]
    }
  },
  methods: {
    async submitReview() {
      if (!this.reviewCtn || !this.reviewType1 || !this.reviewType2) {
        alert('모든 항목을 입력해주세요.');
        return;
      }

      const formData = new FormData();

      // ★ dto를 JSON → Blob으로 감싸서 추가
      const dto = {
        userNo: this.userNo,
        reviewRate: this.reviewRate,
        reviewCtn: this.reviewCtn,
        reviewType1: this.reviewType1,
        reviewType2: this.reviewType2,
      };

      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      // ★ reviewImg 추가
      if (this.reviewImg) {
        formData.append('reviewImg', this.reviewImg);
      }

      const storeNo = this.$route.params.storeNo || this.storeNo;

      try {
      
        const response = await axios.post(
          `http://localhost:8080/review/${storeNo}/register`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        console.log(response.data);
        //const reviewNo = response.data; 
        alert('리뷰가 등록되었습니다!');
        this.$router.push(`/store`);
      } catch (err) {
        console.error(err);
        alert('리뷰 등록에 실패했습니다!');
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      window.history.back();
    },
    validateReviewRate() {
      if (this.reviewRate !== '') {
        let parsed = parseFloat(this.reviewRate);
        if (!isNaN(parsed)) {
          if (parsed < 0) parsed = 0;
          if (parsed > 5) parsed = 5;
          this.reviewRate = parsed;
        }
      }
    },
  },
  created() {
    console.log("hello!");
  },
  watch: {
    reviewImg(newFile) {
      if (newFile) {
        this.previewUrl = URL.createObjectURL(newFile);
      } else {
        this.previewUrl = null;
      }
    }
  }
}
</script>

<style>
.btn-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
