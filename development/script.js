/**
 * Script.js is a file to allow easily modifying the entire existing database
 * This way we can populate new fields for data that has already been added
 * to the database.
 */

const fs = require('fs');
const database = require('./database');

const OUTPUT_FILE_NAME = './development/result.json';

// Modify the database object here

const prescriptions = database['prescriptions'];

Object.values(prescriptions).forEach(p => {
	p.events.forEach((e) => {

		e.meta = {};

		switch(e.type) {
			case 'survey':
				e.meta.questions = e.questions;
				delete e.questions;
				delete e.information;
				break;
			case 'information':
				e.meta.photoUrl = e.photoUrl;
				delete e.photoUrl;
				e.meta.facts = e.information;
				delete e.information;
				delete e.questions;
				break;
			default:
				console.log('unknown event type:', e);
		}

	});
});


fs.writeFile(OUTPUT_FILE_NAME, JSON.stringify(database), (data) => { console.log('Finished...', data ) });
