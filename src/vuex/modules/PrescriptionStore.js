const MODULE = 'prescriptions'

export default {
	namespaced: true,
	state: {
		prescription: null,
		prescriptions: []
	},
	mutations: {
		SET_PRESCRIPTION(state, result, id) {
			const prescripion = {
				...result,
				_id: id
			}
			state.prescription = prescripion;
		},
		SET_PRESCRIPTIONS(state, result) {
			if (!result) {
				state.prescriptions = [];
				return;
			}
			const prescriptions = [];
			// Attach the ids to the prescription template objects
			Object.keys(result).forEach(key => {
				prescriptions.push({
					...result[key],
					_id: key
				})
			})
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
		},
		async get({rootState, commit}, id) {
			const path = `${MODULE}/${id}`
			const ref = rootState.db.ref(path);
			const snap = await ref.once('value');
			const data = snap.val();
			commit('SET_PRESCRIPTION', data, id);
		}

	},
	getters: {
		'prescription': state => state.prescription,
		'prescriptions': state => state.prescriptions

	}
};
