// importation des données json
import data from './data/data.json'

// on récupere l'id, le numéro et le prénom du photographe
let idduphotographe = window.location.search.substr(1).split('&').find(element => element.indexOf('id') != -1).substr(3)

let numeroduphotographe
for(let i = 0; i < data.photographers.length; i++) {
    if (data.photographers[i].id == idduphotographe) numeroduphotographe = i
}

let prenomduphotographe = data.photographers[numeroduphotographe].name.split(' ')[0]

// definition de la fonction factory qui créer un bloc quelconque
function creerbloc(type, className, textContent){
    let bloc = document.createElement(type)
    bloc.className = className
    bloc.textContent = textContent
    return bloc
}

// fonction pour ajouter un tabindex et un arial label
function rendreaccessible(objet, arialabel){
    objet.tabIndex = 1
    objet.ariaLabel = arialabel
}
// definition de la fonction pour créer le header
function HeaderPhotographe(number){
    let photographe = creerbloc('section', 'headerphotographe')
    photographe.setAttribute('data-idPhotographers', data.photographers[number].id)
    let divimg = creerbloc('a', 'divimg')
    rendreaccessible(divimg, 'photographe ' + data.photographers[number].name)
    let image = creerbloc('img', 'imageportrait')
    image.src = './images/photographers/' + data.photographers[number].portrait
    divimg.appendChild(image)
    let articlephotographe = creerbloc('article', 'articlephotographe')
    let prenom = creerbloc('p', 'nom', data.photographers[number].name)
    let lieu = creerbloc('p', 'location', data.photographers[number].city + ', ' + data.photographers[number].country)
    let sentence = creerbloc('p', 'phrase', data.photographers[number].tagline)
    let filtres = creerbloc('nav', 'tagbypers')
    for ( let i = 0; i < data.photographers[number].tags.length; i++) {
        let tag = creerbloc('span', 'tags', '#' + data.photographers[number].tags[i].toLowerCase())
        filtres.appendChild(tag) 
    }
    let divarticle = creerbloc('div', 'divarticle')
    let boutoncontact = creerbloc('button', 'openmodal openmodalcontact', 'Contactez-Moi')
    boutoncontact.id = 'openmodal'
    rendreaccessible(boutoncontact, 'Contactez' + data.photographers[number].name)
    divarticle.append(prenom, lieu, sentence, filtres)
    articlephotographe.append(divarticle, boutoncontact)
    photographe.append(articlephotographe, divimg)
    document.getElementById('headermain').appendChild(photographe)
    let modalmenu = creerbloc('div', 'modalmenu')
    let modaltitre = creerbloc('h1', 'modaltitre', 'Contactez-Moi')
    let modalclose = creerbloc('span', 'modalclose')
    modalclose.id = 'modalclose'
    rendreaccessible(modalclose, 'Fermer le modal de contact')
    modalmenu.append(modaltitre, modalclose)
    let modalnom = creerbloc('p', 'modalnom', data.photographers[number].name)
    document.getElementById('contenermodaltexte').append(modalmenu, modalnom)
}

// On appel la fonction pour créer le header 
HeaderPhotographe(numeroduphotographe)

// FONCTIONNALITES MODALS

// récupération des éléments de gestion des modals
let modalbg = document.getElementById('modalbg')
let openmodal = document.getElementById('openmodal')
let fermerModal = document.getElementById('modalclose')
let fermerModalImage = document.getElementById('modalimageclose')
let modalimagebg = document.getElementById('modalimagebg')

// fonctions d'ouverture et de fermeture des modals
function launchModal() {
    modalbg.style.display = 'flex'
}

function CloseModal() {
    modalbg.style.display = 'none'
    document.getElementById('choixactuel').focus()
}

function CloseModalImage() {
    lightbox('none', 'flex')
    document.getElementById('choixactuel').focus()
}

// fonction de soumission du formulaire et d'affichage des réponses dans la console
function submit() {
    console.log('Prénom : ' + document.getElementById('first').value)
    console.log('Nom : ' + document.getElementById('last').value)
    console.log('Email : ' + document.getElementById('email').value)
    console.log('Message : ' + document.getElementById('message').value)
    modalbg.style.display = 'none'
}

// écoutes d'evenement pour l'ouverture et la femeture des modals
openmodal.addEventListener('click', launchModal)
fermerModal.addEventListener('click', CloseModal)
fermerModal.addEventListener('keydown', function(event){
    if(event.key == 'Enter') CloseModal()
})
fermerModalImage.addEventListener('click', CloseModalImage)
fermerModalImage.addEventListener('keydown', function(event){
    if(event.key == 'Enter') CloseModalImage()
})

// écoute d'évenement pour la soumission du formulaire
document.getElementById('btn-submit').addEventListener('click', function(e) {
    e.preventDefault()
    submit()  
  })

// déclaration de la variable définnissant l'ordre de chaque images  
let orderphoto = 0

// Fonction qui creer un blocphoto ou video en fonction du type de media
function imageOuVideo(typeimage, imgblocphoto, img, prenomduphotographe, fileName){
    imgblocphoto.src = './images/' + prenomduphotographe + '/' + fileName
    let className = typeimage == 'video' ? 'imgvideoblocphoto' : 'imgblocphoto'
    imgblocphoto.className = 'imgbloc ' + className
    let mediaType = typeimage == 'video' ? 'yes' : 'no'
    imgblocphoto.setAttribute('video', mediaType)
    // src de l'image en préchargement 
    img.src = './images/' + prenomduphotographe + '/' + fileName
}

// déclaration de la fonction factory pour créer un bloc image unique
function createBlocImageUnique(type, identity, order){
    let imageDeTravail = data.media.find(x => x.id == identity)
    let blocphoto = creerbloc('article', 'blocphoto')
    blocphoto.setAttribute('date', imageDeTravail.date)
    blocphoto.style.order = order
    let divimgblocphoto = creerbloc('a', 'divimgblocphoto')
    divimgblocphoto.ariaLabel = imageDeTravail['alt-text']
    divimgblocphoto.tabIndex = order + 2
    let imgblocphoto = document.createElement('img')
    
    // la partie suivante sert a précharger les images et ainsi pouvoir définir leur height en avance
    // ----------------------------------------------------------------------------------------------
    var img = new Image()
    img.onload = function() {
        let imgwidth = this.width
        let imgheight = this.height
        let ratio = imgwidth / imgheight
        let pourcentagezoom = ratio * 100
        if (imgwidth > imgheight) imgblocphoto.style.width = pourcentagezoom + '%'
    }
    // ----------------------------------------------------------------------------------------------

    let fileName = type == 'image' ? imageDeTravail.image : imageDeTravail.video.replace('mp4','jpg')
    imageOuVideo(type, imgblocphoto, img, prenomduphotographe, fileName)
    imgblocphoto.setAttribute('id', identity)
    divimgblocphoto.appendChild(imgblocphoto)
    let menuphoto = creerbloc('article', 'menuphoto')
    let nomphoto = creerbloc('p', 'nomphoto', imageDeTravail.title)
    let divlikes = creerbloc('div', 'divlikes')
    let nblikes = creerbloc('p', 'nblikes', imageDeTravail.likes)
    let like = creerbloc('img', 'iconecoeurclick')
    like.src = './images/coeurnoir.png'
    like.tabIndex = order + 2
    like.ariaLabel = 'j\'aime'
    like.setAttribute('testclick', 'notclicked')
    divlikes.append(nblikes, like)
    menuphoto.append(nomphoto, divlikes)
    blocphoto.append(divimgblocphoto, menuphoto)
    document.getElementById('listephotos').appendChild(blocphoto)
}

// creation des blocs pour chaque photos en utilisant la fonction factory
data.media.filter(element => element.photographerId == idduphotographe).forEach(function(item){
    let type = item.image != undefined ? 'image' : 'video'
    createBlocImageUnique(type, item.id, orderphoto)
    orderphoto += 1
})

// création de la banière en bas
let banfoot = creerbloc('div', 'banfoot')
let banfootleft = creerbloc('div', 'banfootleft')
let nombredejaimetotaletexte = document.createElement('p')
let nombredejaimetotal = 0
nombredejaimetotaletexte.setAttribute('id', 'nombredejaimetotaltexte')
let array = document.getElementsByClassName('nblikes')
// calcul du nombe de j'aimes totales du photographe
for(let i = 0; i < array.length; i++){
    nombredejaimetotal += parseInt(array[i].textContent)
}
let coeurnombredejaimetotale = creerbloc('i', 'far fa-heart coeurjaimestotal')
nombredejaimetotaletexte.textContent = nombredejaimetotal
let banfootright = creerbloc('p', 'prixduphotographe', data.photographers[numeroduphotographe].price + '€ / jour')
banfootleft.append(nombredejaimetotaletexte, coeurnombredejaimetotale)
banfoot.append(banfootleft, banfootright)
document.getElementById('main').appendChild(banfoot)

// fonction de mise à jour du nombre de j'aime total
function revisionNombreDeJaimes(){
    let tableau = document.getElementsByClassName('nblikes')
    let nombredejaimetotaletexterevision = document.getElementById('nombredejaimetotaltexte')
    let nombredejaimetotalrevision = 0
    for(let i = 0; i < tableau.length; i++){
        nombredejaimetotalrevision += parseInt(tableau[i].textContent)
    }
    nombredejaimetotaletexterevision.textContent = nombredejaimetotalrevision
}

// fonctionnalité modal affichage de photo une à une 

// récupération des élements 
let blocphoto = document.getElementsByClassName('blocphoto')
let divblocphotounique = document.getElementsByClassName('divimgblocphoto')
let blocphotounique = document.getElementsByClassName('imgbloc')
let imagephotoactuel = document.getElementById('imagephotoactuel')
let textephotoactuel = document.getElementById('textephotoactuel')
let nomphotoactuel = document.getElementsByClassName('nomphoto')
let videoactuelle = document.getElementById('videoactuelle')
let pointeuractuel
let next = document.getElementById('next')
let previous = document.getElementById('previous')


// fonction qui active désactive la lightbox 
function lightbox(open, close){
    document.getElementById('header').style.display = close
    modalimagebg.style.display = open
    Array.from(document.getElementById('main').children).forEach(function(item){
        if (item.id != 'modalimagebg' && item.id != 'modalbg'){
            item.style.display = close
        }
    })
}

// fonction qui test si video ou non
function isvideo(type){
    if (type == 'video'){
        videoactuelle.style.maxHeight = window.innerHeight - 80
        imagephotoactuel.style.display = 'none'
        videoactuelle.style.display = 'flex'
    }
    else if (type == 'image'){
        videoactuelle.style.display = 'none'
        imagephotoactuel.style.maxHeight = window.innerHeight - 80
        imagephotoactuel.style.display = 'flex'
    }
}

// fonction d'ouverture de la lightbox 
function openlightbox(event, i){
    event.preventDefault()
    event.stopPropagation()
    lightbox('flex', 'none')
    textephotoactuel.textContent = nomphotoactuel[i].textContent
    // le pointeur actuel pointe sur l'ordre de l'image actuellement affichée, on test si il est égal à 0 ou au maximum
    pointeuractuel = parseInt(blocphoto[i].style.order)
    if (pointeuractuel == 0) previous.style.display = 'none'
    else previous.style.display = 'flex'
    if (pointeuractuel == blocphotounique.length - 1) next.style.display = 'none'
    else next.style.display = 'flex'
    // on regarde si le media est une vidéo ou une photo
    if(blocphotounique[i].getAttribute('video') == 'yes' ){
        isvideo('video')
        videoactuelle.src = blocphotounique[i].src.replace('jpg', 'mp4')
        videoactuelle.setAttribute('title', 'video ' + divblocphotounique[i].ariaLabel)
    }
    if(blocphotounique[i].getAttribute('video') == 'no' ){
        isvideo('image')
        imagephotoactuel.src = blocphotounique[i].src
        imagephotoactuel.setAttribute('alt', divblocphotounique[i].ariaLabel)
    }
}

// écoute du clique sur une image pour ouvrir la lightox
for (let i = 0; i < divblocphotounique.length; i++){
    divblocphotounique[i].addEventListener('click', function(event){
        openlightbox(event, i)
    })
    divblocphotounique[i].addEventListener('keydown', function(event){
        if(event.key == 'Enter') openlightbox(event, i)
    })
}

// Fonctionnalité de navigation au click sur les élement previous et next de la lightbox

// déclaration des fonctions next et previous
function onclicknext(event){
    event.stopPropagation()
    event.preventDefault()
    // determination du bloc suivant pour recuperer le lien de son image
    let findvaleurnext = Array.from(blocphoto).find(function(element){
        return element.style.order == pointeuractuel + 1
    })
    // test video/image
    if (findvaleurnext.firstChild.firstChild.getAttribute('video') == 'no'){
        isvideo('image')
        imagephotoactuel.src = findvaleurnext.firstChild.firstChild.src
        imagephotoactuel.setAttribute('alt', findvaleurnext.firstChild.ariaLabel)
    }
    if (findvaleurnext.firstChild.firstChild.getAttribute('video') == 'yes'){
        isvideo('video')
        videoactuelle.src = findvaleurnext.firstChild.firstChild.src.replace('jpg', 'mp4')
        videoactuelle.setAttribute('title', 'video ' + findvaleurnext.firstChild.ariaLabel)
    }
    // mise à jour de la lightbox
    textephotoactuel.textContent = findvaleurnext.lastChild.firstChild.textContent
    pointeuractuel += 1
    previous.style.display = 'flex'
    if (pointeuractuel == (blocphotounique.length - 1)) next.style.display = 'none'
    next.focus()
}
function onclickprevious(event){
    event.stopPropagation()
    event.preventDefault()
    // determination du bloc suivant pour recuperer le lien de son image
    let findvaleurprevious = Array.from(blocphoto).find(function(element){
    return element.style.order == pointeuractuel - 1
    })
    // test video/image
    if (findvaleurprevious.firstChild.firstChild.getAttribute('video') == 'no'){
        isvideo('image')
        imagephotoactuel.src = findvaleurprevious.firstChild.firstChild.src
        imagephotoactuel.setAttribute('alt', findvaleurprevious.firstChild.ariaLabel)
    }
    if (findvaleurprevious.firstChild.firstChild.getAttribute('video') == 'yes'){
        isvideo('video')
        videoactuelle.src = findvaleurprevious.firstChild.firstChild.src.replace('jpg', 'mp4')
        videoactuelle.setAttribute('alt', 'video : ' + findvaleurprevious.firstChild.ariaLabel)
    }
    // mise à jour de la lightbox
    textephotoactuel.textContent = findvaleurprevious.lastChild.firstChild.textContent
    pointeuractuel -= 1
    next.style.display = 'flex'
    if (pointeuractuel == 0) previous.style.display = 'none'
    previous.focus()
}

// Ecoute du click sur les éléments next et previous de la lightbox
next.addEventListener('keydown', function(event){
    if(event.key == 'Enter') onclicknext(event)
})
next.addEventListener('click', function(event){
    onclicknext(event)
})
previous.addEventListener('keydown', function(event){
    if(event.key == 'Enter') onclickprevious(event)
})
previous.addEventListener('click', function(event){
    onclickprevious(event)
})

// Fonctionnalités des boutons de trie

// récupération des éléments nécessaires
let triechoix = document.getElementById('triechoix')
let choixactuel = document.getElementById('choixactuel')
let trieactuel = document.getElementById('trieactuel')
let chevronup = document.getElementById('chevronup')

// définition fonction choixactuel activer/désactiver
function openchoix(){
    triechoix.style.display = 'flex'
    choixactuel.style.display = 'none'
}
function closechoix(){
    triechoix.style.display = 'none'
    choixactuel.style.display = 'flex'
}

// Menu deroulant et ouverture du mdoal de contact + navigation clavier dans le modal

// definition de la variable pointant sur le contact actuel
let ligneactuelle

// écoute de l'évenement tab
document.addEventListener('keydown', function(event){
    // Pour fermer le menu deroulant de trie si il perd le focus
    if(event.key == 'Tab' && document.activeElement.id != 'chevronup' && document.activeElement.id != 'date' && document.activeElement.id != 'popularite' && document.activeElement.id != 'titre'){
        closechoix()
    }
    // navigation clavier du modal de contact, aller a tel ou tel element
    if(event.key == 'Tab' && document.getElementById('modalbg').style.display == 'flex'){
        event.preventDefault()
        let textecontrol = document.getElementsByClassName('text-control')
        if(ligneactuelle == undefined){
            ligneactuelle = 0
            textecontrol[0].focus()
        }
        else if(ligneactuelle == textecontrol.length - 1){
            ligneactuelle += 1
            document.getElementById('btn-submit').focus()
        }
        else if(ligneactuelle == textecontrol.length){
            ligneactuelle = undefined
            document.getElementById('modalclose').focus()
        }
        else {
            ligneactuelle += 1
            textecontrol[ligneactuelle].focus()
        }
    }
})

// écoute du click pour ouvrir le module de choix
choixactuel.addEventListener('click', function(event){
    openchoix(event)
    document.getElementById('chevronup').focus()
})
choixactuel.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        openchoix(event)
        document.getElementById('chevronup').focus()
    }    
})

// écoute du click pour fermer le module de choix
chevronup.addEventListener('click', function(event){
    closechoix(event)
    document.getElementById('choixactuel').focus()
})
chevronup.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        closechoix(event)
        document.getElementById('choixactuel').focus()
    }    
})

// définition des éléments nécessaires pour les fonctions et les écoute des évenements à suivre
let listephotos = document.getElementById('listephotos')
let classementnomphotos = []
let popularite = document.getElementById('popularite')
let titre = document.getElementById('titrechoix')
let date = document.getElementById('date')

// On utilise cette fonction dans la fonction de trie par popularité pour pouvoir trier un tableau par ordre croissant 
function compare(x, y) {
    return x - y
}

// définition de la fonction pas de double, cette fonction sert a s'assurer que deux éléments n'ait pas le même order
function pasdedouble(){
    let tableauverif = []
    for(let i=0; i < listephotos.children.length; i++){
        tableauverif[i] = parseInt(listephotos.children[i].style.order)
    }
    let doublons = parseInt(tableauverif.filter((e, i, a) => a.indexOf(e) !== i))
    while(doublons != -1 && blocphoto[tableauverif.indexOf(doublons)] !== undefined){
        blocphoto[tableauverif.indexOf(doublons)].style.order = blocphoto[tableauverif.indexOf(doublons)].style.order - 1
        for(let i=0; i < listephotos.children.length; i++){
            tableauverif[i] = parseInt(listephotos.children[i].style.order)
        }
        doublons = parseInt(tableauverif.filter((e, i, a) => a.indexOf(e) !== i))
    }
}

// Définition des fonctions de trie, elles marchent sur le même principe

// définition de la fonction qui trie les éléments par popularité
function triParPopularité(){
    for(let i=0; i < blocphoto.length; i++) {
        classementnomphotos[i] = parseInt(listephotos.children[i].lastChild.lastChild.firstChild.textContent)
    }
    classementnomphotos.sort(compare).reverse()
    classementnomphotos.forEach(function (valeur, index){
        for(let i=0; i < blocphoto.length; i++){
            if(blocphoto[i].lastChild.lastChild.firstChild.textContent == valeur){
                blocphoto[i].style.order = index
                blocphoto[i].firstChild.tabIndex = index + 2
                document.getElementsByClassName('iconecoeurclick')[i].tabIndex = blocphoto[i].firstChild.tabIndex
            }
        }
    })
}

// définition de la fonction qui trie les éléments par titre 
function triParTitre(){
    for(let i=0; i < blocphoto.length; i++) {
        classementnomphotos[i] = listephotos.children[i].lastChild.firstChild.textContent
    }
    classementnomphotos.sort()
    classementnomphotos.forEach(function (valeur, index){
        for(let i=0; i < blocphoto.length; i++){
            if(blocphoto[i].lastChild.firstChild.textContent == valeur){
                blocphoto[i].style.order = index
                blocphoto[i].firstChild.tabIndex = index + 2
                document.getElementsByClassName('iconecoeurclick')[i].tabIndex = blocphoto[i].firstChildtabIndex
            }
        }
    })
}

// définition de la fonction qui trie les éléments par date
function triParDate(){
    for(let i=0; i < blocphoto.length; i++) {
        classementnomphotos[i] = listephotos.children[i].getAttribute('date').replace('-', '').replace('-', '')
    }
    classementnomphotos.sort()
    classementnomphotos.forEach(function (valeur, index){
        for(let i=0; i < blocphoto.length; i++){
            if(blocphoto[i].getAttribute('date').replace('-', '').replace('-', '') == valeur){
                blocphoto[i].style.order = index
                blocphoto[i].firstChild.tabIndex = index + 2
                document.getElementsByClassName('iconecoeurclick')[i].tabIndex = blocphoto[i].firstChild.tabIndex
            }
        }
    })
}

// fonction qui gère l'affichage du menu déroulant de trie
function trieAffichage(actual){
    document.getElementById('triechoix').style.display = 'none'
    document.getElementById('choixactuel').style.display = 'flex'
    trieactuel.textContent = actual
    if(actual == 'Popularité' || actual == 'Date'){
        document.getElementById('popularite').classList.remove('choixinverse')
        document.getElementById('date').classList.remove('choixinverse')
    }
    else {
        popularite.className += ' choixinverse'
        date.className += ' choixinverse'
    }
}

// définition fonction d'écoute
function ecoutepopularite(){
    trieAffichage('Popularité')
    triParPopularité()
    pasdedouble()
    popularite.style.order = 0
    titre.style.order = 2
    date.style.order = 1
}
function ecoutetitre() {
    trieAffichage('Titre')
    triParTitre()
    pasdedouble()
    popularite.style.order = 1
    titre.style.order = 0
    date.style.order = 2
}
function ecoutedate() {
    trieAffichage('Date')
    triParDate()
    pasdedouble()
    popularite.style.order = 1
    titre.style.order = 2
    date.style.order = 0
}

// écoute de l'évenement pour trier par popularité, par date ou par titre 
popularite.addEventListener('click', function(){
    ecoutepopularite()
})
popularite.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        ecoutepopularite()
        document.getElementById('choixactuel').focus()
    }   
})

titre.addEventListener('click', function(){
    ecoutetitre()
})
titre.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        ecoutetitre()
        document.getElementById('choixactuel').focus()
    }   
})

date.addEventListener('click', function(){
    ecoutedate()
})
date.addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        ecoutedate()
        document.getElementById('choixactuel').focus()
    }   
})

// fonctionnalités likes

// variable contenant le nombre de jaimes de chaque classe et le pointeur vers l'élément cliqué
let like_a_incrementer = document.getElementsByClassName('nblikes')
let boutonsjaime = document.getElementsByClassName('iconecoeurclick')

// definition de la fonction pour incrementer et gerer les likes
function likeadd(event, i){
    // On test si le coeur était déjà cliqué ou non et on change son style en conséquence
    if (boutonsjaime[i].getAttribute('testclick') == 'notclicked'){
        let nombreaugmenter = parseInt(like_a_incrementer[i].textContent) + 1
        like_a_incrementer[i].textContent = nombreaugmenter
        boutonsjaime[i].setAttribute('testclick', 'clicked')
        boutonsjaime[i].src = './images/coeurrouge.png'
        boutonsjaime[i].ariaLabel = 'bouton Jaime actif'
    }
    else {
        let nombrediminuer = parseInt(like_a_incrementer[i].textContent) - 1
        like_a_incrementer[i].textContent = nombrediminuer
        boutonsjaime[i].setAttribute('testclick', 'notclicked')
        boutonsjaime[i].src = './images/coeurnoir.png'
        boutonsjaime[i].ariaLabel = 'bouton Jaime'
    }
    // On met à jour la variable contenant le nombre total de j'aimes
    revisionNombreDeJaimes()
    // On test si les photos sont actuellement trié par nombre de j'aimes
    if(document.getElementById('trieactuel').textContent == 'Popularité'){
    // si c'est le cas, on met à jour le classement des images par nombre de j'aimes et on s'assure qu'il n'y ait pas de double order
        triParPopularité()
        pasdedouble()
        // et on va vers l'image sur laquelle on a cliqué car si il y a eu un changement d'ordre l'image peut ne plus être centré
        location.href= '#' + event.path[3].firstChild.firstChild.getAttribute('id')
    }
    boutonsjaime[i].focus()
}

// On écoute l'évenement clique sur le coeur cliquable de chaque image
for (let i = 0; i < boutonsjaime.length; i++){
    boutonsjaime[i].addEventListener('click', function(event){
        likeadd(event, i)
    })
    boutonsjaime[i].addEventListener('keydown', function(event){
        if(event.key == 'Enter') likeadd(event, i)
    })
}

// par défaut, les images seront classés par leur nombre de j'aimes
triParPopularité()

// Ces lignes permettent la navigation graçe aux flèches du clavier
window.addEventListener('keydown', function(e){
    if(e.key == 'ArrowLeft' && document.getElementById('modalimagebg').style.display == 'flex' && document.getElementById('previous').style.display == 'flex'){
        onclickprevious(e)
    }
    if(e.key == 'ArrowRight' && document.getElementById('modalimagebg').style.display == 'flex' && document.getElementById('next').style.display == 'flex'){
        onclicknext(e)
    }
})