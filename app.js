const data={
live:[
{league:"Premier League",a:"Manchester United",b:"Chelsea",s:"1 - 1",m:"67'"},
{league:"LaLiga",a:"Barcelona",b:"Atlético Madrid",s:"2 - 0",m:"54'"},
{league:"Serie A",a:"Inter",b:"AC Milan",s:"0 - 0",m:"31'"}],
fixtures:[
{league:"Premier League",a:"Arsenal",b:"Liverpool",s:"Today • 18:00"},
{league:"LaLiga",a:"Real Madrid",b:"Sevilla",s:"Today • 20:00"},
{league:"Ghana Premier League",a:"Hearts of Oak",b:"Asante Kotoko",s:"Tomorrow • 16:00"}],
results:[
{league:"UEFA Champions League",a:"PSG",b:"Bayern",s:"2 - 1"},
{league:"Premier League",a:"Manchester City",b:"Tottenham",s:"3 - 2"},
{league:"Serie A",a:"Juventus",b:"Roma",s:"1 - 1"}],
leagues:[
{league:"Premier League",a:"1. Arsenal",b:"2. Liverpool",s:"—"},
{league:"LaLiga",a:"1. Barcelona",b:"2. Real Madrid",s:"—"},
{league:"Ghana Premier League",a:"1. Hearts of Oak",b:"2. Asante Kotoko",s:"—"}]};

let tab="live";
const content=document.querySelector("#content");
function render(){
 const q=document.querySelector("#search").value.toLowerCase();
 const rows=data[tab].filter(x=>(x.a+" "+x.b+" "+x.league).toLowerCase().includes(q));
 content.innerHTML=rows.length?rows.map(x=>`<article class="card"><div class="league">${x.league}</div><div class="match"><div class="team">${x.a}</div><div class="score">${x.s}</div><div class="team">${x.b}</div></div><div class="meta">${tab==="live"?`<span class="live">● LIVE ${x.m}</span>`:x.s}</div></article>`).join(""):`<div class="empty">No matches found.</div>`;
}
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");tab=b.dataset.tab;render()});
document.querySelector("#search").oninput=render;
document.querySelector("#refresh").onclick=()=>{render();alert("Match centre refreshed. Connect a live-score API for real-time data.")};
render();