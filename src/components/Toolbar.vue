<template>
    <v-app-bar
      app
      color="blue lighten-5"
      elevate-on-scroll
      flat
      class="app-toolbar"
    >
      <!-- 로고와 제목 -->
      <v-toolbar-title class="d-flex align-center">
        <v-img
          src="@/assets/bok.png"
          contain
          max-height="36"
          class="mr-2"
        />
        <span class="title">BOK 밥상</span>
      </v-toolbar-title>
  
      <v-spacer />
  
      <!-- 내비게이션 버튼 -->
      <v-btn text class="nav-btn" @click="$router.push('/home')">
        Home
      </v-btn>
      <v-btn text class="nav-btn" @click="$router.push('/store')">
        맛집
      </v-btn>
      <v-btn text class="nav-btn" @click="$router.push('/user/login')">
        로그인
      </v-btn>
  
      <!-- 사용자 아이콘 -->
      <v-btn icon class="nav-btn-icon" @click="$router.push('/user/login')">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'AppToolbar'
  };
  </script>
  
  <style scoped>
  .app-toolbar {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-family: bold;
    font-weight: 800;
    font-size: 1.6rem;
    color: #2e3b55;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .nav-btn {
    font-family: bold;
    font-weight: 700;
    font-size: 1rem;
    color: #2e3b55;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    margin: 0 6px;
  }
  
  .nav-btn:hover {
    color: #1e2a42;
  }
  
  .nav-btn-icon .v-icon {
    font-size: 1.4rem;
    color: #2e3b55;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  }
  
  .nav-btn-icon:hover .v-icon {
    color: #1e2a42;
  }
  </style>
  