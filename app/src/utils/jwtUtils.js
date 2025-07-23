// JWT Token Decoder Utility  
// Utils/jwtUtils.js

export const isTokenExpired = (token) => {

    if(!token) return true;

    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        return payload.exp < currentTime;
    } catch (error){
        return true;
    }

};

export const getTokenExpirationTime = (token) => {

    if (!token) return null;

    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000; // Convert to milliseconds
    }
    catch(error) {
        return null;
    }
};
