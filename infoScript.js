//Fetch html

const newTab = document.getElementById('new')
const tdTab = document.getElementById('to-do')


function revealer(arg){
    if (arg === 'new'){
        newTab.classList.remove('hidden')
        tdTab.classList.add('hidden')
        console.log('passed')
    }
    else{
        tdTab.classList.remove('hidden')
        newTab.classList.add('hidden')
    }
}