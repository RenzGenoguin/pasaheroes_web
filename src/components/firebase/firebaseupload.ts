// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const firebaseConfig = {
  apiKey: "AIzaSyCtt3Z5XZW2EakSl6RrwSXdwLRk3F6nNMg",
  authDomain: "pasaheroes-f1831.firebaseapp.com",
  projectId: "pasaheroes-f1831",
  storageBucket: "pasaheroes-f1831.appspot.com",
  messagingSenderId: "1061524938923",
  appId: "1:1061524938923:web:d29b44fad2e37e85f557ee",
  measurementId: "G-W5DBVGJS53"
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
