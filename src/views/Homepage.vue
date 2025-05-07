<!--첫 페이지-->

<template>
    <v-container class="home" fluid>
      <div class="logo-container mx-auto">
        <!-- 한국은행 로고 -->
        <v-img
          :src="require('@/assets/bok.png')"
          contain
          class="bank-logo"
        />
        <!-- 귀여운 밥상 일러스트 -->
        <v-img
          :src="require('@/assets/bowl.png')"
          contain
          class="bowl-logo"
        />
      </div>
  
      <div class="text-center mt-8">
        <h1 class="title">BOK 밥상</h1>
        <p class="subtitle">한은 직원의 맛있는 밥상을 위하여 !</p>
      </div>

    <!-- 버튼 그룹: 로그인 & 맛집 목록 이동 -->
    <div class="button-group text-center mt-6">
      <v-btn
        color="secondary"
        class="mr-4"
        rounded
        elevation="2"
        @click="$router.push('user/login')"
      >
        로그인
      </v-btn>
      <v-btn
        color="primary"
        rounded
        elevation="2"
        @click="$router.push('/store')"
      >
        맛집 목록 보러가기
      </v-btn>
    </div>
  </v-container>
</template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
    .home {
      /* Toolbar(64px) + Footer(56px) 높이를 뺀 영역을 중앙 정렬 */
      min-height: calc(100vh - 64px - 56px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
  /* 로고와 일러스트 겹치기 */
  .logo-container {
    position: relative;
    width: 200px;
    height: 120px;
  }
  .bank-logo {
    width: 100%;
    height: auto;
  }
  .bowl-logo {
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 60%;
    height: auto;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }
  
  /* 제목 스타일 */
  .title {
    font-size: 3rem;
    font-weight: 700;
    color: #2e3b55;
    margin: 0;
  }
.subtitle {
  /* 귀여운 볼드폰트, 웹 안전 폰트 대체 */
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #555;
  margin-top: 8px;
}
  /* 버튼 그룹 스타일 */
.button-group {
  display: flex;
  justify-content: center;
}
  </style>