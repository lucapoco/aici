import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello! I'm here to support you on your recovery journey. How can I help you today?", timestamp: new Date().toISOString() }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const botResponses = [
        "That's completely normal. Many people experience cravings during recovery. Have you tried any of the coping strategies we discussed before?",
        "I understand how challenging that can be. Would you like to talk about what might be triggering these feelings?",
        "You're doing great by recognizing and acknowledging these feelings. That awareness is an important part of recovery.",
        "I'm here for you. Let's work through this together and find some techniques that might help in this situation."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-t-xl shadow-md">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl">
            <h1 className="text-xl font-bold">AI Support Assistant</h1>
            <p className="text-sm opacity-90">Available 24/7 to provide guidance and support</p>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'user' ? 
                      <User className="w-4 h-4 mr-2" /> : 
                      <Bot className="w-4 h-4 mr-2" />
                    }
                    <span className="text-xs opacity-70">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-50 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <textarea
                className="flex-grow border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your message..."
                rows={2}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                className="ml-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              This AI assistant is for support only. If you're experiencing an emergency, please contact emergency services or call the National Helpline at 1-800-662-HELP (4357).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;