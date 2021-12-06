<template>
  <div id="nav">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="/toy">Toys</router-link> |
    <button @click="logout">Log Out</button>
  </div>
</template>

<script>
export default {
  methods: {
    async logout(){
      try {
      await this.$store.dispatch({type:"logout"})
      this.$router.push('/')
      }
      catch(err){
        throw err
      }
     
    }
  }
};
</script>
