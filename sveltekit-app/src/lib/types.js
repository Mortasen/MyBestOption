import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '$lib/_firebase.js';



const flowchartsCollection = collection(db, 'flowcharts');
const questionsCollection = collection(db, 'questions');


export class Flowchart {
	_doc = null;
	_uid = null;
	title = '';
	rating = 50;
	created = '2023-03-28';
	author = null;
	tags = ['Бізнес'];

	static initFromDoc (doc) {
		let q = new Flowchart();
		q._doc = doc;
		q._uid = doc.id;
		let data = doc.data();
		q.title = data.title;
		q.rating = data.rating;
		q.created = data.created;
		q.author = data.author;
		return q;
	}

	createDoc (flowcharts, author_id) {
		return addDoc(flowchartsCollection, {
			title: this.title,
			rating: this.rating,
			created: this.created,
			author: author_id,
		}).then(doc => {
			this._uid = doc.id;
			flowcharts = [...flowcharts, this];
		});
	}

	save () {
		return updateDoc(doc(flowchartsCollection, this._uid), {
			title: this.title
		})
	}

	data (author_id) {
		return {
			title: this.title,
			rating: this.rating,
			created: this.created,
			tags: this.tags,
			author: author_id,
		}
	}
}

export class Question {
	// _doc = null;
	// _uid = null;
	// id = null;
	text = '';
	author = '';
	answers = [];

	static initFromDoc (doc) {
		let q = new Question();
		q._doc = doc;
		q._uid = doc.id;
		let data = doc.data();
		q.id = data.id;
		q.text = data.text;
		q.author = data.author;
		q.answers = data.answers;
		return q;
	}

	createDoc (id, questions, author_id, flowchart_id) {
		return addDoc(questionsCollection, {
			id: id,
			text: this.text,
			author: author_id,
			flowchart_id: flowchart_id,
			answers: [],
		}).then(doc => {
			this._uid = doc.id;
			questions = [...questions, this];
		});
	}

	save () {
		return updateDoc(doc(questionsCollection, this._uid), {
			text: this.text,
			answers: this.answers
		})
	}

	data (index, author_id, flowchart_id) {
		return {
			index: index,
			text: this.text,
			author: author_id,
			flowchart_id: flowchart_id,
			answers: this.answers,
		}
	}
}