const ADMIN_PASSWORD="JE2026";
function getData(){try{return JSON.parse(localStorage.getItem("jeSportsPredictions")||"[]")}catch(e){return[]}}
function setData(d){localStorage.setItem("jeSportsPredictions",JSON.stringify(d))}
function login(){
 const pass=document.getElementById("password").value;
 if(pass===ADMIN_PASSWORD){
  sessionStorage.setItem("jeAdmin","1");showDashboard();
 }else document.getElementById("loginStatus").textContent="Incorrect password.";
}
function logout(){sessionStorage.removeItem("jeAdmin");location.reload()}
function showDashboard(){document.getElementById("loginBox").hidden=true;document.getElementById("dashboard").hidden=false;renderTable()}
function uid(){return "JE-"+Date.now().toString(36).toUpperCase()}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function renderTable(){
 const body=document.getElementById("predictionTable"), data=getData();
 body.innerHTML=data.length?data.map(p=>`<tr><td>${escapeHtml(p.home)} vs ${escapeHtml(p.away)}</td><td>${escapeHtml(p.pick)}</td><td>${escapeHtml(p.confidence)}%</td><td><span class="id-badge">${escapeHtml(p.id)}</span></td><td><button class="button secondary" onclick="editPrediction('${p.id}')">Edit</button><button class="button danger" onclick="deletePrediction('${p.id}')">Delete</button></td></tr>`).join(""):`<tr><td colspan="5">No predictions yet.</td></tr>`;
}
function resetForm(){document.getElementById("predictionForm").reset();document.getElementById("editId").value=""}
document.getElementById("predictionForm").addEventListener("submit",e=>{
 e.preventDefault();
 const data=getData(), edit=document.getElementById("editId").value;
 const item={id:edit||uid(),league:document.getElementById("league").value,confidence:document.getElementById("confidence").value,home:document.getElementById("home").value,away:document.getElementById("away").value,pick:document.getElementById("pick").value,markets:document.getElementById("markets").value.split(",").map(x=>x.trim()).filter(Boolean),analysis:document.getElementById("analysis").value};
 if(edit){const i=data.findIndex(x=>x.id===edit);if(i>=0)data[i]=item}else data.unshift(item);
 setData(data);resetForm();renderTable();
 const s=document.getElementById("saveStatus");s.hidden=false;s.textContent="Prediction saved successfully.";
 setTimeout(()=>s.hidden=true,2500);
});
function editPrediction(id){const p=getData().find(x=>x.id===id);if(!p)return;document.getElementById("editId").value=p.id;document.getElementById("league").value=p.league;document.getElementById("confidence").value=p.confidence;document.getElementById("home").value=p.home;document.getElementById("away").value=p.away;document.getElementById("pick").value=p.pick;document.getElementById("markets").value=(p.markets||[]).join(", ");document.getElementById("analysis").value=p.analysis||"";window.scrollTo({top:0,behavior:"smooth"})}
function deletePrediction(id){if(confirm("Delete this prediction?")){setData(getData().filter(x=>x.id!==id));renderTable()}}
document.addEventListener("DOMContentLoaded",()=>{if(sessionStorage.getItem("jeAdmin")==="1")showDashboard()})