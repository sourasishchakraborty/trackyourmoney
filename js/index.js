if (window.localStorage.getItem('UserId') != null) {
    window.location.href = "dashboard.html";
}




// Google sign in
document.querySelector('#google').addEventListener('click', function () {


    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (data) {
        console.log(data);
        window.localStorage.setItem("UserId", firebase.auth().currentUser.uid);
        //change 1
        window.localStorage.setItem("name",data.additionalUserInfo.profile.name);
        window.localStorage.setItem("picture",data.additionalUserInfo.profile.picture);
        window.localStorage.setItem("provider",data.additionalUserInfo.providerId)
        //
        window.location.href = 'dashboard.html';
    });


})





// Custom signin 
document.querySelector('#signInButton').addEventListener('click', function () {

    signInEmail = document.querySelector('#signInEmail').value;
    signInPassword = document.querySelector('#signInPassword').value;

    let userlogin = firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).catch(function (error) {
        // Handle Errors here.
        var errorCodeSignIn = error.code.split('/')[1];
        var errorMessageSignIn = error.message;

        if (errorCodeSignIn === 'wrong-password') {
            alert("Entered password incorrect. Try again");
            document.querySelector('#signInPassword').value = "";

        } else if (errorCodeSignIn === 'user-not-found') {
            alert("User not found. Please SignUp.");
            document.querySelector('#signInEmail').value = "";
            document.querySelector('#signInPassword').value = "";

        } else {
            alert("There was an error. Please try again.");
            document.querySelector('#signInEmail').value = "";
            document.querySelector('#signInPassword').value = "";
        }
    });



    // for fetching uid from firebase.auth().

    firebase.auth().onAuthStateChanged((userlogin) => {
        uid = userlogin.uid;

        if (uid !== null) {
            localStorage.setItem('UserId', uid);
            //localStorage.setItem('name',null);
            //localStorage.setItem('picture',null);
            localStorage.setItem('provider',"email");

            window.location.href = 'dashboard.html';
        }
        
    });
})



// custom SignUp 

document.querySelector('#signUPButton').addEventListener('click', function () {

    signUpEmail = document.querySelector('#signUpEmail').value;
    signUpPassword = document.querySelector('#signUpPassword').value;


    let userSignUp = firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword).catch(function (error) {
        // Handle Errors here.
        var errorCodeSignUp = error.code;
        var errorMessageSignUp = error.message;

        // alert("Some error occurred. Please try again. 1");

        //console.log(errorCodeSignUp);
        //console.log(errorMessageSignUp);
        //alert(errorCodeSignUp);
        alert(errorMessageSignUp);

        if(errorCodeSignUp.split('/')[1] === "email-already-in-use"){
            alert(errorMessageSignUp);
            $('.modal').modal('hide');

        } else {
            alert("Some error occured. Try again");
        }



    });


    firebase.auth().onAuthStateChanged((userSignUp) => {
        uid = userSignUp.uid;

        if (uid != null){
            localStorage.setItem('UserId', uid);
           // localStorage.setItem('name',null);
            //localStorage.setItem('picture',null);
            localStorage.setItem('provider',"email");

            window.location.href = 'dashboard.html';
        }
        
    })

})






// for facebook login 


document.querySelector("#facebook").addEventListener('click', function(){


    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        console.log(token);

        // The signed-in user info.
        var user = result.user;
        // console.log(user)

        uid = user.uid

        localStorage.setItem('UserId', uid);

        window.location.href = 'dashboard.html';
        

      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        alert("Some error occured. Please try again or sign in with different method.");
      });
      
})