import { v4 as uuidv4 } from 'uuid';

import { createContext, useState } from 'react';

import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEditItem, setFeedbackEditItem] = useState({
    item: {
      id: '',
      rating: '',
      text: '',
    },
    isEdit: false,
  });

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?'))
      setFeedback(feedback.filter((item) => item.id !== id));
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEditItem({ item, isEdit: true });
  };

  const updateFeedback = (updatedFeedback) => {
    setFeedback(
      feedback.map((item) =>
        item.id === updatedFeedback.id ? updatedFeedback : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        setFeedback,
        feedbackEditItem,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
