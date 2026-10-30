import {
  BookOpen,
  Database,
  GitBranch,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

function Learn({ onNavigate }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      title: "SQL Set Operations",
      description:
        "Learn how UNION, UNION ALL, INTERSECT and EXCEPT combine or compare query results.",
      icon: GitBranch,
      topics: [
        "UNION",
        "UNION ALL",
        "INTERSECT",
        "EXCEPT",
      ],
      lessons: [
        {
          name: "UNION",
          explanation:
            "UNION combines the results of two SELECT queries and removes duplicate rows.",
          example:
            "SELECT Name FROM Students_A\nUNION\nSELECT Name FROM Students_B;",
        },
        {
          name: "UNION ALL",
          explanation:
            "UNION ALL combines the results of two SELECT queries and keeps duplicate rows.",
          example:
            "SELECT Name FROM Students_A\nUNION ALL\nSELECT Name FROM Students_B;",
        },
        {
          name: "INTERSECT",
          explanation:
            "INTERSECT returns only the rows that are common to both query results.",
          example:
            "SELECT Name FROM Students_A\nINTERSECT\nSELECT Name FROM Students_B;",
        },
        {
          name: "EXCEPT",
          explanation:
            "EXCEPT returns rows from the first query that are not present in the second query.",
          example:
            "SELECT Name FROM Students_A\nEXCEPT\nSELECT Name FROM Students_B;",
        },
      ],
    },

    {
      title: "Window Functions",
      description:
        "Understand how window functions calculate values across related rows without grouping them.",
      icon: BarChart3,
      topics: [
        "ROW_NUMBER",
        "RANK",
        "DENSE_RANK",
        "LAG",
        "LEAD",
      ],
      lessons: [
        {
          name: "ROW_NUMBER",
          explanation:
            "ROW_NUMBER assigns a unique sequential number to each row based on the specified ordering.",
          example:
            "SELECT Name, CGPA,\nROW_NUMBER() OVER (ORDER BY CGPA DESC) AS Row_No\nFROM Students;",
        },
        {
          name: "RANK",
          explanation:
            "RANK assigns the same rank to tied values and leaves gaps after ties.",
          example:
            "SELECT Name, CGPA,\nRANK() OVER (ORDER BY CGPA DESC) AS Rank_No\nFROM Students;",
        },
        {
          name: "DENSE_RANK",
          explanation:
            "DENSE_RANK assigns the same rank to tied values without leaving gaps.",
          example:
            "SELECT Name, CGPA,\nDENSE_RANK() OVER (ORDER BY CGPA DESC) AS Dense_Rank\nFROM Students;",
        },
        {
          name: "LAG",
          explanation:
            "LAG allows you to access a value from a previous row.",
          example:
            "SELECT Name, CGPA,\nLAG(CGPA) OVER (ORDER BY CGPA) AS Previous_CGPA\nFROM Students;",
        },
        {
          name: "LEAD",
          explanation:
            "LEAD allows you to access a value from a following row.",
          example:
            "SELECT Name, CGPA,\nLEAD(CGPA) OVER (ORDER BY CGPA) AS Next_CGPA\nFROM Students;",
        },
      ],
    },

    {
      title: "SQL Basics",
      description:
        "Revise the essential SQL commands required before working with advanced queries.",
      icon: Database,
      topics: [
        "SELECT",
        "WHERE",
        "ORDER BY",
        "GROUP BY",
        "HAVING",
      ],
      lessons: [
        {
          name: "SELECT",
          explanation:
            "SELECT is used to retrieve data from one or more database tables.",
          example:
            "SELECT Name, CGPA\nFROM Students;",
        },
        {
          name: "WHERE",
          explanation:
            "WHERE filters rows according to a specified condition.",
          example:
            "SELECT *\nFROM Students\nWHERE CGPA > 8;",
        },
        {
          name: "ORDER BY",
          explanation:
            "ORDER BY sorts the query result in ascending or descending order.",
          example:
            "SELECT *\nFROM Students\nORDER BY CGPA DESC;",
        },
        {
          name: "GROUP BY",
          explanation:
            "GROUP BY groups rows that have the same values in specified columns.",
          example:
            "SELECT Department, COUNT(*)\nFROM Students\nGROUP BY Department;",
        },
        {
          name: "HAVING",
          explanation:
            "HAVING filters groups created using GROUP BY.",
          example:
            "SELECT Department, COUNT(*)\nFROM Students\nGROUP BY Department\nHAVING COUNT(*) > 2;",
        },
      ],
    },
  ];

  if (selectedTopic) {
    return (
      <section className="learn-page">

        <button
          className="learn-back-button"
          onClick={() => setSelectedTopic(null)}
        >
          <ArrowLeft size={17} />
          Back to Learning Center
        </button>

        <div className="page-heading">
          <span className="eyebrow dark">
            LEARNING CENTER
          </span>

          <h2>{selectedTopic.title}</h2>

          <p>{selectedTopic.description}</p>
        </div>
        <div className="lesson-practice-bar">
  <div>
    <strong>Ready to practice?</strong>
    <span>
      Apply what you learned using the interactive tool.
    </span>
  </div>

  <button
    onClick={() => {
      if (selectedTopic.title === "SQL Set Operations") {
        onNavigate("Set Operations");
      } else if (selectedTopic.title === "Window Functions") {
        onNavigate("Window Functions");
      } else {
        onNavigate("SQL Playground");
      }
    }}
  >
    Practice Now →
  </button>
</div>

        <div className="lesson-grid">
          {selectedTopic.lessons.map((lesson, index) => (
            <div className="lesson-card" key={lesson.name}>

              <div className="lesson-number">
                {index + 1}
              </div>

              <div className="lesson-content">

                <h3>{lesson.name}</h3>

                <p>{lesson.explanation}</p>

                <div className="lesson-example-title">
                  Example
                </div>

                <pre>{lesson.example}</pre>
                {index === selectedTopic.lessons.length - 1 && (
  <button
    className="learn-practice-button"
    onClick={() => {
      if (selectedTopic.title === "SQL Set Operations") {
        onNavigate("Set Operations");
      } else if (selectedTopic.title === "Window Functions") {
        onNavigate("Window Functions");
      } else {
        onNavigate("SQL Playground");
      }
    }}
  >
    Practice This Topic →
  </button>
)}

              </div>

            </div>
          ))}
        </div>

      </section>
    );
  }

  return (
    <section className="learn-page">

      <div className="page-heading">
        <span className="eyebrow dark">
          LEARNING CENTER
        </span>

        <h2>Learn SQL Step by Step</h2>

        <p>
          Understand the concepts first, then practice them
          using the interactive tools.
        </p>
      </div>

      <div className="learn-intro">

        <div className="learn-intro-icon">
          <BookOpen size={26} />
        </div>

        <div>
          <h3>Master SQL Concepts</h3>

          <p>
            Start with the fundamentals and gradually move
            towards set operations and window functions.
          </p>
        </div>

      </div>

      <div className="learn-grid">

        {topics.map((topic) => {
          const Icon = topic.icon;

          return (
            <div
              className="learn-card"
              key={topic.title}
            >

              <div className="learn-card-icon">
                <Icon size={24} />
              </div>

              <h3>{topic.title}</h3>

              <p>{topic.description}</p>

              <div className="topic-list">

                {topic.topics.map((item) => (
                  <span key={item}>
                    {item}
                  </span>
                ))}

              </div>

              <button
                className="learn-card-button"
                onClick={() => setSelectedTopic(topic)}
              >
                Start Learning
                <span>→</span>
              </button>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Learn;