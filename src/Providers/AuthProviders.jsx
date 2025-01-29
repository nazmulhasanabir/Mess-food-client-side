import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import UseAxiosPublic from "../pages/axios/UseAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const axiosPublic = UseAxiosPublic();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setLoading(true);
    signOut(auth);
  };
  const UpdateUserProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //     useEffect(()=> {

  //    const unsubscribe = onAuthStateChanged(auth, currentUser => {
  //                 setUser(currentUser)
  //                 if(currentUser){
  //                     // const userInfo = {email: currentUser.email};
  //                     // axiosPublic.post('/jwt', userInfo)
  //                     // .then(res => {
  //                     //     if(res.data.token){
  //                     //         localStorage.setItem('access-token', res.data.token)
  //                     //     }
  //                     // })
  //                     const userinfo = async()=>{
  //                         const res = await axiosPublic.get(`/usersMail?email=${currentUser?.email}`)
  //                        console.log(res.data);
  //                         setUser(res.data)

  //                         const userData = {email: res.data.email}
  //                         const token = await axiosPublic.post('/jwt', userData)  ;
  //                         if(token.data.token){
  //                             localStorage.setItem('access-token', token.data.token)
  //                         }
  //                     }
  //                     userinfo()

  //                 }else{
  //                         localStorage.removeItem('access-token')
  //                 }
  //                 setLoading(false)
  //             })
  //             return () =>{
  //                 return unsubscribe()
  //             }
  //     },[axiosPublic])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchUserInfo = async () => {
          const res = await axiosPublic.get(
            `/usersMail?email=${currentUser?.email}`
          );
          setUser(res.data);
        //   console.log(res.data);
          // console.log(user);
          const userData = { email: res.data.email };

          // console.log(userData);

          const tokenRes = await axiosPublic.post("/jwt", userData);
          if (tokenRes.data.token) {
            // console.log(tokenRes.data.token);
            localStorage.setItem("access-token", tokenRes.data.token);
            setLoading(false);
          }
        };
        fetchUserInfo();
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, [loading]);
  console.log(user);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    logout,
    UpdateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
