export const setTokens = (accessToken, refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
        sessionStorage.setItem('refreshToken', refreshToken);
    }
};

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
};

export const clearTokens = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
};

export const isAuthenticated = () => {
    return !!getAccessToken();
};

// Check if token is expired (optional - if your tokens are JWTs)
export const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};