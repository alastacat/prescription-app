<template>
	<div class="TemplateDetail">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>

			<h2 class="App__title" v-text="`Template: ${template.name}`"/>

			<section class="App__info mb-3">

				<h5 class="TemplateDetail__author" v-text="template.author"/>

				<b-button
					:to="{ name: 'prescription.create', query: { templateId: template._id } }"
					variant="primary"
					size="sm">
					Create Prescription from Template
				</b-button>

			</section>

			<section class="TemplateDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Duration (weeks):</span>
				<span class="TemplateDetail__field" v-text="template.durationWeeks"/>
			</section>

			<section class="TemplateDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Description:</span>
				<span class="TemplateDetail__field TemplateDetail__field--tall" v-text="template.description"/>
			</section>

			<section class="TemplateDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Modules:</span>

				<div class="TemplateDetail__modules">
					<module-detail
						class="TemplateDetail__module"
						v-for="(module, i) in template.modules"
						:key="i"
						:module="module"/>
				</div>

			</section>

			<section class="TemplateDetail__content mb-0">
				<span class="App__label App__label--inline mt-3 w-25">If started on:</span>
				<datepicker class="TemplateDetail__field" placeholder="Select Start Date" v-model="exampleStartDate"/>
			</section>

			<schedule :today="exampleStartDate"/>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import ModuleDetail from './components/ModuleDetail';
import Schedule from './components/Schedule';

export default {
	components: {
		ModuleDetail,
		Schedule,
		Datepicker
	},
	data() {
		return {
			isLoading: true,
			exampleStartDate: new Date()
		}
	},
	computed: {
		...mapGetters({
			template: 'template/template'
		})
	},
	methods: {
		...mapActions({
			fetchTemplate: 'template/get'
		}),
		async fetch() {
			this.isLoading = true;
			const id = this.$route.params.id;
			await this.fetchTemplate(id);
			this.isLoading = false;
		}
	},
	created() {
		this.fetch();
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.TemplateDetail {
	@extend .flexbox;
	padding: 1rem;

	&__author {
		align-self: flex-start;
	}

	&__content {
		width: 100%;
		@extend .flexbox;
		flex-direction: row;
		margin-bottom: 1rem;
	}

	&__field {
		width: 100%;
		background: $white-true;
		padding: 1rem;
		text-align: left;

		&--tall {
			min-height: 100px;
		}
	}


	&__modules {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	&__module {
		width: 30%;
		margin: 0 1.5%;
		display: inline-block;

		&:first-of-type {
			margin-left: 0;
		}
		&:last-of-type {
			margin-right: 0;
		}
	}

}

</style>

