import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signOut,
  onAuthStateChanged,
  UserCredential,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';

interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  createUserWithEmail: (email: string, password: string, name: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function createUserWithEmail(email: string, password: string, name: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    signInWithGoogle,
    signInWithEmail,
    createUserWithEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 