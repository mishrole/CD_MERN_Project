import React, { useEffect, useRef } from 'react';
import './MessagesList.css';

const MessagesList = ({ messages }) => {

  const messagesContainer = useRef(null);

  useEffect(() => {
    messagesContainer && messagesContainer.current.addEventListener('DOMNodeInserted', event => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight - target.clientHeight, behavior: 'smooth'});
      // console.log(target.scrollHeight, target.clientHeight, target.scrollHeight - target.clientHeight);
    });
  }, [messages]);

  return (
      <div className="p-3 messages row position-relative flex-grow-1" ref={ messagesContainer }>
        <div>
        {
          messages.map((message, index) => <p key={ index }>{ message }</p>)
        }
        </div>
      </div>
  )
}

export default MessagesList;