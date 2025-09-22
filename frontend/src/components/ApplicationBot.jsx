"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, User, Send, CheckCircle2, Loader2, X, FileText } from "lucide-react"

const ApplicationBot = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [formData, setFormData] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const applicationBotRef = useRef(null)

  // Define your application form steps and questions
  const formSteps = [
    { id: "intro", message: "Hello! I'm your Application Assistant. Let's get started!", type: "info" },
    { id: "name", message: "What is your full name?", key: "fullName", type: "text", placeholder: "e.g., John Doe" },
    { id: "email", message: "What is your email address?", key: "email", type: "email", placeholder: "e.g., john.doe@example.com" },
    { id: "phone", message: "What is your phone number?", key: "phoneNumber", type: "tel", placeholder: "e.g., +1234567890" },
    { id: "experience", message: "Tell me about your previous experience or relevant skills (optional)?", key: "experience", type: "textarea", optional: true, placeholder: "e.g., 2 years in customer service..." },
    { id: "reason", message: "Why are you interested in this opportunity?", key: "reason", type: "textarea", placeholder: "e.g., I'm passionate about..." },
    { id: "availability", message: "What is your availability like?", key: "availability", type: "text", placeholder: "e.g., Full-time, M-F, Part-time" },
    { id: "confirm", message: "Thank you for providing the information. Please review your answers before submitting:", type: "confirm" },
  ]

  // Reset form when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize form
      setCurrentStep(1) // Start from step 1 (first question)
      setFormData({})
      setSubmissionSuccess(false)
      setIsSubmitting(false)
      
      // Add the intro message
      if (formSteps[0]) {
        setMessages([{
          id: Date.now(),
          type: "bot",
          content: formSteps[0].message,
          timestamp: new Date(),
        }]);
      }
      
      // Then immediately ask the first question after a short delay
      setTimeout(() => {
        if (formSteps[1]) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              type: "bot",
              content: formSteps[1].message,
              timestamp: new Date(),
            },
          ]);
          if (inputRef.current) inputRef.current.focus();
        }
      }, 1000);
    }
  }, [isOpen]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when currentStep changes and bot asks a new question
  useEffect(() => {
    if (!isTyping && currentStep < formSteps.length -1 && inputRef.current && isOpen) {
        inputRef.current.focus();
    }
  }, [currentStep, isTyping, formSteps.length, isOpen]);

  // Handle clicks outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (applicationBotRef.current && !applicationBotRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !formSteps[currentStep]?.optional && formSteps[currentStep]?.id !== "confirm") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          content: "Please provide a response for this field.",
          timestamp: new Date(),
        },
      ]);
      return;
    }

    const currentFormStep = formSteps[currentStep];

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "user",
        content: inputMessage || (currentFormStep.optional ? "(Skipped)" : ""),
        timestamp: new Date(),
      },
    ]);

    setInputMessage("");

    if (currentFormStep && currentFormStep.key) {
      setFormData((prevData) => ({
        ...prevData,
        [currentFormStep.key]: inputMessage.trim(),
      }));
    }

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

    const nextStep = currentStep + 1;
    if (nextStep < formSteps.length) {
      setCurrentStep(nextStep);
      const nextFormStep = formSteps[nextStep];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          content: nextFormStep.message,
          timestamp: new Date(),
        },
      ]);
    } else {
      console.log("Form data submitted:", formData);
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "bot",
          content: "Your application has been successfully submitted! We will get back to you soon.",
          timestamp: new Date(),
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (formSteps[currentStep]?.id !== "confirm" || (formSteps[currentStep]?.id === "confirm" && !isSubmitting)) {
        handleSendMessage()
      }
    }
  }

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "user",
        content: "Looks good, submit my application!",
        timestamp: new Date(),
      },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

    console.log("Submitting final form data:", formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmissionSuccess(true);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        type: "bot",
        content: "Your application has been successfully submitted! We will get back to you soon.",
        timestamp: new Date(),
      },
    ]);
    setCurrentStep(formSteps.length);
  };

  const renderInputArea = () => {
    if (submissionSuccess) {
      return (
        <div className="text-center text-sm text-gray-600 py-2">
          Application completed.
        </div>
      );
    }

    const step = formSteps[currentStep];

    if (!step) {
        return null;
    }

    if (step.id === "confirm") {
      return (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleConfirmSubmit}
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting...
              </>
            ) : (
              "Confirm & Submit"
            )}
          </button>
        </div>
      );
    }

    return (
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          {step.type === "textarea" ? (
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={step.placeholder || "Type your answer..."}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none h-16"
            />
          ) : (
            <input
              ref={inputRef}
              type={step.type}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={step.placeholder || "Type your answer..."}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          )}
          <button
            onClick={handleSendMessage}
            disabled={isTyping || (!inputMessage.trim() && !step.optional)}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {step.optional && (
          <p className="text-xs text-gray-500 mt-1 text-right">
            Press Enter or Send to skip (optional)
          </p>
        )}
      </div>
    );
  };

  const renderReviewSection = () => {
    if (formSteps[currentStep]?.id === "confirm") {
      return (
        <div className="bg-gray-50 p-3 rounded-lg mt-2 text-sm">
          <h4 className="font-semibold mb-2">Your Application Details:</h4>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key} className="mb-1">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{" "}
              {value || <span className="text-gray-500 italic">No response</span>}
            </p>
          ))}
          {Object.keys(formData).length === 0 && (
             <p className="text-gray-500 italic">No information collected yet.</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Application Toggle Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-20 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200 z-50"
          title="Apply for Tourism"
        >
          <FileText className="w-6 h-6" />
        </button>
      )}

      {/* Application Form Window */}
      {isOpen && (
        <div ref={applicationBotRef} className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">Application Form</h3>
                <p className="text-xs text-green-100">Assistant • {currentStep < formSteps.length -1 ? `Step ${currentStep}/${formSteps.length - 2}` : "Review"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={onClose} className="text-green-100 hover:text-white transition-colors">
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
                    message.type === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "bot" && <FileText className="w-4 h-4 mt-1 text-green-600 flex-shrink-0" />}
                    {message.type === "user" && <User className="w-4 h-4 mt-1 text-green-100 flex-shrink-0" />}
                    {message.type === "bot" && message.content === formSteps[currentStep]?.message && submissionSuccess ? (
                      <CheckCircle2 className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                    ) : null}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.type === "bot" && formSteps[currentStep]?.id === "confirm" && message.content === formSteps[currentStep].message && renderReviewSection()}
                      <p className={`text-xs mt-1 ${message.type === "user" ? "text-green-100" : "text-gray-500"}`}>
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
                    <FileText className="w-4 h-4 text-green-600" />
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

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {renderInputArea()}

          <p className="text-xs text-gray-500 mt-2 text-center py-1">
            Jharkhand Tourism Application Assistant
          </p>
        </div>
      )}
    </>
  )
}

export default ApplicationBot