<template>
	<b-container class="PrescriptionList">
		<b-card class="PrescriptionList__card">

			<h3 class="PrescriptionList__title lead border-bottom">Create Prescription</h3>

			<b-form-group
				class="PrescriptionList__formGroup"
				label="Author:"
				label-for="prescriptionAuthor"
				horizontal>
				<b-form-input id="prescriptionAuthor" :value="author" disabled/>
			</b-form-group>

			<b-form-group
				class="PrescriptionList__formGroup"
				label="Prescription Name:"
				label-for="prescriptionName"
				horizontal>
				<b-form-input id="prescriptionName" v-model.trim="name"/>
			</b-form-group>

			<b-form-group
				class="PrescriptionList__formGroup"
				label="Start Date:"
				label-for="prescriptionStartDate"
				horizontal>
				<b-form-input id="prescriptionStartDate" v-model.trim="startDate" type="date"/>
			</b-form-group>

			<b-form-group
				class="PrescriptionList__formGroup"
				label="Description:"
				label-for="prescriptionDescription"
				horizontal>
				<b-form-textarea id="prescriptionDescription" v-model="description" :rows="3"/>
			</b-form-group>

			<p class="text-danger float-left" v-text="errorText"/>

			<b-button
				class="PrescriptionList__submit"
				variant="primary"
				@click="submit">
				Create Prescription
			</b-button>

		</b-card>
	</b-container>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			name: null,
			startDate: null,
			description: null,
			errorText: null
		}
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		}),
		author(){
			return this.account.email;
		}
	},
	methods: {
		...mapActions({
			postSubmit: 'prescription/submit'
		}),
		async submit() {
			const prescription = {
				author: this.author,
				name: this.name,
				startDate: this.startDate,
				description: this.description
			}
			try {
				await this.postSubmit(prescription);
			} catch (err) {
				console.log(err);
				this.errorText = err.message;
			}
			// #Todo: redirect to prescription list page after creating new prescription
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.PrescriptionList {
	@extend .inner;
	height: 100%;
	justify-content: center;

	&__card {
		margin: 1rem;
		width: 100%;
	}

	&__title {
		text-align: left;
		margin-bottom: 2rem;
	}

	&__formGroup {
		.col-form-label {
			text-align: left;
		}
	}

	&__submit {
		margin-top: 2rem;
		float: right;
	}

}

</style>

