<template>
	<header class="Header">

		<div class="Header__inner">

			<router-link class="Header__title" to="/">
				Prescription&nbsp;<span class="Header__title--light">- App</span>
			</router-link>

			<section class="Header__authorization">

				<template v-if="account">
					<kbd v-text="account.email"/>
					<b-button
						variant="primary"
						size="sm"
						@click="onSignOutClick">
						Sign out!
					</b-button>
				</template>

				<template v-else>
					<b-button
						variant="primary"
						@click="onLoginClick">
						Login
					</b-button>
					<b-button
						variant="outline-primary"
						@click="onSignUpClick">
						Sign up!
					</b-button>
				</template>

			</section>

		</div>

		<signup-modal
			:visible="isSignupModalVisible"
			@close="onSignupModalClose"/>

		<login-modal
			:visible="isLoginModalVisible"
			@close="onLoginModalClose"/>

	</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SignupModal from './Signup.modal';
import LoginModal from './Login.modal';

export default {
	components: {
		SignupModal,
		LoginModal
	},
	data() {
		return {
			isSignupModalVisible: false,
			isLoginModalVisible: false
		}
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		})
	},
	methods: {
		...mapActions({
			signOut: 'account/logOut'
		}),
		async onSignOutClick() {
			await this.signOut();
			this.$router.push('/');
		},
		onSignUpClick() {
			this.$router.push({ query: { signUp: null } });
		},
		onSignupModalClose() {
			this.$router.push({ query: { signUp: undefined } });
			this.isSignupModalVisible = false;
		},
		onLoginClick() {
			this.$router.push({ query: { login: null } });
		},
		onLoginModalClose() {
			this.$router.push({ query: { login: undefined } });
			this.isLoginModalVisible = false;
		},
		handleURLQuery() {
			const query = this.$route.query;
			if (query.signUp === null) this.isSignupModalVisible = true;
			if (query.login === null) this.isLoginModalVisible = true;
		}
	},
	watch: {
		$route() {
			this.handleURLQuery();
		}
	},
	created() {
		this.handleURLQuery();
	}
}
</script>


<style lang="scss">
@import '../styles/index.scss';

.Header {
	width: 100%;
	height: $headerHeight;
	position: fixed;
	top: 0;
	background: darken($white, 6);

	@media all and (min-width: $desktop) {
		height: $headerHeightDesktop;
	}

	&__inner {
		@extend .inner;
		justify-content: space-between;
	}

	&__title {
		font-weight: bold;
		margin-right: auto;
		color: $grey;

		&:hover {
			text-decoration: none;
			color: $grey;
		}

		@media all and (min-width: $tablet) {
			font-size: 1.5rem;
		}

		&--light {
			font-weight: normal;
		}

	}

}
</style>
