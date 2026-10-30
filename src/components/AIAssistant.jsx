import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");

  const sendQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setAskedQuestion(question);
      setResponse("Thinking...");

      const result = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setResponse(data.answer);

      const oldHistory = JSON.parse(
        localStorage.getItem("sqlviz_history") || "[]"
      );

      localStorage.setItem(
        "sqlviz_history",
        JSON.stringify([
          {
            type: "AI Assistant",
            query: question,
            time: new Date().toLocaleString(),
          },
          ...oldHistory,
        ])
      );

      setQuestion("");
    } catch (error) {
      console.error("AI ERROR:", error);
      setResponse(`AI connection failed: ${error.message}`);
    }
  };

  return (
    <section className="ai-assistant-page">
      <div className="section-title">
        <h2>AI Assistant</h2>
        <p>Ask questions, generate SQL, explain queries and fix errors.</p>
      </div>

      <div className="ai-chat-card">
        <div className="ai-chat-header">
          <div className="ai-avatar">✨</div>

          <div>
            <h3>SQLViz AI</h3>
            <span>SQL Learning Assistant</span>
          </div>
        </div>

        {!response && (
          <div className="ai-welcome">
            <h3>How can I help you?</h3>
            <p>
              Ask about SQL, DBMS concepts, Set Operations or Window Functions.
            </p>
          </div>
        )}

        <div className="ai-input-area">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendQuestion();
              }
            }}
            placeholder="Ask SQLViz AI anything about SQL..."
          />

          <button
            type="button"
            className="ai-send-btn"
            onClick={sendQuestion}
          >
            Send →
          </button>
        </div>

        {response && (
  <div className="ai-response">

    <div className="ai-question">
      <div className="ai-question-label">QUESTION</div>
      <div className="ai-question-text">
        {askedQuestion}
      </div>
    </div>

    <div className="ai-response-title">
      <span>✨</span>
      <strong>SQLViz AI</strong>
    </div>

    <div className="ai-response-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h3 className="ai-answer-heading">{children}</h3>
                  ),
                  h2: ({ children }) => (
                    <h3 className="ai-answer-heading">{children}</h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="ai-answer-subheading">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="ai-answer-paragraph">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="ai-answer-list">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="ai-answer-list">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="ai-answer-list-item">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="ai-answer-bold">{children}</strong>
                  ),
                  code: ({ inline, className, children }) => {
                    if (inline) {
                      return (
                        <code className="ai-inline-code">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <pre className="ai-sql-code">
                        <code>{children}</code>
                      </pre>
                    );
                  },
                  pre: ({ children }) => <>{children}</>,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AIAssistant;