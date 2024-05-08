import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';

const AboutPage = () => {
  return (
    <Card>
      <div className="about">
        <h1>About</h1>
        <p>
          This is a simple feedback application that allows users to submit
          feedback and view statistics about the feedback.
        </p>
        <p>
          This application was built using React, and the data is managed using
          React hooks.
        </p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/"> Back To Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
