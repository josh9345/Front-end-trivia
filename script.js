let ornstein = 'https://img-9gag-fun.9cache.com/photo/ayxQpop_700bwp.webp'
let artorias =  'https://res.cloudinary.com/cook-becker/image/fetch/q_auto:best,f_auto,w_1920,e_sharpen/https://candb.com/site/candb/images/artwork/Dark-Souls-Artorias-of-the-Abyss_Nekro-Bandai-1600.jpg'
let solaire = 'https://i.kym-cdn.com/photos/images/newsfeed/000/692/868/558.jpg' 
let siegmeyer = 'https://giantbomb1.cbsistatic.com/uploads/scale_small/12/120355/2283627-sig.jpg'
let seath = 'https://i1.sndcdn.com/artworks-000552370749-mdfohk-t500x500.jpg'
let mirrorKnight = 'https://66.media.tumblr.com/468694ded87230e73d756e7dd9788832/tumblr_nh36kbZ6q61skceqmo1_500.jpg' 
let midir = 'https://vignette.wikia.nocookie.net/darksouls/images/6/6c/Midir_rises_%282%29.jpg/revision/latest?cb=20170404185337'
let yhorm = 'https://bbts1.azureedge.net/images/p/full/2019/10/43f823e0-dde6-4180-b3c8-237159cf36b0.jpg'
let nameless = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bbb2559b-70e8-45e9-8491-e19a0b3eddf6/da01hod-8172a926-bd6a-4c11-a519-775bdb2b7594.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JiYjI1NTliLTcwZTgtNDVlOS04NDkxLWUxOWEwYjNlZGRmNlwvZGEwMWhvZC04MTcyYTkyNi1iZDZhLTRjMTEtYTUxOS03NzViZGIyYjc1OTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fQIQ4l3x89mITNo1AJ1altzCT9QLdO61btij6snygwQ'
// let gael = ''
// let lorian = ''
// let crystalSage = ''
// let capraDemon = ''
// let taurusDemon = ''
// let asylum demon = ''

let questions = {
	question: "A Dragon Slayer loyal to lord Gwyn and one of his four knights, he and executioner Smough gaurd the ruined cathedral"
}

let a = document.querySelector('#first')
let b = document.querySelector('#second')
let c = document.querySelector('#third')
let d = document.querySelector('#fourth')
let picture = document.querySelectorAll('.picture')
let button = document.querySelector('.overlayButton')
let question = document.querySelector('.question').innerText = questions.question;
// let sound = document.querySelector('.audio')

a.setAttribute('src', nameless)
b.setAttribute('src', mirrorKnight)
c.setAttribute('src', midir)
d.setAttribute('src', yhorm)


for(let i=0; i<picture.length; i++){
	picture[i].addEventListener('click', function(){
		alert("hello")
	})
}
button.addEventListener('click', function(){
	document.querySelector('.overlay').style.left = "-100%"
	document.querySelector('.overlay').style.opacity = "0"
	document.querySelector('.audio').play();
})

