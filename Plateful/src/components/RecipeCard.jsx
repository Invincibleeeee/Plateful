import React, { useState } from "react";

const RecipeCard = ({ title, calories, image, ingredients }) => {
  const [showDetails, setShowDetails] = useState(false);
  const formattedCalories = Math.round(calories).toLocaleString();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#D9A05B]/20 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title}
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#3E2F1C] px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {formattedCalories} cal
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-playfair font-semibold text-[#3E2F1C] mb-3 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Ingredients Preview */}
        <div className="mb-4 flex-shrink-0">
          <p className="text-sm text-[#3E2F1C]/70 mb-2">
            {ingredients.length} ingredients • Ready to cook
          </p>
          {!showDetails && (
            <p className="text-sm text-[#3E2F1C]/60 line-clamp-2">
              {ingredients.slice(0, 3).map(ing => ing.text.split(' ').slice(-1)[0]).join(', ')}
              {ingredients.length > 3 && '...'}
            </p>
          )}
        </div>

        {/* Expanded Ingredients List - Fixed Height Container */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden mb-4 ${
          showDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 bg-[#FFF8F0] rounded-xl">
            <h4 className="text-sm font-semibold text-[#3E2F1C] mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#8B5E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Ingredients ({ingredients.length})
            </h4>
            <div className="max-h-24 overflow-y-auto">
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-[#3E2F1C]/80 flex items-start">
                    <span className="text-[#8B5E3C] mr-2 mt-1">•</span>
                    <span className="flex-1">
                      <span className="font-medium">
                        {ingredient.text.split(' ').slice(0, 2).join(' ')}
                      </span>
                      <span className="ml-1">
                        {ingredient.text.split(' ').slice(2).join(' ')}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Toggle Button - Pushed to bottom */}
        <button
          className="w-full py-2.5 px-4 bg-[#8B5E3C] text-white rounded-xl text-sm font-medium hover:bg-[#A77044] transition-colors duration-200 flex items-center justify-center mt-auto"
          onClick={() => setShowDetails(!showDetails)}
        >
          <span className="mr-2">
            {showDetails ? 'Hide Details' : 'View Recipe'}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #F5F0E5;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #8B5E3C;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default RecipeCard;