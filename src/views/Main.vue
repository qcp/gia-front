<!--
 В общем, првильней стартовую страницу параметризировать,
 и хранить в базе в связке с ролью.
 Но по заданию так, поэтому хуй с ним
-->

<template>
  <div v-if="this.$store.getters.getRole == 'admin'">
    <AdminMain />
  </div>
  <div v-else-if="this.$store.getters.getRole == 'user'">
    <UserMain />
  </div>
  <div v-else>
    <v-overlay opacity="0">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import AdminMain from "@/views/AdminMain";
import UserMain from "@/views/UserMain";
//import aaa from "@/views/NoLogout";
export default {
  components: {
    AdminMain,
    UserMain
  }
};
</script>