<template>
<div>
  <v-row justify="center">
    <v-btn data-cy="user-grp-dialog-main-btn" color="primary" class="ma-2" dark @click="dialog = true">
      Open Dialog 1
    </v-btn>
    
    <!-- DIALOG #1 -->
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card class="px-1 pb-1">

        <v-card-title @click="renderList()">
          <v-icon>mdi-tag</v-icon>&nbsp;Label
        </v-card-title>
        <v-divider></v-divider>
        
        <v-card-text data-cy="user-grp-list" style="height: 210px;" class="pb-0">
          <v-radio-group  v-model="select" column>
            <!-- loop render group list -->
            <div v-for="(group, select) in groups" :key="group.select">
              <v-radio class="px-auto pb-1"> 
                <template v-slot:label >
                  <div v-bind:data-cy="`${group.name.replace(/\s+/g, '-')}-label`" v-bind:style="{ color: group.color }">  {{group.name}} </div>
                  &nbsp; 
                  <!-- btn for edit pane -->
                  <v-icon v-bind:data-cy="`${group.name.replace(/\s+/g, '-')}-edit`" @click="openEdit(select)">mdi-pencil-box-outline</v-icon>
                </template>
              </v-radio>
              <!-- </div> -->
            </div>
          </v-radio-group>
        </v-card-text>

        <!-- <h6>Selected Radios: {{select}} {{groups[select].name}}</h6> -->
        <v-btn data-cy="create-grp-btn" elevation="0"  block @click="openCreate()" class="my-2">
          <v-icon>mdi-account-plus</v-icon>&nbsp;new group
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
          <v-color-picker data-cy="user-grp-edit-picker" flat v-model="color" hide-inputs swatches-max-height="200" hide-mode-switch :show-swatches="false"></v-color-picker>
          <v-text-field  data-cy="user-grp-edit-tf" v-model="groupNameInput" :rules="[rules.required, rulesGroupName.max]" maxlength="10" placeholder="Group Name"></v-text-field>
        </v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn  data-cy="user-grp-edit-submit" color="success" style="width: 180px;" @click="editGroup(select)">
            <v-icon>mdi-check</v-icon>&nbsp;confirm
          </v-btn>
          <v-btn data-cy="user-grp-edit-delete"  color="error"  outlined  @click="dialog3= !dialog3">
            <v-icon>mdi-account-remove</v-icon>&nbsp;delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG #3 GROUP DEL CONFIRMATION -->
    <v-dialog v-model="dialog3" persistent max-width="370">
      <v-card>
        <v-card-title class="text-h5"> Delete group {{ groups[select].name}} ? </v-card-title>
        <v-card-text>All User belongs to the group will be set to default.</v-card-text>
        <v-card-actions class="d-flex justify-center pt-0">
          <v-btn  data-cy="user-grp-edit-delete-cancel" color="primary" outlined style="width: 130px;" @click="dialog3 = false">
            <v-icon>mdi-cancel</v-icon>&nbsp;cancel
          </v-btn>
          <v-btn  data-cy="user-grp-edit-delete-delete" color="error" style="width: 190px;" @click="delGroup(select)" class="mr-1">
            <v-icon>mdi-account-remove</v-icon>&nbsp; delete group
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG #4 GROUP CREATION -->
    <v-dialog v-model="dialog4" max-width="370">
      <v-card>
        <v-card-title class="text-h5 pb-0"> Create new group </v-card-title>
        <v-card-text class="pt-0 pb-0"><v-text-field data-cy="create-grp-tf" v-model="groupNameInput" :rules="[rules.required, rulesGroupName.max]" maxlength="10" placeholder="Group Name"></v-text-field></v-card-text>
        <v-card-actions class=" justify-center pt-0">
          <v-btn data-cy="create-grp-cancel" color="primary" outlined style="width: 120px;" @click="dialog4 = false">
            <v-icon>mdi-cancel</v-icon>&nbsp;cancel
          </v-btn>
          <v-btn data-cy="create-grp-submit" color="success" style="width: 190px;" @click="createGroup()" class="mr-1">
            <v-icon>mdi-account-plus</v-icon>&nbsp;create group
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DYNAMIC SNACKBAR (NOTIFICATION) -->
    <v-snackbar data-cy="user-grp-snackbar" v-model="snackbar" :snackbarTimeout="snackbarTimeout" :color="snackbarColor">
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
      // states
      select: 0,
      group: "",
      groupNameInput: "",
      // data
      groups: [
        { name: 'Family', color: '#3B7600', id: '6076cb9a-66ed-49e9-9466-6a5da0f3179f'},
        { name: 'School',  color: '#007652', id: '643136f7-7c93-4bbb-a894-c4936b00dae2'},
        { name: 'Friend',  color: '#430086', id: '156801fb-0ecb-4649-b115-f11dbac06ae7'},
      ],
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      rules: {
        required: (v) => !!v || "",
      },
      rulesGroupName: {
        max: (v) => v.length <= 10 || "Max 10 characters",
      },
      // snack bar
      snackbar: false,
      snackbarText: "",
      snackbarColor: "primary",
      snackbarTimeout: 2000,
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
        console.log("=========renderList(" + this.select + ")=========");
        for(let i = 0; i < this.groups.length; i++)
            console.log("#" + i + " [" + this.groups[i].name + ", " + this.groups[i].color + "]");
      },
      openCreate(){
        this.dialog4 = true;
        this.groupNameInput = "";
      },
      createGroup() {
        // this.renderList();
        // console.log(this.groupNameInput);
        const name = this.groupNameInput.trim();
        // console.log(name);
        if(name=="") {
          this.snackbarText = "Empty group name";
          this.snackbarColor = "error";
        } else if (this.isDuplicateGrp(name,0)) {
          this.snackbarText = name + " already exists";
          this.snackbarColor = "error";
        } else {
          this.groups.push({
            // name: (Math.random() + 1).toString(36).substring(7),
            name: name,
            color: "#" + Math.floor(Math.random()*16777215).toString(16),
            id: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
              (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
          });
          this.groupNameInput="";
          this.dialog4 = false;
          this.snackbarText = "Group Created";
          this.snackbarColor = "success";
        }
        this.snackbar = true;
        this.renderList();
      },
      openEdit(select) {
        console.log("openEdit(" + select + ")");
        this.hex = this.groups[select].color;
        this.groupNameInput = this.groups[select].name;
        this.dialog2 = true;
      },
      delGroup(select) {
        console.log("delGroup(" + select + ")");
        // console.log(select + ", " + this.groups[select].name);
        this.renderList();
        if(this.groups.length==1) {
          this.snackbarText = "Keep at least one group";
          this.snackbarColor = "error";
        } else {
          const name = this.groups[select].name;
          this.select = this.select-1 < 0 ? 0 : this.select-1;
          this.groups.splice(select, 1); 
          this.snackbarText = name + " group deleted";
          this.snackbarColor = "success";
        }
        this.snackbar = true;
        this.dialog3 = false;
        this.dialog2 = false;
        this.renderList();
      },
      editGroup(select) {
        console.log("editGroup(" + select + ")");
        const name = this.groupNameInput.trim();
        var item = this.groups[this.select];
        if(name==""){
          this.snackbarText = "Empty group name";
          this.snackbarColor = "error";
        } else if (this.isDuplicateGrp(name,1)) {
          this.snackbarText = name + " already exists";
          this.snackbarColor = "error";
        } else {
          item.name = name;
          this.groups[this.select].color = this.color;
          this.dialog2 = false;
          this.groupNameInput="";
          this.snackbarText = "Group updated";
          this.snackbarColor = "success";
        }
        this.snackbar = true;
        
      },
      submit() {
        console.log("submit()");
        console.log("select#:" + this.select + ":" + this.groups[this.select].name);
      },
      isDuplicateGrp(name, mode){ // mode=1 for edit, mode=0 for new
        // console.log("isDuplicateGrp");
        for(let i = 0; i < this.groups.length; i++)
          if(mode==1){
            if(i!=this.select) 
              if(this.groups[i].name.toUpperCase() == name.toUpperCase()) 
                return true;
          } else {
            if(this.groups[i].name.toUpperCase() == name.toUpperCase()) 
                return true;
          }
        return false;
      }
  },
}
</script>
