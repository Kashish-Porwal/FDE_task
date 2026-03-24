import React, { useState } from 'react';
import { Send, Bot, User, Minimize2, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ChatSidebar = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I can help you analyze the Order to Cash process.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    const handleSend = async (messageText = input) => {
        const textToSubmit = messageText.trim();
        if (!textToSubmit) return;

        const userMsg = { role: 'user', text: textToSubmit };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            console.log(`Sending request to ${API_URL}/api/chat...`);
            const res = await axios.post(`${API_URL}/api/chat`, { message: textToSubmit });
            setMessages(prev => [...prev, { role: 'bot', text: res.data.response }]);
        } catch (err) {
            console.error("Chat Error:", err);
            const errorMsg = err.response?.data?.response || "I'm sorry, I'm having trouble connecting to the server. Please check if the backend is running.";
            setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestedPrompts = [
        "Trace the full flow of billing document 91150187",
        "Find the journal entry linked to billing document 91150187",
        "Show incomplete order-to-cash flows",
        "Which entities are most connected?",
        "Summarize path from sales order to journal entry"
    ];

    return (
        <div className="chat-container bg-slate-900/60 backdrop-blur-2xl border-l border-white/5">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                    <h2 className="font-black text-xs uppercase tracking-[0.2em] text-blue-500">AI Copilot</h2>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Process Investigation Engine</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 1 && (
                    <div className="space-y-4 py-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Suggested Investigations</p>
                        <div className="flex flex-col gap-2">
                            {suggestedPrompts.map((p, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(p)}
                                    className="suggested-prompt"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                )}                {messages.map((m, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i}
                        className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'bot' ? 'bg-blue-600' : 'bg-slate-700'}`}>
                            {m.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'bot' ? 'bg-white/5' : 'bg-blue-600'}`}>
                            {m.role === 'bot' && <div className="font-bold text-xs mb-1 opacity-50">Dodge AI</div>}
                            {m.text}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-950/80 backdrop-blur-md border-t border-white/10">
                <div className="relative group">
                    <input
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your question here..."
                        className="w-full bg-blue-500/10 border-2 border-blue-500/20 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/20 transition-all font-medium shadow-2xl"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Send size={18} />
                        )}
                    </button>
                </div>
                <p className="text-[9px] text-slate-600 mt-3 text-center uppercase tracking-widest font-black">
                    Press Enter to investigate
                </p>
            </div>
        </div>
    );
};

export default ChatSidebar;
