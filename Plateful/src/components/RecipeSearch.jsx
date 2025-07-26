import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { debounce } from 'lodash';
import logo from "../assets/logoo.png";

const RecipeSearch = () => {
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [cache] = useState(new Map());

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      debouncedGetRecipes(query);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [query, lastScrollY]);

  const fetchRecipes = async (query) => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    if (cache.has(query)) {
      setRecipes(cache.get(query));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (response.status === 429) {
        setError('Rate limit exceeded. Please try again later.');
        return;
      }
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      cache.set(query, data.hits);
      setRecipes(data.hits);
    } catch (err) {
      console.error('Failed to fetch recipes:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedGetRecipes = useCallback(debounce(fetchRecipes, 600), []);

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F9E0C1]">
      {/* Header */}
      <div className={`fixed w-full transition-transform duration-300 ease-out z-50 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="bg-white/95 backdrop-blur-md border-b border-[#D9A05B]/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/')}
              >
                <img src={logo} alt="Plateful Logo" className="h-8 w-auto mr-3" />
                <h1 className="text-2xl font-playfair font-bold text-[#3E2F1C]">Plateful</h1>
              </div>
              
              <form className="flex-1 max-w-md ml-8" onSubmit={handleNewSearch}>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pl-12 rounded-full border border-[#D9A05B]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 focus:border-[#8B5E3C] text-[#3E2F1C] placeholder-[#3E2F1C]/60"
                    type="text"
                    placeholder="Search recipes..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5E3C]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-[#8B5E3C] text-white text-sm hover:bg-[#A77044] transition-colors"
                    type="submit"
                  >
                    Go
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-[#3E2F1C] mb-2">
            Results for <span className="text-[#8B5E3C]">"{query}"</span>
          </h2>
          <p className="text-[#3E2F1C]/70">
            {recipes.length ? `${recipes.length} recipes found` : loading ? 'Searching...' : ''}
          </p>
        </div>

        {/* Recipe Grid */}
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={`${recipe.recipe.label}-${index}`}
                title={recipe.recipe.label ?? "Unknown"}
                calories={recipe.recipe.calories ?? 0}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients ?? []}
              />
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-[#8B5E3C]/30 border-t-[#8B5E3C] rounded-full animate-spin"></div>
            <span className="ml-3 text-[#3E2F1C]/70">Finding recipes...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto bg-white rounded-2xl p-6 text-center shadow-lg border border-red-200 mt-12">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4 text-sm">{error}</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              onClick={() => fetchRecipes(query)}
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && recipes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F0E5] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#8B5E3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-playfair font-semibold text-[#3E2F1C] mb-2">No recipes found</h3>
            <p className="text-[#3E2F1C]/70 mb-6">Try searching for something else</p>
            <button
              className="px-6 py-2 bg-[#8B5E3C] text-white rounded-full hover:bg-[#A77044] transition-colors"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#8B5E3C] text-white py-4 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2025 Plateful — Curated with flavor & finesse 🍽️</p>
        </div>
      </footer>
    </div>
  );
};

export default RecipeSearch;