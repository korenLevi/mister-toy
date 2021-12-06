



<template>
  <section class="toy-app">
  
    <!-- <toy-filter @filtered="setFilter"></toy-filter> -->
    <toy-list v-if="toys" :toys="toys" @remove="removeToy"></toy-list>
 
  </section>
</template>

<script>
import { showMsg } from "@/services/event-bus-service.js";
import toyList from "../cmps/toy-list.vue";
import toyFilter from "@/cmps/toy-filter.vue";
import chart from "../cmps/toy-chart";
export default {
  name: "toyApp",
  data() {
    return {};
  },
  created() {
    console.log("toy-app created!");
  
    this.$store.dispatch({ type: "loadToys" })
    this.$store.dispatch({ type: "setToysData" });

  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
    toysData() {
      return this.$store.state.toysData;
    },
  },
  methods: {
    setFilter(filterBy) {
      const copyFilter = JSON.parse(JSON.stringify(filterBy));
      this.$store.commit({ type: "setFilter", copyFilter });
    },
    removeToy(toyId) {
      // this.$emit("remove", toyId);
      this.$store.dispatch({type:"removeToy",toyId:toyId});
      this.$store.dispatch({ type: "loadToys" })
    },
  },

  components: {
    toyList,
    chart,
    showMsg,
    toyFilter,
  },
};
</script>