import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { auth} from "./config";
import { createUser } from "./user-services";



export const registerWithEmailAndPassword = async ({
    userData,
    onSuccess,
    onFail,
  }) => {
    try {
      const { email, password, ...restData } = userData;
      const firebaseResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
  
      await createUser({
        ...restData,
        email,
        uid: firebaseResult.user.uid,
        url:"https://img.freepik.com/vector-premium/icono-perfil-avatar_188544-4755.jpg",
        id: firebaseResult.user.uid,
      });
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("REGISTER FAILED", { error });
      if (onFail) {
        onFail();
      }
    }
  };
  
  export const loginWithEmailAndPassword = async ({
    userData,
    onSuccess,
    onFail,
  }) => {
    try {
      const { email, password } = userData;
      await signInWithEmailAndPassword(auth, email, password);
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("LOGIN FAILED", { error });
  
      if (onFail) {
        onFail();
      }
    }
  };
  
  export const logout = async (callback) => {
    try {
      await signOut(auth);
  
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("SIGN OUT FAILED", { error });
    }
  };