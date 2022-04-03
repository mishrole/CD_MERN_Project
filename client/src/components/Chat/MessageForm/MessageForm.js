import React from 'react';
import { useForm } from 'react-hook-form';

const MessageForm = (props) => {
  const { onSubmitProp } = props;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    const data = {
      message: formData.message,
    };

    onSubmitProp(data);
  }

  return (
    <form className="container py-5 px-4" onSubmit={ handleSubmit(onSubmit) }>

          <div className="row align-items-center justify-content-center">
            <div className="mb-3">
              <label htmlFor="message" className="form-label text-primary">Message</label>
              <input type="text" className="form-control" id="message" placeholder="Type your message here..."
              {...register(
                "message", {
                  required: {
                    value: true,
                    message: 'Message is required'
                  } 
                }
              )}/>
              {
                errors.email && errors.email.type === "required" && <span role="alert" className="text-danger">{errors.email.message}</span>
              }
            </div>
          </div>

          <div className="d-flex flex-column mb-5">
            <button type="submit" className="btn btn-primary flex-fill">Send</button>
          </div>

        </form>
  )
}

export default MessageForm;