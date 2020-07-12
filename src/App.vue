<template>
  <v-app style="background-color: #E1E1E1">
    <v-content>
      <v-container fill-height>
        <v-layout wrap align-center>
          <v-flex>
            <v-dialog :value="!loaded" hide-overlay persistent>
              <v-overlay :value="true">
                <v-card color="primary" dark width="400">
                  <v-card-text>
                    Waiting to establish connection...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-overlay>
            </v-dialog>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { USER_REQUEST } from "@/store/actions/user";
import apiCall from "@/utils/api";

export default {
  name: "App",
  data: () => ({
    loaded: false,
    dialog: false
  }),
  created: function() {
    apiCall({ url: "" })
      .then(() => {
        this.loaded = true;
        if (this.$store.getters.isAuthenticated) {
          this.$store.dispatch(USER_REQUEST);
        }
      })
      .catch(() => {

      });
  }
};
</script>