import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import hamimPic from '../../../assets/hamim.png';

interface ProfileImageProps {
  className?: string;
  alt?: string;
}

export function ProfileImage({ className, alt }: ProfileImageProps) {
  const { personalInfo, loading } = usePortfolio();
  const [showFallback, setShowFallback] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Set a timeout of 5 seconds to fallback if the image hasn't loaded
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [imageLoaded]);

  // If loading completes and no valid profile pic is found, fallback
  useEffect(() => {
    if (!loading) {
      if (!personalInfo?.profilePic || personalInfo.profilePic === "/assets/hamim.png" || personalInfo.profilePic === "") {
        setShowFallback(true);
      }
    }
  }, [loading, personalInfo]);

  const handleImageError = () => {
    setHasError(true);
    setShowFallback(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Determine the source to show
  // While loading or before 5s, try the DB profile pic.
  // If fallback is triggered, use the local imported hamimPic.
  let src = personalInfo?.profilePic;
  if (showFallback || hasError) {
    src = hamimPic;
  } else if (!src) {
    src = hamimPic;
  }

  return (
    <img 
      src={src}
      alt={alt || "Profile"} 
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
}
