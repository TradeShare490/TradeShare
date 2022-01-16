<template>
    <v-container class="pa-0 ma-0" data-cy="tradezoneFeed">
        <div class="d-flex justify-end mb-n3">
            <v-btn
                icon
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </div>
        <v-row no-gutters justify="space-between" align="center">
            <v-col xs="12" sm="12" md="6" lg="2" xl="2">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item-avatar class="mr-0">
                            <v-avatar size="40">
                                <img :src="image">
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-title class="text-wrap font-weight-bold">
                            {{ this.name }}
                        </v-list-item-title>
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
            <v-divider vertical class="my-5 hidden-md-and-down" />
            <v-col xs="12" sm="12" md="6" lg="3" xl="2">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-col xs="6" sm="6" md="6" lg="12"> 
                            <v-list-item-title class="text-h6 text-wrap text-left font-weight-medium d-flex justify-start ml-3">
                                {{ this.company }}
                            </v-list-item-title>
                            <v-list-item>
                                <v-chip
                                    label
                                    class="white--text px-2"
                                    color="primary"
                                >
                                    {{ this.tag }}
                                </v-chip>
                            </v-list-item>
                        </v-col>
                        <v-col xs="6" sm="6" md="6" lg="12">
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
                                        <v-col class="d-flex justify-start mb-1 text-no-wrap text-left">
                                            <span class="text-subtitle-2 font-weight-bold">
                                                Execution Date: 
                                                    <span class="font-weight-medium">
                                                        {{ this.when }}
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
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="12" sm="12" md="6" lg="3" xl="3">
                <v-list-item class="px-0">
                    <v-list-item-content class="text-caption text-wrap">
                            <StockGraph />
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
            </v-col>
            <v-col xs="12" sm="12" md="6" lg="4" xl="5">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item>
                            <v-alert
                                class="pa-3"
                                outlined
                                color="grey lighten-2"
                                width=100%
                                height="100"
                            >
                                <div class="black--text">
                                    <v-row>
                                <!-- FETCH THESE FROM THE BACK-END -->
                                        <v-col class="d-flex justify-start">
                                            Username
                                        </v-col>
                                        <v-col class="d-flex justify-start">
                                            User's Message
                                        </v-col>
                                <!-- FETCH THESE FROM THE BACK-END -->
                                    </v-row>
                                </div>
                            </v-alert>
                        </v-list-item>
                        <v-list-item>
                            <v-text-field
                                label="Comment"
                                flat
                                solo
                                outlined
                                type="input"
                            >
                                <template #append>
                                    <v-btn
                                        color="primary"
                                        type="submit"
                                        
                                    >
                                        Submit
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-list-item>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
        </v-row>
        <v-divider></v-divider>
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
        purchased: Boolean,
        company: String,
        tag: String,
        size: Number,
        when: String,
        verified: Boolean,
        stock1: Number,
        stock2: String,
        stock3: Number,
        stock4: String,
    },
    data: () => ({}),
};
</script>