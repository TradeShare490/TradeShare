<template>
  <v-card
    class="sticky-card"
    height="100%"
  >
    <v-row no-gutters>
      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-left blue--text">
              Trending Companies
              <v-icon>
                mdi-trending-up
              </v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-list>
      <div
        v-for="company in companies"
        :key="company.title"
      >
        <CompanyCard
          :company="company.stock_name"
          :ticker="company.stock_symbol"
          :imgsrc="company.imageSource"
          :price="company.current_price"
          :variation="company.price_variation_percentage"
        />
        <v-divider class="my-3" />
      </div>
    </v-list>
  </v-card>
</template>

<script>
import CompanyCard from '../TrendingCompanies/CompanyCard.vue'
import axiosInstance from '../../axios/axios.v1'

export default {
  name: 'TrendingCompanies',
  components: { CompanyCard },
  data () {
    return {
      searchCriteria: '',
      search: null,
      companies: []
    }
  },
  beforeMount () {
    this.pullCompanies()
  },
  methods: {
    async pullCompanies () {
      const response = await axiosInstance.get('/trendingCompanies')
      this.companies = response.data.trendingCompanies
    }
  }
}
</script>
