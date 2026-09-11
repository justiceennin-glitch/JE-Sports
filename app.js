const matches=[
["Premier League","Aston Villa","Nottm Forest","14:00","2.34","3.43","3.22"],
["Premier League","Bournemouth","Brentford","16:30","2.10","3.55","3.40"],
["La Liga","Barcelona","Valencia","19:00","1.52","4.60","6.20"],
["Bundesliga","Bayern Munich","Dortmund","18:30","1.70","4.10","4.50"],
["Serie A","Inter Milan","Roma","20:45","1.80","3.70","4.20"]
];
let slip=[];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

function card(m){return `<article class="match"><div class="match-top"><span>${m[0]}</span><span>${m[3]}</span></div><div class="teams">${m[1]}<br>${m[2]}</div><div class="odds">
<button data-pick="${m[1]} vs ${m[2]}" data-odd="${m[4]}">1 <strong>${m[4]}</strong></button>
<button data-pick="${m[1]} vs ${m[2]}" data-odd="${m[5]}">X <strong>${m[5]}</strong></button>
<button data-pick="${m[1]} vs ${m[2]}" data-odd="${m[6]}">2 <strong>${m[6]}</strong></button></div></article>`}
function render(){ $("#featured").innerHTML=matches.slice(0,2).map(card).join(""); $("#sportsMatches").innerHTML=matches.map(card).join(""); $("#liveMatches").innerHTML=matches.slice(1,4).map((m,i)=>card([...m,i?"":"LIVE"]).replace(m[3],i?"LIVE":"LIVE")).join(""); bindOdds();}
function bindOdds(){$$(".odds button").forEach(b=>b.onclick=()=>{slip.push({pick:b.dataset.pick,odd:+b.dataset.odd});updateSlip()})}
function updateSlip(){let n=slip.length;$("#betCount").textContent=n;$("#bottomCount").textContent=n;$("#slipItems").innerHTML=n?slip.map((x,i)=>`<div class="match"><b>${x.pick}</b><span> • Odds ${x.odd}</span></div>`).join(""):`<p class="muted">Your bet slip is empty.</p>`;$("#totalOdds").textContent=n?slip.reduce((a,x)=>a*x.odd,1).toFixed(2):"0.00";}
function showPage(id){$$(".page").forEach(p=>p.classList.toggle("active",p.id===id));$$(".tabs button,.bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===id));scrollTo(0,0)}
document.addEventListener("click",e=>{const p=e.target.closest("[data-page]");if(p)showPage(p.dataset.page)});
$("#betsBtn").onclick=$("#bottomSlip").onclick=()=>$("#betslip").classList.add("open");
$("#closeBet").onclick=()=>$("#betslip").classList.remove("open");
$("#placeDemo").onclick=()=>alert(slip.length?"Demo bet created. Connect your own payment/betting backend for real transactions.":"Add a selection first.");
$("#codeBtn").onclick=()=>$("#codeModal").classList.add("show");
$("#filterBtn").onclick=()=>$("#filterModal").classList.add("show");
$$(".close").forEach(x=>x.onclick=()=>x.closest(".modal").classList.remove("show"));
$("#loadCode").onclick=()=>{$("#codeResult").textContent=$("#bookingInput").value.trim()?"Demo booking code loaded.":"Enter a code first."};
$("#applyFilter").onclick=()=>{let min=+$("#minOdds").value,max=+$("#maxOdds").value;$$(".match").forEach(m=>m.style.display=[...m.querySelectorAll(".odds button")].some(b=>+b.dataset.odd>=min&&+b.dataset.odd<=max)?"block":"none");$("#filterModal").classList.remove("show")};
$("#simulate").onclick=()=>alert("New virtual fixture generated (demo).");
$("#searchBtn").onclick=()=>{let q=prompt("Search teams or leagues");if(q)alert("Demo search: "+q)};
render();updateSlip();