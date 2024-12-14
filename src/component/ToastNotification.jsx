import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ToastNotification = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    gsap.fromTo(
      '.toast-bg',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`toast-bg fixed top-5 right-5 p-4 rounded-lg shadow-lg ${bgColor} text-white flex items-center space-x-2`}
    >
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
