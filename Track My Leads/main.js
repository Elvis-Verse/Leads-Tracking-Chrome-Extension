let inputBtn = document.querySelector('#input-btn');
let inputEl = document.querySelector('#input-el');
let leadList = document.querySelector('.leadlist-el')
let body = document.querySelector('main');
let error = document.createElement('h2');
let delBtn = document.querySelector('#del-btn');
let tabBtn = document.querySelector('#tab-btn');

let saveLeads = [];



function clicker(leads) {
    
    let inputValue = inputEl.value;
    if (inputValue.trim() !== ''){
    leads.push(inputValue);
    leadList.innerHTML += `
    <li> ${leads[leads.length - 1]
    } </li>`;
    inputEl.value = '';
    addLocalStorage(leads);
    error.textContent = '';
     }
    else {
        errorMessage();
    };
}
function addLocalStorage (item) {
    let store = localStorage.setItem('myLeads', JSON.stringify(item));
}
function errorMessage() {
        error.textContent = "Empty! Kindly enter a lead";
        error.style.color = 'red';
        error.style.textAlign = 'center';
        error.style.margin = '2rem';
        error.style.fontSize = '1rem'
        body.prepend(error);
}

function deleter(arr) {
    let del = prompt('Click \t 1 to delete last added item \t 2 to delete all leads \t 3 to clear permanently:' )
    
    if (del.trim() == '1'){
        arr.pop()
        leadList.textContent = '';
        arr.forEach(lead => {
        leadList.innerHTML += `<li> ${lead} </li>` 
    });
   } 
    else if (del.trim() === "2") {
        arr.length = 0;
        leadList.textContent = '';
    } else if (del.trim() === '3')
    {
        arr.length = 0;
        leadList.textContent = '';
        localStorage.clear()
    }
    
}
function storeLeads () {
    const storeLeads = JSON.parse(localStorage.getItem('myLeads'));
    if (storeLeads){
        saveLeads = storeLeads;
        saveLeads.forEach(lead => {
            leadList.innerHTML += `<li> ${lead} </li>` 
    });
    }

}



// || BUTTONS

inputBtn.addEventListener('click', () => clicker(saveLeads));

delBtn.addEventListener('click', ()=> {
    deleter(saveLeads);
})
tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    saveLeads.push(tabs[0].url)
    addLocalStorage(saveLeads)
    leadList.innerHTML += `
    <li> ${saveLeads[saveLeads.length - 1]
    } </li>`
    })
});



storeLeads();





