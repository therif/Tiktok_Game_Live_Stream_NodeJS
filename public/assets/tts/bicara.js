const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("select");

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

async function doSpeakAsync(msgnya, ratespdnya, pitchnya) {
  speak(msgnya, ratespdnya, pitchnya);
}


function speak(msgnya, ratespdnya, pitchnya) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (msgnya !== "") {
    const utterThis = new SpeechSynthesisUtterance(msgnya);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption = "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)"; 
    //Google Bahasa Indonesia 
    //Microsoft Siti Online (Natural) - Javanese (Indonesia)
    //Microsoft Gadis Online (Natural) - Indonesian (Indonesia)

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
}

// pitch.onchange = function () {
//   pitchValue.textContent = pitch.value;
//   console.log(" Sett rate -> "+pitch.value+" | "+pitchValue.textContent);
// };

// rate.onchange = function () {
//   rateValue.textContent = rate.value;
//   console.log(" Sett rate -> "+rate.value+" | "+rateValue.textContent);
// };

