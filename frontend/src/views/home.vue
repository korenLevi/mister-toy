<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <helloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <chart v-if="toysData" :toysData="toysData" class="chart" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/cmps/helloWorld.vue'
import chart from "@/cmps/toy-chart";
export default {
  name: 'Home',
  components: {
    helloWorld,
    // chart
  },
  created(){
  this.$store.dispatch({ type: "loadToys" })
    .then(() => {
        this.$store.dispatch({ type: "setToysData2" });
    })
  
  },

   computed: {
  
  },
  
}
</script>
