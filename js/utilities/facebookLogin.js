var facebookProvider = new firebase.auth.FacebookAuthProvider();



function facebookLogin() {
    firebase.auth().signInWithPopup(facebookProvider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log('user', user)
        $('#loginScreen').fadeOut('slow', function () {
            $('#root').html(ChatScreen(user));
            chatScreenEvents(user);
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorMessage)
    });
}
$('#facebookIcon').click(facebookLogin);

