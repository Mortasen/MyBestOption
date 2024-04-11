import { writable } from 'svelte/store';

import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

let app;

if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
	deleteApp(app);
	app = initializeApp(firebaseConfig);
}

//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

function userStore() {
	let unsubscribe;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable(null);
		return {
			subscribe,
		}
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log('@@ Auth state changed!', user)
			if (user !== null)
				goto('/');
			else
				goto('/auth/sign-in');
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
	};
}

export const user = userStore();



/////////


import { collection, query, where, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";
import { goto } from '$app/navigation';

function liveCollection (collectionName, filter) {
	let _collectionArray = [];
	let col = collection(db, collectionName);

	let q;
	if (filter) {
		q = query(col, where("state", "==", "CA"));
	} else {
		q = col;
	}
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		_collectionArray = [];
		querySnapshot.forEach((doc) => {
			_collectionArray.push(doc.data());
		});
		console.log('Added collection', _collectionArray);
		// console.log("Current cities in CA: ", cities.join(", "));
	});
	return _collectionArray;
}

export function collectionStore (collectionName, ...filters) {
	let unsubscribe;

	// if (!auth || !globalThis.window) {
	// 	console.warn('Auth is not initialized or not in browser');
	// 	const { subscribe } = writable(null);
	// 	return {
	// 		subscribe,
	// 	}
	// }
	let _collectionArray = [];
	let col = collection(db, collectionName);

	let q;
	if (filters) {
		q = query(col, ...filters);
	} else {
		q = col;
	}

	const { subscribe } = writable([], (set) => {
		// unsubscribe = onAuthStateChanged(auth, (user) => {
		// 	console.log('@@ Auth state changed!', user)
		// 	set(user);
		// });

		unsubscribe = onSnapshot(q, (querySnapshot) => {
			let _collectionArray = [];
			querySnapshot.forEach((doc) => {
				let data = doc.data();
				data.id = doc.id;
				_collectionArray.push(data);
			});
			set(_collectionArray);
			console.log('Added collection', _collectionArray);
		});

		return () => unsubscribe();
	});

	const add = (data) => {
		return addDoc(col, data);
	};
	const update = (id, data) => {
		delete data.id;
		console.log('data:', data);
		return updateDoc(doc(col, id), data);
	}
	const del = (id) => {
		return deleteDoc(doc(col, id));
	}

	return {
		subscribe,
		add,
		update,
		del,
	};
}

export const flowcharts = collectionStore('flowcharts');
export const questions = collectionStore('questions');
