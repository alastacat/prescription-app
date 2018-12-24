import List from './List';
import Detail from './Detail';
import Create from './Create';

const routes = [
	{
		name: 'template.create',
		path: '/templates/create',
		component: Create,
	},
	{
		name: 'template.list',
		path: '/templates',
		component: List,
	},
	{
		name: 'template.detail',
		path: '/templates/:id',
		component: Detail,
	}
];

export default routes;
