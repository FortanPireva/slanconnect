import { sign } from "crypto";
import {
  getAuth,
  signInWithEmailPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
class AuthService {
  constructor() {
    this.signedIn = false;
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  }
  async getCurrentUser() {
    return getAuth().currentUser;
  }
  async signIn(email, password) {
    const auth = getAuth();
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.signedIn = true;
      return userCredential.user;
    } catch (error) {
      console.error("Couldn't sign up user ", error);
    }
  }
  async signout() {
    const auth = getAuth();
    try {
      await signOut(auth);
      this.isSignedIn = false;
    } catch (error) {
      console.error("Couldn't sign our user ", error);
    }
  }
  async signup(email, password) {
    const auth = getAuth();
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.signedIn = true;
      return userCredential.user;
    } catch (error) {
      console.error("Couldn't sign up user ", error);
    }
  }
  isSignedIn() {
    this.isSignedIn = getAuth().currentUser ? true : false;
    return this.isSignedIn;
  }
}
const authService = new AuthService();
export default authService;
