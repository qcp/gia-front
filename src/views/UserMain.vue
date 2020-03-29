<template>
  <div v-if="this.$store.getters.isProfileLoaded">
    <v-card>
      <v-card-text>
        <p class="text-left">Hi {{$store.getters.getProfile.firstName}}, Welcome to AMONIC Airlines.</p>
        <p
          class="text-right"
        >Time spend on system: {{timePrettyDiff(allSpendTime)}} Number of crashes: {{allCrashes}}</p>
      </v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Login time</th>
              <th class="text-left">Logout time</th>
              <th class="text-left">Time spend</th>
              <th class="text-left">Unsuccessful logout reason</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tracking" :key="item.name" :class="item.isCrash ? 'error' : ''">
              <td>{{ new Date(item.loginTime).toLocaleDateString() }}</td>
              <td>{{ new Date(item.loginTime).toLocaleTimeString('en-GB') }}</td>
              <td>{{ item.logoutTime ? new Date(item.logoutTime).toLocaleTimeString('en-GB') : '...' }}</td>
              <td>{{ item.logoutTime ? timePrettyDiff(new Date(item.logoutTime) - new Date(item.loginTime)) :'...' }}</td>
              <td>{{ item.reasonText }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <NoLogout
        :isShow="dialog"
        :lastLoginId="lastLoginId"
        :lastLoginTime="lastLoginTime"
        @dialogConfirm="noLogoutConfirm"
      />
    </v-card>
  </div>
  <div v-else>
    <v-overlay opacity="0">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import NoLogout from "@/views/NoLogout";
import { AUTH_LOGOUT } from "@/store/actions/auth";
import { remote } from "electron";
import apiCall from "@/utils/api";

export default {
  components: {
    NoLogout
  },
  data: () => ({
    dialog: false,
    lastLoginTime: "",
    lastLoginId: 0,
    tracking: []
  }),
  computed: {
    allSpendTime: function() {
      return this.tracking
        ? this.tracking.reduce(
            (a, c) =>
              c.logoutTime
                ? a +
                  new Date(c.logoutTime).getTime() -
                  new Date(c.loginTime).getTime()
                : a,
            0
          )
        : 0;
    },
    allCrashes: function() {
      return this.tracking
        ? this.tracking.reduce((a, c) => a + c.isCrash, 0)
        : "...";
    }
  },
  methods: {
    noLogoutConfirm: function() {
      apiCall({ url: "get-user-tracking" }).then(
        resp => (this.tracking = resp.tracking)
      );
      this.dialog = false;
    },
    timePrettyDiff: function(diff) {
      let hh = Math.floor(diff / 1000 / 60 / 60);
      diff -= hh * 1000 * 60 * 60;
      let mm = Math.floor(diff / 1000 / 60);
      diff -= mm * 1000 * 60;
      let ss = Math.floor(diff / 1000);
      diff -= ss * 1000;

      return `${hh < 10 ? "0" + hh : hh}:${mm < 10 ? "0" + mm : mm}:${
        ss < 10 ? "0" + ss : ss
      }`;
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
      {
        label: "**Perform error**",
        click: () =>
          localStorage.removeItem("user-token")
      }
    ];
    const menu = remote.Menu.buildFromTemplate(template);
    remote.Menu.setApplicationMenu(menu);
  },
  mounted: function() {
    apiCall({ url: "get-user-tracking" }).then(resp => {
      this.tracking = resp.tracking;
      const lastLogin = resp.tracking[resp.tracking.length - 1];
      if ((this.dialog = lastLogin.isCrash && !lastLogin.reasonText)) {
        this.lastLoginTime = lastLogin.loginTime;
        this.lastLoginId = lastLogin.id;
      }
    });
  }
};
</script>
