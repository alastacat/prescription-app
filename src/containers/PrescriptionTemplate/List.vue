<template>
	<div class="TemplateList">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>
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

					<template slot="Survey Modules" slot-scope="data">
						<span v-if="data.item.modules" v-text="data.item.modules.filter(m => m.type === 'survey').length"/>
						<span v-else v-text="'0'"/>
					</template>

					<template slot="Information Modules" slot-scope="data">
						<span v-if="data.item.modules" v-text="data.item.modules.filter(m => m.type === 'information').length"/>
						<span v-else v-text="'0'"/>
					</template>

				</b-table>

			</b-card>
		</template>

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
			this.isLoading = true;
			if (this.authorFilter) {
				await this.fetchPrescriptionTemplates({ author: this.authorFilter })
			} else {
				await this.fetchPrescriptionTemplates();
			}
			this.isLoading = false;
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

