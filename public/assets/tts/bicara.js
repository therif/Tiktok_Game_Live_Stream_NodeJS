const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("select");
var ttsproses = false;

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }
   
    option.setAttribute("data-lang", voices[i].name);
    option.setAttribute("data-name", voices[i].lang);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function checkTTSProses(delaynya, msgnya) {
  setTimeout(function() { 
    if (!ttsproses) {
      speak(msgnya, true);
    } else {
      checkTTSProses(delaynya, msgnya); 
    }
  }, delaynya)
}

async function doSpeakAsync(msgnya) {
  speak(msgnya);
}


function speak(msgnya, repeated = false) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    
    if (!repeated) {
      checkTTSProses(1000, msgnya);
    }
    return;
  }

  if (msgnya !== "") {
    ttsproses = true;
    const utterThis = new SpeechSynthesisUtterance(msgnya);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };
  
    var selectedOption = "Google US English | en-US";
    // INTERNET EXPLORER
    if (navigator.userAgent.indexOf("MSIE") != -1 ) {
      selectedOption = "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)";
      ratespdnya = 1.4;
      pitchnya = 1.2;
    }
    // EDGE
    else if (navigator.userAgent.indexOf("Edge") != -1 || navigator.userAgent.indexOf("Edg") != -1) {
      selectedOption = "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)";
      ratespdnya = 1.4;
      pitchnya = 1.2;
    }
    //CHROME
    else if (navigator.userAgent.indexOf("Chrome") != -1 ) {
      selectedOption = "Google Bahasa Indonesia";
      ratespdnya = 1.2;
      pitchnya = 1.2;
    }
    
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        console.log(i+" SEL -> "+voices[i].name+" | "+voices[i].lang);
        break;
      }
    }
    
    utterThis.pitch = pitchnya;
    utterThis.rate = ratespdnya;
    synth.speak(utterThis);    
  }

  ttsproses = false;
}

// pitch.onchange = function () {
//   pitchValue.textContent = pitch.value;
//   console.log(" Sett rate -> "+pitch.value+" | "+pitchValue.textContent);
// };

// rate.onchange = function () {
//   rateValue.textContent = rate.value;
//   console.log(" Sett rate -> "+rate.value+" | "+rateValue.textContent);
// };

