import List from './List';
import Create from './Create';

const routes = [
	{
		name: 'prescriptionTemplate.list',
		path: '/prescription-templates',
		component: List,
	},
	{
		name: 'prescriptionTemplate.create',
		path: '/prescription-templates/create',
		component: Create,
	}
];

export default routes;
