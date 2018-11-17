<template>
	<div class="TemplateCreate">
		<h2 class="App__title">Create Prescription Template</h2>

		<b-row class="TemplateCreate__content">
			<b-col>
				<b-card title="Details">

					<b-form-group
						class="TemplateCreate__formGroup"
						label="Author:"
						label-for="templateAuthor"
						horizontal>
						<b-form-input id="templateAuthor" :value="author" disabled/>
					</b-form-group>

					<b-form-group
						class="TemplateCreate__formGroup"
						label="Name:"
						label-for="templateName"
						horizontal>
						<b-form-input id="templateName" v-model.trim="name"/>
					</b-form-group>

					<b-form-group
						class="TemplateCreate__formGroup"
						label="Description:"
						label-for="templateDescription"
						horizontal>
						<b-form-textarea id="templateDescription" v-model="description" :rows="3"/>
					</b-form-group>

				</b-card>
			</b-col>
			<b-col>
				<b-card body-class="TemplateCreate__survey" title="Surveys">

					<b-button
						class="TemplateCreate__survey__add"
						variant="primary"
						size="sm"
						@click="onNewSurveyClick">
						Add Survery
					</b-button>

					<b-list-group>
						<b-list-group-item class="TemplateCreate__survey__item" v-for="(survey, i) in surveys" :key="i">

							<span v-text="survey.name"/>

							<span @click="deleteSurvey(i)">
								<icon class="cursor-pointer" name="trash-alt" />
							</span>

						</b-list-group-item>
					</b-list-group>

				</b-card>
			</b-col>
		</b-row>

		<section class="TemplateCreate__submit">

			<b-button
				variant="outline-primary"
				:disabled="!isPrescriptionTemplateValid"
				@click="submit">
				Publish Prescription Template
			</b-button>

			<p class="text-danger TemplateCreate__submit--text" v-text="errorText"/>

		</section>

		<new-survey-modal
			:visible="isAddSurveyModalVisible"
			@submit="onNewSurveySubmit"
			@close="onNewSurveyModalClose"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NewSurveyModal from './components/NewSurvey.modal';

export default {
	components: {
		NewSurveyModal
	},
	data() {
		return {
			name: null,
			description: null,
			surveys: [],
			isAddSurveyModalVisible: false,
			errorText: null
		}
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		}),
		author(){
			return this.account.email;
		},
		isPrescriptionTemplateValid() {
			if (!this.name) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			submitTemplate: 'prescription-template/submit'
		}),
		async submit() {
			const prescription = {
				author: this.author,
				name: this.name,
				description: this.description,
				surveys: this.surveys
			}
			try {
				await this.submitTemplate(prescription);
				this.$router.push({ name: 'prescriptionTemplate.list' });
			} catch (err) {
				this.errorText = err.message;
			}
		},
		onNewSurveyClick() {
			this.isAddSurveyModalVisible = true;
		},
		onNewSurveyModalClose() {
			this.isAddSurveyModalVisible = false;
		},
		onNewSurveySubmit(newSurvey) {
			this.surveys.push(newSurvey);
		},
		deleteSurvey(i) {
			this.surveys.splice(i, 1);
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.TemplateCreate {
	@extend .flexbox;
	padding: 1rem;

	&__content {
		width: 100%;
		margin-bottom: 1rem;
		margin-left: 0;
		padding-left: 0;
	}

	&__formGroup {
		.col-form-label {
			text-align: left;
		}
	}

	&__survey {
		width: 100%;
		display: flex;
		flex-direction: column;

		&__add {
			margin-bottom: 1rem;
		}

		&__item {
			text-align: left;
			display: flex;
			justify-content: space-between;
		}

	}

	&__submit {
		align-self: flex-end;

		&--text {
			display: inline-block;
			margin-right: 1rem;
		}
	}

}

</style>

