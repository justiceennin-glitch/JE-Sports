
const KEY="jeSportsPredictions";
function getPublicData(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function renderPublic(){
  const data=getPublicData(), box=document.getElementById("predictionCards"), empty=document.getElementById("emptyPredictions");
  if(!box)return;
  box.innerHTML="";
  data.slice().reverse().forEach(x=>{
    const card=document.createElement("article");
    card.className="prediction-card";
    card.innerHTML=`<span class="eyebrow">${escapeHtml(x.league)}</span><h3>${escapeHtml(x.home)} <small>vs</small> ${escapeHtml(x.away)}</h3><p class="pick">${escapeHtml(x.pick)}</p><div class="confidence">${escapeHtml(x.confidence)}% confidence</div><p>${escapeHtml(x.analysis||"Match analysis available.")}</p><small>ID: ${escapeHtml(x.id)}</small>`;
    box.appendChild(card);
  });
  empty.hidden=data.length!==0;
}
function toggleMenu(){document.getElementById("nav")?.classList.toggle("open")}
document.addEventListener("DOMContentLoaded",()=>{renderPublic();const t=document.getElementById("today");if(t)t.textContent=new Date().toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})});
