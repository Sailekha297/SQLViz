import { useState } from "react";
import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

function SetOperations({ addToHistory }) {
  const [operation, setOperation] = useState("UNION");
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tableA, setTableA] = useState([
  ["Arun", "CSE"],
  ["Meena", "IT"],
  ["Ravi", "CSE"],
  ["Priya", "ECE"],
]);

const [tableB, setTableB] = useState([
  ["Meena", "IT"],
  ["Ravi", "CSE"],
  ["Karthik", "CSE"],
  ["Divya", "EEE"],
]);
const resetTables = () => {
  setTableA([
    ["Arun", "CSE"],
    ["Meena", "IT"],
    ["Ravi", "CSE"],
    ["Priya", "ECE"],
  ]);

  setTableB([
    ["Meena", "IT"],
    ["Ravi", "CSE"],
    ["Karthik", "CSE"],
    ["Divya", "EEE"],
  ]);
};
  const operations = [
    {
      name: "UNION",
      description: "Combines results from both tables and removes duplicates.",
      query: `
SELECT Name, Department FROM students_a
UNION
SELECT Name, Department FROM students_b;
      `,
    },
    {
      name: "UNION ALL",
      description: "Combines results from both tables and keeps duplicates.",
      query: `
SELECT Name, Department FROM students_a
UNION ALL
SELECT Name, Department FROM students_b;
      `,
    },
    {
      name: "INTERSECT",
      description: "Returns only rows that exist in both tables.",
      query: `
SELECT Name, Department FROM students_a
INTERSECT
SELECT Name, Department FROM students_b;
      `,
    },
    {
      name: "EXCEPT",
      description:
        "Returns rows from the first table that are not present in the second table.",
      query: `
SELECT Name, Department FROM students_a
EXCEPT
SELECT Name, Department FROM students_b;
      `,
    },
  ];

  const selectedOperation = operations.find(
    (item) => item.name === operation
  );
  const resultSummary = {
  UNION: `${result.length} unique rows`,
  "UNION ALL": `${result.length} rows including duplicates`,
  INTERSECT: `${result.length} common rows`,
  EXCEPT: `${result.length} rows from Table A only`,
};
  const getRowStatus = (name, department) => {
  const inA = tableA.some(
    ([n, d]) => n === name && d === department
  );

  const inB = tableB.some(
    ([n, d]) => n === name && d === department
  );

  // INTERSECT
  // Highlight ONLY rows that exist in BOTH tables
  if (operation === "INTERSECT") {
    return inA && inB ? "highlight-common" : "muted-row";
  }

  // EXCEPT
  // Highlight ONLY rows from Table A that do NOT exist in Table B
  if (operation === "EXCEPT") {
    return inA && !inB ? "highlight-result" : "muted-row";
  }

  // UNION
  // Highlight every row because every row from both tables
  // participates in the result (duplicates are removed in result)
  if (operation === "UNION") {
    return "highlight-result";
  }

  // UNION ALL
  // Highlight every row because every row from both tables
  // participates in the result
  if (operation === "UNION ALL") {
    return "highlight-result";
  }

  return "";
};

  

  const executeOperation = async () => {
  setError("");
  setMessage("");
  setResult([]);
  setColumns([]);

  try {
    const SQL = await initSqlJs({
      locateFile: () => wasmUrl,
    });

    const db = new SQL.Database();

    // Create Table A
    db.run(`
      CREATE TABLE students_a (
        Name TEXT,
        Department TEXT
      )
    `);

    // Create Table B
    db.run(`
      CREATE TABLE students_b (
        Name TEXT,
        Department TEXT
      )
    `);

    // Insert Table A rows
    tableA.forEach(([name, department]) => {
      db.run(
        `INSERT INTO students_a (Name, Department) VALUES (?, ?)`,
        [name, department]
      );
    });

    // Insert Table B rows
    tableB.forEach(([name, department]) => {
      db.run(
        `INSERT INTO students_b (Name, Department) VALUES (?, ?)`,
        [name, department]
      );
    });

    // Execute selected set operation
    const results = db.exec(selectedOperation.query);

    if (results.length === 0) {
      setMessage("Operation executed successfully.");
      return;
    }

    setColumns(results[0].columns);
    setResult(results[0].values);

    setMessage(`${operation} executed successfully.`);
    addToHistory(
  "Set Operations",
  `${operation} - ${result.length} rows returned`
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
    <section className="setops-page">

      <div className="page-heading">
        <span className="eyebrow dark">SET OPERATIONS</span>
        <h2>Compare & Combine SQL Tables</h2>
        <p>
          Learn how SQL Set Operations combine or compare the results of
          multiple queries.
        </p>
      </div>

      <div className="operation-tabs">
        {operations.map((item) => (
          <button
            key={item.name}
            className={operation === item.name ? "selected" : ""}
            onClick={() => {
              setOperation(item.name);
              setResult([]);
              setMessage("");
              setError("");
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="operation-flow">
  <div className="flow-card">
    <span>TABLE A</span>
    <strong>Students A</strong>
  </div>

  <div className="flow-symbol">
    {operation === "INTERSECT"
      ? "∩"
      : operation === "EXCEPT"
      ? "−"
      : "∪"}
  </div>

  <div className="flow-card">
    <span>TABLE B</span>
    <strong>Students B</strong>
  </div>

  <div className="flow-arrow">→</div>

  <div className="flow-result">
    <span>RESULT</span>
    <strong>{operation}</strong>
  </div>
</div>
      <div className="operation-info">
  <div>
    <span className="operation-label">{operation}</span>

    <h3>{selectedOperation.name}</h3>

    <p>{selectedOperation.description}</p>

    <div className="operation-explanation">
      {operation === "UNION" && (
        <span>
          Combines rows from both tables and removes duplicate rows.
        </span>
      )}

      {operation === "UNION ALL" && (
        <span>
          Combines rows from both tables and keeps duplicate rows.
        </span>
      )}

      {operation === "INTERSECT" && (
        <span>
          Finds the common rows between two query results.
        </span>
      )}

      {operation === "EXCEPT" && (
        <span>
          Returns rows present in Table A but not in Table B.
        </span>
      )}
    </div>
  </div>
</div>

      <div className="tables-comparison">

        <div className="sample-table-card">
          <div className="table-card-header">
            <div>
              <span>TABLE A</span>
              <button
  className="add-row-btn"
  onClick={() =>
    setTableA([...tableA, ["New Student", "CSE"]])
  }
>
  + Add Row
</button>
<button
  className="reset-row-btn"
  onClick={resetTables}
>
  ↻ Reset Data
</button>
              <h3>students_a</h3>
            </div>
          </div>

          <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Department</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
  {tableA.map((row, index) => (
    <tr
  key={index}
  className={getRowStatus(row[0], row[1])}
>
      <td>
        <input
          value={row[0]}
          onChange={(e) => {
            const updated = [...tableA];
            updated[index][0] = e.target.value;
            setTableA(updated);
          }}
        />
      </td>

      <td>
        <input
          value={row[1]}
          onChange={(e) => {
            const updated = [...tableA];
            updated[index][1] = e.target.value;
            setTableA(updated);
          }}
        />
      </td>

      <td>
        <button
          className="delete-row-btn"
          onClick={() => {
            const updated = tableA.filter(
              (_, i) => i !== index
            );
            setTableA(updated);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>
        </div>

        <div className="operation-symbol">
  <span>
    {operation === "UNION" && "∪"}
    {operation === "UNION ALL" && "∪+"}
    {operation === "INTERSECT" && "∩"}
    {operation === "EXCEPT" && "−"}
  </span>

  <small>{operation}</small>
</div>

        <div className="sample-table-card">
  <div className="table-card-header">
    <div>
      <span>TABLE B</span>

      <button
        className="add-row-btn"
        onClick={() =>
          setTableB([...tableB, ["New Student", "CSE"]])
        }
      >
        + Add Row
      </button>
      <button
  className="reset-row-btn"
  onClick={resetTables}
>
  ↻ Reset Data
</button>

      <h3>students_b</h3>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
  {tableB.map((row, index) => (
    <tr
  key={index}
  className={getRowStatus(row[0], row[1])}
>
      <td>
        <input
          value={row[0]}
          onChange={(e) => {
            const updated = [...tableB];
            updated[index][0] = e.target.value;
            setTableB(updated);
          }}
        />
      </td>

      <td>
        <input
          value={row[1]}
          onChange={(e) => {
            const updated = [...tableB];
            updated[index][1] = e.target.value;
            setTableB(updated);
          }}
        />
      </td>

      <td>
        <button
          className="delete-row-btn"
          onClick={() => {
            const updated = tableB.filter(
              (_, i) => i !== index
            );
            setTableB(updated);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
</div>

      </div>

        <div className="operation-legend">
  <span>
    <i className="legend-dot"></i>

    {operation === "INTERSECT" && "Common row"}

    {operation === "EXCEPT" && "Table A only"}

    {(operation === "UNION" || operation === "UNION ALL") &&
      "Included row"}
  </span>

  <span>
    {operation === "INTERSECT" &&
      "Rows found in both tables are highlighted"}

    {operation === "EXCEPT" &&
      "Rows in Table A that are not in Table B are highlighted"}

    {operation === "UNION" &&
      "All rows from both tables are included; duplicates are removed"}

    {operation === "UNION ALL" &&
      "All rows from both tables are included, including duplicates"}
  </span>
</div>
      <div className="operation-summary">
  <div className="summary-icon">
    {operation === "INTERSECT" ? "∩" : operation === "EXCEPT" ? "−" : "∪"}
  </div>
  <div className="operation-reason">
  <span>WHY THIS RESULT?</span>

  <p>
    {operation === "UNION" &&
      "The rows from both tables are combined, and duplicate rows are removed."}

    {operation === "UNION ALL" &&
      "The rows from both tables are combined, and duplicate rows are preserved."}

    {operation === "INTERSECT" &&
      "Only rows that appear in both Table A and Table B are returned."}

    {operation === "EXCEPT" &&
      "Only rows that appear in Table A but not in Table B are returned."}
  </p>
</div>
  <div className="summary-content">
    <span>OPERATION RESULT</span>

    <strong>{resultSummary[operation]}</strong>
  </div>
</div>

      <div className="query-box">
        <div className="query-header">
          <span>SQL QUERY</span>

          <button onClick={executeOperation}>
            ▶ Run Operation
          </button>
        </div>

        <pre>{selectedOperation.query.trim()}</pre>
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
              <h3>Result</h3>
              <p>{result.length} rows returned</p>
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
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {result.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, columnIndex) => (
                      <td key={columnIndex}>
                        {String(value ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </section>
  );
}

export default SetOperations;