"use client";

import { useEffect, useRef, useState } from "react";

const questions = ["What is Quantix?", "How do I join?", "Do I need experience?"];

function getReply(question: string) {
  const normalized = question.toLowerCase();
  if (/join|member|sign up/.test(normalized)) return "We'd love to meet you! Quantix welcomes curious people at every experience level. Use “Start a conversation” below to reach out and find your way in.";
  if (/experience|beginner|background/.test(normalized)) return "No experience needed. Start from zero, ask every question, and learn with the community. Try the interactive qubit simulator in the Learning Dimension!";
  if (/event|workshop|when/.test(normalized)) return "We host hands-on sessions, circuit jams, research show & tells, and casual quantum coffee chats. Dates are shared with the community first.";
  if (/research|project|vqe/.test(normalized)) return "We're exploring quantum machine learning, algorithms, quantum security, and VQE. Visit the Research Lab to follow the questions.";
  if (/what is quantix|quantix/.test(normalized)) return "Quantix is a quantum computing community for curious minds. We learn together, experiment with ideas, explore research, and make room for anyone excited to ask “what if?”";
  if (/quantum|qubit|superposition/.test(normalized)) return "Quantum computing uses ideas from quantum physics to process information in new ways. Try the interactive Hadamard gate simulator to see superposition in action.";
  return "That's a great question to bring to the community. Quantix is a place to explore, learn, and figure things out together. Ask me about getting started, events, learning, or research.";
}

type Message = { text: string; from: "guide" | "user" };

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey there! 👋 I'm the Quantix guide. Curious about quantum, the community, or where to start?", from: "guide" }
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function send(text: string) {
    const question = text.trim();
    if (!question) return;
    setInput("");
    setMessages((current) => [
      ...current,
      { text: question, from: "user" },
      { text: getReply(question), from: "guide" }
    ]);
  }

  return (
    <>
      <button ref={launcherRef} className="assistant-launcher" type="button" aria-expanded={open} aria-label="Chat with the Quantix guide" onClick={() => setOpen((value) => !value)}>
        <span className="assistant-orb"><span /><span /><span /></span><span className="assistant-label">Ask the guide</span>
      </button>
      <aside className={`assistant-panel${open ? " is-open" : ""}`} aria-label="Quantix quantum guide" aria-hidden={!open} inert={!open}>
        <div className="assistant-header">
          <div className="assistant-avatar">Q<span /></div>
          <div><strong>Your quantum guide</strong><span><i className="status-dot" /> HERE TO HELP</span></div>
          <button className="assistant-close" type="button" aria-label="Close guide" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="assistant-messages" ref={listRef} aria-live="polite">
          {messages.map((message, index) => <div className={`chat-message chat-message--${message.from}`} key={`${index}-${message.from}`}>{message.text}</div>)}
        </div>
        <div className="quick-questions">{questions.map((question) => <button type="button" key={question} onClick={() => send(question)}>{question}</button>)}</div>
        <form className="assistant-form" onSubmit={(event) => { event.preventDefault(); send(input); }}>
          <label className="sr-only" htmlFor="assistant-input">Ask the Quantix guide a question</label>
          <input id="assistant-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask me anything…" autoComplete="off" />
          <button type="submit" aria-label="Send message">↑</button>
        </form>
        <p className="assistant-note">A friendly guide, not a quantum oracle.</p>
      </aside>
    </>
  );
}
