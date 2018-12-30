<template>
	<div class="PrescriptionDetail">

		<template v-if="isLoading">
			<icon class="App__loader" name="spinner" />
		</template>

		<template v-else>

			<h2 class="App__title" v-text="`Prescription: ${prescription.name}`"/>

			<section class="App__info mb-3">

				<h5 class="PrescriptionDetail__author" v-text="prescription.author"/>

			</section>

			<section class="PrescriptionDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Purpose:</span>
				<span class="PrescriptionDetail__field PrescriptionDetail__field--tall" v-text="prescription.purpose"/>
			</section>

			<section class="PrescriptionDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Started on:</span>
				<span class="PrescriptionDetail__field" placeholder="Select Start Date" v-text="startDate"/>
			</section>

			<section class="PrescriptionDetail__content">
				<span class="App__label App__label--inline mt-3 w-25">Events:</span>
				<schedule :startDate="startDate" :events="prescription.events"/>
			</section>

		</template>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import Schedule from '../../components/Schedule';

export default {
	components: {
		Schedule,
		Datepicker
	},
	data() {
		return {
			isLoading: true,
		}
	},
	computed: {
		...mapGetters({
			prescription: 'prescription/prescription'
		}),
		startDate() {
			const eventList = this.prescription.events.sort((a, b) => new Date(a.date) - new Date(b.date));
			return eventList[0].date;
		}
	},
	methods: {
		...mapActions({
			fetchPrescription: 'prescription/get'
		}),
		async fetch() {
			this.isLoading = true;
			const id = this.$route.params.id;
			await this.fetchPrescription(id);
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

.PrescriptionDetail {
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

