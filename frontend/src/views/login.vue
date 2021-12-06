<template>
  <section>
    <p>{{ msg }}</p>
    <form v-if="isSignIn" @submit.prevent="signIn">
      <label for="fname">username:</label><br />
      <input type="text" id="fname" name="fname" v-model="loginCred.username" /><br />

      <label for="fprice">password:</label><br />
      <input
        type="password"
        id="fprice"
        name="fprice"
        v-model="loginCred.password"
      /><br />
      <input type="submit" value="Sign in" />
      <input type="submit" value="Sign Up" @click.prevent="changeForm" />
    </form>

    <form v-else @submit.prevent="doSignup">

      <label for="fname">Full name:</label><br />
      <input type="text" id="flname" name="flname" v-model="signupCred.fullname" /><br />


      <label for="fname">username:</label><br />
      <input type="text" id="fname" name="fname" v-model="signupCred.username" /><br />

      <label for="fpass">password:</label><br />
      <input
        type="password"
        id="fpass"
        name="fpass"
        v-model="signupCred.password"
      /><br />
      <input type="submit" value="Submit" />
      <input type="submit" value="Sign In" @click.prevent="changeForm" />
    </form>
  </section>
</template>

<script>
// import { ValidationProvider } from "vee-validate";
import { userService } from "../services/user-service.js";
import { authService } from "../services/auth-service.js";
import {eventBus} from "../services/event-bus-service.js"
export default {
  components: {
    // ValidationProvider,
    eventBus
  },
  data() {
    return {
      msg: "",
      loginCred: {username: '', password: ''},
      signupCred: {username: '', password: '', fullname: ''},
      isSignIn: true,
    };
  },
  methods: {
   async signIn() {
    
      console.log('userCred',this.loginCred);
       try {
        await this.$store.dispatch({
          type: "login",
          userCred: this.loginCred
        });
        this.$router.push("/home");
      } catch (err) {
        alert("Wrong Login Details");
        console.log("Error in Login (home-page):", err);
        throw err;
      }
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = "Please fill up the form"
        return
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$router.push('/home')
      
    },
    signUp() {
      this.isSignIn = false;
      console.log(this.isSignIn);
    },
    changeForm() {
      this.isSignIn = !this.isSignIn;
    },
  },
  comments: {
    userService,
    authService,
  },
  
};
</script>

<style >
.sign-buttons {
  display: flex;
  justify-content: center;
}
</style>