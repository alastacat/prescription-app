import accountRoutes from '../containers/Account';
import prescriptionTemplateroutes from '../containers/PrescriptionTemplate'

const routes = [
	...accountRoutes,
	...prescriptionTemplateroutes,
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
