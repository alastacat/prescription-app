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
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
}

</style>
