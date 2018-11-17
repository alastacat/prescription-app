<template>
	<div class="TemplateList">
		<h2 class="App__title">View Prescription Templates</h2>

		<b-button
			class="TemplateList__new"
			:to="{ name: 'prescriptionTemplate.create' }"
			variant="primary"
			size="sm">
			Create Prescription Template
		</b-button>

		<b-card class="TemplateList__card">
			<b-table
				:items="prescriptionTemplates"
				:fields="fields">
				<template slot="surveys" slot-scope="data">
					<span v-if="data.item.surveys" v-text="data.item.surveys.length"/>
					<span v-else v-text="'0'"/>
				</template>
			</b-table>
		</b-card>
	</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			fields: [
				{ key: 'name' },
				{ key: 'surveys' },
				{ key: 'description' },
				{ key: 'author' },
			]
		}
	},
	computed: {
		...mapGetters({
			prescriptionTemplates: 'prescription-template/prescription-templates'
		})
	},
	methods: {
		...mapActions({
			fetchPrescriptionTemplates: 'prescription-template/find'
		})
	},
	created() {
		this.fetchPrescriptionTemplates();
	}
}
</script>


<style lang="scss">
@import '../../styles/index.scss';

.TemplateList {
	@extend .flexbox;
	padding: 1rem;

	&__new {
		align-self: flex-start;
	}

	&__card {
		margin: 1rem;
		width: 100%;
	}


}

</style>

