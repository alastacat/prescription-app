<template>
	<b-modal
		class="SignIn"
		title="Sign In"
		:visible="visible"
		show="true"
		centered
		size="lg"
		ok-title="Login"
		:ok-disabled="!isFormValid"
		@ok="login"
		@hidden="emitClose">

		<b-container>
			<b-form-group
				class="SignIn__formGroup"
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

		<b-container>
			<b-form-group
				class="SignIn__formGroup"
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
			password: null,
			passwordFeedback: null,
			errorText: null
		}
	},
	computed: {
		isFormValid() {
			return (
				this.email &&
				this.password

			)
		}
	},
	methods: {
		...mapActions({
			postLogin: 'account/logIn'
		}),
		async login(closeEvent) {
			closeEvent.preventDefault();
			try {
				await this.postLogin({
					username: this.email,
					password: this.password
				});
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
			this.password = null;
			this.passwordFeedback = null;
			this.errorText = null;
		}
	}
}
</script>

<style lang="scss">

.SignIn {

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
