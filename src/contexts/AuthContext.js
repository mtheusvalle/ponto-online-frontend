import { createContext, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function signOutWithGoogle() {
    auth.signOut(user).then(() => {
      console.log('Deslogado com sucesso')
    }).catch(err => {
      console.log('erro ao deslogar', err);
    })

    setUser();
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}