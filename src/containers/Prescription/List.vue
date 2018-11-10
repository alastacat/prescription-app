<template>
	<div class="PrescriptionList">
		<h2 class="PrescriptionList__title lead border-bottom">View Prescriptions</h2>

		<b-card class="PrescriptionList__card">
			<b-table
				:items="prescriptions"
				striped/>
		</b-card>
	</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
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

