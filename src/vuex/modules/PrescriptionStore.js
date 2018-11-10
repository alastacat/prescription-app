const ref = 'prescriptions'

export default {
	namespaced: true,
	state: {
		prescription: null,
		prescriptions: []
	},
	mutations: {
		SET_PRESCRIPTION(state, result) {

		},
		SET_PRESCRIPTIONs(state, result) {

		}
	},
	actions: {
		async submit({ rootState }, data) {
			const result = await rootState.db.ref(ref).push(data);
			return result;
		}

	},
	getters: {
		prescription: state => state.prescription,
		prescriptions: state => state.prescriptions

	}
};
