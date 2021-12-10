<template>
  <v-container fluid>
    <v-alert outlined color="grey lighten-2" class="pa-0 ma-0">
      <div class="d-flex justify-end mb-n3 mr-1">
        <v-btn icon>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </div>
      <v-row no-gutters>
        <v-col xs="1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-avatar size="30%">
                <v-img :src="image" />
              </v-list-item-avatar>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col xs="10">
          <v-list-item-content>
            <v-list-item-title class="text-wrap font-weight-bold black--text text-left">
              {{ this.name }}
              <span class="font-weight-light text-subtitle-1"> 
                  {{ this.username }}
                </span>
            </v-list-item-title>
            <v-list-item-subtitle class="black--text text-left">
              {{ this.when }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
        <v-spacer />
        <v-spacer />
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-list-item>
            <v-chip
                label
                class="white--text px-2"
                color="primary"
            >
              {{ this.tag }}
            </v-chip>
          </v-list-item>
          <v-list-item-title class="text-h6 text-wrap text-left font-weight-light d-flex justify-start ml-3 black--text">
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
              <v-list-item class="d-flex justify-center px-0">
                <v-chip
                    label
                    :class="this.purchased ? 'white--text px-2' : 'white--text px-6'"
                    :color="this.purchased ? 'green darken-2' : 'red darken-2'"
                >
                  {{ this.purchased ? "PURCHASED" : "SOLD" }}
                </v-chip>
              </v-list-item>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-list-item>
          <v-list-item-content>
            <StockGraph />
          </v-list-item-content>
        </v-list-item>
      </v-row>
      <v-row no-gutters>
        <v-list-item class="px-0">
          <v-list-item-content class="text-caption text-wrap">
            <v-list-item>
              <v-row>
                <v-col>
                  <span class="text-h6 font-weight-bold">{{ this.stock1.toFixed(2) }}</span>
                </v-col>
                <v-col>
                  <span class="text-h6 green--text font-weight-bold">{{ this.stock2 }}</span>
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col>
                  <span class="text-subtitle-1 grey--text font-weight-light">{{ this.stock3.toFixed(2) }}</span>
                </v-col>
                <v-col>
                  <span class="text-subtitle-1 grey--text font-weight-light">{{ this.stock4 }}</span>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-row>
      <v-row no-gutters class="mb-2">
        <v-col>
          <v-btn
              elevation="0"
              text
              x-large
              :ripple="false"
              @click="like = !like"
              v-bind:color="like ? 'primary' : ''"
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
          >
            <v-icon>mdi-link-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!--            <v-col xs="12" sm="12" md="6" lg="4" xl="5">-->
      <!--                <v-list-item class="px-0">-->
      <!--                    <v-list-item-content>-->
      <!--                        <v-list-item>-->
      <!--                            <v-alert-->
      <!--                                class="pa-3"-->
      <!--                                outlined-->
      <!--                                color="grey lighten-2"-->
      <!--                                width=100%-->
      <!--                                height="100"-->
      <!--                            >-->
      <!--                                <div class="black&#45;&#45;text">-->
      <!--                                    <v-row>-->
      <!--                                &lt;!&ndash; FETCH THESE FROM THE BACK-END &ndash;&gt;-->
      <!--                                        <v-col class="d-flex justify-start">-->
      <!--                                            Username-->
      <!--                                        </v-col>-->
      <!--                                        <v-col class="d-flex justify-start">-->
      <!--                                            User's Message-->
      <!--                                        </v-col>-->
      <!--                                &lt;!&ndash; FETCH THESE FROM THE BACK-END &ndash;&gt;-->
      <!--                                    </v-row>-->
      <!--                                </div>-->
      <!--                            </v-alert>-->
      <!--                        </v-list-item>-->
      <!--                        <v-list-item>-->
      <!--                            <v-text-field-->
      <!--                                label="Comment"-->
      <!--                                flat-->
      <!--                                solo-->
      <!--                                outlined-->
      <!--                                type="input"-->
      <!--                            >-->
      <!--                                <template #append>-->
      <!--                                    <v-btn-->
      <!--                                        color="primary"-->
      <!--                                        type="submit"-->
      <!--                                        -->
      <!--                                    >-->
      <!--                                        Submit-->
      <!--                                    </v-btn>-->
      <!--                                </template>-->
      <!--                            </v-text-field>-->
      <!--                        </v-list-item>-->
      <!--                    </v-list-item-content>-->
      <!--                </v-list-item>-->
      <!--            </v-col>-->

      <!--        <v-divider />-->
    </v-alert>
  </v-container>
</template>
<script>
import StockGraph from "../../components/TradeZone/StockGraph.vue";
export default {
  components: { StockGraph },
  name: "Feed",
  props: {
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
  },
  data() {
    return {
      like: false
    }
  },
};
</script>
<style scoped>
.v-btn:before{
  background-color: transparent;
}
.v-btn:hover {
  color: #3F51B5;
}
</style>