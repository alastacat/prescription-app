import accountRoutes from '../containers/Account';
import prescriptionTemplateroutes from '../containers/PrescriptionTemplate';
import prescriptionRoutes from '../containers/Prescription';

const routes = [
	...accountRoutes,
	...prescriptionTemplateroutes,
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
