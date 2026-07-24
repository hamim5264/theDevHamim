import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import Lottie from "lottie-react";
import leoAnimation from "../../../assets/leo.json";

// Simple Inline Markdown Parser to render beautiful lists, links, and semibold bolding
function parseInlineStyles(text: string) {
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const segments = text.split(regex);
  
  return segments.map((seg, idx) => {
    if (seg.startsWith('**') && seg.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-purple-400">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    if (seg.startsWith('[') && seg.includes('](') && seg.endsWith(')')) {
      const closeBracket = seg.indexOf(']');
      const label = seg.slice(1, closeBracket);
      const url = seg.slice(closeBracket + 2, -1);
      return (
        <a 
          key={idx} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-purple-400 font-bold hover:underline hover:text-purple-300 transition-colors inline-flex items-center gap-1"
        >
          {label}
        </a>
      );
    }
    return seg;
  });
}

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-2 text-sm leading-relaxed text-gray-200">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-1.5" />;

        // Parse bullet points cleanly with professional bullet indentation
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-');
        if (isBullet) {
          const cleanText = trimmed.replace(/^[•*\-]\s*/, '');
          return (
            <div key={index} className="flex gap-2 items-start pl-1">
              <span className="text-purple-400 mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
              <span className="text-gray-300">
                {parseInlineStyles(cleanText)}
              </span>
            </div>
          );
        }

        return (
          <p key={index} className="text-gray-300">
            {parseInlineStyles(line)}
          </p>
        );
      })}
    </div>
  );
}

export function LeoChatbot() {
  const { personalInfo, projects, skills, timelineEvents } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: "Hey! I'm Leo, Hamim's AI assistant.\n\nAsk me about his projects, skills, or anything else!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || personalInfo?.geminiApiKey;
    console.log("Leo AI Chatbot - Using API Key:", apiKey ? `${apiKey.substring(0, 6)}...` : "NONE");

    if (apiKey && apiKey.trim() !== "") {
      try {
        const systemPrompt = `You are Leo, the dedicated AI assistant of MD. Abdul Hamim (Leon).
Your goal is to answer questions about Hamim perfectly based on the provided context. If a user asks about anything else (general questions, programming help, creative tasks, date/time queries, etc.), answer it brilliantly and helpfully using your general knowledge, but maintain your persona as Leo (Hamim's AI assistant).

Current Date and Time: ${new Date().toLocaleString()}

Here is the authentic information about Hamim:
- Full Name: ${personalInfo.fullName}
- Title: ${personalInfo.title}
- Philosophy: ${personalInfo.philosophy}
- Location: ${personalInfo.location}
- About: ${personalInfo.about}
- Hometown/Background: Born in Rajshahi, got GPA 5.00 in SSC & HSC, B.Sc. in CSE at Daffodil International University, Ostad Flutter training (96.5/100 score).
- Contact: Primary Email is ${personalInfo.email === "hello@thedevhamim.com" ? "hamim.leon@gmail.com" : (personalInfo.email || "hamim.leon@gmail.com")}, Academic/DIU Email is ${personalInfo.emailDIU || "hamim15-5264@diu.edu.bd"}, Phone number is ${personalInfo.phone}, WhatsApp is ${personalInfo.whatsapp}, Telegram is ${personalInfo.telegram}, GitHub is ${personalInfo.github}, LinkedIn is ${personalInfo.linkedin}.
- Family: Father ${personalInfo.fatherName} (${personalInfo.fatherOccupation}), Mother ${personalInfo.motherName}, Sisters: ${personalInfo.sister1Name} (${personalInfo.sister1Edu}) and ${personalInfo.sister2Name} (${personalInfo.sister2Edu}).

Hamim's Career Journey & Workplaces (Timeline):
${timelineEvents?.map(e => `- [${e.year}] ${e.title} (${e.subtitle || ''}): ${e.description} (Category: ${e.type})`).join('\n') || '- Founder of DevEngine, Captain of Team Systemica Intelligence at Beup Tech Agency'}

Projects Hamim has built:
${projects.map(p => `- ${p.name} (${p.category}): ${p.description}. Tech: ${p.tech.join(', ')}. Status: ${p.status}. Impact: ${p.impact}.`).join('\n')}

Technical Stack & Skills:
${skills?.map(s => `- ${s.name} (${s.category}): Level ${s.level}/100`).join('\n') || '- Flutter, Dart, Python, Django, FastAPI, AI/ML, React, Next.js, LangChain, Firebase, PostgreSQL'}

Rules:
1. Answer based directly on the question. Keep responses concise, perfect, natural, professional, and human-like. Do NOT output large walls of text unless the user specifically asks for it.
2. If the user greets you (e.g. 'hi', 'hello', 'hey'), greet them back warmly, introduce yourself briefly as Leo (Hamim's assistant), and ask how you can help. Don't dump details or bios unless asked.
3. Always refer to MD. Abdul Hamim (Leon) in the third person or as "Hamim" or "Leon".
4. If the question is about Hamim (his career, family, projects, experience, education, or skills), do NOT append the assistant note/footer. But if the question is general, unrelated to Hamim, or completely out-of-context (e.g. general code help, math, date/time, weather), you MUST append this exact polite notice at the very end of your response: "*(Note: As Hamim's personal AI assistant, I'm here to help with general queries, but please feel free to ask me anything about Hamim's experience, projects, or skills!)*"
5. When recommending sections of the portfolio or contact channels, output standard markdown redirect links to help users navigate:
   - About Page: [/about](/about)
   - Career Journey/Timeline: [/journey](/journey)
   - Projects List: [/projects](/projects)
   - Skills Universe: [/skills](/skills)
   - Contact Info: [/contact](/contact)
   - DevEngine: [devengine.ai](${personalInfo.businessInfo})
6. Use standard markdown for formatting.`;

        // Format history for Gemini (roles: 'user' and 'model')
        const historySlice = messages.slice(-10);
        const contents = [
          ...historySlice.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          })),
          {
            role: 'user',
            parts: [{ text: userMessage }]
          }
        ];

        // Dynamic fallback models chain
        const models = [
          'gemini-2.5-flash',
          'gemini-3.5-flash-lite',
          'gemini-3.1-flash-lite',
          'gemini-2.5-flash-lite'
        ];

        let data = null;
        let success = false;
        let lastError = "";

        for (const model of models) {
          try {
            console.log(`Leo AI Chatbot - Attempting model: ${model}`);
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  contents,
                  systemInstruction: {
                    parts: [{ text: systemPrompt }]
                  }
                })
              }
            );

            if (response.status === 429) {
              console.warn(`Leo AI Chatbot - Model ${model} rate limited (429). Trying next fallback...`);
              lastError = "Rate Limit (429)";
              continue;
            }

            if (!response.ok) {
              const errData = await response.json().catch(() => ({}));
              console.warn(`Leo AI Chatbot - Model ${model} returned error status: ${response.status}`, errData);
              lastError = `Status ${response.status}`;
              continue;
            }

            data = await response.json();
            success = true;
            console.log(`Leo AI Chatbot - Successfully responded using model: ${model}`);
            break;
          } catch (modelErr: any) {
            console.error(`Leo AI Chatbot - Model ${model} call failed:`, modelErr);
            lastError = modelErr.message || String(modelErr);
          }
        }

        if (!success) {
          throw new Error(`All models in fallback chain failed. Last error: ${lastError}`);
        }

        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to process that. Please try again.";
        setMessages(prev => [...prev, { role: 'assistant', content: generatedText }]);
      } catch (err: any) {
        console.error("Leo AI Chatbot - Gemini API call failed:", err);
        const fallbackResponse = generateResponse(userMessage);
        let cleanErr = "Gemini API call encountered an issue.";
        if (err.message && err.message.includes("429")) {
          cleanErr = "Leo AI is temporarily busy (Free Tier Rate Limit exceeded).";
        } else if (err.message && err.message.includes("403")) {
          cleanErr = "Leo AI authentication failed (Invalid API Key).";
        }
        setMessages(prev => [...prev, { role: 'assistant', content: `*(${cleanErr} Falling back to local offline mode.)*\n\n${fallbackResponse}` }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      console.warn("Leo AI Chatbot - Gemini API key is missing or empty.");
      setTimeout(() => {
        const response = generateResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: `*(Warning: Gemini API Key is missing or empty. Please save it in settings or .env file. Falling back to local offline mode.)*\n\n${response}` }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes('project') || q.includes('work')) {
      return "Hamim has built several production systems including Qari 24/7 (AI Quran learning), Epic NZ Travel (booking platform), Kick360 (sports analytics), and AI Reservation System serving thousands of users. Each project combines Flutter, AI, and backend technologies to solve real problems.";
    }
    if (q.includes('skill') || q.includes('tech')) {
      return "Hamim specializes in Flutter for mobile development, Python/FastAPI for backends, AI/ML with LangChain and OpenAI, plus React, Firebase, PostgreSQL, and DevOps. He's a full-stack engineer with strong AI automation capabilities.";
    }
    if (q.includes('experience') || q.includes('career')) {
      return "Hamim trained with Ostad, worked at Beup Tech Agency, became Team Captain at Systemica Intelligence, and founded DevEngine. He's been shipping production code since 2021 and has led multiple enterprise projects.";
    }
    if (q.includes('ai') || q.includes('artificial intelligence')) {
      return "AI is Hamim's passion! He builds AI agents, voice assistants, LangChain workflows, and intelligent automation systems. From GPT integrations to custom ML models, he creates production-ready AI solutions that deliver real value.";
    }
    if (q.includes('flutter')) {
      return "Flutter is one of Hamim's core strengths. He's built multiple production Flutter apps including Qari 24/7, Epic NZ Travel, Kick360, and more. He loves Flutter for its cross-platform capabilities and beautiful UI potential.";
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('reach')) {
      return "You can reach Hamim at hamim@devengine.ai or connect on GitHub and LinkedIn. He's always open to discussing new projects, collaborations, or opportunities to build innovative solutions!";
    }

    return "That's a great question! Hamim is a full-stack software engineer specializing in Flutter, AI, and production systems. He's passionate about building scalable solutions and has shipped multiple apps serving thousands of users. What specific aspect would you like to know more about?";
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-300 z-50 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <Lottie animationData={leoAnimation} loop={true} className="w-12 h-12" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-black"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-28 right-8 w-96 h-[600px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-black"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">Leo</h3>
                  <p className="text-xs text-purple-400 font-mono">Leo v2.5</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {i === 0 && message.role === 'assistant' ? (
                      <div className="space-y-2">
                        <p className="text-base font-bold text-purple-400">
                          Hey! I'm Leo, Hamim's AI assistant.
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          Ask me about his projects, skills, or anything else!
                        </p>
                      </div>
                    ) : message.role === 'user' ? (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    ) : (
                      <FormattedMessage content={message.content} />
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Hamim's journey..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-white/10 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Knowledge Base
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
