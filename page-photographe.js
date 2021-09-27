import data from "./data/data.json"

let idduphotographe = window.location.search.substr(1);
let numeroduphotographe;

for(let i = 0; i < data.photographers.length; i++) {
    if (data.photographers[i].id == idduphotographe){
        numeroduphotographe = i;
        break;
    }
}

function HeaderPhotographe(number){
    let photographe = document.createElement('section');
    photographe.className = "headerphotographe" ;
    photographe.setAttribute('data-idPhotographers', data.photographers[number].id)
    let divimg = document.createElement('div');
    divimg.className = "divimg"; 
    let image = document.createElement('img');
    image.src = './images/photographers/' + data.photographers[number].portrait;
    image.className = "imageportrait"
    divimg.appendChild(image); 
    let articlephotographe = document.createElement('article');
    articlephotographe.className = 'articlephotographe';
    let prenom = document.createElement('p');
    prenom.textContent = data.photographers[number].name;
    prenom.className = "nom";
    let lieu = document.createElement('p');
    lieu.textContent = data.photographers[number].city + ", " + data.photographers[number].country;
    lieu.className = "location";
    let sentence = document.createElement('p');
    sentence.textContent = data.photographers[number].tagline;
    sentence.className = "phrase";
    let filtres = document.createElement('nav');
    filtres.className = "tagbypers"
    for ( let i = 0; i < data.photographers[number].tags.length; i++) {
        let tag = document.createElement('span');
        tag.textContent = "#" + data.photographers[number].tags[i].toLowerCase();
        tag.className = "tags";
        filtres.appendChild(tag);   
    }
    let divarticle = document.createElement('div');
    divarticle.className = 'divarticle';
    let boutoncontact = document.createElement('button');
    boutoncontact.className = 'openmodal openmodalcontact';
    boutoncontact.textContent = 'Contactez-Moi';
    divarticle.appendChild(prenom);
    divarticle.appendChild(lieu);
    divarticle.appendChild(sentence);
    divarticle.appendChild(filtres);
    articlephotographe.appendChild(divarticle);
    articlephotographe.appendChild(boutoncontact);
    photographe.appendChild(articlephotographe);
    photographe.appendChild(divimg);
    document.getElementById('main').appendChild(photographe);
    let modalmenu = document.createElement('div');
    modalmenu.className = 'modalmenu';
    let modaltitre = document.createElement('h1');
    modaltitre.className = 'modaltitre';
    modaltitre.textContent = 'Contactez-Moi';
    let modalclose = document.createElement('span');
    modalclose.className = 'modalclose';
    modalmenu.appendChild(modaltitre);
    modalmenu.appendChild(modalclose);
    let modalnom = document.createElement('p');
    modalnom.className = 'modalnom';
    modalnom.textContent = data.photographers[number].name;
    document.getElementById('contenermodaltexte').appendChild(modalmenu);
    document.getElementById('contenermodaltexte').appendChild(modalnom);

}

HeaderPhotographe(numeroduphotographe);

// fonctionalités modals 

let modalbg = document.getElementById('modalbg');
let openmodal = document.querySelectorAll(".openmodal");
let fermerModal = document.querySelectorAll(".modalclose");

function launchModal() {
    modalbg.style.display = "flex";
}
function CloseModal() {
    modalbg.style.display = "none";
}
function submit () {
    console.log("Prénom : " + document.getElementById('first').value);
    console.log("Nom : " + document.getElementById('last').value);
    console.log("Email : " + document.getElementById('email').value);
    console.log("Message : " + document.getElementById('message').value);
    modalbg.style.display = "none";
}
openmodal.forEach((btn) => btn.addEventListener("click", launchModal));
fermerModal.forEach((btn) => btn.addEventListener("click", CloseModal));

document.getElementById('btn-submit').addEventListener('click', function (e) {
    e.preventDefault();
    submit();   
  })

