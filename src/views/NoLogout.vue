<template>
  <v-dialog v-model="isShow" persistent max-width="800px">
    <v-form ref="form" @submit.prevent="confirmCrash">
      <v-card class="py-4">
        <v-card-text>
          <p
            class="mb-0"
          >No logout detected for you last login on {{logOutDate.toLocaleString('en-GB')}}</p>
        </v-card-text>
        <v-card-text class="py-0">
          <v-textarea
            v-model="reasonText"
            label="Reason"
            :rules="[v => !!v || 'You must describe reason to continue!']"
            outlined
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-radio-group
            row
            v-model="reasonTag"
            :rules="[v => !!v || 'You must chose reason to continue!']"
          >
            <v-radio label="Software crash" value="softwareCrash"></v-radio>
            <v-radio label="System crash" value="systemCrash"></v-radio>
          </v-radio-group>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" outlined>Confirm</v-btn>
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
    logOutDate: new Date(),
    reasonText: "",
    reasonTag: ""
  }),
  methods: {
    confirmCrash: function() {
      if (this.$refs.form.validate()) {
        apiCall({
          url: "save-no-logout-reason",
          method: "POST",
          data: this          
        }).then(resp => this.$emit("dialogConfirm", resp));
      }
    }
  }
};
</script>
