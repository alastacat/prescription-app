import List from './List';
import Detail from './Detail';
import Create from './Create';

const routes = [
	{
		name: 'prescription.create',
		path: '/prescription/create',
		component: Create,
	},
	{
		name: 'prescription.list',
		path: '/prescriptions',
		component: List,
	},
	{
		name: 'prescription.detail',
		path: '/prescriptions/:id',
		component: Detail,
	}
];

export default routes;
