import List from './List';
import Create from './Create';

const routes = [
	{
		name: 'prescription.list',
		path: '/prescriptions',
		component: List,
	},
	{
		name: 'prescription.create',
		path: '/prescriptions/create',
		component: Create,
	}
];

export default routes;
