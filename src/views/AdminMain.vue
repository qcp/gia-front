<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search by office"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      item-key="id"
      v-model="selected"
      :headers="headers"
      :items="users"
      :search="search"
      show-select
    >
      <template v-slot:item.isActive="{ item }">
        <v-chip :color="item.isActive?'success':'error'" dark>{{ item.isActive?"Enable":"Disable" }}</v-chip>
      </template>
    </v-data-table>
    <v-card-actions>
      <v-btn
        color="error"
        :disabled="selected.length!=1"
        @click="dialogEditRole = true"
        outlined
      >Change role</v-btn>
      <v-btn
        color="error"
        :disabled="!selected.length"
        @click="swithActive"
        outlined
      >Enable\Disable login</v-btn>
    </v-card-actions>
    <NewUser
      :isShow="dialogNewUser"
      @dialogCancel="dialogNewUser = false"
      @dialogSave="createUser"
    />
    <EditRole
      :isShow="dialogEditRole"
      :user="selected.length ? selected[0] : {}"
      @dialogCancel="dialogEditRole = false"
      @dialogSave="updateUser"
    />
  </v-card>
</template>

<script>
import NewUser from "@/views/NewUser";
import EditRole from "@/views/EditRole";
import { AUTH_LOGOUT } from "@/store/actions/auth";
import { remote } from "electron";
import apiCall from "@/utils/api";

export default {
  components: {
    NewUser,
    EditRole
  },
  data: () => ({
    dialogNewUser: false,
    dialogEditRole: false,
    search: "",
    headers: [
      { text: "Name", filterable: false, value: "firstName" },
      { text: "Last name", filterable: false, value: "lastName" },
      { text: "Age", filterable: false, value: "age" },
      { text: "Active", filterable: false, value: "isActive" },
      { text: "User role", filterable: false, value: "role" },
      { text: "Email address", filterable: false, value: "email" },
      { text: "Office", value: "office" }
    ],
    users: [],
    selected: []
  }),
  methods: {
    createUser: function(user) {
      this.users.push(user);
      this.dialogNewUser = false;
    },
    updateUser: function(user) {      
      this.$set(this.selected, 0, user);
      this.selected = [];
      this.dialogEditRole = false;
    },
    swithActive: function() {
      this.selected.forEach(user => {
        user.isActive = !user.isActive;
        apiCall({
          url: "update-user",
          data: user
        }).then(resp => user = resp.user);
      });
    }
  },
  created: function() {
    const template = [
      {
        label: "Exit",
        click: () =>
          this.$store
            .dispatch(AUTH_LOGOUT)
            .then(this.$router.push("/login"))
      },
      { label: "Add user", click: () => (this.dialogNewUser = true) }
    ];
    const menu = remote.Menu.buildFromTemplate(template);
    remote.Menu.setApplicationMenu(menu);
  },
  mounted: function() {
    apiCall({ url: "get-user-list"}).then(
      resp => (this.users = resp.users)
    );
  }
};
</script>
