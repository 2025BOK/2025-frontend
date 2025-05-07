<template>
  <v-footer padless class="footer">
    <v-container>
      <v-row justify="center">
        <v-col class="text-center">
          madeby@김헌재@여다영@전가람
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  padding: 16px 0;
    /* 화면 하단에 고정 */
  width: 100%;
}
</style>