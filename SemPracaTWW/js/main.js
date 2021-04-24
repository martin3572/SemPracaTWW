// select the button using ID
var search = document.querySelector('#searchBtn');
var userInput = document.querySelector('#userInput');
var loadingDiv = document.querySelector('#loading');
var body = document.getElementsByTagName("body");
var del = document.querySelector('.btn-danger');
//getting the length of localstorage and then setting new IDs
var historyLength = localStorage.length;
newOrigID = historyLength+1;
newTransID = historyLength+2;

var rowCompleted = 0;
//display all existing data
function loadTable(){ 
    var table = document.getElementById('myTable');
    var tbodyRef = document.getElementById('tbody')[0];
    for(var i = 1; i<= historyLength;i++){
        console.log(i);
        if(i%2!=0){    
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode(localStorage.getItem(i));
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
    }
};

del.onclick = function(){
    localStorage.clear();
    window.location.reload();
}
search.onclick = function () {
    console.log(userInput.value);
    var inputText = userInput.value;
    GetData(inputText);
    // REST API url endpoint
    
}
async function GetData(countryName){
    var api_url = 'https://restcountries.eu/rest/v2/name/'+ countryName;
    console.log.api_url;
    const response = await fetch(api_url)
    const data = await response.json();
    console.log(data);
    const {name, population, currency} = data[0];
    var text = document.createTextNode(population);
    var body = document.getElementById("tbody");
    body.appendChild(text);
    //creating new records to localstorage
    localStorage.setItem(newOrigID,countryName);
    // hide the loading dialog
    loadingDiv.style.display = 'none';

    // enable translate button
    //button.removeAttribute('disabled');
    var table = document.getElementsByClassName('myTable');
    var tbodyRef = document.getElementsByClassName('tbody')[0];

    // Insert a row at the end of table
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode(localStorage.getItem(newOrigID));
    cell.appendChild(cellText);
    row.appendChild(cell);
    tbodyRef.prepend(row);
    table.prepend(tbodyRef);
    loadingDiv.style.display = 'invisible';
}