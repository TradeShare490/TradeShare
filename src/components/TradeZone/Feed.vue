<template>
  <v-container fluid class="pb-0" data-cy="trade-zone-feed">
    <v-alert outlined color="grey lighten-2" class="pa-0 ma-0">
      <div class="d-flex justify-end mb-n3 mr-1">
        <v-btn icon>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </div>
      <router-link
          :is="this.disabled ? 'span' : 'router-link'"
          :to="'/tradezone/' + this.username+'/' + this.id"
          style="text-decoration: none"
      >
      <v-row no-gutters class="d-flex justify-start ml-5">
          <v-avatar class="mr-3" size="70">
            <v-img :src="image" alt="pfp"/>
          </v-avatar>
          <div class="d-flex flex-column align-baseline mr-1">
            <span class="text-no-wrap font-weight-bold black--text text-left">
            {{ this.name }}
          </span>
            <span class="font-weight-light text-subtitle-2 black--text">
            {{ this.when }}
          </span>
          </div>
          <div id="truncate" class="d-flex flex-column">
            <span class="font-weight-light text-subtitle-2 black--text">
              {{ this.username }}
            </span>
          </div>
      </v-row>
      <v-row no-gutters class="mx-16 px-5 mb-3 d-flex justify-space-between">
        <v-col>
          <v-list-item class="px-0">
            <v-chip
                label
                class="white--text px-2 text-h6"
                color="primary"
            >
              {{ this.tag }}
            </v-chip>
          </v-list-item>
          <v-list-item-title class="text-h7 text-wrap text-left font-weight-light d-flex justify-start black--text">
            {{ this.company }}
          </v-list-item-title>
        </v-col>
        <v-col>
          <v-list-item class="pr-0">
            <v-container class="px-0">
              <v-row no-gutters>
                <v-col class="d-flex justify-start mb-1">
                    <span class="text-subtitle-2 text-left font-weight-bold">
                      Position Size: 
                        <span class="font-weight-medium">
                            {{ this.size }} 
                        </span>
                    </span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="d-flex justify-start">
                    <span class="text-subtitle-2 text-left font-weight-bold">
                      Verified: 
                        <span class="font-weight-medium">
                            {{ this.verified ? "Yes" : "No" }}
                        </span>
                    </span>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item class="d-flex justify-end px-0">
                <v-chip
                    label
                    :class="this.purchased ? 'white--text px-2 font-weight-bold' : 'white--text px-6 font-weight-bold'"
                    :color="this.purchased ? 'green darken-2' : 'red darken-2'"
                >
                  {{ this.purchased ? "PURCHASED" : "SOLD" }}
                </v-chip>
              </v-list-item>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-16">
        <v-list-item class="px-5 py-0">
          <v-list-item-content style="background-color: #f2f2f2;">
            <StockGraph />
          </v-list-item-content>
        </v-list-item>
      </v-row>
      <v-row no-gutters class="mx-16 px-5 py-2">
        <v-col>
          <div class="d-flex flex-column align-xs-center align-sm-start mr-1">
            <span class="text-h6 font-weight-bold black--text">
              {{ this.stock1.toFixed(2) }}
            </span>
            <span class="text-subtitle-1 grey--text font-weight-light">
              {{ this.stock3.toFixed(2) }}
            </span>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column align-xs-center align-sm-end mr-1">
            <span class="text-h6 green--text font-weight-bold">
              {{ this.stock2 }}
            </span>
            <span class="text-subtitle-1 grey--text font-weight-light">
              {{ this.stock4 }}
            </span>
          </div>
        </v-col>
      </v-row>
      </router-link>
      <v-row no-gutters class="mb-2">
        <v-col>
          <v-btn
              elevation="0"
              text
              x-large
              :ripple="false"
              @click="like = !like"
              :color="like ? 'primary' : ''"
          >
            <v-icon> {{ !like ? 'mdi-heart-outline' : 'mdi-heart' }} </v-icon>
            <span> 12k </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
              elevation="0"
              text
              x-large
              :ripple="false"
          >
            <v-icon>mdi-comment-processing-outline</v-icon>
            <span> 8.3k </span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
              elevation="0"
              text
              x-large
              :ripple="false"
          >
            <v-icon>mdi-share-variant-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
              elevation="0"
              text
              x-large
              :ripple="false"
              @click="copyURL()"
          >
            <v-icon>mdi-link-variant</v-icon>
          </v-btn>
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            color="primary"
          >
            {{ snackbarText }}
          </v-snackbar>
        </v-col>
      </v-row>
    </v-alert>
  </v-container>
</template>

<script>
import StockGraph from "../../components/TradeZone/StockGraph.vue";
export default {
  components: { StockGraph },
  name: "Feed",
  props: {
    id: Number,
    image: String,
    name: String,
    username: String,
    when: String,
    purchased: Boolean,
    company: String,
    tag: String,
    size: Number,
    verified: Boolean,
    stock1: Number,
    stock2: String,
    stock3: Number,
    stock4: String,
    disabled: Boolean
  },
  data() {
    return {
      like: false,
      snackbar: false,
      snackbarText: 'Copied to Clipboard!',
      timeout: 1500
    }
  },
  methods: {
    copyURL() {
      this.snackbar = true
      const url = 'localhost:8081' + this.$router.currentRoute.fullPath
      const temp = document.createElement('textarea')
      document.body.appendChild(temp)
      temp.value = url
      temp.select()
      document.execCommand('copy');
      document.body.removeChild(temp)
    }
  }
};
</script>
<style scoped>
.v-btn:before{
  background-color: transparent;
}
.v-btn:hover {
  color: #3F51B5;
}
#truncate {
  max-width: 14vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
