//fetching from html
// alert('Game not finished yet, your current objective is to break it, because thats how unfinished it is')
const numberDisplay = document.getElementById('numberDisplay');
const infoWrapper = document.getElementById('infoWrapper');
const buttonsWrapper = document.getElementById('buttons-wrapper');
const error = document.getElementById('nuh-uh');
const level = document.getElementById('levelUp');
const mpsDisplay = document.getElementById('mps')

// money
const worker = document.getElementById('worker');
const office = document.getElementById('office');
const building = document.getElementById('building');
const company = document.getElementById('company');
const town = document.getElementById('town');

//core variables
let number = 0;
let clickPow = 1;
let clicks = 0;
let mps = 0;
let tracker;

//prices
let lvlPrice = 100;
let workerPrice = 400;
let officePrice = 1500;
let buildingPrice = 50000;
let companyPrice = 100000;
let townPrice = 10000000;


//levels
let workerLevel = 0;
let officeLevel = 0;
let buildingLevel = 0;
let companyLevel = 0;
let townLevel = 0;

//power

let workerPower = 0;
let officePower = 0;
let buildingPower = 0;
let companyPower = 0;
let townPower = 0;

//sliced
let numberSliced;
let levelPriceSliced = formatPrice(lvlPrice)
let workerPriceSliced = formatPrice(workerPrice)
let officePriceSliced = formatPrice(officePrice)
let buildingPriceSliced = formatPrice(buildingPrice)
let companyPriceSliced = formatPrice(companyPrice)
let townPriceSliced = formatPrice(townPrice)

console.log(localStorage)
error.style.display = 'none';
level.textContent = 'level up!  $'+lvlPrice;
numberDisplay.textContent = `$${number}`;

let numberHandler = {
    set(target, property, value){
        target[property] = value;
        revealItems()
        return true
    }
}

let numberProxy = new Proxy({value: number}, numberHandler)

function formatPrice(price){
    let sliced;
    let exact = price.toString().charAt(1)
    
    const suffixes = [
        { limit: 1_000, divisor: 1, suffix: '' },
        { limit: 10_000, divisor: 1_000, suffix: `.${exact}K` },
        { limit: 1_000_000, divisor: 1_000, suffix: `.${exact}K` },
        { limit: 10_000_000, divisor: 1_000_000, suffix: `.${exact}M` },
        { limit: 1_000_000_000, divisor: 1_000_000, suffix: `.${exact}M` },
        { limit: 10_000_000_000, divisor: 1_000_000_000, suffix: `.${exact}B` },
        { limit: 1_000_000_000_000, divisor: 1_000_000_000, suffix: `.${exact}B`  },
        { limit: 10_000_000_000_000, divisor: 1_000_000_000_000, suffix: `.${exact}T` },
        { limit: 1_000_000_000_000_000, divisor: 1_000_000_000_000, suffix: `.${exact}T` },
        { limit: 10_000_000_000_000_000, divisor: 1_000_000_000_000_000, suffix: `.${exact}Qa` },
        { limit: 1_000_000_000_000_000_000, divisor: 1_000_000_000_000_000, suffix: `.${exact}Qa` },
        { limit: 10_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000, suffix: `.${exact}Qi` },
        { limit: 1_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000, suffix: `.${exact}Qi` },
        { limit: 10_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000, suffix: `Sx` },
        { limit: 1_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000, suffix: `Sx` },
        { limit: 10_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000, suffix: `Sp` },
        { limit: 1_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000, suffix: `Sp` },
        { limit: 10_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000, suffix: `.Oc` },
        { limit: 1_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000, suffix: `.Oc` },
        { limit: 10_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000, suffix: `No` },
        { limit: 1_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000, suffix: `No` },
        { limit: 10_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000, suffix: `Dc` },
        { limit: 1_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000, suffix: `Dc` },
        { limit: 10_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Ud` },
        { limit: 1_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Ud`},
        { limit: 10_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Dd` },
        { limit: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix:`Dd` },
        { limit: 10_000_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Td` },
        { limit: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Td` },
        { limit: 10_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Qad`},
        { limit: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Qad` },
        { limit: 10_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: `Qid` },
        { limit: Number.MAX_SAFE_INTEGER, divisor: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000, suffix: 'Qid' }
    ];
    for(let {limit, divisor, suffix} of suffixes){
        if(price < limit){
            sliced = Math.floor(price / divisor).toString()
            return sliced + suffix
        }
    }
    console.log('shits above')
    return 'limit reached chief';
}



function increaseNum(){
    clicks++;

    document.getElementById('clicked').textContent = `total clicks: ${clicks}`;
    document.getElementById('power').textContent = `click power: $${clickPow}`;
    numberSliced = formatPrice(numberProxy.value)

    numberProxy.value += clickPow;
    numberDisplay.textContent = `$${numberSliced}`;
    error.style.display = 'none';
}

function revealItems(){
    // update constantly 
    level.textContent = 'level up!  $'+levelPriceSliced
    worker.textContent = `hire worker $${workerPriceSliced}`
    office.textContent = `buy office $${officePriceSliced}`
    building.textContent = `buy a building $${buildingPriceSliced}`
    company.textContent = `buy a company $${companyPriceSliced}`
    town.textContent = `buy a town $${townPriceSliced}`

    //other variables
    mpsDisplay.textContent = `money earned per second: ${tracker}` 
    numberSliced = formatPrice(numberProxy.value)

    //reveal items
    if(numberProxy.value >= 100){
        buttonsWrapper.style.display = 'flex'
    }
    if(numberProxy.value >= 200){
        infoWrapper.style.display = 'flex'
    }
    if(numberProxy.value >= 250){
        worker.classList.remove('hidden')
        if (workerPrice >= 1000){
            worker.textContent = `hire worker $${workerPriceSliced}`
            worker.classList.remove('hidden')
        }
        else{
            worker.textContent = `hire worker $${workerPrice}`
            worker.classList.remove('hidden')
        }

    }
    if(numberProxy.value >= 1000){
        office.classList.remove('hidden')
    
        office.textContent = `buy office $${officePriceSliced}`
        
    }
    if(numberProxy.value >= 20000){
        building.textContent = `buy a building $${buildingPriceSliced}`
        building.classList.remove('hidden')
    }
    if(numberProxy.value >= 70000){
        company.textContent = `buy a company $${companyPriceSliced}`
        company.classList.remove('hidden')
    }
    if(numberProxy.value >= 300000){
        town.textContent = `buy a town $${townPriceSliced}`
        town.classList.remove('hidden')
    }

    tracker = mps + workerPower + officePower + buildingPower + townPower;
}

function levelUp(){
    if (numberProxy.value < lvlPrice){
        error.textContent = 'Not enough gooner coin'
        error.style.display = 'block'
        console.error('funciona!!!')
    }
    else{
        clickPow *= 2
        numberProxy.value -= lvlPrice
        numberDisplay.textContent = `$${numberSliced}`

        lvlPrice *= 3
        levelPriceSliced = formatPrice(lvlPrice)
        level.textContent = 'level up!  $'+levelPriceSliced

        document.getElementById('power').textContent = `click power: $${clickPow}`
    }
}



worker.addEventListener('click', () => {

    if(numberProxy.value >= workerPrice){
        
        workerLevel++;
        numberProxy.value -= workerPrice;
        if (workerLevel => 10 && workerLevel < 20){
            workerPrice *= 3
        }
        else if (workerLevel > 20){
            workerPrice *= 5
        }
        else{workerPrice *= 2;}

        if(workerLevel === 1){
            workerPower = 1
        }
        else{
            workerPower *=2
        }
        workerPriceSliced = formatPrice(workerPrice)
    
        setInterval(() =>{
            numberProxy.value += workerPower;
            numberDisplay.textContent = `$${numberSliced}`
        }, 1000)
        tracker = mps + workerPower + officePower + buildingPower + townPower;
    }
    else{
        error.textContent = 'Not enough gooner coin'
        error.style.display = 'block'
    }
    console.log(workerPriceSliced)
    console.log(typeof(workerPriceSliced))
})
office.addEventListener('click', () => {
    if(numberProxy.value >= officePrice){

        officeLevel++;
        numberProxy.value -= officePrice;

        if (officeLevel >= 3 && officeLevel < 10){
            officePrice *= 3;
        }
        else if (officeLevel > 10){
            officePrice *= 6;
        }
        else {
            officePrice *= 2;
        }

        if (officeLevel === 1){
            officePower = 10;
        }
        else {
            officePower *= 2;
        }

        officePriceSliced = formatPrice(officePrice)

        setInterval(() =>{
            numberProxy.value += officePower;
            numberDisplay.textContent = `$${numberSliced}`
        }, 1000)
        tracker = mps + workerPower + officePower + buildingPower + townPower;

    }
    else{
        error.textContent = 'Not enough gooner coin'
        error.style.display = 'block'
    }
})

building.addEventListener('click', () => {
    if(numberProxy.value >= buildingPrice){
        buildingLevel++;
        if(buildingLevel === 1){
            buildingPower = 100
        }
        else{
            buildingPower *=2
        }
        numberProxy.value -= buildingPrice;
        buildingPrice *= 2;
        buildingPriceSliced = formatPrice(buildingPrice)
        

       
        setInterval(() =>{
            numberProxy.value += buildingPower;
            numberDisplay.textContent = `$${numberSliced}`;
        }, 1000);
        tracker = mps + workerPower + officePower + buildingPower + townPower;

    }
    else{
        error.textContent = 'Not enough gooner coin';
        error.style.display = 'block';
    }
})
company.addEventListener('click', () => {
    if(numberProxy.value >= companyPrice){
        companyLevel++;
        if(companyLevel === 1){
            companyPower = 1000;
        }
        else{
            companyPower *= 2;
        }
        numberProxy.value -= companyPrice;
        companyPrice *= 2;

        companyPriceSliced = formatPrice(companyPrice)

        setInterval(() => {
            numberProxy.value += companyPower;
            numberDisplay.textContent = `$${numberSliced}`;
        }, 1000);
        tracker = mps + workerPower + officePower + buildingPower + townPower;

    }
    else{
        error.textContent = 'Not enough gooner coin';
        error.style.display = 'block';
    }
});

town.addEventListener('click', () => {
    if(numberProxy.value >= townPrice){
        townLevel++;
        if(townLevel === 1){
            townPower = 10000;
        }
        else{
            townPower *= 2;
        }
        numberProxy.value -= townPrice;
        townPrice *= 2;
        townPriceSliced = formatPrice(townPrice)
        setInterval(() => {
            numberProxy.value += townPower;
            numberDisplay.textContent = `$${numberSliced}`;
        }, 1000);
        tracker = mps + workerPower + officePower + buildingPower + townPower;

    }
    else{
        error.textContent = 'Not enough gooner coin';
        error.style.display = 'block';
    }
});

level.addEventListener('hover', () =>{
    level.textContent = `level up!  $${lvlPrice} </br> level 2`

})
