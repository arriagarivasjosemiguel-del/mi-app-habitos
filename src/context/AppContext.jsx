import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      return;
    }
    const q = query(collection(db, "habits"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      habitsData.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0));
      setHabits(habitsData);
    });
    return () => unsubscribe();
  }, [user]);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  const toggleHabit = async (habitId, currentStatus) => {
    try {
      const habitRef = doc(db, "habits", habitId);
      await updateDoc(habitRef, { completed: !currentStatus });
    } catch (error) {
      console.error("Error actualizando hábito:", error);
    }
  };

  const addHabit = async (habitData) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "habits"), {
        userId: user.uid,
        completed: false,
        createdAt: serverTimestamp(),
        ...habitData
      });
    } catch (error) {
      console.error("Error creando hábito:", error);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await deleteDoc(doc(db, "habits", habitId));
    } catch (error) {
      console.error("Error eliminando hábito:", error);
    }
  };

  return (
    <AppContext.Provider value={{ user, loading, habits, loginWithGoogle, logout, toggleHabit, addHabit, deleteHabit }}>
      {!loading && children}
    </AppContext.Provider>
  );
};