const API = 'https://msshohruh.github.io/menu-api/data.json'

const allBtn = document.querySelector("#all-btn")
const breakfastBtn = document.querySelector("#breakfast-btn")
const lunchBtn = document.querySelector("#lunch-btn")
const shakesBtn = document.querySelector("#shakes-btn")

const container = document.querySelector(".section-center")

let mainData

const fetchData = async(api)=>{
    try {
        const req = await fetch(api)
        const data = await req.json()
        mainData = data.menu
        return [...data.menu]
    } catch (error) {
        console.log(error.message)
    }
}
fetchData(API).then((data)=> {updateUI(data)})

function updateUI(riceps){
    container.innerHTML = ''
    riceps.forEach((ricep)=>{
        console.log(ricep)
        const { title, price, img, desc} = ricep
        const div = document.createElement('div')
        div.classList.add('menu-item')
        div.innerHTML = `
        <img
                            src=${img}
                            alt=${title}
                            class="photo"
                        />
                        <div class="item-info">
                            <header>
                                <h4>${title}</h4>
                                <h4 class="price">$${price}</h4>
                            </header>
                            <p class="item-text">
                                ${desc}
                            </p>
        `
        container.appendChild(div)
    })
}
allBtn.addEventListener('click', ()=> filterData('all'))
breakfastBtn.addEventListener('click',() => filterData('breakfast'))
lunchBtn.addEventListener('click', ()=> filterData('lunch'))
shakesBtn.addEventListener('click', ()=> filterData('shakes'))

function filterData(param){
    if(param == 'all'){
        updateUI(mainData)
    }else{
        const newDAta = mainData.filter((ricep)=>{
            return ricep.category == param
       })
       updateUI(newDAta)
    }
}
console.log(mainData)