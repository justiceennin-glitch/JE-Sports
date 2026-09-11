document.getElementById('today').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric',year:'numeric'});
function copyCode(code){navigator.clipboard?.writeText(code);alert('Booking code copied: '+code)}
function toggleMenu(){const n=document.querySelector('.topbar nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='72px';n.style.right='5%';n.style.background='#071512';n.style.padding='18px';n.style.flexDirection='column'}
