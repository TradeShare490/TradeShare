<template>
  <div>
    <v-card
      elevation="0"
      class="px-6"
    >
      <v-divider />
      <v-row
        no-gutters
        class="px-7"
      >
        <v-col
          align-self="center"
          class="px-0 py-3"
          cols="2"
          sm="2"
          md="2"
          lg="2"
          xl="1"
        >
          <v-avatar
            class="profile"
            size="50"
          >
            <v-img
              :src="image"
              height="110px"
              width="100px"
              contain
              alt="logo"
            />
          </v-avatar>
        </v-col>
        <v-col
          align-self="center"
          cols="6"
          sm="6"
          md="6"
          lg="5"
          xl="5"
          class="text-left mx-0 px-2 mt-1 py-0"
        >
          <v-list-item color="black">
            <v-list-item-content class="py-1">
              <v-list-item-title
                class="name-text text-sm-body-1 text-caption text-wrap font-weight-bold"
              >
                {{ name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-spacer />
        <v-col
          cols="4"
          sm="3"
          md="2"
          lg="2"
          xl="2"
          align-self="center"
          class="mr-3"
        >
          <v-btn
            v-if="link === false"
            elevation="2"
            outlined
            color="primary"
            class="btn my-3 caption font-weight-bold"
            :data-cy="`${name}-linked`"
            height="32px"
            width="110px"
            @click="handleDialog"
          >
            <div class="text">
              Connect
            </div>
          </v-btn>
          <v-btn
            v-if="link === true"
            elevation="2"
            color="primary"
            class="btn my-3 caption font-weight-bold"
            :data-cy="`${name}-unlinked`"
            height="32px"
            width="110px"

            @click="handleDialog"
          >
            <div class="text">
              Remove
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title
          v-if="link===true"
          class="text-h6"
        >
          Are you sure you want to <span class="red--text">&nbsp;unlink&nbsp;</span> with {{ name }}  ?
        </v-card-title>
        <v-card-title
          v-if="link===false"
          class="text-h6"
        >
          To connect to {{ name }}, we will<span class="blue--text lighten-1--text">&nbsp;redirect&nbsp;</span>you to a new page
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            depressed
            :data-cy="`${name}-handleDialogActionCancel`"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="ml-3"
            depressed
            color="primary"
            :data-cy="`${name}-handleDialogActionSubmit`"
            @click="handleAction"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :snackbar-timeout="snackbarTimeout"
      :color="snackbarColor"
    >
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { useConnectAppMixin } from '../../hooks/useConnectApp.js'

export default {
  name: 'UserBlock',
  mixins: [useConnectAppMixin],
  props: {
    linked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: require('../../assets/ConnectedAppLogos/no-image.jpg')
    }
  },
  data () {
    return {
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      snackbarTimeout: 2000,
      dialog: false,
      link: this.linked
    }
  },
  methods: {
    handleDialog () {
      this.dialog = true
    },
    handleAction () {
      const err = false

      if (this.link === true) {
        this.removeApp()
      } else {
        this.connectApp()
      }

      if (err) {
        this.snackbarText = 'Error occured.'
        this.snackbarColor = 'error'
        this.snackbar = true
        return
      } else {
        this.snackbarText = 'Action completed'
        this.snackbarColor = 'green'
        this.snackbar = true
      }
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.btn {
  border-radius: 3px;
  border-width: 2px;
  height: 5px;
}
.text {
  font-size: 1.1em;
}
</style>
