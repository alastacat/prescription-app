<template>

	<calendar
		:showSelectedDay="false"
		:date="today"/>

</template>

<script>
import Calendar from '../../../components/Calendar';

export default {
	components: {
		Calendar
	},
	props: {
		today: {
			type: Date,
			default: () => new Date()
		}
	}
}
</script>
