<template>
<div>
  <v-row justify="center">
    <v-btn color="primary" class="ma-2" dark @click="dialog = true">
      Open Dialog 1
    </v-btn>
    
    <!-- DIALOG #1 -->
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card class="px-1 pb-1">

        <v-card-title @click="renderList()">
          <v-icon>mdi-tag</v-icon>&nbsp;Label
        </v-card-title>
        <v-divider></v-divider>
        
        <v-card-text style="height: 210px;" class="pb-0">
          <v-radio-group v-model="index" column>
            <!-- loop render group list -->
            <div v-for="(group, index) in groups" :key="group.index">
              <v-radio class="px-auto pb-1"> 
                <template v-slot:label >
                  <div v-bind:style="{ color: group.color }"> {{group.name}} </div>
                  &nbsp;
                  <!-- btn for edit pane -->
                  <v-icon @click="openEdit(index)">mdi-pencil-box-outline</v-icon>
                </template>
              </v-radio>
            </div>
          </v-radio-group>
        </v-card-text>

        <!-- <h6>Selected Radios: {{index}} {{groups[index].name}}</h6> -->
        <v-btn elevation="0"  block v-on:click="addGroup()" class="my-2">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn elevation="0" color="success" block v-on:click="submit()" @click="dialog = false">
          Save
        </v-btn>

      </v-card>
    </v-dialog>

    <!-- DIALOG #2 GROUP EDIT -->
    <v-dialog v-model="dialog2" max-width="350px">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <v-color-picker flat v-model="color" hide-inputs swatches-max-height="200" hide-mode-switch :show-swatches="false"></v-color-picker>
          <v-text-field v-model="groupNameInput" :rules="[rules.required, rulesGroupName.max]" maxlength="10" placeholder="Group Name"></v-text-field>
        </v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="success" style="width: 230px;" @click="editGroup(index)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="error"  outlined  @click="dialog3= !dialog3">
            <v-icon>mdi-account-remove</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG #2 GROUP DEL CONFIRMATION -->
    <v-dialog v-model="dialog3" persistent max-width="370">
      <v-card>
        <v-card-title class="text-h5"> Delete Group [{{ groups[index].name}}] ? </v-card-title>
        <v-card-text>All User belongs to the group will be set to default.</v-card-text>
        <v-card-actions class="d-flex justify-center pt-0">
          <v-btn color="secondary" outlined style="width: 130px;" @click="dialog3 = false">
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
          <v-btn color="error" style="width: 190px;" @click="delGroup(index)" class="mr-1">
            <v-icon>mdi-account-remove</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DYNAMIC SNACKBAR (NOTIFICATION) -->
    <v-snackbar v-model="snackbar" :snackbarTimeout="snackbarTimeout" :color="snackbarColor">
      {{snackbarText}}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

  </v-row>
</div>
</template>

<script>
  export default {
    
    data: () => ({
        index: 0,
        group: "",
        groupNameInput: "",
        groups: [
          { name: "Family", color: "#3B7600"},
          { name: "School",  color: "#007652"},
          { name: "Friend",  color: "#430086"},
        ],
        dialog: false,
        dialog2: false,
        dialog3: false,
        rules: {
          required: (v) => !!v || "Required",
        },
        rulesGroupName: {
          max: (v) => v.length <= 10 || "Max 10 characters",
        },
        // snack bar
        snackbar: false,
        snackbarText: "",
        snackbarColor: "primary",
        snackbarTimeout: 3000,
        // for color picker
        hex: '#FF0000',
        type: 'hex',
    }),

    // color picker component
    computed: {
      color: {
        get () { return this[this.type] },
        set (v) { this[this.type] = v },
      },
      showColor () {
        if (typeof this.color === 'string') return this.color
        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2));   
          return color
        }, {}), null, 2)
      },
    },

    methods: {
      renderList() {
        console.log("renderList()");
        for(let i = 0; i < this.groups.length; i++)
            console.log("#" + i + " [" + this.groups[i].name + ", " + this.groups[i].color + "]");
      },
      openEdit(index) {
        console.log("openEdit(" + index + ")");
        this.hex = this.groups[index].color;
        this.groupNameInput = this.groups[index].name;
        this.dialog2 = true;
      },
      delGroup(index) {
        console.log("delGroup(" + index + ")");
        console.log(this.groups[index].name);
        if(this.groups.length==1) {
          this.snackbarText = "Keep at least one group";
          this.snackbarColor = "error";
        } else {
          console.log("splice("+index+",1)");
          this.groups.splice(index, 1); 
          this.snackbarText = "User deleted";
          this.snackbarColor = "success";
        }
        this.snackbar = true;
        this.dialog3 = false;
        setTimeout(() => {  this.dialog2 = false; }, 100);
        this.renderList();
      },
      editGroup(index) {
        console.log("editGroup(" + index + ")");
        const newName = this.groupNameInput.trim();
        var item = this.groups[this.index];
        var dupBoolean = 0;
        for(let i = 0; i < this.groups.length; i++){
          if(i!=this.index) {
            var element = this.groups[i];
            if(element.name.toUpperCase() == newName.toUpperCase()) {
              dupBoolean = 1;
              break;
            }
          }
        }
        if(newName !== "" && dupBoolean == 0){
          item.name = newName;
          this.groups[this.index].color = this.color;
          this.dialog2 = false;
          this.snackbarText = "User updated";
          this.snackbarColor = "success";
        } else {
          this.snackbarText = "User update failed";
          this.snackbarColor = "error";
        }
        this.snackbar = true;
      },
      addGroup() {
          this.groups.push({
            name: (Math.random() + 1).toString(36).substring(7),
            color: "#" + Math.floor(Math.random()*16777215).toString(16),
          });
        this.group = "";
      },
      submit() {
        console.log("submit()");
        console.log("index#:" + this.index + ":" + this.groups[this.index].name);
      },
  },
}
</script>