import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Brain, Cpu, MessageSquare } from "lucide-react";
import Lottie from "lottie-react";
import leoAnimation from "../../../assets/leo.json";
import { usePortfolio } from "../context/PortfolioContext";

// Simple Inline Markdown Parser to render beautiful, organized, professional lists and links
function parseInlineStyles(text: string) {
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const segments = text.split(regex);
  
  return segments.map((seg, idx) => {
    if (seg.startsWith('**') && seg.endsWith('**')) {
      return (
        <strong key={idx} className="font-extrabold text-white">
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
    <div className="space-y-2.5 text-sm md:text-base leading-relaxed text-gray-200">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;

        // Parse bullet points cleanly with professional bullet indentation
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-');
        if (isBullet) {
          const cleanText = trimmed.replace(/^[•*\-]\s*/, '');
          return (
            <div key={index} className="flex gap-2.5 items-start pl-2">
              <span className="text-purple-400 mt-2.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
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

export function LeoAssistant() {
  const { personalInfo, projects } = usePortfolio();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: `Hi, I'm Leo! 🤖 I know absolutely everything about Hamim's software engineering background, B.Sc. studies at Daffodil International University, Ostad Flutter training, professional projects, family info, and career journey. Ask me anything!\n\nTry asking me:\n• Tell me about Hamim's background & hometown\n• What projects has he built and what is their status?\n• What are his technical skills & specialties?\n• Who are his family members & sisters?\n• How can I contact or hire him?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();

    // Out of context scanner: Checks if the user is asking about unrelated generic things
    const relevantKeywords = [
      'hamim', 'leon', 'abdul', 'portfolio', 'project', 'skill', 'tech', 'stack',
      'experience', 'career', 'work', 'background', 'story', 'journey', 'about', 'who is',
      'ai', 'artificial intelligence', 'machine learning', 'flutter', 'contact', 'hire',
      'reach', 'email', 'future', 'goal', 'vision', 'next', 'devengine', 'liza', 'lima',
      'sister', 'family', 'father', 'mother', 'salim', 'aktara', 'education', 'diu', 'daffodil',
      'ostad', 'hometown', 'rajshahi', 'dhaka', 'banasree', 'blood', 'nid', 'phone', 'whatsapp',
      'github', 'linkedin', 'facebook', 'instagram', 'twitter', 'discord', 'telegram'
    ];

    const isRelevant = relevantKeywords.some(keyword => q.includes(keyword));

    if (!isRelevant) {
      return `I am Leo, Hamim's dedicated AI assistant. 🤖\n\nMy knowledge is focused strictly on Hamim's software engineering background, B.Sc. studies at Daffodil International University, Ostad Flutter training, professional projects, family info, and career journey.\n\nSince your question is out of my context, I am unable to answer. Please feel free to ask me anything about Hamim's skills, or connect with him directly via the Contact section! 📧`;
    }

    // 1. Personal / Family Info Matches
    if (q.includes('sister') || q.includes('liza') || q.includes('lima') || q.includes('shahina') || q.includes('shirajom')) {
      return `Hamim has two elder sisters with outstanding academic backgrounds:\n\n• **${personalInfo.sister1Name || "Shahina Akter Liza"}**\n  *Education:* ${personalInfo.sister1Edu || "Master of Science (M.Sc.) – Entomology, Rajshahi College, National University (2013 | First Class)"}\n  *Details:* Instilled in Hamim early scientific curiosity, database organization, and strict research practices.\n\n• **${personalInfo.sister2Name || "Shirajom Monira Lima"}**\n  *Education:* ${personalInfo.sister2Edu || "Masters Of Social Science, Rajshahi New Govt. Degree College (2019)"}\n  *Details:* Guided his social skills, project management, and public communication strategy.`;
    }

    if (q.includes('family') || q.includes('father') || q.includes('mother') || q.includes('salim') || q.includes('reza') || q.includes('aktara') || q.includes('beum')) {
      return `Hamim comes from a very supportive family:\n\n• **Father:** ${personalInfo.fatherName || "MD. SALIM REZA"}\n  *Occupation:* ${personalInfo.fatherOccupation || "Business Man (Electric Shop)"}\n  *Mobile:* ${personalInfo.fatherMobile || "01716303414"}\n  *Role:* Business leader running their family electronics store. Teaches Hamim operational discipline, work ethics, and electronic logic systems.\n\n• **Mother:** ${personalInfo.motherName || "MST. AKTARA BEUM"}\n  *Occupation:* ${personalInfo.motherOccupation || "Housewife"}\n  *Mobile:* ${personalInfo.motherMobile || "01783176394"}\n  *Role:* The emotional foundation of the family, supporting his creative software endeavors.\n\n• **Sisters:** He has two elder sisters: Shahina Akter Liza (M.Sc. Entomology) and Shirajom Monira Lima (Masters of Social Science).`;
    }

    if (q.includes('background') || q.includes('about hamim') || q.includes('who is') || q.includes('story') || q.includes('journey')) {
      return `**MD. Abdul Hamim Leon** is a Software Developer and AI specialist:\n\n• **Hometown & Journey:** Born and raised in Rajshahi, achieving a perfect GPA 5.00/5.00 in SSC & HSC studies (Rajshahi Board) before moving to Dhaka for higher studies.\n• **Education:** Completed B.Sc. in Computer Science & Engineering at Daffodil International University (DIU).\n• **Professional Milestones:** Graduated from Ostad's Pro Flutter training program with a stellar 96.5/100 score, joined Beup Tech Agency, and rose to Captain of Team Systemica Intelligence.\n• **Entrepreneurship:** Founder of DevEngine, building modern AI workflows and scalable solutions.\n• **Philosophy:** "${personalInfo.philosophy || "THE FUTURE ISN'T SOMETHING WE ENTER. THE FUTURE IS SOMETHING WE CREATE."}"\n\nHe has built multiple production systems serving thousands of users!`;
    }

    if (q.includes('education') || q.includes('diu') || q.includes('daffodil') || q.includes('ostad') || q.includes('gpa') || q.includes('grade')) {
      return `Hamim has a robust academic and professional training background:\n\n• **Daffodil International University (DIU):** B.Sc. in Computer Science & Engineering.\n• **Ostad Pro Batch Flutter Training:** Graduated with an outstanding score of **96.5 out of 100**, mastering advanced Riverpod, Provider, Clean Architecture, and API integrations.\n• **SSC & HSC Studies (Rajshahi Board):** Secured a perfect **GPA 5.00 out of 5.00** with a strong focus on scientific methodologies.\n\nHis academic base combined with intense production experience makes him highly skilled in systems engineering.`;
    }

    if (q.includes('hometown') || q.includes('rajshahi') || q.includes('dhaka') || q.includes('residence') || q.includes('address') || q.includes('location')) {
      return `Here is Hamim's location information:\n\n• **Current Residence:** Banasree, Rampura, Dhaka-1219, Bangladesh. This is where he operates DevEngine and manages active engineering workflows.\n• **Permanent Address:** Nongola, Post Code: 6320, City: Chapainawabganj, Rajshahi, Bangladesh.\n• **Hometown:** Grew up in Rajshahi, developing his scientific and mathematical foundation under the Rajshahi Board before relocating to Dhaka.`;
    }

    if (q.includes('blood') || q.includes('nid') || q.includes('birth') || q.includes('born')) {
      return `Here are Hamim's key personal statistics:\n\n• **Date of Birth:** November 10, 2002\n• **Blood Group:** A+\n• **Nationality:** Bangladeshi\n• **NID Number:** 6010606058\n• **Present Address:** Banasree, Rampura, Dhaka-1219`;
    }

    // 2. Project Catalog Matches (Dynamically lists projects from state)
    for (const project of projects) {
      const pId = project.id.toLowerCase();
      const pName = project.name.toLowerCase();
      if (q.includes(pId) || q.includes(pName.split(' ')[0]) || q.includes(pName.split(' ')[1] || "___")) {
        return `Here is the dynamic live information for **${project.name}**:\n\n• **Category:** ${project.category}\n• **Tech Stack:** ${project.tech.join(', ')}\n• **Key Descriptor:** ${project.impact}\n• **Status:** ${project.status === 'Live' ? '🟢 Live Project' : '🛠️ Under Development'}\n• **Last Updated:** ${project.lastUpdated}\n\n*Description:* ${project.description}`;
      }
    }

    if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('app')) {
      const liveProjects = projects.filter(p => p.status === 'Live');
      const devProjects = projects.filter(p => p.status !== 'Live');

      return `Hamim has built a rich portfolio of **${projects.length} dynamic projects** synced live from Firestore:\n\n**🟢 LIVE SYSTEMS (${liveProjects.length}):**\n${liveProjects.map(p => `• **${p.name}** (*${p.impact}*)\n  Tech: ${p.tech.slice(0, 4).join(', ')}`).join('\n')}\n\n**🛠️ UNDER DEVELOPMENT (${devProjects.length}):**\n${devProjects.map(p => `• **${p.name}** (*${p.impact}*)\n  Tech: ${p.tech.join(', ')}`).join('\n')}\n\n*Ask me about any specific project name to get more deep technical details!*`;
    }

    // 3. Technical Skills
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('program') || q.includes('language')) {
      return `Hamim is a highly competent systems engineer specializing in:\n\n• **Mobile Development:** Flutter, Dart, Riverpod, Provider, Clean Architecture, State Management.\n• **AI & Automation:** LangChain, OpenAI GPT models, Speech Recognition, Vector Databases (ChromaDB), Automation scripts.\n• **Backend & Databases:** Django, Python, FastAPI, PostgreSQL, Supabase, Firebase (Auth/Firestore/Storage).\n• **Web Engineering:** React.js, Next.js, Tailwind CSS, REST APIs.\n\nHis stack is completely production-ready and fully scalable!`;
    }

    if (q.includes('flutter')) {
      return `Flutter is Hamim's ultimate superpower! 🚀\n\nHe has built multiple enterprise and consumer-facing applications, serving thousands of live users. His experience includes:\n• Advanced State Management (Riverpod, Provider, GetX)\n• Complete offline support using Hive/SQLite\n• Real-time notifications and Firestore sync\n• Payment Gateway Integrations (Stripe, SSLCommerz)\n• Native hardware integrations and animations\n\n*Ask me about projects like Qari, Kick360, Epic NZ Travel, or Khazna to see his Flutter expertise in action!*`;
    }

    if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('machine learning') || q.includes('openai') || q.includes('langchain')) {
      return `Hamim is heavily involved in generative AI and intelligence systems:\n\n• **CRM Calling Agents:** AI voice agents handling 50K+ live calls.\n• **AI Receptionist & Appointment Systems:** Uses OpenAI, LangChain, and ChromaDB for natural conversation and appointment booking.\n• **Quranic Speech Recognition:** Implemented in Qari app for voice-activated learning.\n• **Lineage.ai:** A dynamic storytelling AI avatar that family members can converse with.\n• **Machine Learning:** Built classification CNN models and clinical predictive systems with 99%+ accuracy.`;
    }

    // 4. Contact Details
    if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('linkedin') || q.includes('github')) {
      return `You can connect with Hamim instantly using his official live contact channels:\n\n📧 **Personal Email:** ${personalInfo.email}\n📧 **Academic Email:** ${personalInfo.emailDIU}\n📱 **Phone / Telegram:** ${personalInfo.phone}\n💬 **WhatsApp:** [Message Hamim](https://wa.me/${personalInfo.whatsapp.replace('+', '')})\n🐙 **GitHub:** [hamim5264](${personalInfo.github})\n💼 **LinkedIn:** [Abdul Hamim](${personalInfo.linkedin})\n💻 **DevEngine Portal:** [devengine.ai](${personalInfo.businessInfo})\n\nFeel free to reach out for startup collaborations, development consulting, or professional opportunities!`;
    }

    // 5. Vision / Future
    if (q.includes('future') || q.includes('goal') || q.includes('vision') || q.includes('philosoph')) {
      return `Hamim's operational mindset:\n\n• **Philosophy:** "${personalInfo.philosophy}"\n• **Technical Ambition:** Build massive AI tools that automate code generation, scale systems, and impact millions of people positively.\n• **DevEngine Vision:** Scale DevEngine to serve as a top-tier premium software hub, bridging Flutter apps, Django servers, and state-of-the-art AI automation models.\n\nHe doesn't just write code; he constructs platforms for the future.`;
    }

    if (q.includes('devengine')) {
      return `**DevEngine** is Hamim's active software marketplace and engineering hub:\n\n• *Vercel Portal:* [devengine-three.vercel.app](${personalInfo.businessInfo || "https://devengine-three.vercel.app/"})\n• *Stack:* React.js, Tailwind CSS, Express, MongoDB, REST APIs.\n• *Mission:* Connect enterprise clients with top-tier developers and implement smart contract managers for developers worldwide.\n\nIt stands as a testament to his drive for innovation and team leadership.`;
    }

    // Fallback response
    return `Hi! I'm Leo. I can answer anything about Hamim. Based on his live profile:\n\n• He is a **${personalInfo.title}** from **Rajshahi**, currently living in **Banasree, Dhaka**.\n• He graduated from **Daffodil International University (DIU)** in CSE and Ostad's Pro Flutter training.\n• He is the Captain of Team Systemica Intelligence at Beup Tech Agency.\n• He has successfully built **${projects.length} scalable projects** (including Qari, Kick360, Epic NZ Travel, and DevEngine).\n\nAsk me more specific questions about:\n• His sisters (Liza, Lima) and family support system\n• Specific project tech stacks and details\n• Career experiences or technical skills\n• Contact details and live social links\n• Personal details like date of birth, blood group, NID number`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden">
      <Navigation />

      {/* Global Embedded Styles for Custom Glassmorphic Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative pt-28 px-4 md:px-6 pb-6 flex-1 flex flex-col justify-center items-center z-10 max-w-6xl mx-auto w-full">
        <div className="w-full grid lg:grid-cols-12 gap-8 items-stretch flex-1">
          
          {/* Left Column: Big Lottie Logo & Brand Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center items-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-3xl -top-20 -left-20 pointer-events-none" />
            <div className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl -bottom-20 -right-20 pointer-events-none" />

            {/* Glowing Big Lottie Animation */}
            <div className="w-64 h-64 md:w-80 md:h-80 relative group mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <Lottie 
                animationData={leoAnimation} 
                loop={true} 
                className="w-full h-full relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-widest uppercase font-bold inline-flex items-center gap-1.5 mb-4">
                <Brain className="w-3.5 h-3.5" /> hamim's core intelligence
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase bg-gradient-to-r from-white via-gray-300 to-purple-400 bg-clip-text text-transparent">
                LEO AI ASSISTANT
              </h1>
              <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
                Ask me about Hamim's experience, skills, live projects, or startup roadmap!
              </p>
            </div>
          </motion.div>

          {/* Right Column: Premium Glassmorphic Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Lottie animationData={leoAnimation} loop={true} className="w-8 h-8" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base tracking-wide uppercase">LEO</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3 animate-spin" /> Active & Synced live with Firestore
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[50vh] lg:max-h-[58vh] custom-scrollbar">
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
                        : 'bg-white/5 border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.2)]'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <p className="text-sm md:text-base leading-relaxed tracking-wide">
                        {message.content}
                      </p>
                    ) : (
                      <FormattedMessage content={message.content} />
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-2">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15
                        }}
                        className="w-2.5 h-2.5 bg-purple-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-white/10 bg-white/[0.02]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Hamim's experience, skills, or projects..."
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all tracking-wide text-sm md:text-base"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:from-white/10 disabled:to-white/10 disabled:text-gray-500 disabled:cursor-not-allowed transition-all font-semibold tracking-wide flex items-center justify-center shadow-lg hover:shadow-purple-500/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center tracking-wide flex items-center justify-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Powered by Hamim's Portfolio Engine • Synced Live
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
