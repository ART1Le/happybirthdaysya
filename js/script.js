const quizData = [
  { q: "Kapan pertama kali kita jalan? (ddmmyyyy)", a: "08092025", type: "text" },
  { q: "Apa nama panggilan yang kamu kasih ke aku?", a: "sey", type: "text" },
  { q: "Apa lagu yang pertama kali aku kasih tau ke kamu?", a: "softspot", type: "text" },
  { q: "Siapa yang suka bete? (pake nama panggilan)", a: "sya", type: "text" },
  { q: "Siapa yang makannya bisa 4x sehari? (pake nama panggilan)", a: "sya", type: "text" },
  { q: "Kapan sey ulang tahun? (ddmmyyyy)", a: "21102002", type: "text" },
  { q: "Kapan sya ulang tahun? (ddmmyyyy)", a: "11092005", type: "text" },
  { 
    q: '🔒CODE KHUSUS🔒<br><span style="font-size:0.9rem;">yang aku selalu kasih tau ke kamu (tanya sey klo ga inget)💌</span>', 
    a: "PerjalananKitaMasihPanjangYangDiSelesaikanMasalahnyaBukanHubungannya", 
    type: "text" 
  },
  { q: "sya sayang sey gaa?", a: "sayang", type: "button" }
];


let currentQuestion = 0;
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const intro = document.getElementById('intro');

// Love jatuh dari awal
setInterval(createHeart, 300);

function loadQuestion() {
  quizContainer.innerHTML = "";
  if(currentQuestion < quizData.length) {
    const qData = quizData[currentQuestion];

    if(qData.type === "text") {
      quizContainer.innerHTML = `
        <p>${qData.q}</p>
        <input type="text" id="answerInput" placeholder="Jawaban...">
        <br><button onclick="checkAnswer()">Next</button>
      `;
    } else if(qData.type === "button") {
      quizContainer.innerHTML = `
        <p>${qData.q}</p>
        <button onclick="checkAnswer('sayang')">sayang</button>
        <button onclick="checkAnswer('ngga')">ngga</button>
      `;
    }
  } else {
    showFinalMessage();
  }
}

function checkAnswer(input) {
  const qData = quizData[currentQuestion];
  let answer = input;
  if(qData.type === "text") {
    answer = document.getElementById('answerInput').value.toLowerCase();
    if(answer !== qData.a.toLowerCase()) {
      alert("Jawaban salah 😢, coba lagi!");
      return;
    }
  } else if(qData.type === "button") {
    if(answer === "ngga") {
      quizContainer.innerHTML = `
        <p>Gaboleh... sey aja sayang kamuuu, masa kamu ga sayang? harus sayang donggg wleee</p>
        <button onclick="checkAnswer('sayang')">sayang</button>
        <button onclick="checkAnswer('sayang')">sayang</button>
      `;
      return;
    }
  }

  currentQuestion++;
  loadQuestion();
}

function showFinalMessage() {
  quizContainer.style.display = 'none';
  intro.style.display = 'none';
  document.body.classList.add('final-active');

  // ❤️ Happy Birthday langsung muncul
  resultContainer.innerHTML = `<p style="font-weight:bold; font-size:1.5rem; text-align:center;">❤️ Happy Birthday ❤️</p>`;

  // Kata-per-kata untuk paragraf berikut
  const finalText = `
<p>Hii sayang, bcs hari ini hari special kamu dan yang aku tunggu tunggu juga hehehe, happy birthday beautiful girl sya...</p>
<p>semoga kamu selalu diberi kesehatan terus, semoga bahagia selalu yaa, makin sayang keluarga, sahabat, temen sama aku juga deh hehehe, menjadi pribadi yang lebih baik, semoga semua usaha, rezeki dan mimpi kamu dilancarkan dan bisa tercapai.., semangat terus yaa jangan gampang nyerah, jangan gampang cape yaa? apa lagi buat KITA, JANJI?!?!</p>
<p>ciee yang udah 20 makin dewasa ya cantikk, maaf ya sayang kalau sampe detik ini aku belum bisa buat kamu happy terus, egonya aku masih tinggi, masih belum bisa ngertiin kamu, masih sering buat kamu sedih but trust me, that is not what i want. i always try to improve myself and become what we expect. maaf juga kalau semua hadiah dari aku ada yang ga kamu suka, terima kasih udah jadi orang yang selalu ada buat aku, mau nerima kekurangan dan kelebihan aku, masih mau sabar sama sikap aku, masih bisa bertahan sampe detik ini.</p>
<p>aku janji sama kamu, aku selalu mengusahakan apa yang terbaik buat KITA, nemenin kamu saat happy maupun sedih. HAPPY BITHDAY SEKALI LAGI YA CANTIK HEHEHE, pesan aku buat kamu inget terus ya sama 🔒CODE KHUSUS🔒 -sey"</p>
`;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = finalText;
  const paragraphs = Array.from(tempDiv.children);

  let paraIndex = 0;

  function showNextParagraph() {
    if(paraIndex < paragraphs.length) {
      const p = document.createElement('p');
      p.style.textAlign = "center";
      resultContainer.appendChild(p);
      const words = paragraphs[paraIndex].innerText.split(" ");
      let wordIndex = 0;

      function showNextWord() {
        if(wordIndex < words.length) {
          p.innerHTML += words[wordIndex] + " ";
          wordIndex++;
          setTimeout(showNextWord, 200);
        } else {
          paraIndex++;
          showNextParagraph();
        }
      }

      showNextWord();
    } else {
      // Final Love di bawah
      const finalLove = document.createElement('div');
      finalLove.id = 'finalLove';
      finalLove.textContent = 'I LOVE YOU SO MUCH!!';
      resultContainer.appendChild(finalLove);

      // QR code
      generateQR();
    }
  }

  showNextParagraph();
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';

  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = '-50px';
  heart.style.fontSize = (20 + Math.random() * 30) + 'px';
  heart.style.animationDuration = (3 + Math.random() * 3) + 's';

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

function generateQR() {
  const qrDiv = document.getElementById('qrcode');
  QRCode.toCanvas(qrDiv, 'https://ART1Le.github.io/happybirthdaysya/', function (error) {
    if (error) console.error(error);
  });
}

// Mulai quiz
loadQuestion();

