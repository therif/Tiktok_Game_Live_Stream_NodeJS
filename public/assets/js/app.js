// DATA
let connection = new TikTokIOConnection(undefined);
let gameWords = [];
let gamegameSelectedWord = null;
let gameStarted = false;
let gameTimer = null;
let gameKata = true;

// Config
let confComment = false;
let confLike = false;
let confShare = false;
let confJoin = false;
let confJoinTTS = false;
let confCommentTTS = false;
let confGiftTTS = false;
let confPrintSound = false;
let confSayTTS = false;

// START
$(document).ready(() => {
    // Resize
    function resizeContainer() {
        let height = window.innerHeight;
        let width = Math.round((9 / 16) * height);
        $("#gameSize").html(width + 'x' + height);
        $(".container").outerWidth(width);
        $(".background").outerWidth(width);
        $(".printer").outerWidth(width);
        $(".animation").outerWidth(width);

        // Paper
        if (window.innerWidth >= 1366) {
            var paperHeight = $("#paperContainer").outerHeight() - 20;
        } else {
            var paperHeight = $("#paperContainer").outerHeight() + 7;
        }
        $("#paper").outerHeight(paperHeight);
    }
    resizeContainer();
    $(window).resize(function() {
        resizeContainer();
    });

    // Connect
    $("#targetConnect").click(function(e) {

        // Populate dummy
        for (let i = 0; i < 10; i++) {
            addContent("<div style='text-align:center;'>Welcome 🥳🥳🥳</div>");
            addContent("<div style='text-align:center;'>Share, Comment and Like</div>");
            addContent("<div style='text-align:center;'>Dapatkan Kata-kata Konyol! Lucu! dan Mungkin Bijak :D</div>");
        }

        loadSetting();

        let targetLive = $("#targetUsername").val();
        connect(targetLive);

        
    });

    // Test
    $("#btnPrepare").click(function(e) {
        // Check sound
        //playSound(1);
        //playSound(2);
        //playSound(3);
        //playSound(4);
        //speakTTS(MSG_TEST);
        
        // Load game
        loadGame();
    });

    // Save config
    $("#btnSave").click(function(e) {
        loadSetting();
    });
})

/*
* GAME PLAY
*/

function speakTTS(msg) {
    // speak(msg, {
    //     amplitude: 100,
    //     pitch: 50,
    //     speed: 150,
    //     wordgap: 5
    // });

    doSpeakAsync(msg, 1.4, 1.2);
}

function censor(word) {
    let censored = [];
    let length = word.length;
    let target = Math.ceil(length / 2);

    let range_start = 2;
    let range_end = target;

    for (let i = 0; i < length; i++) {
        let c = word.charAt(i);
        if (i >= range_start && i <= range_end) {
            censored.push("*");
        } else {
            censored.push(c);
        }
    }

    return censored.join("");
}

function copyArray(a) {
    let b = [];
    for (i = 0; i < a.length; i++) {
        b[i] = a[i];
    }
    return b;
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return copyArray(a);
}

function countDown() {
    // Counter
    let timeleft = 60 * 5; // 5 Mins

    // Clear
    if (gameTimer != null) {
        clearInterval(gameTimer);
    }

    // Start
    gameTimer = setInterval(function() {
        // Reset
        if (timeleft <= 0){
            clearInterval(gameTimer);
            loadGame();
        }

        // Set
        $("#gameTimeout").html(timeleft.toLocaleString() + "s");
        timeleft -= 1;

    }, 1000);
}

function loadGame() {
    // Check
    if (gameWords.length < 1) {
        gameWords = shuffle(WORDS);
    }

    // Load
    gameSelectedWord = gameWords.pop();

    // Set remain words
    $("#gameWords").html(gameWords.length);

    // Check
    if (typeof gameSelectedWord === 'string') {
        // Normalize
        if (gameKata) {
            splittedWord = gameSelectedWord.split("|");
            gameSelectedWord = splittedWord[1];

            $("#textGuess").html("<div style='font-size:70%;padding-bottom:5px;'>" + splittedWord[0] + "</div>" + censor(gameSelectedWord));
        } else {
            // Set
            $("#textGuess").html("<div style='font-size:70%;padding-bottom:5px;'>" + gameSelectedWord+ "</div>");
        }       

        // Timeout
        countDown()

        gameStarted = true;

    } else {
        loadGame();
    }
}

function loadGameKalimat() {
    // Check
    if (gameWords.length < 1) {
        gameWords = shuffle(WORDS);
    }

    // Load
    gameSelectedWord = gameWords.pop();

    // Set remain words
    $("#gameWords").html(gameWords.length);

    // Check
    if (typeof gameSelectedWord === 'string') {
        // Normalize
        if (string.includes("|")) {
            splittedWord = gameSelectedWord.split("|");
            gameSelectedWord = splittedWord[1];

            // Set
            $("#textGuess").html("<div style='font-size:70%;padding-bottom:5px;'>" + splittedWord[0] + "</div>" + censor(gameSelectedWord));

            // Timeout
            countDown()
        }
        

    } else {
        loadGame();
    }
}

function checkWinner(data, msg) {
    if (gameStarted){

        console.log('Jawabanya => '+gameSelectedWord);

        if (typeof gameSelectedWord === 'string' && typeof msg === 'string') {
            // Check answer
            //console.log('Jawabanya => '+gameSelectedWord);
            if (gameSelectedWord.trim().toLowerCase() == msg.trim().toLowerCase()) {
                // Print Photo
                addContent("Answer is "+gameSelectedWord+", <span style='font-style: italic;text-align: center;'>The Winner is...</span><br>"+addPhotoProfil(data.uniqueId, data.profilePictureUrl));

                // Sound
                playSound(4);

                // Play TTS
                let tssMsg = MSG_WINNER.replace("|username|", data.uniqueId);
                speakTTS(tssMsg);

                // Reload game
                loadGame();
                return true;
            }
        }
    }
    return false;
}

function loadSetting() {
    // Load
    if ($("#gameKata").val() === "") {
        gameKata = false;
    } else {
        gameKata = true;
    }
    
    confComment = $("#confComment").prop('checked');
    confLike = $("#confLike").prop('checked');
    confShare = $("#confShare").prop('checked');
    confJoin = $("#confJoin").prop('checked');
    confJoinTTS = $("#confJoinTTS").prop('checked');
    confCommentTTS = $("#confCommentTTS").prop('checked');
    confGiftTTS = $("#confGiftTTS").prop('checked');
    confPrintSound = $("#confPrintSound").prop('checked');
}

/*
* LIVE TIKTOK
*/

function connect(targetLive) {
    if (targetLive !== '') {
        $('#stateText').text('Connecting...');
        $("#usernameTarget").html("@"+targetLive);
        connection.connect(targetLive, {
            enableExtendedGiftInfo: true
        }).then(state => {
            $('#stateText').text(`Connected ${state.roomId}`);
        }).catch(errorMessage => {
            $('#stateText').text(errorMessage);
        })
    } else {
        alert('Enter username first!');
    }
}

function sanitize(text) {
    return text.replace(/</g, '&lt;')
}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}

function playSound(mode) {
    document.getElementById("sfx"+mode).play();
}

function addContent(payload) {
    // Container
    let content = $('#paper');
    content.append("<div class='item'>" + payload + "</div>");

    // Scroll top bottom
    content.animate({ scrollTop: content.get(0).scrollHeight}, 333);
}

function addMessage(data, msg, skiptts=false) {
    // DATA
    let userName = data.uniqueId;
    let message = sanitize(msg);

    // Check for voice
    let command = message.split(" ")[0];
    if (command == "/say" || command == "/ngomong") {
        // TTS
        let cleanText = message.replace("/say", "").replace("/ngomong", "");
        if (confSayTTS) {
            if (!skiptts) speakTTS(cleanText);
        }       

    } else {
        // Check setting
        if (confComment) {

            if (!checkWinner(data, data.comment)) {
            
                addContent("<span style='font-weight: bold;'>" + userName + "</span>: " + message);

                if (confCommentTTS) {                    
                    if (!skiptts) {
                        let tssMsg = MSG_COMMENT.replace("|username|", data.uniqueId);
                        speakTTS(tssMsg+' '+message);
                    }
                } 

                // Sound
                if (confPrintSound) {
                    playSound(1);    
                }
            }
            
            
        }
        
    }
}

function addPhotoProfil(usernya,urlpathimg) {
    let profilnya = "<center><span style='font-weight: bold;'>" + usernya + "</span><br><img src='"+urlpathimg+"'></center><br>";
    return profilnya;    
}

function addPhotoGift(giftname,jumlah,urlpathimg) {
    let profilnya = "<p align='center'>"+giftname+" <img src='"+urlpathimg+"' width='35' height='35'> x"+jumlah+"</p>";
    return profilnya;    
}

function addWinner(giftname,jumlah,urlpathimg) {
    let profilnya = "<p align='center'>"+giftname+" <img src='"+urlpathimg+"' width='35' height='35'> x"+jumlah+"</p>";
    return profilnya;    
}

function addGift(data) {
    // DATA    
    let tssMsg = MSG_GIFT.replace("|username|", data.uniqueId);

    if (data.giftType === 1 && !data.repeatEnd) {
        // Streak in progress => show only temporary
        console.log(`${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
        
        addContent(addPhotoProfil(data.uniqueId, data.profilePictureUrl) + addPhotoGift(data.giftName, data.repeatCount, data.giftPictureUrl));

        if (confPrintSound) {
            playSound(1);    
        }

        if (confGiftTTS) {          
            speakTTS(tssMsg);
        }

    } else {
        // Streak ended or non-streakable gift => process the gift with final repeat_count
        console.log(`${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);
        
        addContent(addPhotoProfil(data.uniqueId, data.profilePictureUrl) + addPhotoGift(data.giftName, data.repeatCount, data.giftPictureUrl));

        // Sound
        if (confPrintSound) {
            playSound(1);    
        }

        if (confGiftTTS) {          
            speakTTS(tssMsg);
        }
    }

 
}

// New chat comment received
connection.on('chat', (data) => {
    addMessage(data, data.comment, false);
})

// New gift received
connection.on('gift', (data) => {
    if (!isPendingStreak(data) && data.diamondCount > 0) {
        addGift(data);
    }
})

// Like
connection.on('like', (data) => {
    if (typeof data.totalLikeCount === 'number') {
        // Check setting
        if (confLike) {
            //addMessage(data, data.label.replace('{0:user}', '').replace('likes', `${data.likeCount} likes`));
            addContent("<span style='font-weight: bold;'>" + data.uniqueId + "</span>: " + data.label.replace('{0:user}', '').replace('likes', `${data.likeCount} likes`));
        }
    }

})

// Share, Follow
connection.on('social', (data) => {
    // Check setting
    if (confShare) {
        // Print share
        //addMessage(data, data.label.replace('{0:user}', ''));
        addContent("Thanks, <span style='font-weight: bold;'>" + data.uniqueId + "</span>: " + data.label.replace('{0:user}', '') + "<span style='font-style: italic;'>for Shared!</span>");
    }
})

// Member join
let joinMsgDelay = 0;
connection.on('member', (data) => {
    let addDelay = 250;
    if (joinMsgDelay > 500) addDelay = 100;
    if (joinMsgDelay > 1000) addDelay = 0;

    joinMsgDelay += addDelay;

    setTimeout(() => {
        joinMsgDelay -= addDelay;
        // Check setting
        if (confJoin) {
            // Print join
            addMessage(data, "joined", true);
            if (confJoinTTS) {
                let tssMsg = MSG_WELCOME_JOINED.replace("|username|", data.uniqueId);
                speakTTS(tssMsg);
            }
        }
    }, joinMsgDelay);
})

// End
connection.on('streamEnd', () => {
    $('#stateText').text('Stream ended.');
})
