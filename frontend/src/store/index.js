import Vue from 'vue'
import Vuex from 'vuex'
import {
  toyService
} from '../services/toy-service'
// import { toyStore } from './toy.store.js'
import {
  userStore
} from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toys: null,
    toysData: null,
    filterBy: {
      name: '',
      inStock: '',
      lable: ''
    },
  },
  getters: {
    toys(state) {
      return state.toys
    },
    toysData(state) {
      return state.toysData
    },
  },
  mutations: {
    setToys(state, payload) {
      state.toys = payload.toys
      console.log('state.toys', state.toys)
    },
    setToysData(state, payload) {
      state.toysData = payload.toysData
    },
    setFilter(state, {
      copyFilter
    }) {
      console.log(copyFilter)
      state.filterBy = copyFilter
    },
    updateToy(state, payload) {
      const idx = state.toys.findIndex((toy) => toy._id === payload.toy._id)
      state.toys.splice(idx, 1, payload.toy)
    },
    removeToy(state, {
      toyId
    }) {
      state.toys = state.toys.filter(toy => toy._id !== toyId)

    }
  },
  actions: {
    async loadToys(context, payload) {
      console.log('loadToys from store');
      return toyService.query()
        .then(toys => {
          context.commit({
            type: 'setToys',
            toys
          })
        })
    },
  
    async setToysData(context) {
      console.log('context', context);
      return toyService.toysDataChart()
        .then(toysData => {
          context.commit({
            type: 'setToysData',
            toysData
          })
        })
    },
    async updateToy({
      commit
    }, {
      toy
    }) {
      console.log('toy update func', toy);
      return await toyService.save(toy).then((savedToy) => {
        commit({
          type: 'updateToy',
          toy: savedToy
        })
        return savedToy
      })
    },
    async getToy({
      commit
    }, {
      toyId
    }) {
      try {
        const toy = await toyService.getById(toyId);
        // commit({ type: 'getToy', toy });
        return toy;
      } catch (err) {
        console.log('Error in Getting a Toy (Store):', err);
        throw err;
      }
    },

    async removeToy({
      commit
    }, {
      toyId
    }) {
      try {
        console.log('toyid', toyId);
        const removedToyId = await toyService.remove(toyId);
        commit({
          type: 'removeToy',
          toyId
        });
        return removedToyId;
      } catch (err) {
        console.log('Removing Error (Store):', err);
        throw err;
      }
    },

  },


  modules: {
    userStore,
  }
})