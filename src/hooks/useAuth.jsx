import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
// import { AuthContext } from '../context/AuthContext/AuthContext';

export const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};
