let classes = Array.from(document.getElementsByClassName("div"))
let res = document.getElementById("res")
let count = 0
let gameActive = true
let turn = "X"
let spanik = document.getElementById("span")
classes.map(function(val){
val.addEventListener("click",function(event){
if(count === 0 && gameActive && !event.target.innerText){
    count = 1
    event.target.innerText = "X"
    turn = "X"
    spanik.innerHTML = `${"O`s " + " turn"}`

    
}else if(count === 1 && !event.target.innerText){
    count = 0
    event.target.innerText = "O"
    turn = "O"
    spanik.innerHTML = `${"X`s " + " turn"}`
    
}


if(classes[0].innerText && classes[0].innerText === classes[1].innerText && classes[2].innerText === classes[0].innerText){
    classes[0].innerText = "♛"
    classes[1].innerText = "♛"
    classes[2].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
}else if(classes[0].innerText && classes[0].innerText === classes[3].innerText && classes[0].innerText === classes[6].innerText){
    classes[0].innerText = "♛"
    classes[3].innerText = "♛"
    classes[6].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
}else if(classes[3].innerText && classes[3].innerText === classes[4].innerText && classes[3].innerText === classes[5].innerText){
    classes[3].innerText = "♛"
    classes[4].innerText = "♛"
    classes[5].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
}else if(classes[2].innerText && classes[2].innerText === classes[5].innerText && classes[2].innerText === classes[8].innerText){
    classes[2].innerText = "♛"
    classes[5].innerText = "♛"
    classes[8].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
}else if(classes[6].innerText && classes[6].innerText === classes[7].innerText && classes[6].innerText === classes[8].innerText){
    classes[6].innerText = "♛"
    classes[7].innerText = "♛"
    classes[8].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
    
}else if(classes[2].innerText && classes[2].innerText === classes[4].innerText && classes[2].innerText === classes[6].innerText){
    classes[2].innerText = "♛"
    classes[4].innerText = "♛"
    classes[6].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
    
}else if(classes[0].innerText && classes[0].innerText === classes[4].innerText && classes[4].innerText === classes[8].innerText){
    classes[0].innerText = "♛"
    classes[4].innerText = "♛"
    classes[8].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
    
}else if(classes[1].innerText && classes[1].innerText === classes[4].innerText && classes[4].innerText === classes[7].innerText){
    classes[1].innerText = "♛"
    classes[4].innerText = "♛"
    classes[7].innerText = "♛"
    spanik.innerText = `${turn + " win"}`
    
   
    
    
   

}

if(classes[0].innerText && classes[1].innerText && classes[2].innerText && classes[3].innerText && classes[4].innerText && 
    classes[5].innerText && classes[6].innerText && classes[7].innerText && classes[8].innerText ){
        spanik.innerText = "It`s tie"
    }

    
    

function reset(){
    classes[0].innerText = ""
    classes[1].innerText = ""
    classes[2].innerText = ""
    classes[3].innerText = ""
    classes[5].innerText = ""
    classes[6].innerText = ""
    classes[4].innerText = ""
    classes[7].innerText = ""
    classes[8].innerText = ""
    spanik.innerText = ""
    
}




res.addEventListener("click",function(){

    reset()
})
})
})
