import React, { useState, useRef, useEffect } from "react";
import { SendHorizonal, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const bottomRef = useRef(null);

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

  return (
    <div className="relative w-screen h-screen bg-white">
      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full shadow-xl z-50"
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
            className="fixed bottom-20 right-4 w-[90%] sm:w-96 h-[70vh] bg-gradient-to-r from-blue-300 to-pink-300 rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 border-2 border-blue-500"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-lg flex justify-between">
              <span>TravelMitra</span>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="text-black rounded px-1 text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.from === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] px-4 py-2 rounded-lg text-sm break-words ${
                    msg.from === "user"
                      ? "bg-white text-black self-end text-right ml-auto"
                      : "bg-gradient-to-r from-pink-500 to-blue-500 text-white self-start"
                  }`}
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: (msg?.text ? String(msg.text) : "").replace(/\n/g, "<br>"),
                  }}
                />
              ))}

              {loading && (
                <div className="text-sm text-gray-600 animate-pulse">
                  TravelMitra is typing...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-blue-500 bg-gradient-to-r from-blue-100 to-pink-100 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                type="text"
                placeholder="Type or speak your query..."
                className="flex-1 px-4 py-2 rounded-l-lg bg-white text-sm outline-none placeholder:text-gray-600"
              />
              <button
                onClick={handleVoice}
                className={`px-3 py-2 rounded-lg ${
                  isListening
                    ? "bg-red-500 text-white"
                    : "bg-gradient-to-r from-pink-500 to-blue-500 text-white"
                }`}
              >
                🎤
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-r-lg hover:from-pink-600 hover:to-blue-600"
              >
                <SendHorizonal size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;