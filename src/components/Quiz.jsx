import { useState } from "react";

const questionBank = {
  Easy: [
    {
      type: "MCQ",
      question: "Which set operation removes duplicate rows?",
      options: ["UNION", "UNION ALL", "INTERSECT", "EXCEPT"],
      answer: "UNION",
      explanation: "UNION combines two result sets and removes duplicate rows.",
    },
    {
      type: "Fill in the SQL",
      question: "Complete the query to assign a unique number to every row.",
      code: `SELECT SName, CGPA,
       ______() OVER (ORDER BY CGPA DESC) AS RowNo
FROM students;`,
      options: ["RANK", "ROW_NUMBER", "LAG", "AVG"],
      answer: "ROW_NUMBER",
      explanation: "ROW_NUMBER() assigns a unique sequential number to every row.",
    },
    {
      type: "MCQ",
      question: "Which function accesses the previous row?",
      options: ["LEAD()", "LAG()", "RANK()", "AVG()"],
      answer: "LAG()",
      explanation: "LAG() accesses a value from a previous row.",
    },
    {
      type: "Output Prediction",
      question: "What will this query return?",
      code: `SELECT COUNT(*)
FROM students
WHERE CGPA > 8;`,
      options: ["2", "3", "4", "5"],
      answer: "3",
      explanation: "Three students have CGPA greater than 8.",
    },
    {
      type: "MCQ",
      question: "Which function accesses the next row?",
      options: ["LAG()", "LEAD()", "RANK()", "COUNT()"],
      answer: "LEAD()",
      explanation: "LEAD() accesses a value from a following row.",
    },
    {
      type: "Set Operation",
      question: "Which operation returns rows common to both queries?",
      options: ["UNION", "EXCEPT", "INTERSECT", "UNION ALL"],
      answer: "INTERSECT",
      explanation: "INTERSECT returns rows that appear in both result sets.",
    },
    {
      type: "MCQ",
      question: "Which clause sorts the result?",
      options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
      answer: "ORDER BY",
      explanation: "ORDER BY sorts query results.",
    },
    {
      type: "Fill in the SQL",
      question: "Complete the query to calculate an average.",
      code: `SELECT AVG(______)
FROM students;`,
      options: ["CGPA", "SName", "Department", "SID"],
      answer: "CGPA",
      explanation: "CGPA is the numeric column used to calculate the average.",
    },
    {
      type: "MCQ",
      question: "Which function gives a ranking to rows?",
      options: ["RANK()", "LAG()", "AVG()", "SUM()"],
      answer: "RANK()",
      explanation: "RANK() assigns a rank based on the specified ordering.",
    },
    {
      type: "Output Prediction",
      question: "How many columns are returned?",
      code: `SELECT SName, CGPA
FROM students;`,
      options: ["1", "2", "3", "5"],
      answer: "2",
      explanation: "The SELECT clause contains SName and CGPA.",
    },
    {
      type: "MCQ",
      question: "Which operation keeps duplicate rows?",
      options: ["UNION", "UNION ALL", "INTERSECT", "EXCEPT"],
      answer: "UNION ALL",
      explanation: "UNION ALL keeps duplicate rows.",
    },
    {
      type: "MCQ",
      question: "Which keyword divides rows into groups inside a window function?",
      options: ["GROUP BY", "PARTITION BY", "ORDER BY", "HAVING"],
      answer: "PARTITION BY",
      explanation: "PARTITION BY divides rows into independent groups.",
    },
    {
      type: "Debugging",
      question: "What is wrong with this query?",
      code: `SELECT *
FROM students
WHERE CGPA > 8
WHERE Department = 'CSE';`,
      options: [
        "There are two WHERE clauses",
        "CGPA cannot be compared",
        "Department cannot be used",
        "SELECT * is invalid",
      ],
      answer: "There are two WHERE clauses",
      explanation: "Multiple conditions should be combined using AND or OR.",
    },
    {
      type: "MCQ",
      question: "Which function calculates a total over a window?",
      options: ["SUM() OVER()", "RANK()", "LAG()", "ROW_NUMBER()"],
      answer: "SUM() OVER()",
      explanation: "SUM() can be used as a window function with OVER().",
    },
    {
      type: "Output Prediction",
      question: "What does SELECT COUNT(*) FROM students return?",
      options: ["Number of columns", "Number of rows", "Average CGPA", "Highest CGPA"],
      answer: "Number of rows",
      explanation: "COUNT(*) counts the rows in the table.",
    },
    {
      type: "MCQ",
      question: "Which keyword is used to filter rows before grouping?",
      options: ["WHERE", "HAVING", "ORDER BY", "OVER"],
      answer: "WHERE",
      explanation: "WHERE filters individual rows before grouping.",
    },
    {
      type: "Fill in the SQL",
      question: "Complete the query.",
      code: `SELECT *
FROM students
______ CGPA > 8;`,
      options: ["WHERE", "HAVING", "ORDER", "GROUP"],
      answer: "WHERE",
      explanation: "WHERE is used to filter rows.",
    },
    {
      type: "MCQ",
      question: "Which function assigns consecutive numbers without gaps after ties?",
      options: ["RANK()", "DENSE_RANK()", "LAG()", "LEAD()"],
      answer: "DENSE_RANK()",
      explanation: "DENSE_RANK() does not leave gaps after tied ranks.",
    },
    {
      type: "Set Operation",
      question: "Which operation returns rows from the first query that are not in the second?",
      options: ["INTERSECT", "UNION", "EXCEPT", "UNION ALL"],
      answer: "EXCEPT",
      explanation: "EXCEPT returns rows from the first result that are absent from the second.",
    },
    {
      type: "Scenario",
      question: "You want students with CGPA greater than 8. Which clause should you use?",
      options: ["WHERE", "ORDER BY", "OVER", "PARTITION BY"],
      answer: "WHERE",
      explanation: "WHERE filters rows according to a condition.",
    },
  ],

  Medium: [
    {
      type: "SQL Selection",
      question: "Which query ranks students separately within each department?",
      options: [
        `RANK() OVER (ORDER BY CGPA DESC)`,
        `RANK() OVER (PARTITION BY Department ORDER BY CGPA DESC)`,
        `RANK(Department) OVER (CGPA)`,
        `RANK() GROUP BY Department`,
      ],
      answer: `RANK() OVER (PARTITION BY Department ORDER BY CGPA DESC)`,
      explanation: "PARTITION BY creates a separate ranking group for each department.",
    },
    {
      type: "Set Operation",
      question: "A = {1,2,3} and B = {2,3,4}. What is A INTERSECT B?",
      options: ["1,2", "2,3", "3,4", "1,2,3,4"],
      answer: "2,3",
      explanation: "INTERSECT returns common values.",
    },
    {
      type: "Debugging",
      question: "What is wrong with this query?",
      code: `SELECT SName, CGPA
FROM students
WHERE CGPA > 8
ORDER BY CGPA DESC
WHERE Department = 'CSE';`,
      options: [
        "There are two WHERE clauses",
        "ORDER BY must come first",
        "CGPA cannot be sorted",
        "Department cannot be filtered",
      ],
      answer: "There are two WHERE clauses",
      explanation: "Use AND to combine both conditions.",
    },
    {
      type: "Output Prediction",
      question: "What does LAG() return for the first ordered row?",
      code: `LAG(CGPA) OVER (ORDER BY CGPA)`,
      options: ["0", "NULL", "Highest CGPA", "Same CGPA"],
      answer: "NULL",
      explanation: "The first row has no preceding row.",
    },
    {
      type: "SQL Selection",
      question: "Which query calculates the department average while retaining every student?",
      options: [
        "AVG(CGPA) GROUP BY Department",
        "AVG(CGPA) OVER (PARTITION BY Department)",
        "AVG(Department)",
        "AVG(CGPA) ORDER BY Department",
      ],
      answer: "AVG(CGPA) OVER (PARTITION BY Department)",
      explanation: "A windowed AVG preserves individual student rows.",
    },
    {
      type: "MCQ",
      question: "What does PARTITION BY do?",
      options: [
        "Deletes duplicates",
        "Divides rows into groups",
        "Deletes rows",
        "Creates a table",
      ],
      answer: "Divides rows into groups",
      explanation: "PARTITION BY divides rows into groups for window calculations.",
    },
    {
      type: "Output Prediction",
      question: "If values are 90, 80, 70, what does LAG(value) return in descending order?",
      options: [
        "NULL, 90, 80",
        "90, 80, 70",
        "80, 70, NULL",
        "NULL, 80, 70",
      ],
      answer: "NULL, 90, 80",
      explanation: "The first row has no previous row.",
    },
    {
      type: "MCQ",
      question: "Which function can calculate a running total?",
      options: [
        "SUM() OVER(ORDER BY ...)",
        "RANK()",
        "LAG()",
        "COUNT(*) only",
      ],
      answer: "SUM() OVER(ORDER BY ...)",
      explanation: "SUM with an ordered window can calculate a running total.",
    },
    {
      type: "Set Operation",
      question: "Which SQLite set operation is commonly equivalent to Oracle's MINUS?",
      options: ["UNION", "EXCEPT", "INTERSECT", "UNION ALL"],
      answer: "EXCEPT",
      explanation: "SQLite uses EXCEPT for this set-difference operation.",
    },
    {
      type: "Debugging",
      question: "What is incorrect here?",
      code: `SELECT SName,
ROW_NUMBER OVER (ORDER BY CGPA DESC)
FROM students;`,
      options: [
        "ROW_NUMBER needs parentheses",
        "ORDER BY cannot be used",
        "CGPA cannot be sorted",
        "FROM is incorrect",
      ],
      answer: "ROW_NUMBER needs parentheses",
      explanation: "The correct syntax is ROW_NUMBER() OVER (...).",
    },
    {
      type: "SQL Selection",
      question: "Which query gets the highest CGPA?",
      options: [
        "SELECT MIN(CGPA) FROM students;",
        "SELECT MAX(CGPA) FROM students;",
        "SELECT AVG(CGPA) FROM students;",
        "SELECT COUNT(CGPA) FROM students;",
      ],
      answer: "SELECT MAX(CGPA) FROM students;",
      explanation: "MAX() returns the largest value.",
    },
    {
      type: "Output Prediction",
      question: "What does DENSE_RANK() produce for scores 100,100,90?",
      options: ["1,2,3", "1,1,2", "1,1,3", "2,2,1"],
      answer: "1,1,2",
      explanation: "DENSE_RANK does not leave gaps after ties.",
    },
    {
      type: "MCQ",
      question: "Which function can access a following row?",
      options: ["LAG()", "LEAD()", "RANK()", "SUM()"],
      answer: "LEAD()",
      explanation: "LEAD() accesses a subsequent row.",
    },
    {
      type: "Scenario",
      question: "You need the previous student's CGPA. Which function is appropriate?",
      options: ["LEAD()", "LAG()", "RANK()", "AVG()"],
      answer: "LAG()",
      explanation: "LAG accesses a preceding row.",
    },
    {
      type: "Set Operation",
      question: "Which operation removes duplicates after combining two compatible queries?",
      options: ["UNION", "UNION ALL", "EXCEPT", "INTERSECT"],
      answer: "UNION",
      explanation: "UNION combines results and removes duplicate rows.",
    },
    {
      type: "Fill in the SQL",
      question: "Complete the window function.",
      code: `RANK() OVER (
  PARTITION BY Department
  ______ CGPA DESC
)`,
      options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
      answer: "ORDER BY",
      explanation: "ORDER BY determines the ranking order inside the window.",
    },
    {
      type: "Output Prediction",
      question: "What happens when UNION combines identical rows?",
      options: [
        "Both remain",
        "The duplicate is removed",
        "An error always occurs",
        "Rows are multiplied",
      ],
      answer: "The duplicate is removed",
      explanation: "UNION removes duplicate result rows.",
    },
    {
      type: "Debugging",
      question: "Which query correctly uses HAVING?",
      options: [
        "SELECT Department, AVG(CGPA) FROM students GROUP BY Department HAVING AVG(CGPA) > 8;",
        "SELECT Department FROM students HAVING CGPA > 8;",
        "SELECT * FROM students HAVING CGPA > 8;",
        "HAVING SELECT Department FROM students;",
      ],
      answer:
        "SELECT Department, AVG(CGPA) FROM students GROUP BY Department HAVING AVG(CGPA) > 8;",
      explanation: "HAVING filters groups after GROUP BY.",
    },
    {
      type: "Scenario",
      question: "You want ranking to restart for every department. What should you use?",
      options: ["ORDER BY only", "PARTITION BY Department", "GROUP BY only", "WHERE Department"],
      answer: "PARTITION BY Department",
      explanation: "PARTITION BY creates independent windows for each department.",
    },
    {
      type: "MCQ",
      question: "Which ranking function can leave gaps after ties?",
      options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "AVG()"],
      answer: "RANK()",
      explanation: "RANK() leaves gaps after tied values.",
    },
  ],

  Hard: [
    {
      type: "SQL Selection",
      question: "Which query finds the top-ranked student in every department?",
      options: [
        "WHERE RANK() = 1",
        "A subquery using RANK() OVER(PARTITION BY Department ORDER BY CGPA DESC) and WHERE rnk = 1",
        "SELECT TOP 1 * FROM students",
        "GROUP BY SName",
      ],
      answer:
        "A subquery using RANK() OVER(PARTITION BY Department ORDER BY CGPA DESC) and WHERE rnk = 1",
      explanation: "The ranking is calculated per department and filtered in an outer query.",
    },
    {
      type: "Concept",
      question: "What is the main difference between RANK() and DENSE_RANK()?",
      options: [
        "RANK can leave gaps after ties",
        "DENSE_RANK removes rows",
        "RANK sorts text only",
        "They are identical",
      ],
      answer: "RANK can leave gaps after ties",
      explanation: "RANK leaves gaps, while DENSE_RANK continues consecutively.",
    },
    {
      type: "Output Prediction",
      question: "If scores are 95,95,90, what ranks does RANK() produce?",
      options: ["1,2,3", "1,1,2", "1,1,3", "2,2,3"],
      answer: "1,1,3",
      explanation: "The tied 95 values receive rank 1 and the next row receives rank 3.",
    },
    {
      type: "Scenario",
      question: "You need a department average displayed beside every student. Which query is appropriate?",
      options: [
        "AVG(CGPA) OVER(PARTITION BY Department)",
        "AVG(CGPA) GROUP BY Department only",
        "GROUP BY SName",
        "COUNT(CGPA) OVER()",
      ],
      answer: "AVG(CGPA) OVER(PARTITION BY Department)",
      explanation: "The window calculation preserves individual rows.",
    },
    {
      type: "SQL Selection",
      question: "Which function gives every row a unique sequence even when values tie?",
      options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "AVG()"],
      answer: "ROW_NUMBER()",
      explanation: "ROW_NUMBER always assigns a distinct sequential number.",
    },
    {
      type: "Output Prediction",
      question: "For values 100,100,90, what does DENSE_RANK() return?",
      options: ["1,1,3", "1,2,3", "1,1,2", "2,2,1"],
      answer: "1,1,2",
      explanation: "DENSE_RANK does not leave gaps after ties.",
    },
    {
      type: "Debugging",
      question: "Why can a window function be useful instead of GROUP BY?",
      options: [
        "It can calculate across related rows without collapsing individual rows",
        "It always deletes duplicates",
        "It replaces SELECT",
        "It cannot use ORDER BY",
      ],
      answer:
        "It can calculate across related rows without collapsing individual rows",
      explanation: "Window functions perform calculations while retaining the original rows.",
    },
    {
      type: "SQL Selection",
      question: "Which expression creates a running total ordered by SID?",
      options: [
        "SUM(CGPA)",
        "SUM(CGPA) OVER (ORDER BY SID)",
        "TOTAL(CGPA) GROUP BY SID",
        "SUM OVER SID",
      ],
      answer: "SUM(CGPA) OVER (ORDER BY SID)",
      explanation: "The ordered window creates a cumulative calculation.",
    },
    {
      type: "Scenario",
      question: "You want the difference between the current CGPA and the previous CGPA. Which approach works?",
      options: [
        "CGPA - LAG(CGPA) OVER (ORDER BY CGPA)",
        "CGPA + LEAD(CGPA)",
        "RANK(CGPA)",
        "AVG(CGPA) GROUP BY",
      ],
      answer: "CGPA - LAG(CGPA) OVER (ORDER BY CGPA)",
      explanation: "LAG provides the previous value, allowing the difference to be calculated.",
    },
    {
      type: "Set Operation",
      question: "A query uses UNION ALL instead of UNION. What changes?",
      options: [
        "Duplicates are retained",
        "Duplicates are removed",
        "Only common rows remain",
        "Only first-query rows remain",
      ],
      answer: "Duplicates are retained",
      explanation: "UNION ALL does not remove duplicate rows.",
    },
    {
      type: "SQL Selection",
      question: "Which expression gets the next CGPA according to SID?",
      options: [
        "LAG(CGPA) OVER (ORDER BY SID)",
        "LEAD(CGPA) OVER (ORDER BY SID)",
        "RANK(CGPA)",
        "AVG(CGPA)",
      ],
      answer: "LEAD(CGPA) OVER (ORDER BY SID)",
      explanation: "LEAD accesses a following row.",
    },
    {
      type: "Output Prediction",
      question: "What is returned by EXCEPT?",
      options: [
        "Common rows",
        "Rows in the first query but not the second",
        "All rows including duplicates",
        "Only second-query rows",
      ],
      answer: "Rows in the first query but not the second",
      explanation: "EXCEPT performs set difference.",
    },
    {
      type: "Scenario",
      question: "A company wants the top 3 employees within each department. Which technique is suitable?",
      options: [
        "ROW_NUMBER/RANK with PARTITION BY followed by filtering",
        "MAX() only",
        "ORDER BY only",
        "COUNT() only",
      ],
      answer: "ROW_NUMBER/RANK with PARTITION BY followed by filtering",
      explanation: "Partitioned ranking allows the top rows to be selected independently per department.",
    },
    {
      type: "Debugging",
      question: "Why can't you normally use a window function directly in a WHERE clause in the same SELECT level?",
      options: [
        "Window calculations occur after WHERE in SQL's logical processing",
        "Window functions cannot use ORDER BY",
        "WHERE only accepts text",
        "SQL does not support window functions",
      ],
      answer:
        "Window calculations occur after WHERE in SQL's logical processing",
      explanation: "A subquery or CTE is commonly used when filtering on a window-function result.",
    },
    {
      type: "MCQ",
      question: "Which clause inside OVER() controls the order of window processing?",
      options: ["ORDER BY", "GROUP BY", "HAVING", "WHERE"],
      answer: "ORDER BY",
      explanation: "ORDER BY inside OVER() determines the window order.",
    },
    {
      type: "Scenario",
      question: "You want the previous transaction amount for each customer. What should you partition by?",
      options: ["Customer ID", "Transaction amount", "Date only", "Nothing"],
      answer: "Customer ID",
      explanation: "PARTITION BY Customer ID keeps each customer's sequence separate.",
    },
    {
      type: "SQL Selection",
      question: "Which expression ranks employees from highest salary to lowest within each department?",
      options: [
        "RANK() OVER (ORDER BY Salary)",
        "RANK() OVER (PARTITION BY Department ORDER BY Salary DESC)",
        "RANK(Salary GROUP BY Department)",
        "RANK() WHERE Department",
      ],
      answer: "RANK() OVER (PARTITION BY Department ORDER BY Salary DESC)",
      explanation: "PARTITION BY separates departments and DESC puts the highest salary first.",
    },
    {
      type: "Output Prediction",
      question: "What happens to the first row when LEAD() is used?",
      options: [
        "It normally receives the next row's value",
        "It always becomes zero",
        "It always becomes NULL",
        "It is removed",
      ],
      answer: "It normally receives the next row's value",
      explanation: "LEAD looks forward, so the first row normally has a following row available.",
    },
    {
      type: "Set Operation",
      question: "For set operations, what is generally required of corresponding SELECT columns?",
      options: [
        "Compatible number and compatible data types",
        "Exactly the same column names only",
        "Different numbers of columns",
        "Only numeric columns",
      ],
      answer: "Compatible number and compatible data types",
      explanation: "Set-operation queries need compatible structures in their corresponding result columns.",
    },
    {
      type: "Challenge",
      question: "Which technique is most suitable for finding the second-highest CGPA while handling ties?",
      options: [
        "Use DENSE_RANK() and filter for rank 2",
        "Use COUNT(*) only",
        "Use UNION ALL",
        "Use LAG() without ordering",
      ],
      answer: "Use DENSE_RANK() and filter for rank 2",
      explanation: "DENSE_RANK handles tied values and allows the second distinct CGPA level to be selected.",
    },
  ],
};


const supplementalQuestions = {
  Concept: [
    ["What does UNION do?", ["Combines results and removes duplicates", "Keeps all duplicates", "Returns only common rows", "Returns only first-query rows"], "Combines results and removes duplicates", "UNION combines compatible result sets and removes duplicate rows."],
    ["What does UNION ALL do?", ["Keeps duplicate rows", "Removes every duplicate", "Returns only common rows", "Sorts the result"], "Keeps duplicate rows", "UNION ALL combines results without removing duplicates."],
    ["What does INTERSECT return?", ["Rows common to both queries", "Rows only in the first query", "All rows", "Only duplicate rows"], "Rows common to both queries", "INTERSECT returns rows present in both result sets."],
    ["What does EXCEPT return?", ["Rows in the first result but not the second", "Common rows", "Only second-query rows", "All rows twice"], "Rows in the first result but not the second", "EXCEPT performs set difference."],
    ["Which clause filters individual rows?", ["WHERE", "HAVING", "ORDER BY", "OVER"], "WHERE", "WHERE filters rows before grouping."],
    ["Which clause sorts a result?", ["ORDER BY", "WHERE", "HAVING", "PARTITION BY"], "ORDER BY", "ORDER BY sorts the result."],
    ["Which clause filters grouped results?", ["HAVING", "WHERE", "ORDER BY", "OVER"], "HAVING", "HAVING filters groups after GROUP BY."],
    ["What does GROUP BY do?", ["Groups rows with common values", "Sorts rows only", "Removes all rows", "Creates a window"], "Groups rows with common values", "GROUP BY forms groups for aggregate calculations."],
    ["What does a window function normally preserve?", ["Individual result rows", "Only one row per group", "Only duplicate rows", "No rows"], "Individual result rows", "Window functions calculate across related rows without collapsing them."],
    ["Which keyword divides a window into groups?", ["PARTITION BY", "GROUP BY", "HAVING", "UNION"], "PARTITION BY", "PARTITION BY creates independent window groups."],
    ["What does OVER() identify?", ["The window used by a window function", "A table name", "A database", "A constraint"], "The window used by a window function", "OVER defines the rows used by the window calculation."],
    ["Which function gives every row a unique sequence?", ["ROW_NUMBER()", "RANK()", "AVG()", "LAG()"], "ROW_NUMBER()", "ROW_NUMBER assigns a unique sequential number."],
    ["Which function can leave gaps after ties?", ["RANK()", "DENSE_RANK()", "AVG()", "LEAD()"], "RANK()", "RANK leaves gaps after tied ranks."],
    ["Which ranking function does not leave gaps?", ["DENSE_RANK()", "RANK()", "LAG()", "SUM()"], "DENSE_RANK()", "DENSE_RANK continues consecutively after ties."],
    ["Which function looks backward?", ["LAG()", "LEAD()", "RANK()", "AVG()"], "LAG()", "LAG accesses a preceding row."],
    ["Which function looks forward?", ["LEAD()", "LAG()", "RANK()", "SUM()"], "LEAD()", "LEAD accesses a following row."],
    ["Which aggregate can be used as a window function?", ["SUM()", "AVG()", "COUNT()", "All of these"], "All of these", "Aggregate functions such as SUM, AVG and COUNT can be used with OVER()."],
    ["What is a running total?", ["A cumulative total over an ordered window", "A duplicate count", "A sorted table", "A set intersection"], "A cumulative total over an ordered window", "SUM() OVER(ORDER BY ...) can calculate a running total."],
    ["Why use a window function instead of GROUP BY?", ["It can retain individual rows", "It always removes duplicates", "It deletes groups", "It replaces SELECT"], "It can retain individual rows", "Window functions calculate across rows while retaining the detail rows."],
    ["What must corresponding columns in set operations have?", ["Compatible number and data types", "Different numbers of columns", "Only identical names", "Only numeric values"], "Compatible number and data types", "Set operations require compatible result structures."],
  ],
  "SQL Output": [
    ["What does SELECT COUNT(*) FROM students return?", ["Number of rows", "Number of columns", "Average CGPA", "Highest CGPA"], "Number of rows", "COUNT(*) counts rows."],
    ["How many columns does SELECT SName, CGPA FROM students return?", ["2", "1", "3", "5"], "2", "Two columns are selected."],
    ["What does SELECT MAX(CGPA) FROM students return?", ["The highest CGPA", "The lowest CGPA", "The average CGPA", "The number of students"], "The highest CGPA", "MAX returns the largest value."],
    ["What does SELECT MIN(CGPA) FROM students return?", ["The lowest CGPA", "The highest CGPA", "The number of rows", "The department"], "The lowest CGPA", "MIN returns the smallest value."],
    ["What does SELECT AVG(CGPA) FROM students return?", ["Average CGPA", "Highest CGPA", "Student count", "Department count"], "Average CGPA", "AVG calculates the arithmetic mean."],
    ["What does SELECT COUNT(*) FROM students WHERE CGPA > 8 return?", ["The number of students above 8", "The highest CGPA", "All CGPAs", "The department names"], "The number of students above 8", "COUNT counts rows that satisfy WHERE."],
    ["What does ORDER BY CGPA DESC do?", ["Sorts highest CGPA first", "Sorts lowest CGPA first", "Groups departments", "Removes duplicates"], "Sorts highest CGPA first", "DESC sorts from high to low."],
    ["What does ORDER BY CGPA ASC do?", ["Sorts lowest CGPA first", "Sorts highest CGPA first", "Filters CGPA", "Counts CGPA"], "Sorts lowest CGPA first", "ASC sorts from low to high."],
    ["For values 90,80,70, what is LAG(value) OVER(ORDER BY value DESC)?", ["NULL,90,80", "90,80,70", "80,70,NULL", "NULL,80,70"], "NULL,90,80", "The first ordered row has no previous row."],
    ["For values 90,80,70, what is LEAD(value) OVER(ORDER BY value DESC)?", ["80,70,NULL", "NULL,90,80", "90,80,70", "70,80,90"], "80,70,NULL", "LEAD looks at the following row."],
    ["For scores 100,90,80, what does ROW_NUMBER() return?", ["1,2,3", "0,1,2", "3,2,1", "1,1,2"], "1,2,3", "ROW_NUMBER assigns consecutive unique numbers."],
    ["For scores 100,100,90, what does RANK() return?", ["1,1,3", "1,2,3", "1,1,2", "2,2,1"], "1,1,3", "RANK leaves a gap after the tie."],
    ["For scores 100,100,90, what does DENSE_RANK() return?", ["1,1,2", "1,1,3", "1,2,3", "2,2,1"], "1,1,2", "DENSE_RANK does not leave gaps."],
    ["What does SELECT * FROM students WHERE Department='CSE' return?", ["Only CSE rows", "Only IT rows", "All columns from every table", "Only the highest CGPA"], "Only CSE rows", "WHERE filters rows by department."],
    ["What does SELECT SName FROM students return?", ["Student names", "CGPAs", "Departments", "Student IDs"], "Student names", "SName is the selected column."],
    ["What does SELECT CGPA FROM students ORDER BY CGPA DESC return?", ["CGPAs from high to low", "CGPAs from low to high", "Names only", "Departments only"], "CGPAs from high to low", "DESC orders the numeric values downward."],
    ["What does INTERSECT return when the two result sets share 2 and 3?", ["2 and 3", "1 and 4", "All values", "Only duplicates from the first query"], "2 and 3", "INTERSECT returns common rows."],
    ["If A={1,2,3} and B={2,3,4}, what is A EXCEPT B?", ["1", "2,3", "4", "1,2,3,4"], "1", "EXCEPT keeps values found only in the first set."],
    ["If A={1,2} and B={2,3}, what does UNION return?", ["1,2,3", "2", "1,2,2,3", "3"], "1,2,3", "UNION removes the duplicate 2."],
    ["If A={1,2} and B={2,3}, what does UNION ALL return?", ["1,2,2,3", "1,2,3", "2", "1,3"], "1,2,2,3", "UNION ALL keeps duplicate rows."],
  ],
  "Fill in SQL": [
    ["Complete: SELECT * FROM students ______ CGPA > 8;", ["WHERE", "HAVING", "ORDER BY", "GROUP BY"], "WHERE", "WHERE filters rows."],
    ["Complete: SELECT * FROM students ______ Department='CSE';", ["WHERE", "HAVING", "OVER", "PARTITION BY"], "WHERE", "WHERE applies a row condition."],
    ["Complete: SELECT * FROM students ORDER BY CGPA ______;", ["DESC", "WHERE", "HAVING", "GROUP"], "DESC", "DESC sorts from high to low."],
    ["Complete: SELECT * FROM students ORDER BY CGPA ______;", ["ASC", "WHERE", "HAVING", "PARTITION"], "ASC", "ASC sorts from low to high."],
    ["Complete: SELECT ______(CGPA) FROM students;", ["AVG", "LAG", "RANK", "LEAD"], "AVG", "AVG calculates the average."],
    ["Complete: SELECT ______(CGPA) FROM students;", ["MAX", "LAG", "RANK", "LEAD"], "MAX", "MAX returns the largest value."],
    ["Complete: SELECT ______(CGPA) FROM students;", ["MIN", "LAG", "RANK", "LEAD"], "MIN", "MIN returns the smallest value."],
    ["Complete: SELECT ______(*) FROM students;", ["COUNT", "RANK", "LAG", "LEAD"], "COUNT", "COUNT(*) counts rows."],
    ["Complete: SELECT SName, ______() OVER(ORDER BY CGPA DESC) FROM students;", ["ROW_NUMBER", "AVG", "COUNT", "LAG"], "ROW_NUMBER", "ROW_NUMBER assigns a unique sequence."],
    ["Complete: SELECT SName, ______() OVER(ORDER BY CGPA DESC) FROM students;", ["RANK", "AVG", "COUNT", "SUM"], "RANK", "RANK assigns ranking positions."],
    ["Complete: SELECT SName, ______() OVER(ORDER BY CGPA DESC) FROM students;", ["DENSE_RANK", "AVG", "COUNT", "SUM"], "DENSE_RANK", "DENSE_RANK gives consecutive ranks."],
    ["Complete: SELECT SName, ______(CGPA) OVER(ORDER BY SID) FROM students;", ["LAG", "RANK", "AVG", "SUM"], "LAG", "LAG accesses the previous row."],
    ["Complete: SELECT SName, ______(CGPA) OVER(ORDER BY SID) FROM students;", ["LEAD", "RANK", "AVG", "SUM"], "LEAD", "LEAD accesses the next row."],
    ["Complete: SUM(CGPA) ______(ORDER BY SID);", ["OVER", "WHERE", "GROUP BY", "HAVING"], "OVER", "OVER defines a window for SUM."],
    ["Complete: RANK() OVER (______ Department ORDER BY CGPA DESC);", ["PARTITION BY", "GROUP BY", "WHERE", "HAVING"], "PARTITION BY", "PARTITION BY separates departments."],
    ["Complete: RANK() OVER (PARTITION BY Department ______ CGPA DESC);", ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], "ORDER BY", "ORDER BY controls ranking order."],
    ["Complete: SELECT Department, AVG(CGPA) FROM students ______ Department;", ["GROUP BY", "ORDER BY", "WHERE", "OVER"], "GROUP BY", "GROUP BY forms department groups."],
    ["Complete: SELECT Department, AVG(CGPA) FROM students GROUP BY Department ______ AVG(CGPA)>8;", ["HAVING", "WHERE", "ORDER BY", "OVER"], "HAVING", "HAVING filters grouped results."],
    ["Complete: SELECT * FROM students ______ CGPA > 8 ORDER BY CGPA DESC;", ["WHERE", "HAVING", "GROUP BY", "PARTITION BY"], "WHERE", "WHERE filters before sorting."],
    ["Complete: SELECT * FROM students ______ Department='CSE' AND CGPA>8;", ["WHERE", "HAVING", "ORDER BY", "OVER"], "WHERE", "WHERE supports row-level conditions."],
  ],
  Debugging: [
    ["Find the error: SELECT * FROM students WHERE CGPA > 8 WHERE Department='CSE';", ["Two WHERE clauses are used", "CGPA is invalid", "SELECT * is invalid", "Department is invalid"], "Two WHERE clauses are used", "Combine conditions with AND or OR."],
    ["Find the error: SELECT SName ROW_NUMBER() OVER(ORDER BY CGPA) FROM students;", ["A comma is missing after SName", "ROW_NUMBER is invalid", "FROM is invalid", "ORDER BY is invalid"], "A comma is missing after SName", "Separate selected expressions with a comma."],
    ["Find the error: SELECT * FROM students ORDER BY CGPA DESC WHERE CGPA>8;", ["WHERE must come before ORDER BY", "CGPA cannot be sorted", "DESC is invalid", "SELECT * is invalid"], "WHERE must come before ORDER BY", "The usual order is WHERE before ORDER BY."],
    ["Find the error: SELECT SName, ROW_NUMBER OVER(ORDER BY CGPA) FROM students;", ["ROW_NUMBER needs parentheses", "ORDER BY is invalid", "SName is invalid", "FROM is invalid"], "ROW_NUMBER needs parentheses", "Use ROW_NUMBER()."],
    ["Find the error: SELECT Department AVG(CGPA) FROM students GROUP BY Department;", ["A comma is missing after Department", "AVG is invalid", "GROUP BY is invalid", "Department cannot be selected"], "A comma is missing after Department", "Use SELECT Department, AVG(CGPA)."],
    ["Find the error: SELECT * FROM students HAVING CGPA > 8;", ["WHERE should be used for a row filter", "HAVING is always invalid", "CGPA is invalid", "SELECT * is invalid"], "WHERE should be used for a row filter", "HAVING is normally used for grouped results."],
    ["Find the error: SELECT RANK(CGPA) OVER(ORDER BY CGPA) FROM students;", ["RANK does not take CGPA as that argument", "OVER is invalid", "CGPA cannot be ordered", "FROM is invalid"], "RANK does not take CGPA as that argument", "Use RANK() OVER(ORDER BY CGPA)."],
    ["Find the error: SELECT * FROM students GROUP BY Department WHERE CGPA>8;", ["WHERE must come before GROUP BY", "GROUP BY is invalid", "CGPA is invalid", "SELECT * is invalid"], "WHERE must come before GROUP BY", "Row filtering occurs before grouping."],
    ["Find the error: SELECT SName FROM students ORDER CGPA;", ["ORDER BY is incomplete", "SName is invalid", "FROM is invalid", "CGPA cannot be used"], "ORDER BY is incomplete", "Use ORDER BY CGPA."],
    ["Find the error: SELECT * students WHERE CGPA>8;", ["FROM is missing", "WHERE is invalid", "CGPA is invalid", "SELECT * is invalid"], "FROM is missing", "A SELECT from a table needs FROM."],
    ["Find the error: SELECT AVG(SName) FROM students;", ["AVG should use a numeric column", "AVG is always invalid", "FROM is missing", "SName must be sorted"], "AVG should use a numeric column", "AVG is intended for numeric values."],
    ["Find the error: SELECT * FROM students WHERE Department = CSE;", ["The text value needs quotes", "WHERE is invalid", "Department is invalid", "SELECT * is invalid"], "The text value needs quotes", "Use Department = 'CSE'."],
    ["Find the error: SELECT * FROM students ORDER BY CGPA DESC DESC;", ["DESC is repeated", "ORDER BY is invalid", "CGPA is invalid", "SELECT * is invalid"], "DESC is repeated", "Use one DESC keyword."],
    ["Find the error: SELECT SName CGPA FROM students;", ["A comma is missing", "CGPA is invalid", "FROM is invalid", "SName is invalid"], "A comma is missing", "Use SELECT SName, CGPA."],
    ["Find the error: SELECT * FROM students WHERE CGPA > 8 AND;", ["The AND condition is incomplete", "WHERE is invalid", "CGPA is invalid", "SELECT * is invalid"], "The AND condition is incomplete", "AND must be followed by another condition."],
    ["Find the error: SELECT * FROM students WHERE AND CGPA > 8;", ["AND has no condition before it", "WHERE is invalid", "CGPA is invalid", "SELECT * is invalid"], "AND has no condition before it", "A condition must appear before AND."],
    ["Find the error: SELECT Department, AVG(CGPA) FROM students;", ["Department needs GROUP BY when selected with this aggregate", "AVG is invalid", "Department is invalid", "FROM is invalid"], "Department needs GROUP BY when selected with this aggregate", "Use GROUP BY Department for a department-level average."],
    ["Find the error: SELECT * FROM students WHERE CGPA > 8 ORDER;", ["ORDER BY is incomplete", "WHERE is invalid", "CGPA is invalid", "SELECT * is invalid"], "ORDER BY is incomplete", "ORDER must be followed by BY and a column."],
    ["Find the error: SELECT * FROM students GROUP Department;", ["GROUP BY is incomplete", "Department is invalid", "SELECT * is invalid", "FROM is invalid"], "GROUP BY is incomplete", "Use GROUP BY Department."],
    ["Find the error: SELECT * FROM students WHERE CGPA > 8 GROUP BY;", ["GROUP BY needs a grouping expression", "WHERE is invalid", "CGPA is invalid", "SELECT * is invalid"], "GROUP BY needs a grouping expression", "Specify the column after GROUP BY."],
  ],
  "Set Operations": [
    ["A={1,2,3}, B={2,3,4}. A UNION B?", ["1,2,3,4", "2,3", "1", "4"], "1,2,3,4", "UNION combines unique values."],
    ["A={1,2,3}, B={2,3,4}. A UNION ALL B?", ["1,2,3,2,3,4", "1,2,3,4", "2,3", "1,4"], "1,2,3,2,3,4", "UNION ALL retains duplicates."],
    ["A={1,2,3}, B={2,3,4}. A INTERSECT B?", ["2,3", "1,4", "1,2,3,4", "1"], "2,3", "INTERSECT keeps common values."],
    ["A={1,2,3}, B={2,3,4}. A EXCEPT B?", ["1", "2,3", "4", "1,2,3,4"], "1", "EXCEPT keeps first-only values."],
    ["A={1,2}, B={2,3}. B EXCEPT A?", ["3", "2", "1", "1,2,3"], "3", "The second set is subtracted from the first named set B."],
    ["Which operation removes duplicates?", ["UNION", "UNION ALL", "EXCEPT", "INTERSECT"], "UNION", "UNION removes duplicates."],
    ["Which operation preserves duplicates?", ["UNION ALL", "UNION", "INTERSECT", "EXCEPT"], "UNION ALL", "UNION ALL preserves duplicates."],
    ["Which operation finds common rows?", ["INTERSECT", "UNION", "EXCEPT", "UNION ALL"], "INTERSECT", "INTERSECT returns common rows."],
    ["Which operation performs set difference in SQLite?", ["EXCEPT", "MINUS", "UNION", "INTERSECT"], "EXCEPT", "SQLite uses EXCEPT."],
    ["Oracle commonly uses which keyword for set difference?", ["MINUS", "EXCEPT", "UNION ALL", "INTERSECT"], "MINUS", "Oracle uses MINUS for set difference."],
    ["For a set operation, what should SELECT lists have?", ["Compatible numbers of columns", "Different column counts", "No columns", "Only one column always"], "Compatible numbers of columns", "Corresponding result columns must be compatible."],
    ["For a set operation, corresponding data types should be:", ["Compatible", "Always different", "Always text", "Always numeric"], "Compatible", "Corresponding columns need compatible types."],
    ["A={A,B}, B={B,C}. UNION?", ["A,B,C", "B", "A,C", "A,B,B,C"], "A,B,C", "UNION removes the repeated B."],
    ["A={A,B}, B={B,C}. UNION ALL?", ["A,B,B,C", "A,B,C", "B", "A,C"], "A,B,B,C", "UNION ALL keeps the repeated B."],
    ["A={A,B}, B={B,C}. INTERSECT?", ["B", "A,C", "A,B,C", "A"], "B", "B is common to both."],
    ["A={A,B}, B={B,C}. EXCEPT?", ["A", "B", "C", "A,B,C"], "A", "A occurs only in the first set."],
    ["If two queries return identical rows, UNION produces:", ["One copy", "Two copies", "No rows", "An error always"], "One copy", "UNION removes duplicates."],
    ["If two queries return identical rows, UNION ALL produces:", ["Two copies", "One copy", "No rows", "Only the second copy"], "Two copies", "UNION ALL keeps both rows."],
    ["Which operation is symmetric in its common-row meaning?", ["INTERSECT", "EXCEPT", "UNION", "MINUS"], "INTERSECT", "INTERSECT gives the common result regardless of query order."],
    ["What changes when EXCEPT query order is reversed?", ["The difference can change", "Nothing ever changes", "It becomes UNION ALL", "It always becomes empty"], "The difference can change", "Set difference depends on which query comes first."],
  ],
  "Window Functions": [
    ["Which function gives a unique row sequence?", ["ROW_NUMBER()", "RANK()", "AVG()", "LAG()"], "ROW_NUMBER()", "ROW_NUMBER gives each row a unique number."],
    ["Which function can leave gaps after ties?", ["RANK()", "DENSE_RANK()", "LEAD()", "AVG()"], "RANK()", "RANK leaves gaps after ties."],
    ["Which ranking function has no gaps after ties?", ["DENSE_RANK()", "RANK()", "LAG()", "SUM()"], "DENSE_RANK()", "DENSE_RANK continues without gaps."],
    ["Which function accesses the previous row?", ["LAG()", "LEAD()", "RANK()", "ROW_NUMBER()"], "LAG()", "LAG looks backward."],
    ["Which function accesses the next row?", ["LEAD()", "LAG()", "RANK()", "ROW_NUMBER()"], "LEAD()", "LEAD looks forward."],
    ["Which keyword creates groups inside OVER()?", ["PARTITION BY", "GROUP BY", "HAVING", "UNION"], "PARTITION BY", "PARTITION BY creates separate windows."],
    ["Which keyword controls ordering inside OVER()?", ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], "ORDER BY", "ORDER BY defines window order."],
    ["Which expression creates a running total?", ["SUM(CGPA) OVER(ORDER BY SID)", "SUM(CGPA)", "COUNT(*)", "RANK()"], "SUM(CGPA) OVER(ORDER BY SID)", "An ordered SUM window creates a cumulative total."],
    ["Which expression calculates a department average beside every student?", ["AVG(CGPA) OVER(PARTITION BY Department)", "AVG(CGPA) GROUP BY Department", "AVG(Department)", "COUNT(CGPA)"], "AVG(CGPA) OVER(PARTITION BY Department)", "The window preserves student rows."],
    ["What is the first LAG value normally?", ["NULL", "0", "The same row", "The last row"], "NULL", "There is no previous row for the first ordered row."],
    ["What is the last LEAD value normally?", ["NULL", "0", "The first row", "The same row"], "NULL", "There is no following row for the last ordered row."],
    ["For 100,100,90, RANK gives:", ["1,1,3", "1,1,2", "1,2,3", "2,2,1"], "1,1,3", "RANK leaves a gap."],
    ["For 100,100,90, DENSE_RANK gives:", ["1,1,2", "1,1,3", "1,2,3", "2,2,1"], "1,1,2", "DENSE_RANK has no gap."],
    ["What does PARTITION BY Department do?", ["Restarts the window calculation per department", "Sorts the whole table only", "Deletes departments", "Creates a new table"], "Restarts the window calculation per department", "Each department becomes an independent partition."],
    ["Why can window functions be used instead of GROUP BY?", ["They retain detail rows", "They always remove rows", "They only sort", "They cannot aggregate"], "They retain detail rows", "Window functions calculate without collapsing the result."],
    ["Which query ranks highest CGPA first within each department?", ["RANK() OVER(PARTITION BY Department ORDER BY CGPA DESC)", "RANK() OVER(ORDER BY Department)", "RANK(CGPA)", "RANK() GROUP BY Department"], "RANK() OVER(PARTITION BY Department ORDER BY CGPA DESC)", "Partition separates departments and DESC puts highest first."],
    ["Which expression gets the previous CGPA by SID?", ["LAG(CGPA) OVER(ORDER BY SID)", "LEAD(CGPA) OVER(ORDER BY SID)", "AVG(CGPA)", "RANK(CGPA)"], "LAG(CGPA) OVER(ORDER BY SID)", "LAG accesses the previous ordered value."],
    ["Which expression gets the next CGPA by SID?", ["LEAD(CGPA) OVER(ORDER BY SID)", "LAG(CGPA) OVER(ORDER BY SID)", "AVG(CGPA)", "RANK(CGPA)"], "LEAD(CGPA) OVER(ORDER BY SID)", "LEAD accesses the next ordered value."],
    ["Which function can identify the top 3 rows per department when filtered?", ["ROW_NUMBER() OVER(PARTITION BY Department ORDER BY CGPA DESC)", "AVG(CGPA)", "COUNT(*)", "UNION"], "ROW_NUMBER() OVER(PARTITION BY Department ORDER BY CGPA DESC)", "Partitioned row numbering can be filtered for the top rows."],
    ["What does OVER() allow an aggregate to do?", ["Operate across a window of related rows", "Create a database", "Delete duplicates", "Rename a table"], "Operate across a window of related rows", "OVER turns supported aggregates into window calculations."],
  ],
};

function buildSupplementalQuestions() {
  const result = {};

  Object.entries(supplementalQuestions).forEach(([category, items]) => {
    result[category] = items.map(([question, options, answer, explanation], index) => ({
      type:
        category === "Fill in SQL"
          ? "Fill in the SQL"
          : category === "SQL Output"
            ? "Output Prediction"
            : category === "Set Operations"
              ? "Set Operation"
              : category === "Window Functions"
                ? "Window Function"
                : category === "Debugging"
                  ? "Debugging"
                  : "Concept",
      question,
      options,
      answer,
      explanation,
      supplementalId: `${category}-${index}`,
    }));
  });

  return result;
}

const generatedQuestions = buildSupplementalQuestions();

function getQuestionCategory(question) {
  const combined = [
    question.type || "",
    question.question || "",
    question.code || "",
    ...(question.options || []),
  ]
    .join(" ")
    .toUpperCase();

  if (question.type === "Fill in the SQL") return "Fill in SQL";
  if (question.type === "Debugging") return "Debugging";
  if (question.type === "Output Prediction") return "SQL Output";

  if (
    question.type === "Set Operation" ||
    /\b(UNION|UNION ALL|INTERSECT|EXCEPT|MINUS)\b/.test(combined)
  ) {
    return "Set Operations";
  }

  if (
    /\b(ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|OVER|PARTITION BY|WINDOW FUNCTION|RUNNING TOTAL)\b/.test(
      combined
    )
  ) {
    return "Window Functions";
  }

  return "Concept";
}

function Quiz({ addToHistory }) {
  const [difficulty, setDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionType, setQuestionType] = useState("Mixed");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getAvailableQuestions = () => {
    if (!difficulty) return [];

    if (questionType === "Mixed") {
      return questionBank[difficulty];
    }

    const originalQuestions = questionBank[difficulty].filter(
      (question) => getQuestionCategory(question) === questionType
    );

    const extraQuestions = generatedQuestions[questionType] || [];

    // Keep the original questions first, then add the expanded pool.
    // This gives every question type enough questions for 5 / 10 / 15 / 20.
    return [...originalQuestions, ...extraQuestions];
  };

  const startQuiz = () => {
    const availableQuestions = getAvailableQuestions();

    if (availableQuestions.length === 0) return;

    const selectedQuestions = shuffle(availableQuestions).slice(0, questionCount);

    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setAnswerHistory([]);
    setQuizStarted(true);
  };

  const selectAnswer = (option) => {
    if (answered) return;

    const question = questions[currentQuestion];
    const isCorrect = option === question.answer;

    setSelectedAnswer(option);
    setAnswered(true);

    if (isCorrect) {
      setScore((previous) => previous + 1);
    }

    setAnswerHistory((previous) => [
      ...previous,
      {
        question: question.question,
        type: getQuestionCategory(question),
        selectedAnswer: option,
        correctAnswer: question.answer,
        isCorrect,
        explanation: question.explanation,
      },
    ]);
  };

  const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer("");
    setAnswered(false);
  } else {
    setFinished(true);

    if (addToHistory) {
      addToHistory(
        "Quiz",
        `${difficulty} - ${questionType} - Score: ${score + (selectedAnswer === questions[currentQuestion].answer ? 1 : 0)}/${questions.length}`
      );
    }
  }
};

  const changeDifficulty = (level) => {
    setDifficulty(level);
    setQuizStarted(false);
    setFinished(false);
    setQuestions([]);
    setAnswerHistory([]);
  };

  const backToSetup = () => {
    setQuizStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswered(false);
    setAnswerHistory([]);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswered(false);
    setAnswerHistory([]);
  };

  const typeCards = [
    {
      name: "Mixed",
      icon: "🎯",
      desc: "All question types",
    },
    {
      name: "Concept",
      icon: "🧠",
      desc: "DBMS concepts & scenarios",
    },
    {
      name: "SQL Output",
      icon: "💻",
      desc: "Predict query results",
    },
    {
      name: "Fill in SQL",
      icon: "✍️",
      desc: "Complete SQL queries",
    },
    {
      name: "Debugging",
      icon: "🐛",
      desc: "Find SQL mistakes",
    },
    {
      name: "Set Operations",
      icon: "🔀",
      desc: "UNION, INTERSECT, EXCEPT",
    },
    {
      name: "Window Functions",
      icon: "📊",
      desc: "RANK, LAG, LEAD & more",
    },
  ];

  /* START / SETUP SCREEN */

  if (!quizStarted) {
    const availableCount = getAvailableQuestions().length;

    return (
      <section className="quiz-page">
        <div className="quiz-header">
          <h2>DBMS Practice Quiz</h2>
          <p>Practice SQL, Set Operations and Window Functions.</p>
        </div>

        <div className="quiz-setup-card">
          <h3>Choose Difficulty</h3>

          <div className="difficulty-tabs">
            {["Easy", "Medium", "Hard"].map((level) => (
              <button
                key={level}
                className={difficulty === level ? "selected" : ""}
                onClick={() => changeDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>

          {difficulty ? (
            <>
              <div className="question-type-section">
                <h3>Choose Question Type</h3>
                <p>Select the type of questions you want to practice.</p>

                <div className="question-type-grid">
                  {typeCards.map((type) => (
                    <button
                      key={type.name}
                      className={`question-type-card ${
                        questionType === type.name ? "type-selected" : ""
                      }`}
                      onClick={() => setQuestionType(type.name)}
                    >
                      <span className="question-type-icon">{type.icon}</span>

                      <span className="question-type-content">
                        <strong>{type.name}</strong>
                        <small>{type.desc}</small>
                      </span>

                      {questionType === type.name && (
                        <span className="type-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="question-count-title">
                How many questions do you want to attempt?
              </h3>

              <div className="question-count-options">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    className={
                      questionCount === count ? "count-selected" : ""
                    }
                    onClick={() => setQuestionCount(count)}
                    disabled={availableCount === 0}
                  >
                    {count}
                  </button>
                ))}
              </div>

              <p className="question-info">
                {questionCount} questions will be selected from the{" "}
                <strong>{questionType}</strong> practice pool.
              </p>

              {availableCount === 0 ? (
                <p className="choose-difficulty-message">
                  No questions are available for this combination yet.
                </p>
              ) : (
                <button className="start-quiz-button" onClick={startQuiz}>
                  Start Quiz →
                </button>
              )}
            </>
          ) : (
            <p className="choose-difficulty-message">
              Select a difficulty level to continue.
            </p>
          )}
        </div>
      </section>
    );
  }

  /* RESULT SCREEN */
  /* RESULT SCREEN */

if (finished) {
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <section className="quiz-page">
      <div className="quiz-result">
        <div className="result-circle">{percentage}%</div>

        <h2>Quiz Completed!</h2>

        <p>
          You scored <strong>{score}</strong> out of{" "}
          <strong>{questions.length}</strong>
        </p>

        <p>
          Difficulty: <strong>{difficulty}</strong>
        </p>

        <p>
          Type: <strong>{questionType}</strong>
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
        <div className="result-actions">
          <button
            className="quiz-back-button"
            onClick={restartQuiz}
          >
            <span>←</span>
            Back to Setup
          </button>
        </div>
      </div>
    </section>
  );
}

 
    
    




  /* QUESTION SCREEN */

  const question = questions[currentQuestion];
  const category = getQuestionCategory(question);

  const typeInstructions = {
    Concept: "Test your understanding of the DBMS concept.",
    "SQL Output": "Read the SQL and predict the result.",
    "Fill in SQL": "Choose the SQL keyword or function that completes the query.",
    Debugging: "Find the problem in the SQL statement.",
    "Set Operations": "Apply the correct set-operation rule.",
    "Window Functions": "Apply the correct window-function concept.",
  };

  return (
    <section className="quiz-page">
      <div className="quiz-header quiz-question-header">
        <div className="quiz-header-top">
          <button className="quiz-back-button" onClick={backToSetup}>
            <span>←</span> Back to Setup
          </button>

          <div className="quiz-header-badges">
            <span>{difficulty}</span>
            <span>{questionType}</span>
          </div>
        </div>

        <h2>DBMS Practice Quiz</h2>
        <p>{questions.length} Questions</p>
      </div>

      <div className="quiz-card">
        <div className="quiz-top">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>Score: {score}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="question-type-row">
          <div className="question-type">{category}</div>
          <span className="question-type-instruction">
            {typeInstructions[category]}
          </span>
        </div>

        <h2 className="quiz-question">{question.question}</h2>

        {question.code && (
          <pre className="quiz-code">
            <code>{question.code}</code>
          </pre>
        )}

        <div className="quiz-options">
          {question.options.map((option, index) => {
            let className = "quiz-option";

            if (answered) {
              if (option === question.answer) {
                className += " correct";
              } else if (option === selectedAnswer) {
                className += " incorrect";
              }
            }

            return (
              <button
                key={`${option}-${index}`}
                className={className}
                onClick={() => selectAnswer(option)}
                disabled={answered}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={
              selectedAnswer === question.answer
                ? "answer-feedback correct-feedback"
                : "answer-feedback incorrect-feedback"
            }
          >
            <strong>
              {selectedAnswer === question.answer
                ? "✓ Correct!"
                : "✗ Incorrect"}
            </strong>

            {selectedAnswer !== question.answer && (
              <p>
                <strong>Correct answer:</strong> {question.answer}
              </p>
            )}

            <p>{question.explanation}</p>
          </div>
        )}

        {answered && (
          <button className="next-question" onClick={nextQuestion}>
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question →"}
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;
