import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import chefAnimationData from "./chef-animation.json";
import backgroundImage from "../assets/bg.jpg";
import logo from "../assets/logoo.png";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchSectionRef = useRef(null);

  // Memoized random search items to prevent recreation on every render
  const randomSearchItems = useMemo(() => [
    "Pasta", "Tacos", "Sushi", "Cake", "Vegan Salad", "Omelette",
    "Pizza", "Curry", "Sandwich", "Soup", "Stir Fry", "Smoothie"
  ], []);

  // Memoized categories data
  const categories = useMemo(() => [
    { 
      name: "Italian", 
      emoji: "🍝", 
      desc: "Pasta, pizza & more",
      gradient: "from-red-100 to-green-100"
    },
    { 
      name: "Mexican", 
      emoji: "🌮", 
      desc: "Tacos, guac & spice",
      gradient: "from-yellow-100 to-red-100"
    },
    { 
      name: "Asian", 
      emoji: "🍜", 
      desc: "Sushi, stir-fry & beyond",
      gradient: "from-orange-100 to-pink-100"
    },
    { 
      name: "Desserts", 
      emoji: "🍰", 
      desc: "Cakes, pies & sweets",
      gradient: "from-pink-100 to-purple-100"
    },
    { 
      name: "Vegan", 
      emoji: "🥑", 
      desc: "Plant-based delights",
      gradient: "from-green-100 to-emerald-100"
    },
    { 
      name: "Quick Meals", 
      emoji: "⏱️", 
      desc: "Fast & tasty meals",
      gradient: "from-blue-100 to-cyan-100"
    },
  ], []);

  // Optimized particle initialization
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const initializeParticles = () => {
      const particles = document.querySelectorAll(".particle");
      particles.forEach((particle, index) => {
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${(index * 0.2) + Math.random() * 3}s`;
        particle.style.animationDuration = `${8 + Math.random() * 4}s`;
      });
    };

    initializeParticles();
    
    return () => clearTimeout(timer);
  }, []);

  // Optimized search input handler
  const updateSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // Enhanced search handler with loading state
  const handleSearch = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    
    setIsLoading(true);
    
    try {
      navigate(`/search?query=${encodeURIComponent(trimmedSearch)}`);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [search, navigate]);

  // Enhanced random search with better UX
  const handleRandomSearch = useCallback(() => {
    const randomQuery = randomSearchItems[Math.floor(Math.random() * randomSearchItems.length)];
    setSearch(randomQuery);
    setIsLoading(true);
    
    setTimeout(() => {
      navigate(`/search?query=${encodeURIComponent(randomQuery)}`);
      setIsLoading(false);
    }, 300);
  }, [randomSearchItems, navigate]);

  // Category click handler
  const handleCategoryClick = useCallback((categoryName) => {
    setSearch(categoryName);
    setIsLoading(true);
    
    setTimeout(() => {
      navigate(`/search?query=${encodeURIComponent(categoryName)}`);
      setIsLoading(false);
    }, 200);
  }, [navigate]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Scroll to search section handler
  const handleScrollToSearch = useCallback(() => {
    if (searchSectionRef.current) {
      searchSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  // Memoized Lottie options
  const lottieOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: chefAnimationData,
    rendererSettings: { 
      preserveAspectRatio: "xMidYMid slice",
      clearCanvas: true,
      progressiveLoad: true
    },
  }), []);

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-no-repeat bg-cover bg-fixed relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="main"
      aria-label="Plateful Recipe Discovery Homepage"
    >
      {/* Enhanced background overlay with better gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0]/95 via-[#FFF1E5]/85 to-[#F9E0C1]/60">
        {/* Optimized floating particles */}
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="particle absolute w-1 h-1 bg-[#D9A05B]/60 rounded-full animate-float-slow pointer-events-none"
            style={{
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Enhanced header with better spacing */}
      <header className="w-full max-w-7xl flex items-center justify-between px-6 py-6 z-20">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Plateful Logo" 
            className="h-12 w-auto mr-3 drop-shadow-sm" 
            loading="eager"
          />
          <h1 className="text-2xl font-playfair font-bold text-[#3E2F1C] tracking-wide">
            Plateful
          </h1>
        </div>
        
        {/* Optional: Add navigation or user menu here */}
        <nav className="hidden md:flex space-x-6" aria-label="Main navigation">
          {/* Add navigation items if needed */}
        </nav>
      </header>

      {/* Main content with improved animations */}
      <main
        className={`relative z-10 w-full max-w-7xl px-6 py-8 transition-all duration-1200 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {/* Hero section with better typography hierarchy */}
        <section className="text-center mb-16" aria-labelledby="hero-title">
          <h2 
            id="hero-title"
            className="text-6xl md:text-7xl font-playfair font-extrabold text-[#3E2F1C] mb-6 tracking-wide leading-tight"
          >
            <span className="block">What's on your plate today?</span>
            <span className="block text-4xl md:text-5xl font-light text-[#8B5E3C] mt-2">
              Craving something delicious?
            </span>
          </h2>
          
          <p className="text-lg md:text-xl font-dm-sans text-[#3E2F1C]/90 font-light max-w-4xl mx-auto mb-8 leading-relaxed">
            Explore <span className="font-semibold text-[#8B5E3C]">1000+</span> recipes from global cuisines. 
            Let <span className="text-[#8B5E3C] font-bold">Plateful</span> ignite your culinary passion!
          </p>
          
          <button
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#8B5E3C] to-[#A77044] text-white text-lg font-semibold hover:from-[#A77044] hover:to-[#8B5E3C] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/50"
            onClick={handleScrollToSearch}
            aria-label="Scroll to search section"
          >
            Let's Get Cooking
          </button>
        </section>

        {/* Chef animation with better loading */}
        <section className="flex justify-center mb-16" aria-label="Chef animation">
          <div className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] drop-shadow-lg">
            <Lottie 
              options={lottieOptions} 
              height="100%" 
              width="100%" 
              isClickToPauseDisabled={true}
            />
          </div>
        </section>

        {/* Enhanced search section */}
        <section 
          ref={searchSectionRef}
          className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl mb-16 border border-[#D9A05B]/20"
          aria-labelledby="search-title"
        >
          <h3 
            id="search-title"
            className="text-3xl font-playfair font-semibold text-[#3E2F1C] mb-6 text-center"
          >
            Unleash Your Culinary Quest
          </h3>
          
          <form onSubmit={handleSearch} className="relative mb-4">
            <label htmlFor="recipe-search" className="sr-only">
              Search for recipes, ingredients, or cuisines
            </label>
            <input
              id="recipe-search"
              className="w-full p-5 pr-32 rounded-xl text-[#3E2F1C] bg-white placeholder-[#3E2F1C]/60 border-2 border-[#F5F0E5] focus:outline-none focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/20 transition-all duration-200"
              type="text"
              placeholder="Type a dish, ingredient, or cuisine..."
              value={search}
              onChange={updateSearch}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="off"
              maxLength={100}
            />
            <button
              type="submit"
              className="absolute right-3 top-3 bottom-3 px-6 rounded-lg bg-[#8B5E3C] text-white hover:bg-[#A77044] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
              disabled={isLoading || !search.trim()}
              aria-label="Search for recipes"
            >
              {isLoading ? "..." : "Search"}
            </button>
          </form>
          
          <button
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F5F0E5] to-[#FFF8F0] text-[#3E2F1C] hover:from-[#8B5E3C] hover:to-[#A77044] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/30"
            onClick={handleRandomSearch}
            disabled={isLoading}
            aria-label="Get a random recipe suggestion"
          >
            I'm Feeling Hungry 🍽️
          </button>
        </section>

        {/* Enhanced categories grid */}
        <section className="mb-16" aria-labelledby="categories-title">
          <h3 
            id="categories-title"
            className="text-3xl font-playfair font-semibold text-[#3E2F1C] mb-8 text-center"
          >
            Explore by Cuisine
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`bg-gradient-to-br ${category.gradient} backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/30`}
                onClick={() => handleCategoryClick(category.name)}
                disabled={isLoading}
                aria-label={`Explore ${category.name} cuisine - ${category.desc}`}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-md">
                  <span className="text-3xl" role="img" aria-label={category.name}>
                    {category.emoji}
                  </span>
                </div>
                <h4 className="text-xl font-playfair font-semibold text-center text-[#3E2F1C] mb-2">
                  {category.name}
                </h4>
                <p className="text-center text-[#3E2F1C]/70 text-sm leading-relaxed">
                  {category.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Enhanced call-to-action section */}
        <section 
          className="bg-gradient-to-r from-white/95 to-[#FFF8F0]/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center mb-16 border border-[#D9A05B]/20"
          aria-labelledby="cta-title"
        >
          <h3 
            id="cta-title"
            className="text-3xl font-playfair font-semibold text-[#3E2F1C] mb-4"
          >
            Ignite Your Passion for Food
          </h3>
          <p className="text-[#3E2F1C]/80 font-light max-w-2xl mx-auto mb-6 leading-relaxed">
            Join a vibrant community of food lovers and elevate your kitchen artistry with Plateful. 
            Discover new flavors, share your creations, and become the chef you've always wanted to be.
          </p>
          <button
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#8B5E3C] to-[#A77044] text-white font-semibold hover:from-[#A77044] hover:to-[#8B5E3C] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/50"
            onClick={handleScrollToSearch}
            disabled={isLoading}
            aria-label="Scroll to search section to start your culinary journey"
          >
            Start Your Journey
          </button>
        </section>

        {/* Enhanced footer */}
        <footer className="text-center text-[#3E2F1C]/60 text-sm py-4">
          <p className="font-light">
            © 2025 Plateful — Crafted with{" "}
            <span role="img" aria-label="love">❤️</span>{" "}
            and{" "}
            <span role="img" aria-label="food">🍽️</span>{" "}
            by passionate food enthusiasts
          </p>
        </footer>
      </main>

      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6;
          }
          33% { 
            transform: translateY(-15px) rotate(120deg); 
            opacity: 0.8;
          }
          66% { 
            transform: translateY(-25px) rotate(240deg); 
            opacity: 0.4;
          }
        }
        
        .animate-float-slow { 
          animation: float-slow 10s infinite ease-in-out; 
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow {
            animation: none;
          }
          
          .transform {
            transform: none !important;
          }
        }
        
        /* Smooth focus transitions */
        *:focus {
          transition: box-shadow 0.2s ease-in-out;
        }
        
        /* Better loading states */
        .loading {
          position: relative;
          overflow: hidden;
        }
        
        .loading::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Home;