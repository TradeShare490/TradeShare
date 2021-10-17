<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">

      <!-- btn to trigger dialog -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          > User Group Dialog
        </v-btn>
      </template>
      
      <!-- title -->
      <v-card class="px-1 pb-1">
        <v-card-title v-on:click="say('on click title')">
          <v-icon>mdi-tag</v-icon>&nbsp;Label
        </v-card-title>

        <v-divider></v-divider>
        
        <v-card-text style="height: 200px;">
          <v-radio-group v-model="taskGroup" column >

            <!-- loop render group list -->
            <div v-for="grp in groups" :key="grp.name">
              <v-radio class="px-auto pb-1" > 
                <template v-slot:label >
                  <div v-bind:style="{ color: grp.color }"> {{grp.name}} </div>
                  &nbsp;
                  <!-- btn for edit pane -->
                  <v-icon v-on:click="say('on click edit icon') " @click="dialog3 = !dialog3">mdi-pencil-box-outline</v-icon>
                </template>
              </v-radio>
            </div>

          </v-radio-group>
        </v-card-text>
        <h6>Selected Radios: {{taskGroup}}</h6>

        

        <v-btn elevation="0"  block v-on:click="addGroup()" class="my-2">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn elevation="0" color="success" block v-on:click="submit()">
          Save
        </v-btn>

      </v-card>
    </v-dialog>


    <v-dialog v-model="dialog3" max-width="350px">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <v-color-picker  flat  dot-size="25" hide-inputs swatches-max-height="200" hide-mode-switch :show-swatches="false"></v-color-picker>
          <v-text-field value="" placeholder="Group Name"></v-text-field>
        </v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="success" style="width: 230px;" v-on:click="editGroup()" @click="dialog3 = false">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="error"  outlined @click="dialog3 = false">
            <v-icon>mdi-account-remove</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        grp: "",
        editedTask: null,
        groups: [
          { name: "Family", color: "#3B7600"},
          { name: "School",  color: "#007652"},
          { name: "Friend",  color: "#430086"},
        ],
        taskGroup: 1,
        dialog: false,
        groupEdit: false,
        radioGroup: 1,
        radios: 'radio-1',
      }
    },

    methods: {
      
      say(msg) {
        console.log(msg);
        console.log()
      },
      delGroup(index) {
        this.groups.splice(index, 1);
      },
      editGroup() {
        console.log("editGroup()");
        console.log("taskGroup#:" + this.taskGroup + ":" + this.groups[this.taskGroup].name);
        // this.grp = this.groups[index].name;
        // this.editedTask = index;
      },
      addGroup() {
          this.groups.push({
            name: "Group" + " " + (Math.random() + 1).toString(36).substring(7),
            color: "#" + Math.floor(Math.random()*16777215).toString(16),
          });
        this.grp = "";
      },
      submit() {
        console.log("submit()");
        console.log("taskGroup#:" + this.taskGroup + ":" + this.groups[this.taskGroup].name);
      },
  },
    }
  
</script>