<template>
	<div class="PrescriptionCreate">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>
			<h2 class="App__title">New Prescription</h2>

			<b-form-group
				class="App__formGroup"
				label="Template:"
				label-for="prescriptionTemplate"
				horizontal>
				<b-form-select id="prescriptionTemplate" v-model="templateId" :options="templateOptions"/>
			</b-form-group>


			<b-form-group
				class="App__formGroup"
				label="Description:"
				label-for="prescriptionDescription"
				horizontal>
				<b-form-textarea id="prescriptionDescription" v-model="description" :rows="3"/>
			</b-form-group>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			isLoading: false,
			templateId: null,
			description: null
		}
	},
	computed: {
		...mapGetters({
			templates: 'template/templates'
		}),
		templateOptions() {
			return this.templates.map(t => {
				return {
					text: t.name,
					value: t._id
				}
			});
		}
	},
	methods: {
		...mapActions({
			fetchTemplates: 'prescription-template/find'
		}),
		setTemplateIdFromRoute() {
			this.templateId = this.$route.query.templateId;
			console.log('this.$route.query.templateId: ', this.$route.query.templateId);
		}
	},
	created() {
		this.setTemplateIdFromRoute();
		this.fetchTemplates(); // #Todo: only load templates when user searching for / changing them
	},
	watch: {
		$route() {
			this.setTemplateIdFromRoute();
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.PrescriptionCreate {
	@extend .flexbox;
	padding: 1rem;
}

</style>

