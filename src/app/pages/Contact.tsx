import React, { useRef, useState } from "react";
import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Download, MessageCircle, ExternalLink, Send, Phone, MessageSquare, Compass, Globe, Youtube, Video, Share2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { usePortfolio } from "../context/PortfolioContext";

export function Contact() {
  const { personalInfo, customSocialLinks } = usePortfolio();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    message: ""
  });

  const getSocialIcon = (name: string, isSmall = false) => {
    const n = name.toLowerCase();
    const sizeClass = isSmall ? "w-5 h-5" : "w-8 h-8";
    if (n.includes("youtube")) return <Youtube className={sizeClass} />;
    if (n.includes("email") || n.includes("mail")) return <Mail className={sizeClass} />;
    if (n.includes("github")) return <Github className={sizeClass} />;
    if (n.includes("linkedin")) return <Linkedin className={sizeClass} />;
    if (n.includes("whatsapp")) return <MessageCircle className={sizeClass} />;
    if (n.includes("phone")) return <Phone className={sizeClass} />;
    if (n.includes("video")) return <Video className={sizeClass} />;
    return <Globe className={sizeClass} />;
  };

  const getGlowColorClasses = (colorName = "red") => {
    switch (colorName.toLowerCase()) {
      case "red":
        return {
          icon: "text-red-400 bg-red-500/10 border-red-500/30",
          card: "hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        };
      case "blue":
        return {
          icon: "text-blue-400 bg-blue-500/10 border-blue-500/30",
          card: "hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        };
      case "green":
        return {
          icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
          card: "hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        };
      case "purple":
        return {
          icon: "text-purple-400 bg-purple-500/10 border-purple-500/30",
          card: "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        };
      case "pink":
        return {
          icon: "text-pink-400 bg-pink-500/10 border-pink-500/30",
          card: "hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]"
        };
      case "amber":
      case "orange":
        return {
          icon: "text-amber-400 bg-amber-500/10 border-amber-500/30",
          card: "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        };
      case "cyan":
        return {
          icon: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
          card: "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        };
      default:
        return {
          icon: "text-purple-400 bg-purple-500/10 border-purple-500/30",
          card: "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        };
    }
  };

  // Build hero cards from customSocialLinks or fallbacks
  const heroLinks = customSocialLinks.filter(l => l.category === "main");
  const mainCards = heroLinks.length > 0 ? heroLinks.map(l => ({
    icon: getSocialIcon(l.name),
    label: l.name.toUpperCase(),
    value: l.handleOrValue || l.name,
    description: l.description || l.url,
    link: l.url,
    color: l.color || (l.name.toLowerCase().includes("github") ? "purple" : l.name.toLowerCase().includes("whatsapp") ? "green" : "blue")
  })) : [
    {
      icon: <Mail className="w-8 h-8" />,
      label: "EMAIL",
      value: personalInfo.email || "hamim.leon@gmail.com",
      description: "Best way to reach me for inquiries",
      link: `mailto:${personalInfo.email || "hamim.leon@gmail.com"}`,
      color: "blue"
    },
    {
      icon: <Github className="w-8 h-8" />,
      label: "GITHUB",
      value: personalInfo.github ? personalInfo.github.replace("https://", "") : "github.com/hamim5264",
      description: "Check out my open source contributions",
      link: personalInfo.github || "https://github.com/hamim5264",
      color: "purple"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      label: "LINKEDIN",
      value: "Connect professionally",
      description: personalInfo.linkedin ? personalInfo.linkedin.replace("https://www.", "") : "linkedin.com/in/abdul-hamim-a35b02253",
      link: personalInfo.linkedin || "https://www.linkedin.com/in/abdul-hamim-a35b02253/",
      color: "blue"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      label: "WHATSAPP",
      value: personalInfo.whatsapp || "+8801724879284",
      description: "Quick messaging for urgent matters",
      link: `https://wa.me/${(personalInfo.whatsapp || "8801724879284").replace(/\+/g, "")}`,
      color: "green"
    },
  ];

  // Build grid links for additional networks
  const gridLinks = customSocialLinks.filter(l => l.category === "social" || l.category === "other");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    // Format current local time beautifully for EmailJS template variable {{time}}
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "medium",
      timeStyle: "short"
    });

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      message: formData.message,
      time: currentTime
    };

    emailjs.send(
      "service_4yl6voe",
      "template_hjh29ya",
      templateParams,
      "1EjxPg3_raS1xxgZ9"
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", title: "", message: "" });
    })
    .catch((err) => {
      console.error("FAILED...", err);
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-black to-black pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight uppercase">
              LET'S CONNECT
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed tracking-wide max-w-3xl mx-auto">
              Have a project in mind? Want to scale an AI assistant or a cross-platform mobile app? Shoot me a message!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content (Grid layout for Contact Form & Cards) */}
      <section className="relative py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left side: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold tracking-wide">SEND A MESSAGE</h2>
              </div>

              <form onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all duration-300 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all duration-300 placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +880 1712 345678"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all duration-300 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Subject / Title *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Subject of message"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all duration-300 placeholder-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or vision..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all duration-300 placeholder-gray-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-lg transition-all duration-300 font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>SENDING MESSAGE...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>

                {success && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 font-medium text-center"
                  >
                    Thank you! Your message has been sent successfully. I will get back to you shortly.
                  </motion.p>
                )}

                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 font-medium text-center"
                  >
                    Oops! Something went wrong while sending your message. Please try again later.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Right side: Contact Details & Links */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                {mainCards.map((contact, i) => (
                  <motion.a
                    key={contact.label}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${contact.color}-500/10 text-${contact.color === 'orange' ? 'amber' : contact.color}-400`}>
                        {contact.icon}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xs text-gray-400 mb-1 tracking-wider">{contact.label}</h3>
                    <p className="text-xl font-bold mb-1 tracking-wide">{contact.value}</p>
                    <p className="text-sm text-gray-400 tracking-wide">{contact.description}</p>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Other channels */}
      <section className="relative py-20 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
            <Compass className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold tracking-tight">ADDITIONAL NETWORKS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(gridLinks.length > 0 ? gridLinks : [
              { name: "Facebook", url: personalInfo.facebook || "https://www.facebook.com/hamim.leon", handleOrValue: "hamim.leon", color: "blue" },
              { name: "Instagram", url: personalInfo.instagram || "https://www.instagram.com/hamimleon/", handleOrValue: "@hamimleon", color: "pink" },
              { name: "Twitter / X", url: personalInfo.twitter || "https://x.com/HamimLeon42320", handleOrValue: "@HamimLeon42320", color: "cyan" },
              { name: "Threads", url: personalInfo.threads || "https://www.threads.net/@hamimleon", handleOrValue: "@hamimleon", color: "purple" },
              { name: "Discord", url: personalInfo.discord || "#", handleOrValue: "hamim_27693", color: "purple" },
              { name: "Microsoft Teams", url: `mailto:${personalInfo.email}`, handleOrValue: personalInfo.email, color: "blue" },
              { name: "University Email", url: `mailto:${personalInfo.emailDIU}`, handleOrValue: personalInfo.emailDIU, color: "green" },
              { name: "Business Platform", url: personalInfo.businessInfo || "https://devengine-three.vercel.app/", handleOrValue: "devengine-three", color: "amber" },
            ]).map((item: any, i) => {
              const style = getGlowColorClasses(item.color || (item.name.toLowerCase().includes("youtube") ? "red" : "purple"));
              return (
                <a
                  href={item.url}
                  target="_blank"
                  key={i}
                  rel="noopener noreferrer"
                  className={`group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 block ${style.card}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${style.icon}`}>
                      {getSocialIcon(item.name, true)}
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xs text-gray-400 font-mono tracking-wider uppercase mb-1">{item.name}</h4>
                  <p className="text-sm font-semibold tracking-wide text-gray-200 group-hover:text-white truncate">{item.handleOrValue}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">PREFER TO CHAT WITH AI?</h2>
            <p className="text-lg text-gray-400 mb-8 tracking-wide">
              Talk to Leo, my AI assistant, for instant answers about my work
            </p>
            <a href="/leo">
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-semibold tracking-wide">
                CHAT WITH LEO AI
              </button>
            </a>
          </motion.div>

          <div className="mt-20 pt-12 border-t border-white/10">
            <p className="text-sm text-gray-500 tracking-wide">
              © 2026 MD. ABDUL HAMIM LEON • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
