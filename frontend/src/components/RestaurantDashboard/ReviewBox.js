import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewBox = () => {
    const ratings = {
        5: 30,
        4: 20,
        3: 10,
        2: 5,
        1: 3,
      };
  // Calculate the total count of all reviews
  const totalReviews = Object.values(ratings).reduce((sum, count) => sum + count, 0);

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      {/* Rating Rows */}
      {Object.entries(ratings)
        .sort(([a], [b]) => b - a)  // Sort to display 5 to 1 stars
        .map(([rating, count]) => {
          const percentage = (count / totalReviews) * 100;

          return (
            <div key={rating} className="mb-4">
              <div className="flex justify-between items-center">
                {/* Star Count */}
                <span className="text-sm font-medium text-gray-100 flex items-center">
                  {rating} stars <span className="ml-2"></span>
                  {[...Array(parseInt(rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 mr-1" />
                  ))}
                </span>
                <span className="text-sm font-medium text-gray-100">{count}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  style={{ width: `${percentage}%` }}
                  className="h-full bg-yellow-500 rounded-full"
                ></div>
              </div>
            </div>
          );
        })}
      
      {/* Total Reviews */}
      <div className="text-center mt-6 text-sm text-gray-100">
        {totalReviews} total reviews
      </div>
    </>
  );
};

export default ReviewBox;