// ===== USERS =====
const users = [
    { username:"omar", password:"1234" },
    { username:"ali", password:"abcd" }
];

// ===== PLAYERS =====
const players = [
    { name:"Selim", points:5 },
    { name:"Ali Neymar", points:4 },
    { name:"Mo Moataz", points:3 },
    { name:"Mo Kareem", points:6 },
    { name:"Omar Marmoush", points:4 },
    { name:"Ahmed Magdy", points:5 }
];

// ===== LOGIN =====
function login(){
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    const found = users.find(x=>x.username===u && x.password===p);
    if(found){
        localStorage.setItem("currentUser", u);
        window.location="dashboard.html";
    } else {
        document.getElementById("error").innerText="❌ Wrong username or password!";
    }
}

// ===== DASHBOARD =====
if(location.pathname.endsWith("dashboard.html")){
    const user = localStorage.getItem("currentUser");
    if(!user) window.location="index.html";
    document.getElementById("user").innerText = user;

    let selectedPlayers = [];
    let slots = document.querySelectorAll(".slot");
    let teamPoints = document.getElementById("team-points");

    // Add click to slots
    slots.forEach(slot=>{
        slot.addEventListener("click", ()=>{
            if(selectedPlayers.length>=4){
                document.getElementById("message").innerText="⚠️ Max 4 players!";
                return;
            }
            openPlayerMenu(slot);
        });
    });

    // Apply team
    document.getElementById("apply-team-btn").addEventListener("click", ()=>{
        if(selectedPlayers.length!==4){
            document.getElementById("message").innerText="⚠️ You must select exactly 4 players!";
            return;
        }
        let total = selectedPlayers.reduce((s,p)=>s+p.points,0);
        teamPoints.innerText = total;
    });

    // Open player menu
    function openPlayerMenu(slot){
        const menu = document.getElementById("team-menu");
        const container = document.getElementById("player-options");
        container.innerHTML="";
        players.forEach(p=>{
            if(!selectedPlayers.includes(p)){
                const div = document.createElement("div");
                div.className="player-card";
                div.innerHTML=`<img src="assets/player.png"><p>${p.name} (${p.points})</p>`;
                div.addEventListener("click", ()=>{
                    selectedPlayers.push(p);

                    const divp = document.createElement("div");
                    divp.className="team-player";
                    divp.style.left = slot.style.left;
                    divp.style.top = slot.style.top;
                    divp.innerHTML=`<img src="assets/player.png"><p>${p.name} (${p.points})</p>`;
                    slot.parentNode.appendChild(divp);

                    slot.style.display="none"; // hide slot after player added
                    menu.style.display="none";
                });
                container.appendChild(div);
            }
        });
        menu.style.display="block";
    }
}

function closePlayerMenu(){ document.getElementById("team-menu").style.display="none"; }
