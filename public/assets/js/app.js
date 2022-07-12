// DATA
let connection = new TikTokIOConnection(undefined);

let gameWords = [];
let gamegameSelectedWord = null;
let gameStarted = false;
let gameTimer = null;
let gameKata = true;

// Config
let confComment = false;
let confCommentTTS = false;
let confCommentPrint = false;

let confLike = false;
let confLikeTTS = false;
let confLikePrint = false;

let confShare = false;
let confShareTTS = false;
let confSharePrint = false;

let confJoin = false;
let confJoinTTS = false;
let confJoinPrint = false;

let confGiftTTS = false;
let confPrintSound = false;
let confWinnerSound = false;
let confSayTTS = false;


let lastWinnerP1 = "";
let lastWinnerP2 = "";
let lastWinnerP3 = "";

let fdb = new ForerunnerDB();
db = fdb.db('ttPrint');
dblike = db.collection("like", {primaryKey: "uniqueId"});
dbgift = db.collection("gift", {primaryKey: "uniqueId"});
dbkomen = db.collection("komen");
// db.collection('like').load();
// db.collection('gift').load();
// db.collection('komen').load();

dblike.load();
dbgift.load();
dbkomen.load();
    

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

    $("#keAtas").click(function(e) {
        var terpilih = $('#pilihanPindah').find(":selected").val();
        if (terpilih == 'topleft') {
            var iVal = parseInt($('#listtopliker').css('margin-top'));
            $("#listtopliker").css("margin-top",iVal - 1);     
        } else if (terpilih == 'topright') {
            var iVal = parseInt($('#listtopgifter').css('margin-top'));
            $("#listtopgifter").css("margin-top",iVal - 1);  
        }            
    });
    $("#keBawah").click(function(e) {
        var terpilih = $('#pilihanPindah').find(":selected").val();
        if (terpilih == 'topleft') {
            var iVal = parseInt($('#listtopliker').css('margin-top'));
            $("#listtopliker").css("margin-top",iVal + 1);     
        } else if (terpilih == 'topright') {
            var iVal = parseInt($('#listtopgifter').css('margin-top'));
            $("#listtopgifter").css("margin-top",iVal + 1);  
        }            
    });
    $("#keKiri").click(function(e) {
        var terpilih = $('#pilihanPindah').find(":selected").val();
        if (terpilih == 'topleft') {
            var iVal = parseInt($('#listtopliker').css('margin-left'));
            $("#listtopliker").css("margin-left",iVal - 1);     
        } else if (terpilih == 'topright') {
            var iVal = parseInt($('#listtopgifter').css('margin-right'));
            $("#listtopgifter").css("margin-right",iVal + 1);  
        }            
    });
    $("#keKanan").click(function(e) {
        var terpilih = $('#pilihanPindah').find(":selected").val();
        if (terpilih == 'topleft') {
            var iVal = parseInt($('#listtopliker').css('margin-left'));
            $("#listtopliker").css("margin-left",iVal + 1);     
        } else if (terpilih == 'topright') {
            var iVal = parseInt($('#listtopgifter').css('margin-right'));
            $("#listtopgifter").css("margin-right",iVal - 1);  
        }            
    });
})

/*
* GAME PLAY
*/

function speakTTS(msg, prioritas = 9) {
    // speak(msg, {
    //     amplitude: 100,
    //     pitch: 50,
    //     speed: 150,
    //     wordgap: 5
    // });
    doSpeakAsync(msg, prioritas);
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
            if (c == " " || c == "-") {
                censored.push(c); 
            } else {
                censored.push("*");    
            }
            
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
                // Print Photo // ubah photonya
                if (lastWinnerP3 != lastWinnerP2) lastWinnerP3 = lastWinnerP2;
                if (lastWinnerP2 != lastWinnerP1) lastWinnerP2 = lastWinnerP1;
                lastWinnerP1 = data.uniqueId;
                $("#winnerGuess").html(addPhotoProfil(lastWinnerP1, data.profilePictureUrl));
                $("#winnerGuess-2").html("🏆 <span style='font-weight: bold;'>"+lastWinnerP2+"</span>");
                $("#winnerGuess-3").html("🏆 <span style='font-weight: bold;'>"+lastWinnerP3+"</span>"); 

                addContent("Answer is "+gameSelectedWord+", <span style='font-style: italic;text-align: center;'>The Winner is...</span>"+data.uniqueId);

                // Sound Winner Hoeyy
                if (confWinnerSound) playSound(4);

                // Play TTS
                let tssMsg = MSG_WINNER.replace("|username|", data.uniqueId);
                speakTTS(tssMsg, 4);

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
    confCommentTTS = $("#confCommentTTS").prop('checked');
    confCommentPrint = $("#confCommentPrint").prop('checked');

    confLike = $("#confLike").prop('checked');
    confLikeTTS = $("#confLikeTTS").prop('checked');
    confLikePrint = $("#confLikePrint").prop('checked');

    confShare = $("#confShare").prop('checked');
    confShareTTS = $("#confShareTTS").prop('checked');
    confSharePrint = $("#confSharePrint").prop('checked');

    confJoin = $("#confJoin").prop('checked');
    confJoinTTS = $("#confJoinTTS").prop('checked');
    confJoinPrint = $("#confJoinPrint").prop('checked');

    confGiftTTS = $("#confGiftTTS").prop('checked');

    confPrintSound = $("#confPrintSound").prop('checked');
    confWinnerSound = $("#confWinnerSound").prop('checked');
    
    confSayTTS = $("#confSayTTS").prop('checked');
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
            if (!skiptts && cleanText.length >= 2) speakTTS(cleanText,8);
        }       

    } else if (command == "/next" || command == "/skip" || command == "/terus" || command == "/lanjut") {
        loadGame();

    } else if (command == "/sound" || command == "/suara") {
        let suaranya = message.split(" ")[1];
        if (suaranya == "yey") playSound(4);

    } else {
        // Check setting
        if (!checkWinner(data, data.comment)) {
            dbkomen.insert({
                uniqueId: data.uniqueId,
                komentar: message
            });
            dbkomen.save();

            if (confCommentPrint) {
                addContent("<span style='font-weight: bold;'>" + userName + "</span>: " + message);
            }                

            if (confCommentTTS) {                    
                if (!skiptts && message.length >= 2) {
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
        addgift_toDB(data.uniqueId, data.repeatCount);
        addContent(addPhotoProfil(data.uniqueId, data.profilePictureUrl) + addPhotoGift(data.giftName, data.repeatCount, data.giftPictureUrl));

        if (confPrintSound) playSound(1);
        if (confGiftTTS) speakTTS(tssMsg, 1);

    } else {
        addgift_toDB(data.uniqueId, data.repeatCount);
        addContent(addPhotoProfil(data.uniqueId, data.profilePictureUrl) + addPhotoGift(data.giftName, data.repeatCount, data.giftPictureUrl));

        if (confPrintSound) playSound(1);
        if (confGiftTTS) speakTTS(tssMsg, 1);
    } 
}

function addgift_toDB(usernmnya, newgiftcount) {
    var hasil;
    var ttlgivenya = 0;
    hasil = dbgift.find({
                uniqueId: {
                    $eq: usernmnya
                }
            });           
    
    if (hasil != "") {        
        ttlgivenya = hasil[0].total+newgiftcount;
        dbgift.update({
            uniqueId: usernmnya
        }, {
            $replace: {
                total: ttlgivenya
            }
        });
    } else {
        ttlgivenya = newgiftcount;
        dbgift.insert({
            uniqueId: usernmnya,
            total: newgiftcount
        });
    }            
    dbgift.save();
    showtopgift(5);
    return ttlgivenya;
}

function showtopgift(jmlnya = 5) {
    var hasil;

    hasil = dbgift.find({}, {
                $page: 0,
                $limit: jmlnya,
                $orderBy: {
                    total: -1 // Sort ascending or -1 for descending
                }
    }); 
    if (hasil != "") {
        let texthl = "<span class='rainbow-text-bl'>TOP GIFTER1</span><br>";
        for (let i = 0; i < hasil.length; i++) {
            texthl += "<span class='rainbow-text-animated rainbow_text_animated_run'>"+hasil[i].uniqueId+"</span>🙏<span class='rainbow-text-animated rainbow_text_animated_run'><b>"+hasil[i].total+"</b></span><br>";
          }        
        $("#listtopgifter").html(texthl);
    }
}

function addlike_toDB(usernmnya, likescount) {
    var hasil;
    var ttllikenya = 0;
    hasil = dblike.find({
                uniqueId: {
                    $eq: usernmnya
                }
            });           
    
    if (hasil != "") {        
        ttllikenya = hasil[0].total+likescount;
        dblike.update({
            uniqueId: usernmnya
        }, {
            $replace: {                
                total: ttllikenya
            }
        });
    } else {
        ttllikenya = likescount;
        dblike.insert({
            uniqueId: usernmnya,            
            total: likescount
        });
    }            
    dblike.save();
    showtoplike(5);
    return ttllikenya;
}

function showtoplike(jmlnya = 5) {
    var hasil;

    hasil = dblike.find({}, {
                $page: 0,
                $limit: jmlnya,
                $orderBy: {
                    total: -1 // Sort ascending or -1 for descending
                }
    }); 
    if (hasil != "") {
        let texthl = "<span class='rainbow-text-animated rainbow_text_animated_run'>Top Liked</span><br>";
        for (let i = 0; i < hasil.length; i++) {
            texthl += "<span class='rainbow-text-animated rainbow_text_animated_run'><b>"+hasil[i].total+"</b></span>💪<span class='rainbow-text'>"+hasil[i].uniqueId+"</span><br>";
          }
        
        $("#listtopliker").html(texthl);
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
        if (confLike) {
            var ttllikenya = addlike_toDB(data.uniqueId, data.likeCount);
            if (confLikePrint){
                let tssMsg = MSG_LIKE_SEND.replace("|username|", "<span style='font-weight: bold;'>"+data.uniqueId+"</span>").replace("|like|",data.likeCount).replace("|totallike|",ttllikenya);
                addContent("<span style='font-style: italic;'>"+tssMsg+"</span>");
            }            
        }
    }
})

// Share, Follow
connection.on('social', (data) => {
    // Check setting
    if (confShare) {
        // Print share
        //addMessage(data, data.label.replace('{0:user}', ''));
        if (confSharePrint){
            addContent("<span style='font-weight: bold;'>" + data.uniqueId + "</span> <span style='font-style: italic;'>Thanks for " + data.label.replace('{0:user}', '')+"</span>");
        }
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
            //addMessage(data, "joined", true);
            if (confJoinPrint) {
                addContent("<span style='font-weight: bold;'>" + data.uniqueId + "</span> <span style='font-style: italic;'>joined</span>");
            }
            
            if (confJoinTTS) {
                let tssMsg = MSG_WELCOME_JOINED.replace("|username|", data.uniqueId.slice(0, 8));
                speakTTS(tssMsg);
            }
        }
    }, joinMsgDelay);
})

connection.on('connected', () => {
    $('#stateText').text('Connected!.');
})

connection.on('disconnected', () => {
    $('#stateText').text('Disconnected.');
})

connection.on('streamEnd', () => {
    $('#stateText').text('Stream ended.');
})
