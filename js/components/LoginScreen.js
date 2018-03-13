const LoginScreen = () => {
    let container = document.createElement('div');
    $(container).html(`
    <div id="loginScreen" class="loginContainer">
    <div class="logoContainer">
        <span class="ion-chatbubbles icon"></span>
    </div>
    <div class="inputsContainer">
        <div class="inputContainer">
            <div class="inputTitle">
                user name :</div>
            <div class="inputWrapper">
                <input id='email' class="input" type="username" name="" id="">
            </div>
        </div>

        <div class="inputContainer">
            <div class="inputTitle">
                password :</div>
            <div class="inputWrapper">
                <input id='password' class="input" type="password" name="" id=""> </div>
        </div>
    </div>
    <div class="iconContainer">
        <div id="googleIcon" class="googleIcon iconHover"></div>
        <div id="facebookIcon" class="facebookIcon iconHover"></div>
    </div>
    <div class="btnContainer">
        <div id="login_screen_signup" class="btn accent-color-2">SIGN UP</div>
        <div id="signin_btn" class="btn accent-color-1">SIGN IN</div>
    </div>
   
</div>`);

    return container
}

function loginScreenEvents() {
    $('#root').on('click', '#googleIcon', ()=> persistance(googleLogin));
    $('#root').on('click', '#facebookIcon',()=>persistance(facebookLogin));
    $('#root').on('click', '#signin_btn',()=>persistance(emailPasswordLogin));
    $('#root').on('click', '#login_screen_signup', function () {
        $('#loginScreen').fadeOut('slow', function () {
            $('#root').html(signUpScreen());
            signUpScreenEvents();
        })
    })
    

}

