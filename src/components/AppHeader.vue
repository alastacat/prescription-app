<template>
	<header class="Header">

		<section class="Header__inner">
			<router-link class="Header__title" to="/">
				Deepscope&nbsp;
				<span class="Header__title--light">- Web Prescriptions</span>
			</router-link>

			<section v-if="account" class="Header__navigation">
				<b-link
					class="Menu__link"
					:to="item.path"
					v-for="item in menuItems"
					:key="item.path"
					v-text="item.title"/>
			</section>

			<section class="Header__authorization">
				<template v-if="account">
					<kbd v-text="account.email"/>
					<b-button size="sm" @click="onSignOutClick">Sign out</b-button>
				</template>

				<template v-else>
					<b-button variant="primary" size="sm" @click="onLoginClick">Login</b-button>
					<b-button variant="outline-primary" size="sm" @click="onSignUpClick">Sign up!</b-button>
				</template>
			</section>
		</section>

		<signup-modal :visible="isSignupModalVisible" @close="onSignupModalClose"/>
		<login-modal :visible="isLoginModalVisible" @close="onLoginModalClose"/>

	</header>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SignupModal from "./Signup.modal";
import LoginModal from "./Login.modal";
import routes from "../router/routes";

export default {
	components: {
		SignupModal,
		LoginModal
	},
	data() {
		return {
			isSignupModalVisible: false,
			isLoginModalVisible: false
		};
	},
	computed: {
		...mapGetters({
			account: "account/account"
		}),
		menuItems() {
			const menuItems = [];
			routes.forEach(r => {
				if (r.name && r.name.includes(".list")) {
					const title = r.name.substring(0, r.name.length - 5) + 's';
					menuItems.push({
						...r,
						title
					})
				}
			});
			return menuItems;
		}
	},
	methods: {
		...mapActions({
			signOut: "account/logOut"
		}),
		async onSignOutClick() {
			await this.signOut();
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
};
</script>


<style lang="scss">
@import "../styles/index.scss";

.Header {
	width: 100%;
	height: $headerHeight;
	position: fixed;
	padding: 1rem;
	top: 0;
	background: $white-off;
	z-index: 2;

	@media all and (min-width: $desktop) {
		height: $headerHeightDesktop;
	}

	&__inner {
		@extend .flexbox;
		flex-direction: row;
		justify-content: space-between;
	}

	&__navigation {
		width: 50%;
		@extend .flexbox;
		flex-direction: row;
		justify-content: space-evenly;

		a {
			text-transform: capitalize;

			&.active {
				border-bottom: 3px solid $blue;
			}
		}
	}

	&__title {
		font-weight: bold;
		color: $grey;

		&:hover {
			text-shadow: none;
			color: $grey;
		}

		@media all and (min-width: $tablet) {
			font-size: 1.5rem;
		}

		&--light {
			font-weight: normal;
		}

	}

	&__authorization {
		align-self: flex-end;
	}
}
</style>
