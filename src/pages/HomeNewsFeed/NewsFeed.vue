<template>
    <div>
        <v-container class="mx-5">
            <v-row>
                <span class="text-h5 font-weight-medium mb-3">Latest Activity</span>
            </v-row>
            <v-row>
                <v-alert 
                    outlined
                    color="grey lighten-2"
                >
                    <Latest
                        v-for="activity in latestActivities"
                        :key="activity.id"
                        :image=activity.image
                        :name="activity.name"
                        :company="activity.company"
                        :purchased="activity.purchased"
                        :when="activity.when"
                        :today="activity.today"
                    ></Latest>
                </v-alert>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Latest from "../../components/LatestActivity/Latest.vue"

export default {
  name: "NewsFeed",
  data() {
        return {
            latestActivities: [
                {
                    id: 1,
                    image: "https://randomuser.me/api/portraits/men/35.jpg",
                    name: "Ash Britain",
                    company: "Dropbox",
                    purchased: true,
                    when: "Today",
                    today: true,
                },
                {
                    id: 2,
                    image: "https://randomuser.me/api/portraits/men/52.jpg",
                    name: "Tim Robenman",
                    company: "NVIDIA",
                    purchased: false,
                    when: "Today",
                    today: true,
                },
                {   
                    id: 3,
                    image: "https://randomuser.me/api/portraits/men/86.jpg",
                    name: "Mac Kafe",
                    company: "Twitter",
                    purchased: true,
                    when: "Yesterday",
                    today: false,
                },
                {
                    id: 4,
                    image: "https://randomuser.me/api/portraits/men/52.jpg",
                    name: "Tim Robenman",
                    company: "Voyager",
                    purchased: false,
                    when: "Today",
                    today: true,
                },
            ]
        }
    },
  components: {
    Latest,
  },
};
</script>