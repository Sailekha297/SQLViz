import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { createWorker } from "tesseract.js";

function DatasetManager({
  setUploadedDatabase,
  schemaTables,
  setSchemaTables,
  onNavigate,
}) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState("");
  const [tableName, setTableName] = useState("my_table");
  const [error, setError] = useState("");
  const [tableImage, setTableImage] = useState(null);
  const [imageAnalyzed, setImageAnalyzed] = useState(false);
  const [imageText, setImageText] = useState("");
  const [editingTableName, setEditingTableName] = useState(null);
  const [schemaTableName, setSchemaTableName] =
    useState("my_table");

  

  const [schemaColumns, setSchemaColumns] = useState([
    {
      name: "id",
      type: "INTEGER",
      primaryKey: true,
    },
  ]);

  const [relationships, setRelationships] = useState([]);
  const [studioView, setStudioView] = useState("home");

  const [relationshipForm, setRelationshipForm] = useState({
    tableA: "my_table",
    tableB: "my_table",
    type: "1:N",
    primaryKey: "my_table.id",
    foreignKey: "my_table.id",
  });

  /* =========================
     FILE UPLOAD
  ========================= */

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setError("");
    setFileName(file.name);

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    if (extension === "csv") {
      readCSV(file);
    } else if (
      extension === "xlsx" ||
      extension === "xls"
    ) {
      readExcel(file);
    } else if (extension === "json") {
      readJSON(file);
    } else {
      setError(
        "Please upload a CSV, Excel or JSON file."
      );
    }
  };
  const analyzeTableImage = async () => {
  if (!tableImage) return;

  setImageAnalyzed(false);
  setImageText("");

  try {
    const worker = await createWorker("eng");

    const result = await worker.recognize(tableImage);

    setImageText(result.data.text);

    await worker.terminate();

    setImageAnalyzed(true);
  } catch (error) {
    console.error("Image analysis failed:", error);
    alert("Unable to analyze the table image.");
  }
};
const buildSchemaFromImage = () => {
  if (!imageText) return;

  const lines = imageText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const detectedColumns = [];

  lines.forEach((line) => {
    // Ignore common table headers
    if (/^(name|null\??|type|column|datatype)/i.test(line)) {
      return;
    }

    const match = line.match(
      /^([A-Za-z_][A-Za-z0-9_]*)\s+(NOT\s+NULL\s+)?(VARCHAR2|VARCHAR|CHAR|NUMBER|INTEGER|INT|DATE|BOOLEAN)(?:\((\d+)(?:,\s*(\d+))?\))?/i
    );

    if (!match) return;

    const columnName = match[1];
    const notNull = Boolean(match[2]);
    const dataType = match[3].toUpperCase();
    const size = match[4];
    const scale = match[5];

    let type = "VARCHAR(255)";

    if (
      dataType === "NUMBER" ||
      dataType === "INTEGER" ||
      dataType === "INT"
    ) {
      if (scale) {
        type = `DECIMAL(${size || 10},${scale})`;
      } else {
        type = "INTEGER";
      }
    } else if (dataType === "DATE") {
      type = "DATE";
    } else if (dataType === "BOOLEAN") {
      type = "BOOLEAN";
    } else if (
      dataType === "VARCHAR" ||
      dataType === "VARCHAR2"
    ) {
      type = `VARCHAR(${size || 255})`;
    } else if (dataType === "CHAR") {
      type = `VARCHAR(${size || 1})`;
    }

    detectedColumns.push({
      name: columnName,
      type,
      primaryKey: false,
      notNull,
    });
  });

  if (detectedColumns.length === 0) {
    alert(
      "Could not detect table columns. Try uploading a clearer table image."
    );
    return;
  }

  setSchemaColumns(detectedColumns);
  setSchemaTableName("detected_table");
  setStudioView("schema");
};
  const readCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        processData(results.data);
      },
      error: () => {
        setError("Unable to read the CSV file.");
      },
    });
  };

  const readExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(
          event.target.result,
          {
            type: "array",
          }
        );

        const firstSheet =
          workbook.Sheets[
            workbook.SheetNames[0]
          ];

        const jsonData =
          XLSX.utils.sheet_to_json(
            firstSheet,
            {
              defval: "",
            }
          );

        processData(jsonData);
      } catch {
        setError(
          "Unable to read the Excel file."
        );
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const readJSON = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(
          event.target.result
        );

        if (!Array.isArray(parsedData)) {
          setError(
            "JSON must contain an array of objects."
          );
          return;
        }

        processData(parsedData);
      } catch {
        setError("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  const processData = (rows) => {
    if (!rows || rows.length === 0) {
      setError(
        "The uploaded file contains no data."
      );
      return;
    }

    const validRows = rows.filter(
      (row) =>
        row &&
        typeof row === "object"
    );

    if (validRows.length === 0) {
      setError(
        "No valid records were found."
      );
      return;
    }

    const detectedColumns = [
  ...new Set(
    validRows.flatMap((row) =>
      Object.keys(row)
    )
  ),
];

    setColumns(detectedColumns);
    setData(validRows);

    setSchemaColumns(
      detectedColumns.map((column) => ({
        name: column,
        type: detectSQLType(column),
        primaryKey: false,
      }))
    );

    const cleanName = (tableName || "my_table")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    setUploadedDatabase({
      tableName: cleanName,
      columns: detectedColumns,
      rows: validRows,
    });

    setSchemaTableName(cleanName);
    setTableName(cleanName);

    setSchemaTables((previousTables) => {
      const newTable = {
        name: cleanName,
        columns: detectedColumns.map(
          (column) => ({
            name: column,
            type: detectSQLType(column),
            primaryKey: false,
          })
        ),
      };

      const existingTable =
        previousTables.find(
          (table) =>
            table.name === cleanName
        );

      if (existingTable) {
        return previousTables.map(
          (table) =>
            table.name === cleanName
              ? newTable
              : table
        );
      }

      return [
        ...previousTables,
        newTable,
      ];
    });
  };

  /* =========================
     SQL GENERATION
  ========================= */

  const detectSQLType = (column) => {
    const values = data
      .map((row) => row[column])
      .filter(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== ""
      );

    if (values.length === 0) {
      return "VARCHAR(255)";
    }

    const allNumbers = values.every(
      (value) =>
        !isNaN(Number(value))
    );

    if (allNumbers) {
      const allIntegers =
        values.every(
          (value) =>
            Number.isInteger(
              Number(value)
            )
        );

      return allIntegers
        ? "INTEGER"
        : "DECIMAL(10,2)";
    }

    const allBooleans =
      values.every(
        (value) =>
          value === true ||
          value === false ||
          value === "true" ||
          value === "false"
      );

    if (allBooleans) {
      return "BOOLEAN";
    }

    return "VARCHAR(255)";
  };

  const generateCreateTableSQL = () => {
    if (columns.length === 0) {
      return "";
    }

    const safeTableName =
      tableName
        .trim()
        .replace(/\s+/g, "_")
        .replace(
          /[^a-zA-Z0-9_]/g,
          ""
        );

    const columnDefinitions =
      columns.map((column) => {
        const safeColumn =
          column
            .trim()
            .replace(/\s+/g, "_")
            .replace(
              /[^a-zA-Z0-9_]/g,
              ""
            );

        return `    ${
          safeColumn || "column_name"
        } ${detectSQLType(column)}`;
      });

    return `CREATE TABLE ${safeTableName} (\n${columnDefinitions.join(
      ",\n"
    )}\n);`;
  };

  const generateInsertSQL = () => {
    if (
      data.length === 0 ||
      columns.length === 0
    ) {
      return "";
    }

    const safeTableName =
      tableName
        .trim()
        .replace(/\s+/g, "_")
        .replace(
          /[^a-zA-Z0-9_]/g,
          ""
        );

    const safeColumns =
      columns.map((column) =>
        column
          .trim()
          .replace(/\s+/g, "_")
          .replace(
            /[^a-zA-Z0-9_]/g,
            ""
          )
      );

    const values = data.map((row) => {
      const rowValues = columns.map(
        (column) => {
          const value = row[column];

          if (
            value === null ||
            value === undefined ||
            value === ""
          ) {
            return "NULL";
          }

          if (
            typeof value === "boolean"
          ) {
            return value
              ? "TRUE"
              : "FALSE";
          }

          if (
            typeof value === "number" ||
            (!isNaN(value) &&
              value !== "")
          ) {
            return String(value);
          }

          return `'${String(
            value
          ).replace(/'/g, "''")}'`;
        }
      );

      return `(${rowValues.join(
        ", "
      )})`;
    });

    return `INSERT INTO ${safeTableName} (${safeColumns.join(
      ", "
    )}) VALUES\n${values.join(
      ",\n"
    )};`;
  };

  const getDatabaseOverview = () => {
    return {
      tableName,
      rows: data.length,
      columns: columns.length,
      columnNames: columns,
    };
  };

  const copySQL = async () => {
    const createSQL =
      generateCreateTableSQL();

    const insertSQL =
      generateInsertSQL();

    const sql = `${createSQL}

${insertSQL}`;

    if (!sql.trim()) return;

    await navigator.clipboard.writeText(
      sql
    );

    alert("SQL commands copied!");
  };

  /* =========================
     SAVE SCHEMA TABLE
  ========================= */

  const saveSchemaTable = () => {
  const cleanName =
    schemaTableName
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

  if (!cleanName) {
    alert("Please enter a valid table name.");
    return;
  }

  const newTable = {
    name: cleanName,
    columns: schemaColumns.map(
      (column) => ({ ...column })
    ),
  };

  setSchemaTables((previousTables) => {
    return previousTables
      .filter(
        (table) =>
          table.name !== editingTableName ||
          editingTableName === cleanName
      )
      .map((table) =>
        table.name === editingTableName
          ? newTable
          : table
      )
      .concat(
        previousTables.some(
          (table) =>
            table.name === editingTableName
        )
          ? []
          : [newTable]
      );
  });

  setEditingTableName(null);
  setSchemaTableName(cleanName);
  setSchemaTableName("");
setSchemaColumns([
  {
    name: "",
    type: "VARCHAR(255)",
    primaryKey: false,
  },
]);

  alert(
    `Table "${cleanName}" saved successfully!`
  );
};
  {studioView === "sql-generator" && (
  <div className="studio-view">
    <button
      className="back-btn"
      onClick={() => setStudioView("home")}
    >
      ← Back
    </button>

    <div className="section-title">
      <h2>SQL Generator</h2>
      <p>Generate SQL from your uploaded dataset.</p>
    </div>

    {data.length === 0 ? (
  <div className="empty-state">
    <h3>No dataset loaded</h3>
    <p>Upload a CSV, Excel, or JSON dataset first.</p>

    <button
      className="use-playground-btn"
      onClick={() => setStudioView("upload")}
    >
      Upload Dataset
    </button>
  </div>
) : (
      <div className="dataset-section">
        <div className="section-header">
          <div>
            <h3>Generated SQL</h3>
            <p>{tableName || "dataset_table"}</p>
          </div>

          <div className="studio-actions">
  <button
    className="download-result-btn"
    onClick={copySQL}
  >
    📋 Copy SQL
  </button>

  <button
    className="use-playground-btn"
    onClick={() => {
      if (onNavigate) {
        onNavigate("SQL Playground");
      }
    }}
  >
    ▶️ Open in SQL Playground
  </button>
</div>
        </div>

        <pre className="ai-sql-code">
{generateCreateTableSQL()}

{generateInsertSQL()}
        </pre>
      </div>
    )}
  </div>
)}

  /* =========================
     RETURN
  ========================= */

  return (
    <section className="dataset-page">

      {/* PAGE HEADING */}
      <div className="page-heading">
        <div>
          <span className="eyebrow dark">
            DATA & SCHEMA STUDIO
          </span>

          <h2>
            Build & Understand Your Database
          </h2>

          <p>
            Upload datasets, design tables,
            manage relationships and generate
            SQL for your database.
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="dataset-error">
          {error}
        </div>
      )}

      {/* =========================
          HOME
      ========================= */}

      {studioView === "home" && (
        <div className="studio-actions">
          {/* SQL GENERATOR */}
<div className="studio-action-card">
  <div className="studio-action-icon">
    🧾
  </div>

  <div>
    <h3>
      SQL Generator
    </h3>

    <p>
      Generate CREATE TABLE and INSERT SQL from your dataset.
    </p>
  </div>

  <button
    className="studio-action-btn"
    onClick={() =>
      setStudioView("sql-generator")
    }
  >
    Open
  </button>
</div>

          {/* UPLOAD TABLE IMAGE */}
          <div className="studio-action-card">
            <div className="studio-action-icon">
              📷
            </div>

            <div>
              <h3>
                Upload Table Image
              </h3>

              <p>
                Turn a table screenshot into
                structured data.
              </p>
            </div>

            <button
              className="studio-action-btn"
              onClick={() =>
                setStudioView("image")
              }
            >
              Open
            </button>
          </div>

          {/* SCHEMA BUILDER */}
          <div className="studio-action-card">
            <div className="studio-action-icon">
              ▦
            </div>

            <div>
              <h3>
                Schema Builder
              </h3>

              <p>
                Create tables, columns and
                data types manually.
              </p>
            </div>

            <button
              className="studio-action-btn"
              onClick={() =>
                setStudioView("schema")
              }
            >
              Open
            </button>
          </div>

          {/* RELATIONSHIP BUILDER */}
          <div className="studio-action-card">
            <div className="studio-action-icon">
              🔗
            </div>

            <div>
              <h3>
                Relationship Builder
              </h3>

              <p>
                Connect tables using
                database relationships.
              </p>
            </div>

            <button
              className="studio-action-btn"
              onClick={() =>
                setStudioView(
                  "relationship"
                )
              }
            >
              Open
            </button>
          </div>

          {/* ER VISUALIZER */}
          <div className="studio-action-card">
            <div className="studio-action-icon">
              🗂️
            </div>

            <div>
              <h3>
                ER Visualizer
              </h3>

              <p>
                View your tables and
                relationships visually.
              </p>
            </div>

            <button
              className="studio-action-btn"
              onClick={() =>
                setStudioView(
                  "visualizer"
                )
              }
            >
              Open
            </button>
          </div>

          {/* UPLOAD DATASET */}
          <div className="studio-action-card">
            <div className="studio-action-icon">
              📊
            </div>

            <div>
              <h3>
                Upload Dataset
              </h3>

              <p>
                Upload CSV, Excel or JSON
                datasets.
              </p>
            </div>

            <button
              className="studio-action-btn"
              onClick={() =>
                setStudioView("upload")
              }
            >
              Open
            </button>
          </div>

          {/* DATABASE OVERVIEW */}
          <div className="studio-action-card">
            <div className="studio-action-icon">
              🗄️
            </div>

            <div>
              <h3>
                Database Overview
              </h3>

              <p>
                View your current database
                structure and statistics.
              </p>
            </div>

            <button
              className="studio-action-btn"
              onClick={() =>
                setStudioView("overview")
              }
            >
              Open
            </button>
          </div>

        </div>
      )}
            {/* =========================
          SQL GENERATOR
      ========================= */}

      {studioView === "sql-generator" && (
        <div className="studio-view">

          <button
            className="back-btn"
            onClick={() => setStudioView("home")}
          >
            ← Back
          </button>

          <div className="section-title">
            <h2>SQL Generator</h2>
            <p>Generate SQL from your uploaded dataset.</p>
          </div>

          {data.length === 0 ? (
  <div className="empty-state">
    <h3>No dataset loaded</h3>
    <p>
      Upload a CSV, Excel, or JSON dataset first.
    </p>

    <button
      className="use-playground-btn"
      onClick={() => setStudioView("upload")}
    >
      Upload Dataset
    </button>
  </div>
) : (
            <div className="dataset-section">

              <div className="section-header">
                <div>
                  <h3>Generated SQL</h3>
                  <p>{tableName || "dataset_table"}</p>
                </div>

                <button
                  className="download-result-btn"
                  onClick={copySQL}
                >
                  Copy SQL
                </button>
              </div>

              <pre className="ai-sql-code">
{generateCreateTableSQL()}

{generateInsertSQL()}
              </pre>

            </div>
          )}

        </div>
      )}

      {/* =========================
          UPLOAD DATASET
      ========================= */}

      {studioView === "upload" && (
  <div className="dataset-section">

    <button
      className="studio-back-btn"
      onClick={() => setStudioView("home")}
    >
      ← Back to Studio
    </button>

    <div className="section-header">
      <div>
        <h3>Upload Dataset</h3>

        <p>
          Upload CSV, Excel or JSON data.
        </p>
      </div>
    </div>

    <div className="upload-file-box">

      <label
        className="upload-file-btn"
        htmlFor="dataset-upload"
      >
        📁 Choose Dataset File
      </label>

      <input
        id="dataset-upload"
        type="file"
        accept=".csv,.xlsx,.xls,.json"
        onChange={handleFileUpload}
        hidden
      />

      {fileName && (
        <div className="selected-file-row">

          <span>
            📄 {fileName}
          </span>

          <button
            type="button"
            className="upload-remove-btn"
            onClick={() => {
              setFileName("");
              setData([]);
              setColumns([]);
              setError("");

              const input =
                document.getElementById(
                  "dataset-upload"
                );

              if (input) {
                input.value = "";
              }
            }}
          >
            Delete
          </button>

        </div>
      )}

    </div>

    {data.length > 0 && (
      <div className="dataset-section">

        <div className="section-header">
          <div>
            <h3>Dataset Preview</h3>

            <p>
              {data.length} rows × {columns.length} columns
            </p>
          </div>
        </div>

        <div className="dataset-table-wrapper">
          <table className="dataset-table">

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
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column}>
                      {String(row[column] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="table-name-area">

          <label>
            Table Name
          </label>

          <input
            type="text"
            value={tableName}
            onChange={(event) =>
              setTableName(event.target.value)
            }
            placeholder="my_table"
          />

        </div>

        <div className="studio-actions">

          <button
            className="use-playground-btn"
            onClick={() => {
              if (onNavigate) {
                onNavigate("SQL Playground");
              }
            }}
          >
            Open in SQL Playground →
          </button>

          <button
            className="use-playground-btn"
            onClick={copySQL}
          >
            Copy SQL
          </button>

        </div>

        <div className="dataset-section">

          <div className="section-header">
            <div>
              <h3>
                Generated SQL Schema
              </h3>

              <p>
                SQL automatically generated
                from your uploaded dataset.
              </p>
            </div>
          </div>

          <pre className="sql-output">
{generateCreateTableSQL()}
          </pre>

          <h4>
            INSERT Statements
          </h4>

          <pre className="sql-output">
{generateInsertSQL()}
          </pre>

        </div>

      </div>
    )}

  </div>
)}

      {/* =========================
          TABLE IMAGE
      ========================= */}

        {studioView === "image" && (
  <div className="dataset-section">

    <button
      className="studio-back-btn"
      onClick={() => setStudioView("home")}
    >
      ← Back to Studio
    </button>

    <div className="section-header">
      <div>
        <h3>Upload Table Image</h3>

        <p>
          Upload a screenshot of a database table.
        </p>
      </div>
    </div>

    <div className="upload-file-box">

      <label
        className="upload-file-btn"
        htmlFor="table-image-upload"
      >
        📁 Choose Table Image
      </label>

      <input
        id="table-image-upload"
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          const file = event.target.files[0];

          if (file) {
  setImageAnalyzed(false);
  setImageText("");

  setTableImage(
    URL.createObjectURL(file)
  );
}
        }}
      />

      {tableImage && (
        <div className="selected-file-row">

          <span>
            🖼️ Table image selected
          </span>

          <button
            type="button"
            className="upload-remove-btn"
            onClick={() => {
              setTableImage(null);

              const input =
                document.getElementById(
                  "table-image-upload"
                );

              if (input) {
                input.value = "";
              }
            }}
          >
            Delete
          </button>

        </div>
      )}

    </div>

    {tableImage && (
  <div className="table-image-preview">

    <img
      src={tableImage}
      alt="Uploaded table"
      style={{
        maxWidth: "100%",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    />

    <div className="studio-actions">
      <button
  className="use-playground-btn"
  onClick={analyzeTableImage}
>
  🔍 Analyze Table Image
</button>
    </div>
    {imageAnalyzed && (
  <div className="dataset-section">
    <div className="section-header">
      <div>
        <h3>Table Image Analysis</h3>
        <p>
          Image uploaded successfully. Review the table structure below.
        </p>
      </div>
    </div>
    {imageText && (
  <div className="image-ocr-result">
    <h4>Detected Text</h4>

    <pre>
      {imageText}
    </pre>
  </div>
)}

    <div className="image-analysis-result">

  <div className="analysis-status">
    ✅ Image uploaded successfully
  </div>

  <h4>Detected Table Structure</h4>

  <p>
    Use the image as a reference and define the table structure
    in Schema Builder.
  </p>

  <div className="analysis-actions">
  </div>

</div>

    <button
      className="use-playground-btn"
      onClick={() => setStudioView("schema")}
    >
      🧩 Open Schema Builder
    </button>
  </div>
)}

  </div>
)}

  </div>
)}


      {/* =========================
          SCHEMA BUILDER
      ========================= */}

      {studioView === "schema" && (
  <div className="dataset-section">

    <button
      className="studio-back-btn"
      onClick={() => setStudioView("home")}
    >
      ← Back to Studio
    </button>

    <div className="section-header">
      <div>
        <h3>Schema Builder</h3>
        <p>
          Create database tables and define their columns.
        </p>
      </div>
    </div>

    <div className="table-name-area">
      <label>Table Name</label>

      <input
        type="text"
        value={schemaTableName}
        onChange={(event) =>
          setSchemaTableName(event.target.value)
        }
        placeholder="my_table"
      />
    </div>

    <div className="schema-columns">

      {schemaColumns.map((column, index) => (
        <div
          className="schema-column-row"
          key={index}
        >

          <input
            type="text"
            value={column.name}
            placeholder="Column name"
            onChange={(event) => {
              const updated = [...schemaColumns];

              updated[index] = {
                ...updated[index],
                name: event.target.value,
              };

              setSchemaColumns(updated);
            }}
          />

          <select
            value={column.type}
            onChange={(event) => {
              const updated = [...schemaColumns];

              updated[index] = {
                ...updated[index],
                type: event.target.value,
              };

              setSchemaColumns(updated);
            }}
          >
            <option value="INTEGER">
              INTEGER
            </option>

            <option value="VARCHAR(255)">
              VARCHAR(255)
            </option>

            <option value="DECIMAL(10,2)">
              DECIMAL(10,2)
            </option>

            <option value="BOOLEAN">
              BOOLEAN
            </option>

            <option value="DATE">
              DATE
            </option>
          </select>

          <label className="primary-key-option">
            <input
              type="checkbox"
              checked={column.primaryKey}
              onChange={(event) => {
                const updated = [...schemaColumns];

                updated[index] = {
                  ...updated[index],
                  primaryKey: event.target.checked,
                };

                setSchemaColumns(updated);
              }}
            />

            <span>Primary Key</span>
          </label>

          <button
            type="button"
            className="schema-delete-btn"
            onClick={() => {
              setSchemaColumns(
                schemaColumns.filter(
                  (_, i) => i !== index
                )
              );
            }}
          >
            Delete
          </button>

        </div>
      ))}

    </div>

    <div className="schema-builder-actions">

      <button
        className="schema-add-column-btn"
        onClick={() =>
          setSchemaColumns([
            ...schemaColumns,
            {
              name: "",
              type: "VARCHAR(255)",
              primaryKey: false,
            },
          ])
        }
      >
        + Add Column
      </button>

      <button
        className="schema-save-btn"
        onClick={saveSchemaTable}
      >
        Save Table
      </button>

    </div>

    <div className="dataset-section">

      <div className="section-header">
        <div>
          <h3>Existing Tables</h3>

          <p>
            Tables currently available in the database schema.
          </p>
        </div>
      </div>

      <div className="schema-diagram">

        {schemaTables.map((table) => (
          <div
  className="visualizer-table"
  key={table.name}
>
  <div className="visualizer-table-title">
    {table.name}
  </div>

  <div className="visualizer-table-body">

    {table.columns.map((column) => (
      <div key={column.name}>
        {column.primaryKey ? "🔑 " : ""}
        {column.name} : {column.type}
      </div>
    ))}

    <div className="schema-table-actions">

  <button
    type="button"
    className="schema-edit-btn"
    onClick={() => {
  setEditingTableName(table.name);
  setSchemaTableName(table.name);
  setSchemaColumns(
    table.columns.map((column) => ({
      ...column,
    }))
  );
}}
  >
    ✏️ Edit Table
  </button>

  <button
    type="button"
    className="schema-delete-btn"
    onClick={() => {
      if (
        window.confirm(
          `Delete table "${table.name}"?`
        )
      ) {
        setSchemaTables(
          (previousTables) =>
            previousTables.filter(
              (item) =>
                item.name !== table.name
            )
        );
        setRelationships(
  (previousRelationships) =>
    previousRelationships.filter(
      (relationship) =>
        relationship.tableA !== table.name &&
        relationship.tableB !== table.name
    )
);
      }
    }}
  >
    🗑️ Delete Table
  </button>

</div>

  </div>
</div>
        ))}

        {relationships.map((relationship, index) => (
          <div
            key={index}
            className="schema-relationship-badge"
          >
            {relationship.tableA}

            <span>
              ── {relationship.type} ──
            </span>

            {relationship.tableB}
          </div>
        ))}

      </div>

    </div>

  </div>
)}

      {/* =========================
          RELATIONSHIP BUILDER
      ========================= */}

       {studioView === "relationship" && (
  <div
    id="relationship-builder-section"
    className="relationship-builder-section"
  >

    <button
      className="studio-back-btn"
      onClick={() => setStudioView("home")}
    >
      ← Back to Studio
    </button>

    <div className="section-header">
      <div>
        <h3>Relationship Builder</h3>

        <p>
          Define relationships between your database tables.
        </p>
      </div>
    </div>

    <div className="relationship-builder-card">

      <div className="relationship-field">
        <label>Table A</label>

        <select
          value={relationshipForm.tableA}
          onChange={(event) =>
            setRelationshipForm({
              ...relationshipForm,
              tableA: event.target.value,
            })
          }
        >
          {schemaTables.map((table) => (
            <option
              key={table.name}
              value={table.name}
            >
              {table.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relationship-field">
        <label>Relationship Type</label>

        <select
          value={relationshipForm.type}
          onChange={(event) =>
            setRelationshipForm({
              ...relationshipForm,
              type: event.target.value,
            })
          }
        >
          <option value="1:1">1 : 1</option>
          <option value="1:N">1 : N</option>
          <option value="N:1">N : 1</option>
          <option value="N:N">N : N</option>
        </select>
      </div>

      <div className="relationship-field">
        <label>Table B</label>

        <select
          value={relationshipForm.tableB}
          onChange={(event) =>
            setRelationshipForm({
              ...relationshipForm,
              tableB: event.target.value,
            })
          }
        >
          {schemaTables.map((table) => (
            <option
              key={table.name}
              value={table.name}
            >
              {table.name}
            </option>
          ))}
        </select>
      </div>

      <div className="relationship-field">
        <label>Primary Key</label>

        <select
          value={relationshipForm.primaryKey}
          onChange={(event) =>
            setRelationshipForm({
              ...relationshipForm,
              primaryKey: event.target.value,
            })
          }
        >
          {schemaTables
            .find(
              (table) =>
                table.name === relationshipForm.tableA
            )
            ?.columns.map((column) => (
              <option
                key={column.name}
                value={`${relationshipForm.tableA}.${column.name}`}
              >
                {relationshipForm.tableA}.{column.name}
              </option>
            ))}
        </select>
      </div>

      <div className="relationship-field">
        <label>Foreign Key</label>

        <select
          value={relationshipForm.foreignKey}
          onChange={(event) =>
            setRelationshipForm({
              ...relationshipForm,
              foreignKey: event.target.value,
            })
          }
        >
          {schemaTables
            .find(
              (table) =>
                table.name === relationshipForm.tableB
            )
            ?.columns.map((column) => (
              <option
                key={column.name}
                value={`${relationshipForm.tableB}.${column.name}`}
              >
                {relationshipForm.tableB}.{column.name}
              </option>
            ))}
        </select>
      </div>

      <div className="relationship-action-buttons">

        <button
          className="relationship-add-btn"
          onClick={() => {
            if (
              !relationshipForm.tableA ||
              !relationshipForm.tableB ||
              !relationshipForm.primaryKey ||
              !relationshipForm.foreignKey
            ) {
              alert(
                "Please select all relationship details."
              );
              return;
            }

            alert("Relationship added!");
          }}
        >
          + Add Relationship
        </button>

        <button
          className="relationship-save-btn"
          onClick={() => {
            if (
              !relationshipForm.tableA ||
              !relationshipForm.tableB ||
              !relationshipForm.primaryKey ||
              !relationshipForm.foreignKey
            ) {
              alert(
                "Please select all relationship details."
              );
              return;
            }

            setRelationships((previousRelationships) => [
              ...previousRelationships,
              {
                ...relationshipForm,
              },
            ]);

            alert(
              "Relationship saved successfully!"
            );
          }}
        >
          Save Relationship
        </button>

      </div>

    </div>

    <div className="saved-relationships-section">

      <div className="section-header">
        <div>
          <h3>Saved Relationships</h3>

          <p>
            Relationships currently defined in your schema.
          </p>
        </div>
      </div>

      {relationships.length === 0 ? (
        <div className="relationship-empty">
          No relationships saved yet.
        </div>
      ) : (
        <div className="saved-relationships-list">

          {relationships.map(
            (relationship, index) => (
              <div
                className="saved-relationship-card"
                key={index}
              >

                <div className="saved-relationship-table">
                  <strong>
                    {relationship.tableA}
                  </strong>

                  <span>
                    {relationship.primaryKey}
                  </span>
                </div>

                <div className="saved-relationship-type">
                  {relationship.type}
                </div>

                <div className="saved-relationship-table">
                  <strong>
                    {relationship.tableB}
                  </strong>

                  <span>
                    {relationship.foreignKey}
                  </span>
                </div>

                <button
                  type="button"
                  className="relationship-delete-btn"
                  onClick={() => {
                    const confirmDelete =
                      window.confirm(
                        "Delete this relationship?"
                      );

                    if (!confirmDelete) return;

                    setRelationships(
                      (previousRelationships) =>
                        previousRelationships.filter(
                          (_, i) => i !== index
                        )
                    );
                  }}
                >
                  Delete
                </button>

              </div>
            )
          )}

        </div>
      )}

    </div>

  </div>
)}

      {/* =========================
          ER / SCHEMA VISUALIZER
      ========================= */}

      {studioView === "visualizer" && (
        <div
          id="schema-visualizer-section"
          className="schema-visualizer-section"
        >

          <button
            className="studio-back-btn"
            onClick={() =>
              setStudioView("home")
            }
          >
            ← Back to Studio
          </button>

          <div className="section-header">
            <div>
              <h3>
                ER / Schema Visualizer
              </h3>

              <p>
                Visual representation of
                your database tables and
                relationships.
              </p>
            </div>
          </div>

          <div className="schema-visualizer-canvas">

            {schemaTables.length ===
            0 ? (
              <div className="relationship-empty">
                Create tables in Schema
                Builder to visualize
                your database.
              </div>
            ) : (
              <div className="schema-table-grid">

                {schemaTables.map(
                  (table) => (
                    <div
                      className="visualizer-table"
                      key={table.name}
                    >

                      <div className="visualizer-table-title">
                        {table.name}
                      </div>

                      <div className="visualizer-table-body">

                        {table.columns.map(
                          (column) => (
                            <div
                              key={
                                column.name
                              }
                            >
                              {column.primaryKey
                                ? "🔑 "
                                : ""}
                              {
                                column.name
                              }{" "}
                              :{" "}
                              {
                                column.type
                              }
                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

            <div
              style={{
                marginTop: "24px",
              }}
            >

              {relationships.length >
              0 ? (
                relationships.map(
                  (
                    relationship,
                    index
                  ) => (
                    <div
                      key={index}
                      className="visualizer-relationship-line"
                    >

                      <span>
                        {
                          relationship.tableA
                        }
                      </span>

                      <div className="relationship-connector">

                        <div className="relationship-line"></div>

                        <span className="relationship-type">
                          {
                            relationship.type
                          }
                        </span>

                        <div className="relationship-line"></div>

                      </div>

                      <span>
                        {
                          relationship.tableB
                        }
                      </span>

                    </div>
                  )
                )
              ) : (
                <div className="relationship-empty">
                  No relationships saved
                  yet.
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* =========================
    DATABASE OVERVIEW
========================= */}

{studioView === "overview" && (
  <div className="dataset-section">

    <button
      className="studio-back-btn"
      onClick={() => setStudioView("home")}
    >
      ← Back to Studio
    </button>

    <div className="section-header">
      <div>
        <h3>Database Overview</h3>
        <p>
          Complete summary of your current database.
        </p>
      </div>
    </div>

    {/* DATABASE STATISTICS */}

    <div className="overview-grid">

      <div className="overview-card">
        <strong>🗄️ Tables</strong>
        <span>
          {schemaTables.length}
        </span>
      </div>

      <div className="overview-card">
        <strong>📋 Rows</strong>
        <span>
          {data.length}
        </span>
      </div>

      <div className="overview-card">
        <strong>🧩 Columns</strong>
        <span>
  {schemaTables.reduce(
    (total, table) => total + table.columns.length,
    0
  )}
</span>
      </div>

      <div className="overview-card">
        <strong>🔗 Relationships</strong>
        <span>
          {relationships.length}
        </span>
      </div>

    </div>

    {/* TABLE INFORMATION */}

    <div className="dataset-section">

      <div className="section-header">
        <div>
          <h3>Tables</h3>
          <p>
            Tables currently available in your database.
          </p>
        </div>
      </div>

      {schemaTables.length === 0 ? (
        <div className="relationship-empty">
          No tables created yet.
        </div>
      ) : (
        <div className="schema-table-grid">

          {schemaTables.map((table) => (
            <div
              className="visualizer-table"
              key={table.name}
            >

              <div className="visualizer-table-title">
                🗄️ {table.name}
              </div>

              <div className="visualizer-table-body">

                <div>
                  Columns: {table.columns.length}
                </div>

                <div>
                  {table.columns.map(
                    (column) => (
                      <div key={column.name}>
                        {column.primaryKey
                          ? "🔑 "
                          : "• "}
                        {column.name}
                        {" : "}
                        {column.type}
                      </div>
                    )
                  )}
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>

    {/* RELATIONSHIPS */}

    <div className="dataset-section">

      <div className="section-header">
        <div>
          <h3>Relationships</h3>
          <p>
            Connections between your database tables.
          </p>
        </div>
      </div>

      {relationships.length === 0 ? (
        <div className="relationship-empty">
          No relationships defined yet.
        </div>
      ) : (
        <div className="schema-table-grid">

          {relationships.map(
            (relationship, index) => (
              <div
                className="overview-card"
                key={index}
              >

                <strong>
                  {relationship.tableA}
                </strong>

                <span>
                  {relationship.type}
                </span>

                <strong>
                  {relationship.tableB}
                </strong>

              </div>
            )
          )}

        </div>
      )}

    </div>

    {/* QUICK ACTIONS */}

    <div className="dataset-section">

      <div className="section-header">
        <div>
          <h3>Quick Actions</h3>
          <p>
            Continue working with your database.
          </p>
        </div>
      </div>

      <div className="studio-actions">

        <button
          className="use-playground-btn"
          onClick={() =>
            setStudioView("schema")
          }
        >
          🧩 Schema Builder
        </button>

        <button
          className="use-playground-btn"
          onClick={() =>
            setStudioView("relationships")
          }
        >
          🔗 Relationships
        </button>

        <button
          className="use-playground-btn"
          onClick={() =>
            setStudioView("visualizer")
          }
        >
          🗺️ ER Visualizer
        </button>

        <button
          className="use-playground-btn"
          onClick={() =>
            setStudioView("sql-generator")
          }
        >
          📝 SQL Generator
        </button>

      </div>

    </div>

  </div>
)}

    </section>
  );
}

export default DatasetManager;