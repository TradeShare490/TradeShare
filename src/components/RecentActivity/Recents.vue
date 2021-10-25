<template>
    <v-container>      
        <v-row no-gutters justify="space-between" align="center">
            <v-col xs="3" xl="3">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-avatar>
                            <v-avatar size="40">
                                <img :src="image">
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-title class="text-caption text-wrap">
                            {{ this.name }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="4" xl="4" class="text-left">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-caption text-wrap">
                            {{ this.company }}
                        </v-list-item-title>
                        <v-list-item class="px-0">
                            <v-chip
                                label
                                :class="this.purchased ? 'white--text' : 'white--text px-9'"
                                :color="this.purchased ? 'green darken-2' : 'red darken-2'"
                            >
                                {{ this.purchased ? "PURCHASED" : "SOLD" }}
                            </v-chip>
                        </v-list-item>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col xs="4" xl="4" class="text-left">
                <v-list-item>
                    <v-list-item-content class="text-caption text-wrap">
                        <v-list-item-title style="font-size: 12px">
                            {{ this.when }}
                        </v-list-item-title>
                        <v-list-item-icon>
                            <v-icon
                                :color="this.today ? 'primary' : 'grey'"
                            >
                                mdi-checkbox-marked-circle
                            </v-icon>
                        </v-list-item-icon>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col class="d-flex justify-end" xs="1">
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
    name: "Recents",
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