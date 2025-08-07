'use client';

import { useState } from 'react';
import { FiSend, FiTrash2 } from 'react-icons/fi';
import { useChatStore } from '@/store/chatStore';
import MessageContent from '@/components/MessageContent';

export default function Home() {
  const { messages, isLoading, addMessage, setLoading, clearMessages } = useChatStore();
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    addMessage({
      content: input,
      role: 'user'
    });

    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();
      
      if (data.error) {
        addMessage({
          content: `错误: ${data.error}`,
          role: 'assistant'
        });
      } else {
        addMessage({
          content: data.response,
          role: 'assistant'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        content: '抱歉，发生了错误。请检查网络连接或稍后再试。',
        role: 'assistant'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-semibold">私人聊天机器人</h1>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="清空对话"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p>开始对话吧！</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <MessageContent content={message.content} role={message.role} />
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3xl p-3 rounded-lg bg-gray-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="输入您的消息..."
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
