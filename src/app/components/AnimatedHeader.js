'use client';

import { useState, useEffect } from 'react';
import styles from './AnimatedHeader.module.css';
import SearchBar from './SearchBar';
import MenuButton from './MenuButton';

export default function AnimatedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle header shrinking
      setIsScrolled(currentScrollY > 20);
      
      // Handle search bar visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsSearchVisible(false);
      } else {
        setIsSearchVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <MenuButton />
        <div className={`${styles.searchContainer} ${isSearchVisible ? styles.visible : styles.hidden}`}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
} 