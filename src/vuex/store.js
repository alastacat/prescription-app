import firebase from 'firebase';
import VuexPersistence from 'vuex-persist';

import accountStore from './modules/AccountStore';
import templateStore from './modules/TemplateStore';
import prescriptionStore from './modules/PrescriptionStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
	apiKey: "AIzaSyAWRC0YAAaz-JDaKg-9SmiwOwtB8SZTCM4",
	authDomain: "appprescriptions.firebaseapp.com",
	databaseURL: "https://appprescriptions.firebaseio.com",
	projectId: "appprescriptions",
	storageBucket: "appprescriptions.appspot.com",
	messagingSenderId: "396692253233"
};

// Create a persisted state cookie
const vuexCookie = new VuexPersistence({
	modules: [
		'account',
	]
});

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

const store = {
	state: {
		firebase,
		db
	},
	modules: {
		account: accountStore,
		template: templateStore,
		prescription: prescriptionStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

