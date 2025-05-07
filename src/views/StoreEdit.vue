<!-- 가게 수정정 페이지-->

<template>
  <v-container>
    <v-card class="pa-5" outlined>
      <v-card-title>가게 수정</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="storeNm"
          label="가게 이름"
          required
          outlined
        />
        <v-text-field
          v-model="storeLoc"
          label="가게 위치"
          required
          outlined
        />
        <v-btn
          color="primary"
          class="mt-4"
          block
          @click="updateStore"
        >
          수정 완료
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'StoreEdit',
  data() {
    return {
      storeNo: null,
      storeNm: '',
      storeLoc: '',
    }
  },
  created() {
    this.storeNo = this.$route.params.storeNo
    this.fetchStore()
  },
  methods: {
    async fetchStore() {
      try {
        const res = await axios.get(`http://localhost:8080/store/${this.storeNo}`)
        const store = res.data
        this.storeNm = store.storeNm
        this.storeLoc = store.storeLoc
      } catch (err) {
        console.error('❌ 가게 정보 불러오기 실패:', err)
        alert('가게 정보를 불러올 수 없습니다.')
      }
    },
    async updateStore() {
      try {
        await axios.put(`http://localhost:8080/store/${this.storeNo}`, {
          storeNm: this.storeNm,
          storeLoc: this.storeLoc,
        })
        alert('수정 완료!')
        this.$router.push('/store')
      } catch (err) {
        console.error('❌ 수정 실패:', err)
        alert('수정에 실패했습니다.')
      }
    }
  }
}
</script>