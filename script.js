let rezultat = 0

const kviz = {
    "odgovor1" : "a",
    "odgovor2" : "b",
    "odgovor3" : "b",
    "odgovor4" : "b",
    "odgovor5" : "b",
    "odgovor6" : "b",
    "odgovor7" : "b",
    "odgovor8" : "b",
    "odgovor9" : "b",
    "odgovor10" : "b",

}

function getAllAnswers() {
    for (const key in kviz) {
        getValue(key)
    }
    seeResult()
}

function getValue(odgovor){
    let ele = document.getElementsByName(odgovor)
    let tacanOdgovor
    console.log(ele)
    for(let j = 0; j < ele.length; j++){
        if(ele[j].value === kviz[odgovor]){
            tacanOdgovor = ele[j].parentNode;

        }
    }
    for(let i = 0; i < ele.length; i++){
        if (ele[i].checked) {
            console.log(ele[i].value);
            if(ele[i].value === kviz[odgovor]) {
                console.log('tacan odgovor')
                let parent = ele[i].parentNode;
                parent.style.border = '5px solid green'
               
                rezultat++
            } else{
                let parent = ele[i].parentNode;
                parent.style.border = '5px solid red'
                tacanOdgovor.style.border = '5px solid green'
                
               
            }      
        }    
    }
}

function seeResult (){
    let score = document.getElementById('score');
    let paragraf = document.createElement('p');
    paragraf.innerHTML = 'Osvojili ste ' + rezultat  + ' poena';
    score.append(paragraf);

}





    