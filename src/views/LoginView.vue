<!-- 로그인 페이지 -->
<template>
  <v-container fluid class="login-container">
    <v-card class="login-card" flat>
      <!-- Avatar Icon -->
      <div class="avatar-wrapper">
        <v-avatar size="80" class="avatar">
          <v-icon large>mdi-account-circle</v-icon>
        </v-avatar>
      </div>

      <v-card-title class="justify-center">로그인</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="userNo"
            label="행번"
            type="number"
            prepend-inner-icon="mdi-account"
            outlined
            dense
            class="field"
          />
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            prepend-inner-icon="mdi-lock"
            outlined
            dense
            class="field"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center login-action">
        <v-btn color="primary" large rounded @click="login">
          LOGIN
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginView',
  data() {
    return {
      userNo: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await axios.post('http://localhost:8080/user/login', {
          userNo: this.userNo,
          password: this.password
        });
        axios.defaults.withCredentials = true;
        alert('로그인 성공!');
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        alert('로그인 실패');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 64px - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #b2adbd, #77badb);
}

.login-card {
  position: relative;
  width: 360px;
  border-radius: 24px;
  padding-top: 48px;
  background-color: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  overflow: visible;
}

.avatar-wrapper {
  position: absolute;
  top: -40px;
  left: calc(50% - 40px);
}

.avatar {
  background-color: #648ff1;
  color: white;
}

.field {
  margin-bottom: 16px;
  background-color: rgba(69, 76, 95, 0.1);
  border-radius: 8px;
}

.login-action {
  margin-bottom: 16px;
}
</style>