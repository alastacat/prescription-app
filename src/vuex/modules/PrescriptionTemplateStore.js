const MODULE = 'prescription-templates'

export default {
	namespaced: true,
	state: {
		prescriptionTemplate: null,
		prescriptionTemplates: []
	},
	mutations: {
		SET_PRESCRIPTION_TEMPLATE(state, result) {
			// #Todo: create mutation to store most recently loaded prescription
		},
		SET_PRESCRIPTION_TEMPLATES(state, result) {
			const prescriptionTemplates = Object.values(result);
			state.prescriptionTemplates = prescriptionTemplates;
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
			commit('SET_PRESCRIPTION_TEMPLATES', data);
		}

	},
	getters: {
		'prescription-template': state => state.prescriptionTemplate,
		'prescription-templates': state => state.prescriptionTemplates

	}
};
