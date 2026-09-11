
const ADMIN_PASSWORD = "JE2026";
const KEY = "jeSportsPredictions";

const $ = (id) => document.getElementById(id);

function getData(){
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch(e){ return []; }
}
function setData(data){ localStorage.setItem(KEY, JSON.stringify(data)); }

function showStatus(id, message, good=true){
  const el = $(id);
  el.textContent = message;
  el.classList.remove("hidden");
  el.style.background = good ? "#e5f3ee" : "#fff1f0";
  el.style.color = good ? "#0a684d" : "#b42318";
}
function hideStatus(id){ $(id).classList.add("hidden"); }

function login(){
  const pass = $("password").value.trim();
  if(pass === ADMIN_PASSWORD){
    sessionStorage.setItem("jeAdmin","1");
    $("loginBox").hidden = true;
    $("dashboard").hidden = false;
    hideStatus("loginStatus");
    renderTable();
    $("home")?.focus();
  } else {
    showStatus("loginStatus","Incorrect password. Check the password and try again.",false);
  }
}
function logout(){
  sessionStorage.removeItem("jeAdmin");
  location.reload();
}
function uid(){
  return "JE-" + Date.now().toString(36).toUpperCase();
}
function resetForm(){
  $("predictionForm").reset();
  $("editId").value = "";
  $("formTitle").textContent = "Add prediction";
  $("saveButton").textContent = "Save prediction";
  hideStatus("saveStatus");
  window.scrollTo({top:0,behavior:"smooth"});
}
function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}
function renderTable(){
  const data = getData();
  const tbody = $("predictionTable");
  tbody.innerHTML = "";
  data.slice().reverse().forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="Match"><div class="match-name">${escapeHtml(item.home)} vs ${escapeHtml(item.away)}</div><small>${escapeHtml(item.league)}</small></td>
      <td data-label="Pick"><span class="pick">${escapeHtml(item.pick)}</span></td>
      <td data-label="Confidence"><span class="confidence">${escapeHtml(item.confidence)}%</span></td>
      <td data-label="ID"><span class="id-pill">${escapeHtml(item.id)}</span></td>
      <td data-label="Actions">
        <div class="row-actions">
          <button class="small-btn secondary" type="button" onclick="editPrediction('${item.id}')">Edit</button>
          <button class="small-btn danger" type="button" onclick="deletePrediction('${item.id}')">Delete</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });

  $("emptyPredictions").classList.toggle("hidden", data.length !== 0);
  $("totalCount").textContent = data.length;
  $("leagueCount").textContent = new Set(data.map(x => x.league).filter(Boolean)).size;
  const avg = data.length ? Math.round(data.reduce((sum,x)=>sum + Number(x.confidence||0),0)/data.length) : 0;
  $("avgConfidence").textContent = avg + "%";
}
function editPrediction(id){
  const item = getData().find(x => x.id === id);
  if(!item) return;
  $("editId").value = item.id;
  $("league").value = item.league || "Other";
  $("confidence").value = item.confidence || "";
  $("home").value = item.home || "";
  $("away").value = item.away || "";
  $("pick").value = item.pick || "";
  $("markets").value = item.markets || "";
  $("analysis").value = item.analysis || "";
  $("formTitle").textContent = "Edit prediction";
  $("saveButton").textContent = "Update prediction";
  hideStatus("saveStatus");
  window.scrollTo({top:0,behavior:"smooth"});
}
function deletePrediction(id){
  const data = getData();
  const item = data.find(x => x.id === id);
  if(!item) return;
  if(!confirm(`Delete "${item.home} vs ${item.away}"?`)) return;
  setData(data.filter(x => x.id !== id));
  renderTable();
  showStatus("saveStatus","Prediction deleted.");
}

$("predictionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const confidence = Number($("confidence").value);
  if(confidence < 1 || confidence > 99){
    showStatus("saveStatus","Confidence must be between 1 and 99.",false);
    return;
  }

  const data = getData();
  const existingId = $("editId").value;
  const item = {
    id: existingId || uid(),
    league: $("league").value,
    confidence,
    home: $("home").value.trim(),
    away: $("away").value.trim(),
    pick: $("pick").value.trim(),
    markets: $("markets").value.trim(),
    analysis: $("analysis").value.trim()
  };

  if(existingId){
    const index = data.findIndex(x => x.id === existingId);
    if(index >= 0) data[index] = item;
  } else {
    data.push(item);
  }
  setData(data);
  renderTable();
  showStatus("saveStatus", existingId ? "Prediction updated successfully." : "Prediction saved successfully.");
  resetForm();
  showStatus("saveStatus", existingId ? "Prediction updated successfully." : "Prediction saved successfully.");
});

$("loginButton").addEventListener("click", login);
$("logoutButton").addEventListener("click", logout);
$("clearButton").addEventListener("click", resetForm);
$("togglePassword").addEventListener("click", () => {
  const input = $("password");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  $("togglePassword").textContent = visible ? "Show" : "Hide";
});
$("password").addEventListener("keydown", e => {
  if(e.key === "Enter") login();
});

document.addEventListener("DOMContentLoaded", () => {
  if(sessionStorage.getItem("jeAdmin") === "1"){
    $("loginBox").hidden = true;
    $("dashboard").hidden = false;
    renderTable();
  }
});
