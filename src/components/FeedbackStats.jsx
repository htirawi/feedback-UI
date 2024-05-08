import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);

  let positiveFeedbacks = feedback.filter((item) => item.rating > 3).length;
  let negativeFeedbacks = feedback.filter((item) => item.rating < 3).length;
  let totalFeedbacks = feedback.length;
  let averageRating = (
    feedback.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks
  )
    .toFixed(1)
    .replace(/\.0$/, '');

  return (
    <div className="feedback-stats">
      <h4> {feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(averageRating) ? 0 : averageRating}</h4>
      <p>Positive Feedbacks: {positiveFeedbacks}</p>
      <p>Negative Feedbacks: {negativeFeedbacks}</p>
    </div>
  );
};

export default FeedbackStats;
