import { useState } from "react";
import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

function SQLPlayground({
  uploadedDatabase,
  schemaTables = [],
  onNavigate,
  addToHistory,
}) {
  const [query, setQuery] = useState(
    "SELECT * FROM students;"
  );

  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const sampleData = [
    {
      SID: 101,
      SName: "Arun",
      Department: "CSE",
      CGPA: 8.5,
      City: "Chennai",
    },
    {
      SID: 102,
      SName: "Meena",
      Department: "IT",
      CGPA: 9.1,
      City: "Madurai",
    },
    {
      SID: 103,
      SName: "Ravi",
      Department: "CSE",
      CGPA: 7.8,
      City: "Coimbatore",
    },
    {
      SID: 104,
      SName: "Priya",
      Department: "ECE",
      CGPA: 8.9,
      City: "Chennai",
    },
    {
      SID: 105,
      SName: "Karthik",
      Department: "CSE",
      CGPA: 7.5,
      City: "Salem",
    },
  ];

  const executeQuery = async () => {
  setError("");
  setMessage("");
  setResult([]);
  setColumns([]);

  try {
    const SQL = await initSqlJs({
      locateFile: () => wasmUrl,
    });

    const db = new SQL.Database();

    // Default students table
    db.run(`
      CREATE TABLE students (
        SID INTEGER,
        SName TEXT,
        Department TEXT,
        CGPA REAL,
        City TEXT
      );
    `);

    sampleData.forEach((row) => {
      db.run(
        `
        INSERT INTO students
        (SID, SName, Department, CGPA, City)
        VALUES (?, ?, ?, ?, ?);
        `,
        [
          row.SID,
          row.SName,
          row.Department,
          row.CGPA,
          row.City,
        ]
      );
    });

    // Create all Schema Builder tables
    schemaTables.forEach((table) => {
      if (!table.name || !table.columns?.length) {
        return;
      }

      const safeTableName = table.name
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "");

      if (!safeTableName) return;

      // Don't create students twice
      if (safeTableName.toLowerCase() === "students") {
        return;
      }

      const columnDefinitions = table.columns.map(
        (column) => {
          const safeColumnName = column.name
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9_]/g, "");

          return `"${safeColumnName}" ${column.type}`;
        }
      );

      db.run(`
        CREATE TABLE "${safeTableName}" (
          ${columnDefinitions.join(",\n")}
        );
      `);
    });

    // Load uploaded dataset table
    if (uploadedDatabase?.tableName) {
      const uploadedTableName =
        uploadedDatabase.tableName
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_]/g, "");

      if (
        uploadedTableName &&
        uploadedDatabase.columns?.length &&
        uploadedTableName.toLowerCase() !== "students"
      ) {
        const uploadedColumns =
          uploadedDatabase.columns.map(
            (column) =>
              column
                .trim()
                .replace(/\s+/g, "_")
                .replace(/[^a-zA-Z0-9_]/g, "")
          );

        const columnDefinitions =
          uploadedColumns.map(
            (column, index) => {
              const sampleValue =
                uploadedDatabase.rows?.[0]?.[
                  uploadedDatabase.columns[index]
                ];

              let type = "TEXT";

              if (
                typeof sampleValue === "number"
              ) {
                type = Number.isInteger(
                  sampleValue
                )
                  ? "INTEGER"
                  : "REAL";
              }

              return `"${column}" ${type}`;
            }
          );

        const alreadyExists =
          schemaTables.some(
            (table) =>
              table.name ===
              uploadedDatabase.tableName
          );

        if (!alreadyExists) {
          db.run(`
            CREATE TABLE "${uploadedTableName}" (
              ${columnDefinitions.join(",\n")}
            );
          `);
        }

        if (!alreadyExists) {
          uploadedDatabase.rows?.forEach(
            (row) => {
              const values =
                uploadedDatabase.columns.map(
                  (column) => row[column]
                );

              const placeholders =
                values
                  .map(() => "?")
                  .join(", ");

              db.run(
                `
                INSERT INTO "${uploadedTableName}"
                VALUES (${placeholders});
                `,
                values
              );
            }
          );
        }
      }
    }

    // Execute the user's SQL exactly as written
    const results = db.exec(query);

    if (results.length === 0) {
      setMessage(
        "Query executed successfully."
      );
      return;
    }

    setColumns(results[0].columns);
    setResult(results[0].values);

    setMessage(
      "Query executed successfully."
    );
    addToHistory(
  "SQL Playground",
  query.trim()
);
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <section className="playground-page">
      <button
  className="back-to-dataset-btn"
  onClick={() => onNavigate("Data & Schema Studio")}
>
  ← Back to Data & Schema Studio
</button>
      <div className="page-heading">
        <span className="eyebrow dark">
          SQL PLAYGROUND
        </span>

        <h2>Write & Execute SQL</h2>

        <p>
          Practice SQL queries using an interactive
          database.
        </p>
        {uploadedDatabase && (
  <div className="active-dataset-badge">
    <span>●</span>
    Using table: <strong>{uploadedDatabase.tableName}</strong>
  </div>
)}
      </div>

      <div className="playground-card">
        <div className="editor-header">
  <div className="editor-title">
    <span>SQL Editor</span>
    <small>SQLite • Interactive</small>
  </div>

  <div className="editor-actions">
    <button
      className="clear-query-btn"
      onClick={() => {
        setQuery("");
        setResult([]);
        setColumns([]);
        setError("");
        setMessage("");
      }}
    >
      Clear
    </button>

    <button
      className="reset-query-btn"
      onClick={() => {
        setQuery("SELECT * FROM students;");
        setResult([]);
        setColumns([]);
        setError("");
        setMessage("");
      }}
    >
      Reset
    </button>

    <button
      className="run-query-btn"
      onClick={executeQuery}
    >
      ▶ Run Query
    </button>
  </div>
</div>
        

        <div className="sql-editor">
  <div className="line-numbers">
    {query.split("\n").map((_, index) => (
      <span key={index}>{index + 1}</span>
    ))}
  </div>

  <textarea
    value={query}
    onChange={(event) =>
      setQuery(event.target.value)
    }
    placeholder="Write your SQL query here..."
    spellCheck="false"
  />
</div>

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
            <h3>Query Result</h3>

            <p>
              {result.length} rows returned
            </p>
          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>
                      {column}
                    </th>
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

export default SQLPlayground;