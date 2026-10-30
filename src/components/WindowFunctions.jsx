import { useState } from "react";
import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

function WindowFunctions({ addToHistory }) {
  const [operation, setOperation] = useState("ROW_NUMBER");
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const functions = [
    {
      name: "ROW_NUMBER",
      description: "Assigns a unique sequential number to each row.",
      query: `
SELECT
  Name,
  Department,
  CGPA,
  ROW_NUMBER() OVER (ORDER BY CGPA DESC) AS Row_Number
FROM students;
      `,
    },
    {
      name: "RANK",
      description: "Assigns ranks. Tied values receive the same rank.",
      query: `
SELECT
  Name,
  Department,
  CGPA,
  RANK() OVER (ORDER BY CGPA DESC) AS Rank
FROM students;
      `,
    },
    {
      name: "DENSE_RANK",
      description: "Ranks rows without leaving gaps after tied values.",
      query: `
SELECT
  Name,
  Department,
  CGPA,
  DENSE_RANK() OVER (ORDER BY CGPA DESC) AS Dense_Rank
FROM students;
`,
    },
    {
      name: "LAG",
      description: "Accesses a value from a previous row.",
      query: `
SELECT
  Name,
  CGPA,
  LAG(CGPA) OVER (ORDER BY CGPA DESC) AS Previous_CGPA
FROM students;
      `,
    },
    {
      name: "LEAD",
      description: "Accesses a value from the next row.",
      query: `
SELECT
  Name,
  CGPA,
  LEAD(CGPA) OVER (ORDER BY CGPA DESC) AS Next_CGPA
FROM students;
      `,
    },
    {
      name: "SUM OVER",
      description: "Calculates a running total using a window.",
      query: `
SELECT
  Name,
  CGPA,
  SUM(CGPA) OVER (
    ORDER BY SID
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS Running_Total
FROM students;
      `,
    },
        {
      name: "AVG OVER",
      description: "Calculates an average across the selected window.",
      query: `
SELECT
  Name,
  Department,
  CGPA,
  ROUND(
    AVG(CGPA) OVER (PARTITION BY Department),
    2
  ) AS Department_Average
FROM students;
      `,
    },

    {
      name: "SUM BY DEPARTMENT",
      description: "Calculates a running total separately for each department.",
      query: `
SELECT
  Name,
  Department,
  CGPA,
  SUM(CGPA) OVER (
    PARTITION BY Department
    ORDER BY CGPA DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS Department_Running_Total
FROM students
ORDER BY Department, CGPA DESC;
      `,
    },
    {
      name: "FIRST_VALUE",
      description: "Returns the first value in the selected window.",
      query: `
SELECT
  Name,
  Department,
  CGPA,
  FIRST_VALUE(CGPA) OVER (
    ORDER BY CGPA DESC
  ) AS Highest_CGPA
FROM students;
      `,
    },
    {
  name: "LAST_VALUE",
  description: "Returns the last value in the selected window.",
  query: `
SELECT
  Name,
  Department,
  CGPA,
  LAST_VALUE(CGPA) OVER (
    ORDER BY CGPA DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS Lowest_CGPA
FROM students;
      `,
},
  ];

  const selectedFunction = functions.find(
    (item) => item.name === operation
  );

  const executeFunction = async () => {
    setError("");
    setMessage("");
    setResult([]);
    setColumns([]);

    try {
      const SQL = await initSqlJs({
        locateFile: () => wasmUrl,
      });

      const db = new SQL.Database();

      db.run(`
        CREATE TABLE students (
          SID INTEGER,
          Name TEXT,
          Department TEXT,
          CGPA REAL
        );

        INSERT INTO students VALUES
        (101, 'Arun', 'CSE', 8.5),
        (102, 'Meena', 'IT', 9.1),
        (103, 'Ravi', 'CSE', 7.8),
        (104, 'Priya', 'ECE', 8.9),
        (105, 'Karthik', 'CSE', 7.5),
        (106, 'Divya', 'EEE', 7.5);
      `);

      const results = db.exec(selectedFunction.query);

      if (results.length === 0) {
        setMessage("Query executed successfully.");
        return;
      }

      setColumns(results[0].columns);
setResult(results[0].values);
setMessage(`${operation} executed successfully.`);

addToHistory(
  "Window Functions",
  `${operation} - ${results[0].values.length} rows returned`
);
    } catch (err) {
      setError(err.message);
    }
  };
  const downloadResult = () => {
  if (result.length === 0) return;

  const csvRows = [
    columns.join(","),
    ...result.map((row) =>
      row
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${operation.toLowerCase().replace(/\s+/g, "_")}_result.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
  return (
    <section className="window-page">

      <div className="page-heading">
        <span className="eyebrow dark">
          WINDOW FUNCTIONS
        </span>

        <h2>Analyze Rows Without Losing Data</h2>

        <p>
          Explore ranking, navigation and aggregate window functions
          using an interactive SQL dataset.
        </p>
      </div>

      <div className="window-layout">

        <aside className="function-menu">
          <div className="menu-title">
            <span>FUNCTIONS</span>
            <h3>Choose a Function</h3>
          </div>

          {functions.map((item) => (
            <button
              key={item.name}
              className={
                operation === item.name
                  ? "function-item active"
                  : "function-item"
              }
              onClick={() => {
                setOperation(item.name);
                setResult([]);
                setMessage("");
                setError("");
              }}
            >
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </aside>

        <main className="window-content">

          <div className="window-info">
  <span className="operation-label">
    SELECTED FUNCTION
  </span>

  <h3>{selectedFunction.name}</h3>

  <p>{selectedFunction.description}</p>

  <div className="window-explanation">
    {operation === "ROW_NUMBER" && (
      <span>
        Gives every row a unique number based on the selected order.
      </span>
    )}

    {operation === "RANK" && (
      <span>
        Gives the same rank to tied values and skips the next rank.
      </span>
    )}

    {operation === "DENSE_RANK" && (
      <span>
        Gives the same rank to tied values without skipping ranks.
      </span>
    )}

    {operation === "LAG" && (
      <span>
        Looks at the value from the previous row.
      </span>
    )}

    {operation === "LEAD" && (
      <span>
        Looks at the value from the next row.
      </span>
    )}

    {operation === "SUM OVER" && (
      <span>
        Calculates a running total while keeping every individual row.
      </span>
    )}

    {operation === "AVG OVER" && (
      <span>
        Calculates the average within each department without combining the rows.
      </span>
    )}
    {operation === "SUM BY DEPARTMENT" && (
  <span>
    The rows are divided into separate department groups, and the running total is calculated independently inside each group.
  </span>
)}
{operation === "FIRST_VALUE" && (
  <span>
    Shows the first CGPA in the selected window, which is the highest CGPA when the rows are ordered from highest to lowest.
  </span>
)}
{operation === "LAST_VALUE" && (
  <span>
    Shows the last CGPA in the selected window, which is the lowest CGPA when the rows are ordered from highest to lowest.
  </span>
)}
  </div>
</div>
          <div className="window-action-hint">
  <span>HOW IT WORKS</span>

  <strong>
    {operation === "ROW_NUMBER" &&
      "Rows are numbered from highest CGPA to lowest CGPA."}

    {operation === "RANK" &&
      "Rows with the same CGPA receive the same rank."}

    {operation === "DENSE_RANK" &&
      "Tied CGPA values share a rank without gaps."}

    {operation === "LAG" &&
      "Each row can access the CGPA from the previous row."}

    {operation === "LEAD" &&
      "Each row can access the CGPA from the next row."}

    {operation === "SUM OVER" &&
      "A running CGPA total is calculated row by row."}

    {operation === "AVG OVER" &&
      "Each student is compared with the average CGPA of their department."}
    {operation === "SUM BY DEPARTMENT" &&
  "Each department gets its own running CGPA total."}
     {operation === "FIRST_VALUE" &&
  "The highest CGPA is available to every row through the window."}
      {operation === "LAST_VALUE" &&
  "The lowest CGPA is available as the last value in the selected window."}
  </strong>
</div>
          <div className="student-preview">
            <div className="preview-header">
              <div>
                <span>DATASET</span>
                <h3>students</h3>
              </div>

              <span className="row-count">
                6 rows
              </span>
            </div>

            <table>
              <thead>
                <tr>
                  <th>SID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>CGPA</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>101</td>
                  <td>Arun</td>
                  <td>CSE</td>
                  <td>8.5</td>
                </tr>

                <tr>
                  <td>102</td>
                  <td>Meena</td>
                  <td>IT</td>
                  <td>9.1</td>
                </tr>

                <tr>
                  <td>103</td>
                  <td>Ravi</td>
                  <td>CSE</td>
                  <td>7.8</td>
                </tr>

                <tr>
                  <td>104</td>
                  <td>Priya</td>
                  <td>ECE</td>
                  <td>8.9</td>
                </tr>

                <tr>
                  <td>105</td>
                  <td>Karthik</td>
                  <td>CSE</td>
                  <td>7.5</td>
                </tr>
                <tr>
  <td>106</td>
  <td>Divya</td>
  <td>EEE</td>
  <td>7.5</td>
</tr>
              </tbody>
            </table>
          </div>

          <div className="window-query">

            <div className="query-header">
              <span>SQL QUERY</span>

              <button onClick={executeFunction}>
                ▶ Run Function
              </button>
            </div>

            <pre>
              {selectedFunction.query.trim()}
            </pre>

          </div>

          {message && (
            <div className="success-message">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="query-error">
              ✕ {error}
            </div>
          )}

          {result.length > 0 && (
            <div className="dataset-section">

              <div className="section-header">
                <div>
                  <h3>Calculated Result</h3>
                  <p>
                    {result.length} rows returned
                  </p>
                </div>
                <button
    className="download-result-btn"
    onClick={downloadResult}
  >
    ↓ Download Result
  </button>
              </div>

              <div className="table-wrapper">
                <table>

                  <thead>
                    <tr>
                      {columns.map((column) => (
  <th
    key={column}
    className={
      column === "Row_Number" ||
      column === "Rank" ||
      column === "Dense_Rank" ||
      column === "Previous_CGPA" ||
      column === "Next_CGPA" ||
      column === "Running_Total" ||
      column === "Department_Average" ||
column === "Department_Running_Total"|| column === "Highest_CGPA"|| column === "Lowest_CGPA"
        ? "calculated-column"
        : ""
    }
  >
    {column}
  </th>
))}
                    </tr>
                  </thead>

                  <tbody>
                    {result.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((value, columnIndex) => (
                           <td
  key={columnIndex}
  className={
    columns[columnIndex] === "Row_Number" ||
    columns[columnIndex] === "Rank" ||
    columns[columnIndex] === "Dense_Rank" ||
    columns[columnIndex] === "Previous_CGPA" ||
    columns[columnIndex] === "Next_CGPA" ||
    columns[columnIndex] === "Running_Total" ||
    columns[columnIndex] === "Department_Average" ||
columns[columnIndex] === "Department_Running_Total"|| columns[columnIndex] === "Highest_CGPA"|| columns[columnIndex] === "Lowest_CGPA"
      ? "calculated-column"
      : ""
  }
>
  {String(value ?? "")}
</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>

                </table>
                            </div>

              <div className="window-result-insight">
                <span>RESULT INSIGHT</span>

                <strong>
                  {operation === "ROW_NUMBER" &&
                    "Each student receives a unique row number based on CGPA from highest to lowest."}

                  {operation === "RANK" &&
                    "Students with the same CGPA receive the same rank, and the next rank is skipped."}

                  {operation === "DENSE_RANK" &&
                    "Students with the same CGPA receive the same rank without leaving gaps."}

                  {operation === "LAG" &&
                    "Each row can see the CGPA value from the previous row."}

                  {operation === "LEAD" &&
                    "Each row can see the CGPA value from the next row."}

                  {operation === "SUM OVER" &&
                    "The Running_Total column shows the cumulative CGPA as rows are processed."}

                  {operation === "AVG OVER" &&
                    "Each student is shown together with the average CGPA of their department."}
                  {operation === "SUM BY DEPARTMENT" &&
  "The running total restarts for each department because PARTITION BY creates separate groups."}
                   {operation === "FIRST_VALUE" &&
  "Every row can see the highest CGPA from the selected window."}
                    {operation === "LAST_VALUE" &&
  "Every row can see the lowest CGPA from the selected window."}
                </strong>
              </div>

            </div>
          )}

        </main>
      </div>

    </section>
  );
}

export default WindowFunctions;