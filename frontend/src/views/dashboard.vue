<template>
  <section>
    <chart v-if="toysData" :toysData="toysData" class="chart" />
  </section>
</template>

<script>
import chart from "../cmps/toy-chart";
export default {
  components: {
    chart,
  },
  created() {
    if (!this.$store.state.toys) {
      this.$store.dispatch({ type: "loadToys" }).then(() => {
        this.$store.dispatch({ type: "setToysData" });
      });
    }
  },

  computed: {
    // toys() {
    //   return this.$store.state.toys;
    // },
    toysData() {
      return this.$store.getters.toysData;
    },
  },
};
</script>

<style>
</style>