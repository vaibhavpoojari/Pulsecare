import React, { useState } from "react";
import {
  SparklesIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  HeartIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { generateHealthReportPDF } from "../../utils/pdfGenerator";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";

const samplePrompts = [
  "I have a mild headache and tiredness since morning",
  "What are normal fasting blood glucose ranges?",
  "Tips to manage high blood pressure naturally",
  "When should I see a doctor for a cough?",
];

const mockKnowledgeBase = {
  headache: {
    triageLevel: "Low to Moderate",
    considerations: "Tension headache, dehydration, lack of sleep, or eye strain.",
    recommendations: [
      "Drink 500ml of water and rest in a dim room.",
      "Track symptoms over the next 4 to 6 hours.",
      "Consult a doctor if accompanied by sudden high fever, stiff neck, or vision changes.",
    ],
  },
  glucose: {
    triageLevel: "Informational",
    considerations: "Normal fasting blood glucose levels range between 70 mg/dL and 99 mg/dL.",
    recommendations: [
      "Maintain regular meals with complex carbohydrates.",
      "Log your glucose readings in the Health Logs section.",
      "Discuss readings consistently above 126 mg/dL with Dr. Sarah Johnson.",
    ],
  },
  pressure: {
    triageLevel: "Informational & Preventive",
    considerations: "Optimal Blood Pressure is around 120/80 mmHg.",
    recommendations: [
      "Reduce sodium intake below 2,000 mg per day.",
      "Engage in 30 minutes of daily moderate aerobic exercise.",
      "Monitor readings weekly and share trend logs with your cardiologist.",
    ],
  },
  default: {
    triageLevel: "General Advisory",
    considerations: "Symptoms evaluated by PulseCare AI Assistant.",
    recommendations: [
      "Stay hydrated and monitor your vitals closely.",
      "Schedule a consultation with your primary physician if symptoms persist.",
      "Use our PDF exporter to share your vital trend logs with your care team.",
    ],
  },
};

export default function AIHealthAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello ${user?.name || "Patient"}! I am your PulseCare AI Health Assistant. How can I assist with your symptoms or wellness today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [triageCard, setTriageCard] = useState(null);

  const analyzeSymptom = (text) => {
    const lower = text.toLowerCase();
    let result = mockKnowledgeBase.default;

    if (lower.includes("headache") || lower.includes("tired")) {
      result = mockKnowledgeBase.headache;
    } else if (lower.includes("glucose") || lower.includes("sugar")) {
      result = mockKnowledgeBase.glucose;
    } else if (lower.includes("pressure") || lower.includes("bp") || lower.includes("hypertension")) {
      result = mockKnowledgeBase.pressure;
    }

    setTriageCard({
      query: text,
      triageLevel: result.triageLevel,
      considerations: result.considerations,
      recommendations: result.recommendations,
    });
  };

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (textToSend === input) setInput("");
    setIsThinking(true);

    setTimeout(() => {
      analyzeSymptom(textToSend);
      const aiReply = {
        sender: "ai",
        text: `I have analyzed "${textToSend}". Please review the structured clinical advisory card below for recommendations.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsThinking(false);
    }, 900);
  };

  const handlePromptClick = (promptText) => {
    handleSend(promptText);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-inner">
            <SparklesIcon className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold font-heading flex items-center gap-2">
              PulseCare AI Assistant
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-semibold tracking-wider uppercase">
                v1.0
              </span>
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Instant AI symptom triage, wellness guidance, and clinical insight. Developed by Vaibhava G.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            generateHealthReportPDF(user || {});
            toast.success("Downloading PDF Health Summary...");
          }}
          className="px-5 py-3 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold text-sm transition shadow-lg flex items-center space-x-2 whitespace-nowrap"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>Download Health PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Panel */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 flex flex-col h-[580px]">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-sm text-gray-900 dark:text-gray-100 font-heading">
                Live AI Consultation Thread
              </span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              HIPAA Encrypted
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none shadow-md"
                      : "bg-slate-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-slate-200/80 dark:border-gray-700"
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1.5 font-medium ${
                      m.sender === "user" ? "text-emerald-100 text-right" : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-gray-800 p-4 rounded-2xl text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                  <ArrowPathIcon className="w-4 h-4 animate-spin text-emerald-500" />
                  <span>PulseCare AI is evaluating symptoms...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Selector */}
          <div className="py-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 overflow-x-auto custom-scrollbar">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(p)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold rounded-xl whitespace-nowrap transition border border-gray-200 dark:border-gray-700"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 mt-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your symptoms or health question..."
              className="input-base flex-1"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Clinical Advisory Card */}
        <div className="glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
              <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 font-heading">
                AI Advisory Summary
              </h3>
            </div>

            {triageCard ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider block">
                    Evaluated Query
                  </span>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">
                    "{triageCard.query}"
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                    Risk Triage Level
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 inline-block">
                    {triageCard.triageLevel}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                    Clinical Considerations
                  </span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-slate-50 dark:bg-gray-800 p-3 rounded-xl">
                    {triageCard.considerations}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                    Recommended Steps
                  </span>
                  <ul className="space-y-2">
                    {triageCard.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400 dark:text-gray-500">
                <ExclamationTriangleIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-medium">
                  Ask a question or select a prompt to view AI triage assessment.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-[10px] text-gray-400 dark:text-gray-500 leading-normal">
            <strong>Disclaimer:</strong> PulseCare AI is an advisory tool and does not replace emergency medical care. If experiencing a life-threatening emergency, please call emergency services immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
