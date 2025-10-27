function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// 🧊 IQC Generator
async function makeIQC() {
  const text = document.getElementById('iqcText').value;
  if (!text) return alert('Tolong isi teksnya!');
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(time)}&messageText=${encodeURIComponent(text)}&carrierName=INDOSAT%20OORE...&batteryPercentage=${Math.floor(Math.random()*100)+1}&signalStrength=4&emojiStyle=apple`;
  document.getElementById('iqcResult').innerHTML = `<img src="${url}" alt="IQC Image">`;
}

// 🎭 Fake Story Generator
async function makeFakeStory() {
  const user = document.getElementById('fsUsername').value || "User";
  const caption = document.getElementById('fsCaption').value || "Keren banget!";
  const avatar = "https://raw.githubusercontent.com/upcld/dat3/main/uploads/0d7c04-1759118139651.jpg";
  const url = `https://api.ryzumi.vip/api/image/fake-story?username=${encodeURIComponent(user)}&caption=${encodeURIComponent(caption)}&avatar=${encodeURIComponent(avatar)}`;
  document.getElementById('fsResult').innerHTML = `<img src="${url}" alt="Fake Story">`;
}

// 🎬 Downloader (IG + TikTok)
async function downloadVideo() {
  const link = document.getElementById('dlUrl').value;
  if (!link) return alert('Masukkan link dulu!');
  const resEl = document.getElementById('dlResult');
  resEl.innerHTML = "⏳ Sedang mengambil data...";

  try {
    const api = `https://ssvid.net/api/ajax/search?hl=en`;
    const formData = new URLSearchParams();
    formData.append('query', link);
    formData.append('vt', 'home');

    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: formData.toString()
    });

    const data = await res.json();
    if (data && data.medias && data.medias[0].url) {
      const videoUrl = data.medias[0].url;
      resEl.innerHTML = `<video src="${videoUrl}" controls></video><br><a href="${videoUrl}" download>⬇️ Download Video</a>`;
    } else {
      resEl.innerHTML = "❌ Gagal mengambil video. Coba link lain.";
    }
  } catch (e) {
    resEl.innerHTML = `⚠️ Error: ${e.message}`;
  }
}
