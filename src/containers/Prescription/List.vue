<template>
	<b-container class="PrescriptionList">
		<b-card class="PrescriptionList__card">

			<h2 class="PrescriptionList__title lead border-bottom">View Prescriptions</h2>


		</b-card>
	</b-container>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	computed: {
		...mapGetters({
			prescriptions: 'account/account'
		}),
		author(){
			return this.account.email;
		}
	},
	methods: {
		...mapActions({
			postSubmit: 'prescription/submit'
		})
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.PrescriptionList {
	@extend .inner;
	height: 100%;
	justify-content: center;

	&__card {
		margin: 1rem;
		width: 100%;
	}

	&__title {
		text-align: left;
		margin-bottom: 2rem;
	}

	&__formGroup {
		.col-form-label {
			text-align: left;
		}
	}

	&__submit {
		margin-top: 2rem;
		float: right;
	}

}

</style>

