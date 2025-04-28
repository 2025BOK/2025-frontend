<!-- 홈화면 페이지 -->

<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title class="headline">BOK 밥상</v-card-title>
      <v-card-subtitle>한은 직원을 위한 맛집 추천 앱입니다.</v-card-subtitle>

      <!-- 로그인 폼 -->
      <v-form @submit.prevent="login">
        <v-text-field v-model="userNo" label="행번" type="number" required />
        <v-text-field v-model="password" label="비밀번호" type="password" required />
        <v-btn color="success" class="mt-4" type="submit">로그인</v-btn>
      </v-form>

      <v-divider class="my-4"></v-divider>

      <!-- 맛집 목록 이동 -->
      <v-btn color="primary" @click="$router.push('/store')">맛집 목록 보러가기</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userNo: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:8080/user/login', {
          userNo: this.userNo,
          password: this.password
        }, {
          withCredentials: true
        });
        alert(`로그인 성공! 사용자 이름: ${res.data.userNm || '정보없음'}`)
        // 로그인 성공 후 홈 리로드 (혹은 맛집 목록으로 바로 이동)
        this.$router.push('/store');
      } catch (err) {
        alert('로그인 실패! 행번 또는 비밀번호를 확인해주세요.');
      }
    }
  }
}
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>