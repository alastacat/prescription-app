<template>
	<div class="PrescriptionCreate">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner"/>
		</template>

		<template v-else>
			<h2 class="App__title">New Prescription</h2>

			<b-form-group
				class="App__formGroup"
				label="Template:"
				label-for="prescriptionTemplate"
				horizontal>
				<b-form-select id="prescriptionTemplate" v-model="templateId" :options="templateOptions"/>
			</b-form-group>

			<b-form-group
				class="App__formGroup"
				label="Prescription name:"
				label-for="prescriptionName"
				horizontal>
				<b-form-input id="prescriptionName" v-model="name"/>
			</b-form-group>

			<b-form-group
				class="App__formGroup"
				label="Description:"
				label-for="prescriptionDescription"
				horizontal>
				<b-form-textarea id="prescriptionDescription" v-model="description" :rows="3"/>
			</b-form-group>

			<b-form-group
				class="App__formGroup"
				label="Purpose:"
				label-for="prescriptionPurpose"
				horizontal>
				<b-form-textarea id="prescriptionPurpose" v-model="purpose" :rows="3"/>
			</b-form-group>

			<b-form-group
				class="App__formGroup"
				label="Prescription Start:"
				label-for="prescriptionStart"
				horizontal>
				<datepicker class="TemplateDetail__field" id="prescriptionStart" placeholder="Select Start Date" v-model="startDate"/>
			</b-form-group>

			<section class="PrescriptionDetail__content">
				<schedule :startDate="startDate" :events="events"/>
			</section>

			<section class="App__submit">
				<p class="text-danger App__submit--text" v-text="errorText"/>
				<b-button
					variant="outline-primary"
					:disabled="!isPrescriptionValid"
					@click="submit">
					Publish Prescription
				</b-button>
			</section>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import Schedule from '../../components/Schedule';

export default {
	components: {
		Datepicker,
		Schedule
	},
	data() {
		return {
			isLoading: false,
			templateId: null,
			name: null,
			description: null,
			events: [],
			purpose: null,
			startDate: new Date(),
			errorText: null
		}
	},
	computed: {
		...mapGetters({
			template: 'template/template',
			templates: 'template/templates'
		}),
		templateOptions() {
			return this.templates.map(t => {
				return {
					text: t.name,
					value: t._id
				}
			});
		},
		isPrescriptionValid() {
			if (
				!this.templateId ||
				!this.name ||
				!this.description ||
				!this.purpose ||
				!this.startDate
			) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			fetchTemplate: 'template/get',
			fetchTemplates: 'template/find',
			submitPrescription: 'prescription/submit'
		}),
		async fetch() {
			this.fetchTemplates(); // #Todo: only load templates when user searching for / changing them
			await this.fetchTemplate(this.templateId);
			this.description = this.template.description;
		},
		generateEvents() {
			if (!this.template) return;
			const events = [];
			const maxDays = this.template.durationWeeks * 7;
			this.template.modules.forEach(m => {
				for (let i=0; i<maxDays; i+=m.repeatDays) {
					const date = moment(this.startDate).add(i, 'days');
					const event = {
						...m,
						date: date.toISOString().substring(0,10)
					}
					delete event.repeatDays
					events.push(event);
				}
			});
			this.events = events;
		},
		setValuesFromRoute() {
			const templateId = this.$route.query.templateId;
			const startDate = this.$route.query.startDate;
			if (templateId) this.templateId = templateId;
			if (startDate) this.startDate = new Date(startDate);
		},
		setRouteFromValues() {
			this.$router.push({
				name: 'prescription.create',
				query: {
					templateId: this.templateId,
					startDate: this.startDate.toISOString().substring(0, 10)
				}
			});
		},
		async submit() {
			this.isLoading = true;
			const prescription = {
				templateId: this.templateId,
				name: this.name,
				author: this.template.author,
				description: this.description,
				purpose: this.purpose,
				startDate: this.startDate.toISOString().substring(0, 10),
				events: this.events
			}
			try {
				await this.submitPrescription(prescription);
				this.$router.push({ name: 'prescription.list' });
			} catch (err) {
				this.errorText = err.message;
			}
			this.isLoading = false;
		},
	},
	async created() {
		this.setValuesFromRoute();
		await this.fetch();
		this.generateEvents();
	},
	watch: {
		$route() {
			this.setValuesFromRoute();
		},
		async templateId() {
			await this.fetch();
			this.setRouteFromValues();
		},
		startDate() {
			this.setRouteFromValues();
			this.generateEvents();
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.PrescriptionCreate {
	@extend .flexbox;
	padding: 1rem;
}

</style>

