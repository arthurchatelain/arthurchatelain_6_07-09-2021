// importation des données json
import data from './data/data.json'

// le nombre actuel de photographe ( peut être mis à jour ) 
const nombredephotographes = 6

// definition de la fonction factoring qui créer un bloc quelconque
function creerbloc(type, className, textContent){
    let bloc = document.createElement(type)
    bloc.className = className
    bloc.textContent = textContent
    return bloc
}

// fonction qui creer le header, avec le logo les liens et le h1
function createHeader(){
	let tags = []
	data.photographers.forEach((item)=>{
		tags = [
            ...tags,
            ...item.tags
]
    })
    tags = [...new Set(tags)]
    var nav = creerbloc('nav', 'listetags')
    var header = document.getElementById('header')
    var titre = creerbloc('h1', '', 'Nos Photographes')
    tags.forEach(function(item){
        var createtag = creerbloc('a', 'tag tagclick', '#' + item)
        createtag.tabIndex = 'inherit'
        createtag.ariaLabel = 'tag ' + item
        nav.appendChild(createtag)
    })
    header.append(nav, titre)
}

// definition de la fonction factoring qui créer un bloc pour chaque photographe
function BlocPhotographe(number){
    let photographe = creerbloc('a', 'blocphotographe')
    photographe.tabIndex = '0'
    photographe.href = './page-photographe.html?id=' + data.photographers[number].id
    photographe.setAttribute('data-idPhotographers', data.photographers[number].id)
    photographe.ariaLabel = 'Photographe' + data.photographers[number].name + 'basé à ' + data.photographers[number].city + 'qui dit' + data.photographers[number].tagline
    let divimg = creerbloc('div', 'divimg')
    let image = creerbloc('img', 'imageportrait')
    image.src = './images/photographers/' + data.photographers[number].portrait
    image.alt = 'portrait de' + data.photographers[number].name
    divimg.appendChild(image)
    let prenom = creerbloc('p', 'nom', data.photographers[number].name)
    let lieu = creerbloc('p', 'location', data.photographers[number].city + ', ' + data.photographers[number].country)
    let sentence = creerbloc('p', 'phrase', data.photographers[number].tagline)
    let prix = creerbloc('p', 'tarif', data.photographers[number].price + ' €')
    let filtres = creerbloc('nav', 'tagbypers')
    for ( let i = 0; i < data.photographers[number].tags.length; i++) {
        let tag = creerbloc('a', 'tag tagf', '#' + data.photographers[number].tags[i].toLowerCase())
        filtres.appendChild(tag) 
    }
    photographe.append(divimg, prenom, lieu, sentence, prix, filtres)
    document.getElementById('main').appendChild(photographe)
}

// Appel des fonction, on créer le header et tout le contenu de la page, de façon automatisée.
createHeader() 
for (let i = 0; i < nombredephotographes; i++){
    BlocPhotographe(i)
}

// fonction qui gere le style des tags et le clique dessus
function siCliquer(i, couleurfond, couleur, isclicked, aria, content){
    taglist[i].style.backgroundColor = couleurfond
    taglist[i].style.color = couleur
    tagclicked[i] = isclicked
    taglist[i].ariaLabel = aria
    tagneeded[i] = content
}

// fonctionnalitée filtres design au click sur chaque tag
let taglist = document.getElementsByClassName('tagclick')
let tagneeded = []
let tagclicked = []
for (let i = 0; i < taglist.length; i++) {
    tagclicked[i] = 0
    // fonctionnalités click
    taglist[i].addEventListener('click', function(){
        if (tagclicked[i] == 0) siCliquer(i, '#901C1C', 'white', 1, 'tag ' + taglist[i].textContent.substr(1) + ' actif', taglist[i].textContent)
        else if (tagclicked[i] == 1) siCliquer(i, '', '', 0, 'tag' + taglist[i].textContent.substr(1), 0)
        tagmanagement(tagneeded)
    })
    taglist[i].addEventListener('keydown', function(event){
        if(event.key == 'Enter') {
            if (tagclicked[i] == 0) siCliquer(i, '#901C1C', 'white', 1, 'tag ' + taglist[i].textContent.substr(1) + ' actif', taglist[i].textContent)
            else if (tagclicked[i] == 1) siCliquer(i, '', '', 0, 'tag' + taglist[i].textContent.substr(1), 0)
            tagmanagement(tagneeded)
        }
    })
} 

// Classement par tags, si le photographe à ou n'a pas tel ou tel tag
function tagmanagement(filtersneeded) {
    let blocfotodel = document.getElementsByClassName('blocphotographe')
    let g = document.getElementsByClassName('tagf')
    let r = 0
    Array.from(g).forEach(function(item){
        if(filtersneeded.find(element => element == item.textContent) != undefined) r = 1
    })
    if (r == 0) Array.from(blocfotodel).forEach(item => item.style.display = 'flex')
    else {
        for (let z = 0; z < blocfotodel.length; z++){
            let a = blocfotodel[z].getElementsByClassName('tagf')
            let x = 0
            for (let c = 0; c < a.length; c++){
                for (let d = 0; d < filtersneeded.length; d++){
                    if (a[c].textContent == filtersneeded[d]) x = 1
                 }
                if (x == 1) blocfotodel[z].style.display = 'flex'
                else blocfotodel[z].style.display = 'none'
            }
        }
    }    
}

// Ancre de retour en haut de page
window.addEventListener('scroll', function(){
    if(window.scrollY == 0) document.getElementById('ancreretour').style.display = 'none'
    else if(window.scrollY > 0) document.getElementById('ancreretour').style.display = 'block'
})
