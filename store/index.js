import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  	state : {
		username : '',
		menuindex : '1'
	},
	mutations : {
		USER_NAME(state,payload){
			state.username = payload;
		},
		MENU_INDEX(state,payload){
			state.menuindex = payload;
		}
	}
})

export default store