<template>
  <v-form ref="form">
    <v-card max-width="600px" class="mx-auto">
      <v-img height="200" contain src="@/assets/logo.png"></v-img>
      <v-card-text>
        <v-alert
          transition="scale-transition"
          dense
          outlined
          type="error"
          v-model="alert.show"
          dismissible
        >
          {{alert.text}}
        </v-alert>
        <v-text-field
          v-model="username"
          label="Login"
          :rules="[v => !!v || 'Login requred!']"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="[v => !!v || 'Password requred!']"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" @click.prevent="login" color="primary" large outlined>Login</v-btn>
        <v-btn color="error" @click="exit" large outlined>Exit</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { AUTH_REQUEST, AUTH_LOGOUT } from "@/store/actions/auth";

import { remote } from "electron";

export default {
  data: () => ({
    alert: {
      show: false,
      text: ""
    },
    username: "",
    password: ""
  }),
  methods: {
    login: function() {
      if (this.$refs.form.validate()) {
        const { username, password } = this;
        this.$store
          .dispatch(AUTH_REQUEST, { username, password })
          .then(() => {
            this.$router.push("/");
            this.alert = {
              show: false,
              text: ""
            };
          })
          .catch(err => {
            this.alert = {
              show: true,
              text: err.errorText
            };
          });
      }
    },
    exit: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(remote.getCurrentWindow().close());
    }
  },
  created: function() {
    const menu = remote.Menu.buildFromTemplate([]);
    remote.Menu.setApplicationMenu(menu);
  }
};
</script>
