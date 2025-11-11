const players = [
    { name: "Selim", points: 5, goals: 2, assists: 1, position: "Forward" },
    { name: "Ali Neymar", points: 4, goals: 1, assists: 2, position: "Midfielder" },
    { name: "Mo Moataz", points: 3, goals: 0, assists: 1, position: "Defender" },
    { name: "Mo Kareem", points: 6, goals: 3, assists: 0, position: "Forward" },
    { name: "Omar Marmoush", points: 4, goals: 1, assists: 1, position: "Midfielder" },
    { name: "Mody", points: 5, goals: 2, assists: 1, position: "Goalkeeper" }
];

const matches = [
    { match: "Team A vs Team B", score: "2 - 1" },
    { match: "Team C vs Team D", score: "1 - 3" },
    { match: "Team E vs Team F", score: "0 - 0" }
];

let selectedPlayers = [null,null,null,null];
let currentSlot = null;
let totalPoints = 0;

// Render matches
function renderMatches() {
    const ul = document.getElementById("matches");
    ul.innerHTML = "";
    matches.forEach(m => {
        const li = document.createElement("li");
        li.innerText = `${m.match} → ${m.score}`;
        ul.appendChild(li);
    });
}

// Setup slots
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("click", ()=>{
        currentSlot = parseInt(slot.dataset.slot);
        openPlayerMenu(currentSlot);
    });
});

// Player menu
function openPlayerMenu(slotIndex){
    const menu = document.getElementById("team-menu");
    const container = document.getElementById("player-options");
    container.innerHTML="";
    players.forEach(p=>{
        if(!selectedPlayers.includes(p)){
            const div=document.createElement("div");
            div.classList.add("player-card");
            div.innerHTML=`<img src="assets/player.png"><p>${p.name} (${p.points} pts)</p>`;
            div.addEventListener("click",()=>{
                selectedPlayers[slotIndex]=p;
                renderTeam();
                closePlayerMenu();
            });
            container.appendChild(div);
        }
    });
    menu.style.display="block";
}

function closePlayerMenu(){
    document.getElementById("team-menu").style.display="none";
}

// Render team on pitch
function renderTeam(){
    const drop=document.getElementById("team-dropzone");
    drop.querySelectorAll(".team-player").forEach(d=>d.remove());
    selectedPlayers.forEach((p,i)=>{
        if(p){
            const slot=document.querySelector(`.slot[data-slot="${i}"]`);
            const div=document.createElement("div");
            div.classList.add("team-player");
            div.style.left=slot.style.left;
            div.style.top=slot.style.top;
            div.innerHTML=`<img src="assets/player.png"><p>${p.name} (${p.points} pts)</p>`;
            div.addEventListener("click",()=>{
                selectedPlayers[i]=null;
                renderTeam();
            });
            drop.appendChild(div);
        }
    });
}

// Apply team
document.getElementById("apply-team-btn").addEventListener("click",()=>{
    if(selectedPlayers.includes(null)){
        document.getElementById("message").innerText="⚠️ Select exactly 4 players!";
        return;
    }
    totalPoints = selectedPlayers.reduce((sum,p)=>sum+p.points,0);
    document.getElementById("team-points").innerText=`Team Points: ${totalPoints}`;
});

// Initialize
renderMatches();
