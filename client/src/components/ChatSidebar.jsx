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

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await axios.post(`${API_URL}/api/chat`, { message: input });
            setMessages(prev => [...prev, { role: 'bot', text: res.data.response }]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container glass border-l border-white/10">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-sm opacity-50 uppercase tracking-widest">Chat with Graph</h2>
                    <p className="text-xs">Order to Cash</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
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
            <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Analyze anything"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-all font-light"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
