import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import UseAxiosPublic from "../pages/axios/UseAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider;
const axiosPublic = UseAxiosPublic()

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password,)
        }

        const signIn = (email, password)=> {
            setLoading(true)
            return signInWithEmailAndPassword(auth,email, password)
        }
        const logout = () => {
            setLoading(true)
            signOut(auth)
        }
    useEffect(()=> {
           const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser)
                if(currentUser){
                    const userInfo = {email: currentUser.email};
                    axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
                }else{
                        localStorage.removeItem('access-token')
                }
                setLoading(false)
            })
            return () =>{
                return unsubscribe()
            }
    },[axiosPublic])
    const UpdateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
        
    };
    const googleLogin = ()=>{
        setLoading(true)
       return signInWithPopup(auth, googleProvider)
    }    
    const authInfo= {
        user,
        loading,
        createUser,
        signIn,
        googleLogin,
        logout,
        UpdateUserProfile,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;