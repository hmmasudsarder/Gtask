import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('small');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDeviceType('large');
      } else {
        setDeviceType('small');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;