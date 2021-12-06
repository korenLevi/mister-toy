<template>
  <div id="app">
    <user-msg />
    <app-header></app-header>
    <router-view />
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
import userMsg from "./cmps/user-msg.vue";
import appHeader from "../src/cmps/app-header.vue";
// import {eventBus} from "../services/event-bus-service.js"
export default {
  data(){
    return {
      isLoggedIn: false
    }
  },
  methods:{
    login(){
      this.isLoggedIn = true
    }
  },
  components: {
    appHeader,
    userMsg,
    // eventBus
  },
};
</script>



