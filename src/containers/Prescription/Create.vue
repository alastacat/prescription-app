<template>
	<b-container class="PrescriptionCreate">

		<h2 class="PrescriptionCreate__title lead border-bottom">Create Prescription</h2>

		<b-card class="PrescriptionCreate__card">

			<b-form-group
				class="PrescriptionCreate__formGroup"
				label="Author:"
				label-for="prescriptionAuthor"
				horizontal>
				<b-form-input id="prescriptionAuthor" :value="author" disabled/>
			</b-form-group>

			<b-form-group
				class="PrescriptionCreate__formGroup"
				label="Prescription Name:"
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

		<section class="PrescriptionCreate__submit">

			<p class="text-danger PrescriptionCreate__submit--text" v-text="errorText"/>

			<b-button
				variant="primary"
				@click="submit">
				Create Prescription
			</b-button>

		</section>

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

.PrescriptionCreate {
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	padding: 1rem;

	&__card {
		display: block;
		width: 100%;
		margin-bottom: 1rem;
	}

	&__title {
		width: 100%;
		text-align: left;
		margin-bottom: 2rem;
	}

	&__formGroup {
		.col-form-label {
			text-align: left;
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

