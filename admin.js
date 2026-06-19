// admin.js

// =========================
// ADMIN LOGIN CHECK
// =========================

const ADMIN_EMAIL = "luffy@world.com";

import { auth } from "./firebase-config.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){

alert("Please Login");

window.location.href="login.html";

return;

}

if(user.email !== ADMIN_EMAIL){

alert("Access Denied");

window.location.href="member.html";

return;

}

console.log("Admin Access Granted");

});

// =========================
// TOURNAMENT SETTINGS
// =========================

window.saveTournament = function(){

const tournament = {

date:
document.getElementById("date").value,

time:
document.getElementById("time").value,

map:
document.getElementById("map").value,

roomid:
document.getElementById("roomid").value,

password:
document.getElementById("password").value

};

localStorage.setItem(
"tournament",
JSON.stringify(tournament)
);

alert("Tournament Updated");

};

// =========================
// ANNOUNCEMENT
// =========================

window.saveAnnouncement = function(){

const text =
document.getElementById(
"announcement"
).value;

localStorage.setItem(
"announcement",
text
);

alert("Announcement Saved");

};

// =========================
// RANKINGS
// =========================

window.saveRankings = function(){

const rankings = {

rank1:
document.getElementById(
"rank1"
).value,

rank2:
document.getElementById(
"rank2"
).value,

rank3:
document.getElementById(
"rank3"
).value

};

localStorage.setItem(
"rankings",
JSON.stringify(rankings)
);

alert("Rankings Updated");

};

// =========================
// MEMBER MANAGEMENT
// =========================

function getMembers(){

return JSON.parse(
localStorage.getItem("members")
) || [];

}

function saveMembers(data){

localStorage.setItem(
"members",
JSON.stringify(data)
);

}

window.loadMembers = function(){

const members =
getMembers();

const container =
document.getElementById(
"memberList"
);

if(!container) return;

container.innerHTML = "";

members.forEach((member,index)=>{

container.innerHTML += `

<div class="member">

<b>${member.ign}</b>

<br>

${member.email}

<br><br>

Status:
${member.approved ? "Approved" : "Pending"}

<br><br>

<button onclick="approveMember(${index})">
Approve
</button>

<button onclick="banMemberIndex(${index})">
Ban
</button>

<button onclick="makeAdmin(${index})">
Make Admin
</button>

</div>

`;

});

};

// =========================
// APPROVE MEMBER
// =========================

window.approveMember = function(index){

let members =
getMembers();

members[index].approved =
true;

saveMembers(members);

loadMembers();

alert("Member Approved");

};

// =========================
// BAN MEMBER
// =========================

window.banMemberIndex =
function(index){

let members =
getMembers();

members[index].banned =
true;

saveMembers(members);

loadMembers();

alert("Member Banned");

};

// =========================
// MAKE ADMIN
// =========================

window.makeAdmin =
function(index){

let members =
getMembers();

members[index].role =
"admin";

saveMembers(members);

loadMembers();

alert(
members[index].ign +
" is now Admin"
);

};

// =========================
// SUPPORT CHAT
// =========================

window.loadSupport = function(){

const messages =
JSON.parse(
localStorage.getItem(
"support"
)
) || [];

const chat =
document.getElementById(
"supportMessages"
);

if(!chat) return;

chat.innerHTML="";

messages.forEach(msg=>{

chat.innerHTML += `

<div class="member">

<b>${msg.sender}</b>

<br>

${msg.message}

</div>

`;

});

};

// =========================
// ADMIN REPLY
// =========================

window.replySupport =
function(){

const text =
document.getElementById(
"replyText"
).value;

if(!text) return;

let replies =
JSON.parse(
localStorage.getItem(
"adminReplies"
)
) || [];

replies.push({

sender:"Admin",

message:text

});

localStorage.setItem(
"adminReplies",
JSON.stringify(replies)
);

alert("Reply Sent");

};

// =========================
// LOAD EVERYTHING
// =========================

window.onload = function(){

loadMembers();

loadSupport();

};
