let createForm= document.querySelector('.create-post-form');
let title= document.querySelector('#title');
let country= document.querySelector('#country');
let imageUrl= document.querySelector('#imageUrl');
let text= document.querySelector('#text');
let imageFile= document.querySelector('#imageFile');

createForm.addEventListener('submit', function(e){
    e.preventDefault();
    let createText= text.value ;
    let createDescription;
    if(createText.indexOf('.')== -1){
        createDescription = createText;
    }else{
        createDescription= createText.substring(0,createText.indexOf('.')+1);
    } 
    let data= new FormData();
    data.append('title', title.value);
    data.append('country', country.value);
    data.append('imageUrl', imageUrl.value);
    data.append('text', createText);
    data.append('description', createDescription);
    data.append('imageFile', imageFile.files[0]);
    fetch('/posts', {
        method : 'POST',
        body: data
    }).then((response)=> response.text)
    .then((data)=> window.history.go());
})

function disableInput(input1, input2){
    if(input1.value){
        input2.disabled = true;
    }
    else{
        input2.disabled = false;
    }
}

imageUrl.addEventListener('change',()=> disableInput(imageUrl, imageFile));
imageFile.addEventListener('change', ()=>disableInput(imageFile, imageUrl));