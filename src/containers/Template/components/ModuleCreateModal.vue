<template>
	<b-modal
		class="NewModule"
		:visible="visible"
		title="New Module"
		ok-title="Add Module"
		ok-variant="outline-primary"
		:ok-disabled="!isNewModuleValid"
		size="lg"
		centered
		ok-only
		@ok="addModule"
		@hidden="close">
		<section>

			<section class="mb-3">
				<b-form-group
					class="text-align-left"
					label="Name:"
					label-for="newModuleName"
					horizontal>
					<b-form-input id="newModuleName" v-model.trim="name"/>
				</b-form-group>

				<b-form-group
					class="text-align-left"
					label="Days to repeat:"
					label-for="newModuleRepeatDays"
					horizontal>
					<b-form-input type="number" id="newModuleRepeatDays" v-model="repeatDays"/>
				</b-form-group>

				<b-form-group
					class="text-align-left"
					label="Type:"
					label-for="newModuleType"
					horizontal>
					<b-form-select id="newModuleType" v-model="type" :options="typeOptions" variant="primary" />
				</b-form-group>
			</section>

			<section class="p-3 border rounded">

				<template v-if="type==='survey'">
					<section class="NewModule__newTextEntry">
						<b-form-input
							class="NewModule__newTextEntry--input"
							v-model.trim="newQuestion"
							placeholder="Add up to 5 questions..."/>
						<b-button
							v-text="'Add Question'"
							:disabled="!isNewQuestionValid"
							variant="primary"
							size="sm"
							@click="onAddQuestionClick"/>
					</section>
				</template>

				<template v-if="type==='information'">
					<section class="NewModule__newTextEntry">
						<b-form-input
							class="NewModule__newTextEntry--input"
							v-model.trim="newFact"
							placeholder="Add up to 5 facts..."/>
						<b-button
							v-text="'Add Fact'"
							:disabled="!isNewFactValid"
							variant="primary"
							size="sm"
							@click="onAddFactClick"/>
					</section>
					<section class="NewModule__newTextEntry">
						<b-form-input
							class="NewModule__newTextEntry--input"
							v-model.trim="photoUrl"
							placeholder="Add a photo's url to add an image..."/>
					</section>
				</template>

			</section>

			<p class="text-danger NewModule__errorText" v-text="errorText"/>

			<section>

				<template v-if="type==='survey'">
					<b-list-group>
						<b-list-group-item class="NewModule__textEntry" v-for="(question, i) in questions" :key="i">
							<span v-text="`${i+1}. ${question}`"/>
							<span @click="deleteQuestion(i)">
								<icon class="cursor-pointer" name="trash-alt" />
							</span>
						</b-list-group-item>
					</b-list-group>
				</template>

				<template v-if="type==='information'">
					<b-list-group>
						<b-list-group-item class="NewModule__textEntry" v-for="(fact, i) in facts" :key="i">
							<span v-text="`${i+1}. ${fact}`"/>
							<span @click="deleteFact(i)">
								<icon class="cursor-pointer" name="trash-alt" />
							</span>
						</b-list-group-item>
					</b-list-group>
				</template>

			</section>

		</section>
	</b-modal>
</template>

<script>
/**
 * Create New Module Component:
 *
 * Known Tech Debt:
 *     - currently error handling is duplicated per module
 */
const MAX_QUESTION_LENGTH = 140;
const MAX_INFORMATION_LENGTH = 140;

export default {
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			name: null,
			repeatDays: 7,
			type: 'survey',
			newQuestion: null,
			newFact: null,
			questions: [],
			facts: [],
			photoUrl: null,
			typeOptions: [
				'survey',
				'information'
			]
		}
	},
	computed: {
		isNewQuestionValid() {
			if (!this.newQuestion) return false;
			if (this.questions.length > 4) false;
			if (this.newQuestion.length > MAX_QUESTION_LENGTH) return false;
			return true;
		},
		isNewFactValid() {
			if (!this.newFact) return false;
			if (this.facts.length > 4) false;
			if (this.newFact.length > MAX_INFORMATION_LENGTH) return false;
			return true;
		},
		isNewPhotoValid() {
			if (!this.newFact) return false;
			return true;
		},
		errorText() {
			if (this.newQuestion && this.newQuestion.length > MAX_QUESTION_LENGTH) return `Entry must be less than ${MAX_QUESTION_LENGTH} characters.`
			if (this.newFact && this.newFact.length > MAX_QUESTION_LENGTH) return `Entry must be less than ${MAX_QUESTION_LENGTH} characters.`
			return null;
		},
		isNewModuleValid() {
			if (!this.name ||
				!this.repeatDays ||
				!this.type
			) return false;
			if (this.type === 'survey') {
				if (this.questions.length === 0) return false;
			}
			if (this.type === 'information') {
				if (this.facts.length === 0) return false;
			}
			return true;
		}
	},
	methods: {
		addModule() {
			this.$emit('submit', {
				name: this.name,
				repeatDays: this.repeatDays,
				type: this.type,
				meta: {
					questions: this.questions,
					facts: this.facts,
					photoUrl: this.photoUrl
				}
			});
			// reset the component's values
			this.name = null;
			this.questions = [];
			this.facts = [];
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
		},
		onAddFactClick() {
			this.facts.push(this.newFact);
			this.newFact = null;
		},
		deleteFact(i) {
			this.facts.splice(i, 1);
		}
	},
	watch: {
		type() {
			if (this.type === 'survey') {
				this.fact = [];
				this.newFact = null;
				return;
			}
			if (this.type === 'information') {
				this.questions = [];
				this.newQuestion = null;
			}
		}
	}
}
</script>

<style lang="scss">
@import '../../../styles/index';

.NewModule {

	&__newTextEntry {
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

	&__textEntry {
		text-align: left;
		display: flex;
		justify-content: space-between;
	}

}

</style>
