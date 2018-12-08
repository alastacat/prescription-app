<template>
	<div class="TemplateDetail">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>

			<h2 class="App__title" v-text="`Prescription Template: ${prescriptionTemplate.name}`"/>

			<section class="App__info mb-3">

				<h5 class="TemplateDetail__author" v-text="prescriptionTemplate.author"/>

				<!-- <b-button
					:to="{ name: 'prescription.create' }"
					variant="primary"
					size="sm">
					Create Prescription
				</b-button> -->

			</section>

			<section class="TemplateDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Description:</span>
				<span class="TemplateDetail__description" v-text="prescriptionTemplate.description"/>
			</section>

			<section class="TemplateDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Modules:</span>

				<div class="TemplateDetail__modules">
					<module-detail
						class="TemplateDetail__module"
						v-for="(module, i) in prescriptionTemplate.modules"
						:key="i"
						:module="module"/>
				</div>

			</section>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModuleDetail from './components/ModuleDetail';

export default {
	components: {
		ModuleDetail
	},
	data() {
		return {
			isLoading: true
		}
	},
	computed: {
		...mapGetters({
			prescriptionTemplate: 'prescription-template/prescription-template'
		})
	},
	methods: {
		...mapActions({
			fetchPrescriptionTemplate: 'prescription-template/get'
		}),
		async fetch() {
			this.isLoading = true;
			const id = this.$route.params.id;
			await this.fetchPrescriptionTemplate(id);
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

	&__description {
		width: 100%;
		min-height: 100px;
		background: $white-true;
		padding: 1rem;
		text-align: left;
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

