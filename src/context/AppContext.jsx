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
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Escuchar Hábitos
  useEffect(() => {
    if (!user) { setHabits([]); return; }
    const q = query(collection(db, "habits"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0));
      setHabits(data);
    });
    return () => unsubscribe();
  }, [user]);

  // Escuchar Tareas
  useEffect(() => {
    if (!user) { setTasks([]); return; }
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0));
      setTasks(data);
    });
    return () => unsubscribe();
  }, [user]);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  const toggleHabit = async (id, status) => {
    if (!user) return;
    await updateDoc(doc(db, "habits", id), { completed: !status });
  };

  const addHabit = async (data) => {
    if (!user) return;
    await addDoc(collection(db, "habits"), { userId: user.uid, completed: false, createdAt: serverTimestamp(), ...data });
  };

  const deleteHabit = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "habits", id));
  };

  const toggleTask = async (id, status) => {
    if (!user) return;
    await updateDoc(doc(db, "tasks", id), { completed: !status });
  };

  const addTask = async (data) => {
    if (!user) return;
    await addDoc(collection(db, "tasks"), { userId: user.uid, completed: false, createdAt: serverTimestamp(), ...data });
  };

  const deleteTask = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <AppContext.Provider value={{ 
      user, loading, habits, tasks, 
      loginWithGoogle, logout, 
      toggleHabit, addHabit, deleteHabit,
      toggleTask, addTask, deleteTask
    }}>
      {!loading && children}
    </AppContext.Provider>
  );
};