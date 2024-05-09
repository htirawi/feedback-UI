// import { v4 as uuidv4 } from 'uuid';

import { createContext, useState, useEffect } from 'react';

// import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEditItem, setFeedbackEditItem] = useState({
    item: {
      id: '',
      rating: '',
      text: '',
    },
    isEdit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const res = await fetch('/feedback?_sort=id');
    const data = await res.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });
    // newFeedback.id = uuidv4();
    const data = await res.json();
    setFeedback([data, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEditItem({ item, isEdit: true });
  };

  const updateFeedback = async (updatedFeedback) => {
    await fetch(`/feedback/${updatedFeedback.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedFeedback),
    });

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
        isLoading,
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
