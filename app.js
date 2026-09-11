const demoPredictions=[
 {home:"Barcelona",away:"Valencia",pick:"Home Win",score:"2–1",confidence:"Medium",note:"Demo data — connect a verified football-data API for live analysis."},
 {home:"Arsenal",away:"Chelsea",pick:"Over 1.5 Goals",score:"2–1",confidence:"Medium",note:"Demo data — replace with current fixture and statistical inputs."},
 {home:"Inter",away:"Roma",pick:"Double Chance: 1X",score:"1–0",confidence:"Medium",note:"Demo data — not a guaranteed result."}
];
function renderPredictions(){
 const el=document.querySelector("#vipList");
 el.innerHTML=demoPredictions.map(x=>`<article class="card"><h3>${x.home} vs ${x.away}</h3><div class="pick">${x.pick}</div><span class="confidence">${x.confidence} confidence</span><p>Correct-score model: <b>${x.score}</b></p><small>${x.note}</small></article>`).join("");
 const vals={Low:45,Medium:68,High:86}; document.querySelector("#confidence").textContent="68%";
}
let scores=[
 {home:"Manchester City",away:"Liverpool",status:"Scheduled",score:"—"},
 {home:"Real Madrid",away:"Sevilla",status:"Scheduled",score:"—"},
 {home:"AC Milan",away:"Napoli",status:"Scheduled",score:"—"}
];
function renderScores(){
 document.querySelector("#scoreList").innerHTML=scores.map(s=>`<article class="card score"><div><h3>${s.home}</h3><h3>${s.away}</h3></div><div><span class="${s.status==='LIVE'?'live':''}">${s.status}</span><p><b>${s.score}</b></p></div></article>`).join("");
}
function refreshScores(){
 document.querySelector("#updated").textContent="Refreshing…";
 setTimeout(()=>{renderScores();document.querySelector("#updated").textContent="Updated "+new Date().toLocaleTimeString();},500);
}
renderPredictions();renderScores();
