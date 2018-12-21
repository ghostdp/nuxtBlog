import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  	state : {
		username : ''
	},
	mutations : {
		USER_NAME(state,payload){
			state.username = payload;
		}
	}
})

export default store