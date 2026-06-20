import { db } from "./firebase-config.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =====================
   SEND GLOBAL MESSAGE
===================== */

export async function sendMessage(
playerName,
message
){

if(!message) return;

await addDoc(
collection(db,"guildChat"),
{
player:playerName,
message:message,
time:serverTimestamp()
}
);

}

/* =====================
   LOAD GLOBAL CHAT
===================== */

export function loadChat(
containerId
){

const q = query(
collection(db,"guildChat"),
orderBy("time","asc")
);

onSnapshot(q,(snapshot)=>{

const chatBox =
document.getElementById(
containerId
);

chatBox.innerHTML = "";

snapshot.forEach((doc)=>{

const data =
doc.data();

chatBox.innerHTML +=

`
<div style="
background:#222;
padding:10px;
margin-top:8px;
border-radius:8px;
">

<b>${data.player}</b>

<br>

${data.message}

</div>
`;

});

});

}

/* =====================
   PRIVATE SUPPORT CHAT
===================== */

export async function sendSupportMessage(
uid,
playerName,
message
){

await addDoc(
collection(
db,
"supportTickets",
uid,
"messages"
),
{
player:playerName,
message:message,
time:serverTimestamp()
}
);

}

/* =====================
   LOAD SUPPORT CHAT
===================== */

export function loadSupportChat(
uid,
containerId
){

const q = query(
collection(
db,
"supportTickets",
uid,
"messages"
),
orderBy("time","asc")
);

onSnapshot(q,(snapshot)=>{

const box =
document.getElementById(
containerId
);

box.innerHTML = "";

snapshot.forEach((doc)=>{

const data =
doc.data();

box.innerHTML +=

`
<div style="
background:#333;
padding:10px;
margin-top:8px;
border-radius:8px;
">

<b>${data.player}</b>

<br>

${data.message}

</div>
`;

});

});

}
