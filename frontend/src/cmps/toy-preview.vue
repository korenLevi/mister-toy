

<template>
  <section v-if="toy && user" >
    <li>{{ toy.name }}</li>
    <div class="toy-img">
      <img :src="getImgUrl" v-bind:alt="toy" />
    </div>

    <div class="toy-btns">
    <button><router-link :to="'/toy/details/' + toy._id" >Details</router-link></button>
    <button><router-link :to="'/toy/edit/' + toy._id" >Edit</router-link></button>
    <button v-if="user.isAdmin" @click="remove(toy._id)">Delete</button>
    </div>

  </section>
</template>

<script>
// import assest from '../assets/'
export default {
  props: {
    toy: {
      type: Object,
      required: true,
    },
  
  },
  data(){
    return {
      user: null,
    }
  },
  created(){
    this.loadUser()
  },
  methods: {
    editToy(toyId) {
      this.$router.push("/toy/edit/" + toyId);
    },
    async loadUser() {
      try {
        await this.$store.dispatch({ type: "loadUser" });
        this.user = this.$store.getters.user;
        console.log(this.user);
      } catch (err) {
        console.log("Error in load user (toy-prev):", err);
        throw err;
      }
    },
    remove(toyId) {
      this.$emit("remove", toyId);
    },
  },
  computed: {
     getImgUrl() {
       console.log('toy',this.toy);
      var images = require.context("../assets/", false, /\.jpeg$/);
      return images("./" + this.toy.name + ".jpeg");
    },
  },
};
</script>

<style >
.toy-img {
  height: 50%;
}
.toy-img img{
  height: 100%;
  min-width: 40%;
}
.toy-btns{
  display: flex;
      flex-direction: column;
}
</style>

