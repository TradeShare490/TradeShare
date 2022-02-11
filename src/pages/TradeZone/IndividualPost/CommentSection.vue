<template>
  <v-container
    fluid
    class="pt-0"
    data-cy="post-comment"
  >
    <v-alert
      outlined
      color="grey lighten-2"
      class="pa-0 ma-0"
    >
      <v-row
        class="mt-2"
        no-gutters
      >
        <v-col class="d-flex justify-start ml-5 black--text">
          <span>
            {{ date }}
          </span>
        </v-col>
        <v-col class="d-flex justify-end mr-5 black--text">
          <span>
            {{ time }}
          </span>
        </v-col>
      </v-row>
      <v-divider />
      <v-row
        no-gutters
        class="mx-6 mt-3 mb-0"
      >
        <v-avatar size="70">
          <v-img
            :src="pfp"
            alt="pfp"
          />
        </v-avatar>
        <v-text-field
          class="ml-5 mt-2"
          label="Post a comment..."
          flat
          solo
          outlined
          type="input"
          rounded
        >
          <template #append>
            <v-btn
              color="primary"
              icon
            >
              <v-icon>mdi-emoticon-outline</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              type="submit"
              icon
              data-cy="comment-submit-btn"
            >
              <v-icon>mdi-chevron-double-right</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-row>
      <v-divider />
      <div class="d-flex justify-end mb-n8 mr-1">
        <v-btn icon>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </div>
      <v-row
        no-gutters
        class="mx-6 my-3"
      >
        <v-avatar size="70">
          <v-img
            :src="pfp2"
            alt="pfp"
          />
        </v-avatar>
        <div class="d-flex flex-column align-baseline ml-3 mt-1">
          <span class="text-no-wrap font-weight-bold black--text text-left">
            {{ name }}
          </span>
          <span class="font-weight-light text-subtitle-2 black--text">
            {{ when }}
          </span>
        </div>
        <div class="d-flex flex-column mt-1 ml-1 truncate">
          <span class="font-weight-light text-subtitle-2 black--text">
            {{ username }}
          </span>
        </div>
        <div class="black--text text-left d-flex flex-row">
          <v-col
            xs="1"
            sm="1"
            md="1"
            lg="1"
            xl="1"
          />
          <v-col
            xs="11"
            sm="11"
            md="11"
            lg="11"
            xl="11"
            class="ml-4 mt-n4"
          >
            {{ comment }}
          </v-col>
        </div>
        <div class="black--text text-left d-flex flex-row">
          <v-col
            xs="1"
            sm="1"
            md="1"
            lg="1"
            xl="1"
          />
          <v-col
            xs="11"
            sm="11"
            md="11"
            lg="11"
            xl="11"
            class="ml-4 mt-n5"
          >
            <v-row
              no-gutters
              class="ml-2"
            >
              <v-col>
                <v-btn
                  elevation="0"
                  text
                  x-large
                  :ripple="false"
                  :color="like ? 'primary' : ''"
                  @click="like = !like"
                >
                  <v-icon> {{ !like ? 'mdi-heart-outline' : 'mdi-heart' }} </v-icon>
                  <span> 780 </span>
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
                  <span> 1 </span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="ml-2"
            >
              <v-col>
                <v-btn
                  style="text-transform: none"
                  text
                  x-large
                  :ripple="false"
                  data-cy="view-replies-btn"
                  @click="viewReplies"
                >
                  <v-icon> mdi-minus</v-icon>
                  <span v-if="!view"> View Replies </span>
                  <span v-else> Hide Replies </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </div>
        <div
          v-if="view"
          class="black--text text-left d-flex flex-row mt-n8"
        >
          <v-col
            xs="1"
            sm="1"
            md="1"
            lg="1"
            xl="1"
          />
          <v-col
            xs="11"
            sm="11"
            md="11"
            lg="11"
            xl="11"
          >
            <div class="d-flex justify-end mb-n8 mr-1">
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
            <v-row
              no-gutters
              class="mx-6 mt-3 mb-n8"
            >
              <v-avatar size="70">
                <v-img
                  :src="pfp"
                  alt="pfp"
                />
              </v-avatar>
              <div class="d-flex flex-column align-baseline ml-3 mt-1">
                <span class="text-no-wrap font-weight-bold black--text text-left">
                  {{ name }}
                </span>
                <span class="font-weight-light text-subtitle-2 black--text">
                  {{ when }}
                </span>
              </div>
              <div class="d-flex flex-column mt-1 ml-1 truncate">
                <span class="font-weight-light text-subtitle-2 black--text">
                  {{ username }}
                </span>
              </div>
              <div class="black--text text-left d-flex flex-row">
                <v-col
                  xs="1"
                  sm="1"
                  md="1"
                  lg="1"
                  xl="1"
                />
                <v-col
                  xs="11"
                  sm="11"
                  md="11"
                  lg="11"
                  xl="11"
                  class="ml-6 mt-n4"
                >
                  {{ comment }}
                </v-col>
              </div>
              <div class="black--text text-left d-flex flex-row">
                <v-col
                  xs="1"
                  sm="1"
                  md="1"
                  lg="1"
                  xl="1"
                />
                <v-col
                  xs="11"
                  sm="11"
                  md="11"
                  lg="11"
                  xl="11"
                  class="ml-4 mt-n5"
                >
                  <v-row
                    no-gutters
                    class="ml-2"
                  >
                    <v-col>
                      <v-btn
                        elevation="0"
                        text
                        x-large
                        :ripple="false"
                        :color="like ? 'primary' : ''"
                        @click="like = !like"
                      >
                        <v-icon> {{ !like ? 'mdi-heart-outline' : 'mdi-heart' }} </v-icon>
                        <span> 1 </span>
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
                        <span> 0 </span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </div>
            </v-row>
          </v-col>
        </div>
      </v-row>
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'CommentSection',
  props: {
    date: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    pfp: {
      type: String,
      default: ''
    },
    pfp2: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    when: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
      like: false,
      view: false
    }
  },
  methods: {
    viewReplies () {
      this.view = !this.view
    }
  }
}
</script>
<style scoped>
.v-btn:before{
  background-color: transparent;
}
.v-btn:hover {
  color: #3F51B5;
}
.truncate {
  max-width: 14vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
