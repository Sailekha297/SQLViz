import { useMemo, useState } from "react";

const questionTypes = [
  "Concept",
  "Write SQL",
  "Predict Output",
  "Debug SQL",
  "Fill in SQL",
  "Query Challenge",
];

const difficulties = ["Easy", "Medium", "Hard"];
const QUESTIONS_PER_COMBINATION = 5;

const topicMeta = {
  "SQL Basics": ["SELECT", "WHERE", "DISTINCT", "ORDER BY", "GROUP BY", "HAVING", "aliases", "LIKE", "BETWEEN", "IN", "NULL", "aggregate functions"],
  "Joins": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN", "SELF JOIN", "join condition", "join + WHERE", "join + GROUP BY", "multi-table joins"],
  "Set Operations": ["UNION", "UNION ALL", "INTERSECT", "EXCEPT", "column compatibility", "duplicate handling", "result ordering"],
  "Window Functions": ["ROW_NUMBER", "RANK", "DENSE_RANK", "LAG", "LEAD", "SUM OVER", "AVG OVER", "MIN/MAX OVER", "PARTITION BY", "window ORDER BY"],
  "Subqueries": ["single-row subquery", "multi-row subquery", "correlated subquery", "IN", "EXISTS", "NOT EXISTS", "ANY", "ALL", "subquery in SELECT", "subquery in FROM"],
  "Views": ["CREATE VIEW", "select from view", "view with WHERE", "view with JOIN", "aggregate view", "updatable view", "read-only view", "view modification"],
  "Aggregations": ["COUNT", "SUM", "AVG", "MIN", "MAX", "GROUP BY", "HAVING", "COUNT DISTINCT", "aggregate + WHERE", "aggregate + JOIN"],
  "SQL Functions": ["UPPER", "LOWER", "TRIM", "SUBSTR", "LENGTH", "ROUND", "ABS", "MOD", "COALESCE/NVL", "date/conversion functions"],
  "DDL / DML": ["CREATE", "ALTER", "DROP", "TRUNCATE", "INSERT", "UPDATE", "DELETE", "column alteration", "table removal", "row modification"],
  "Constraints": ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE", "NOT NULL", "CHECK", "DEFAULT", "composite key", "referential integrity", "constraint naming", "constraint behavior"],
  "Transactions": ["COMMIT", "ROLLBACK", "SAVEPOINT", "ACID", "atomicity", "consistency", "isolation", "durability", "transaction boundaries", "rollback to savepoint"],
  "Database Design": ["entities", "attributes", "relationships", "primary keys", "foreign keys", "1NF", "2NF", "3NF", "cardinality", "ER modeling"],
  "Advanced SQL": ["CTE", "CASE", "EXISTS", "conditional aggregation", "complex joins", "recursive CTE", "CTE + aggregation", "CASE + GROUP BY", "EXISTS + JOIN", "advanced filtering"],
};

const descriptions = {
  SELECT: "retrieves selected columns or expressions from a table",
  WHERE: "filters rows before grouping",
  DISTINCT: "removes duplicate result rows",
  "ORDER BY": "sorts the result",
  "GROUP BY": "forms groups for aggregate calculations",
  HAVING: "filters groups after aggregation",
  aliases: "gives a temporary name to a column or table",
  LIKE: "matches text using a pattern",
  BETWEEN: "checks an inclusive range",
  IN: "checks membership in a list or subquery result",
  NULL: "represents missing or unknown data and needs special comparison syntax",
  "aggregate functions": "calculate values such as count, sum, average, minimum, or maximum over rows",
  "INNER JOIN": "returns rows with matching values in both tables",
  "LEFT JOIN": "keeps every row from the left table",
  "RIGHT JOIN": "keeps every row from the right table",
  "FULL OUTER JOIN": "keeps matching and unmatched rows from both tables",
  "CROSS JOIN": "produces every possible pair of rows",
  "SELF JOIN": "joins a table to itself using aliases",
  "join condition": "defines how rows from two tables are matched",
  "join + WHERE": "joins tables and filters the combined rows",
  "join + GROUP BY": "joins tables and groups the combined rows",
  "multi-table joins": "combines three or more related tables",
  UNION: "combines compatible query results and removes duplicates",
  "UNION ALL": "combines compatible query results and keeps duplicates",
  INTERSECT: "returns rows common to both query results",
  EXCEPT: "returns rows from the first result that are absent from the second",
  "column compatibility": "requires compatible column counts and corresponding types",
  "duplicate handling": "determines whether repeated rows are kept or removed",
  "result ordering": "controls the final order of combined results",
  ROW_NUMBER: "assigns a unique sequential number to rows",
  RANK: "assigns ranks and leaves gaps after ties",
  DENSE_RANK: "assigns ranks without gaps after ties",
  LAG: "reads a value from an earlier row",
  LEAD: "reads a value from a later row",
  "SUM OVER": "calculates a sum over a window of rows",
  "AVG OVER": "calculates an average over a window of rows",
  "MIN/MAX OVER": "calculates minimum or maximum over a window",
  "PARTITION BY": "divides rows into independent window groups",
  "window ORDER BY": "defines row order inside a window",
  "single-row subquery": "returns one value for an outer comparison",
  "multi-row subquery": "returns multiple values or rows",
  "correlated subquery": "refers to a value from the current outer row",
  IN: "checks whether a value matches a subquery result",
  EXISTS: "tests whether a subquery returns at least one row",
  "NOT EXISTS": "tests whether a subquery returns no rows",
  ANY: "compares against at least one value from a subquery",
  ALL: "compares against every value from a subquery",
  "subquery in SELECT": "uses a scalar subquery as a selected expression",
  "subquery in FROM": "uses a subquery as a derived table",
  "CREATE VIEW": "creates a named view from a query",
  "select from view": "queries a view like a table",
  "view with WHERE": "creates a view from filtered rows",
  "view with JOIN": "creates a view from related tables",
  "aggregate view": "creates a view containing grouped results",
  "updatable view": "may allow permitted DML through the view",
  "read-only view": "prevents modifications through the view",
  "view modification": "changes a view definition",
  COUNT: "counts rows or non-null values",
  SUM: "adds numeric values",
  AVG: "calculates a numeric average",
  MIN: "finds the smallest value",
  MAX: "finds the largest value",
  "COUNT DISTINCT": "counts distinct non-null values",
  "aggregate + WHERE": "filters rows before aggregation",
  "aggregate + JOIN": "aggregates data after joining related tables",
  UPPER: "converts text to uppercase",
  LOWER: "converts text to lowercase",
  TRIM: "removes leading and trailing spaces",
  SUBSTR: "extracts part of a string",
  LENGTH: "returns string length",
  ROUND: "rounds a numeric value",
  ABS: "returns the absolute value",
  MOD: "returns the remainder after division",
  "COALESCE/NVL": "provides a fallback when a value is null",
  "date/conversion functions": "convert or format date and character values",
  CREATE: "creates a database object",
  ALTER: "changes an existing object definition",
  DROP: "removes a database object",
  TRUNCATE: "removes all rows from a table as a DDL operation",
  INSERT: "adds new rows",
  UPDATE: "changes existing rows",
  DELETE: "removes selected rows",
  "column alteration": "changes a column definition",
  "table removal": "removes a table",
  "row modification": "changes or removes stored rows",
  "PRIMARY KEY": "uniquely identifies each row and cannot be null",
  "FOREIGN KEY": "enforces a reference to a key in another table",
  UNIQUE: "prevents duplicate constrained values",
  "NOT NULL": "requires a value to be present",
  CHECK: "requires data to satisfy a condition",
  DEFAULT: "supplies a value when none is provided",
  "composite key": "uses multiple columns together as a key",
  "referential integrity": "keeps foreign-key references valid",
  "constraint naming": "gives a constraint an explicit name",
  "constraint behavior": "determines how invalid data is handled",
  COMMIT: "permanently saves transaction changes",
  ROLLBACK: "undoes uncommitted transaction changes",
  SAVEPOINT: "marks a point to which a transaction can roll back",
  ACID: "describes atomicity, consistency, isolation, and durability",
  atomicity: "makes a transaction all-or-nothing",
  consistency: "keeps database rules valid",
  isolation: "controls interaction between concurrent transactions",
  durability: "keeps committed changes after failure",
  "transaction boundaries": "define the scope of a transaction",
  "rollback to savepoint": "undoes work after a named savepoint",
  entities: "represent distinct real-world objects or concepts",
  attributes: "describe properties of entities",
  relationships: "represent associations between entities",
  "primary keys": "uniquely identify entity instances",
  "foreign keys": "represent references between related tables",
  "1NF": "requires atomic values and removes repeating groups",
  "2NF": "removes partial dependency on part of a composite key",
  "3NF": "removes transitive dependency on a key",
  cardinality: "describes how many instances participate in a relationship",
  "ER modeling": "models entities, attributes, and relationships",
  CTE: "defines a named temporary result for one SQL statement",
  CASE: "implements conditional expressions",
  EXISTS: "tests whether a subquery has rows",
  "conditional aggregation": "uses conditions inside aggregate expressions",
  "complex joins": "combine several tables and conditions",
  "recursive CTE": "allows a CTE to reference itself",
  "CTE + aggregation": "uses an intermediate CTE before aggregation",
  "CASE + GROUP BY": "combines conditional expressions with grouping",
  "EXISTS + JOIN": "combines existence testing with joined data",
  "advanced filtering": "uses layered predicates and subqueries",
};

const schemas = {
  "SQL Basics": `students(id, name, dept_id, cgpa, phone)`,
  Joins: `students(id, name, dept_id, cgpa)\ndepartments(dept_id, dept_name, location)`,
  "Set Operations": `students_cse(id, name)\nstudents_it(id, name)`,
  "Window Functions": `students(id, name, dept_id, cgpa)`,
  Subqueries: `students(id, name, dept_id, cgpa)\ndepartments(dept_id, dept_name, location)`,
  Views: `students(id, name, dept_id, cgpa)\ndepartments(dept_id, dept_name)`,
  Aggregations: `students(id, name, dept_id, cgpa)\nemployees(id, name, salary)`,
  "SQL Functions": `students(id, name, cgpa, phone)`,
  "DDL / DML": `students(id, name, dept_id, cgpa)`,
  Constraints: `students(id, email, dept_id, cgpa)\ndepartments(dept_id)`,
  Transactions: `accounts(account_id, holder, balance)`,
  "Database Design": `Student(student_id, name, dept_id)\nDepartment(dept_id, dept_name)\nEnrollment(student_id, course_id)`,
  "Advanced SQL": `students(id, name, dept_id, cgpa)\ndepartments(dept_id, dept_name)\nenrollments(student_id, course_id)`,
};

const sqlTemplates = {
  "SQL Basics": {
    Easy: [
      "SELECT name FROM students;",
      "SELECT * FROM students WHERE cgpa > 8;",
      "SELECT DISTINCT dept_id FROM students;",
      "SELECT name FROM students ORDER BY cgpa DESC;",
      "SELECT name FROM students WHERE dept_id = 1;",
    ],
    Medium: [
      "SELECT name FROM students WHERE cgpa BETWEEN 7 AND 9 ORDER BY cgpa DESC;",
      "SELECT dept_id, COUNT(*) FROM students GROUP BY dept_id;",
      "SELECT dept_id, AVG(cgpa) FROM students GROUP BY dept_id HAVING AVG(cgpa) > 8;",
      "SELECT name FROM students WHERE name LIKE 'A%' AND cgpa >= 8;",
      "SELECT DISTINCT dept_id FROM students WHERE cgpa IS NOT NULL;",
    ],
    Hard: [
      "SELECT dept_id, MAX(cgpa) FROM students GROUP BY dept_id HAVING MAX(cgpa) >= 9;",
      "SELECT name FROM students WHERE cgpa >= (SELECT AVG(cgpa) FROM students);",
      "SELECT dept_id, COUNT(*) FROM students WHERE cgpa >= 8 GROUP BY dept_id HAVING COUNT(*) >= 2;",
      "SELECT name, cgpa AS score FROM students WHERE cgpa IS NOT NULL ORDER BY score DESC, name;",
      "SELECT dept_id, AVG(cgpa) AS avg_cgpa FROM students GROUP BY dept_id ORDER BY avg_cgpa DESC;",
    ],
  },
  Joins: {
    Easy: [
      "SELECT s.name, d.dept_name FROM students s INNER JOIN departments d ON s.dept_id = d.dept_id;",
      "SELECT s.name, d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id = d.dept_id;",
      "SELECT s.name FROM students s JOIN departments d ON s.dept_id = d.dept_id WHERE d.dept_name = 'CSE';",
      "SELECT COUNT(*) FROM students s JOIN departments d ON s.dept_id = d.dept_id;",
      "SELECT d.dept_name, s.name FROM departments d LEFT JOIN students s ON d.dept_id = s.dept_id;",
    ],
    Medium: [
      "SELECT d.dept_name, COUNT(s.id) FROM departments d LEFT JOIN students s ON s.dept_id = d.dept_id GROUP BY d.dept_name;",
      "SELECT s.name, d.location FROM students s JOIN departments d ON s.dept_id = d.dept_id WHERE d.location = 'Chennai';",
      "SELECT s.name, d.dept_name FROM students s JOIN departments d ON s.dept_id = d.dept_id WHERE s.cgpa > 8;",
      "SELECT d.dept_name, AVG(s.cgpa) FROM departments d JOIN students s ON s.dept_id = d.dept_id GROUP BY d.dept_name;",
      "SELECT s.name FROM students s LEFT JOIN departments d ON s.dept_id = d.dept_id WHERE d.dept_id IS NULL;",
    ],
    Hard: [
      "SELECT d.dept_name, COUNT(DISTINCT s.id) FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name HAVING COUNT(DISTINCT s.id) >= 2;",
      "SELECT s.name, c.course_name FROM students s JOIN enrollments e ON s.id=e.student_id JOIN courses c ON e.course_id=c.course_id;",
      "SELECT d.dept_name, MAX(s.cgpa) FROM departments d JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name HAVING MAX(s.cgpa) >= 9;",
      "SELECT s.name FROM students s JOIN departments d ON s.dept_id=d.dept_id WHERE d.location='Chennai' AND s.cgpa >= 8;",
      "SELECT d.dept_name, COUNT(s.id) FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name ORDER BY COUNT(s.id) DESC;",
    ],
  },
  "Set Operations": {
    Easy: [
      "SELECT name FROM students_cse UNION SELECT name FROM students_it;",
      "SELECT name FROM students_cse UNION ALL SELECT name FROM students_it;",
      "SELECT name FROM students_cse INTERSECT SELECT name FROM students_it;",
      "SELECT name FROM students_cse EXCEPT SELECT name FROM students_it;",
      "SELECT id, name FROM students_cse UNION SELECT id, name FROM students_it;",
    ],
    Medium: [
      "SELECT name FROM students_cse UNION SELECT name FROM students_it ORDER BY name;",
      "SELECT id FROM students_cse INTERSECT SELECT id FROM students_it;",
      "SELECT id FROM students_cse EXCEPT SELECT id FROM students_it;",
      "SELECT name FROM students_cse UNION ALL SELECT name FROM students_it ORDER BY name;",
      "SELECT id, name FROM students_cse UNION SELECT id, name FROM students_it ORDER BY name;",
    ],
    Hard: [
      "SELECT id, name FROM students_cse UNION SELECT id, name FROM students_it ORDER BY id;",
      "SELECT id FROM students_cse INTERSECT SELECT id FROM students_it ORDER BY id;",
      "SELECT name FROM students_cse EXCEPT SELECT name FROM students_it ORDER BY name;",
      "SELECT name FROM students_cse UNION ALL SELECT name FROM students_it ORDER BY name;",
      "SELECT id, name FROM students_cse UNION ALL SELECT id, name FROM students_it ORDER BY id;",
    ],
  },
  "Window Functions": {
    Easy: [
      "SELECT name, ROW_NUMBER() OVER (ORDER BY cgpa DESC) AS rn FROM students;",
      "SELECT name, RANK() OVER (ORDER BY cgpa DESC) AS rnk FROM students;",
      "SELECT name, DENSE_RANK() OVER (ORDER BY cgpa DESC) AS rnk FROM students;",
      "SELECT name, LAG(cgpa) OVER (ORDER BY id) AS previous_cgpa FROM students;",
      "SELECT name, LEAD(cgpa) OVER (ORDER BY id) AS next_cgpa FROM students;",
    ],
    Medium: [
      "SELECT name, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY cgpa DESC) AS rn FROM students;",
      "SELECT name, RANK() OVER (PARTITION BY dept_id ORDER BY cgpa DESC) AS rnk FROM students;",
      "SELECT name, SUM(cgpa) OVER (ORDER BY id) AS running_total FROM students;",
      "SELECT name, AVG(cgpa) OVER (PARTITION BY dept_id) AS dept_avg FROM students;",
      "SELECT name, LAG(cgpa) OVER (PARTITION BY dept_id ORDER BY id) AS previous_cgpa FROM students;",
    ],
    Hard: [
      "SELECT name, cgpa, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY cgpa DESC) AS rnk FROM students;",
      "SELECT name, SUM(cgpa) OVER (PARTITION BY dept_id ORDER BY id) AS running_dept_total FROM students;",
      "SELECT name, cgpa - LAG(cgpa) OVER (PARTITION BY dept_id ORDER BY id) AS change FROM students;",
      "SELECT name, AVG(cgpa) OVER (PARTITION BY dept_id ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg FROM students;",
      "SELECT name, ROW_NUMBER() OVER (ORDER BY cgpa DESC, name) AS rn FROM students;",
    ],
  },
  Subqueries: {
    Easy: [
      "SELECT name FROM students WHERE cgpa = (SELECT MAX(cgpa) FROM students);",
      "SELECT name FROM students WHERE dept_id IN (SELECT dept_id FROM departments);",
      "SELECT name FROM students WHERE EXISTS (SELECT 1 FROM departments d WHERE d.dept_id = students.dept_id);",
      "SELECT name FROM students WHERE dept_id NOT IN (SELECT dept_id FROM departments);",
      "SELECT name, (SELECT MAX(cgpa) FROM students) AS max_cgpa FROM students;",
    ],
    Medium: [
      "SELECT name FROM students WHERE cgpa > (SELECT AVG(cgpa) FROM students);",
      "SELECT name FROM students WHERE dept_id IN (SELECT dept_id FROM departments WHERE location='Chennai');",
      "SELECT name FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id=s.id);",
      "SELECT name FROM students s WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id=s.id);",
      "SELECT name FROM students WHERE cgpa > ANY (SELECT cgpa FROM students WHERE dept_id=1);",
    ],
    Hard: [
      "SELECT s.name FROM students s WHERE s.cgpa > (SELECT AVG(s2.cgpa) FROM students s2 WHERE s2.dept_id=s.dept_id);",
      "SELECT s.name FROM students s WHERE s.cgpa >= ALL (SELECT s2.cgpa FROM students s2 WHERE s2.dept_id=s.dept_id);",
      "SELECT d.dept_name FROM departments d WHERE EXISTS (SELECT 1 FROM students s WHERE s.dept_id=d.dept_id AND s.cgpa >= 9);",
      "SELECT name FROM students WHERE cgpa = (SELECT MAX(cgpa) FROM students WHERE dept_id = 1);",
      "SELECT x.dept_id, x.avg_cgpa FROM (SELECT dept_id, AVG(cgpa) avg_cgpa FROM students GROUP BY dept_id) x WHERE x.avg_cgpa > 8;",
    ],
  },
  Views: {
    Easy: [
      "CREATE VIEW top_students AS SELECT * FROM students WHERE cgpa > 8;",
      "SELECT * FROM top_students;",
      "CREATE VIEW cse_students AS SELECT * FROM students WHERE dept_id=1;",
      "CREATE VIEW student_names AS SELECT id, name FROM students;",
      "SELECT name FROM top_students;",
    ],
    Medium: [
      "CREATE VIEW student_department AS SELECT s.name, d.dept_name FROM students s JOIN departments d ON s.dept_id=d.dept_id;",
      "CREATE VIEW high_cgpa AS SELECT name, cgpa FROM students WHERE cgpa >= 8.5;",
      "SELECT * FROM student_department WHERE dept_name='CSE';",
      "CREATE VIEW dept_average AS SELECT dept_id, AVG(cgpa) AS avg_cgpa FROM students GROUP BY dept_id;",
      "SELECT dept_id, avg_cgpa FROM dept_average WHERE avg_cgpa > 8;",
    ],
    Hard: [
      "CREATE VIEW dept_summary AS SELECT d.dept_name, COUNT(s.id) student_count, AVG(s.cgpa) avg_cgpa FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name;",
      "CREATE OR REPLACE VIEW top_students AS SELECT id,name,cgpa FROM students WHERE cgpa >= 9;",
      "SELECT d.dept_name, v.avg_cgpa FROM departments d JOIN dept_average v ON d.dept_id=v.dept_id WHERE v.avg_cgpa > 8;",
      "CREATE VIEW enrolled_students AS SELECT DISTINCT s.id,s.name FROM students s JOIN enrollments e ON s.id=e.student_id;",
      "SELECT * FROM dept_summary ORDER BY avg_cgpa DESC;",
    ],
  },
  Aggregations: {
    Easy: [
      "SELECT COUNT(*) FROM students;",
      "SELECT SUM(cgpa) FROM students;",
      "SELECT AVG(cgpa) FROM students;",
      "SELECT MIN(cgpa) FROM students;",
      "SELECT MAX(cgpa) FROM students;",
    ],
    Medium: [
      "SELECT dept_id, COUNT(*) FROM students GROUP BY dept_id;",
      "SELECT dept_id, AVG(cgpa) FROM students GROUP BY dept_id;",
      "SELECT dept_id, MAX(cgpa) FROM students GROUP BY dept_id;",
      "SELECT dept_id, COUNT(*) FROM students GROUP BY dept_id HAVING COUNT(*) > 1;",
      "SELECT COUNT(DISTINCT dept_id) FROM students;",
    ],
    Hard: [
      "SELECT dept_id, AVG(cgpa) FROM students WHERE cgpa IS NOT NULL GROUP BY dept_id HAVING AVG(cgpa) >= 8;",
      "SELECT d.dept_name, COUNT(s.id) FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name;",
      "SELECT dept_id, SUM(CASE WHEN cgpa >= 8 THEN 1 ELSE 0 END) FROM students GROUP BY dept_id;",
      "SELECT dept_id, COUNT(DISTINCT name) FROM students GROUP BY dept_id HAVING COUNT(DISTINCT name) > 1;",
      "SELECT dept_id, MAX(cgpa)-MIN(cgpa) AS spread FROM students GROUP BY dept_id HAVING MAX(cgpa)-MIN(cgpa) > 1;",
    ],
  },
  "SQL Functions": {
    Easy: [
      "SELECT UPPER(name) FROM students;",
      "SELECT LOWER(name) FROM students;",
      "SELECT TRIM(name) FROM students;",
      "SELECT LENGTH(name) FROM students;",
      "SELECT ROUND(cgpa, 1) FROM students;",
    ],
    Medium: [
      "SELECT SUBSTR(name, 1, 3) FROM students;",
      "SELECT ABS(-15) FROM dual;",
      "SELECT MOD(17, 5) FROM dual;",
      "SELECT COALESCE(phone, 'N/A') FROM students;",
      "SELECT ROUND(cgpa, 0) FROM students;",
    ],
    Hard: [
      "SELECT UPPER(SUBSTR(name,1,3)) FROM students;",
      "SELECT LENGTH(TRIM(name)) FROM students;",
      "SELECT COALESCE(NULLIF(phone,''),'N/A') FROM students;",
      "SELECT ROUND(AVG(cgpa),2) FROM students;",
      "SELECT SUBSTR(UPPER(name),1,1) AS initial FROM students;",
    ],
  },
  "DDL / DML": {
    Easy: [
      "CREATE TABLE students (id NUMBER PRIMARY KEY, name VARCHAR2(50));",
      "INSERT INTO students(id,name) VALUES (1,'Arun');",
      "UPDATE students SET name='Meena' WHERE id=1;",
      "DELETE FROM students WHERE id=1;",
      "TRUNCATE TABLE students;",
    ],
    Medium: [
      "ALTER TABLE students ADD city VARCHAR2(30);",
      "ALTER TABLE students MODIFY name VARCHAR2(100);",
      "INSERT INTO students(id,name,cgpa) VALUES (2,'Ravi',8.2);",
      "UPDATE students SET cgpa=cgpa+0.2 WHERE dept_id=1;",
      "DELETE FROM students WHERE cgpa < 6;",
    ],
    Hard: [
      "ALTER TABLE students ADD CONSTRAINT pk_students PRIMARY KEY (id);",
      "ALTER TABLE students ADD dept_id NUMBER;",
      "UPDATE students SET cgpa = ROUND(cgpa,1) WHERE cgpa IS NOT NULL;",
      "DELETE FROM students WHERE id IN (SELECT id FROM students WHERE cgpa < 6);",
      "DROP TABLE students;",
    ],
  },
  Constraints: {
    Easy: [
      "CREATE TABLE students (id NUMBER PRIMARY KEY, name VARCHAR2(50));",
      "CREATE TABLE students (dept_id NUMBER REFERENCES departments(dept_id));",
      "CREATE TABLE students (email VARCHAR2(100) UNIQUE);",
      "CREATE TABLE students (name VARCHAR2(50) NOT NULL);",
      "CREATE TABLE students (city VARCHAR2(30) DEFAULT 'Chennai');",
    ],
    Medium: [
      "CREATE TABLE students (cgpa NUMBER CHECK (cgpa BETWEEN 0 AND 10));",
      "CREATE TABLE enrollment (student_id NUMBER, course_id NUMBER, PRIMARY KEY(student_id,course_id));",
      "ALTER TABLE students ADD CONSTRAINT fk_dept FOREIGN KEY(dept_id) REFERENCES departments(dept_id);",
      "ALTER TABLE students ADD CONSTRAINT uq_email UNIQUE(email);",
      "ALTER TABLE students ADD CONSTRAINT ck_cgpa CHECK(cgpa >= 0);",
    ],
    Hard: [
      "CREATE TABLE enrollment (student_id NUMBER, course_id NUMBER, CONSTRAINT pk_enroll PRIMARY KEY(student_id,course_id), CONSTRAINT fk_student FOREIGN KEY(student_id) REFERENCES students(id));",
      "ALTER TABLE students ADD CONSTRAINT ck_cgpa CHECK(cgpa BETWEEN 0 AND 10);",
      "ALTER TABLE students ADD CONSTRAINT uq_student_email UNIQUE(email);",
      "ALTER TABLE students MODIFY name CONSTRAINT nn_name NOT NULL;",
      "ALTER TABLE enrollment DROP CONSTRAINT fk_student;",
    ],
  },
  Transactions: {
    Easy: ["COMMIT;", "ROLLBACK;", "SAVEPOINT s1;", "ROLLBACK TO s1;", "COMMIT;"],
    Medium: [
      "UPDATE accounts SET balance=balance-500 WHERE account_id=1; COMMIT;",
      "UPDATE accounts SET balance=balance+500 WHERE account_id=2; ROLLBACK;",
      "SAVEPOINT before_transfer;",
      "ROLLBACK TO before_transfer;",
      "COMMIT; -- permanently save completed work",
    ],
    Hard: [
      "UPDATE accounts SET balance=balance-500 WHERE account_id=1; SAVEPOINT after_debit; UPDATE accounts SET balance=balance+500 WHERE account_id=2; COMMIT;",
      "SAVEPOINT s1; UPDATE accounts SET balance=balance-100 WHERE account_id=1; ROLLBACK TO s1;",
      "UPDATE accounts SET balance=balance-500 WHERE account_id=1; UPDATE accounts SET balance=balance+500 WHERE account_id=2; COMMIT;",
      "UPDATE accounts SET balance=balance-500 WHERE account_id=1; ROLLBACK;",
      "SAVEPOINT validation; UPDATE accounts SET balance=balance+100 WHERE account_id=2; ROLLBACK TO validation; COMMIT;",
    ],
  },
  "Database Design": {
    Easy: [
      "CREATE TABLE students (student_id NUMBER PRIMARY KEY, name VARCHAR2(50));",
      "CREATE TABLE departments (dept_id NUMBER PRIMARY KEY, dept_name VARCHAR2(50));",
      "CREATE TABLE enrollment (student_id NUMBER, course_id NUMBER, PRIMARY KEY(student_id,course_id));",
      "ALTER TABLE students ADD dept_id NUMBER REFERENCES departments(dept_id);",
      "CREATE TABLE student_phone (student_id NUMBER, phone VARCHAR2(20));",
    ],
    Medium: [
      "CREATE TABLE Student(student_id NUMBER PRIMARY KEY,name VARCHAR2(50),dept_id NUMBER);",
      "CREATE TABLE Department(dept_id NUMBER PRIMARY KEY,dept_name VARCHAR2(50));",
      "CREATE TABLE Enrollment(student_id NUMBER,course_id NUMBER,PRIMARY KEY(student_id,course_id));",
      "ALTER TABLE Student ADD CONSTRAINT fk_student_dept FOREIGN KEY(dept_id) REFERENCES Department(dept_id);",
      "CREATE TABLE Course(course_id NUMBER PRIMARY KEY,course_name VARCHAR2(50),dept_id NUMBER REFERENCES Department(dept_id));",
    ],
    Hard: [
      "CREATE TABLE Enrollment(student_id NUMBER,course_id NUMBER,enrolled_on DATE,PRIMARY KEY(student_id,course_id),FOREIGN KEY(student_id) REFERENCES Student(student_id));",
      "CREATE TABLE StudentPhone(student_id NUMBER,phone VARCHAR2(20),PRIMARY KEY(student_id,phone),FOREIGN KEY(student_id) REFERENCES Student(student_id));",
      "CREATE TABLE Course(course_id NUMBER PRIMARY KEY,course_name VARCHAR2(50),dept_id NUMBER NOT NULL REFERENCES Department(dept_id));",
      "CREATE TABLE Student(student_id NUMBER PRIMARY KEY,name VARCHAR2(50),dept_id NUMBER REFERENCES Department(dept_id));",
      "CREATE TABLE Department(dept_id NUMBER PRIMARY KEY,dept_name VARCHAR2(50) UNIQUE);",
    ],
  },
  "Advanced SQL": {
    Easy: [
      "WITH top_students AS (SELECT * FROM students WHERE cgpa > 8) SELECT * FROM top_students;",
      "SELECT name, CASE WHEN cgpa >= 8 THEN 'PASS' ELSE 'REVIEW' END AS status FROM students;",
      "SELECT name FROM students WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id=students.id);",
      "SELECT dept_id, COUNT(*) FROM students GROUP BY dept_id;",
      "SELECT name FROM students WHERE cgpa >= 8 AND dept_id IN (SELECT dept_id FROM departments);",
    ],
    Medium: [
      "WITH averages AS (SELECT dept_id,AVG(cgpa) avg_cgpa FROM students GROUP BY dept_id) SELECT * FROM averages WHERE avg_cgpa > 8;",
      "SELECT dept_id,SUM(CASE WHEN cgpa >= 8 THEN 1 ELSE 0 END) AS high_count FROM students GROUP BY dept_id;",
      "SELECT name FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id=s.id);",
      "WITH top_students AS (SELECT * FROM students WHERE cgpa >= 9) SELECT d.dept_name,COUNT(t.id) FROM departments d LEFT JOIN top_students t ON d.dept_id=t.dept_id GROUP BY d.dept_name;",
      "SELECT dept_id,AVG(CASE WHEN cgpa >= 8 THEN cgpa END) FROM students GROUP BY dept_id;",
    ],
    Hard: [
      "WITH dept_avg AS (SELECT dept_id,AVG(cgpa) avg_cgpa FROM students GROUP BY dept_id) SELECT s.name,s.cgpa FROM students s JOIN dept_avg d ON s.dept_id=d.dept_id WHERE s.cgpa>d.avg_cgpa;",
      "WITH ranked AS (SELECT name,dept_id,cgpa,DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY cgpa DESC) rnk FROM students) SELECT * FROM ranked WHERE rnk=1;",
      "SELECT d.dept_name,COUNT(CASE WHEN s.cgpa>=8 THEN 1 END) AS high_count FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name;",
      "WITH enrolled AS (SELECT DISTINCT student_id FROM enrollments) SELECT s.name FROM students s WHERE EXISTS (SELECT 1 FROM enrolled e WHERE e.student_id=s.id);",
      "WITH dept_count AS (SELECT dept_id,COUNT(*) cnt FROM students GROUP BY dept_id) SELECT d.dept_name,c.cnt FROM departments d JOIN dept_count c ON d.dept_id=c.dept_id WHERE c.cnt=(SELECT MAX(cnt) FROM dept_count);",
    ],
  },
};

const predictCases = {
  "SQL Basics": {
    Easy: [
      ["students: cgpa = 7, 8, 9", "SELECT MAX(cgpa) FROM students;", "What is returned?", ["9", "8", "7", "24"], "9"],
      ["students has 5 rows", "SELECT COUNT(*) FROM students;", "What is returned?", ["5", "1", "0", "NULL"], "5"],
      ["students: cgpa = 7, 8, 9", "SELECT MIN(cgpa) FROM students;", "What is returned?", ["7", "8", "9", "24"], "7"],
      ["students: cgpa = 7, 8, 9", "SELECT SUM(cgpa) FROM students;", "What is returned?", ["24", "9", "7", "8"], "24"],
      ["students: cgpa = 7, 8, 9", "SELECT AVG(cgpa) FROM students;", "What is returned?", ["8", "7", "9", "24"], "8"],
    ],
    Medium: [
      ["students: cgpa = 7, 8, 9, 6", "SELECT COUNT(*) FROM students WHERE cgpa >= 8;", "What count is produced?", ["2", "3", "4", "1"], "2"],
      ["students: Arun, Arun, Meena", "SELECT COUNT(DISTINCT name) FROM students;", "What count is produced?", ["2", "3", "1", "0"], "2"],
      ["students: cgpa = 7, 8, 9", "SELECT COUNT(*) FROM students WHERE cgpa BETWEEN 8 AND 9;", "What count is produced?", ["2", "1", "3", "0"], "2"],
      ["students: cgpa = 8, 9, 10", "SELECT AVG(cgpa) FROM students WHERE cgpa > 8;", "What value is produced?", ["9.5", "9", "8", "10"], "9.5"],
      ["students: A-CSE, B-IT, C-CSE", "SELECT COUNT(*) FROM students WHERE dept_id='CSE';", "What count is produced?", ["2", "1", "3", "0"], "2"],
    ],
    Hard: [
      ["students: A-9, B-8, C-8, D-7", "SELECT COUNT(*) FROM students WHERE cgpa >= (SELECT AVG(cgpa) FROM students);", "What count is produced?", ["3", "2", "4", "1"], "3"],
      ["students: CSE=9,8,7; IT=9,6", "SELECT dept_id, AVG(cgpa) FROM students GROUP BY dept_id HAVING AVG(cgpa) > 8;", "Which department remains?", ["CSE only", "IT only", "CSE and IT", "Neither"], "CSE only"],
      ["students: A-9, B-8, C-7; phone NULL for B", "SELECT COUNT(phone) FROM students;", "What count is produced?", ["2", "3", "1", "0"], "2"],
      ["students: CSE=9,8; IT=7,6", "SELECT MAX(cgpa) FROM students WHERE dept_id='CSE';", "What value is produced?", ["9", "8", "7", "6"], "9"],
      ["students: CSE-9,8,7; IT-9,6", "SELECT dept_id, MAX(cgpa) FROM students GROUP BY dept_id;", "Which grouped result is produced?", ["CSE-9, IT-9", "CSE-8, IT-9", "CSE-17, IT-9", "Only CSE-9"], "CSE-9, IT-9"],
    ],
  },
  Joins: {
    Easy: [
      ["students: Arun-1, Meena-2; departments: CSE-1, IT-2", "SELECT s.name FROM students s INNER JOIN departments d ON s.dept_id=d.dept_id;", "Which names are returned?", ["Arun, Meena", "Arun", "Meena", "No rows"], "Arun, Meena"],
      ["students: Arun-1, Ravi-3; departments: CSE-1", "SELECT s.name,d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id=d.dept_id;", "Which result is produced?", ["Arun-CSE, Ravi-NULL", "Arun-CSE only", "Ravi-CSE only", "No rows"], "Arun-CSE, Ravi-NULL"],
      ["students has 2 rows; departments has 2 rows", "SELECT * FROM students CROSS JOIN departments;", "How many rows are returned?", ["4", "2", "3", "0"], "4"],
      ["students: Arun-1; departments: CSE-1, IT-2", "SELECT s.name,d.dept_name FROM students s INNER JOIN departments d ON s.dept_id=d.dept_id;", "Which department is returned?", ["CSE", "IT", "CSE and IT", "NULL"], "CSE"],
      ["students: Arun-1; departments: CSE-1", "SELECT COUNT(*) FROM students s JOIN departments d ON s.dept_id=d.dept_id;", "What count is returned?", ["1", "2", "0", "NULL"], "1"],
    ],
    Medium: [
      ["students: Arun-1, Ravi-3; departments: CSE-1, IT-2", "SELECT COUNT(*) FROM students s LEFT JOIN departments d ON s.dept_id=d.dept_id;", "What count is returned?", ["2", "1", "3", "0"], "2"],
      ["students: Arun-1, Meena-1, Ravi-2; departments: CSE-1, IT-2", "SELECT d.dept_name, COUNT(*) FROM students s JOIN departments d ON s.dept_id=d.dept_id GROUP BY d.dept_name;", "Which counts are returned?", ["CSE-2, IT-1", "CSE-1, IT-2", "CSE-3", "IT-3"], "CSE-2, IT-1"],
      ["students: Arun-1, Ravi-2; departments: CSE-1, IT-2", "SELECT s.name FROM students s JOIN departments d ON s.dept_id=d.dept_id WHERE d.dept_name='IT';", "Which name is returned?", ["Ravi", "Arun", "Both", "No rows"], "Ravi"],
      ["students has 3 rows; departments has 2 rows", "SELECT COUNT(*) FROM students CROSS JOIN departments;", "What count is returned?", ["6", "5", "3", "2"], "6"],
      ["employees: A-manager NULL, B-manager A, C-manager A", "SELECT COUNT(*) FROM employees e JOIN employees m ON e.manager_id=m.id;", "How many employees have a matching manager?", ["2", "3", "1", "0"], "2"],
    ],
    Hard: [
      ["students: A-1, B-2, C-2; departments: CSE-1, IT-2", "SELECT d.dept_name, COUNT(s.id) FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id GROUP BY d.dept_name;", "Which grouped result is correct?", ["CSE-1, IT-2", "CSE-2, IT-1", "CSE-3, IT-0", "CSE-1 only"], "CSE-1, IT-2"],
      ["students A-1,B-2; enrollments A-101,A-102,B-101; courses 101,102", "SELECT COUNT(*) FROM students s JOIN enrollments e ON s.id=e.student_id JOIN courses c ON e.course_id=c.course_id;", "How many joined rows are produced?", ["3", "2", "4", "1"], "3"],
      ["students A-1,B-1,C-2; departments CSE-1,IT-2", "SELECT d.dept_name, COUNT(DISTINCT s.id) FROM students s JOIN departments d ON s.dept_id=d.dept_id GROUP BY d.dept_name;", "Which result is produced?", ["CSE-2, IT-1", "CSE-1, IT-2", "CSE-3", "IT-3"], "CSE-2, IT-1"],
      ["employees A-NULL, B-A, C-A, D-B", "SELECT COUNT(*) FROM employees e JOIN employees m ON e.manager_id=m.id;", "How many rows have managers?", ["3", "4", "2", "1"], "3"],
      ["students A-1,B-2,C-3; departments CSE-1,IT-2", "SELECT COUNT(*) FROM students s LEFT JOIN departments d ON s.dept_id=d.dept_id WHERE d.dept_name='CSE';", "What count is produced?", ["1", "2", "3", "0"], "1"],
    ],
  },
};

const getSQLFor = (topic, difficulty, index) => {
  const rows = sqlTemplates[topic]?.[difficulty] || sqlTemplates["SQL Basics"].Easy;
  return rows[index % rows.length];
};

const getSchemaFor = (topic) => schemas[topic] || schemas["SQL Basics"];

const getConceptQuestion = (topic, difficulty, index) => {
  const concepts = topicMeta[topic];
  const answer = concepts[(index + difficulty.length) % concepts.length];
  const options = [answer];
  for (let i = 1; options.length < 4; i += 1) {
    const candidate = concepts[(index + difficulty.length + i) % concepts.length];
    if (!options.includes(candidate)) options.push(candidate);
  }
  return {
    type: "Concept",
    difficulty,
    question: `Which concept best matches: ${descriptions[answer] || answer}?`,
    options,
    answer,
  };
};

const predictFallback = (topic, difficulty, index) => {
  const examples = [
    ["3 rows are present", "SELECT COUNT(*) FROM students;", "What is returned?", ["3", "2", "1", "0"], "3"],
    ["cgpa values are 6, 8, 10", "SELECT MAX(cgpa) FROM students;", "What is returned?", ["10", "8", "6", "24"], "10"],
    ["cgpa values are 6, 8, 10", "SELECT AVG(cgpa) FROM students;", "What is returned?", ["8", "6", "10", "24"], "8"],
    ["dept_id values are CSE, CSE, IT", "SELECT COUNT(DISTINCT dept_id) FROM students;", "What is returned?", ["2", "3", "1", "0"], "2"],
    ["no rows satisfy the condition", "SELECT COUNT(*) FROM students WHERE cgpa > 10;", "What is returned?", ["0", "1", "NULL", "10"], "0"],
  ];
  const item = examples[index % examples.length];
  return { table: item[0], query: item[1], question: item[2], options: item[3], answer: item[4] };
};

const getPredictQuestion = (topic, difficulty, index) => {
  const cases = predictCases[topic]?.[difficulty];
  if (cases?.length) {
    const item = cases[index % cases.length];
    return { table: item[0], query: item[1], question: item[2], options: item[3], answer: item[4] };
  }

  const answerSQL = getSQLFor(topic, difficulty, index);
  const concept = topicMeta[topic][index % topicMeta[topic].length];
  const fallback = predictFallback(topic, difficulty, index);
  return {
    ...fallback,
    query: answerSQL,
    question: `Predict the result of this ${difficulty.toLowerCase()} ${concept} query.`,
    options: ["The query returns a result", "The query returns no rows", "The query returns NULL", "The query raises an SQL error"],
    answer: "The query returns a result",
  };
};

const fillTarget = (topic, difficulty, index) => {
  const sql = getSQLFor(topic, difficulty, index);
  const replacements = [
    [" WHERE ", " _____ "],
    [" ORDER BY ", " _____ "],
    [" GROUP BY ", " _____ "],
    [" HAVING ", " _____ "],
    [" JOIN ", " _____ "],
    [" ON ", " _____ "],
    [" SELECT ", " _____ "],
  ];
  const [from, to] = replacements[index % replacements.length];
  if (sql.includes(from)) {
    return { prompt: sql.replace(from, to), answer: from.trim() };
  }
  return { prompt: `Complete the missing part: ${sql}`, answer: sql };
};

const breakSQL = (sql, index) => {
  const variants = [
    [" WHERE ", " HAVING "],
    [" HAVING ", " WHERE "],
    [" ORDER BY ", " GROUP BY "],
    [" GROUP BY ", " ORDER BY "],
    [" = ", " == "],
  ];
  const [from, to] = variants[index % variants.length];
  if (sql.includes(from)) return sql.replace(from, to);
  return `${sql.replace(/;$/, "")} WHERE;`;
};

const makeWriteQuestion = (topic, difficulty, index) => {
  const answer = getSQLFor(topic, difficulty, index);
  return {
    type: "Write SQL",
    difficulty,
    question: `Write the SQL query for this ${difficulty.toLowerCase()} ${topic} task.\nFocus: ${topicMeta[topic][index % topicMeta[topic].length]}.\nSchema:\n${getSchemaFor(topic)}`,
    answer,
    acceptedAnswers: [answer],
  };
};

const makeFillQuestion = (topic, difficulty, index) => {
  const target = fillTarget(topic, difficulty, index);
  return {
    type: "Fill in SQL",
    difficulty,
    question: `Complete the missing SQL part.\nSchema:\n${getSchemaFor(topic)}\n\n${target.prompt}`,
    answer: target.answer,
    acceptedAnswers: [target.answer],
  };
};

const makeDebugQuestion = (topic, difficulty, index) => {
  const answer = getSQLFor(topic, difficulty, index);
  return {
    type: "Debug SQL",
    difficulty,
    question: `The SQL below contains an error. Rewrite it correctly.\nSchema:\n${getSchemaFor(topic)}`,
    brokenSQL: breakSQL(answer, index),
    answer,
    acceptedAnswers: [answer],
  };
};

const makeChallengeQuestion = (topic, difficulty, index) => {
  const answer = getSQLFor(topic, difficulty, index);
  const concept = topicMeta[topic][index % topicMeta[topic].length];
  return {
    type: "Query Challenge",
    difficulty,
    question: `Scenario: A database analyst needs a ${difficulty.toLowerCase()} solution involving ${concept}. Write the SQL query that solves the task.\nSchema:\n${getSchemaFor(topic)}`,
    answer,
    acceptedAnswers: [answer],
  };
};

const buildQuestionBank = () => {
  const bank = {};

  Object.keys(topicMeta).forEach((topic) => {
    bank[topic] = [];

    questionTypes.forEach((type) => {
      difficulties.forEach((difficulty) => {
        for (let i = 0; i < QUESTIONS_PER_COMBINATION; i += 1) {
          let question;

          if (type === "Concept") {
            question = getConceptQuestion(topic, difficulty, i);
          } else if (type === "Write SQL") {
            question = makeWriteQuestion(topic, difficulty, i);
          } else if (type === "Predict Output") {
            question = { ...getPredictQuestion(topic, difficulty, i), type, difficulty };
          } else if (type === "Debug SQL") {
            question = makeDebugQuestion(topic, difficulty, i);
          } else if (type === "Fill in SQL") {
            question = makeFillQuestion(topic, difficulty, i);
          } else {
            question = makeChallengeQuestion(topic, difficulty, i);
          }

          bank[topic].push({
            ...question,
            id: `${topic}-${type}-${difficulty}-${i + 1}`,
          });
        }
      });
    });
  });

  return bank;
};

const questionBank = buildQuestionBank();

const totalQuestionCount = Object.values(questionBank).reduce(
  (total, topicQuestions) => total + topicQuestions.length,
  0
);

const normalizeSQL = (value = "") =>
  value
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/;\s*$/, "")
    .trim()
    .toLowerCase();

function CompetitivePractice({ addToHistory }) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[questionIndex];

  const matchingCount = useMemo(() => {
    if (!selectedTopic) return 0;

    return questionBank[selectedTopic].filter(
      (question) =>
        (!selectedType || question.type === selectedType) &&
        (!selectedDifficulty || question.difficulty === selectedDifficulty)
    ).length;
  }, [selectedTopic, selectedType, selectedDifficulty]);

  const resetPractice = () => {
    setQuestions([]);
    setQuestionIndex(0);
    setAnswerInput("");
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const chooseTopic = (topic) => {
    setSelectedTopic(topic);
    setSelectedType("");
    setSelectedDifficulty("");
    resetPractice();
  };

  const startPractice = () => {
    if (!selectedTopic) return;

    const filtered = questionBank[selectedTopic].filter(
      (question) =>
        (!selectedType || question.type === selectedType) &&
        (!selectedDifficulty || question.difficulty === selectedDifficulty)
    );

    setQuestions(filtered);
    setQuestionIndex(0);
    setAnswerInput("");
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const submitAnswer = (value) => {
    if (!currentQuestion || answered) return;

    const normalized = normalizeSQL(value);
    const accepted = (
      currentQuestion.acceptedAnswers || [currentQuestion.answer]
    ).map(normalizeSQL);

    const correct = accepted.includes(normalized);

    setSelectedAnswer(value);
    setAnswered(true);

    if (correct) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {

  if (questionIndex >= questions.length - 1) {

    setCompleted(true);

    if (addToHistory) {
      addToHistory(
        "Practice Questions",
        `${selectedTopic} - ${selectedType || "All Types"} - ${selectedDifficulty || "All Levels"} - Score: ${score + (isCorrect ? 1 : 0)}/${questions.length}`
      );
    }

    return;
  }

  setQuestionIndex((previous) => previous + 1);
  setAnswerInput("");
  setSelectedAnswer("");
  setAnswered(false);
};
  const isChoiceQuestion =
    currentQuestion?.type === "Concept" ||
    currentQuestion?.type === "Predict Output";

  const isCorrect = isChoiceQuestion
    ? selectedAnswer === currentQuestion?.answer
    : (currentQuestion?.acceptedAnswers || [currentQuestion?.answer])
        .map(normalizeSQL)
        .includes(normalizeSQL(selectedAnswer));

  return (
    <section className="competitive-page">
      <div className="page-header">
        <h1>Practice Questions</h1>
        <p>
          Practice DBMS concepts, SQL queries, output prediction, debugging and
          problem solving.
        </p>
        <p className="practice-bank-count">
          {totalQuestionCount} questions across {Object.keys(questionBank).length} topics
        </p>
      </div>

      {!currentQuestion && !completed && (
        <>
          <h2>Choose Topic</h2>

          <div className="competitive-topics">
            {Object.keys(questionBank).map((topic) => (
              <button
                key={topic}
                type="button"
                className={`topic-card ${selectedTopic === topic ? "active" : ""}`}
                onClick={() => chooseTopic(topic)}
              >
                <span>{topic}</span>
                <small>90 questions</small>
              </button>
            ))}
          </div>

          {selectedTopic && (
            <div className="practice-section">
              <h2>{selectedTopic}</h2>

              <h3>Practice Type</h3>
              <div className="practice-types">
                <button
                  type="button"
                  className={!selectedType ? "active" : ""}
                  onClick={() => setSelectedType("")}
                >
                  All Types
                </button>

                {questionTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={selectedType === type ? "active" : ""}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <h3>Difficulty</h3>
              <div className="practice-types">
                <button
                  type="button"
                  className={!selectedDifficulty ? "active" : ""}
                  onClick={() => setSelectedDifficulty("")}
                >
                  All Levels
                </button>

                {difficulties.map((difficulty) => (
                  <button
                    type="button"
                    key={difficulty}
                    className={selectedDifficulty === difficulty ? "active" : ""}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>

              <div className="practice-selection-summary">
                <div>
                  <strong>{matchingCount}</strong>
                  <span>matching questions</span>
                </div>

                {selectedType && selectedDifficulty && (
                  <div>
                    <strong>5</strong>
                    <span>questions in this combination</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="start-practice-btn"
                disabled={!matchingCount}
                onClick={startPractice}
              >
                Start Practice →
              </button>
            </div>
          )}
        </>
      )}

      {currentQuestion && !completed && (
        <div className="practice-section">
          <div className="practice-question-top">
            <p>
              Question {questionIndex + 1} of {questions.length}
            </p>
            <span>
              {currentQuestion.type} · {currentQuestion.difficulty}
            </span>
          </div>

          <h2 className="practice-question-text">
            {currentQuestion.question}
          </h2>

          {currentQuestion.table && (
            <div className="predict-output-block">
              <h4>Given data</h4>
              <pre className="predict-table">{currentQuestion.table}</pre>
            </div>
          )}

          {currentQuestion.brokenSQL && (
            <div className="predict-output-block">
              <h4>SQL to debug</h4>
              <pre className="practice-sql">{currentQuestion.brokenSQL}</pre>
            </div>
          )}

          {currentQuestion.query && (
            <div className="predict-output-block">
              <h4>SQL Query</h4>
              <pre className="practice-sql">{currentQuestion.query}</pre>
            </div>
          )}

          {isChoiceQuestion ? (
            <div className="practice-options">
              {currentQuestion.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`practice-option ${
                    answered && option === currentQuestion.answer
                      ? "correct-option"
                      : ""
                  } ${
                    answered &&
                    option === selectedAnswer &&
                    option !== currentQuestion.answer
                      ? "wrong-option"
                      : ""
                  }`}
                  disabled={answered}
                  onClick={() => submitAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <>
              <textarea
                className="sql-answer-box"
                value={answerInput}
                disabled={answered}
                onChange={(event) => setAnswerInput(event.target.value)}
                placeholder={
                  currentQuestion.type === "Fill in SQL"
                    ? "Enter the missing SQL..."
                    : currentQuestion.type === "Debug SQL"
                    ? "Enter the corrected SQL..."
                    : "Write your SQL query here..."
                }
              />

              {!answered && (
                <button
                  type="button"
                  className="start-practice-btn"
                  disabled={!answerInput.trim()}
                  onClick={() => submitAnswer(answerInput)}
                >
                  Submit Answer
                </button>
              )}
            </>
          )}

          {answered && (
            <>
              <div
                className={`practice-feedback ${
                  isCorrect ? "correct" : "wrong"
                }`}
              >
                {isCorrect ? (
                  "✓ Correct!"
                ) : (
                  <>
                    ✗ Incorrect.
                    <br />
                    <strong>Correct answer:</strong>{" "}
                    {currentQuestion.answer}
                  </>
                )}
              </div>

              <button
                type="button"
                className="start-practice-btn"
                onClick={nextQuestion}
              >
                {questionIndex === questions.length - 1
                  ? "Finish Practice"
                  : "Next Question →"}
              </button>
            </>
          )}
        </div>
      )}

      {completed && (
        <div className="practice-section practice-completed">
          <h2>🎉 Practice Completed!</h2>
          <p>
            {selectedTopic} · {selectedType || "All Types"} ·{" "}
            {selectedDifficulty || "All Levels"}
          </p>

          <div className="quiz-result-stats">
            <div>
              <span>Total - {questions.length}</span>
            </div>
            <div>
              <span>Correct - {score}</span>
            </div>
            <div>
              <span>Wrong - {questions.length - score}</span>
            </div>
          </div>

          <button
            type="button"
            className="start-practice-btn"
            onClick={resetPractice}
          >
            ← Back to Setup
          </button>
        </div>
      )}
    </section>
  );
}

export default CompetitivePractice;
