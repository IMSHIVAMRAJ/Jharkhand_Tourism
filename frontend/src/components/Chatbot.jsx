import React, { useState, useRef, useEffect } from "react";
import { SendHorizonal, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "or", name: "Odia" },
];

const translateText = async (text, targetLang, sourceLang = "auto") => {
  if (targetLang === "en") return text;
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );
    const data = await res.json();
    return data[0][0][0];
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Namaste! Main TravelMitra hoon. Jharkhand ke safar ke liye aapka AI guide. Apni bhasha select kijiye aur puchhiye apne sawal! 🌿",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [theme, setTheme] = useState("water");

  const bottomRef = useRef(null);

  // Define multiple themes for Jharkhand's natural beauty
  const themes = [
    { name: "water", bg: "bg-gradient-to-r from-blue-300 to-teal-200", text: "text-blue-800" },
    { name: "mountain", bg: "bg-gradient-to-r from-green-500 to-gray-600", text: "text-gray-800" },
    { name: "forest", bg: "bg-gradient-to-r from-emerald-400 to-green-600", text: "text-green-900" },
    { name: "waterfall", bg: "bg-gradient-to-r from-cyan-400 to-blue-500", text: "text-cyan-900" },
  ];

  // Theme switching logic with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setTheme((prev) => {
        const currentIndex = themes.findIndex((t) => t.name === prev);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex].name;
      });
    }, 10000); // Switch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const typeWriter = (fullText, cb) => {
    let index = 0;
    let current = "";
    const interval = setInterval(() => {
      if (index < fullText.length) {
        current += fullText.charAt(index);
        cb(current);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const queryInEnglish =
        selectedLang === "en" ? input : await translateText(input, "en", selectedLang);

      const res = await fetch("https://tourism-chatbot-8sze.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryInEnglish }),
      });

      const data = await res.json();
      let answer = data.answer ?? "Mujhe samajh nahi aaya, fir se try karein!";

      if (selectedLang !== "en") {
        answer = await translateText(answer, selectedLang, "en");
      }

      setMessages((prev) => [...prev, { from: "bot", text: "" }]);

      typeWriter(answer, (newText) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = newText;
          return updated;
        });
      });
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error contacting server. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang =
      selectedLang === "hi"
        ? "hi-IN"
        : selectedLang === "bn"
        ? "bn-IN"
        : selectedLang === "or"
        ? "or-IN"
        : "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
  };

  // Get current theme styles
  const currentTheme = themes.find((t) => t.name === theme);
  const backgroundTheme = currentTheme.bg;
  const textTheme = currentTheme.text;

  return (
    <>
      {/* Spline Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[5%] left-6 w-[80%] h-[85%] hidden sm:block z-40 overflow-hidden"
          >
            <Spline
              scene="https://prod.spline.design/3bfsCgZ8fIidsmH6/scene.splinecode"
              style={{ width: "100%", height: "100%", position: "relative", top: "20%", left: "-40%" }} // Crop bottom 10%
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 p-4 ${backgroundTheme} text-white rounded-full shadow-xl z-50 transition-colors duration-1000 ease-in-out`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-20 right-4 w-[68%] sm:w-[27.2rem] h-[60vh] ${backgroundTheme} rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 border-2 border-blue-500 transition-colors duration-1000 ease-in-out`}
          >
            {/* Header */}
            <div className={`p-4 ${backgroundTheme} text-white font-bold text-lg flex justify-between ${textTheme} transition-colors duration-1000 ease-in-out`}>
              <span>TravelMitra</span>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className={`text-black rounded px-1 text-sm ${textTheme} transition-colors duration-1000 ease-in-out`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${textTheme} transition-colors duration-1000 ease-in-out`}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: msg.from === "user" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-block px-4 py-2 rounded-lg text-sm break-words ${
                      msg.from === "user"
                        ? "bg-white text-black shadow-md"
                        : `${backgroundTheme} text-white shadow-md`
                    } max-w-[80%] min-w-[fit-content] transition-colors duration-1000 ease-in-out`}
                    style={{ whiteSpace: "pre-wrap" }}
                    dangerouslySetInnerHTML={{
                      __html: (msg?.text ? String(msg.text) : "").replace(/\n/g, "<br>"),
                    }}
                  />
                </div>
              ))}

              {loading && (
                <div className={`text-sm animate-pulse ${textTheme} transition-colors duration-1000 ease-in-out`}>
                  TravelMitra is typing...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className={`p-3 border-t border-blue-500 bg-gradient-to-r from-blue-100 to-teal-100 flex items-center gap-2 transition-colors duration-1000 ease-in-out ${textTheme}`}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                type="text"
                placeholder="Type or speak your query..."
                className={`flex-1 px-4 py-2 rounded-l-lg bg-white text-sm outline-none placeholder:text-gray-600 ${textTheme} transition-colors duration-1000 ease-in-out`}
              />
              <button
                onClick={handleVoice}
                className={`px-3 py-2 rounded-lg ${
                  isListening
                    ? "bg-red-500 text-white"
                    : `${backgroundTheme} text-white`
                } transition-colors duration-1000 ease-in-out`}
              >
                🎤
              </button>
              <button
                onClick={handleSend}
                className={`${backgroundTheme} text-white px-4 py-2 rounded-r-lg hover:from-blue-500 hover:to-teal-500 transition-colors duration-1000 ease-in-out`}
              >
                <SendHorizonal size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;