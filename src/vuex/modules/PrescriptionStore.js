const MODULE = 'prescriptions'

export default {
	namespaced: true,
	state: {
		prescription: null,
		prescriptions: []
	},
	mutations: {
		SET_PRESCRIPTION(state, result) {
			// #Todo: create mutation to store most recently loaded prescription
		},
		SET_PRESCRIPTIONS(state, result) {
			const prescriptions = Object.values(result);
			state.prescriptions = prescriptions;
		}
	},
	actions: {
		async submit({ rootState }, data) {
			const result = await rootState.db.ref(MODULE).push(data);
			return result;
		},
		async find({ rootState, commit }) {
			const ref = rootState.db.ref(MODULE);
			const snap = await ref.once('value');
			const data = snap.val();
			commit('SET_PRESCRIPTIONS', data);
		}

	},
	getters: {
		prescription: state => state.prescription,
		prescriptions: state => state.prescriptions

	}
};
