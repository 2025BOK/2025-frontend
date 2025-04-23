// 로그인 페이지
<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title>로그인</v-card-title>
        <v-card-text>
          <v-text-field label="행번번" v-model="userNo" type="number" />
          <v-text-field label="비밀번호" v-model="password" type="password" />
          <v-btn color="success" @click="login">로그인</v-btn>
        </v-card-text>
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
          const res = await axios.post('/user/login', {
            userNo: this.userNo,
            password: this.password
          })
          alert('로그인 성공! 사용자 이름: ' + res.data.userNm)
          // 이후 페이지로 라우팅
        } catch (err) {
          alert('로그인 실패')
        }
      }
    }
  }
  </script>