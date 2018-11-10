import accountRoutes from '../containers/Account';
import prescriptionRoutes from '../containers/Prescription'

const routes = [
	...accountRoutes,
	...prescriptionRoutes,
	{
		path: '/',
		redirect: {
			name: 'prescription.create'
		}
	},
	{
		path: '*',
		redirect: '/'
	}
];

export default routes;
