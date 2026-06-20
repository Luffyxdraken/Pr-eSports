import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   REGISTER MEMBER
========================= */

export async function registerMember(
email,
password,
ign,
region
){

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

let role = "member";

if(email === "luffy@world.com"){
role = "admin";
}

await setDoc(
doc(db,"users",user.uid),
{
uid:user.uid,
email:email,
ign:ign,
region:region,
role:role,
banned:false,
createdAt:new Date().toISOString()
}
);

alert("Account Created Successfully");

window.location.href =
"member.html";

}
catch(error){

if(
error.code ===
"auth/email-already-in-use"
){

alert(
"Email already registered. Please Login."
);

}
else{

alert(error.message);

}

}

}

/* =========================
   LOGIN MEMBER
========================= */

export async function loginMember(
email,
password
){

try{

const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

const userDoc =
await getDoc(
doc(db,"users",user.uid)
);

if(!userDoc.exists()){

alert("User profile not found");

return;

}

const data =
userDoc.data();

if(data.banned){

alert(
"Your account has been banned."
);

await signOut(auth);

return;

}

if(data.role === "admin"){

window.location.href =
"admin.html";

}
else{

window.location.href =
"member.html";

}

}
catch(error){

if(
error.code ===
"auth/invalid-credential"
){

alert(
"Wrong Email or Password"
);

}
else{

alert(error.message);

}

}

}

/* =========================
   LOGOUT
========================= */

export async function logoutMember(){

await signOut(auth);

window.location.href =
"login.html";

}

/* =========================
   CURRENT USER
========================= */

export function getCurrentUser(
callback
){

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

callback(null);

return;

}

const userDoc =
await getDoc(
doc(db,"users",user.uid)
);

if(userDoc.exists()){

callback(
userDoc.data()
);

}
else{

callback(null);

}

}
);

}

/* =========================
   REQUIRE LOGIN
========================= */

export function requireMember(){

onAuthStateChanged(
auth,
(user)=>{

if(!user){

window.location.href =
"login.html";

}

}
);

}

/* =========================
   REQUIRE ADMIN
========================= */

export function requireAdmin(){

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

window.location.href =
"login.html";

return;

}

const userDoc =
await getDoc(
doc(db,"users",user.uid)
);

if(!userDoc.exists()){

window.location.href =
"login.html";

return;

}

const data =
userDoc.data();

if(data.role !== "admin"){

window.location.href =
"member.html";

}

}
);

}

/* =========================
   BAN MEMBER
========================= */

export async function banMember(
uid
){

await updateDoc(
doc(db,"users",uid),
{
banned:true
}
);

alert("Member Banned");

}

/* =========================
   UNBAN MEMBER
========================= */

export async function unbanMember(
uid
){

await updateDoc(
doc(db,"users",uid),
{
banned:false
}
);

alert("Member Unbanned");

}

/* =========================
   MAKE ADMIN
========================= */

export async function makeAdmin(
uid
){

await updateDoc(
doc(db,"users",uid),
{
role:"admin"
}
);

alert(
"User Promoted To Admin"
);

}
