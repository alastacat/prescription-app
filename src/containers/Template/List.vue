<template>
	<div class="TemplateList">

		<h2 class="App__title">View Templates</h2>

		<section class="App__info">

			<span>Click a Template to view its details.</span>

			<b-button
				:to="{ name: 'template.create' }"
				variant="primary"
				size="sm">
				Create Template
			</b-button>

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
					class="TemplateList__table"
					:items="templates"
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
				{ key: 'description' },
				{ key: 'author' },
			],
			authorFilter: null
		}
	},
	computed: {
		...mapGetters({
			templates: 'template/templates'
		})
	},
	methods: {
		...mapActions({
			fetchTemplates: 'template/find'
		}),
		async fetch() {
			this.isLoading = true;
			if (this.authorFilter) {
				await this.fetchTemplates({ author: this.authorFilter })
			} else {
				await this.fetchTemplates();
			}
			this.isLoading = false;
		},
		goToTemplate(template) {
			this.$router.push({ name: 'template.detail', params: { id: template._id } });
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

	&__table {
		tbody {
			cursor: pointer;
		}
	}


}

</style>

