import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-200/50 sticky top-0 z-50">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-3 text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-accent-700 transition-all duration-300">
          <img src='/assets/icon.png' alt="company logo" className="w-10 h-10" />
          <span>RadioFusion Global </span>
        </NavLink>
        <nav className="hidden md:flex space-x-8" aria-label="Primary">
          <NavLink 
            to="/" 
            end 
            className={({isActive}) => 
              isActive 
                ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-1 transition-all duration-300' 
                : 'text-secondary-700 hover:text-primary-600 font-medium transition-all duration-300 hover:border-b-2 hover:border-primary-300 pb-1'
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              isActive 
                ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-1 transition-all duration-300' 
                : 'text-secondary-700 hover:text-primary-600 font-medium transition-all duration-300 hover:border-b-2 hover:border-primary-300 pb-1'
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/services" 
            className={({isActive}) => 
              isActive 
                ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-1 transition-all duration-300' 
                : 'text-secondary-700 hover:text-primary-600 font-medium transition-all duration-300 hover:border-b-2 hover:border-primary-300 pb-1'
            }
          >
            Services
          </NavLink>
          <NavLink 
            to="/courses" 
            className={({isActive}) => 
              isActive 
                ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-1 transition-all duration-300' 
                : 'text-secondary-700 hover:text-primary-600 font-medium transition-all duration-300 hover:border-b-2 hover:border-primary-300 pb-1'
            }
          >
            Courses
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              isActive 
                ? 'text-primary-600 font-semibold border-b-2 border-primary-500 pb-1 transition-all duration-300' 
                : 'text-secondary-700 hover:text-primary-600 font-medium transition-all duration-300 hover:border-b-2 hover:border-primary-300 pb-1'
            }
          >
            Contact
          </NavLink>
        </nav>
        <button 
          className="md:hidden p-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200" 
          onClick={() => setOpen(!open)} 
          aria-expanded={open} 
          aria-controls="mobile-nav"
        >
          <svg className="w-6 h-6 text-secondary-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/50 shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              onClick={() => setOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? 'text-primary-600 font-semibold py-2 px-4 bg-primary-50 rounded-lg transition-all duration-300' 
                  : 'text-secondary-700 hover:text-primary-600 font-medium py-2 px-4 hover:bg-neutral-50 rounded-lg transition-all duration-300'
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? 'text-primary-600 font-semibold py-2 px-4 bg-primary-50 rounded-lg transition-all duration-300' 
                  : 'text-secondary-700 hover:text-primary-600 font-medium py-2 px-4 hover:bg-neutral-50 rounded-lg transition-all duration-300'
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/services" 
              onClick={() => setOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? 'text-primary-600 font-semibold py-2 px-4 bg-primary-50 rounded-lg transition-all duration-300' 
                  : 'text-secondary-700 hover:text-primary-600 font-medium py-2 px-4 hover:bg-neutral-50 rounded-lg transition-all duration-300'
              }
            >
              Services
            </NavLink>
            <NavLink 
               to="/courses" 
               onClick={() => setOpen(false)}
               className={({isActive}) => 
                 isActive 
                   ? 'text-primary-600 font-semibold py-2 px-4 bg-primary-50 rounded-lg transition-all duration-300' 
                   : 'text-secondary-700 hover:text-primary-600 font-medium py-2 px-4 hover:bg-neutral-50 rounded-lg transition-all duration-300'
               }
             >
               Courses
             </NavLink>
            <NavLink 
              to="/contact" 
              onClick={() => setOpen(false)}
              className={({isActive}) => 
                isActive 
                  ? 'text-primary-600 font-semibold py-2 px-4 bg-primary-50 rounded-lg transition-all duration-300' 
                  : 'text-secondary-700 hover:text-primary-600 font-medium py-2 px-4 hover:bg-neutral-50 rounded-lg transition-all duration-300'
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}


/*
folder structure:
- frontend
  - dist
  - node_module
  - public 
    - assests
      - logo.png
    -logo.png
  - src
*/