

const signUpScreen = () => {
    let container = document.createElement('div');
    $(container).html(`
    <div id="signupScreen" class="signupContainer">
    <span id="back_to_login" class="ion-ios-arrow-back backIcon"></span>
    <div class="logoContainer">
        <span class="ion-log-in icon"></span>
    </div>
    <div class="inputsContainer">
        <div class="inputContainer">
            <div class="inputTitle">
                email:</div>
            <div class="inputWrapper">
                <input id="email" class="input" type="username" name="" id="">
            </div>
        </div>

        <div class="inputContainer">
            <div class="inputTitle">
                password :</div>
            <div class="inputWrapper">
                <input id="password" class="input" type="password" name="" id=""> </div>
        </div>
    </div>
    <div class="btnContainer">
        <div id="create_btn" class="btn accent-color-2">SIGN UP</div>
    </div>
   
</div>`);

return container
}

function signUpScreenEvents(){
    console.log('working')
    $('#root').on('click', '#back_to_login', function(){
        $('#signupScreen').fadeOut('slow', function(){
            $('#root').html(LoginScreen());
            // loginScreenEvents();
        })
    })
    $('#root').on('click','#create_btn', function(){
console.log('working')

        let email = $('#email').val();
        let password =$('#password').val();
        if(validateEmail(email) && validatePassword(password)){

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(result){
                console.log('result', result);

                $('#signupScreen').fadeOut('slow', function(){
                    $('#root').html(LoginScreen());
                    // loginScreenEvents();
                });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            // ...
          });
          
        }
        else {
            alert('Invalid Credentials')
        }
    })
}