<template>
	<div class="PrescriptionList">

		<h2 class="App__title">View Prescriptions</h2>

		<section class="App__info">

			<span>Click a Prescription to view its details.</span>

		</section>

		<b-card class="App__card">

			<b-button v-b-toggle.prescriptionListFilters size="sm" variant="outline-secondary">Filters</b-button>
			<b-collapse id="prescriptionListFilters">
				<b-card>
					<b-form-group
						label="Author:"
						label-for="authorFilter">
						<b-form-input id="authorFilter" v-model="authorFilter"/>
					</b-form-group>
				</b-card>
			</b-collapse>


			<template v-if="isLoading">
				<icon class="App__loader my-3" name="spinner" />
			</template>

			<template v-else>
				<b-table
					class="PrescriptionList__table"
					:items="prescriptions"
					:fields="fields"
					hover
					@row-clicked="goToPrescription">

					<template slot="Survey Modules" slot-scope="data">
						<span v-if="data.item.modules" v-text="data.item.modules.filter(m => m.type === 'survey').length"/>
						<span v-else v-text="'0'"/>
					</template>

					<template slot="Information Modules" slot-scope="data">
						<span v-if="data.item.modules" v-text="data.item.modules.filter(m => m.type === 'information').length"/>
						<span v-else v-text="'0'"/>
					</template>

				</b-table>
			</template>

		</b-card>


	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { throttle as _throttle } from 'lodash';

export default {
	data() {
		return {
			isLoading: false,
			fields: [
				{ key: 'name' },
				{ key: 'Survey Modules' },
				{ key: 'Information Modules' },
				{ key: 'author' },
				{ key: 'purpose' },
				{ key: 'startDate' }
			],
			authorFilter: null
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
		}),
		async fetch() {
			this.isLoading = true;
			if (this.authorFilter) {
				await this.fetchPrescriptions({ author: this.authorFilter })
			} else {
				await this.fetchPrescriptions();
			}
			this.isLoading = false;
		},
		goToPrescription(prescription) {
			this.$router.push({ name: 'prescription.detail', params: { id: prescription._id } });
		}
	},
	created() {
		this.fetch();
	},
	watch: {
		authorFilter: {
			handler: _throttle(function () { // eslint-disable-line func-names
				return this.fetch();
			}, 300)
		}
	}
}
</script>


<style lang="scss">
@import '../../styles/index.scss';

.PrescriptionList {
	@extend .flexbox;
	padding: 1rem;

	&__table {
		tbody {
			cursor: pointer;
		}
	}


}

</style>

