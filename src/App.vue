<template>
	<div id="app" class="App">

		<app-header/>

		<router-view class="App__content"/>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';

export default {
	components: {
		AppHeader
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		})
	},
	watch: {
		account() {
			if (!this.account) this.$router.push({ name: 'account.unauthorized' });
		},
	},
	created() {
		if (!this.account) this.$router.push({ name: 'account.unauthorized' });
	}
};

</script>


<style lang="scss">
@import './styles/index.scss';

.App {
	font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	min-height: 100vh;
	text-align: center;
	color: $grey;
	background: $white;
	position: absolute;
	font-weight: 300;
	top: 0;
	display: flex;
	justify-content: center;

	&__content {
		width: 100%;
		margin-top: $headerHeight;

		@media all and (min-width: $desktop) {
			margin-top: $headerHeightDesktop;
		}
	}

	&__title {
		width: 100%;
		font-weight: 300;
		font-size: 1.8rem;
		text-align: left;
		border-bottom: 1px solid $white-off;
		margin-bottom: 1rem;
	}

	&__info {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	&__card {
		margin: 1rem;
		width: 100%;
		text-align: left;
	}

	&__label {
		align-self: flex-start;
		font-weight: bold;
		text-transform: uppercase;
		display: block;
		text-align: left;

		&--inline {
			display: inline-block;
			margin-right: 1rem;
		}
	}

	&__loader {
		width: 3rem;
		height: 3rem;
		animation: spin 1000ms linear infinite;

		&.fa-icon {
			display: flex;
			margin: auto;
		}
	}

	&__formGroup {
		width: 100%;

		.col-form-label {
			text-align: left;
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

@keyframes spin {
	from {transform:rotate(0deg);}
	to {transform:rotate(360deg);}
}

</style>
