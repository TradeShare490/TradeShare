<template>
  <v-container>
    <v-row
      no-gutters
      justify="space-between"
      align="center"
    >
      <v-col
        xs="12"
        sm="4"
      >
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-avatar>
              <v-avatar size="40">
                <img
                  :src="image"
                  alt="pfp"
                >
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title
              data-cy="trader-name"
              class="text-caption text-wrap"
            >
              {{ name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        xs="12"
        sm="4"
      >
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item
              class="d-flex justify-center px-0"
              data-cy="company-tag"
            >
              <v-chip
                label
                class="white--text px-2 text-body-1"
                color="primary"
              >
                {{ tag }}
              </v-chip>
            </v-list-item>
            <v-list-item-title
              data-cy="company-name"
              style="font-size: 12px"
            >
              {{ company }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        xs="12"
        sm="4"
      >
        <v-list-item class="px-0">
          <v-list-item-content class="text-caption text-wrap">
            <v-list-item class="d-flex justify-center px-0">
              <v-chip
                data-cy="trade-type"
                label
                :class="purchased ? 'white--text px-1' : 'white--text px-6'"
                :color="purchased ? 'green darken-2' : 'red darken-2'"
              >
                {{ purchased ? "PURCHASED" : "SOLD" }}
              </v-chip>
            </v-list-item>
            <v-list-item-title
              data-cy="trade-date"
              style="font-size: 12px"
            >
              {{ when }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-divider />
  </v-container>
</template>

<script>
export default {
  name: 'RecentsActivities',
  props: {
    image: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    purchased: {
      type: Boolean,
      default: false
    },
    when: {
      type: String,
      default: ''
    }
  }
}
</script>
