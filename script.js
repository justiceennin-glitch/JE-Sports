const overlay = document.getElementById('overlay');
const slip = document.getElementById('betSlip');

document.getElementById('placeBet').addEventListener('click', () => {
  overlay.classList.remove('hidden');
});

document.getElementById('okBtn').addEventListener('click', () => {
  overlay.classList.add('hidden');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  slip.style.display = 'none';
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) overlay.classList.add('hidden');
});
