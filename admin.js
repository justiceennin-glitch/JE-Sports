
const PASS="JE2026";
function login(){if(document.getElementById("password").value.trim()===PASS){sessionStorage.jeAdmin="1";document.getElementById("loginBox").hidden=true;document.getElementById("dashboard").hidden=false;loadSettings();renderPosts()}else{const m=document.getElementById("loginMsg");m.hidden=false;m.textContent="Incorrect password."}}
function togglePass(){const x=document.getElementById("password");x.type=x.type==="password"?"text":"password"}
function loadSettings(){document.getElementById("apiUrl").value=localStorage.getItem("jeLiveApiUrl")||"";document.getElementById("apiKey").value=localStorage.getItem("jeLiveApiKey")||""}
function saveSettings(){localStorage.setItem("jeLiveApiUrl",document.getElementById("apiUrl").value.trim());localStorage.setItem("jeLiveApiKey",document.getElementById("apiKey").value.trim());const m=document.getElementById("settingsMsg");m.hidden=false;m.textContent="Settings saved on this browser."}

function generateAIAnalysis(){
  const h=document.getElementById("home").value.trim();
  const a=document.getElementById("away").value.trim();
  const pk=document.getElementById("pick").value.trim();
  const cf=document.getElementById("confidence").value.trim();
  const box=document.getElementById("analysis");
  const status=document.getElementById("aiStatus");
  if(!h||!a){status.textContent="Enter both team names first.";return}
  const pick=pk||"the selected outcome";
  const confidence=cf?` The current confidence level is ${cf}%, so this should be treated as an estimate rather than a certainty.`:""
  box.value=`${h} vs ${a}: ${h} will look to use its strengths and create chances, while ${a} will aim to stay organised and respond in transition. The selected football outcome is ${pick}. Key factors to monitor are recent form, attacking efficiency, defensive consistency, home advantage and team news.${confidence}`;
  status.textContent="AI-style analysis generated. Review it before publishing.";
}

function savePost(){const posts=JSON.parse(localStorage.getItem("jePosts")||"[]");posts.push({id:"JE-"+Date.now().toString(36).toUpperCase(),home:home.value.trim(),away:away.value.trim(),pick:pick.value.trim(),confidence:confidence.value,analysis:analysis.value.trim()});localStorage.setItem("jePosts",JSON.stringify(posts));clearPost();renderPosts()}
function clearPost(){home.value="";away.value="";pick.value="";confidence.value="";analysis.value=""}
function renderPosts(){const p=JSON.parse(localStorage.getItem("jePosts")||"[]");posts.innerHTML=p.slice().reverse().map(x=>`<div class="post"><button onclick="delPost('${x.id}')">Delete</button><strong>${x.home} vs ${x.away}</strong><br><span class="confidence">${x.pick} • ${x.confidence}%</span><p>${x.analysis||""}</p><small>${x.id}</small></div>`).join("")||"<p class='muted'>No analysis posts yet.</p>"}
function delPost(id){const p=JSON.parse(localStorage.getItem("jePosts")||"[]").filter(x=>x.id!==id);localStorage.setItem("jePosts",JSON.stringify(p));renderPosts()}
document.addEventListener("DOMContentLoaded",()=>{if(sessionStorage.jeAdmin==="1"){loginBox.hidden=true;dashboard.hidden=false;loadSettings();renderPosts()}})
