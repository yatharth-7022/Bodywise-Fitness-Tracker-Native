import axios from 'axios';
import Config from '../../config';

/**
 * Utility function to check if the production server is running
 * This can be used to show better error messages to users
 */
export const checkServerStatus = async (): Promise<{ isRunning: boolean; message: string }> => {
  try {
    if (!Config.API_URL.includes('https')) {
      return { isRunning: true, message: 'Using development server' };
    }

    const response = await axios.get(`${Config.API_URL}/api/health`, {
      timeout: 5000
    });
    
    if (response.status === 200) {
      return { 
        isRunning: true, 
        message: 'Production server is running' 
      };
    }
    
    return { 
      isRunning: false, 
      message: 'Production server returned an unexpected status' 
    };
  } catch (error: any) {
    if (Config.API_URL.includes('render.com')) {
      return { 
        isRunning: false, 
        message: 'Production server may be in sleep mode (can take 1-2 minutes to wake up)' 
      };
    }
    
    return { 
      isRunning: false, 
      message: `Server connection error: ${error.message}` 
    };
  }
};

/**
 * Checks if current server is on a free tier hosting service that may have cold starts
 */
export const isFreeTierHosting = (): boolean => {
  return Config.API_URL.includes('render.com') || 
         Config.API_URL.includes('herokuapp.com') || 
         Config.API_URL.includes('netlify.app');
};


export const getServerErrorMessage = (error: any): string => {
  if (!error) return 'Unknown error';
  
  if (isFreeTierHosting() && error.message?.includes('Network Error')) {
    return 'The server may be in sleep mode. Free hosting services can take 1-2 minutes to wake up. Please try again shortly.';
  }
  
  if (error.message?.includes('timeout')) {
    return 'Server request timed out. This could be due to high server load or a slow connection.';
  }
  
  return error.message || 'Server connection error';
}; 