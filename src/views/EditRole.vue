<template>
  <v-dialog v-model="isShow" persistent max-width="800px">
    <v-form ref="form">
      <v-card class="pb-4">
        <v-card-title>Edit user role</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            label="Email address"
            readonly
            dense
            outlined
            prepend-icon="mdi-eye-outline"
          ></v-text-field>
          <v-text-field
            v-model="user.firstName"
            label="First name"
            readonly
            dense
            outlined
            prepend-icon="mdi-eye-outline"
          ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            label="Last name"
            readonly
            dense
            outlined
            prepend-icon="mdi-eye-outline"
          ></v-text-field>
          <v-text-field
            v-model="user.office"
            label="Office"
            readonly
            dense
            outlined
            prepend-icon="mdi-eye-outline"
          ></v-text-field>
          <v-select v-model="user.role" label="Role" :items="roles" :rules="ruleRequired" dense outlined prepend-icon="mdi-pencil-outline"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="saveUser" outlined>Save</v-btn>
          <v-btn color="error" @click="cancelUser" outlined>Cancel</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import apiCall from "@/utils/api";

export default {
  props: {
    isShow: Boolean,
    user: Object
  },
  data: () => ({
    roles: [],
    ruleRequired: [v => !!v || "Required field!"]
  }),
  methods: {
    saveUser: function() {
      if (this.$refs.form.validate()) {
        apiCall({
          url: "update-user",
          data: this.user
        }).then(resp => this.$emit("dialogSave", resp.user));
      }
    },
    cancelUser: function() {      
      this.$emit("dialogCancel");
    }
  },
  created: function() {
    apiCall({
      url: "get-roles"      
    }).then(resp => this.roles = resp.roles);
  }
};
</script>
