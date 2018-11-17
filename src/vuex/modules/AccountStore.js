const MODULE = 'users'

export default {
	namespaced: true,
	state: {
		auth: null,
		account: null
	},
	mutations: {
		SET_AUTH(state, data) {
			if (!data) {
				state.auth = null;
			} else {
				state.auth = data;
			}
		},
		SET_ACCOUNT(state, account) {
			if (!account) {
				state.account = null;
			} else {
				state.account = account;
			}
		}
	},
	actions: {
		async signUp({ commit, dispatch, rootState }, { username, password, title, firstName, lastName }) {
			let result = await rootState.firebase.auth().createUserWithEmailAndPassword(username, password);
			commit('SET_AUTH', result);
			const user = await rootState.db.ref(`${MODULE}/${result.user.uid}`).set({
				title,
				firstName,
				lastName,
				email: username
			});
			dispatch('logIn', { username, password });
			return user;
		},
		async logIn({ commit, rootState }, { username, password }) {
			const result = await rootState.firebase.auth().signInWithEmailAndPassword(username, password);
			commit('SET_AUTH', result);
			const accountRef = rootState.db.ref(`${MODULE}/${result.user.uid}`);
			const accountSnap = await accountRef.once('value');
			const account = accountSnap.val();
			commit('SET_ACCOUNT', account);
			return account;
		},
		async logOut({ commit, rootState }) {
			const result = await rootState.firebase.auth().signOut();
			commit('SET_AUTH', null);
			commit('SET_ACCOUNT', null);
			return result;
		},

	},
	getters: {
		account: state => state.account
	}
};
