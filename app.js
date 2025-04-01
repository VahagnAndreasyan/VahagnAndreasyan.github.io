let search = document.querySelector("#search");
let button = document.querySelector("#button");
let block = document.querySelector("#block");
fetch("https://pixabay.com/api/?key=42186870-4b1da510e25fc0f5971177b39")
.then(response => response.json())
.then(result => {
  console.log(result);
  
  
  result.hits.map(hit => {
    let img = document.createElement("img");
    img.src = hit.webformatURL;
    block.appendChild(img);
    
  })
})

button.addEventListener("click", () => {
  
  block.innerHTML = null
  if(search.value){
    
    fetch(`https://pixabay.com/api/?key=42186870-4b1da510e25fc0f5971177b39&q=${search.value}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      result.hits.map(hit => {
        
        console.log(hit);
        let img2 = document.createElement("img")
        let like = document.createElement("p")
        like.innerHTML = `Likes ${hit.likes} `
        let comment = document.createElement("p")
        comment.innerHTML = `Comments ${hit.comments} `
        let views = document.createElement("p")
        views.innerHTML = `Views ${hit.views} `
        
        block.appendChild(like)
        block.appendChild(comment)
        block.appendChild(views)
        img2.style.width = "200px"
        img2.style.height = "200px"
        img2.style.display = "space-between"
        img2.style.position = "relative"
        img2.style.top = "30px"
        like.style.position = "relative"
        like.style.top = "30px"
        comment.style.position = "relative"
        comment.style.top = "30px"
        views.style.position = "relative"
        views.style.top = "30px"
        
        
        
        
        
        img2.src = hit.webformatURL;
        block.append(img2);
      })
    })
  }
})

