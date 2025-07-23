// Token Expiration Monitor Hook 
// hooks/useTokenExpirationMonitor.js 

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { isTokenExpired, getTokenExpirationTime } from '../utils/jwtUtils';
import { useNavigate } from 'react-router-dom';

export const useTokenExpirationMonitor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token );

    useEffect(()=>{

        if(!token) return;

        // Check if token is already expired
        if(isTokenExpired(token)){
            dispatch(logout());
            navigate('/login');
            return;
        }

        // Set up timer to logout when token expires
        const expirationTime = getTokenExpirationTime(token);
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;
        console.log('remaining : ',timeUntilExpiration);
        
        const timerId = setTimeout(()=>{
            dispatch(logout());
            navigate('/login');
            alert('Your session has expired. Please login again.');
        },timeUntilExpiration);
    

    // Optional: Set up warning before expiration
    const warningTime = timeUntilExpiration - 60000; // 1 minute before expiration
    let warningTimerId;
    
    if (warningTime > 0) {
      warningTimerId = setTimeout(() => {
        if (window.confirm('Your session will expire in 1 minute. Do you want to continue?')) {
          // Here you could implement token refresh logic
          // For now, we'll just let them know
          console.log('User wants to continue - implement refresh token logic here');
        }
      }, warningTime);
    }

    return () => {
      clearTimeout(timerId);
      if (warningTimerId) clearTimeout(warningTimerId);
    };
  }, [token, dispatch, navigate]);
    
}