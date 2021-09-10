function BlocPhotographe(portrait, nom, location, phrase, tarif, tags){
    let photographe = document.createElement('section');
    photographe.className = "blocphotographe" ;
    let divimg = document.createElement('div');
    divimg.className = "divimg"; 
    let image = document.createElement('img');
    image.src = portrait;
    image.className = "imageportrait"
    divimg.appendChild(image); 
    let prenom = document.createElement('p');
    prenom.textContent = nom;
    prenom.className = "nom";
    let lieu = document.createElement('p');
    lieu.textContent = location;
    lieu.className = "location";
    let sentence = document.createElement('p');
    sentence.textContent = phrase;
    sentence.className = "phrase";
    let prix = document.createElement('p');
    prix.textContent = tarif;
    prix.className = "tarif";
    let filtres = document.createElement('nav');
    filtres.className = "tagbypers"
    for ( let i = 0; i < tags.length; i++) {
        let tag = document.createElement('span');
        tag.textContent = tags[i];
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

BlocPhotographe("images/photographers/EllieRoseWilkens.jpg", "Ellie-Rose Wikens", "Paris, France", "Travail sur des compositions complexes", "250€/jour", ["#Sport", "#Architecture"] );
BlocPhotographe("images/photographers/MimiKeel.jpg", "Mimi Keel", "London, UK", "Voir le beau dans le quotidien", "400€/jour", ["#Portraits", "#Events", "#Travel", "#Animals"] );
BlocPhotographe("images/photographers/TracyGalindo.jpg", "Tracy Galindo", "Montreal, Canada", "Phtographe freelance", "500€/jour", ["#Art", "#Fashion", "#Event"] );
BlocPhotographe("images/photographers/NabeelBradford.jpg", "Nabeel Bradford", "Mexico city, Mexico", "Je vais toujours de l'avant", "350€/jour", ["#Travel", "#Portraits"] );
BlocPhotographe("images/photographers/RhodeDubois.jpg", "Rhode Dubois", "Barcelona, Spain", "Créatrice de souvenirs", "375€/jour", ["#Sport", "#Fashion", "#Events", "#Animals"] );
BlocPhotographe("images/photographers/MarcelNikolic.jpg", "Marcel Nikolic", "Berlin, Germany", "Toujours à la recherche de LA photo", "300€/jour", ["#Travel", "#Architecture"] );

/* Fonctionnalitée filtres */

taglist = document.getElementsByClassName("tagclick");
tagneeded = [];
tagclicked = [];
for (let i = 0; i < taglist.length; i++) {
    taglist[i].addEventListener('mouseover', function(){
        taglist[i].style.backgroundColor = '#901C1C';
        taglist[i].style.color = 'white';
        if (tagclicked[i] == undefined){
            tagclicked[i] = 0;
        }
    })
}
for (let i = 0; i < taglist.length; i++) {
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
let x = 0;
let r = 0;
function tagmanagement(filtersneeded) {
    blocfotodel = document.getElementsByClassName('blocphotographe');
    g = document.getElementsByClassName('tagf');
    r = 0;
    for(let s = 0; s < g.length; s++){
        for(let t = 0; t < filtersneeded.length; t++){
            if (g[s].textContent == filtersneeded[t]){
                r =1;
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
            a = blocfotodel[z].getElementsByClassName('tagf');
            x = 0;
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
