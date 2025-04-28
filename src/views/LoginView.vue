<!-- 로그인 페이지 -->
<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title>로그인</v-card-title>
        <v-card-text>
          <v-text-field label="행번" v-model="userNo" type="number" />
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
          await axios.post('http://localhost:8080/user/login',{
            userNo: this.userNo,
            password: this.password
          },);//{ withCredentials: true });

          axios.defaults.withCredentials = true; // 홈화면으로 가든 , 새요청을 하든 쿠키가 무조건 같이 가도록 ( 로그인 세션 유지 )
          
          alert(`로그인 성공! `)
          this.$router.push('/')    //  홈화면으로 이동

        } catch (err) {
          alert('로그인 실패')
        }
      }
    }
  }
  </script>