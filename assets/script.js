const slides = [
	{
		"image": "slide1.jpg",
		"tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image": "slide2.jpg",
		"tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image": "slide3.jpg",
		"tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image": "slide4.png",
		"tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
	}
];


const bullet_like_item = document.getElementById("bullet_like_item");
let bannerImg = document.getElementById("banner-img");

//  Substring est une méthode qui  extrait une partie (délimitée par les
//  deux éléments séparés par une virgule) d'une chaîne de 
//  caractères.
//  lastIndexOf("/") renvoie au dernier ("/") de bannerImg
//  (situé sur index.html ligne 25 : juste après le nom du dossier slideshow).
let bannerImgFileName = bannerImg.src.substring(bannerImg.src.lastIndexOf("/") + 1, bannerImg.src.length);


//  Cette boucle débute à 1, et s'incrémente (+1) 
//  tant que la valeur de i est inférieure
//  à la longueur de slides[].
for (let i = 1; i < slides.length; i++) {

	//  Cette boucle crée des  <div class="dot">.
	let dotElement = document.createElement("div");
	dotElement.className = "dot";


	//  appendChild rajoute l'élément
	//  dotElement comme dernier 
	//  enfant de bullet_like_item.
	bullet_like_item.appendChild(dotElement);

	dotElement.className + "dot_selected";
}



function addDotSelectedToElement(element) {
	element.classList.add("dot_selected");
}

function removeDotSelectedFromElement(element) {
	element.classList.remove("dot_selected");
}


//  (Attention : les variables déclarées dans une 
//  fonction ne sont valables que dans celle-ci).
//  innerHTML est le contenu HTML de l'élément.
function changeImageAndTagLine(bannerP, nextSlide) {
	bannerImgFileName = nextSlide.image;
	bannerP.innerHTML = nextSlide.tagLine;
}


function changeImageSrc(imgSrc) {
	bannerImg.src = "./assets/images/slideshow/" + imgSrc.image;
}

//  Ajoute un évènement click à l'élément "first_arrow"
//  avec une "fonction anonyme" (à usage unique).
//  (ceci est valable uniquement pour la flèche gauche).
document.getElementById("first_arrow").addEventListener('click', function () {
	let nextImageIdex = 0;
	let bannerP = document.getElementById("banner-p");
	let dotElement = document.getElementsByClassName("dot");

	for (let i = 0; i < slides.length; i++) {

		//  Si le slide actuel sur la bannière correspond
		//  strictement à la première image de slides[]
		//  alors le slide suivant est la dernière image de slides[],
		//  le "dot_selected" est transféré au slide suivant (qui 
		//  est ici la dernière image de slides[]), et le "dot_selected"
		//  de slides[0] est supprimé.
		//  La partie "else if" est valable uniquement si le slide actuel de la 
		//  bannière ne correspond pas à la première image de slides[].  

		if (bannerImgFileName === slides[0].image) {
			changeImageSrc(slides[slides.length - 1]);
			nextImageIdex = slides.length - 1;
			addDotSelectedToElement(dotElement[nextImageIdex]);
			removeDotSelectedFromElement(dotElement[0]);
		} else if (bannerImgFileName === slides[i].image) {
			changeImageSrc(slides[i - 1]);
			addDotSelectedToElement(dotElement[i - 1]);
			removeDotSelectedFromElement(dotElement[i]);
			nextImageIdex = i - 1;
		}
	}

	//  Cet addEventListener a une conséquence sur chacun de ces deux éléments 
	changeImageAndTagLine(bannerP, slides[nextImageIdex]);
});


// La même chose, mais pour la flèche de droite.
document.getElementById("second_arrow").addEventListener('click', function () {
	let nextImageIdex = 0;
	let bannerP = document.getElementById("banner-p");
	let dotElement = document.getElementsByClassName("dot");

	for (let i = 0; i < slides.length; i++) {

		//  Si le slide actuel sur la bannière correspond
		//  à la dernière image de slides[], alors le slide suivant
		//  sera slides[0] et le "dot_selected" sera dessus.
		//  Le "dot_selected" du slide actuel sera supprimé.
		//  La partie "else if" est valable uniquement si le slide actuel
		//  de la bannière est différent de la dernière image de slides[].  
		if (bannerImgFileName === slides[slides.length - 1].image) {
			changeImageSrc(slides[0]);
			addDotSelectedToElement(dotElement[0]);
			removeDotSelectedFromElement(dotElement[slides.length - 1]);
		} else if (bannerImgFileName === slides[i].image) {
			changeImageSrc(slides[i + 1]);
			nextImageIdex = i + 1;
			addDotSelectedToElement(dotElement[nextImageIdex]);
			removeDotSelectedFromElement(dotElement[i]);
		}
	}

	changeImageAndTagLine(bannerP, slides[nextImageIdex]);
});
