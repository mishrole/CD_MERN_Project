import React from 'react';
import './MessageItem.css';

const MessageItem = (props) => {
  const { message } = props;
  const socketId = localStorage.getItem('socketId');

  return (
    <div className={`d-flex ${message.socketId === socketId ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`message-item ${message.socketId === socketId ? 'author-me' : 'author-other'}`}>
        <div className="d-flex justify-content-between">
          <div className="flex-grow-1">
            <b>{ message.user } </b>
            <p>{ message.message }</p>  
          </div>
          <div className="flex-shrink-1">
            <div className="badge rounded-pill bg-secondary">
            { new Intl.DateTimeFormat(
            'es-ES',
            {
              // year: 'numeric',
              // month: '2-digit',
              // day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              // second: 'numeric',
            }).format(Date.parse(message.date)) }
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default MessageItem;