// select the button using ID
var search = document.querySelector('#searchBtn');
var userInput = document.querySelector('#userInput');
var loadingDiv = document.querySelector('#loading');
var errorDiv = document.querySelector('#error');
var body = document.getElementsByTagName("body");
var del = document.querySelector('.btn-danger');

//how ago was the search made
function TimeElapsed(time){
    var currentTime = new Date()
    var elapsedTime = currentTime.getTime() - time;
    var seconds = elapsedTime/1000;
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
            return "< 24 Hours ago";
        default:
            return "> 1 Day ago";
    }
}

//display all existing data
function LoadTable(){ 
    var table = document.getElementById('myTable');
    var tbodyRef = document.getElementsByClassName('tbody')[0];      
   
    for(var i = 1; i<= localStorage.length;i++){
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

//vyformatovat stranku a data

async function GetData(countryName){
    if(countryName == undefined){
        countryName = localStorage.getItem(localStorage.length-1);
        if(countryName == undefined){
            return;
        }
    }   
    try {
        var api_url = 'https://restcountries.eu/rest/v2/name/'+ countryName;
        const response = await fetch(api_url)
        const data = await response.json();
        var tableHead = document.getElementById("cn");
        tableHead.appendChild(document.createTextNode(data[0].name));

        let keyArray = Object.keys(data[0]); 
        let valuesArray = Object.values(data[0]);
        var dataArray = new Array();
        var i = -1;

        while ( keyArray[++i] ) { 
            if(typeof valuesArray[i] !== "object"){
                console.log("not object: "+ valuesArray[i]);
                dataArray.push( [ keyArray[i], valuesArray[i] ] );
            }
            else{
                console.log("object: "+ valuesArray[i].length + valuesArray[i]); //handling object variables
            }
        }
        var table = document.getElementById('countryTable');
        var tbody = document.getElementById('tbodyCountry');  
    
        for(var i = 0; i < keyArray.length; i++){
            var row = document.createElement("tr");
            for(var j = 0; j< 2;j++){          
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(dataArray[i][j]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);       
            }
            tbody.append(row);
            table.prepend(tbody);  
        }
    } catch {

        return;
    }  
}

function AddToHistory(countryName){
    newID = localStorage.length+1;
    newTimeID = localStorage.length+2;
    var time = new Date();
    //creating new records to localstorage
    localStorage.setItem(newID,countryName);
    localStorage.setItem(newTimeID, time.getTime());
    // enable translate button
    var table = document.getElementById('myTable');
    var tbodyRef = document.getElementsByClassName('tbody')[0];

    // Insert a row at the end of table
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode(localStorage.getItem(newID));
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell = document.createElement("td");
    cellText = document.createTextNode(TimeElapsed(localStorage.getItem(newTimeID)));
    cell.appendChild(cellText);
    row.appendChild(cell);
    tbodyRef.prepend(row);
    table.prepend(tbodyRef);
    loadingDiv.style.display = "none";
}

del.onclick = function(){
    localStorage.clear();
    window.location.reload();
}
search.onclick = function () {
    var inputText = userInput.value;
    if(inputText != ""){
        if(inputText != localStorage.getItem(localStorage.length-1)){
            document.getElementById('cn').innerHTML = '';
            document.getElementById('tbodyCountry').innerHTML = '';
            loadingDiv.style.display = "inline";
            GetData(inputText);
            AddToHistory(inputText);  
            errorDiv.style.display = "none";
        }
        else{
            errorDiv.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Already displayed!</div>";
            errorDiv.style.display = "inline-block";
        }      
    }    
    else{
        errorDiv.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Please enter the name!</div>";
        errorDiv.style.display = "inline-block";
    }
}