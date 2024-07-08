import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LongPollingComponent = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = () => {
            axios.get('http://localhost:8080/longpoll')
                .then(response => {
                    setMessages(prevMessages => [...prevMessages, response.data]);
                    fetchMessages(); // Start a new long poll request
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        };

        fetchMessages(); // Initial call
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default LongPollingComponent;
