import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBaoD1vxylzkd2-WDTodGJx5FFDhx-HU2E',
	authDomain: 'fir-database-and-auth.firebaseapp.com',
	projectId: 'fir-database-and-auth',
	storageBucket: 'fir-database-and-auth.appspot.com',
	messagingSenderId: '537363604515',
	appId: '1:537363604515:web:2e0e2981e4aca3eff13d96'
};

let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
}
else {
	app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.default.firestore().collection('employees');

export { auth, db };
