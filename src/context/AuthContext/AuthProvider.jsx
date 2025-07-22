import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userProfileUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
      if(currentUser?.email){
        const userData = {email: currentUser.email};
        axios.post(`http://localhost:3000/jwt`, userData, {
          withCredentials: true
        })
        .then(res=>{
          // console.log("token after jwt",res.data)
          const token = res.data.token;
          localStorage.setItem('token', token)
        })
        .catch(err=>{
          // console.log(err)
        })
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignIn,
    githubSignIn,
    userProfileUpdate,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};