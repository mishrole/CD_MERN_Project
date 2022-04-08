import React from 'react';
import { useForm } from 'react-hook-form';

const MessageForm = (props) => {
  const { onSubmitProp, roomName, users, room } = props;

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    const data = {
      message: formData.message,
      date: new Date().toDateString(),
      room: roomName
    };

    reset();
    onSubmitProp(data);
  }

  return (
    <form className="container pt-4 px-3" onSubmit={ handleSubmit(onSubmit) }>

          <div className="row align-items-center justify-content-center">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label htmlFor="message" className="form-label text-white">Send to <b><span className="text-capitalize">{room?.name}</span> Room</b></label>
                <span>{users} online</span>
              </div>
              <input type="text" className="form-control" id="message" placeholder="Type your message here..." autoComplete="off"
              {...register(
                "message", {
                  required: {
                    value: true,
                    message: 'Message is required'
                  } 
                }
              )}/>
              {
                errors.message && errors.message.type === "required" && <span role="alert" className="text-danger">{errors.message.message}</span>
              }
            </div>
          </div>

          <div className="d-flex flex-column">
            <button type="submit" className="btn btn-primary flex-fill">Send</button>
          </div>

        </form>
  )
}

export default MessageForm;