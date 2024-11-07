async function getPosts(){
    return await fetch('/posts')
    .then((response)=> response.json())
    .then((data)=> data);
}
async function getCallbackRequests(){
    return await fetch('/callback-requests')
    .then((response)=> response.json())
    .then((data)=> data);
}
async function getEmails(){
    return await fetch('/emails')
    .then((response)=> response.json())
    .then((data)=> data);
}

document.addEventListener('DOMContentLoaded',async function(){
    addPost();
    addCallbackRequest();
    addEmail();
})

async function addPost() {
    let posts= await getPosts();
    let articles= document.querySelector('.articles-list tbody');
    articles.innerHTML='';
    let id=1;
    posts.forEach((post) => {
        let postHtml= `<tr>
                        <td>${id++}<input class="id" type="hidden" value="${post.id}"</td>
                        <td class="title" >${post.title}</td>
                        <td class="date" >${post.date}</td>
                        <td class="country" >${post.country}</td>
                        <td><button class="edit-btn btn btn-link p-0 text-decoration-none" >Edit</button></td>
                        <td><button class="remove-btn btn btn-link p-0 text-decoration-none" >X</button></td>
                    </tr>`;
        articles.insertAdjacentHTML('beforeend',postHtml);
    });
}

async function addEmail() {
    let emails= await getEmails();
    let emailsBlock= document.querySelector('#v-pills-mails tbody');
    emailsBlock.innerHTML='';
    let id=1;
    emails.forEach((email) => {
        let emailHtml= `<tr>
                        <td>${id++}<input class="id" type="hidden" value="${email.id}"</td>
                        <td class="name" >${email.name}</td>
                        <td class="email" >${email.email}</td>
                        <td class="date" >${email.date}</td>
                        <td><button class="remove-btn btn btn-link p-0 text-decoration-none" >X</button></td>
                    </tr>
                    <tr>
                        <td class="text" >${email.text}</td>
                    </tr>`;
        emailsBlock.insertAdjacentHTML('beforeend',emailHtml);
    });
}

async function addCallbackRequest() {
    let requests= await getCallbackRequests();
    let requestsBlock= document.querySelector('#v-pills-callback tbody');
    requestsBlock.innerHTML='';
    let id=1;
    requests.forEach((request) => {
        let requestHtml= `<tr>
                        <td>${id++}<input class="id" type="hidden" value="${request.id}"</td>
                        <td class="phoneNumber" >${request.phoneNumber}</td>
                        <td class="date" >${request.date}</td>
                        <td><button class="remove-btn btn btn-link p-0 text-decoration-none" >X</button></td>
                    </tr>`;
        requestsBlock.insertAdjacentHTML('beforeend',requestHtml);
    });
}
let requestsBlock= document.querySelector('#v-pills-callback');

    requestsBlock.addEventListener('click', function(e){
        if(e.target.classList.contains('remove-btn')){
            let id= e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('/callback-requests/'+id, {
                method: 'DELETE'
            }).then((response)=>response.text)
            .then(()=> window.history.go() );
        }
    })

let emailsBlock= document.querySelector('#v-pills-mails');

    emailsBlock.addEventListener('click', function(e){
        if(e.target.classList.contains('remove-btn')){
            let id= e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('/emails/'+id, {
                method: 'DELETE'
            }).then((response)=>response.text)
            .then(()=> window.history.go() );
        }
    })

//CREATE POST
let createPostbtn= document.querySelector('#v-pills-add-post-tab');
let addPostbtn = document.querySelector('.add-post');
addPostbtn.addEventListener('click', ()=> createPostbtn.click());

let logOutBtn= document.querySelector('.log-out-btn');
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href='/';
})