<template>
  <v-app>
    <router-view />

  </v-app>
</template>

<script>
export default {
  components: {
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