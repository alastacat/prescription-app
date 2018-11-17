<template>
	<b-modal
		class="CreateAccount"
		title="Create Account"
		:visible="visible"
		centered
		size="lg"
		ok-title="Create Account"
		:ok-disabled="!isFormValid"
		@ok="createAccount"
		@hidden="emitClose">

		<b-container>

			<b-form-group
				class="CreateAccount__formGroup"
				label="Title:"
				label-for="signupTitle"
				:state="!titleFeedback"
				:invalid-feedback="titleFeedback"
				horizontal>
				<b-form-select id="signupTitle" v-model="title" :options="titleOptions"/>
			</b-form-group>

			<b-form-group
				class="CreateAccount__formGroup"
				label="First Name:"
				label-for="signupFirstName"
				:state="!firstNameFeedback"
				:invalid-feedback="firstNameFeedback"
				horizontal>
				<b-form-input
					id="signupFirstName"
					v-model.trim="firstName"/>
			</b-form-group>

			<b-form-group
				class="CreateAccount__formGroup"
				label="Last Name:"
				label-for="signupLastName"
				:state="!lastNameFeedback"
				:invalid-feedback="lastNameFeedback"
				horizontal>
				<b-form-input
					id="signupLastName"
					v-model.trim="lastName"/>
			</b-form-group>

			<b-form-group
				class="CreateAccount__formGroup"
				label="Enter your email:"
				label-for="signupEmail"
				:state="!emailFeedback"
				:invalid-feedback="emailFeedback"
				horizontal>
				<b-form-input
					id="signupEmail"
					type="email"
					v-model.trim="email"/>
			</b-form-group>

			<b-form-group
				class="CreateAccount__formGroup"
				label="Enter your password:"
				label-for="signupPassword"
				:state="!passwordFeedback"
				:invalid-feedback="passwordFeedback"
				horizontal>
				<b-form-input
					id="signupPassword"
					type="password"
					v-model.trim="password"/>
			</b-form-group>

			<b-form-group
				class="CreateAccount__formGroup"
				label="Confirm password."
				label-for="signupConfirmPassword"
				:state="!confirmPasswordFeedback"
				:invalid-feedback="confirmPasswordFeedback"
				horizontal>
				<b-form-input
					id="signupConfirmPassword"
					type="password"
					v-model.trim="confirmPassword"/>
			</b-form-group>

		</b-container>

		<p class="text-danger" v-text="errorText"/>

	</b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			titleOptions: [
				"Dr", "Mr", "Ms", "Mrs"
			],
			title: null,
			titleFeedback: null,
			firstName: null,
			firstNameFeedback: null,
			lastName: null,
			lastNameFeedback: null,
			email: null,
			emailFeedback: null,
			password: null,
			passwordFeedback: null,
			confirmPassword: null,
			confirmPasswordFeedback: null,
			errorText: null
		}
	},
	computed: {
		isFormValid() {
			return (
				this.email &&
				this.title &&
				this.firstName &&
				this.lastName &&
				this.password &&
				this.password === this.confirmPassword

			)
		}
	},
	methods: {
		...mapActions({
			postNewAccount: 'account/signUp'
		}),
		async createAccount(closeEvent) {
			closeEvent.preventDefault();
			try {
				await this.postNewAccount({
					username: this.email,
					password: this.password,
					title: this.title,
					firstName: this.firstName,
					lastName: this.lastName
				});
				this.$router.push('/');
				this.emitClose();
			} catch (err) {
				this.errorText = err.message;
			}

		},
		emitClose() {
			this.$emit('close');
			this.clearData();
		},
		clearData() {
			this.title = null;
			this.firstName = null;
			this.lastName = null;
			this.email = null;
			this.emailFeedback = null;
			this.password = null;
			this.passwordFeedback = null;
			this.confirmPassword = null;
			this.confirmPasswordFeedback = null;
			this.errorText = null;
		}
	},
	watch: {
		confirmPassword() {
			if (this.confirmPassword !== this. password) {
				this.confirmPasswordFeedback = 'Passwords must match.';
			} else {
				this.confirmPasswordFeedback = null;
			}
		}
	}
}
</script>

<style lang="scss">

.CreateAccount {

	&__formGroup {
		padding-bottom: 2rem;

		.invalid-feedback {
			position: absolute;
		}

		.col-form-label {
			text-align: left;
		}
	}
}

</style>
