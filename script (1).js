
const TEAMS=[
"Arsenal","Chelsea","Liverpool","Manchester City","Manchester United","Tottenham Hotspur","Newcastle United","Aston Villa","Barcelona","Real Madrid","Atlético Madrid","Sevilla","Valencia","Inter Milan","AC Milan","Juventus","Napoli","Bayern Munich","Borussia Dortmund","Bayer Leverkusen","Paris Saint-Germain","Marseille","Lyon","Ajax","PSV Eindhoven","Feyenoord","Benfica","Porto","Sporting CP","Galatasaray","Fenerbahçe","Al Ahly","Zamalek","Hearts of Oak","Asante Kotoko","Kumasi King Faisal","Orlando Pirates","Mamelodi Sundowns","LA Galaxy","Inter Miami","New York City FC"
];
function renderTeams(){const q=(document.getElementById("teamSearch")?.value||"").toLowerCase();document.getElementById("teamsGrid").innerHTML=TEAMS.filter(t=>t.toLowerCase().includes(q)).map(t=>`<div class="team">⚽ ${t}</div>`).join("")||"<p class='muted'>No team found.</p>"}
function formPoints(s){const a=(s||"").toUpperCase().split(/\s+/).filter(Boolean);return a.reduce((n,x)=>n+(x==="W"?3:x==="D"?1:0),0)}
function predict(){
 const h=document.getElementById("home").value.trim()||"Home team",a=document.getElementById("away").value.trim()||"Away team";
 const hp=formPoints(document.getElementById("homeForm").value),ap=formPoints(document.getElementById("awayForm").value);
 const diff=hp-ap; let pick="Draw", conf=50;
 if(diff>0){pick=h+" win";conf=Math.min(85,58+diff*5)} else if(diff<0){pick=a+" win";conf=Math.min(85,58+Math.abs(diff)*5)}
 const result=document.getElementById("predictionResult");result.hidden=false;
 result.innerHTML=`<div class="eyebrow">AI-STYLE ANALYSIS</div><h3>${pick}</h3><p class="confidence">${conf}% estimated confidence</p><p>Recent-form points: <strong>${h} ${hp}</strong> vs <strong>${a} ${ap}</strong>. This is an automated estimate from the information entered, not a guaranteed outcome.</p>`;
}
async function loadMatches(){
 const status=document.getElementById("liveStatus"),box=document.getElementById("matches");
 const url=localStorage.getItem("jeLiveApiUrl"),key=localStorage.getItem("jeLiveApiKey");
 if(!url){status.textContent="No live-data provider is configured yet. Open Admin → Football data settings to connect one.";box.innerHTML="";return}
 status.textContent="Loading live matches…";
 try{
   const headers=key?{"x-api-key":key}:{}; const r=await fetch(url,{headers}); if(!r.ok)throw new Error("API request failed");
   const data=await r.json(); const games=data.response||data.matches||data.games||[];
   box.innerHTML=games.slice(0,30).map(g=>{
     const home=g.teams?.home?.name||g.homeTeam?.name||g.home||"Home",away=g.teams?.away?.name||g.awayTeam?.name||g.away||"Away";
     const hs=g.goals?.home??g.score?.fullTime?.home??g.homeScore??"-",as=g.goals?.away??g.score?.fullTime?.away??g.awayScore??"-";
     const st=g.fixture?.status?.short||g.status||g.utcDate||"Scheduled";
     return `<article class="match"><span class="status">${st}</span><div class="teams">${home}<br>vs<br>${away}</div><div class="score">${hs} — ${as}</div></article>`;
   }).join("")||"<p class='muted'>No matches returned by the provider.</p>";
   status.textContent="Live data updated.";
 }catch(e){status.textContent="Could not load live data. Check the API URL, key, and CORS settings.";box.innerHTML=""}
}
document.addEventListener("DOMContentLoaded",()=>{renderTeams();loadMatches()});
