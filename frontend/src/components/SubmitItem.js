import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/SubmitItem.css';

const SubmitItem = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Failed to submit item:', error);
    }
  };

  return (
    <form className="submit-item" onSubmit={handleSubmit(onSubmitForm)}>
      <input
        {...register('headline', { 
          required: 'Headline is required', 
          maxLength: { value: 100, message: 'Headline must be 100 characters or less' } 
        })}
        placeholder="Headline"
      />
      {errors.headline && <span className="error">{errors.headline.message}</span>}

      <input
        {...register('hyperlink', {
          required: 'Hyperlink is required',
          pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
            message: 'Invalid URL format',
          },
        })}
        placeholder="Hyperlink"
      />
      {errors.hyperlink && <span className="error">{errors.hyperlink.message}</span>}

      <input
        {...register('topic', { 
          required: 'Topic is required', 
          maxLength: { value: 20, message: 'Topic must be 20 characters or less' } 
        })}
        placeholder="Topic"
      />
      {errors.topic && <span className="error">{errors.topic.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Item'}
      </button>
    </form>
  );
};

export default SubmitItem;
