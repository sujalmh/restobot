import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DishOption from './DishOption';
import '../css/ScrollBar.css';
import { TypeAnimation } from 'react-type-animation';
import { IoMdPause } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import axiosInstance from '../../axios';
import { emitter } from '../events';

const Chatbot = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const restId = id; // Replace with the actual restaurant ID

  // Fetch chat history
  const fetchChatHistory = async () => {
    const sessionId = sessionStorage.getItem('session_id'); // Retrieve session_id from sessionStorage
    if (!sessionId) {
      console.error('Session ID not found. Please start a new session.');
      setLoadingMessages(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/chat/${restId}/session/${sessionId}`);
      const { messages: fetchedMessages } = response.data;
      fetchedMessages.forEach((message, index) => {
        console.log(`Message ${index + 1}:`, message);
      });
      // Format messages to match the component's structure
      const formattedMessages = fetchedMessages.map((message) => ({
        text: message.text,
        sender: message.sender === 'user' ? 'user' : 'bot', // Map 'role' to 'user' or 'bot'
        options: message.sender === 'assistant' && message.dish_details.length > 0 ? message.dish_details : null, // Add options for bot messages
      }));
      console.log(formattedMessages);
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    emitter.emit('updateCartQuantity');
    fetchChatHistory();
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const fetchChatResponse = async (userInput) => {
    try {
      const sessionId = sessionStorage.getItem('session_id'); // Retrieve session_id from sessionStorage

      if (!sessionId) {
        throw new Error('Session ID not found. Please start a new session.');
      }

      const response = await axiosInstance.post(`/api/chat/${restId}`, {
        user_input: userInput,
        menu_id: 1, // Update `menu_id` dynamically if needed
        session_id: sessionId, // Pass session ID to the backend
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching chat response:', error);
      return null;
    }
  };

  const handleSend = async () => {
    if (loadingMessage || userInput.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: 'user' },
    ]);
    setUserInput('');

    setIsTyping(true);
    setLoadingMessage(true);

    const response = await fetchChatResponse(userInput);

    if (response) {
      const { text, dish_details } = response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: 'bot', options: dish_details || [] },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I couldn't process your request. Please try again.", sender: 'bot' },
      ]);
    }

    setIsTyping(false);
    setLoadingMessage(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div id="chat-container" className="flex-grow h-full overflow-y-auto p-4 space-y-4">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-full">
            <div className="p-4 bg-gray-700 rounded-lg shadow-md">
              <span className="text-white">Loading chat history...</span>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} mb-4`}
            >
              <div
                className={`p-3 rounded-xl shadow-lg ${
                  message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
                } max-w-xs md:max-w-md lg:max-w-lg`}
              >
                {message.sender === 'bot' ? (
                  <TypeAnimation
                    sequence={[message.text, 1000]}
                    wrapper="span"
                    speed={75}
                    repeat={0}
                    cursor={false}
                  />
                ) : (
                  <span>{message.text}</span>
                )}
              </div>

              {message.sender === 'bot' && message.options && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {message.options.map((dish) => (
                    <DishOption key={dish.dish_id} dish={dish} />
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="p-3 rounded-xl bg-gray-700 max-w-xs shadow-lg">
              <div className="w-24 h-4 bg-gray-600 rounded-md animate-pulse mb-2"></div>
              <div className="w-36 h-4 bg-gray-600 rounded-md animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center px-4 py-3 bg-gray-700 shadow-lg">
        <input
          type="text"
          className="flex-grow p-3 rounded-full bg-gray-600 text-white focus:outline-none placeholder-gray-400"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSend() : null)}
        />
        {!loadingMessage ? (
          <button
            className="ml-3 h-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-center hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300 flex items-center justify-center"
            onClick={handleSend}
          >
            <IoSend className="text-[1.35rem]" />
          </button>
        ) : (
          <button
            className="ml-3 h-full p-3 bg-gray-800 animate-pulse text-white px-4 py-2 rounded-full shadow-md transition duration-300"
            disabled
          >
            <IoMdPause className="text-[1.35rem]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;