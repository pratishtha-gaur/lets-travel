let signInForm= document.querySelector('.sign-in-form');
let registerForm= document.querySelector('.register-form');

signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email= document.querySelector('#sign-in-email').value;
    let password= document.querySelector('#sign-in-password').value;
    fetch('/users/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    }).then((response)=>response.json())
    .then((data)=> {
        let redirectUrl= data.redirectUrl;
        if(redirectUrl){
            window.location.href = redirectUrl;
        } else{
            alert('Your password and email do not match. please try again');
        }
    });
})

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email= document.querySelector('#register-email').value;
    let password= document.querySelector('#register-password').value;
    let rePassword= document.querySelector('#register-re-enter-password').value;
    if(password!=rePassword){
        return;
    }
    fetch('/users/register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    }).then((resp)=>resp.json())
    .then((data)=>alert(data.message));
})