<!--입력 필드 : StoreNm , StoreLoc 
 등록 성공시 - /store 목록(가게목록조회 페이지) 으로 자동 이동 -->

 <!-- 가게 등록 페이지 -->

 <template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title>가게 등록</v-card-title>
        <v-card-text>
          <v-text-field v-model="storeNm" label="가게 이름" />
          <v-text-field v-model="storeLoc" label="가게 위치" />
          <v-btn color="primary" @click="registerStore">등록하기</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>

<script>
import axios from 'axios'

export default {
    name:'StoreRegister',
    data() {
        return {
            storeNm: '',
            storeLoc: '',
        }
    },
    methods: {
        async registerStore() {
            try {
                await axios.post('http://localhost:8080/store/register',{
                    storeNm: this.storeNm, // 요청 바디
                    storeLoc: this.storeLoc, // 요청 바디 

                })
                alert('등록 완료!')
                this.$router.push('/store') // 등록 완료 후 /store 로 이동.
            } catch(err) {
                console.error('등록 실패 응답:', err.response?.data || err.message) //확인을 위한 로그그 
                alert('등록 실패!')
            }
        }
    }
}
</script>

