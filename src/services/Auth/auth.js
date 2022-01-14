import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
class AuthService {
  constructor() {
    this.signedIn = false;
    this.onAuthStateChanged = null;

    onAuthStateChanged(getAuth(), (user) => {
      debugger;
      console.log("user");
      if (user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
      if (this.onAuthStateChanged != null) this.onAuthStateChanged(user);
    });
  }
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      let result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }
  async attachOnAuthChanged(callback) {
    this.onAuthStateChanged = callback;
  }
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      try {
        debugger;
        let user = getAuth().currentUser;
        resolve(user);
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
    if (this.signedIn) return true;
    this.isSignedIn = getAuth().currentUser ? true : false;
    return this.isSignedIn;
  }
}
const authService = new AuthService();
export default authService;
