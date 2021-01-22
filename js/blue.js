
//----------------------------------------Variables----------------------------------------
let bar = document.querySelector(".header__content")
let list = document.querySelector(".trending__content-list")
let cateBtn = document.querySelectorAll(".getMovie")
let body = document.querySelector("body")
let modal = document.querySelector(".modal")
let searchBtn = document.querySelector(".header__content-btn")
let input = document.querySelector(".header__content-input")

//---------------------------------------Default----------------------------------------
let counter = 0
cateBtn[0].classList.add('show')
let category = "tv"


//----------------------------------------Main Project----------------------------------------
let main = {
    init:function(){
        main.call("discover","tv")
        searchKey()
        menu()
        render()
    },
    url:"https://api.themoviedb.org/3",
    api:"131c3841b70be2908cf7a3fabcaa002e",
    img:"https://image.tmdb.org/t/p/w500",
    condition:"&page=" + randomPage(),
    call: function(type,plat){
        body.style.overflowY="hidden"
        modal.classList.add("show")
        let request = new XMLHttpRequest
        request.open("GET", this.url + "/" + type + "/" + plat + "?" + "api_key=" + this.api + this.condition ,true)
        request.onload = function(){
            setTimeout(()=>{
                if (this.status == 200 && this.readyState == 4) {
                    let output = ""
                    let getData = JSON.parse(this.responseText).results
                   if ( plat === "tv" ) {
                        for (let i in getData) {
                            if (getData[i].poster_path != null) {
                                output += `<div class="trending__content-detail">
                                <div class="circle"><span>${getData[i].vote_average}</span></div>
                                <img loading= "lazy" src="${main.img + getData[i].poster_path}" alt="">
                                <span class="title">${getData[i].name}</span>
                                <span>${getData[i].first_air_date}</span>
                            </div>`
                            }
                        }
                   } else if ( plat === "movie" ) { 
                        for (let i in getData) {
                            if (getData[i].poster_path != null) {
                                output += `<div class="trending__content-detail">
                                <div class="circle"><span>${getData[i].vote_average}</span></div>
                                <img loading= "lazy" src="${main.img + getData[i].poster_path}" alt="">
                                <span class="title">${getData[i].title}</span>
                                <span>${getData[i].release_date}</span>
                            </div>`
                            }
                        }
                   }
                   list.innerHTML = output
                   let clicked = document.querySelectorAll(".trending__content-detail")
                   clicked.forEach((info,i)=>{
                       info.addEventListener("click",()=>{
                            getData[i].id
                       })
                   })
                }
                else{
                    throw new Error("Not connected")
                }
                body.style.overflowY="visible"
                modal.classList.remove("show") 
            },1000)
            
        }
        request.send()

    },
    search:function(text){
        body.style.overflowY="hidden"
        modal.classList.add("show")
        let request = new XMLHttpRequest
        request.open("GET","https://api.themoviedb.org/3/search/"+ category +"?api_key=131c3841b70be2908cf7a3fabcaa002e&query=" + text  ,true)
        request.onload = function(){
            setTimeout(()=>{
                if (this.status == 200 & this.readyState == 4) {
                    let output=""
                    let getData = JSON.parse(this.responseText).results
                    if (category === "movie") {
                        for (let i in getData){
                            if (getData[i].poster_path != null) {
                                output += `<div class="trending__content-detail">
                                <div class="circle"><span>${getData[i].vote_average}</span></div>
                                <img loading= "lazy" src="${main.img + getData[i].poster_path}" alt="">
                                <span class="title">${getData[i].title}</span>
                                <span>${getData[i].release_date}</span>
                            </div>`
                            }
                        }
                    }
                    else if(category === "tv"){
                        for (let i in getData) {
                            if (getData[i].poster_path != null) {
                                output += `<div class="trending__content-detail">
                                <div class="circle"><span>${getData[i].vote_average}</span></div>
                                <img loading= "lazy" src="${main.img + getData[i].poster_path}" alt="">
                                <span class="title">${getData[i].name}</span>
                                <span>${getData[i].first_air_date}</span>
                            </div>`
                            }
                        }
                    }
            list.innerHTML = output
            }
            else{
                throw new Error("Not connected")
            }
            body.style.overflowY="visible"
            modal.classList.remove("show") 
            },1000)
        }
        request.send()
    }
}

//----------------------------------------Project Functions----------------------------------------

function searchKey() {
    searchBtn.addEventListener("click",()=>{
        if (input.value === null || input.value.trim() ===" ") {
            return 
        }
        main.search(input.value)
        return input.value = ""
    })
}
 
function randomPage() {
    let number
    for (let i = 1; i <= 51; i++) {
        number = Math.random()*i
        }
        if (number < 1) {
            return number = 1
        }
        else{
            return Math.round(number)
        }
    }

function menu(){
    window.addEventListener("scroll",()=>{
        if (scrollY > 0) {
            bar.classList.add("show")
        }else{
            bar.classList.remove("show")
        }
    })
}

function render(){
   cateBtn.forEach((btn,i)=>{
       btn.addEventListener("click",(e)=>{
        e.preventDefault()
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
        cateBtn.forEach(remove=>{
            remove.classList.remove("show")
        })
        btn.classList.add("show")
        counter = i
        switch (counter) {
            case 0:
                main.call("discover","tv")
                category = "tv"
                break;
            case 1:
                main.call("discover","movie")
                category = "movie"
                break;
        }
       })
   })
}


main.init()

