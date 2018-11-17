<template>
	<b-modal
		class="NewSurvey"
		:visible="visible"
		title="New Survey"
		ok-title="Add Survey"
		ok-variant="outline-primary"
		:ok-disabled="!isNewSurveyValid"
		size="lg"
		centered
		ok-only
		@ok="addSurvey"
		@hidden="close">
		<section>

			<section class="NewSurvey__surveyName">
				<b-form-group
					class="text-align-left"
					label="Name:"
					label-for="newSurveyName"
					horizontal>
					<b-form-input id="newSurveyName" v-model.trim="name"/>
				</b-form-group>
			</section>

			<section class="NewSurvey__newQuestion">
				<b-form-input
					class="NewSurvey__newQuestion--input"
					v-model.trim="newQuestion"
					placeholder="Add up to 5 questions..."/>
				<b-button
					v-text="'Add Question'"
					:disabled="!isNewQuestionValid"
					variant="primary"
					size="sm"
					@click="onAddQuestionClick"/>
			</section>

			<p class="text-danger NewSurvey__errorText" v-text="errorText"/>

			<b-list-group>
				<b-list-group-item class="NewSurvey__question" v-for="(question, i) in questions" :key="i">

					<span v-text="`${i+1}.	${question}`"/>

					<span @click="deleteQuestion(i)">
						<icon class="cursor-pointer" name="trash-alt" />
					</span>

				</b-list-group-item>
			</b-list-group>

		</section>
	</b-modal>
</template>

<script>
const MAX_QUESTION_LENGTH = 140;

export default {
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			name: null,
			newQuestion: null,
			questions: []
		}
	},
	computed: {
		isNewQuestionValid() {
			if (!this.newQuestion) return false;
			if (this.questions.length > 4) false;
			if (this.newQuestion.length > MAX_QUESTION_LENGTH) return false;
			return true;
		},
		errorText() {
			if (!this.newQuestion) return null;
			if (this.newQuestion.length > MAX_QUESTION_LENGTH) return `Question must be less than ${MAX_QUESTION_LENGTH} characters.`
			return null;
		},
		isNewSurveyValid() {
			if (!this.name) return false;
			if (this.questions.length === 0) return false;
			return true;
		}
	},
	methods: {
		addSurvey() {
			this.$emit('submit', {
				name: this.name,
				questions: this.questions
			});
			this.name = null;
			this.questions = null;
		},
		close() {
			this.$emit('close');
			this.newQuestion = null;
		},
		onAddQuestionClick() {
			this.questions.push(this.newQuestion);
			this.newQuestion = null;
		},
		deleteQuestion(i) {
			this.questions.splice(i, 1);
		}
	}
}
</script>

<style lang="scss">
@import '../../../styles/index';

.NewSurvey {

	&__newQuestion {
		@extend .flexbox;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 1rem;

		&--input {
			width: 80%;
			margin-right: 1rem;
			display: inline-block;
		}

	}

	&__errorText {
		text-align: left;
	}

	&__question {
		text-align: left;
		display: flex;
		justify-content: space-between;
	}

}

</style>
