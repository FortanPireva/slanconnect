import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
class AuthService {
  constructor() {
    this.signedIn = false;
    this.onAuthStateChanged = null;
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
      if (this.onAuthStateChanged != null) this.onAuthStateChanged();
    });
  }
  async attachOnAuthChanged(callback) {
    this.onAuthStateChanged = callback;
  }
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      try {
        var user = getAuth().currentUser;
        if (user) resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }
  async signIn(email, password) {
    const auth = getAuth();
    try {
      let userCredential = await signInWithEmailAndPassword(
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
