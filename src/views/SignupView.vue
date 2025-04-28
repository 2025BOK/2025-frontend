<template>
    <v-container>
        <v-card class="pa-5" outlined>
            <v-card-title>회원가입</v-card-title>
            <v-card-text>
                <v-text-field label="행번" v-model="userNo" type="number"/>
                <v-text-field label="이름" v-model="userNm"/>
                <v-text-field label="비밀번호" v-model="password" type="password" />
                <v-btn color="primary" @click="signup">가입하기</v-btn>
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
            userNm: '',
            userCnt:'',
            password: ''
        }
    },
    methods: {
        async signup() {
            try {
                await axios.post('http://localhost:8080/user/signup',{
                    userNo: this.userNo,
                    userNm: this.userNm,
                    userCnt: 0,
                    password: this.password
                })
                alert('회원가입 성공하였습니다!')
                this.$router.push('/user/login')
            }catch (err) {
                alert('회원가입 실패하였습니다.')
            }
        }
    }

}
</script>