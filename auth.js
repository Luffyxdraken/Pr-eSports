// auth.js

import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ==========================
   REGISTER MEMBER
========================== */

window.registerMember = async function (
  email,
  password
) {
  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    alert("Registration Successful");

    console.log(userCredential.user);

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }
};

/* ==========================
   LOGIN MEMBER
========================== */

window.loginMember = async function (
  email,
  password
) {
  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    alert("Login Successful");

    console.log(userCredential.user);

    window.location.href = "member.html";

  } catch (error) {

    alert(error.message);

  }
};

/* ==========================
   LOGOUT
========================== */

window.logoutMember = async function () {

  try {

    await signOut(auth);

    alert("Logged Out");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }

};

/* ==========================
   AUTH CHECK
========================== */

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Logged In:", user.email);

  } else {

    console.log("No User Logged In");

  }

});
