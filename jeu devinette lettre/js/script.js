;fetch('liste.txt').then(Response => Response.text()).then( data => {

let wordlist = data.split('\n');
let random = Math.floor(Math.random()*wordlist.length);
let word = wordlist[random];


console.log(word);

let wordLength =  word.length;

let hiddenword = ''

for (let i = 0; i < wordLength; i++) {
 hiddenword += '-'
    
} ;

document.querySelector('.word').innerHTML = hiddenword;

let gessInput = document.querySelector('.gess');
let submit = document.querySelector('.submit');
let start = document.querySelector('.start');
let message = document.querySelector('.message');





submit.onclick  =  () => {
   let gess = gessInput.value
   let tab = ['Veuillez entrer une lettre svp.', 'Mauvaise lettre', 'Bravo','Bonne lettre']
   let texte = ''
   function alerte(text) {
    message.innerHTML = text
    message.style.display = 'block'
    setTimeout(() => {
        message.style.display = 'none'
    }, 2000)
   }

   if ( gess.length > 1 || gess.length === 0) {
    texte = tab[0] 
    alerte(texte)
    }
 
     if ( word.indexOf(gess) === -1) {
        
        texte = tab[1]
        alerte(texte)
    } else {
        for (let i = 0; i < word.length; i++) {
        if ( word[i] == gess) {
            hiddenword = hiddenword.substring(0, i)  + gess +   hiddenword.substring(i+1)
        }
            
        }


        document.querySelector('.word').innerHTML = hiddenword
    
       if (word === hiddenword) {
        texte = tab[2]
         alerte(texte)
         gessInput.style.display = 'none'
         submit.style.display = 'none'
         start.style.display = 'block'
       }else {
        texte = tab[3]
        alerte(texte)
       }
    
    
    }

    gessInput.value = ''





}


})