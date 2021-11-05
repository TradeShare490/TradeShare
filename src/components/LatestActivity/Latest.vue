<template>
    <v-container class="pa-0 ma-0">      
        <v-row no-gutters justify="space-between" align="center">
            <v-col xs="12" sm="12" md="2" lg="2" xl="2">
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
        <!-- FIX THE DIVIDER -->
            <v-divider vertical class="my-5" />
        <!-- FIX THE DIVIDER -->
            <v-col xs="12" sm="12" md="2" lg="2" xl="2">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item-title class="text-h5 text-wrap font-weight-medium ml-3 d-flex justify-start">
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
                        <v-list-item class="pr-0">
                            <v-container class="px-0">
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start mb-1">
                                        <span class="text-subtitle-2 font-weight-bold">Position Size: <span class="font-weight-medium">{{ this.size }} </span></span>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start mb-1">
                                        <span class="text-subtitle-2 font-weight-bold">Execution Date: <span class="font-weight-medium">{{ this.when }} </span></span>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start">
                                        <span class="text-subtitle-2 font-weight-bold">Verified: <span class="font-weight-medium">{{ this.verified ? "Yes" : "No" }}</span></span>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-list-item>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="12" sm="12" md="4" lg="3" xl="3">
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
                                    <span class="text-h6 grey--text">{{ this.stock3.toFixed(2) }}</span>
                                </v-col>
                                <v-col>
                                    <span class="text-h6 grey--text">{{ this.stock4 }}</span>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="12" sm="12" md="4" lg="5" xl="5">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <div class="d-flex justify-end" align-self="start">
                            <v-btn
                                icon
                            >
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </div>
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
                                        @click="submit"
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
import StockGraph from "../../components/LatestActivity/StockGraph.vue"; 

export default {
  components: { StockGraph },
    name: "Latest",
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