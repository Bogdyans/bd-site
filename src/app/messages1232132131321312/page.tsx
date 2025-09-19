'use client'

import {useEffect, useState} from "react";

type Message = {
    name: string,
    message: string,
}

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            fetch('/api/messages', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                }
            })
                .then((resp) => resp.json())
                .then(data => setMessages(data.messages));
        }
    })

    return (
        <div>
            {messages.map((msg, index) => (
                <div key={index} className="message">
                    <h1>{msg.name}</h1>
                    <p>{msg.message}</p>
                </div>
            ))}
        </div>
    )
}