<template>
	<div class="PrescriptionCreate">
		<h2 class="App__title">Create Prescription</h2>

		<b-row class="PrescriptionCreate__content">
			<b-col>
				<b-card title="Details">

					<b-form-group
						class="PrescriptionCreate__formGroup"
						label="Author:"
						label-for="prescriptionAuthor"
						horizontal>
						<b-form-input id="prescriptionAuthor" :value="author" disabled/>
					</b-form-group>

					<b-form-group
						class="PrescriptionCreate__formGroup"
						label="Name:"
						label-for="prescriptionName"
						horizontal>
						<b-form-input id="prescriptionName" v-model.trim="name"/>
					</b-form-group>

					<b-form-group
						class="PrescriptionCreate__formGroup"
						label="Start Date:"
						label-for="prescriptionStartDate"
						horizontal>
						<b-form-input id="prescriptionStartDate" v-model.trim="startDate" type="date"/>
					</b-form-group>

					<b-form-group
						class="PrescriptionCreate__formGroup"
						label="Description:"
						label-for="prescriptionDescription"
						horizontal>
						<b-form-textarea id="prescriptionDescription" v-model="description" :rows="3"/>
					</b-form-group>

				</b-card>
			</b-col>
			<b-col>
				<b-card body-class="PrescriptionCreate__survey" title="Surveys">

					<b-button
						class="PrescriptionCreate__survey__add"
						variant="primary"
						size="sm"
						@click="onNewSurveyClick">
						Add Survery
					</b-button>

					<b-list-group>
						<b-list-group-item class="PrescriptionCreate__survey__item" v-for="(survey, i) in surveys" :key="i">

							<span v-text="survey.name"/>

							<span @click="deleteSurvey(i)">
								<icon class="cursor-pointer" name="trash-alt" />
							</span>

						</b-list-group-item>
					</b-list-group>

				</b-card>
			</b-col>
		</b-row>

		<section class="PrescriptionCreate__submit">

			<b-button
				variant="outline-primary"
				:disabled="!isPrescriptionValid"
				@click="submit">
				Publish Prescription
			</b-button>

			<p class="text-danger PrescriptionCreate__submit--text" v-text="errorText"/>

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
			startDate: null,
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
		isPrescriptionValid() {
			if (!this.name) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			submitPrescription: 'prescription/submit'
		}),
		async submit() {
			const prescription = {
				author: this.author,
				name: this.name,
				startDate: this.startDate,
				description: this.description,
				surveys: this.surveys
			}
			try {
				await this.submitPrescription(prescription);
				this.$router.push({ name: 'prescription.list' });
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

.PrescriptionCreate {
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

