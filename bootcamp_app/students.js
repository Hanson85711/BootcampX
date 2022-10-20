const { Pool } = require('pg');
const myArgs = process.argv.slice(2);
const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohort LIKE %1%
LIMIT $2;
`;

const cohortName = process.argv[0];
const limit = process.argv[1] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(queryString, values)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));