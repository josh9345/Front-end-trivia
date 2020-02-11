let ornstein = 'https://img-9gag-fun.9cache.com/photo/ayxQpop_700bwp.webp'
let artorias =  'https://res.cloudinary.com/cook-becker/image/fetch/q_auto:best,f_auto,w_1920,e_sharpen/https://candb.com/site/candb/images/artwork/Dark-Souls-Artorias-of-the-Abyss_Nekro-Bandai-1600.jpg'
let solaire = 'https://i.kym-cdn.com/photos/images/newsfeed/000/692/868/558.jpg' 
let siegmeyer = 'https://giantbomb1.cbsistatic.com/uploads/scale_small/12/120355/2283627-sig.jpg'

// let questions = [{
// 	question: "A Dragon Slayer loyal to lord Gwyn and one of his four knights, he and executioner Smough gaurd the ruined cathedral"
// 	answers: []
// 	correct: 

// }]

let a = document.querySelector('#first')
let b = document.querySelector('#second')
let c = document.querySelector('#third')
let d = document.querySelector('#fourth')
let picture = document.querySelectorAll('.picture')

a.setAttribute('src', ornstein)
b.setAttribute('src', artorias)
c.setAttribute('src', solaire)
d.setAttribute('src', siegmeyer)

for(let i=0; i<picture.length; i++){
	picture[i].addEventListener('click', function(){
		alert("hello")
	})
}