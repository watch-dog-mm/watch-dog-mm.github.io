import firebase from "firebase/app";
export const config = {
  // DO NOT USE THESE CREDENTIALS ! THEY ARE HERE TO HELP IN THE LEARNING PROCESS.
  // ANY AND ALL DATA ON THAT DOMAIN IS SUBJECT TO CHANGE AND REMOVAL AT ANY TIME
  // THIS ACCOUNT IS ALSO ON THE FREE PLAN AND IS SUBJECT TO RESTRICTIONS !
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(config);

export const database = firebase.database();
