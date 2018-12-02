<template>
	<div class="TemplateDetail">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>

			<h2 class="App__title" v-text="`Prescription Template: ${prescriptionTemplate.name}`"/>

			<h5 class="flex-start" v-text="prescriptionTemplate.author"/>

			<b-card class="App__card">
				<b-list-group flush>
					<b-list-group-item>
						<span class="TemplateDetail__label">Description:</span>
						<span v-text="prescriptionTemplate.description"/>
					</b-list-group-item>
					<b-list-group-item>
						<span class="TemplateDetail__label">Surveys:</span>
						<survey-detail
							class="mb-1"
							v-for="(survey, i) in prescriptionTemplate.surveys"
							:key="i"
							:survey="survey"/>
					</b-list-group-item>
				</b-list-group>
			</b-card>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SurveyDetail from './components/SurveyDetail';

export default {
	components: {
		SurveyDetail
	},
	data() {
		return {
			isLoading: true
		}
	},
	computed: {
		...mapGetters({
			prescriptionTemplate: 'prescription-template/prescription-template'
		})
	},
	methods: {
		...mapActions({
			fetchPrescriptionTemplate: 'prescription-template/get'
		}),
		async fetch() {
			this.isLoading = true;
			const id = this.$route.params.id;
			await this.fetchPrescriptionTemplate(id);
			this.isLoading = false;
		}
	},
	created() {
		this.fetch();
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.TemplateDetail {
	@extend .flexbox;
	padding: 1rem;

	&__label {
		font-weight: bold;
		text-transform: uppercase;
		display: block;
		margin-bottom: 0.5rem;
	}
}

</style>

