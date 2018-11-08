<template>
	<header class="Header">

		<div class="Header__inner">

			<router-link class="Header__title" to="/">
				Prescription&nbsp;<span class="Header__title--light">- App</span>
			</router-link>

		</div>

	</header>
</template>

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
