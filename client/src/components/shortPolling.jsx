import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShortPollingComponent = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get('http://localhost:8080/poll')
                .then(response => {
                    setMessages(prevMessages => [...prevMessages, response.data]);;
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
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

export default ShortPollingComponent;