<template>
	<b-container class="Unauthorized">

		<span class="Unauthorized__title">Please <b-link>login</b-link> or <b-link @click="onSignupClick">sign up!</b-link></span>

	</b-container>

</template>

<script>
export default {
	methods: {
		onSignupClick() {
			this.$router.push({ query: { signUp: true } });
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.Unauthorized {
	@extend .inner;
	height: 100%;
	justify-content: center;
	align-self: center;
	margin-top: $headerHeight;

	@media all and (min-width: $tablet) {
		margin-top: 0
	}

	&__title {
		font-size: 2rem;
		width: auto;
		margin-left: auto;
		margin-right: auto;
	}

}

</style>

