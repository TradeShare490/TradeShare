<template>
    <v-container>      
        <v-row no-gutters justify="space-between" align="center">
            <v-col xs="12" sm="12" md="2" lg="2" xl="2">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item-avatar>
                            <v-avatar size="40">
                                <img :src="image">
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-title class="text-wrap">
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
            <!-- FIX THIS LATER -->
            <v-divider vertical class="mb-3 mt-n3"></v-divider>
            <v-col xs="12" sm="12" md="3" lg="3" xl="3">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item-title class="text-h6 text-wrap font-weight-medium ml-2">
                            {{ this.company }}
                        </v-list-item-title>
                        <v-list-item>
                            <v-chip
                                label
                                class="white--text px-2"
                                color="primary"
                            >
                                {{ this.purchased }}
                            </v-chip>
                        </v-list-item>
                        <v-list-item>
                            <v-container>
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start">
                                        <span class="text-caption font-weight-bold">Position Size: {{ this.company }} </span>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start">
                                        <span class="text-caption font-weight-bold">Execution Date: {{ this.company }} </span>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start">
                                        <span class="text-caption font-weight-bold">Verified: {{ this.purchased }} </span>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-list-item>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="12" sm="12" md="3" lg="3" xl="3">
                <v-list-item class="px-0">
                    <v-list-item-content class="text-caption text-wrap">
                        <v-list-item-title>
                            <span class="font-weight-bold">INSERT GRAPH</span>
                        </v-list-item-title>
                        <v-list-item>
                            <v-row>
                                <v-col>
                                    <span class="font-weight-bold">300</span>
                                </v-col>
                                <v-col>
                                    <span class="green--text font-weight-bold">+0.52%</span>
                                </v-col>
                            </v-row>
                        </v-list-item> 
                        <v-list-item>
                            <v-row>
                                <v-col>
                                    <span class="grey--text font-weight-bold">311</span>
                                </v-col>
                                <v-col>
                                    <span class="grey--text font-weight-bold">Post+0.16%</span>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="12" sm="12" md="3" lg="3" xl="3">
                <v-list-item class="px-0">
                    <v-list-item-content>
                        <v-list-item>
                            <v-alert
                                outlined
                                color="grey lighten-2"
                            >
                                <div class="black--text">
                                    <v-row>
                                        <v-col>
                                            Username
                                        </v-col>
                                        <v-col>
                                            Message
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-alert>
                        </v-list-item>
                        <v-list-item>
                            <v-text-field
                                label="Comment"
                                single-line
                                outlined
                                color="primary"
                                v-model="input"
                            >
                            <!-- FIX THIS LATER -->
                                <template v-slot:append>
                                    <v-btn
                                        text
                                        class="white--text"
                                        style="background-color: #3F51B5"
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
            <v-col xs="12" sm="12" md="1" lg="1" xl="1">
                <v-btn
                    icon
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-container>
</template>
<script>
export default {
    name: "Latest",
    props: {
        image: String,
        name: String,
        company: String,
        purchased: Boolean,
        when: String,
        today: Boolean,
    },
    data: () => ({}),
};
</script>