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
updateDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* --------------------------
   ADMIN CONFIG
--------------------------- */

const ADMIN_EMAIL = "luffy@world.com";

/* --------------------------
   REGISTER
--------------------------- */

export async function registerMember(
email,
password,
ign,
region = "Unknown"
){

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user = userCredential.user;

await setDoc(
doc(db,"users",user.uid),
{
uid:user.uid,
email:email,
ign:ign,
region:region,
role:
email === ADMIN_EMAIL
? "admin"
: "member",

banned:false,

createdAt:
serverTimestamp()
}
);

alert("Account created successfully!");

window.location.href =
"login.html";

}catch(error){

alert(error.message);

}

}

/* --------------------------
   LOGIN
--------------------------- */

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

alert("Profile not found");

return;

}

const data =
userDoc.data();

if(data.banned){

alert("You are banned.");

await signOut(auth);

return;

}

if(data.role === "admin"){

window.location.href =
"admin.html";

}else{

window.location.href =
"member.html";

}

}catch(error){

alert(error.message);

}

}

/* --------------------------
   LOGOUT
--------------------------- */

export async function logoutMember(){

try{

await signOut(auth);

window.location.href =
"login.html";

}catch(error){

alert(error.message);

}

}

/* --------------------------
   GET CURRENT USER
--------------------------- */

export function getCurrentUser(callback){

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

callback({
uid:user.uid,
...userDoc.data()
});

}else{

callback(null);

}

});
}

/* --------------------------
   ADMIN CHECK
--------------------------- */

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

});
}

/* --------------------------
   MEMBER CHECK
--------------------------- */

export function requireMember(){

onAuthStateChanged(
auth,
(user)=>{

if(!user){

window.location.href =
"login.html";

}

});
}

/* --------------------------
   PROMOTE TO ADMIN
--------------------------- */

export async function makeAdmin(uid){

try{

await updateDoc(
doc(db,"users",uid),
{
role:"admin"
}
);

alert("User promoted to admin");

}catch(error){

alert(error.message);

}

}

/* --------------------------
   BAN MEMBER
--------------------------- */

export async function banMember(uid){

try{

await updateDoc(
doc(db,"users",uid),
{
banned:true
}
);

alert("Member banned");

}catch(error){

alert(error.message);

}

}

/* --------------------------
   UNBAN MEMBER
--------------------------- */

export async function unbanMember(uid){

try{

await updateDoc(
doc(db,"users",uid),
{
banned:false
}
);

alert("Member unbanned");

}catch(error){

alert(error.message);

}

}
