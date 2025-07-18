const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeDiv = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');
const sizeSelect = document.getElementById('qr-size');
const toggleBtn = document.getElementById('toggle-mode');
let qr = null;
let dark = false;

// Generate QR code function
function generateQR() {
  const text = qrInput.value.trim();
  const size = parseInt(sizeSelect.value);
  qrCodeDiv.innerHTML = '';
  downloadBtn.disabled = true;
  if (!text) {
    qrCodeDiv.innerHTML = '<span style="color:#c11;font-weight:bold;">Enter some text or a URL!</span>';
    return;
  }
  qr = new QRCode(qrCodeDiv, {
    text: text,
    width: size,
    height: size,
    colorDark: dark ? "#fafafa" : "#222",
    colorLight: dark ? "#23272b" : "#fff",
    correctLevel: QRCode.CorrectLevel.H
  });
  setTimeout(() => {
    downloadBtn.disabled = false;
  }, 300);
}

// Download QR code as PNG
downloadBtn.addEventListener('click', () => {
  // The QR Canvas is the first element child
  const img = qrCodeDiv.querySelector('canvas') || qrCodeDiv.querySelector('img');
  if (img && img.toDataURL) {
    const url = img.toDataURL("image/png");
    triggerDownload(url);
  } else if (img && img.src) {
    triggerDownload(img.src);
  }
});

function triggerDownload(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = 'qrcode.png';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => link.remove(), 100);
}

// Dark/light mode toggle
toggleBtn.addEventListener('click', () => {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  toggleBtn.textContent = dark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙';
  if (qrInput.value.trim()) generateQR();
});

// Generate on button click
generateBtn.addEventListener('click', generateQR);

// Generate on Enter key in input
qrInput.addEventListener('keydown', e => {
  if (e.key === "Enter") generateQR();
});

// Generate on QR size change
sizeSelect.addEventListener('change', () => {
  if (qrInput.value.trim()) generateQR();
});
