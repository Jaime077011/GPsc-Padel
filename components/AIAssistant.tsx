import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { Team, Match } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface AIAssistantProps {
  teams: Team[];
  matches: Match[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ teams, matches }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: "Hi! I'm your Ragab Padel Tournament Assistant. I have the latest schedule updates. Ask me about matches, live scores, or padel rules! 🎾",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // We pass the current teams and matches to ensure the AI has the latest data from Admin changes
      const responseText = await sendMessageToGemini(userMsg.text, teams, matches);
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-140px)] flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-padel-accent to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <span className="text-xl">🤖</span>
        </div>
        <div>
            <h2 className="text-white font-bold">Tournament Oracle</h2>
            <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online
            </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] px-4 py-3 rounded-2xl text-sm
                ${msg.role === 'user' 
                  ? 'bg-padel-blue text-white rounded-br-none' 
                  : 'bg-slate-700 text-slate-200 rounded-bl-none'}
              `}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Who plays next? What's the score?"
            className="flex-1 bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-padel-accent focus:ring-1 focus:ring-padel-accent transition-all placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-padel-accent text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-lime-900/20"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;