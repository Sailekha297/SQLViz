import { useEffect, useState} from "react";
import DatasetManager from "./components/DatasetManager";
import SQLPlayground from "./components/SQLPlayground";
import SetOperations from "./components/SetOperations";
import WindowFunctions from "./components/WindowFunctions";
import Quiz from "./components/Quiz";
import Learn from "./components/Learn";
import AIAssistant from "./components/AIAssistant";
import CompetitivePractice from "./components/CompetitivePractice";
import CompetitiveExamPractice from "./components/CompetitiveExamPractice";
import {
  LayoutDashboard,
  BookOpen,
  GitBranch,
  Table2,
  Terminal,
  ClipboardCheck,
  Trophy,
  History,
  Settings,
  Menu,
  X,
  Sparkles,
  CircleHelp,
} from "lucide-react";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [uploadedDatabase, setUploadedDatabase] = useState(null);
  const [schemaTables, setSchemaTables] = useState([
  {
    name: "my_table",
    columns: [
      {
        name: "id",
        type: "INTEGER",
        primaryKey: true,
      },
    ],
  },
]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const addToHistory = (type, query) => {
  const existingHistory = JSON.parse(
    localStorage.getItem("sqlviz_history") || "[]"
  );

  const newHistoryItem = {
    type,
    query,
    time: new Date().toLocaleString(),
  };

  localStorage.setItem(
    "sqlviz_history",
    JSON.stringify([
      newHistoryItem,
      ...existingHistory,
    ])
  );
};

  const [theme, setTheme] = useState(
    localStorage.getItem("sqlviz_theme") || "light"
  );
  

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("sqlviz_theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ⬇️ KEEP THE REST OF YOUR EXISTING App.jsx CODE HERE

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Learn", icon: BookOpen },
    { name: "Set Operations", icon: GitBranch },
    { name: "Window Functions", icon: Table2 },
    { name: "Data & Schema Studio", icon: Table2 },
    { name: "SQL Playground", icon: Terminal },
    { name: "Quiz", icon: ClipboardCheck },
    { name: "Practice Questions", icon: Trophy },
    { name: "Competitive Exam Practice", icon: Trophy },
    { name: "History", icon: History },
    { name: "AI Assistant", icon: Sparkles },
    { name: "Developed By", icon: CircleHelp },
    { name: "Help", icon: CircleHelp },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

        <div className="logo">
          <div className="logo-mark">S</div>

          {sidebarOpen && (
            <div>
              <h2>SQLViz</h2>
              <span>DBMS Learning Platform</span>
            </div>
          )}
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={19} />

                {sidebarOpen && (
                  <span>{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button
  className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
  onClick={() => setActivePage("Settings")}
>
  <Settings size={19} />

  {sidebarOpen && <span>Settings</span>}
</button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        <header className="topbar">

          <button
            className="menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <div>
            <h1>{activePage}</h1>
            <p>SQL Set Operations & Window Functions</p>
          </div>

        </header>

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <section className="dashboard">

            <div className="welcome-card">

              <div>
                <span className="eyebrow">
                  DBMS PROJECT
                </span>

                <h2>
                  Learn SQL.
                  <br />
                  Visualize Queries.
                  <br />
                  Practice Better.
                </h2>

                <p>
                  An interactive platform for learning,
                  executing and visualizing SQL Set Operations
                  and Window Functions.
                </p>
              </div>

            </div>

            <div className="section-title">
              <h2>Explore SQLViz</h2>

              <p>
                Choose a module to get started.
              </p>
            </div>

            <div className="feature-grid">

              <FeatureCard
                icon={<GitBranch />}
                title="Set Operations"
                description="Explore UNION, UNION ALL, INTERSECT and MINUS with visual examples."
                onClick={() => setActivePage("Set Operations")}
              />

              <FeatureCard
                icon={<Table2 />}
                title="Window Functions"
                description="Understand RANK, ROW_NUMBER, DENSE_RANK, LAG and LEAD."
                onClick={() => setActivePage("Window Functions")}
              />

              <FeatureCard
                icon={<Terminal />}
                title="SQL Playground"
                description="Write and execute SQL queries using your own datasets."
                onClick={() => setActivePage("SQL Playground")}
              />

              <FeatureCard
                icon={<ClipboardCheck />}
                title="Quiz"
                description="Test your SQL knowledge with Easy, Medium and Hard questions."
                onClick={() => setActivePage("Quiz")}
              />



            {/* CLOSE FEATURE GRID */}
            </div>
 
          </section>
        )}

        {activePage === "Data & Schema Studio" && (
  <DatasetManager
  setUploadedDatabase={setUploadedDatabase}
  schemaTables={schemaTables}
  setSchemaTables={setSchemaTables}
  onNavigate={setActivePage}
/>
)}
        {activePage === "SQL Playground" && (
  <SQLPlayground
    uploadedDatabase={uploadedDatabase}
    schemaTables={schemaTables}
    onNavigate={setActivePage}
    addToHistory={addToHistory}
  />
)}

        {/* SET OPERATIONS */}
{activePage === "Set Operations" && (
  <SetOperations addToHistory={addToHistory} />
)}
{/* WINDOW FUNCTIONS */}
{activePage === "Window Functions" && (
  <WindowFunctions addToHistory={addToHistory} />
)}
{/* QUIZ */}
        {activePage === "Quiz" && (
  <Quiz addToHistory={addToHistory} />
)}
{activePage === "Learn" && (
  <Learn onNavigate={setActivePage} />
)}
{/* AI ASSISTANT */}
{activePage === "AI Assistant" && (
  <AIAssistant />
)}
{activePage === "Practice Questions" && (
  <CompetitivePractice addToHistory={addToHistory} />
)}
{activePage === "Competitive Exam Practice" && (
  <CompetitiveExamPractice addToHistory={addToHistory} />
)}
{activePage === "History" && (
  <section className="history-page">

    <div className="section-title">
      <h2>History</h2>
      <p>View your recent SQL queries and learning activities.</p>
    </div>

    <div className="history-card">

      <div className="history-header">
        <div>
          <h3>Recent Activity</h3>
          <p>Your SQLViz activity history</p>
        </div>

        <button
          className="history-clear-btn"
          onClick={() => {
            localStorage.removeItem("sqlviz_history");
            window.location.reload();
          }}
        >
          Clear History
        </button>
      </div>

      {JSON.parse(
        localStorage.getItem("sqlviz_history") || "[]"
      ).length === 0 ? (

        <div className="history-empty">
          <div className="history-empty-icon">🕘</div>
          <h3>No history yet</h3>
          <p>
            Your SQL queries and activities will appear here.
          </p>
        </div>

      ) : (

        <div className="history-table-wrapper">

          <table className="history-table">

            <thead>
              <tr>
                <th>Type</th>
                <th>Query / Activity</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>

              {JSON.parse(
                localStorage.getItem("sqlviz_history") || "[]"
              ).map((item, index) => (

                <tr key={index}>

                  <td>
                    <span className="history-type">
                      {item.type}
                    </span>
                  </td>

                  <td className="history-query">
                    {item.query}
                  </td>

                  <td className="history-time">
                    {item.time}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  </section>
)}
{/* ABOUT */}
{activePage === "Developed By" && (
  <section className="about-page">

    <div className="section-title">
      <h2>Developed By</h2>
      <p>Learn more about the SQLViz project and the team behind it.</p>
    </div>

    <div className="about-card">

      <div className="about-header">
        <div className="about-logo">S</div>

        <div>
          <h2>SQLViz</h2>
          <p>SQL Set Operations & Window Functions Visualizer</p>
        </div>
      </div>

      <div className="about-section">
        <h3>About the Project</h3>
        <p>
          SQLViz is an interactive DBMS learning platform designed to help
          students understand, execute and visualize SQL Set Operations and
          Window Functions through examples, practice questions, quizzes and
          an interactive SQL Playground.
        </p>
      </div>

      <div className="about-section">
        <h3>Developed By</h3>

        <div className="team-grid">
          <div className="team-member">
            <img className="team-photo" src="/images/sailekha.jpg" alt="D Sailekha" />
            <h4>D SAILEKHA</h4>
            <p>Team Member</p>
          </div>

          <div className="team-member">
            <img className="team-photo" src="/images/jeevika.jpg" alt="P Jeevika" />
            <h4>P JEEVIKA</h4>
            <p>Team Member</p>
          </div>

          <div className="team-member">
            <img className="team-photo" src="/images/jaya-shree.jpg" alt="P Jaya Shree" />
            <h4>P JAYA SHREE</h4>
            <p>Team Member</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h3>Team</h3>
        <p>Team Obsidian</p>
      </div>

      <div className="about-section">
        <h3>Under the Guidance of</h3>
        <p>
          <img className="professor-photo" src="/images/professor.jpg" alt="Dr. Swaminathan Annadurai" />
          <strong>Dr. Swaminathan Annadurai</strong>
        </p>
      </div>

      <div className="about-footer">
        <span>DBMS Academic Project</span>
        <span>VIT Chennai</span>
      </div>

    </div>

  </section>
)}
{/* HELP */}
{activePage === "Help" && (
  <section className="help-page">

    <div className="section-title">
      <h2>Help & Support</h2>
      <p>Everything you need to use SQLViz and troubleshoot common problems.</p>
    </div>

    <div className="help-grid">

      <div className="help-card">
        <h3>🚀 Getting Started</h3>
        <p>
          Use the sidebar to choose a module. Start with Learn to understand
          SQL concepts, then use the practice and playground modules.
        </p>
      </div>

      <div className="help-card">
        <h3>📚 Learn</h3>
        <p>
          Study SQL Set Operations and Window Functions with simple examples
          and explanations.
        </p>
      </div>

      <div className="help-card">
        <h3>🔀 Set Operations</h3>
        <p>
          Select UNION, UNION ALL, INTERSECT or EXCEPT and execute the
          operation to view the resulting table.
        </p>
      </div>

      <div className="help-card">
        <h3>📊 Window Functions</h3>
        <p>
          Select a window function, run it on the sample dataset and examine
          the generated result.
        </p>
      </div>

      <div className="help-card">
        <h3>🗄️ Data & Schema Studio</h3>
        <p>
          Upload CSV, Excel or JSON datasets, inspect your schema, create
          relationships and generate SQL statements.
        </p>
      </div>

      <div className="help-card">
        <h3>💻 SQL Playground</h3>
        <p>
          Load a dataset, write SQL queries and execute them to view the
          results.
        </p>
      </div>

      <div className="help-card">
        <h3>📝 Quiz</h3>
        <p>
          Choose your preferred difficulty and question type, answer the
          questions and view your score after completion.
        </p>
      </div>

      <div className="help-card">
        <h3>🏆 Practice Questions</h3>
        <p>
          Practice SQL using Concept, Write SQL, Predict Output, Debug SQL,
          Fill in SQL and Query Challenge questions.
        </p>
      </div>

      <div className="help-card">
        <h3>✨ AI Assistant</h3>
        <p>
          Ask questions about SQL and DBMS concepts. The assistant provides
          structured explanations and SQL examples.
        </p>
      </div>

      <div className="help-card">
        <h3>🕘 History</h3>
        <p>
          View your recent SQL queries and learning activities recorded by
          SQLViz.
        </p>
      </div>

    </div>

    <div className="help-section">
      <h2>Common Problems & Fixes</h2>

      <div className="help-problem">
        <h3>SQL query is not executing</h3>
        <p>
          Check your SQL syntax and make sure the required table or dataset
          has been loaded.
        </p>
      </div>

      <div className="help-problem">
        <h3>Dataset is not loading</h3>
        <p>
          Make sure the file is a supported CSV, Excel or JSON file and that
          the file contains valid tabular data.
        </p>
      </div>

      <div className="help-problem">
        <h3>No result is displayed</h3>
        <p>
          Check whether the query or operation returns rows and verify that
          the selected dataset contains the required columns.
        </p>
      </div>

      <div className="help-problem">
        <h3>AI Assistant is not responding</h3>
        <p>
          Check that the backend server is running and try submitting the
          question again.
        </p>
      </div>

      <div className="help-problem">
        <h3>History is empty</h3>
        <p>
          History is created when supported activities are performed in
          SQLViz. Try executing a query or completing an activity first.
        </p>
      </div>

    </div>

    <div className="help-section">
      <h2>SQL Quick Reference</h2>

      <div className="quick-reference">
        <span>SELECT</span>
        <span>WHERE</span>
        <span>JOIN</span>
        <span>GROUP BY</span>
        <span>ORDER BY</span>
        <span>UNION</span>
        <span>INTERSECT</span>
        <span>EXCEPT</span>
        <span>Subqueries</span>
        <span>Window Functions</span>
      </div>
    </div>

  </section>
)}
{/* SETTINGS */}
{activePage === "Settings" && (
  <section className="settings-page">

    <div className="section-title">
      <h2>Settings</h2>
      <p>Manage your SQLViz preferences.</p>
    </div>

    <div className="settings-card">

      {/* SQLVIZ */}
      <div className="settings-item">
        <div>
          <h3>SQLViz</h3>
          <p>SQL Set Operations & Window Functions Visualizer</p>
        </div>
      </div>

      {/* APPLICATION VERSION */}
      <div className="settings-item">
        <div>
          <h3>Application Version</h3>
          <p>SQLViz 1.0</p>
        </div>
      </div>

      {/* DATA */}
      <div className="settings-item">
        <div>
          <h3>Data</h3>
          <p>Your uploaded datasets are handled within the application.</p>
        </div>
      </div>

      {/* APPEARANCE */}
      <div className="settings-item">
        <div>
          <h3>Appearance</h3>
          <p>Choose how SQLViz looks.</p>
        </div>

        <select
          value={theme}
          onChange={(e) => changeTheme(e.target.value)}
          className="settings-select"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      {/* SQL EDITOR */}
      <div className="settings-item">
        <div>
          <h3>SQL Editor</h3>
          <p>Customize your SQL writing experience.</p>
        </div>

        <div className="settings-options">

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>Auto-format SQL</span>
          </label>

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>Uppercase SQL keywords</span>
          </label>

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>Show line numbers</span>
          </label>

        </div>
      </div>

      {/* QUIZ & PRACTICE */}
      <div className="settings-item">
        <div>
          <h3>Quiz & Practice</h3>
          <p>Set your default learning preferences.</p>
        </div>

        <div className="settings-options">

          <div className="settings-field">
            <label>Default Difficulty</label>

            <select className="settings-select">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Default Question Count</label>

            <select className="settings-select">
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
              <option>30</option>
            </select>
          </div>

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>Show explanations after answering</span>
          </label>

        </div>
      </div>

      {/* HISTORY */}
      <div className="settings-item">
        <div>
          <h3>History</h3>
          <p>Manage your SQLViz activity history.</p>
        </div>

        <div className="settings-options">

          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>Enable activity history</span>
          </label>

          <button
            className="settings-danger-btn"
            onClick={() => {
              localStorage.removeItem("sqlviz_history");
              alert("History cleared successfully.");
            }}
          >
            Clear History
          </button>

        </div>
      </div>

      {/* RESET */}
      <div className="settings-item">
        <div>
          <h3>Reset</h3>
          <p>Reset SQLViz settings to their default values.</p>
        </div>

        <button
          className="settings-danger-btn"
          onClick={() => {
            localStorage.removeItem("sqlviz_theme");
            localStorage.removeItem("sqlviz_history");
            window.location.reload();
          }}
        >
          Reset Settings
        </button>
      </div>

    </div>

  </section>
)}
{/* OTHER MODULES */}
{activePage !== "Dashboard" &&
  activePage !== "Data & Schema Studio" &&
  activePage !== "SQL Playground" &&
  activePage !== "Set Operations" &&
  activePage !== "Window Functions" &&
  activePage !== "Quiz" &&
  activePage !== "Learn" &&
  activePage !== "AI Assistant" &&
  activePage !== "History" &&
  activePage !== "Practice Questions" &&
  activePage !== "Developed By" &&
  activePage !== "Help" &&
  activePage !== "Settings" && 
  activePage !== "Competitive Exam Practice" && (
    <section className="placeholder">
      <div className="placeholder-icon">🚧</div>
      <h2>{activePage}</h2>
      <p>This module will be implemented next.</p>
    </section>
  )}

      </main>

    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      className="feature-card"
      onClick={onClick}
    >

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <span className="explore">
        Explore →
      </span>

    </button>
  );
}

export default App;