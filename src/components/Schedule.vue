<template>
	<!-- component inspired by the docs here: https://github.com/richardtallent/vue-simple-calendar#installation-and-usage -->

	<section class="Schedule">

		<calendar-view
			:show-date="showDate"
			:events="eventsFormatted"
			class="theme-default"
			@click-event="onEventClick">
			<calendar-view-header
				slot="header"
				slot-scope="t"
				:header-props="t.headerProps"
				@input="setShowDate" />
		</calendar-view>

		<schedule-event-modal
			v-if="eventSelected"
			:visible="isScheduleEventModalVisible"
			:event="eventSelected"
			@close="onScheduleEventModalClose"/>

	</section>

</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
require("vue-simple-calendar/static/css/default.css");
import ScheduleEventModal from './ScheduleEventModal';


export default {
	components: {
		CalendarView,
		CalendarViewHeader,
		ScheduleEventModal
	},
	props: {
		startDate: {
			type: String,
			default: () => new Date().toISOString().substring(0,10)
		},
		events: {
			type: Array,
			require: true
		}
	},
	data() {
		return {
			showDate: new Date(),
			eventSelected: null,
			isScheduleEventModalVisible: false
		}
	},
	computed: {
		eventsFormatted() {
			const events = this.events.map((e, i) => {
				let classes = `event event--${i}`;
				switch(e.type) {
					case 'survey':
						classes += ' event--survey'
						break;
					case 'information':
						classes += ' event--information'
						break;
				};
				return {
					...e,
					id: i,
					startDate: e.date,
					title: e.name,
					classes
				}
			});
			return events;
		}
	},
	methods: {
		setShowDate(date) {
			if (!date) {
				this.showDate = new Date(this.startDate);
				return;
			}
			this.showDate = new Date(date);
		},
		onEventClick(e) {
			this.eventSelected = e.originalEvent;
			this.isScheduleEventModalVisible = true;
		},
		onScheduleEventModalClose() {
			this.isScheduleEventModalVisible = false;
		}
	},
	watch: {
		startDate: {
			immediate: true,
			handler: 'setShowDate'
		}
	}
}
</script>

<style lang="scss">
@import "../styles/index.scss";

.Schedule {
	width: 100%;
	height: 36rem;

	button {
		cursor: pointer;

		&:hover {
			background: darken(rgb(221, 221, 221), 10%);
		}

		&.currentPeriod {
			display: none;
		}
	}

	.event {
		cursor: pointer;

		&--survey {
			background: $orange;
			border-color: darken($orange, 10%);
		}

		&--information {
			background: $green;
			border-color: darken($green, 10%);
		}
	}

}
</style>
