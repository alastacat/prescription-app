import List from './List';
import Detail from './Detail';
import Create from './Create';

const routes = [
	{
		name: 'prescriptionTemplate.list',
		path: '/prescription-templates',
		component: List,
	},
	{
		name: 'prescriptionTemplate.detail',
		path: '/prescription-templates/:id',
		component: Detail,
	},
	{
		name: 'prescriptionTemplate.create',
		path: '/prescription-templates/create',
		component: Create,
	}
];

export default routes;
