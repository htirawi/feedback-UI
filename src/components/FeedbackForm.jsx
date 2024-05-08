import { useState, useEffect } from 'react';
import RatingSelect from './RatingSelect';

import Card from './shared/Card';
import Button from './shared/Button';

import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  const { addFeedback, feedbackEditItem, updateFeedback } =
    useContext(FeedbackContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(8);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (feedbackEditItem.isEdit) {
      setText(feedbackEditItem.item.text);
      setRating(feedbackEditItem.item.rating);
      setBtnDisabled(false);
    }
  }, [feedbackEditItem]);

  const handleTextChange = ({ target: { value } }) => {
    if (value === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (value !== '' && value.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage(
        'Your feedback is too short, it must be at least 10 characters long.'
      );
    } else {
      setBtnDisabled(false);
      setMessage('');
    }

    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        rating,
        text,
        date: new Date().toISOString(),
      };
      if (feedbackEditItem.isEdit) {
        newFeedback.id = feedbackEditItem.item.id;
        updateFeedback(newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText('');
      setBtnDisabled(true);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Leave Feedback</h2>
        <RatingSelect selected={rating} select={setRating} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            value={text}
            type="text"
            placeholder="Write a review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
