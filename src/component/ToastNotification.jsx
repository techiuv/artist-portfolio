import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ToastNotification = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    gsap.fromTo(
      '.toast-bg',
      { opacity: 0, y: -20, scale: 0 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
    );

    // Auto dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`toast-bg text-center z-[999] fixed top-5 left-1/2 transform -translate-x-1/2 p-2 text-sm md:text-lg lg:text-xl font-normal rounded-lg shadow-lg ${bgColor} text-white flex items-center w-[60%] lg:w-[300px] space-x-2`}
    >
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
