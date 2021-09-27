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
    articlephotographe.appendChild(prenom);
    articlephotographe.appendChild(lieu);
    articlephotographe.appendChild(sentence);
    articlephotographe.appendChild(filtres);
    photographe.appendChild(articlephotographe);
    photographe.appendChild(divimg);
    document.getElementById('main').appendChild(photographe);
}

HeaderPhotographe(numeroduphotographe);