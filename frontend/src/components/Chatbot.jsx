"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, HelpCircle, MapPin, Calendar, ShoppingBag, FileText } from "lucide-react"

const Chatbot = ({ isOpen, setIsOpen, onOpenApplicationForm }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your Jharkhand Tourism assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef(null)
  const chatbotRef = useRef(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  ]

  const quickActions = [
    {
      id: "destinations",
      icon: <MapPin className="w-4 h-4" />,
      text: "Popular Destinations",
      action: () => handleQuickAction("destinations"),
    },
    {
      id: "itinerary",
      icon: <Calendar className="w-4 h-4" />,
      text: "Plan Itinerary",
      action: () => handleQuickAction("itinerary"),
    },
    {
      id: "marketplace",
      icon: <ShoppingBag className="w-4 h-4" />,
      text: "Local Products",
      action: () => handleQuickAction("marketplace"),
    },
    {
      id: "application",
      icon: <FileText className="w-4 h-4" />,
      text: "Apply for Tourism",
      action: () => onOpenApplicationForm && onOpenApplicationForm(),
    },
    {
      id: "faq",
      icon: <HelpCircle className="w-4 h-4" />,
      text: "FAQs",
      action: () => handleQuickAction("faq"),
    },
  ]

  const faqs = [
    {
      question: "What is the best time to visit Jharkhand?",
      answer:
        "The best time to visit Jharkhand is from October to March when the weather is pleasant and ideal for sightseeing and outdoor activities.",
    },
    {
      question: "How do I reach Ranchi?",
      answer:
        "Ranchi is well-connected by air, rail, and road. Birsa Munda Airport connects to major Indian cities. Regular trains and buses are available from neighboring states.",
    },
    {
      question: "What are the must-visit waterfalls in Jharkhand?",
      answer:
        "The top waterfalls include Hundru Falls (98m), Dassam Falls (44m), Jonha Falls (43m), and Hirni Falls. Each offers unique scenic beauty and trekking opportunities.",
    },
    {
      question: "Is it safe for solo travelers?",
      answer:
        "Yes, Jharkhand is generally safe for solo travelers. However, it's recommended to stay in well-reviewed accommodations and inform someone about your travel plans.",
    },
    {
      question: "What local handicrafts can I buy?",
      answer:
        "Popular handicrafts include Dokra art, bamboo products, Tussar silk, tribal jewelry, pottery, and handwoven baskets. Visit local markets and certified vendors.",
    },
  ]

  const mockResponses = {
    destinations: {
      en: "Here are the top destinations in Jharkhand:\n\n🏔️ **Ranchi** - Capital city with Rock Garden and Tagore Hill\n🌅 **Netarhat** - Queen of Chotanagpur, famous for sunrise views\n🏛️ **Deoghar** - Sacred city with Baidyanath Temple\n💧 **Hundru Falls** - Spectacular 98m waterfall\n🦌 **Hazaribagh National Park** - Wildlife sanctuary\n\nWould you like detailed information about any specific destination?",
      hi: "झारखंड के प्रमुख गंतव्य यहाँ हैं:\n\n🏔️ **रांची** - रॉक गार्डन और टैगोर हिल के साथ राजधानी शहर\n🌅 **नेतरहाट** - छोटानागपुर की रानी, सूर्योदय के लिए प्रसिद्ध\n🏛️ **देवघर** - बैद्यनाथ मंदिर के साथ पवित्र शहर\n💧 **हुंडरू फॉल्स** - शानदार 98 मीटर का झरना\n🦌 **हजारीबाग राष्ट्रीय उद्यान** - वन्यजीव अभयारण्य",
    },
    itinerary: {
      en: "I can help you create a perfect itinerary! Here are some popular options:\n\n📅 **2-3 Days**: Ranchi + Hundru Falls\n📅 **4-5 Days**: Ranchi + Netarhat + Deoghar\n📅 **7+ Days**: Complete Jharkhand tour with tribal villages\n\nTo create a personalized itinerary, I need to know:\n• Your travel dates\n• Group size\n• Interests (adventure, culture, nature)\n• Budget range\n\nShall we start planning your trip?",
      hi: "मैं आपको एक परफेक्ट यात्रा कार्यक्रम बनाने में मदद कर सकता हूँ! यहाँ कुछ लोकप्रिय विकल्प हैं:\n\n📅 **2-3 दिन**: रांची + हुंडरू फॉल्स\n📅 **4-5 दिन**: रांची + नेतरहाट + देवघर\n📅 **7+ दिन**: आदिवासी गांवों के साथ पूर्ण झारखंड यात्रा",
    },
    marketplace: {
      en: "Discover authentic Jharkhand products in our marketplace:\n\n🎨 **Handicrafts**: Dokra art, bamboo products\n👗 **Textiles**: Tussar silk sarees, tribal clothing\n💍 **Jewelry**: Traditional silver ornaments\n🍯 **Food**: Organic honey, tribal spices\n🏺 **Pottery**: Handmade clay items\n🏠 **Homestays**: Authentic village experiences\n\nAll vendors are verified and many are blockchain-certified. Would you like to explore any specific category?",
      hi: "हमारे बाज़ार में प्रामाणिक झारखंड उत्पादों की खोज करें:\n\n🎨 **हस्तशिल्प**: डोकरा कला, बांस उत्पाद\n👗 **वस्त्र**: तसर सिल्क साड़ी, आदिवासी कपड़े\n💍 **आभूषण**: पारंपरिक चांदी के गहने\n🍯 **भोजन**: जैविक शहद, आदिवासी मसाले",
    },
    weather: {
      en: "Current weather information for Jharkhand:\n\n🌤️ **Today**: Pleasant, 22-28°C\n📅 **This Week**: Mostly sunny with occasional clouds\n🌧️ **Monsoon**: July-September (heavy rainfall)\n❄️ **Winter**: December-February (10-25°C)\n☀️ **Summer**: March-June (25-40°C)\n\nBest time to visit is October-March for comfortable weather!",
      hi: "झारखंड के लिए वर्तमान मौसम की जानकारी:\n\n🌤️ **आज**: सुहावना, 22-28°C\n📅 **इस सप्ताह**: अधिकतर धूप, कभी-कभी बादल\n🌧️ **मानसून**: जुलाई-सितंबर (भारी बारिश)\n❄️ **सर्दी**: दिसंबर-फरवरी (10-25°C)",
    },
    transport: {
      en: "Transportation options in Jharkhand:\n\n✈️ **By Air**: Birsa Munda Airport, Ranchi\n🚂 **By Train**: Well-connected to major cities\n🚌 **By Bus**: State and private bus services\n🚗 **Local Transport**: Taxis, auto-rickshaws, app cabs\n🏍️ **Bike Rental**: Available in major cities\n\nFor bookings and schedules, I can connect you with our travel partners!",
      hi: "झारखंड में परिवहन विकल्प:\n\n✈️ **हवाई जहाज से**: बिरसा मुंडा हवाई अड्डा, रांची\n🚂 **ट्रेन से**: प्रमुख शहरों से अच्छी तरह जुड़ा\n🚌 **बस से**: राज्य और निजी बस सेवाएं\n🚗 **स्थानीय परिवहन**: टैक्सी, ऑटो-रिक्शा, ऐप कैब",
    },
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleQuickAction = (action) => {
    if (action === "application") {
      onOpenApplicationForm && onOpenApplicationForm();
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: quickActions.find((qa) => qa.id === action)?.text || action,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setShowQuickActions(false)

    setIsTyping(true)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content:
          mockResponses[action]?.[selectedLanguage] ||
          mockResponses[action]?.en ||
          "I can help you with that! Let me get the information for you.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setShowQuickActions(false)

    const generateBotResponse = (message) => {
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes("destination") || lowerMessage.includes("place") || lowerMessage.includes("visit")) {
        return mockResponses.destinations[selectedLanguage] || mockResponses.destinations.en
      }
      if (lowerMessage.includes("itinerary") || lowerMessage.includes("plan") || lowerMessage.includes("trip")) {
        return mockResponses.itinerary[selectedLanguage] || mockResponses.itinerary.en
      }
      if (lowerMessage.includes("buy") || lowerMessage.includes("shop") || lowerMessage.includes("product")) {
        return mockResponses.marketplace[selectedLanguage] || mockResponses.marketplace.en
      }
      if (lowerMessage.includes("apply") || lowerMessage.includes("application") || lowerMessage.includes("form")) {
        onOpenApplicationForm && onOpenApplicationForm();
        return selectedLanguage === "hi"
          ? "मैं आपके लिए आवेदन फॉर्म खोल रहा हूँ!"
          : "I'm opening the application form for you!"
      }
      if (
        lowerMessage.includes("weather") ||
        lowerMessage.includes("climate") ||
        lowerMessage.includes("temperature")
      ) {
        return mockResponses.weather[selectedLanguage] || mockResponses.weather.en
      }
      if (lowerMessage.includes("transport") || lowerMessage.includes("travel") || lowerMessage.includes("reach")) {
        return mockResponses.transport[selectedLanguage] || mockResponses.transport.en
      }
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
        return selectedLanguage === "hi"
          ? "नमस्ते! मैं आपका झारखंड पर्यटन सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?"
          : "Hello! I'm your Jharkhand Tourism assistant. How can I help you today?"
      }
      if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
        return selectedLanguage === "hi"
          ? "आपका स्वागत है! क्या मैं आपकी और कोई मदद कर सकता हूँ?"
          : "You're welcome! Is there anything else I can help you with?"
      }

      const faq = faqs.find((f) => lowerMessage.includes(f.question.toLowerCase().split(" ").slice(0, 3).join(" ")))
      if (faq) {
        return faq.answer
      }

      return selectedLanguage === "hi"
        ? "मुझे खुशी होगी आपकी मदद करने में! आप मुझसे झारखंड के गंतव्यों, यात्रा योजना, स्थानीय उत्पादों, या किसी भी पर्यटन संबंधी प्रश्न के बारे में पूछ सकते हैं।"
        : "I'd be happy to help! You can ask me about Jharkhand destinations, trip planning, local products, or any tourism-related questions."
    }

    setIsTyping(true)
    setTimeout(
      () => {
        const botResponse = {
          id: Date.now() + 1,
          type: "bot",
          content: generateBotResponse(inputMessage),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const showFAQs = () => {
    const faqMessage = {
      id: Date.now(),
      type: "bot",
      content: `Here are some frequently asked questions:\n\n${faqs
        .map((faq, index) => `**${index + 1}. ${faq.question}**\n${faq.answer}\n`)
        .join("\n")}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, faqMessage])
    setShowQuickActions(false)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div ref={chatbotRef} className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">Tourism Assistant</h3>
                <p className="text-xs text-primary-100">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-primary-500 text-white text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-primary-300"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-gray-900">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <button onClick={() => setIsOpen(false)} className="text-primary-100 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "bot" && <Bot className="w-4 h-4 mt-1 text-primary-600 flex-shrink-0" />}
                    {message.type === "user" && <User className="w-4 h-4 mt-1 text-primary-100 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === "user" ? "text-primary-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-primary-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {showQuickActions && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 text-center">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex items-center space-x-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                    >
                      {action.icon}
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={selectedLanguage === "hi" ? "अपना संदेश टाइप करें..." : "Type your message..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {selectedLanguage === "hi"
                ? "झारखंड पर्यटन सहायक - यहाँ मदद के लिए"
                : "Jharkhand Tourism Assistant - Here to help"}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot