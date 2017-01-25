window.onload=function(){
    //return to the main page
    document.getElementById("return").onclick=function(){
        location.href="main.html";
    }

    var btn_submit=document.getElementById("submit");
    //validate the inputs
    submit.onclick=function(){
        validateName();
        validateEmail();
        validatePhone();
        validateZip();
        validatePsw();
    }
    function validateName(){
        var inputName=document.getElementById("displayName").value;
        var alertName=document.getElementById("alert_name");
        var pre_name=document.getElementById("cur_name").innerHTML;
        if(!inputName.match(/^[0-9a-zA-Z]+$/)){
            alertName.innerHTML="Invalid display name!"
            return false;
        }else if(inputName==pre_name){
            document.getElementById("displayName").value=null;
        }else{
            document.getElementById("cur_name").innerHTML=inputName;
            alertName.innerHTML="Display name has been changed from "+pre_name+" to "+inputName;
            document.getElementById("displayName").value=null;
        }
    }
    function validateEmail(){
        var inputEmail=document.getElementById("emailAddress").value;
        var alertEmail=document.getElementById("alert_email");
        var pre_email=document.getElementById("cur_email").innerHTML;
        var atpos = inputEmail.indexOf("@");
        var dotpos = inputEmail.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=inputEmail.length) {
            alertEmail.innerHTML="Invalid email address!";
            return false;
        }else if(inputEmail==pre_email){
            document.getElementById("emailAddress").value=null;
        }else{
            document.getElementById("cur_email").innerHTML=inputEmail;
            alertEmail.innerHTML="Email address has been changed from "+pre_email+" to "+inputEmail;
            document.getElementById("emailAddress").value=null;
        }
    }
    function validatePhone(){
        var inputPhone=document.getElementById("phoneNumber").value;
        var alertPhone=document.getElementById("alert_phone");
        var pre_phone=document.getElementById("cur_phone").innerHTML;
        if(!inputPhone.match(/\d\d\d-\d\d\d-\d\d\d\d/)){
            alertPhone.innerHTML="Invalid phone number!";
            return false;
        }else if(inputPhone==pre_phone){
            document.getElementById("phoneNumber").value=null;
        }else{
            document.getElementById("cur_phone").innerHTML=inputPhone;
            alertPhone.innerHTML="Phone number has been changed from "+pre_phone+" to "+inputPhone;
            document.getElementById("phoneNumber").value=null;
        }
    }
    function validateZip(){
        var inputZip=document.getElementById("zipCode").value;
        var alertZip=document.getElementById("alert_zip");
        var pre_zip=document.getElementById("cur_zipcode").innerHTML;
        if(!inputZip.match(/\d\d\d\d\d/)){
            alertZip.innerHTML="Invalid zipcode!";
            return false;
        }else if(inputZip==pre_zip){
            document.getElementById("zipCode").value=null;
        }else{
            document.getElementById("cur_zipcode").innerHTML=inputZip;
            alertZip.innerHTML="Zipcode has been changed from "+pre_zip+" to "+inputZip;
            document.getElementById("zipCode").value=null;
        }
    }
    function validatePsw(){
        var inputPsw=document.getElementById("psw").value;
        var inputPwc=document.getElementById("pwc").value;
        var alertPsw=document.getElementById("alert_psw");
        if(inputPsw!=inputPwc){
            alertPsw.innerHTML="Password does not match!";
            return false;
        }else if(inputPsw==inputPwc){
            alertPsw.innerHTML="Password has been set successfully!";
            document.getElementById("psw").value=null;
            document.getElementById("pwc").value=null;
        }else{
            document.getElementById("psw").value=null;
            document.getElementById("pwc").value=null;
        }
    }
}
