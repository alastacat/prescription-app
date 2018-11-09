export default {
	namespaced: true,
	state: {
		account: null		// the user object from our database records
	},
	mutations: {
		SET_ACCOUNT(state, data) {
			if (!data) {
				state.account = null
			} else {
				state.account = data.user;
			}
		}
	},
	actions: {
		async signUp({ commit, rootState }, { username, password }) {
			console.log(username);
			const result = await rootState.firebase.auth().createUserWithEmailAndPassword(username, password);
			commit('SET_ACCOUNT', result);
			console.log(result);
			return result;
		},
		async logIn({ state, commit, dispatch, rootState }, { username, password }) {
			const result = await rootState.firebase.auth().signInWithEmailAndPassword({ username, password });
			commit('SET_ACCOUNT', result);
			return result;
		},
		async logOut({ commit, rootState }) {
			const result = await rootState.firebase.auth().signOut();
			commit('SET_ACCOUNT', null);
			return result;
		},

	},
	getters: {
		account: state => state.account
	}
};
