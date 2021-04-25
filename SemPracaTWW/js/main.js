// select the button using ID
var search = document.querySelector('#searchBtn');
var userInput = document.querySelector('#userInput');
var loadingDiv = document.querySelector('#loading');
var body = document.getElementsByTagName("body");
var del = document.querySelector('.btn-danger');
//getting the length of localstorage and then setting new IDs
var historyLength = localStorage.length;

newID = historyLength+1;
newTimeID = historyLength+2;
function TimeElapsed(time){
    var currentTime = new Date()
    var elapsedTime = currentTime.getTime() - time;
    var seconds = elapsedTime/1000;
    console.log(seconds);
    switch(true){
        case seconds<=5: 
            return "Just now";
        case seconds<=60:
            return "< 1 Minute ago";
        case seconds<=300:
            return "< 5 Minutes ago";
        case seconds<=1800:
            return "< 30 Minutes ago";
        case seconds <=3600:
            return "< 1 Hour ago";
        case seconds <=21600:
            return "< 6 Hours ago";
        case seconds <=86400:
            return "Today";
        default:
            return "> 1 Day ago";
    }
}

//display all existing data
function LoadTable(){ 
    var table = document.getElementById('myTable');
    var tbodyRef = document.getElementsByClassName('tbody')[0];      
   
    for(var i = 1; i<= historyLength;i++){
        console.log(i);
        if(i%2!=0){    
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode(localStorage.getItem(i));
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        else{
            var cell = document.createElement("td");
            var cellText = document.createTextNode(TimeElapsed(localStorage.getItem(i)));
            cell.appendChild(cellText);
            row.appendChild(cell);
            tbodyRef.prepend(row);
            table.prepend(tbodyRef);
        }     
    }
}

function LoadLastSearched(){
    var table = document.getElementById('countryTable');
    var tbodyRef = document.getElementsByClassName('tbody')[0];
    
    for(var i = 1; i<= historyLength;i++){
        console.log(i);
        if(i%2!=0){    
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var cellText = document.createTextNode();
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        else{
            var cell = document.createElement("td");
            var cellText = document.createTextNode();
            cell.appendChild(cellText);
            row.appendChild(cell);
            tbodyRef.prepend(row);
            table.prepend(tbodyRef);
        }     
    }
}


async function GetData(countryName){
    // REST API url endpoint
    var api_url = 'https://restcountries.eu/rest/v2/name/'+ countryName;
    console.log.api_url;
    const response = await fetch(api_url)
    const data = await response.json();
    return data[0].population;
    
    //add to array thet will be returned, then process and display the data
    //const {name, population, currency, region, capital, flag} = data[0];
    // hide the loading dialog
    
}

function AddToDataTable(data){
    console.log(data);
    // let keyArray = Object.keys(data[0]); 
    // console.log(keyArray.population);
    // // keyArray = ['a','b','c']
    // let valuesArray = Object.values(data[0]);
    // valuesArray = ['kitten', 'puppy', 'lion'];
}

function AddToHistory(countryName){
    var time = new Date();
    //creating new records to localstorage
    localStorage.setItem(newID,countryName);
    localStorage.setItem(newTimeID, time.getTime());
    loadingDiv.style.display = 'none';
    // enable translate button
    var table = document.getElementById('myTable');
    var tbodyRef = document.getElementsByClassName('tbody')[0];
    // Insert a row at the end of table
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode(localStorage.getItem(newID));
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode(TimeElapsed(localStorage.getItem(newTimeID)));
    cell.appendChild(cellText);
    row.appendChild(cell);
    tbodyRef.prepend(row);
    table.prepend(tbodyRef);
}

del.onclick = function(){
    localStorage.clear();
    window.location.reload();
}
search.onclick = function () {
    var inputText = userInput.value;
    if(inputText == ""){
        alert("Empty");
    }else{
        AddToHistory(inputText);
        AddToDataTable(GetData(inputText));
    }   
}