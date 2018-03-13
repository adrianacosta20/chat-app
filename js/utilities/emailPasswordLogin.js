function emailPasswordLogin() {

    console.log('working')
    let email = $('#email').val();
    let password = $('#password').val();
    if (validateEmail(email) && validatePassword(password)) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(result){
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result;

    
            console.log('user ', user);
    
            $('#loginScreen').fadeOut("slow", function () {
              $('#root').html(ChatScreen(user));
              chatScreenEvents(user);
            });
          })    
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage);
        });
        }
        else{
        alert('Please insert valid email and password')
    }
}