<template>
	<div class="PrescriptionList">
		<h2 class="PrescriptionList__title lead border-bottom">View Prescriptions</h2>

		<b-button
			class="PrescriptionList__new"
			:to="{ name: 'prescription.create' }"
			variant="primary"
			size="sm">
			Create Prescription
		</b-button>

		<b-card class="PrescriptionList__card">
			<b-table
				:items="prescriptions"
				:fields="fields"
				striped/>
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
				{ key: 'startDate' },
				{ key: 'description' },
				{ key: 'author' },
			]
		}
	},
	computed: {
		...mapGetters({
			prescriptions: 'prescription/prescriptions'
		})
	},
	methods: {
		...mapActions({
			fetchPrescriptions: 'prescription/find'
		})
	},
	created() {
		this.fetchPrescriptions();
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.PrescriptionList {
	@extend .flexbox;
	padding: 1rem;

	&__new {
		align-self: flex-start;
	}

	&__card {
		margin: 1rem;
		width: 100%;
	}

	&__title {
		width: 100%;
		text-align: left;
		margin-bottom: 1rem;
	}

}

</style>

