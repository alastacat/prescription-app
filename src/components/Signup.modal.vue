<template>
	<b-modal
		class="CreateAccount"
		title="Create Account"
		:visible="visible"
		show="true"
		centered
		size="lg"
		ok-title="Create Account"
		:ok-disabled="!isFormValid"
		@ok="createAccount"
		@hidden="emitClose">

		<b-container>
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
		</b-container>

		<!-- <b-container>
			<b-form-group
				class="CreateAccount__formGroup"
				label="Enter your name:"
				label-for="signupName"
				:state="!nameFeedback"
				:invalid-feedback="nameFeedback"
				horizontal>
				<b-form-input
					id="signupName"
					v-model.trim="name"/>
			</b-form-group>
		</b-container> -->

		<b-container>
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
		</b-container>

		<b-container>
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
			email: null,
			emailFeedback: null,
			// name: null,
			// nameFeedback: null,
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
				// this.name &&
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
					password: this.password
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
			this.email = null;
			this.emailFeedback = null;
			// this.name = null;
			// this.nameFeedback = null;
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
