var db = firebase.database();
var messages = db.ref('messages/');

const ChatScreen = (user) => {
    let container = document.createElement('div');

    $(container).html(`
        <div id="chatScreen" class="chatContainer">
            <div class="chatHeader">
            <div class='nameContainer'>
                Hi ${ user.displayName ? user.displayName.split(' ')[0] : 'Stranger' }!
            </div>  
            <div class='signOut' id='sign_out'>
            <div class='ion-log-out'></div>
            </div> 
            </div>

            <div id="message" class="chatMessages"> 
                Messages go here 
            </div>

            <div class="chatInputContainer">
                <div class="chatInputWrapper">
                    <input id="inputmsg" class="chatInput" type="text" />
                </div>
                <div id="chatBtn" class="chatBtn">
                    <span class="ion-android-send"></span>
                </div>
            </div>
        </div>
    `);

    return container
}

var sendMessage = (uid, name, email, img) => {
    let date = new Date();
    
    if ($('#inputmsg').val()) {
        console.log('sending message')
        messages.push({
            uid: uid,
            name: name,
            text: $("#inputmsg").val(),
            date: date.toString(),
            email: email,
            img: img,
        });
        $('#inputmsg').val(' ');
    }
}

const scroll = () => $('#message').scrollTop($('#message')[0].scrollHeight);

var chatScreenEvents = (user) => {
    $("#chatBtn").on('click', function () {
        sendMessage(user.uid, user.displayName, user.email, user.photoURL)
    });

    $('#inputmsg').on('keypress', function (e) {
        if (e.keyCode == 13) {
            sendMessage(user.uid, user.displayName, user.email, user.photoURL);
        }
    });
    getAllMessages(user);
    $('#sign_out').click(function(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('signed out')
            $('#chatScreen').fadeOut('slow',function(){
                $('#root').html(LoginScreen());
            })
          }).catch(function(error) {
            // An error happened.
            console.log('error', error)
            alert('Denied')
          });
    })
}

const getAllMessages = (user) => {
    messages.on("value", function (snapshot) {
        $("#message").html("");
        var msgs = snapshot.val();

        for (var id in msgs) {
            var msg = msgs[id];
            var side = user.email === msg.email ? "right" : "left";
            var margin = user.email === msg.email ? "magin-left: 15px" : "margin-right: 15px";
            var corner = user.email === msg.email ? "right-top" : "left-top"

            $("#message").append(
                `<div class="msgDiv ${side}">
                <div style="${margin}">
                <img class="profileImg" src="${msg.img || '../img/photo.jpg'}" height="40" width="auto" />
                </div>
                <div style="flex-grow: 1; padding: 10px";
                class="talkBubble triRight ${corner}">
                <div class="name"><strong>${msg.name}</strong>:</div>
                <div class="msg">${msg.text}</div>
                <div class="date ${side}">
                    <div>${format.date(new Date(msg.date)).date}</div>
                    <div>${format.date(new Date(msg.date)).time}</div>
                    </div>
                  </div>
                </div>`
            );
        }
        scroll();
    })
}

var format = {
    date: (date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        var h = date.getHours();

        var hf = (h > 11) ? 'PM' : 'AM';
        var hh = (h > 12) ? h % 12 : h;
        var mm = date.getSeconds();
        var ss = date.getSeconds();

        if (d<10) d = '0' + d;
        if (m<10) m = '0' + m;
        if (hh<10) hh = '0' + hh;
        if (mm<10) mm = '0' + mm;
        if (ss<10) ss= '0' + ss;

        return{
            date: m+'/'+d+'/'+y,
            time:hh+':'+mm+':'+ss+' '+hf
        }
    }
}
