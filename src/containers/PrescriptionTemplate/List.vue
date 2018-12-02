<template>
	<div class="TemplateList">
		<h2 class="App__title">View Prescription Templates</h2>

		<section class="TemplateList__info">

			<span>Click a Prescription Template to view its details.</span>

			<b-button
				:to="{ name: 'prescriptionTemplate.create' }"
				variant="primary"
				size="sm">
				Create Prescription Template
			</b-button>

		</section>

		<b-card class="App__card">

			<b-button v-b-toggle.prescriptionListFilters size="sm" variant="outline">Filters</b-button>
			<b-collapse id="prescriptionListFilters">
				<b-card>
					<b-form-group
						label="Author:"
						label-for="authorFilter">
						<b-form-input id="authorFilter" v-model="authorFilter"/>
					</b-form-group>
				</b-card>
			</b-collapse>

			<b-table
				class="TemplateList__table"
				:items="prescriptionTemplates"
				:fields="fields"
				hover
				@row-clicked="goToTemplate">
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
import { throttle as _throttle } from 'lodash';

export default {
	data() {
		return {
			fields: [
				{ key: 'name' },
				{ key: 'surveys' },
				{ key: 'description' },
				{ key: 'author' },
			],
			authorFilter: null
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
		}),
		async fetch() {
			if (this.authorFilter) {
				await this.fetchPrescriptionTemplates({ author: this.authorFilter })
				return;
			}
			this.fetchPrescriptionTemplates();
		},
		goToTemplate(template) {
			this.$router.push({ name: 'prescriptionTemplate.detail', params: { id: template._id } });
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

.TemplateList {
	@extend .flexbox;
	padding: 1rem;

	&__info {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	&__table {
		tbody {
			cursor: pointer;
		}
	}


}

</style>

