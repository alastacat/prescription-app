<template>
	<section class="SurveyDetail">

		<h5 class="SurveyDetail__title" v-text="survey.name"/>

		<b-list-group flush>
			<b-list-group-item v-for="(question, i) in survey.questions" :key="i" v-text="question"/>
		</b-list-group>

	</section>
</template>

<script>

export default {
	props: {
		survey: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss">
@import '../../../styles/index';

.SurveyDetail {
	border: 1px solid $white-off;

	&__title {
		padding: 0.5rem;
		text-decoration: underline;
	}
}
</style>


