import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        }

        const signIn = (email, password)=> {
            setLoading(true)
            return signInWithEmailAndPassword(email, password)
        }
        const logout = () => {
            setLoading(true)
            signOut(auth)
        }
    useEffect(()=> {
           const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser)
                console.log('current')
                setLoading(false)
            })
            return () =>{
                return unsubscribe()
            }
    },[])
    
    
    const authInfo= {
        user,
        loading,
        createUser,
        signIn,
        logout,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;