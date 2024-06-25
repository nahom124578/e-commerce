import React, { useEffect, useState } from 'react';

const FeedbackDetails = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:3001/feedbacks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 mt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome, Admin!
          </h1>
          <p className="text-lg">
            Here are some important Feedbacks
          </p>
        </div>

        {/* Fixed header row for Aspect, Satisfaction Level, and Improvement Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-800">Aspect</h2>
          </div>
          <div className="bg-green-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-800">Satisfaction Level</h2>
          </div>
          <div className="bg-purple-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-purple-800">Improvement Suggestions</h2>
          </div>
        </div>

        {/* Feedback data displayed below the headers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <React.Fragment key={feedback.id}>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="mt-2">
                  <p>{feedback.aspect}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="mt-4">
                  <pre>{JSON.stringify(JSON.parse(feedback.satisfaction_level), null, 2)}</pre>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="mt-4">
                  <p>{feedback.improvement_suggestions}</p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackDetails;
