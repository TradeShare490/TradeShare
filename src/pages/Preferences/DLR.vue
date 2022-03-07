<template>
  <v-container fluid>
    <div :class="$vuetify.breakpoint.lgAndDown ? 'mx-3' : 'mx-8'">
      <span class="font-weight-bold d-flex justify-start mx-1 mt-3 mb-8">
        DISPLAY, LANGUAGE & REGION
      </span>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-start mx-12 mt-5 mb-10"
        :class="{'flex-column': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Display
        </span>
        <v-switch
          label="Dark Mode"
          color="primary"
          value="red"
          hide-details
          class="mt-10"
          :ripple="false"
        />
      </div>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-space-between mx-12 my-5"
        :class="{'flex-column align-center': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Language
        </span>
        <div style="max-width: 250px">
          <v-autocomplete
            v-model="selectLanguage"
            :items="languages"
            item-text="languageName"
            dense
            outlined
            solo
            flat
            return-object
            label="Select a Language"
            class="ml-n7 mt-10"
          />
        </div>
        <v-btn
          class="mt-10"
          filled
          color="primary"
          :ripple="false"
          @click="saveLanguage(languages.languageName)"
        >
          Save
        </v-btn>
        <v-snackbar
          v-model="snackbar1"
          :timeout="timeout"
          color="primary"
          right
        >
          {{ snackbar1Text }}
        </v-snackbar>
      </div>
      <v-divider class="mb-8" />
      <div
        class="d-flex justify-space-between mx-12 my-5"
        :class="{'flex-column align-center': $vuetify.breakpoint.xsOnly}"
      >
        <span>
          Region
        </span>
        <div style="max-width: 250px">
          <v-autocomplete
            v-model="selectRegion"
            :items="regions"
            item-text="regionName"
            dense
            outlined
            solo
            flat
            return-object
            label="Select a Region"
            class="ml-n5 mt-10"
          />
        </div>
        <v-btn
          class="mt-10"
          filled
          color="primary"
          :ripple="false"
          @click="saveRegion(regions.regionName)"
        >
          Save
        </v-btn>
        <v-snackbar
          v-model="snackbar2"
          :timeout="timeout"
          color="primary"
          right
        >
          {{ snackbar2Text }}
        </v-snackbar>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'DLRPreferencesPage',
  data: () => ({
    languages: [
      { value: '0', languageName: 'English' },
      { value: '1', languageName: 'French' },
      { value: '2', languageName: 'Spanish' },
      { value: '3', languageName: 'German' },
      { value: '4', languageName: 'Italian' },
      { value: '5', languageName: 'Japanese' },
      { value: '6', languageName: 'Russian' }
    ],
    selectLanguage: null,
    regions: [
      { value: '0', regionName: 'Canada' },
      { value: '1', regionName: 'United States' },
      { value: '2', regionName: 'Australia' },
      { value: '3', regionName: 'France' },
      { value: '4', regionName: 'Germany' },
      { value: '5', regionName: 'Mexico' },
      { value: '6', regionName: 'Switzerland' }
    ],
    selectRegion: null,
    timeout: 1500,
    snackbar1: false,
    snackbar1Text: 'Language Saved',
    snackbar2: false,
    snackbar2Text: 'Region Saved'
  }),
  methods: {
    saveLanguage () {
      this.snackbar1 = true
      console.log('Language saved: ' + this.selectLanguage.languageName)
    },
    saveRegion () {
      this.snackbar2 = true
      console.log('Region saved: ' + this.selectRegion.regionName)
    }
  }
}
</script>
<style scoped>
.v-text-field--outlined:hover >>> fieldset {
  border: 1px solid #3F51B5;
}
.container {
  width: 65%;
  background-color: white;
  height: 100vh;
  flex-grow: 1;
}
span {
  color: #66788A;
}
@media only screen and (max-width: 768px) {
  .container {
  width: 100%;
  }
}
</style>
