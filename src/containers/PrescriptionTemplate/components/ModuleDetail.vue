<template>
	<section
		class="ModuleDetail"
		@click="onModuleDetailClick">

		<h5 class="ModuleDetail__title" v-text="module.name"/>
		<div class="ModuleDetail__type">
			<span class="App__label App__label--inline">type:</span>
			<span v-text="module.type"/>
		</div>

		<b-modal
			class="ModuleDetail__modal"
			:title="module.name"
			:visible="isModuleDetailModalVisible"
			size="lg"
			centered
			@hidden="onModuleDetailModalClose">

			<div class="ModuleDetail__type mb-3">
				<span class="App__label App__label--inline">type:</span>
				<span v-text="module.type"/>
			</div>

			<div>

				<template v-if="module.type === 'survey'">
					<b-list-group>
						<b-list-group-item
							v-if="module.type === 'survey'"
							v-for="(question, i) in module.questions"
							:key="i"
							v-text="`${i+1}. ${question}`"/>
					</b-list-group>
				</template>

				<template v-if="module.type === 'information'">
					<b-list-group class="mb-3">
						<b-list-group-item
							v-if="module.type === 'information'"
							v-for="(fact, i) in module.information"
							:key="i"
							v-text="`${i+1}. ${fact}`"/>
					</b-list-group>
					<b-list-group>
						<b-list-group-item class="p-0">
							<b-img class="ModuleDetail__photo" :src="module.photoUrl"/>
						</b-list-group-item>
					</b-list-group>
				</template>

			</div>

		</b-modal>


	</section>
</template>

<script>

export default {
	props: {
		module: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isModuleDetailModalVisible: false
		}
	},
	methods: {
		onModuleDetailClick() {
			this.isModuleDetailModalVisible = true;
		},
		onModuleDetailModalClose() {
			this.isModuleDetailModalVisible = false;
		}
	}
}
</script>

<style lang="scss">
@import '../../../styles/index';

.ModuleDetail {
	border: 1px solid $white-off;
	background: $white-true;
	padding: 1rem;
	flex-direction: column;
	display: flex;
	cursor: pointer;

	&__title {
		font-weight: bold;
		text-align: left;
	}

	&__type {
		@extend .flexbox;
		font-size: 0.8rem;
		flex-direction: row;
	}

	&__modal {
		text-align: left;
	}

	&__photo {
		max-height: 500px;
		margin: auto;
		display: flex;
	}
}
</style>


