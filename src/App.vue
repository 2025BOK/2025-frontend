
<template>
  <v-app>
    <Toolbar/>
      <!-- 페이지 콘텐츠: 툴바와 푸터 사이 -->
    <v-main>
      <router-view />
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<script>
import AppFooter from '@/components/Footer.vue';
import Toolbar from '@/components/Toolbar.vue';

export default {
  name:'App',
  components: {
    AppFooter,
    Toolbar
  },

  mounted() {
    fetch("http://localhost:8080/api/Home")
      .then(res => res.text())
      .then(data => console.log("✅ 백엔드 응답:", data))
      .catch(err => console.error("❌ 통신 실패:", err));
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>