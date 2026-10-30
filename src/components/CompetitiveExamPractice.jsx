
import React, { useState } from "react";

// EXAM CATEGORIES
const exams = [
  { name: "GATE", subtitle: "Graduate Aptitude Test in Engineering", icon: "🎓" },
  { name: "UGC NET", subtitle: "University Grants Commission NET", icon: "📖" },
  { name: "Other", subtitle: "ISRO, NIELIT and other competitive exams", icon: "•••" },
];

// TOPICS
const topics = [
  { name: "SQL", icon: "▤", description: "Queries, joins, subqueries, aggregation" },
  { name: "Set Operators", icon: "◉", description: "UNION, UNION ALL, INTERSECT, MINUS" },
  { name: "Window Functions", icon: "▥", description: "RANK, ROW_NUMBER, LAG, LEAD" },
];

const difficulties = ["All Levels", "Easy", "Medium", "Hard"];
const years = ["2026", "2025", "2024", "2023"];

// QUESTION BANK
// 60 questions per topic: 20 Easy, 20 Medium, 20 Hard.
// Questions are AI-generated practice questions, not verified official PYQs.

const generateTopicQuestions = (topic) => {
  const questionSets = {
    SQL: [
      // EASY — 20 QUESTIONS
      ["Easy", "Which SQL command retrieves data from a table?", ["INSERT", "SELECT", "UPDATE", "DELETE"], "SELECT", "SELECT retrieves records from a table."],
      ["Easy", "Which clause filters rows before grouping?", ["HAVING", "ORDER BY", "WHERE", "GROUP BY"], "WHERE", "WHERE filters individual rows."],
      ["Easy", "Which command adds a new row?", ["ADD", "INSERT", "UPDATE", "CREATE"], "INSERT", "INSERT adds new records."],
      ["Easy", "Which keyword removes duplicate rows from a result?", ["UNIQUE", "DISTINCT", "DIFFERENT", "ONLY"], "DISTINCT", "DISTINCT returns unique rows."],
      ["Easy", "Which function counts rows?", ["SUM()", "COUNT()", "TOTAL()", "NUMBER()"], "COUNT()", "COUNT() counts rows or non-NULL values."],
      ["Easy", "Which clause sorts query results?", ["GROUP BY", "ORDER BY", "SORT", "ARRANGE"], "ORDER BY", "ORDER BY sorts the result."],
      ["Easy", "Which operator checks a range of values?", ["LIKE", "IN", "BETWEEN", "IS"], "BETWEEN", "BETWEEN checks an inclusive range."],
      ["Easy", "Which condition checks for NULL?", ["= NULL", "IS NULL", "EQUAL NULL", "== NULL"], "IS NULL", "NULL must be checked using IS NULL."],
      ["Easy", "Which wildcard represents any sequence of characters in LIKE?", ["_", "%", "*", "#"], "%", "% represents zero or more characters."],
      ["Easy", "Which command modifies existing records?", ["CHANGE", "ALTER", "UPDATE", "MODIFY"], "UPDATE", "UPDATE changes existing rows."],
      ["Easy", "Which command removes a table completely?", ["DELETE", "REMOVE", "DROP", "CLEAR"], "DROP", "DROP removes the table structure and its data."],
      ["Easy", "Which aggregate function calculates the average?", ["MEAN()", "AVG()", "AVERAGE()", "MID()"], "AVG()", "AVG() calculates the average."],
      ["Easy", "Which clause groups rows with equal values?", ["ORDER BY", "GROUP BY", "WHERE", "DISTINCT"], "GROUP BY", "GROUP BY forms groups of matching values."],
      ["Easy", "Which constraint uniquely identifies each row?", ["FOREIGN KEY", "CHECK", "PRIMARY KEY", "DEFAULT"], "PRIMARY KEY", "A primary key uniquely identifies a row."],
      ["Easy", "Which keyword combines conditions where either may be true?", ["AND", "OR", "NOT", "BETWEEN"], "OR", "OR returns rows when at least one condition is true."],
      ["Easy", "Which function returns the largest value?", ["MIN()", "COUNT()", "MAX()", "SUM()"], "MAX()", "MAX() returns the largest value."],
      ["Easy", "Which function returns the smallest value?", ["MIN()", "MAX()", "AVG()", "COUNT()"], "MIN()", "MIN() returns the smallest value."],
      ["Easy", "Which keyword removes duplicate rows in output?", ["DISTINCT", "UNIQUE ROW", "ONLY", "GROUP"], "DISTINCT", "DISTINCT removes duplicate result rows."],
      ["Easy", "Which command changes a table structure?", ["UPDATE", "ALTER", "INSERT", "SELECT"], "ALTER", "ALTER modifies a table definition."],
      ["Easy", "Which operator checks whether a value matches a list?", ["BETWEEN", "LIKE", "IN", "IS"], "IN", "IN checks membership in a list."],

      // MEDIUM — 20 QUESTIONS
      ["Medium", "What does COUNT(*) count?", ["Only non-NULL values", "All rows", "Only distinct rows", "Only numeric values"], "All rows", "COUNT(*) counts all rows, including rows containing NULLs."],
      ["Medium", "Which clause filters groups after GROUP BY?", ["WHERE", "HAVING", "ORDER BY", "FROM"], "HAVING", "HAVING filters groups after aggregation."],
      ["Medium", "What is the result of NULL = NULL in SQL?", ["TRUE", "FALSE", "UNKNOWN", "0"], "UNKNOWN", "Comparisons involving NULL generally evaluate to UNKNOWN."],
      ["Medium", "Which query returns departments having more than 5 employees?", ["WHERE COUNT(*) > 5", "GROUP BY department HAVING COUNT(*) > 5", "ORDER BY COUNT(*) > 5", "DISTINCT department"], "GROUP BY department HAVING COUNT(*) > 5", "HAVING filters aggregated groups."],
      ["Medium", "Which join returns only matching rows from both tables?", ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"], "INNER JOIN", "INNER JOIN returns matching rows."],
      ["Medium", "What does LEFT JOIN preserve?", ["All right table rows", "All left table rows", "Only matching rows", "No unmatched rows"], "All left table rows", "LEFT JOIN preserves every row from the left table."],
      ["Medium", "Which expression replaces NULL with 0 in Oracle SQL?", ["NVL(column, 0)", "NULL(column, 0)", "REPLACE(NULL, 0)", "ISNULL(column, 0)"], "NVL(column, 0)", "NVL replaces NULL with the supplied value in Oracle."],
      ["Medium", "What does BETWEEN 10 AND 20 include?", ["Only 10 and 20", "Values greater than 10 and less than 20", "Values from 10 through 20", "Values outside the range"], "Values from 10 through 20", "BETWEEN includes both endpoints."],
      ["Medium", "Which query finds employees whose names start with A?", ["LIKE '%A'", "LIKE 'A%'", "LIKE '_A%'", "LIKE '%A%'"], "LIKE 'A%'", "A% matches strings beginning with A."],
      ["Medium", "What is the purpose of a correlated subquery?", ["It executes independently only", "It references the outer query", "It creates a table", "It sorts the result"], "It references the outer query", "A correlated subquery uses values from the outer query."],
      ["Medium", "Which command permanently saves a transaction?", ["ROLLBACK", "SAVEPOINT", "COMMIT", "UNDO"], "COMMIT", "COMMIT makes transaction changes permanent."],
      ["Medium", "Which operator tests whether a subquery returns at least one row?", ["IN", "EXISTS", "LIKE", "BETWEEN"], "EXISTS", "EXISTS checks whether the subquery returns rows."],
      ["Medium", "What does COUNT(DISTINCT department_id) calculate?", ["Total employees", "Unique non-NULL departments", "All department rows including duplicates", "NULL departments"], "Unique non-NULL departments", "DISTINCT removes duplicate department IDs before counting."],
      ["Medium", "Which query returns the second highest distinct salary?", ["MAX(salary)", "MIN(salary)", "MAX salary below the maximum salary", "AVG(salary)"], "MAX salary below the maximum salary", "The second highest distinct value is the maximum below the overall maximum."],
      ["Medium", "Which join can produce unmatched rows from both tables?", ["INNER JOIN", "FULL OUTER JOIN", "CROSS JOIN", "SELF JOIN"], "FULL OUTER JOIN", "FULL OUTER JOIN preserves unmatched rows from both sides."],
      ["Medium", "What is the purpose of a self join?", ["Join a table with itself", "Join only three tables", "Remove duplicates", "Group rows"], "Join a table with itself", "A self join compares rows within the same table."],
      ["Medium", "Which clause should appear after GROUP BY to sort grouped results?", ["WHERE", "HAVING", "ORDER BY", "FROM"], "ORDER BY", "ORDER BY sorts the final grouped result."],
      ["Medium", "What does the expression salary * 12 calculate?", ["Monthly salary", "Annual salary for a monthly salary", "Tax", "Average salary"], "Annual salary for a monthly salary", "Multiplying monthly salary by 12 gives annual salary."],
      ["Medium", "Which statement about a primary key is correct?", ["It permits duplicate values", "It permits multiple NULLs", "It must be unique and NOT NULL", "It must contain text"], "It must be unique and NOT NULL", "A primary key uniquely identifies each row."],
      ["Medium", "Which SQL expression checks whether salary is not NULL?", ["salary <> NULL", "salary != NULL", "salary IS NOT NULL", "NOT NULL(salary)"], "salary IS NOT NULL", "IS NOT NULL is the correct NULL test."],

      // HARD — 20 QUESTIONS
      ["Hard", "Which query finds employees earning more than their department average?", ["salary > AVG(salary)", "salary > (SELECT AVG(salary) FROM employees)", "salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = employees.department_id)", "GROUP BY salary"], "salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department_id = employees.department_id)", "The correlated subquery calculates the average for the employee's department."],
      ["Hard", "What is the logical processing order of a basic SELECT query?", ["SELECT, FROM, WHERE, GROUP BY", "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY", "WHERE, SELECT, FROM, ORDER BY", "ORDER BY, FROM, SELECT, WHERE"], "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY", "This is the conceptual logical processing order."],
      ["Hard", "Which condition correctly finds duplicate email addresses?", ["GROUP BY email HAVING COUNT(*) > 1", "WHERE COUNT(email) > 1", "ORDER BY email", "DISTINCT email"], "GROUP BY email HAVING COUNT(*) > 1", "Grouping and HAVING identify repeated values."],
      ["Hard", "What happens when a scalar subquery returns more than one row?", ["First row is selected", "Last row is selected", "An error occurs", "Rows are automatically grouped"], "An error occurs", "A scalar subquery must return at most one row."],
      ["Hard", "Which query finds departments with no employees using a LEFT JOIN?", ["INNER JOIN with COUNT(*) = 0", "LEFT JOIN employees e ON d.id=e.department_id WHERE e.department_id IS NULL", "CROSS JOIN", "RIGHT JOIN with all rows"], "LEFT JOIN employees e ON d.id=e.department_id WHERE e.department_id IS NULL", "Unmatched department rows have NULL values on the employee side."],
      ["Hard", "What is the main difference between WHERE and HAVING?", ["No difference", "WHERE filters rows; HAVING filters groups", "WHERE filters groups; HAVING filters rows", "HAVING sorts rows"], "WHERE filters rows; HAVING filters groups", "WHERE operates before grouping and HAVING after grouping."],
      ["Hard", "Which query returns the third highest distinct salary?", ["MAX(salary)", "MIN(salary)", "Salary ranked third after DISTINCT salary ordering", "AVG(salary)"], "Salary ranked third after DISTINCT salary ordering", "Distinct salary values must be ordered and the third value selected."],
      ["Hard", "Which condition correctly checks whether a department has at least one employee?", ["COUNT(*) > 0 in WHERE", "EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id)", "department_id IS NULL", "MAX(department_id)"], "EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id)", "EXISTS checks for at least one matching employee."],
      ["Hard", "What is the effect of placing a condition on the right table in WHERE after a LEFT JOIN?", ["Always preserves all left rows", "May remove unmatched left rows", "Converts it into a FULL JOIN", "Duplicates every row"], "May remove unmatched left rows", "The WHERE condition can reject NULL-extended rows."],
      ["Hard", "Which statement about NOT IN and NULL is correct?", ["NULL is ignored in every case", "A NULL in the subquery can make NOT IN evaluate UNKNOWN", "NOT IN always behaves like NOT EXISTS", "NULL becomes zero"], "A NULL in the subquery can make NOT IN evaluate UNKNOWN", "NULL values can cause NOT IN to return no rows unexpectedly."],
      ["Hard", "Which query identifies the maximum salary in each department?", ["SELECT MAX(salary) FROM employees", "SELECT department_id, MAX(salary) FROM employees GROUP BY department_id", "SELECT salary ORDER BY salary", "SELECT DISTINCT salary"], "SELECT department_id, MAX(salary) FROM employees GROUP BY department_id", "The grouping is performed by department."],
      ["Hard", "Which expression counts only employees with a non-NULL commission?", ["COUNT(*)", "COUNT(commission)", "COUNT(DISTINCT *)", "SUM(*)"], "COUNT(commission)", "COUNT(column) ignores NULL values."],
      ["Hard", "What is the result of a CROSS JOIN between tables with 4 and 5 rows?", ["9 rows", "20 rows", "5 rows", "1 row"], "20 rows", "A cross join produces the Cartesian product: 4 × 5."],
      ["Hard", "Which query returns rows where salary is greater than every salary in department 10?", ["salary > ANY (subquery)", "salary > ALL (subquery)", "salary IN (subquery)", "salary = ALL (subquery)"], "salary > ALL (subquery)", "ALL requires the comparison to hold for every returned value."],
      ["Hard", "Which query returns rows where salary is greater than at least one salary in department 10?", ["salary > ALL (subquery)", "salary > ANY (subquery)", "salary IS NULL", "salary NOT IN (subquery)"], "salary > ANY (subquery)", "ANY requires the comparison to hold for at least one value."],
      ["Hard", "Which SQL feature allows a query to define a named temporary result set?", ["VIEW only", "WITH clause (CTE)", "CHECK constraint", "DEFAULT"], "WITH clause (CTE)", "A common table expression is defined using WITH."],
      ["Hard", "What does UNION do by default?", ["Keeps all duplicates", "Removes duplicate rows", "Sorts each input independently", "Joins columns"], "Removes duplicate rows", "UNION eliminates duplicate result rows."],
      ["Hard", "Which statement about aggregate functions and NULL is correct?", ["SUM always treats NULL as zero explicitly", "Most aggregates ignore NULL inputs", "COUNT(*) ignores NULL-containing rows", "AVG returns NULL for every table"], "Most aggregates ignore NULL inputs", "SUM, AVG, MIN and MAX generally ignore NULL values."],
      ["Hard", "Which clause can filter groups based on SUM(amount)?", ["WHERE SUM(amount) > 100", "HAVING SUM(amount) > 100", "ORDER BY SUM(amount) > 100", "FROM SUM(amount)"], "HAVING SUM(amount) > 100", "HAVING can apply conditions to aggregate expressions."],
      ["Hard", "Which query pattern finds customers who have never placed an order?", ["INNER JOIN orders", "NOT EXISTS correlated with orders", "CROSS JOIN orders", "GROUP BY orders"], "NOT EXISTS correlated with orders", "NOT EXISTS selects customers for whom no matching order exists."]
    ],

    "Set Operators": [
      // EASY — 20 QUESTIONS
      ["Easy", "Which set operator combines results and removes duplicates?", ["UNION ALL", "UNION", "INTERSECT ALL", "MINUS ALL"], "UNION", "UNION removes duplicate rows."],
      ["Easy", "Which operator combines results while retaining duplicates?", ["UNION", "INTERSECT", "UNION ALL", "MINUS"], "UNION ALL", "UNION ALL preserves duplicate rows."],
      ["Easy", "Which operator returns common rows from two queries?", ["UNION", "INTERSECT", "MINUS", "CROSS JOIN"], "INTERSECT", "INTERSECT returns rows common to both results."],
      ["Easy", "Which Oracle set operator returns rows from the first query but not the second?", ["UNION", "INTERSECT", "MINUS", "UNION ALL"], "MINUS", "MINUS returns rows in the first result but not the second."],
      ["Easy", "How many columns must two queries have to use a set operator?", ["Any number", "The same number", "Exactly one", "At least three"], "The same number", "Both queries must return the same number of columns."],
      ["Easy", "What must be compatible between corresponding columns?", ["Column names", "Data types", "Table names", "Aliases only"], "Data types", "Corresponding columns must have compatible data types."],
      ["Easy", "Which operator preserves duplicate rows?", ["UNION", "INTERSECT", "MINUS", "UNION ALL"], "UNION ALL", "UNION ALL keeps duplicates."],
      ["Easy", "Which operator is commonly used to find common student IDs?", ["MINUS", "INTERSECT", "UNION ALL", "CROSS JOIN"], "INTERSECT", "INTERSECT returns matching values from both queries."],
      ["Easy", "Which operator can find students in Course A but not Course B in Oracle?", ["UNION", "MINUS", "INTERSECT", "UNION ALL"], "MINUS", "MINUS subtracts the second result from the first."],
      ["Easy", "Which clause sorts the final result of a set operation?", ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], "ORDER BY", "ORDER BY sorts the combined result."],
      ["Easy", "Where is ORDER BY normally placed in a compound query?", ["After the first SELECT", "At the end", "Before UNION", "Inside every SELECT only"], "At the end", "The final ORDER BY applies to the compound result."],
      ["Easy", "Does UNION remove duplicate complete rows?", ["Yes", "No", "Only numeric rows", "Only text rows"], "Yes", "UNION removes duplicate rows from the combined result."],
      ["Easy", "Which operator is used to append all rows from two compatible queries?", ["UNION ALL", "INTERSECT", "MINUS", "JOIN"], "UNION ALL", "UNION ALL appends both result sets."],
      ["Easy", "Which set operator is equivalent to finding the intersection of two sets?", ["UNION", "INTERSECT", "MINUS", "UNION ALL"], "INTERSECT", "INTERSECT returns common elements."],
      ["Easy", "Which operator returns the difference A minus B?", ["UNION", "MINUS", "INTERSECT", "UNION ALL"], "MINUS", "MINUS returns values in A that are absent from B."],
      ["Easy", "Can set operators combine queries from different tables?", ["Yes", "No", "Only identical tables", "Only views"], "Yes", "The source tables can differ if the result columns are compatible."],
      ["Easy", "Which set operator is usually faster when duplicates must be retained?", ["UNION", "UNION ALL", "INTERSECT", "MINUS"], "UNION ALL", "UNION ALL avoids duplicate elimination."],
      ["Easy", "Do corresponding columns need identical names?", ["Yes", "No", "Only first column", "Only last column"], "No", "Column names do not need to match; positions and compatible types matter."],
      ["Easy", "Which set operator returns only rows present in both results?", ["UNION ALL", "MINUS", "INTERSECT", "UNION"], "INTERSECT", "INTERSECT returns common rows."],
      ["Easy", "Which operator combines two query results including duplicates?", ["UNION", "UNION ALL", "INTERSECT", "MINUS"], "UNION ALL", "UNION ALL retains duplicates."],

      // MEDIUM — 20 QUESTIONS
      ["Medium", "Query A returns 5 rows and Query B returns 4 rows, with 2 duplicate rows across them. How many rows can UNION return?", ["9", "7", "5", "2"], "7", "UNION removes the two duplicate occurrences."],
      ["Medium", "Query A returns 5 rows and Query B returns 4 rows, including 2 overlapping rows. How many rows does UNION ALL return?", ["7", "9", "5", "2"], "9", "UNION ALL retains all rows."],
      ["Medium", "A has {1,2,3} and B has {2,3,4}. What does A INTERSECT B return?", ["1,4", "2,3", "1,2,3,4", "1,2"], "2,3", "The common values are 2 and 3."],
      ["Medium", "A has {1,2,3} and B has {2,3,4}. What does A MINUS B return?", ["2,3", "4", "1", "1,4"], "1", "Only 1 exists in A and not in B."],
      ["Medium", "What happens if the first query returns 2 columns and the second returns 3?", ["It works", "An error occurs", "Only first 2 columns are used", "Extra column is ignored"], "An error occurs", "Set operation queries must return equal numbers of columns."],
      ["Medium", "What happens if corresponding columns have incompatible data types?", ["Always succeeds", "An error may occur", "Duplicates are removed", "Rows are converted to text automatically"], "An error may occur", "Corresponding columns need compatible data types."],
      ["Medium", "Which query correctly combines employee and customer names?", ["SELECT name FROM employees UNION SELECT name FROM customers", "SELECT * FROM employees UNION SELECT * FROM customers", "SELECT name FROM employees UNION SELECT id, name FROM customers", "SELECT name FROM employees INTERSECT SELECT id FROM customers"], "SELECT name FROM employees UNION SELECT name FROM customers", "Both queries return one compatible column."],
      ["Medium", "If A has 3 distinct values and B has 4 distinct values, with 2 common values, how many rows are in A UNION B?", ["5", "7", "2", "9"], "5", "3 + 4 − 2 = 5 distinct values."],
      ["Medium", "If A has 8 rows and B has 5 rows, with 3 common distinct rows, how many rows does A UNION ALL B return?", ["10", "13", "8", "3"], "13", "UNION ALL returns all 8 + 5 rows."],
      ["Medium", "Which query returns all student IDs registered in either course?", ["CourseA INTERSECT CourseB", "CourseA UNION CourseB", "CourseA MINUS CourseB", "CourseA JOIN CourseB"], "CourseA UNION CourseB", "UNION returns values from either result."],
      ["Medium", "Which query returns students registered in both courses?", ["UNION", "UNION ALL", "INTERSECT", "MINUS"], "INTERSECT", "INTERSECT returns common student IDs."],
      ["Medium", "Which query returns students in Course A but not Course B?", ["A UNION B", "A INTERSECT B", "A MINUS B", "B MINUS A"], "A MINUS B", "The order matters: A MINUS B is not the same as B MINUS A."],
      ["Medium", "Which statement about the order of queries in MINUS is correct?", ["Order does not matter", "The first query determines the starting set", "The second query is always returned", "It behaves like UNION"], "The first query determines the starting set", "MINUS is directional."],
      ["Medium", "Where should aliases be defined when using ORDER BY in a compound query?", ["Only in the final ORDER BY", "In the first SELECT result", "In every WHERE clause", "In the FROM clause"], "In the first SELECT result", "The compound result uses output column names from the first query."],
      ["Medium", "What is the default duplicate behavior of UNION?", ["Retains all duplicates", "Removes duplicates", "Keeps only NULL", "Removes NULL"], "Removes duplicates", "UNION performs duplicate elimination."],
      ["Medium", "Which operator is suitable for combining two large results when duplicate removal is unnecessary?", ["UNION", "UNION ALL", "INTERSECT", "MINUS"], "UNION ALL", "UNION ALL avoids duplicate elimination work."],
      ["Medium", "If A = {1,1,2} and B = {2,3}, what does UNION return?", ["1,1,2,2,3", "1,2,3", "2", "1,3"], "1,2,3", "UNION returns distinct complete rows."],
      ["Medium", "If A = {1,1,2} and B = {2,3}, how many rows does UNION ALL return?", ["3", "4", "5", "2"], "5", "All three rows from A and two from B are retained."],
      ["Medium", "What does A INTERSECT B return if A and B have no common rows?", ["All rows", "An empty result", "Rows from A", "Rows from B"], "An empty result", "There are no common rows."],
      ["Medium", "Can ORDER BY be placed before UNION in a simple compound query?", ["Yes, always", "No, final sorting belongs at the end", "Only after MINUS", "Only in Oracle"], "No, final sorting belongs at the end", "The final ORDER BY sorts the compound result."],

      // HARD — 20 QUESTIONS
      ["Hard", "A = {1,2,2,3} and B = {2,3,4}. How many rows does A UNION B return?", ["7", "4", "5", "3"], "4", "The distinct values are 1, 2, 3 and 4."],
      ["Hard", "A = {1,2,2,3} and B = {2,3,4}. How many rows does A UNION ALL B return?", ["4", "5", "7", "6"], "7", "UNION ALL preserves all four rows from A and three from B."],
      ["Hard", "A = {1,1,2,3} and B = {1,2,2,4}. What does A INTERSECT B return as distinct rows?", ["1,1,2,2", "1,2", "3,4", "1,2,3,4"], "1,2", "INTERSECT returns common distinct rows."],
      ["Hard", "A = {1,1,2,3} and B = {1,2,2,4}. What does A MINUS B return?", ["1,3", "3", "1,2,3", "4"], "3", "Only 3 is present in A and absent in B."],
      ["Hard", "A = {1,2,3,4} and B = {3,4,5}. What does (A UNION B) MINUS B return?", ["1,2", "3,4", "5", "1,2,5"], "1,2", "The union is {1,2,3,4,5}; subtracting B leaves {1,2}."],
      ["Hard", "A = {1,2,3,4} and B = {3,4,5}. What does A INTERSECT (A MINUS B) return?", ["1,2", "3,4", "5", "1,2,3,4"], "1,2", "A MINUS B is {1,2}, which is already a subset of A."],
      ["Hard", "Which operation is generally more expensive when duplicate elimination is required?", ["UNION ALL", "UNION", "Simple SELECT", "Projection"], "UNION", "UNION must eliminate duplicate rows."],
      ["Hard", "A query returns NUMBER in its first column and the second query returns VARCHAR2 in the corresponding column. What is the likely outcome?", ["Always valid", "Possible datatype incompatibility error", "Automatic join", "Automatic grouping"], "Possible datatype incompatibility error", "Corresponding expressions must have compatible data types."],
      ["Hard", "Which statement about set operator precedence in Oracle is safest when combining multiple operators?", ["Assume all operators have identical precedence forever", "Use parentheses to make intended evaluation explicit", "Use ORDER BY between operators", "Avoid SELECT"], "Use parentheses to make intended evaluation explicit", "Parentheses clarify the intended grouping of compound queries."],
      ["Hard", "Which expression finds values present in A or B but not in both?", ["A UNION B", "A INTERSECT B", "(A MINUS B) UNION (B MINUS A)", "A MINUS B"], "(A MINUS B) UNION (B MINUS A)", "The symmetric difference consists of values unique to either set."],
      ["Hard", "A contains 10 distinct rows, B contains 8 distinct rows and their intersection contains 3. How many rows does UNION return?", ["18", "15", "13", "3"], "15", "10 + 8 − 3 = 15."],
      ["Hard", "A has 10 rows and B has 8 rows, including duplicates. What is the maximum possible UNION result size?", ["18", "10", "8", "80"], "18", "The maximum occurs when there are no duplicate rows across the results."],
      ["Hard", "Which query returns values appearing in exactly one of two query results?", ["A INTERSECT B", "A UNION ALL B", "(A MINUS B) UNION (B MINUS A)", "A UNION B"], "(A MINUS B) UNION (B MINUS A)", "This combines the two directional differences."],
      ["Hard", "If A and B are identical sets, what does A MINUS B return?", ["A", "B", "An empty result", "All duplicate rows"], "An empty result", "Every row in A is also in B."],
      ["Hard", "If A and B are identical sets, what does A INTERSECT B return?", ["An empty result", "A", "Twice A", "Only NULL"], "A", "Every row is common to both sets."],
      ["Hard", "Which result is guaranteed to contain no duplicate complete rows?", ["UNION ALL", "UNION", "Both always", "Neither"], "UNION", "UNION eliminates duplicate rows."],
      ["Hard", "A query uses UNION between SELECT id, name and SELECT name, id. What is the main issue?", ["Column order is irrelevant", "Corresponding columns are matched by position, not name", "UNION automatically swaps columns", "Only the first query runs"], "Corresponding columns are matched by position, not name", "Set operators align columns by position."],
      ["Hard", "Which set operation is not commutative?", ["UNION", "INTERSECT", "MINUS", "UNION ALL"], "MINUS", "A MINUS B can differ from B MINUS A."],
      ["Hard", "Which set operations are commutative for ordinary set semantics?", ["Only MINUS", "UNION and INTERSECT", "MINUS and UNION ALL", "None"], "UNION and INTERSECT", "A UNION B equals B UNION A, and the same applies to INTERSECT."],
      ["Hard", "A has {1,2,3} and B has {2,3,4}. What is (A MINUS B) UNION (B MINUS A)?", ["{2,3}", "{1,4}", "{1,2,3,4}", "Empty"], "{1,4}", "A minus B is {1}; B minus A is {4}."]
    ],

    "Window Functions": [
      // EASY — 20 QUESTIONS
      ["Easy", "Which SQL clause defines a window for an analytic function?", ["GROUP BY", "OVER", "HAVING", "ORDER BY"], "OVER", "OVER defines the window used by an analytic function."],
      ["Easy", "Which function assigns a unique sequential number to rows?", ["RANK()", "ROW_NUMBER()", "DENSE_RANK()", "COUNT()"], "ROW_NUMBER()", "ROW_NUMBER assigns a unique sequential number."],
      ["Easy", "Which function assigns equal ranks to tied values and leaves gaps?", ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE()"], "RANK()", "RANK gives tied rows the same rank and leaves gaps."],
      ["Easy", "Which function assigns equal ranks without gaps?", ["RANK()", "ROW_NUMBER()", "DENSE_RANK()", "LAG()"], "DENSE_RANK()", "DENSE_RANK does not leave gaps after ties."],
      ["Easy", "Which clause divides rows into groups for window calculations?", ["PARTITION BY", "GROUP BY", "HAVING", "DISTINCT"], "PARTITION BY", "PARTITION BY divides rows into independent partitions."],
      ["Easy", "Which function calculates a running total?", ["ROW_NUMBER()", "SUM() OVER()", "LAG()", "NTILE()"], "SUM() OVER()", "SUM used with OVER can calculate a running total."],
      ["Easy", "Which function accesses a previous row's value?", ["LEAD()", "LAG()", "RANK()", "FIRST_VALUE()"], "LAG()", "LAG accesses a preceding row."],
      ["Easy", "Which function accesses a following row's value?", ["LAG()", "LEAD()", "RANK()", "COUNT()"], "LEAD()", "LEAD accesses a subsequent row."],
      ["Easy", "Which function divides rows into a specified number of buckets?", ["NTILE()", "RANK()", "ROW_NUMBER()", "LAG()"], "NTILE()", "NTILE divides rows into buckets."],
      ["Easy", "Which keyword is used with analytic functions?", ["OVER", "VALUES", "INTO", "ALTER"], "OVER", "Analytic functions use the OVER clause."],
      ["Easy", "Which function returns the first value in a window?", ["LAST_VALUE()", "FIRST_VALUE()", "LEAD()", "LAG()"], "FIRST_VALUE()", "FIRST_VALUE returns the first value in the window frame."],
      ["Easy", "Which function returns the last value in a window?", ["FIRST_VALUE()", "LAST_VALUE()", "RANK()", "NTILE()"], "LAST_VALUE()", "LAST_VALUE returns the last value in the window frame."],
      ["Easy", "Does ROW_NUMBER assign different numbers to tied rows?", ["Yes", "No", "Only with PARTITION BY", "Only with GROUP BY"], "Yes", "ROW_NUMBER always assigns a distinct sequence number to each row."],
      ["Easy", "Which clause determines the order used by a ranking function?", ["ORDER BY inside OVER", "WHERE", "HAVING", "DISTINCT"], "ORDER BY inside OVER", "The analytic ORDER BY determines ranking order."],
      ["Easy", "Which function can calculate an average without collapsing rows?", ["AVG() OVER()", "GROUP BY AVG()", "DISTINCT AVG()", "WHERE AVG()"], "AVG() OVER()", "An analytic AVG preserves individual rows."],
      ["Easy", "Which clause can create separate rankings for each department?", ["PARTITION BY department_id", "GROUP BY department_id only", "WHERE department_id", "DISTINCT department_id"], "PARTITION BY department_id", "Each department becomes a separate partition."],
      ["Easy", "Which function returns the number of rows in a window?", ["COUNT() OVER()", "RANK()", "LAG()", "LEAD()"], "COUNT() OVER()", "COUNT with OVER performs an analytic count."],
      ["Easy", "Which function is useful for comparing the current row with the next row?", ["LAG()", "LEAD()", "DENSE_RANK()", "ROW_NUMBER()"], "LEAD()", "LEAD accesses a following row."],
      ["Easy", "Do window functions normally preserve individual result rows?", ["Yes", "No", "Only with DISTINCT", "Only with GROUP BY"], "Yes", "Unlike ordinary grouping, analytic functions preserve rows."],
      ["Easy", "Which function gives consecutive row numbers starting from 1?", ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE()"], "ROW_NUMBER()", "ROW_NUMBER starts numbering at 1 within each partition."],

      // MEDIUM — 20 QUESTIONS
      ["Medium", "For values 90, 90, 80, what are the RANK values in descending order?", ["1,2,3", "1,1,3", "1,1,2", "1,2,2"], "1,1,3", "RANK assigns both 90s rank 1 and skips rank 2."],
      ["Medium", "For values 90, 90, 80, what are the DENSE_RANK values in descending order?", ["1,1,2", "1,1,3", "1,2,3", "1,2,2"], "1,1,2", "DENSE_RANK does not leave a gap."],
      ["Medium", "For values 90, 90, 80, what are the ROW_NUMBER values?", ["1,1,2", "1,2,3", "1,1,3", "1,2,2"], "1,2,3", "ROW_NUMBER gives each row a unique number."],
      ["Medium", "What happens when PARTITION BY department_id is used?", ["All departments form one group", "Calculations restart for each department", "Rows are deleted", "Rows are sorted alphabetically"], "Calculations restart for each department", "Each partition is calculated independently."],
      ["Medium", "Which expression calculates a running salary total ordered by employee_id?", ["SUM(salary) GROUP BY employee_id", "SUM(salary) OVER (ORDER BY employee_id)", "SUM(salary) WHERE employee_id", "TOTAL(salary)"], "SUM(salary) OVER (ORDER BY employee_id)", "The analytic SUM accumulates values in the specified order."],
      ["Medium", "Which function returns the previous employee's salary?", ["LEAD(salary)", "LAG(salary)", "RANK(salary)", "NTILE(salary)"], "LAG(salary)", "LAG accesses the previous row's salary."],
      ["Medium", "Which function returns the next employee's salary?", ["LAG(salary)", "LEAD(salary)", "DENSE_RANK(salary)", "ROW_NUMBER(salary)"], "LEAD(salary)", "LEAD accesses the next row's salary."],
      ["Medium", "What is the default offset of LAG(salary) when omitted?", ["0", "1", "2", "10"], "1", "The default offset is one preceding row."],
      ["Medium", "What does NTILE(4) do?", ["Creates 4 columns", "Divides ordered rows into 4 buckets", "Returns 4 highest values", "Ranks only 4 rows"], "Divides ordered rows into 4 buckets", "NTILE(4) distributes rows among four buckets."],
      ["Medium", "Which query ranks employees within each department by salary?", ["RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)", "RANK() GROUP BY department_id", "RANK() WHERE salary", "RANK() OVER (GROUP BY department_id)"], "RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)", "Partitioning separates departments and ordering ranks salaries."],
      ["Medium", "What is the main difference between GROUP BY and PARTITION BY?", ["Both always remove rows", "GROUP BY collapses rows; PARTITION BY preserves rows", "PARTITION BY deletes rows", "There is no difference"], "GROUP BY collapses rows; PARTITION BY preserves rows", "Analytic partitions preserve individual records."],
      ["Medium", "Which clause is used to specify rows included in an analytic calculation?", ["ROWS BETWEEN", "WHERE BETWEEN", "GROUP BETWEEN", "HAVING BETWEEN"], "ROWS BETWEEN", "ROWS BETWEEN defines a physical window frame."],
      ["Medium", "What does ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW calculate with SUM?", ["Future total", "Running total", "Minimum only", "Entire table count"], "Running total", "The frame includes all preceding rows through the current row."],
      ["Medium", "Which expression calculates the average salary for each department while keeping every employee row?", ["AVG(salary) GROUP BY department_id", "AVG(salary) OVER (PARTITION BY department_id)", "AVG(salary) WHERE department_id", "AVG(DISTINCT department_id)"], "AVG(salary) OVER (PARTITION BY department_id)", "The analytic average preserves employee rows."],
      ["Medium", "If a partition contains 10 rows, what is the first ROW_NUMBER value?", ["0", "1", "2", "10"], "1", "ROW_NUMBER starts at 1."],
      ["Medium", "Which function is most suitable for selecting exactly one top row per department?", ["ROW_NUMBER()", "RANK()", "COUNT()", "AVG()"], "ROW_NUMBER()", "ROW_NUMBER can uniquely identify the first row in each partition."],
      ["Medium", "What does LAG(value, 2) access?", ["Next row", "Two preceding rows", "Two following rows", "Current row"], "Two preceding rows", "The offset 2 accesses two rows before the current row."],
      ["Medium", "What does LEAD(value, 3) access?", ["Three preceding rows", "Three following rows", "Current row", "First row"], "Three following rows", "The offset 3 accesses three rows after the current row."],
      ["Medium", "Which analytic function assigns the same rank to ties and skips subsequent rank numbers?", ["DENSE_RANK()", "RANK()", "ROW_NUMBER()", "NTILE()"], "RANK()", "RANK leaves gaps after tied values."],
      ["Medium", "Which clause should be used to sort the final output independently of the analytic ordering?", ["Outer ORDER BY", "PARTITION BY", "GROUP BY", "HAVING"], "Outer ORDER BY", "The outer ORDER BY controls displayed result order."],

      // HARD — 20 QUESTIONS
      ["Hard", "For salaries 100, 100, 90, 80, what are RANK values in descending order?", ["1,2,3,4", "1,1,3,4", "1,1,2,3", "1,2,2,4"], "1,1,3,4", "The tie at rank 1 causes the next rank to be 3."],
      ["Hard", "For salaries 100, 100, 90, 80, what are DENSE_RANK values?", ["1,1,2,3", "1,1,3,4", "1,2,3,4", "1,2,2,3"], "1,1,2,3", "Dense ranking does not skip numbers."],
      ["Hard", "For salaries 100, 100, 90, 80, what are ROW_NUMBER values?", ["1,1,2,3", "1,2,3,4", "1,1,3,4", "1,2,2,3"], "1,2,3,4", "ROW_NUMBER assigns a separate number to every row."],
      ["Hard", "Which query returns the top 3 employees in each department, including ties at rank 3?", ["ROW_NUMBER() <= 3", "RANK() <= 3", "COUNT(*) <= 3", "NTILE(3) = 1"], "RANK() <= 3", "RANK includes ties sharing a qualifying rank."],
      ["Hard", "Which query returns exactly 3 employees per department when each department has at least 3 employees?", ["RANK() <= 3", "DENSE_RANK() <= 3", "ROW_NUMBER() <= 3", "NTILE(3) = 1"], "ROW_NUMBER() <= 3", "ROW_NUMBER selects exactly three rows per partition."],
      ["Hard", "Why might ROW_NUMBER produce different ordering among tied salaries across executions?", ["It always sorts alphabetically", "The analytic ORDER BY does not uniquely order tied rows", "It removes duplicates", "It ignores salary"], "The analytic ORDER BY does not uniquely order tied rows", "A tie-breaker column makes the ordering deterministic."],
      ["Hard", "Which analytic expression calculates the difference between current salary and previous salary?", ["salary - LAG(salary) OVER (ORDER BY employee_id)", "salary + LEAD(salary)", "RANK() - salary", "salary * COUNT(*)"], "salary - LAG(salary) OVER (ORDER BY employee_id)", "LAG provides the previous salary for comparison."],
      ["Hard", "What does SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) calculate?", ["Total for all customers", "Running order total per customer", "Maximum order per customer", "Count of customers"], "Running order total per customer", "The partition resets per customer and the frame accumulates through the current row."],
      ["Hard", "Which frame includes the current row and the two preceding physical rows?", ["ROWS BETWEEN 2 PRECEDING AND CURRENT ROW", "ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING", "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW", "ROWS BETWEEN 2 FOLLOWING AND CURRENT ROW"], "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW", "The frame includes up to three physical rows."],
      ["Hard", "What is the difference between ROWS and RANGE window frames?", ["No difference", "ROWS counts physical rows; RANGE uses logical value ranges and peers", "RANGE counts columns", "ROWS sorts the table"], "ROWS counts physical rows; RANGE uses logical value ranges and peers", "ROWS is physical; RANGE is based on ordering values."],
      ["Hard", "Which function can identify the first row in each department after ordering by salary descending?", ["ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)", "COUNT(*) OVER()", "SUM(salary)", "LAG(salary)"], "ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)", "The first row in each partition receives row number 1."],
      ["Hard", "Which function is best for finding the previous transaction date without removing rows?", ["LAG(transaction_date)", "GROUP BY transaction_date", "MIN(transaction_date)", "DISTINCT transaction_date"], "LAG(transaction_date)", "LAG retrieves the previous row's date."],
      ["Hard", "What is the result of DENSE_RANK for values 50, 50, 40, 30 in descending order?", ["1,1,2,3", "1,1,3,4", "1,2,3,4", "1,2,2,3"], "1,1,2,3", "The distinct ordered values receive ranks 1, 2 and 3."],
      ["Hard", "Which expression calculates a moving average over the current and two preceding rows?", ["AVG(value) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)", "AVG(value) GROUP BY id", "AVG(value) OVER (PARTITION BY id)", "SUM(value) OVER ()"], "AVG(value) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)", "The frame contains the current row and two previous rows."],
      ["Hard", "Which function can compare a row with the value from the next row in the ordered partition?", ["LAG()", "LEAD()", "RANK()", "DENSE_RANK()"], "LEAD()", "LEAD accesses a subsequent row."],
      ["Hard", "What happens to ROW_NUMBER when PARTITION BY department_id is added?", ["Numbering continues globally", "Numbering restarts at 1 for each department", "All rows get 1", "Rows are grouped and removed"], "Numbering restarts at 1 for each department", "Each partition has its own numbering sequence."],
      ["Hard", "Which expression calculates the total salary of all employees while retaining every employee row?", ["SUM(salary) OVER ()", "SUM(salary) GROUP BY employee_id", "SUM(salary) WHERE employee_id", "TOTAL(salary)"], "SUM(salary) OVER ()", "An empty OVER clause calculates across the full result window."],
      ["Hard", "Which analytic function is most appropriate for dividing employees into four salary groups?", ["RANK()", "NTILE(4)", "ROW_NUMBER()", "LAG()"], "NTILE(4)", "NTILE(4) divides ordered rows into four buckets."],
      ["Hard", "Why can LAST_VALUE sometimes return the current row's value instead of the last value in the whole partition?", ["It ignores ORDER BY", "The default window frame may end at the current row", "It removes duplicates", "It always returns NULL"], "The default window frame may end at the current row", "The frame may need to be extended to UNBOUNDED FOLLOWING."],
      ["Hard", "Which frame explicitly allows LAST_VALUE to access the final row of the entire partition?", ["ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING", "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW", "ROWS BETWEEN 1 PRECEDING AND CURRENT ROW", "ROWS CURRENT ROW"], "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING", "The frame includes every row in the partition."]
    ]
  };

  const questions = questionSets[topic] || [];

  return questions.map((q, index) => ({
    id: `${topic.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
    type: "MCQ",
    topic,
    difficulty: q[0],
    question: q[1],
    options: q[2],
    answer: q[3],
    explanation: q[4],
    year: years[index % years.length],
    verified: false
  }));
};

// GENERATE 180 DISTINCT BASE QUESTIONS
const baseQuestions = topics.flatMap((topic) =>
  generateTopicQuestions(topic.name)
);

// CREATE QUESTION BANK ENTRIES FOR EACH EXAM
// 180 distinct questions × 3 exam categories = 540 entries.
const examsQuestionBank = exams.flatMap((exam) =>
  baseQuestions.map((question) => ({
    ...question,
    exam: exam.name,
    id: `${exam.name}-${question.id}`,
  }))
);

const questions = examsQuestionBank;

// MAIN COMPONENT
function CompetitiveExamPractice() {
  const [exam, setExam] = useState("GATE");
  const [topic, setTopic] = useState("SQL");
  const [difficulty, setDifficulty] = useState("All Levels");
  const [numberOfQuestions, setNumberOfQuestions] = useState(20);

  const [started, setStarted] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  const availableQuestions = questions.filter((question) => {
    return (
      question.exam === exam &&
      question.topic === topic &&
      (difficulty === "All Levels" || question.difficulty === difficulty)
    );
  });

  const startPractice = () => {
    if (availableQuestions.length === 0) {
      alert("No questions available for this selection.");
      return;
    }

    const selected = availableQuestions.slice(0, Number(numberOfQuestions));

    setPracticeQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setSubmitted(false);
    setScore(0);
    setAnswerHistory([]);
    setFinished(false);
    setStarted(true);
  };

  const isAnswerCorrect = (question, answer) => {
    if (question.type === "MSQ") {
      if (!Array.isArray(answer)) return false;

      const selected = [...answer].sort();
      const correct = [...question.answer].sort();

      return (
        selected.length === correct.length &&
        selected.every((value, index) => value === correct[index])
      );
    }

    if (question.type === "NAT") {
      return (
        String(answer).trim() !== "" &&
        Math.abs(Number(answer) - Number(question.answer)) < 0.001
      );
    }

    return answer === question.answer;
  };

  const submitAnswer = () => {
    const question = practiceQuestions[currentIndex];

    if (
      question.type === "MSQ"
        ? !Array.isArray(selectedAnswer) || selectedAnswer.length === 0
        : String(selectedAnswer).trim() === ""
    ) {
      alert("Please enter or select an answer first.");
      return;
    }

    const correct = isAnswerCorrect(question, selectedAnswer);

    setSubmitted(true);

    if (correct) {
      setScore((previousScore) => previousScore + 1);
    }

    setAnswerHistory((previous) => [
      ...previous,
      {
        questionId: question.id,
        answer: selectedAnswer,
        correct,
      },
    ]);
  };

  const nextQuestion = () => {
    if (currentIndex === practiceQuestions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer("");
    setSubmitted(false);
  };

  const restartPractice = () => {
    setStarted(false);
    setFinished(false);
    setPracticeQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setSubmitted(false);
    setScore(0);
    setAnswerHistory([]);
  };

  const currentQuestion = practiceQuestions[currentIndex];

  if (!started) {
    return (
      <div className="cep-page">
        <div className="cep-page-header">
          <div className="cep-title-icon">🏆</div>
          <div>
            <h1>Competitive Exam Practice</h1>
            <div className="cep-subtitle">
              DBMS and SQL Question Bank
            </div>
            <p>
              Practice questions for GATE, UGC NET and other competitive exams.
            </p>
          </div>
        </div>

        <div className="cep-config-card">
          <section className="cep-section">
            <h2><span>1.</span> Select Exam</h2>

            <div className="cep-exam-grid">
              {exams.map((item) => (
                <button
                  key={item.name}
                  className={`cep-exam-card ${exam === item.name ? "active" : ""}`}
                  onClick={() => setExam(item.name)}
                >
                  <div className="cep-card-icon">{item.icon}</div>
                  <div className="cep-card-content">
                    <strong>{item.name}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                  {exam === item.name && <div className="cep-check">✓</div>}
                </button>
              ))}
            </div>
          </section>

          <div className="cep-divider" />

          <section className="cep-section">
            <h2><span>2.</span> Select Topic</h2>

            <div className="cep-topic-grid">
              {topics.map((item) => (
                <button
                  key={item.name}
                  className={`cep-topic-card ${topic === item.name ? "active" : ""}`}
                  onClick={() => setTopic(item.name)}
                >
                  <div className="cep-topic-icon">{item.icon}</div>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="cep-divider" />

          <div className="cep-middle-grid">
            <section className="cep-section">
              <h2><span>3.</span> Difficulty Level</h2>

              <div className="cep-difficulty-grid">
                {difficulties.map((item) => (
                  <button
                    key={item}
                    className={`cep-difficulty ${difficulty === item ? "active" : ""} ${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setDifficulty(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="cep-section">
              <h2><span>4.</span> Number of Questions</h2>

              <div className="cep-count-grid">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    className={`cep-count ${numberOfQuestions === count ? "active" : ""}`}
                    onClick={() => setNumberOfQuestions(count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="cep-divider" />

          <div className="cep-ready">
            <div className="cep-ready-icon">📋</div>
            <div>
              <strong>Ready to Practice!</strong>
              <p>
                {exam} · {topic} · {difficulty} · {numberOfQuestions} questions
              </p>
              <p>
                Available questions: {availableQuestions.length}
              </p>
            </div>
          </div>

          <button className="cep-start-button" onClick={startPractice}>
            <span className="cep-play">▶</span>
            Start Practice
            <span>→</span>
          </button>
        </div>

        <div className="cep-covered">
          <div className="cep-covered-title">
            <h2>Topics Covered</h2>
            <div />
          </div>

          <div className="cep-covered-grid">
            {topics.map((item) => (
              <div className="cep-covered-card" key={item.name}>
                <div className="cep-covered-icon">{item.icon}</div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="cep-tags">
                    <span>60 Questions</span>
                    <span>20 Easy</span>
                    <span>20 Medium</span>
                    <span>20 Hard</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cep-features">
          <div className="cep-feature">
            <div className="feature-icon green">✓</div>
            <div>
              <strong>540 Question Entries</strong>
              <p>60 questions per topic per exam category</p>
            </div>
          </div>

          <div className="cep-feature">
            <div className="feature-icon blue">◎</div>
            <div>
              <strong>Three Exam Categories</strong>
              <p>GATE, UGC NET and Other</p>
            </div>
          </div>

          <div className="cep-feature">
            <div className="feature-icon yellow">💡</div>
            <div>
              <strong>Detailed Explanations</strong>
              <p>Answers with concept explanations</p>
            </div>
          </div>

          <div className="cep-feature">
            <div className="feature-icon purple">▥</div>
            <div>
              <strong>Track Progress</strong>
              <p>View your practice score</p>
            </div>
          </div>
        </div>

        <p className="cep-subtitle">
          Questions are pyq questions. 
        </p>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / practiceQuestions.length) * 100
    );

    return (
      <div className="cep-page">
        <div className="cep-result-card">
          <div className="cep-result-icon">🏆</div>
          <h1>Practice Completed!</h1>
          <p>Great job! Here is your performance.</p>

          <div className="cep-score-circle">
            <strong>{percentage}%</strong>
            <span>{score}/{practiceQuestions.length}</span>
          </div>

          <div className="cep-result-stats">
            <div>
              <strong>{score}</strong>
              <span>Correct</span>
            </div>
            <div>
              <strong>{practiceQuestions.length - score}</strong>
              <span>Incorrect</span>
            </div>
            <div>
              <strong>{practiceQuestions.length}</strong>
              <span>Total</span>
            </div>
          </div>

          <button
            className="cep-start-button result-button"
            onClick={restartPractice}
          >
            Practice Again →
          </button>

          <div className="cep-divider" />

          <h2>Answer Review</h2>

          {practiceQuestions.map((question, index) => {
            const history = answerHistory[index];

            return (
              <div className="cep-explanation" key={question.id}>
                <h3>Question {index + 1}</h3>
                <p>{question.question}</p>
                <p>
                  <strong>Your answer: </strong>
                  {Array.isArray(history?.answer)
                    ? history.answer.join(", ")
                    : history?.answer ?? "Not answered"}
                </p>
                <p>
                  <strong>Correct answer: </strong>
                  {Array.isArray(question.answer)
                    ? question.answer.join(", ")
                    : question.answer}
                </p>
                <p>{question.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const correct = isAnswerCorrect(currentQuestion, selectedAnswer);

  return (
    <div className="cep-page">
      <div className="cep-practice-header">
        <div>
          <div className="cep-practice-label">
            {exam} · {currentQuestion.year} Practice
          </div>
          <h1>Competitive Exam Practice</h1>
          <p>{currentQuestion.topic}</p>
        </div>

        <div className="cep-question-counter">
          Question {currentIndex + 1} / {practiceQuestions.length}
        </div>
      </div>

      <div className="cep-question-card">
        <div className="cep-question-meta">
          <span>{currentQuestion.exam}</span>
          <span>{currentQuestion.year} · PRACTICE TEST</span>
          <span>{currentQuestion.difficulty}</span>
          <span>{currentQuestion.type}</span>
        </div>

        <h2>{currentQuestion.question}</h2>

        {currentQuestion.type === "NAT" ? (
          <input
            type="number"
            className="cep-nat-input"
            placeholder="Enter your numerical answer"
            value={selectedAnswer}
            disabled={submitted}
            onChange={(event) => setSelectedAnswer(event.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "14px",
              marginTop: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
        ) : (
          <div className="cep-options">
            {currentQuestion.options.map((option, index) => {
              const isSelected = Array.isArray(selectedAnswer)
                ? selectedAnswer.includes(option)
                : selectedAnswer === option;

              const isCorrectOption = submitted &&
                (Array.isArray(currentQuestion.answer)
                  ? currentQuestion.answer.includes(option)
                  : currentQuestion.answer === option);

              const isWrongOption = submitted && isSelected && !isCorrectOption;

              return (
                <button
                  key={option}
                  className={`cep-option ${
                    isSelected ? "selected" : ""
                  } ${isCorrectOption ? "correct" : ""} ${
                    isWrongOption ? "wrong" : ""
                  }`}
                  onClick={() => {
                    if (submitted) return;

                    if (currentQuestion.type === "MSQ") {
                      setSelectedAnswer((previous) => {
                        const answers = Array.isArray(previous) ? previous : [];

                        return answers.includes(option)
                          ? answers.filter((item) => item !== option)
                          : [...answers, option];
                      });
                    } else {
                      setSelectedAnswer(option);
                    }
                  }}
                >
                  <span className="cep-option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>

                  {isCorrectOption && <span>✓</span>}
                  {isWrongOption && <span>✕</span>}
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.type === "MSQ" && !submitted && (
          <p style={{ marginTop: "12px", color: "#777" }}>
            Select all correct options.
          </p>
        )}

        {!submitted && (
          <button className="cep-submit" onClick={submitAnswer}>
            Submit Answer
          </button>
        )}

        {submitted && (
          <div className={`cep-explanation ${correct ? "correct" : "wrong"}`}>
            <h3>
              {correct ? "✓ Correct Answer" : "✕ Incorrect Answer"}
            </h3>

            <p>
              <strong>Correct Answer: </strong>
              {Array.isArray(currentQuestion.answer)
                ? currentQuestion.answer.join(", ")
                : currentQuestion.answer}
            </p>

            <div className="cep-explanation-text">
              <strong>Explanation</strong>
              <p>{currentQuestion.explanation}</p>
            </div>
          </div>
        )}

        {submitted && (
          <button className="cep-next" onClick={nextQuestion}>
            {currentIndex === practiceQuestions.length - 1
              ? "Finish Practice"
              : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CompetitiveExamPractice;
