<template>
	<div class="PrescriptionList">
		<h2 class="App__title">View Prescriptions</h2>

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
				{ key: 'startDate' },
				{ key: 'surveys' },
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


}

</style>

