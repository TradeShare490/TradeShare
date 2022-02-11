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
    <v-list disabled>
      <div
        v-for="company in companies"
        :key="company.title"
      >
        <CompanyCard
          :title="company.title"
          :subtitle="company.subtitle"
          :imgsrc="company.imageSource"
          :sold="company.sold"
        />
        <v-divider class="my-3" />
      </div>
    </v-list>
  </v-card>
</template>

<script>
import CompanyCard from '../TrendingCompanies/CompanyCard.vue'
export default {
  name: 'TrendingCompanies',
  components: { CompanyCard },
  data () {
    return {
      searchCriteria: '',
      search: null,
      companies: [
        {
          title: 'Dropbox',
          subtitle: 'sold recently by Dave',
          imageSource: '../../assets/TradeShare.png',
          sold: true
        },
        {
          title: 'Medium Corporation',
          subtitle: 'bought recently by Dave',
          imageSource: '../../assets/TradeShare.png',
          sold: false
        },
        {
          title: 'Github',
          subtitle: 'sold recently by Fred',
          imageSource: '../../assets/TradeShare.png',
          sold: true
        },
        {
          title: 'Slack',
          subtitle: 'bought recently by Fred',
          imageSource: '../../assets/TradeShare.png',
          sold: false
        },
        {
          title: 'Twitter',
          subtitle: 'sold recently by you',
          imageSource: '../../assets/TradeShare.png',
          sold: true
        }
      ]
    }
  }
}
</script>
