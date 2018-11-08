<template>
	<b-container class="Unauthorized">

		<kbd class="Unauthorized ">Please login or sign up!</kbd>

	</b-container>

</template>

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
		font-size: 1.4rem;
		width: auto;
		margin-left: auto;
		margin-right: auto;
	}

}

</style>

