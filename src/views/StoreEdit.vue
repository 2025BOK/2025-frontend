<!-- 가게 목록 조회 페이지-->

<template>
    <v-container>
      <v-card>
        <v-card-title>
          가게 목록
          <v-spacer />
          <v-btn color="primary" small @click="$router.push('/store/register')">
            가게 등록
          </v-btn>
        </v-card-title>
  
        <v-simple-table class="elevation-1">
          <thead>
            <tr>
              <th>가게 이름</th>
              <th>이름</th>
              <th>위치</th>
              <th>동작</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in stores" :key="store.storeNo">
              <td>{{ store.storeNo }}</td>
              <td>{{ store.storeNm }}</td>
              <td>{{ store.storeLoc }}</td>
              <td>
                <v-btn color="blue" small @click="goEdit(store.storeNo)">수정</v-btn>
                <v-btn color="red" small @click="deleteStore(store.storeNo)">삭제</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'StoreList', // 정상 응답시 storelist 출력
    data() {
      return {
        stores: []
      }
    },
    created() {
      this.fetchStores()
    },
    methods: {
      async fetchStores() {
        try {
          const res = await axios.get('/store')
          this.stores = res.data
        } catch (err) {
          alert('가게 목록을 불러오지 못했습니다.')
        }
      },
      async deleteStore(storeNo) { // 가게 목록 삭제
        if (!confirm('정말 삭제하시겠습니까?')) return
        try { 
          await axios.delete(`/store/${storeNo}`)
          alert('삭제 완료!')
          this.fetchStores()
        } catch (err) {
          alert('삭제 실패')
        }
      },
      async updateStore() { // 가게 목록 수정
        //const storeNo = this.$route.params.storeNo
        try {
            await axios.put('/store/${storeNo}',{
                storeNm: this.storeNm,
                storeLoc: this.storeLoc
            })
            alert('수정 완료!')
            this.$router.push('/store') // 수정 후 목록으로 이동동
        }
        catch (err){
            alert('수정 실패')
        }
      },
      goEdit(storeNo) {
        this.$router.push(`/store/edit/${storeNo}`)
      }
    }
  }
  </script>