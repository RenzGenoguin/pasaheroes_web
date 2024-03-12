// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "imageuploadforthesises.firebaseapp.com",
  projectId: "imageuploadforthesises",
  storageBucket: "imageuploadforthesises.appspot.com",
  messagingSenderId: "255663088615",
  appId: "1:255663088615:web:5b31db93cd972fdeadd342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);

export const handleUpload = async (imageFile: any) => {
  if (imageFile !== null) {
    try {
      const imageRef = ref(imageDB, `pasaheroes/${v4()}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return uploadBytes(imageRef, imageFile).then((val) => {
        return getDownloadURL(val.ref).then((url) => {
          return url;
        });
      });
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};
