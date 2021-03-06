import {
  collection,
  getFirestore,
  orderBy as firebaseOrderBy,
  getDocs,
  limit as firebaselimit,
  addDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import authService from "../Auth/auth";

class PostRepository {
  constructor() {
    this.db = getFirestore();
  }
  async addPost(post) {
    try {
      let postToBeInserted = {
        ...post,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(
        collection(this.db, "posts"),
        postToBeInserted
      );

      console.log("Post written with ID:", docRef.id);
      return {
        ref: docRef,
        doc: {
          ...postToBeInserted,
          createdAt: { seconds: Math.floor(Date.now() / 1000) },
        },
      };
    } catch (error) {
      console.error("Error writing to document", error);
    }
  }
  async getPosts(page = 1, limit = 10, orderBy = "createdAt") {
    const newQuery = query(
      collection(this.db, "posts"),
      firebaseOrderBy(orderBy, "desc"),
      firebaselimit(limit)
    );
    const querySnapshot = await getDocs(newQuery);
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, data: doc.data() });
    });
    return docs;
  }
  async getPostsAfter(lastVisible, limit = 10, orderBy = "createdAt") {
    const next = query(
      collection(this.db, "cities"),
      firebaseOrderBy(orderBy, "desc"),
      firebaselimit(limit)
    );
    const querySnapshot = await getDocs(next);
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, data: doc.data() });
    });
    return docs;
  }
}
export default new PostRepository();
