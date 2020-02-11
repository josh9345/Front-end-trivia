let answers = []

let a = document.querySelector('#first')
let b = document.querySelector('#second')
let c = document.querySelector('#third')
let d = document.querySelector('#fourth')
let picture = document.querySelectorAll('.picture')

a.setAttribute('src', 'https://cosmos-images2.imgix.net/file/spina/photo/18032/190218-mount-full.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=1600')
b.setAttribute('src', 'https://cosmos-images2.imgix.net/file/spina/photo/18032/190218-mount-full.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=1600')
c.setAttribute('src', 'https://cosmos-images2.imgix.net/file/spina/photo/18032/190218-mount-full.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=1600')
d.setAttribute('src', 'https://cosmos-images2.imgix.net/file/spina/photo/18032/190218-mount-full.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=1600')

for(let i=0; i<picture.length; i++){
	picture[i].addEventListener('click', function(){
		alert("hello")
	})
}