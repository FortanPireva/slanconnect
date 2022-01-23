import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "@firebase/firestore";

class UserRepository {
  constructor() {
    this.db = getFirestore();
  }

  async addUser(user) {
    try {
      const userDocref = await addDoc(collection(this.db, "users"), {
        ...user,
        createdAt: serverTimestamp(),
        numfollowers: 0,
        numfollows: 0,
        numposts: 0,
      });
      console.log("User creatad with ID:", userDocref.id);
      return userDocref;
    } catch (error) {
      console.error("Error writing to document", error);
    }
  }
  async getUser(userId) {
    const q = query(collection(this.db, "users"), where("uid", "==", userid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 1)
      return {
        id: querySnapshot[0].id,
        data: querySnapshot[0].data(),
      };
  }
}

export default new UserRepository();
