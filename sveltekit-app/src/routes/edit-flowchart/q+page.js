// // import { db, user } from '$lib/_firebase.js';
// // import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// //
// // export async function load({ fetch, params }) {
// // 	const flowchartsCollection = collection(db, 'flowcharts');
// //
// // 	return { id: params.id };
// // }
//
//
// import { collection, getDocs, limit, query, where } from "firebase/firestore";
// import { db, user } from "$lib/_firebase.js";
// import { get } from 'svelte/store';
//
// export const load = (async ({ params }) => {
//
// 	const userV = get(user);
// 	const flowchartsCollection = collection(db, "flowcharts");
//
// 	const q = query(
// 		flowchartsCollection,
// 		where("author", "==", userV.uid)
// 	);
// 	const snapshot = await getDocs(q);
// 	// const exists = snapshot.docs[0]?.exists();
// 	// const data = snapshot.docs[0]?.data();
//
// 	return {
// 		flowchartsSnapshot: snapshot
// 	};
// });
