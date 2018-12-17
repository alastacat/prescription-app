/**
 * Script.js is a file to allow easily modifying the entire existing database
 * This way we can populate new fields for data that has already been added
 * to the database.
 */

const fs = require('fs');
const database = require('./database');

const OUTPUT_FILE_NAME = 'result.json';

// Modify the database object here

const prescriptionTemplates = database['prescription-templates'];

// The following added durationWeeks to each prescription-template
// Object.values(prescriptionTemplates).forEach(pt => {
// 	pt.durationWeeks = 4;
// });

// The following added repeatDays to each module in a prescription-template
// Object.values(prescriptionTemplates).forEach(pt => {
// 	pt.modules.forEach(m => {
// 		m.repeatDays = 7;
// 	});
// });

fs.writeFile(OUTPUT_FILE_NAME, JSON.stringify(database), (data) => { console.log('Finished...', data ) });
s
