
import { userService } from "../services/user-service.js";
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const userStore = {
  // state: {
  //   user: null,
    
  // },
  state: {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
},
  getters: {
    user(state) {
      return state.watchedUser;
    },
    users({ users }) { return users },
    loggedinUser({ loggedinUser }) { return loggedinUser },
    watchedUser({ watchedUser }) { return watchedUser }
  },
  mutations: {
    login(state, { user }) {
      console.log('user',user);
      state.watchedUser = user;
    },

    signup(state, { user }) {
      state.watchedUser = user;
    },

    // logout(state) {
    //   state.user = null;
    // },

    setUser(state, { user }) {
      state.watchedUser = user;
    },


    setLoggedinUser(state, { user }) {
      // Yaron: needed this workaround as for score not reactive from birth
      state.loggedinUser = (user)? {...user} : null;
    },
    setWatchedUser(state, { user }) {
      state.watchedUser = user;
    },       
    setUsers(state, { users }) {
      state.users = users;
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter(user => user._id !== userId)
    },
    setUserScore(state, { score }) {
      state.loggedinUser.score = score
    },
    // setUsers(state, { users }) {
    //   state.users = users;
    // },
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        console.log('userCred',userCred);
        const user = await userService.login(userCred);
        commit({ type: 'login', user })
        return user;
      } catch (err) {
        console.log('Error in Login (user.store):', err);
        throw err;
      }
    },
    // this.$router.push('/')
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: 'signup', user })
        return user;
      } catch (err) {
        console.log('Error in SignUp (user.store):', err);
        throw err;
      }
    },

    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setLoggedinUser' , user:null })
        // return res.data;
      } catch (err) {
        console.log('Error in LogOut (user.store):', err);
        throw err;
      }
    },

    async loadUser({ commit }) {
      try {
        const user = await userService.getLoggedinUser();
        commit({ type: 'setUser', user });
      } catch (err) {
        console.log('Error in load user (user.store):', err);
        throw err;
      }
    },

    async getLoggedUsers() {
      try {
        const users = await userService.getLoggedinUsers();
        // commit({ type: 'setUsers', users });
        return users;
      } catch (err) {
        console.log('Error in getLoggedUsers (user.store):', err);
        throw err;
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
          await userService.remove(userId);
          commit({ type: 'removeUser', userId })
      } catch (err) {
          console.log('userStore: Error in removeUser', err)
          throw err
      }
  },
  async updateUser({ commit }, { user }) {
      try {
          user = await userService.update(user);
          commit({ type: 'setUser', user })
      } catch (err) {
          console.log('userStore: Error in updateUser', err)
          throw err
      }

  },
  }
}
