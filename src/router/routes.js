import accountRoutes from '../containers/Account';
import prescriptionRoutes from '../containers/Prescription'

const routes = [
	...accountRoutes,
	...prescriptionRoutes,
	{
		path: '/',
		redirect: {
			name: 'prescriptionTemplate.list'
		}
	},
	{
		path: '*',
		redirect: '/'
	}
];

export default routes;
