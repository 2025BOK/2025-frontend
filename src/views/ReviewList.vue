<!--리뷰 목록 조회 페이지-->
<template>
    <v-container>
      <v-card class="pa-5" outlined>
        <v-card-title>리뷰 목록 (Store {{ storeNo }})</v-card-title>
        <v-card-text>
          <div v-if="error">
            <v-alert type="error">리뷰 목록 가져오기 실패</v-alert>
          </div>
          <div v-else-if="loading">
            <v-progress-circular indeterminate />
          </div>
          <div v-else>
            <v-list two-line>
              <v-list-item
                v-for="review in reviews"
                :key="review.reviewNo"
                @click="viewDetail(review.reviewNo)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ review.reviewCtn }}</v-list-item-title>
                  <v-list-item-subtitle>평점: {{ review.reviewRate }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click.stop="viewDetail(review.reviewNo)">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-alert v-if="reviews.length === 0" type="info">
              등록된 리뷰가 없습니다.
            </v-alert>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="goBack">뒤로가기</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'ReviewList',
    props: ['storeNo'],
    data() {
      return {
        reviews: [],
        loading: false,
        error: false
      }
    },
    created() {
      this.fetchReviews()
    },
    methods: {
      async fetchReviews() {
        this.loading = true
        try {
          const res = await axios.get(
            `/review/store/${this.storeNo}`,
            { withCredentials: true }
          )
          this.reviews = res.data
        } catch (e) {
          console.error('리뷰 목록 조회 실패', e)
          this.error = true
        } finally {
          this.loading = false
        }
      },
      viewDetail(reviewNo) {
        this.$router.push({ name: 'ReviewDetail', params: { reviewNo } })
      },
      goBack() {
        this.$router.back()
      }
    }
  }
  </script>
  