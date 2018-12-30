<template>
	<b-modal
		:title="event.name"
		:visible="visible"
		centered
		@hidden="onClose">

		<h6 class="ScheduleTooltip__label" v-text="'Event name'"/>

		<span
			class="ScheduleTooltip__value"
			v-text="event.name"/>

		<b-row>
			<b-col>

				<h6 class="ScheduleTooltip__label" v-text="'Date'"/>
				<span
					class="ScheduleTooltip__value"
					v-text="event.date"/>

			</b-col>
			<b-col>

				<h6 class="ScheduleTooltip__label" v-text="'Type'"/>
				<span
					class="ScheduleTooltip__value"
					v-text="event.type"/>

			</b-col>
		</b-row>

		<section class="ScheduleTooltip__meta">

			<template v-if="event.type === 'survey'">
				<h6 class="ScheduleTooltip__label" v-text="`Facts (${event.meta.questions.length})`"/>

				<section v-for="(question, i) in event.meta.questions" :key="i">
					<span class="ScheduleTooltip__value ScheduleTooltip__value--small mb-0 mt-1" v-text="question"/>
				</section>

			</template>

			<template v-if="event.type === 'information'">
				<h6 class="ScheduleTooltip__label" v-text="`Facts (${event.meta.facts.length})`"/>

				<section v-for="(fact, i) in event.meta.facts" :key="i">
					<span class="ScheduleTooltip__value ScheduleTooltip__value--small mb-0 mt-1" v-text="fact"/>
				</section>

				<section v-if="event.meta.photoUrl">
					<b-img :src="event.meta.photoUrl"/>
				</section>

			</template>

		</section>

	</b-modal>


</template>

<script>

export default {
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		event: {
			type: Object,
			required: true
		}
	},
	methods: {
		onClose() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss">

.ScheduleTooltip {
	width: 12.5rem;
	padding: .5rem .3rem;
	letter-spacing: 0.01rem;
	text-align: left;

	&__label {
		display: block;
		width: 100%;
		margin: 0;
		font-size: 0.6rem;
		font-weight: bold;
		text-transform: uppercase;
		color: #96a0af;
	}

	&__value {
		display: block;
		width: 100%;
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		line-height: 1.2rem;
		color: #42485a;

		&__small {
			font-size: 0.6rem;
			width: auto;
		}

	}

}
</style>
