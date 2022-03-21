<template>
  <v-container fluid>
    <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-3' : 'mx-8'">
      <span class="font-weight-bold d-flex justify-start mx-1 mt-3 mb-8">
        NOTIFICATIONS
      </span>
      <v-divider class="mb-8" />
      <v-row no-gutters>
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Likes
            </span>
            <v-switch
              v-model="likes"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice1"
              :disabled="!likes"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
        <v-spacer />
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Comment Likes
            </span>
            <v-switch
              v-model="commentLikes"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice2"
              :disabled="!commentLikes"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mb-8" />
      <v-row no-gutters>
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Comments
            </span>
            <v-switch
              v-model="comments"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice3"
              :disabled="!comments"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
        <v-spacer />
        <v-spacer />
      </v-row>
      <v-divider class="mb-8" />
      <v-row no-gutters>
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Follow Requests
            </span>
            <v-switch
              v-model="followReq"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice4"
              :disabled="!followReq"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
        <v-spacer />
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Accepted Follow Requests
            </span>
            <v-switch
              v-model="acceptedfollowReq"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice5"
              :disabled="!acceptedfollowReq"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mb-8" />
      <v-row no-gutters>
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Private Messages
            </span>
            <v-switch
              v-model="dms"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice6"
              :disabled="!dms"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
        <v-spacer />
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Private Message Requests
            </span>
            <v-switch
              v-model="dmReq"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice7"
              :disabled="!dmReq"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mb-8" />
      <v-row no-gutters>
        <v-col>
          <div class="d-flex justify-space-between">
            <span>
              Mentions
            </span>
            <v-switch
              v-model="mentions"
              color="primary"
              hide-details
              class="mt-0 pt-0"
              :ripple="false"
            />
          </div>
          <div>
            <v-radio-group
              v-model="choice8"
              :disabled="!mentions"
            >
              <v-radio
                label="Anyone"
                value="all"
              />
              <v-radio
                label="People from Following List"
                value="select"
              />
            </v-radio-group>
          </div>
        </v-col>
        <v-spacer />
        <v-spacer />
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'NotifsPreferencesPage',
  data () {
    return {
      likes: true,
      choice1: 'all',
      commentLikes: true,
      choice2: 'all',
      comments: true,
      choice3: 'all',
      followReq: true,
      choice4: 'all',
      acceptedfollowReq: true,
      choice5: 'all',
      dms: true,
      choice6: 'all',
      dmReq: true,
      choice7: 'all',
      mentions: true,
      choice8: 'all'
    }
  }
}
</script>
<style scoped>
.container {
  width: 65%;
  background-color: white;
  min-height: 100vh;
  flex-grow: 1;
}
span {
  color: #66788A;
  text-align: left;
}
@media only screen and (max-width: 768px) {
  .container {
  width: 100%;
  }
}
</style>
