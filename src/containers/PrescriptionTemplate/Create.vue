<template>
	<div class="TemplateCreate">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>
			<h2 class="App__title">Create Prescription Template</h2>

			<b-row class="TemplateCreate__content">
				<b-col>
					<b-card title="Details">

						<b-form-group
							class="App__formGroup"
							label="Author:"
							label-for="templateAuthor"
							horizontal>
							<b-form-input id="templateAuthor" :value="author" disabled/>
						</b-form-group>

						<b-form-group
							class="App__formGroup"
							label="Name:"
							label-for="templateName"
							horizontal>
							<b-form-input id="templateName" v-model.trim="name"/>
						</b-form-group>

						<b-form-group
							class="App__formGroup"
							label="Description:"
							label-for="templateDescription"
							horizontal>
							<b-form-textarea id="templateDescription" v-model="description" :rows="3"/>
						</b-form-group>

						<b-form-group
							class="App__formGroup"
							label="Survey Duration (weeks):"
							label-for="templateLength"
							horizontal>
							<b-form-input type="number" id="templateLength" v-model="durationWeeks"/>
						</b-form-group>


					</b-card>
				</b-col>
				<b-col>

					<b-card body-class="TemplateCreate__module" title="Modules">
						<b-button
							class="TemplateCreate__module__add"
							variant="primary"
							size="sm"
							@click="onNewModuleClick">
							Add Module
						</b-button>
						<b-list-group>
							<b-list-group-item class="TemplateCreate__module__item" v-for="(mod, i) in modules" :key="i">

								<span v-text="mod.name"/>

								<span @click="deleteModule(i)">
									<icon class="cursor-pointer" name="trash-alt" />
								</span>

							</b-list-group-item>
						</b-list-group>
					</b-card>

				</b-col>
			</b-row>

			<section class="TemplateCreate__submit">
				<b-button
					variant="outline-primary"
					:disabled="!isPrescriptionTemplateValid"
					@click="submit">
					Publish Prescription Template
				</b-button>
				<p class="text-danger TemplateCreate__submit--text" v-text="errorText"/>
			</section>

			<module-create-modal
				:visible="isModuleCreateModalVisible"
				@submit="onModuleCreateModalSubmit"
				@close="onModuleCreateModalClose"/>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModuleCreateModal from './components/ModuleCreateModal';

export default {
	components: {
		ModuleCreateModal
	},
	data() {
		return {
			isLoading: false,
			name: null,
			description: null,
			durationWeeks: 4,
			modules: [],
			isModuleCreateModalVisible: false,
			errorText: null
		}
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		}),
		author(){
			return `${this.account.title}. ${this.account.firstName} ${this.account.lastName}`
		},
		isPrescriptionTemplateValid() {
			if (
				!this.name ||
				!this.durationWeeks ||
				this.modules.length === 0
			) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			submitTemplate: 'prescription-template/submit'
		}),
		async submit() {
			this.isLoading = true;
			const prescription = {
				author: this.author,
				name: this.name,
				description: this.description,
				durationWeeks: this.durationWeeks,
				modules: this.modules
			}
			try {
				await this.submitTemplate(prescription);
				this.$router.push({ name: 'prescriptionTemplate.list' });
			} catch (err) {
				this.errorText = err.message;
			}
			this.isLoading = false;
		},
		onNewModuleClick() {
			this.isModuleCreateModalVisible = true;
		},
		onModuleCreateModalClose() {
			this.isModuleCreateModalVisible = false;
		},
		onModuleCreateModalSubmit(newModule) {
			this.modules.push(newModule);
		},
		deleteModule(i) {
			this.modules.splice(i, 1);
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.TemplateCreate {
	@extend .flexbox;
	padding: 1rem;

	&__content {
		width: 100%;
		margin-bottom: 1rem;
		margin-left: 0;
		padding-left: 0;
	}

	&__formGroup {
		.col-form-label {
			text-align: left;
		}
	}

	&__module {
		width: 100%;
		display: flex;
		flex-direction: column;

		&__add {
			margin-bottom: 1rem;
		}

		&__item {
			text-align: left;
			display: flex;
			justify-content: space-between;
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

