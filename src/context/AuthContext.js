import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const createOrUpdateUser = async (user) => {
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
            });
        } else {
            await setDoc(userDocRef, {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
            }, { merge: true });
        }
    } catch (error) {
        console.error('Ошибка создания или обновления пользователя: ', error);
    }
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                await createOrUpdateUser(user); 
            }
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error('Ошибка при выходе из аккаунта:', error);
        }
    };

    const value = {
        currentUser,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
