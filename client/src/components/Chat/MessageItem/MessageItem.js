import React from 'react';
import './MessageItem.css';

const MessageItem = (props) => {
  const { message } = props;
  const userId = localStorage.getItem('userId');

  return (
    <div className={`d-flex ${message.type === 'message' ? message.userId === userId ? 'justify-content-end' : 'justify-content-start' : 'justify-content-center'}`}>
      <div className={`${message.type === 'message' ? message.userId === userId ? 'message-item author-me' : 'message-item author-other' : 'announcement'}`}>
        <div className="d-flex justify-content-between">
          <div className="flex-grow-1">
            <p className={message.type === 'message' ? 'm-0 fw-bold' : 'd-none'}>{ message.user } </p>
            <p className="m-0"><span className={message.type === 'message' ? 'd-none' : 'm-0 fw-bold'}>{ message.user } </span>{ message.message }</p>
          </div>
          <div className={message.type === 'message' ? 'flex-shrink-1' : 'd-none'}>
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