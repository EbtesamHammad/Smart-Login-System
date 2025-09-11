var signUpName = document.getElementById("signUpName")
var signUpEmail = document.getElementById("signUpEmail")
var signUpPassword = document.getElementById("signUpPassword")
var loginEmail =document.getElementById("loginEmail")
var loginPassword =document.getElementById("loginPassword")


 // to get base url (localhost)
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

var signUpArray = [];
if (localStorage.getItem('signUp') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('signUp'))
}


function isInputsEmpty(){
    if(signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == ""){
        return false;
    }
    else{
        return true;
    }
}
function isEmailExist(){
    for(var i=0; i <signUpArray.length; i++){
        if(signUpEmail.value.toLowerCase() == signUpArray[i].email.toLowerCase()){
            return false;
        }
    }
}

function signUp(){
    if(isInputsEmpty() == false){
        document.getElementById("status").innerHTML =`<span class = " text-danger  m-3">All inputs is required</span>`;
        return false;
    }

    var signUpInfo = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    };
    if(signUpArray.length == 0){
        signUpArray.push(signUpInfo);
        localStorage.setItem("signUp",JSON.stringify(signUpArray));
        document.getElementById("status").innerHTML =`<span class = " text-success  m-3">Success</span>`;

    }
    if(isEmailExist() == false){
        document.getElementById("status").innerHTML =`<span class = " text-danger m-3">email already exists</span>`;
        return true;

    }
    else{
        signUpArray.push(signUpInfo);
        localStorage.setItem("signUp",JSON.stringify(signUpArray));
        document.getElementById("status").innerHTML =`<span class = " text-success  m-3">Success</span>`;
    }
    
}


/**************** login ***************/
function isLoginInputsEmpty(){
    if(loginEmail.value == "" || loginPassword.value == ""){
        return false;
    }
    else{
        return true;
    }
}

function login(){

    if(isLoginInputsEmpty() == false){
        console.log("hi")
        document.getElementById("invalidLogin").innerHTML = `<span class = " text-danger  m-3">All inputs is required</span>`
        return false;
    }
    var email = loginEmail.value;
    var password = loginPassword.value;

    for (var i = 0; i < signUpArray.length; i++) {
    if (email.toLowerCase() == signUpArray[i].email.toLowerCase() &&
        password.toLowerCase() == signUpArray[i].password.toLowerCase()) {

        localStorage.setItem('Username', signUpArray[i].name);

        if (baseURL == '/') {
            location.replace('https://' + location.hostname + '/home.html');
        } else {
            location.replace(baseURL + '/home.html');
        }
    } else {
        document.getElementById("invalidLogin").innerHTML =
            `<span class="text-danger m-3">incorrect email or password</span>`;
    }
}


}



// ****************** home js ******************** //
 var user = localStorage.getItem("Username");
 if (user){
    document.getElementById("welcomed").innerHTML = "Welcome " + user;
 }


 // ************* Log Out ********************* //
 function logOut(){
    localStorage.removeItem("Username");
 }