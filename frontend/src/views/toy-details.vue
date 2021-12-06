<template>

<section>
    <aside>
        <button><router-link :to="'/toy/'" >Back</router-link></button>
    </aside>

  <section v-if="toy" class="toy-details">
    <div class="toy-img">
      <img :src="getImgUrl" v-bind:alt="toy" />
    </div>

    <div>
      <p>Name: {{toy.name}}</p>
      <p>Category: {{toy.labels}}</p>
      <p>Price: {{toy.price}}$</p>
      <p>Units: {{toy.stock}}</p>
    </div>
  </section>
</section>

</template>

<script>
import { toyService } from "../services/toy-service.js";
export default {
  data() {
    return {
      toy: null,
    };
  },
  computed: {
    getImgUrl() {
      console.log("toy", this.toy);
      var images = require.context("../assets/", false, /\.jpeg$/);
      return images("./" + this.toy.name + ".jpeg");
    },
    // :model="this"
  },
  watch: {
    "$route.params": {
      handler() {
        const { toyId } = this.$route.params;
        console.log("toyId", toyId);
        if (toyId) {
          console.log(toyId);
          this.$store.dispatch({ type: "getToy", toyId:toyId })
          .then((toy) => {
            this.toy = toy;
          })
          // toyService.getById(toyId).then((toy) => {
          //   console.log("toy-edit", toy);
          //   this.toy = toy;
          //  ;
          // });
        } else {
          this.toy = toyService.getEmptyToy();
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
</style>