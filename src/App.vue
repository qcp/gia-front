<template>
  <v-app style="background-color: #E1E1E1">
    <v-content>
      <v-container fill-height>
        <v-layout wrap align-center>
          <v-flex>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { USER_REQUEST } from "@/store/actions/user";

export default {
  name: "App",
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
  components: {},

  data: () => ({
    dialog: false
  })
};
</script>