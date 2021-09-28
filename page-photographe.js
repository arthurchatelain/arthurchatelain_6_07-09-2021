import data from "./data/data.json"

let idduphotographe = window.location.search.substr(1);
let numeroduphotographe;

for(let i = 0; i < data.photographers.length; i++) {
    if (data.photographers[i].id == idduphotographe){
        numeroduphotographe = i;
        break;
    }
}

let prenomduphotographe = data.photographers[numeroduphotographe].name.split(" ")[0];

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
    document.getElementById('headermain').appendChild(photographe);
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
let fermerModalImage = document.querySelectorAll(".modalimageclose");
let modalimagebg = document.getElementById('modalimagebg');

function launchModal() {
    modalbg.style.display = "flex";
}
function CloseModal() {
    modalbg.style.display = "none";
}
function CloseModalImage() {
    modalimagebg.style.display = "none";
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
fermerModalImage.forEach((btn) => btn.addEventListener("click", CloseModalImage));

document.getElementById('btn-submit').addEventListener('click', function (e) {
    e.preventDefault();
    submit();   
  })

let orderphoto = 0;

//  creation bloc principal

data.media.forEach((item)=>{
    if(item.photographerId == idduphotographe){
        orderphoto += 1;
        let blocphoto = document.createElement('article');
        blocphoto.className = "blocphoto";
        blocphoto.style.order = orderphoto;
        let divimgblocphoto = document.createElement('div');
        divimgblocphoto.className = "divimgblocphoto";
        if (item.image != undefined){
            let imgblocphoto = document.createElement('img');
            imgblocphoto.src = './images/' + prenomduphotographe + '/' + item.image;
            imgblocphoto.className = 'imgbloc imgblocphoto';
            imgblocphoto.setAttribute('id', item.id);
            divimgblocphoto.appendChild(imgblocphoto);
            var img = new Image();
            img.onload = function() {
                let imgwidth = this.width;
                let imgheight = this.height;
                let ratio = imgwidth / imgheight;
                let pourcentagezoom = ratio * 100;
                if (imgwidth > imgheight){
                    imgblocphoto.style.width = pourcentagezoom + '%';
                }
            }
            img.src = './images/' + prenomduphotographe + '/' + item.image;
        }
        else {
            let imgvideoblocphoto = document.createElement('img');
            imgvideoblocphoto.src = './images/' + prenomduphotographe + '/' +item.video.replace('mp4','jpg');
            imgvideoblocphoto.className = 'imgbloc imgvideoblocphoto';
            imgvideoblocphoto.setAttribute('id', item.id);
            divimgblocphoto.appendChild(imgvideoblocphoto);
            var img = new Image();
            img.onload = function() {
                let imgwidth = this.width;
                let imgheight = this.height;
                let ratio = imgwidth / imgheight;
                let pourcentagezoom = ratio * 100;
                if (imgwidth > imgheight){
                    imgvideoblocphoto.style.width = pourcentagezoom + '%';
                }
            }
            img.src = './images/' + prenomduphotographe + '/' +item.video.replace('mp4','jpg');
        }
        let menuphoto = document.createElement('article');
        menuphoto.className = 'menuphoto';
        let nomphoto = document.createElement('p');
        nomphoto.className = 'nomphoto';
        nomphoto.textContent = item.title;
        let divlikes = document.createElement('div');
        divlikes.className = 'divlikes';
        let nblikes = document.createElement('p');
        nblikes.className = 'nblikes';
        nblikes.textContent = item.likes;
        let like = document.createElement('i');
        like.className = "far fa-heart iconecoeurclick";
        like.setAttribute('testclick', 'notclicked'); 
        divlikes.appendChild(nblikes);
        divlikes.appendChild(like);
        menuphoto.appendChild(nomphoto);
        menuphoto.appendChild(divlikes);
        blocphoto.appendChild(divimgblocphoto);
        blocphoto.appendChild(menuphoto)
        document.getElementById('listephotos').appendChild(blocphoto);
    }
})    

// fonctionnalités likes 

let like_a_incrementer = document.getElementsByClassName('nblikes');
let boutonsjaime = document.getElementsByClassName('iconecoeurclick');
for (let i = 0; i < boutonsjaime.length; i++){
    boutonsjaime[i].addEventListener('click', function(){
        if (boutonsjaime[i].getAttribute('testclick') == "notclicked"){
            let nombreaugmenter = parseInt(like_a_incrementer[i].textContent) + 1;
            like_a_incrementer[i].textContent = nombreaugmenter;
            boutonsjaime[i].setAttribute('testclick', 'clicked')
            boutonsjaime[i].style.fontWeight = '800';
        }
        else {
            let nombrediminuer = parseInt(like_a_incrementer[i].textContent) - 1;
            like_a_incrementer[i].textContent = nombrediminuer;
            boutonsjaime[i].setAttribute('testclick', 'notclicked')
            boutonsjaime[i].style.fontWeight = '400';
        }
        revisionNombreDeJaimes()
    });
}

// création banière

let banfoot = document.createElement('div');
let banfootleft = document.createElement('div');
banfootleft.className = 'banfootleft';
banfoot.className = 'banfoot';
let nombredejaimetotaletexte = document.createElement('p')
let nombredejaimetotal = 0;
nombredejaimetotaletexte.setAttribute('id', 'nombredejaimetotaltexte')
let array = document.getElementsByClassName('nblikes');
for(let i = 0; i < array.length; i++){
    nombredejaimetotal += parseInt(array[i].textContent);
}
let coeurnombredejaimetotale = document.createElement('i');
coeurnombredejaimetotale.className = 'far fa-heart coeurjaimestotal'
nombredejaimetotaletexte.textContent = nombredejaimetotal;
let banfootright = document.createElement('p');
banfootright.className = 'prixduphotographe';
banfootright.textContent = data.photographers[numeroduphotographe].price + '€ / jour'
banfootleft.appendChild(nombredejaimetotaletexte);
banfootleft.appendChild(coeurnombredejaimetotale);
banfoot.appendChild(banfootleft);
banfoot.appendChild(banfootright);
document.getElementById('main').appendChild(banfoot);

function revisionNombreDeJaimes(){
    let tableau = document.getElementsByClassName('nblikes');
    let nombredejaimetotaletexterevision = document.getElementById('nombredejaimetotaltexte');
    let nombredejaimetotalrevision = 0;
    for(let i = 0; i < tableau.length; i++){
        nombredejaimetotalrevision += parseInt(tableau[i].textContent);
    }
    nombredejaimetotaletexterevision.textContent = nombredejaimetotalrevision;
}

// fonctionnalité modal affichage de photo une à une 

let blocphotounique = document.getElementsByClassName('imgbloc');
let imagephotoactuel = document.getElementById('imagephotoactuel');
let pointeuractuel;
for (let i = 0; i < blocphotounique.length; i++){
    blocphotounique[i].addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        modalimagebg.style.display = "flex";
        imagephotoactuel.src = event.target.src;
        pointeuractuel = i;
    })
}

// clique previous next

