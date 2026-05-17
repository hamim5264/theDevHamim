import React, { useRef, useState } from "react";
import { Navigation } from "../components/Navigation";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Download, MessageCircle, ExternalLink, Send, Phone, MessageSquare, Compass } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
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

  const contacts = [
    {
      icon: <Mail className="w-8 h-8" />,
      label: "EMAIL",
      value: "hamim.leon@gmail.com",
      description: "Best way to reach me for inquiries",
      link: "mailto:hamim.leon@gmail.com",
      color: "blue"
    },
    {
      icon: <Github className="w-8 h-8" />,
      label: "GITHUB",
      value: "github.com/hamim5264",
      description: "Check out my open source contributions",
      link: "https://github.com/hamim5264",
      color: "purple"
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      label: "LINKEDIN",
      value: "Connect professionally",
      description: "linkedin.com/in/abdul-hamim-a35b02253",
      link: "https://www.linkedin.com/in/abdul-hamim-a35b02253/",
      color: "blue"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      label: "WHATSAPP",
      value: "+8801724879284",
      description: "Quick messaging for urgent matters",
      link: "https://wa.me/8801724879284",
      color: "green"
    },
  ];

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
                {contacts.map((contact, i) => (
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
            {[
              { name: "Facebook", link: "https://www.facebook.com/hamim.leon", value: "hamim.leon" },
              { name: "Instagram", link: "https://www.instagram.com/hamimleon/", value: "@hamimleon" },
              { name: "Twitter / X", link: "https://x.com/HamimLeon42320", value: "@HamimLeon42320" },
              { name: "Threads", link: "https://www.threads.net/@hamimleon", value: "@hamimleon" },
              { name: "Discord", link: "#", value: "hamim_27693" },
              { name: "Microsoft Teams", link: "mailto:hamim.leon@gmail.com", value: "hamim.leon@gmail.com" },
              { name: "University Email", link: "mailto:hamim15-5264@diu.edu.bd", value: "hamim15-5264@diu.edu.bd" },
              { name: "Business Platform", link: "https://devengine-three.vercel.app/", value: "devengine-three" },
            ].map((item, i) => (
              <a
                href={item.link}
                target="_blank"
                key={i}
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 block text-center"
              >
                <h4 className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-1">{item.name}</h4>
                <p className="text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white truncate">{item.value}</p>
              </a>
            ))}
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
