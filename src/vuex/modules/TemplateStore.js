const MODULE = 'templates'

export default {
	namespaced: true,
	state: {
		template: null,
		templates: []
	},
	mutations: {
		SET_TEMPLATE(state, result) {
			state.template = result;
		},
		SET_TEMPLATES(state, result) {
			if (!result) {
				state.templates = [];
				return;
			}
			const templates = [];
			Object.keys(result).forEach(key => {
				templates.push({
					...result[key],
					_id: key
				})
			})
			state.templates = templates;
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
			commit('SET_TEMPLATES', data);
		},
		async get({rootState, commit}, id) {
			const path = `${MODULE}/${id}`
			const ref = rootState.db.ref(path);
			const snap = await ref.once('value');
			const data = snap.val();
			commit('SET_TEMPLATE', { ...data, _id: id });
		}

	},
	getters: {
		'template': state => state.template,
		'templates': state => state.templates

	}
};
