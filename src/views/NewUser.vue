<template>
  <v-dialog v-model="isShow" persistent max-width="800px">
    <v-form ref="form">
      <v-card class="py-4">
        <v-card-text>
          <v-text-field v-model="email" label="Email address" :rules="ruleRequired" dense outlined></v-text-field>
          <v-text-field v-model="firstName" label="First name" :rules="ruleRequired" dense outlined></v-text-field>
          <v-text-field v-model="lastName" label="Last name" :rules="ruleRequired" dense outlined></v-text-field>
          <v-select
            v-model="office"
            label="Office"
            :items="offices"
            :rules="ruleRequired"
            dense
            outlined
          ></v-select>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Birthday"
                readonly
                :rules="ruleRequired"
                dense
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              dense
              outlined
              min="1950-01-01"
              @change="saveDate"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            v-model="password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            :rules="ruleRequired"
            dense
            outlined
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="createUser" outlined>Save</v-btn>
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
    isShow: Boolean
  },
  data: () => ({
    email: "",
    firstName: "",
    lastName: "",
    office: "",
    date: null,
    password: "",

    menu: false,
    offices: [],
    showPass: false,
    ruleRequired: [v => !!v || "Required field!"]
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    saveDate: function(date) {
      this.$refs.menu.save(date);
    },
    createUser: function() {
      if (this.$refs.form.validate()) {
        apiCall({
          url: "create-user",
          data: {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            office: this.office,
            birthday: this.date,
            password: this.password
          }
        }).then(resp => this.$emit("dialogSave", resp.user));
      }
    },
    cancelUser: function() {
      //TODO
      this.$emit("dialogCancel");
    }
  },
  created: function() {
    apiCall({
      url: "get-offices"      
    }).then(resp => this.offices = resp.offices);
  }
};
</script>
