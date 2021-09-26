import data from "./data/data.json"

const nombredephotographes = 6;

function createHeader(){
    let tags = [];
    data.photographers.forEach((item)=>{
        tags = [...tags, ...item.tags]
    })
    tags = [... new Set(tags)];
    var nav = document.createElement('nav');
    nav.className = "listetags";
    var header = document.getElementById('header');
    var titre = document.createElement('h1');
    titre.textContent = "Nos Photographes";
    tags.forEach(function(item){
        var createtag = document.createElement('span');
        createtag.className = "tag tagclick";
        createtag.textContent = "#" + item;
        nav.appendChild(createtag);
    })
    header.appendChild(nav);
    header.appendChild(titre);
}

function BlocPhotographe(number){
    let photographe = document.createElement('section');
    photographe.className = "blocphotographe" ;
    photographe.setAttribute('data-idPhotographers', data.photographers[number].id)
    let divimg = document.createElement('div');
    divimg.className = "divimg"; 
    let image = document.createElement('img');
    image.src = './images/photographers/' + data.photographers[number].portrait;
    image.className = "imageportrait"
    divimg.appendChild(image); 
    let prenom = document.createElement('p');
    prenom.textContent = data.photographers[number].name;
    prenom.className = "nom";
    let lieu = document.createElement('p');
    lieu.textContent = data.photographers[number].city + ", " + data.photographers[number].country;
    lieu.className = "location";
    let sentence = document.createElement('p');
    sentence.textContent = data.photographers[number].tagline;
    sentence.className = "phrase";
    let prix = document.createElement('p');
    prix.textContent = data.photographers[number].price + ' €';
    prix.className = "tarif";
    let filtres = document.createElement('nav');
    filtres.className = "tagbypers"
    for ( let i = 0; i < data.photographers[number].tags.length; i++) {
        let tag = document.createElement('span');
        tag.textContent = "#" + data.photographers[number].tags[i].toLowerCase();
        tag.className = "tag tagf";
        filtres.appendChild(tag);   
    }
    photographe.appendChild(divimg);
    photographe.appendChild(prenom);
    photographe.appendChild(lieu);
    photographe.appendChild(sentence);
    photographe.appendChild(prix);
    photographe.appendChild(filtres);
    document.getElementById('main').appendChild(photographe);
}

function creerblocs (nombredephotographes) {
    for (let i = 0; i < nombredephotographes; i++){
        BlocPhotographe(i)
    }
}

// différenciation des pages html
if (document.getElementById('titre').textContent == "FishEye"){
    createHeader()
    creerblocs(nombredephotographes)
}

// Fonctionnalitée filtres 
let taglist = document.getElementsByClassName("tagclick");
let tagneeded = [];
let tagclicked = [];
for (let i = 0; i < taglist.length; i++) {
    taglist[i].addEventListener('mouseover', function(){
        taglist[i].style.backgroundColor = '#901C1C';
        taglist[i].style.color = 'white';
        if (tagclicked[i] == undefined){
            tagclicked[i] = 0;
        }
    })
    taglist[i].addEventListener('mouseout', function(){
        if (tagclicked[i] != 1) {
        taglist[i].style.backgroundColor = 'white';
        taglist[i].style.color = '#901C1C';
        }
    })
}
for (let i = 0; i < taglist.length; i++) {
    taglist[i].addEventListener('click', function(){
        if (tagclicked[i] == 0){
            taglist[i].style.backgroundColor = '#901C1C';
            tagclicked[i] = 1;
            tagneeded[i] = taglist[i].textContent;
            tagmanagement(tagneeded);
        }
        else if (tagclicked[i] == 1){
            taglist[i].style.backgroundColor = 'white';
            taglist[i].style.color = '#901C1C'
            tagclicked[i] = 0;
            tagneeded[i] = 0;
            tagmanagement(tagneeded);
        }
    });
} 

// tags classement

function tagmanagement(filtersneeded) {
    let blocfotodel = document.getElementsByClassName('blocphotographe');
    let g = document.getElementsByClassName('tagf');
    let r = 0;
    for(let s = 0; s < g.length; s++){
        for(let t = 0; t < filtersneeded.length; t++){
            if (g[s].textContent == filtersneeded[t]){
                r = 1;
            }
        }
    }
    if (r == 0){
        for (let u = 0; u < blocfotodel.length; u++){
            blocfotodel[u].style.display = 'flex';
        }
    }
    else {
        for (let z = 0; z < blocfotodel.length; z++){
            let a = blocfotodel[z].getElementsByClassName('tagf');
            let x = 0;
            for (let c = 0; c < a.length; c++){
                for (let d = 0; d < filtersneeded.length; d++){
                   if (a[c].textContent == filtersneeded[d]){
                       x = 1; 
                   }
                }
                if (x == 1) {
                    blocfotodel[z].style.display = 'flex';
                }
                else {
                    blocfotodel[z].style.display = 'none';
                }
            }
        }
    }
}

// redirection au click

let imageredirection = document.getElementsByClassName('blocphotographe');
Array.from(imageredirection).forEach(function(element){
    element.addEventListener('click', function(event){
        window.open('./page-photographe.html' + '?' + event.currentTarget.getAttribute('data-idphotographers'), 'blank');
     }, false)
})

