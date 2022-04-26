/* JS for Final Project Part C
RENTALS
Heshan Punchihewa
2022-04-20 */

//global vars for all methods
var xmlobj = new XMLHttpRequest();
var data;
var address;
var state_prov;
var email;
var phone;
var first_name;
var last_name;
//loads function to make selection


window.onload=loadfuncs;
function loadfuncs(){
    schoolsFunction();
    getDateFooter();
}

function schoolsFunction(){
    
    //console.log("schoolsFunction() ")
    //load xml
    document.getElementById("searchName").addEventListener("keyup", function (){searchByName(this.value);},false);
    
    xmlobj.onreadystatechange = function(){
        //console.log("xml loading" + xmlobj.status)
        
        if (xmlobj.readyState == 4 && xmlobj.status == 200) {
            data = JSON.parse(xmlobj.responseText);
            
        }
    };
    
    xmlobj.open("GET", "rentalclients.json", true);
    xmlobj.send();
}

function searchByName(userSearch){
    //console.log("searchByName" + userSearch);
    
    
    let searchName = '';
    let output =  '';
    
    for(let i = 0; i <data.length; i++){
        let subData = data[i];
        searchName = subData.last_name.toString().toLowerCase();
        userSearch = userSearch.toLowerCase();
        
        if(searchName.startsWith(userSearch)){
            first_name = subData.first_name.toString();
            last_name= subData.last_name.toString();
            output += `<option value="${last_name}">${first_name} ${last_name}</option>`;
        }
        
    }
    
    //output format as table
    document.getElementById("customerList").innerHTML=output;
    
    //document.getElementById("searchResults").style.display = "block";
    
}


function showInfoFields(){
    var userSelection = document.getElementById("customerList").value;
    console.log("showInfoFields " + userSelection);
    
    
    for(let i = 0; i <data.length; i++){
        let subData = data[i];
        var searchName = subData.last_name.toString().toLowerCase();
        userSelection = userSelection.toLowerCase();
        
        if(searchName.startsWith(userSelection)){
            first_name = subData.first_name.toString();
            last_name= subData.last_name.toString();
            address= subData.address.toString();
            state_prov= subData.state_prov.toString();
            email= subData.email.toString();
            phone= subData.phone.toString();
        }
        
        
    }
    //console.log("pass to fields  " + first_name + last_name);
    
    //fills the form
    document.getElementById("firstName").value=first_name;
    document.getElementById("lastName").value=last_name;
    document.getElementById("address").value=address;
    document.getElementById("prov").value=state_prov;
    document.getElementById("email").value=email;
    document.getElementById("phone").value=phone;
    
    
    //enables all fields
    var inputs=document.getElementsByTagName('input');
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled=false;
    }
}


function showSummary(){
    var cost = 0;
    var output = '';
    
    var rentalVeh = document.querySelector('input[name="carSelection"]:checked').value;
    console.log('rental selected: ' + rentalVeh);
    
    
    
    var days = 0;
    days = document.getElementById("rentalDuration").value;
    console.log('showSummary: ' + first_name);
    
    output += `<tr> <td>${first_name} ${last_name}</td> </tr>
    <tr> <td>${address}</tr> 
    <tr><td>${state_prov}</td> </tr>
    <tr><td>${email}</td> </tr>
    <tr><td>${phone}</td> </tr>
    <tr><td></td></tr>`;
    
    switch(rentalVeh){
        case 'compact':
        cost += 15 * days;
        output += `<tr><td>Compact Rental </td> <td>$${(15.00*days).toFixed(2)}</td></tr>`;
        break;
        case 'midSize':
        cost += 20 * days;
        output += `<tr><td>Mid-size Rental </td> <td>$${(20.00*days).toFixed(2)}</td></tr>`;
        break;
        case 'luxury':
        cost += 35 * days;
        output += `<tr><td>luxury Rental </td> <td>$${(35.00*days).toFixed(2)}</td></tr>`;
        break;
        case 'vanTruck':
        cost += 40 * days;
        output += `<tr><td>Van/Truck Rental </td> <td>$${(40.00*days).toFixed(2)}</td></tr>`;
        break;
        default:
        alert('Please check vehicle selection');
    }
    
    
    if(document.getElementById('rack').checked){
        cost += 5 * days;
        output += `<tr><td>+ Roof/Bicycle Rack</td> <td>$${(5*days).toFixed(2)}</td></tr>`;
    }
    if(document.getElementById('gps').checked){
        cost += 10;
        output += `<tr><td>+ GPS</td> <td>$${5}</td></tr>`;
    }
    if(document.getElementById('childSeat').checked){
        output += `<tr><td>+ Child Seat</td> <td>Free</td></tr>`;
    }
    //console.log('Cost: ' + cost);
    output += `<tr><td><em>Total Amount Due:</em></td> <td><em>$${cost.toFixed(2)}</em></td></tr>`;
    document.getElementById("cxsummary").innerHTML = output;
    
    
}

function getDateFooter(){
    var today = new Date();
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dateTime = date+' '+time;
    
    document.getElementById("foot").innerHTML = dateTime;
}

// reference
// https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript