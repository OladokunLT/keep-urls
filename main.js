const inputEl = document.getElementById('input-el')
const saveBtn = document.getElementById('save-input-btn') 
const ulEl = document.getElementById('ul-el')
const delBtn = document.getElementById('delete-btn')
const tabBtn = document.querySelector('#tab-btn')
const urlsFromLocalStorage = JSON.parse(localStorage.getItem('url'))
let urls = [];

// get tab url address
tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        urls.push(tabs[0].url);
        localStorage.setItem('url', JSON.stringify(urls))
        displayUserInput(urls)
    })
    
})

// collect user input
saveBtn.addEventListener('click', function(){
     urls.push(inputEl.value)
     inputEl.value = ''
     localStorage.setItem('url', JSON.stringify(urls))
    displayUserInput(urls)
})

// delete items from localStorage
delBtn.addEventListener('dblclick', function (){
    localStorage.clear()
    urls = []
    displayUserInput(urls)
})

// Render saved items
function displayUserInput (url){
 let listItems = ''
  for (let index = 0; index < urls.length; index++) {
    listItems += `
        <li>
            <a href='${url[index]}' target='_blank'> ${url[index]} </a> 
        </li>
    `
  }   
 ulEl.innerHTML = listItems
}

// check for null value
if (urlsFromLocalStorage){
    urls = urlsFromLocalStorage
    displayUserInput(urls)
}
