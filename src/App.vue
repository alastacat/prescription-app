<template>
	<div id="app">

		<app-header/>

		<router-view/>

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
		}
	}
};

</script>


<style lang="scss">

@import './styles/index.scss';

#app {
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
}

</style>
