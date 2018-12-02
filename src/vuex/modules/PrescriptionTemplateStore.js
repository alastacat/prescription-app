const MODULE = 'prescription-templates'

export default {
	namespaced: true,
	state: {
		prescriptionTemplate: null,
		prescriptionTemplates: []
	},
	mutations: {
		SET_PRESCRIPTION_TEMPLATE(state, result, id) {
			const prescripionTemplate = {
				...result,
				_id: id
			}
			state.prescriptionTemplate = prescripionTemplate;
		},
		SET_PRESCRIPTION_TEMPLATES(state, result) {
			if (!result) {
				state.prescriptionTemplates = [];
				return;
			}
			const prescriptionTemplates = [];
			// Attach the ids to the prescription template objects
			Object.keys(result).forEach(key => {
				prescriptionTemplates.push({
					...result[key],
					_id: key
				})
			})
			state.prescriptionTemplates = prescriptionTemplates;
		}
	},
	actions: {
		async submit({ rootState }, data) {
			const result = await rootState.db.ref(MODULE).push(data);
			return result;
		},
		async find({ rootState, commit }, filters) {
			let ref;
			if (filters && filters.author) {
				ref = rootState.db.ref(MODULE).orderByChild('author').equalTo(filters.author)
			} else {
				ref = rootState.db.ref(MODULE);
			}
			const snap = await ref.once('value');
			const data = snap.val();
			commit('SET_PRESCRIPTION_TEMPLATES', data);
		},
		async get({rootState, commit}, id) {
			const path = `${MODULE}/${id}`
			const ref = rootState.db.ref(path);
			const snap = await ref.once('value');
			const data = snap.val();
			commit('SET_PRESCRIPTION_TEMPLATE', data, id);
		}

	},
	getters: {
		'prescription-template': state => state.prescriptionTemplate,
		'prescription-templates': state => state.prescriptionTemplates

	}
};
