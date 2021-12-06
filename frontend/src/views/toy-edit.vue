

<template>
  <section v-if="toy" class="toy-edit-container">
    <aside>
        <button><router-link :to="'/toy/'" >Back</router-link></button>
    </aside>
    <div class="toy-edit">
      <!-- <li>{{ toy.name }}</li> -->

      <div class="toy-img">
        <img :src="getImgUrl" v-bind:alt="toy" />
      </div>

      <form v-if="toyCpy" @submit.prevent="saveToy">
        <label for="fname">Toy name:</label><br />
        <input
          type="text"
          id="fname"
          name="fname"
          v-model="toyCpy.name"
        /><br />

        <label for="fprice">Toy price:</label><br />
        <input
          type="number"
          id="fprice"
          name="fprice"
          v-model="toyCpy.price"
        /><br />

        <label for="lname"> Stock:</label><br />
        <input
          type="text"
          id="lname"
          name="lname"
          v-model="toyCpy.stock"
        /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  </section>
</template>

<script>
import { toyService } from "../services/toy-service.js";
import { showMsg } from "../services/event-bus-service.js";
// import {ValidationProvider, ValidationObserver} from 'vee-validate'
export default {
  data() {
   
    return {
      toy: null,
      name: "",
      price: 0,
      stock: 0,
      toyCpy: null,
    };
  },
  // :rules="rules"
  created() {
    console.log("sdsd");
    if (this.toy) this.toyCpy = this.toy;
    // console.log("this.toyCpy", this.toyCpy);
  },

  methods: {
    testIt($event) {
      console.log("1");
      console.log($event);
    },
    saveToy() {
    
      if (this.toyCpy._id) {
        this.$store
          .dispatch({ type: "updateToy", toy: this.toyCpy })
          .then((savedToy) => {
            showMsg(`The ${savedToy.name} Toy updated... `);
          })
          .catch(() => {
            showMsg(`Failed to update Toy`, "danger");
          });
      } else {
        showMsg(`There is a problem..`, "danger");
      }
      this.$router.push("/toy");
    },
  
  },
  computed: {
    getImgUrl() {
      console.log("toy", this.toy);
      var images = require.context("../assets/", false, /\.jpeg$/);
      return images("./" + this.toy.name + ".jpeg");
    },
    // :model="this"
  },
  // components:{
  //   ValidationProvider,
  //   ValidationObserver
  // },
  watch: {
    "$route.params": {
      handler() {
        const { toyId } = this.$route.params;
        console.log("toyId", toyId);
        if (toyId) {
          console.log(toyId);
          toyService.getById(toyId).then((toy) => {
            console.log('toy-edit',toy);
            this.toy = toy;
            this.toyCpy = toy;
          });
        } else {
          console.log('else');
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
@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
</style>