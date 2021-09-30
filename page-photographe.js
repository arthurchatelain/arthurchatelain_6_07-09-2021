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
("Prénom : " + document.getElementById('first').value);
("Nom : " + document.getElementById('last').value);
("Email : " + document.getElementById('email').value);
("Message : " + document.getElementById('message').value);
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
        let blocphoto = document.createElement('article');
        blocphoto.className = "blocphoto";
        blocphoto.setAttribute('date', item.date)
        blocphoto.style.order = orderphoto;
        let divimgblocphoto = document.createElement('div');
        divimgblocphoto.className = "divimgblocphoto";
        if (item.image != undefined){
            let imgblocphoto = document.createElement('img');
            imgblocphoto.src = './images/' + prenomduphotographe + '/' + item.image;
            imgblocphoto.className = 'imgbloc imgblocphoto';
            imgblocphoto.setAttribute('video', 'no');
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
            imgvideoblocphoto.setAttribute('video', 'yes')
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
        orderphoto += 1;
    }
})    

// fonctionnalités likes 

let like_a_incrementer = document.getElementsByClassName('nblikes');
let boutonsjaime = document.getElementsByClassName('iconecoeurclick');
for (let i = 0; i < boutonsjaime.length; i++){
    boutonsjaime[i].addEventListener('click', function(event){
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
        if(document.getElementById('trieactuel').textContent = 'Popularité'){
                for(let i=0; i < blocphoto.length; i++) {
                    classementnomphotos[i] = parseInt(listephotos.children[i].lastChild.lastChild.firstChild.textContent);
                }
                classementnomphotos.sort(compare).reverse();
                classementnomphotos.forEach(function (valeur, index){
                    for(let i=0; i < blocphoto.length; i++){
                        if(blocphoto[i].lastChild.lastChild.firstChild.textContent == valeur){
                            blocphoto[i].style.order = index;
                        }
                    }
                })
                trieactuel.textContent = "Popularité";
                document.getElementById('triechoix').style.display = "none"; 
                document.getElementById('choixactuel').style.display = "flex";
                pasdedouble();
                popularite.style.order = 0;
                titre.style.order = 2;
                date.style.order = 1;
                document.getElementById('popularite').classList.remove('choixinverse');
                document.getElementById('date').classList.remove('choixinverse');
                location.href= '#' + event.path[3].firstChild.firstChild.getAttribute('id');
            }
        }
    );
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

let blocphoto = document.getElementsByClassName('blocphoto')
let blocphotounique = document.getElementsByClassName('imgbloc');
let imagephotoactuel = document.getElementById('imagephotoactuel');
let textephotoactuel = document.getElementById('textephotoactuel');
let nomphotoactuel = document.getElementsByClassName('nomphoto');
let videoactuelle = document.getElementById('videoactuelle');
let pointeuractuel;
let next = document.getElementById('next');
let previous = document.getElementById('previous');
for (let i = 0; i < blocphotounique.length; i++){
    blocphotounique[i].addEventListener('click', function(event){
        event.preventDefault();
        event.stopPropagation();
        modalimagebg.style.display = "flex";
        imagephotoactuel.src = event.target.src;
        textephotoactuel.textContent = nomphotoactuel[i].textContent;
        pointeuractuel = parseInt(blocphoto[i].style.order);
        if (pointeuractuel == 0){
            previous.style.display = "none";
        }
        else {
            previous.style.display = "flex";
        }
        if (pointeuractuel == blocphotounique.length - 1){
            next.style.display = "none";
        }
        else {
            next.style.display = "flex";
        }
        if(blocphotounique[i].getAttribute('video') == "yes" ){
            imagephotoactuel.src = "";
            imagephotoactuel.style.display = "none";
            videoactuelle.style.display = "flex";
            videoactuelle.src = event.target.src.replace('jpg', 'mp4')
            videoactuelle.style.height = window.innerHeight - 80;
        }
        if(blocphotounique[i].getAttribute('video') == "no" ){
            imagephotoactuel.src = event.target.src;
            imagephotoactuel.style.display = "flex";
            videoactuelle.style.display = "none";
            imagephotoactuel.style.height = window.innerHeight - 80;
        }
    })
}

// clique previous next

next.addEventListener('click', function(event){
    event.stopPropagation();
    event.preventDefault();
    let findvaleurnext = Array.from(blocphoto).find(function(element){
        return element.style.order == pointeuractuel + 1;
    })
    if (findvaleurnext.firstChild.firstChild.getAttribute('video') == "no"){
        imagephotoactuel.src = findvaleurnext.firstChild.firstChild.src;
        imagephotoactuel.style.display = "flex";
        videoactuelle.style.display = "none";
        imagephotoactuel.style.height = window.innerHeight - 80;
    }
    if (findvaleurnext.firstChild.firstChild.getAttribute('video') == "yes"){
        imagephotoactuel.src = "";
        videoactuelle.src = findvaleurnext.firstChild.firstChild.src.replace('jpg', 'mp4')
        imagephotoactuel.style.display = "none";
        videoactuelle.style.display = "flex";
        videoactuelle.style.height = window.innerHeight - 80;
    }
    textephotoactuel.textContent = findvaleurnext.lastChild.firstChild.textContent;
    pointeuractuel += 1;
    previous.style.display = "flex";
    if (pointeuractuel == (blocphotounique.length - 1)){
        next.style.display = "none";
    }
})

previous.addEventListener('click', function(event){
    event.stopPropagation();
    event.preventDefault();
    let findvaleurprevious = Array.from(blocphoto).find(function(element){
    return element.style.order == pointeuractuel - 1;
    })
    if (findvaleurprevious.firstChild.firstChild.getAttribute('video') == "no"){
        imagephotoactuel.src = findvaleurprevious.firstChild.firstChild.src;
        imagephotoactuel.style.display = "flex";
        videoactuelle.style.display = "none";
        imagephotoactuel.style.height = window.innerHeight - 80;
    }
    if (findvaleurprevious.firstChild.firstChild.getAttribute('video') == "yes"){
        imagephotoactuel.src = "";
        videoactuelle.src = findvaleurprevious.firstChild.firstChild.src.replace('jpg', 'mp4')
        imagephotoactuel.style.display = "none";
        videoactuelle.style.display = "flex";
        videoactuelle.style.height = window.innerHeight - 80;
    }
    textephotoactuel.textContent = findvaleurprevious.lastChild.firstChild.textContent;
    pointeuractuel -= 1;
    next.style.display = "flex";
    if (pointeuractuel == 0){
        previous.style.display = "none";
    }
})

// trie fonctionalités 

let triechoix = document.getElementById('triechoix');
let choixactuel = document.getElementById('choixactuel');
let trieactuel = document.getElementById('trieactuel');
let chevronup = document.getElementById('chevronup');
choixactuel.addEventListener('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    triechoix.style.display = "flex";
    choixactuel.style.display = "none";
})
chevronup.addEventListener('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    triechoix.style.display = "none";
    choixactuel.style.display = "flex";
})

// trie algorythme par titre 

let listephotos = document.getElementById('listephotos');
let classementnomphotos = [];
let popularite = document.getElementById('popularite');
let titre = document.getElementById('titrechoix');
let date = document.getElementById('date');

function compare(x, y) {
    return x - y;
}

popularite.addEventListener('click', function(){
    for(let i=0; i < blocphoto.length; i++) {
        classementnomphotos[i] = parseInt(listephotos.children[i].lastChild.lastChild.firstChild.textContent);
    }
    classementnomphotos.sort(compare).reverse();
    classementnomphotos.forEach(function (valeur, index){
        for(let i=0; i < blocphoto.length; i++){
            if(blocphoto[i].lastChild.lastChild.firstChild.textContent == valeur){
                blocphoto[i].style.order = index;
            }
        }
    })
    trieactuel.textContent = "Popularité";
    document.getElementById('triechoix').style.display = "none"; 
    document.getElementById('choixactuel').style.display = "flex";
    pasdedouble();
    popularite.style.order = 0;
    titre.style.order = 2;
    date.style.order = 1;
    document.getElementById('popularite').classList.remove('choixinverse');
    document.getElementById('date').classList.remove('choixinverse');
});

titre.addEventListener('click', function(){
    for(let i=0; i < blocphoto.length; i++) {
        classementnomphotos[i] = listephotos.children[i].lastChild.firstChild.textContent;
    }
    classementnomphotos.sort();
    classementnomphotos.forEach(function (valeur, index){
        for(let i=0; i < blocphoto.length; i++){
            if(blocphoto[i].lastChild.firstChild.textContent == valeur){
                blocphoto[i].style.order = index;
            }
        }
    })
    trieactuel.textContent = "Titre"; 
    document.getElementById('triechoix').style.display = "none"; 
    document.getElementById('choixactuel').style.display = "flex";
    pasdedouble();
    popularite.style.order = 1;
    titre.style.order = 0;
    date.style.order = 2;
    popularite.className += ' choixinverse';
    date.className += ' choixinverse';
});

date.addEventListener('click', function(){
    for(let i=0; i < blocphoto.length; i++) {
        classementnomphotos[i] = listephotos.children[i].getAttribute('date').replace('-', '').replace('-', '');
    }
    classementnomphotos.sort();
    classementnomphotos.forEach(function (valeur, index){
        for(let i=0; i < blocphoto.length; i++){
            if(blocphoto[i].getAttribute('date').replace('-', '').replace('-', '') == valeur){
                blocphoto[i].style.order = index;
            }
        }
    })
    trieactuel.textContent = "Date"; 
    document.getElementById('triechoix').style.display = "none"; 
    document.getElementById('choixactuel').style.display = "flex";
    pasdedouble();
    popularite.style.order = 1;
    titre.style.order = 2;
    date.style.order = 0;
    document.getElementById('popularite').classList.remove('choixinverse');
    document.getElementById('date').classList.remove('choixinverse');
});
   
function pasdedouble(){
    let tableauverif = [];
    for(let i=0; i < listephotos.children.length; i++){
        tableauverif[i] = parseInt(listephotos.children[i].style.order);
    }
    let doublons = parseInt(tableauverif.filter((e, i, a) => a.indexOf(e) !== i));
    while(doublons != -1 && blocphoto[tableauverif.indexOf(doublons)] !== undefined){
        blocphoto[tableauverif.indexOf(doublons)].style.order = blocphoto[tableauverif.indexOf(doublons)].style.order - 1;
        for(let i=0; i < listephotos.children.length; i++){
            tableauverif[i] = parseInt(listephotos.children[i].style.order);
        }
        doublons = parseInt(tableauverif.filter((e, i, a) => a.indexOf(e) !== i));
    }
}


