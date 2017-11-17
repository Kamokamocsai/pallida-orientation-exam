'use strict';

const xml = new XMLHttpRequest();
const body = document.querySelector('tbody');
const url = 'http://localhost:3000'

let allDiv = document.getElementsByClassName('container');
let button = document.getElementById('submit');
let input = document.getElementById('search');

function ajax(method, request, callback, data){
    xml.open(method, url + request, true);
    xml.onreadystatechange = function() {
        if (xml.readyState === 4){
            console.log('Data received');
            // var data = xml.responseText;
            console.log(data);
            callback(data); 
        }
    }
    xml.onload = function(){
        body.innerHTML = xml.response;
    }
    xml.send();
    
}

// // function getData(){
// //     ajax('GET', '/all', handleData);
// // }

// // getData();



function handleData(data) {
    console.log('handleData return with' + data);
};

// let button = document.querySelector('button');
// button.addEventListener('click', function(){
//     let inputdata = document.getElementsByClassName('.inputfield')
//     let data = inputdata.value;
//     console.log(data);
//     ajax('GET', '/search', handleData);
// });



button.addEventListener("click", click);
input.addEventListener("keypress", function(e) {
    var key = e.keyCode;
    if (key === 13) { // 13 is enter
      click();
    }
});

function getData(searchWord){
    ajax('GET', '/search', handleData, searchWord);
}

function callback(parsedData) {
    console.log(parsedData);
    let myParsedArray = parsedData.response.docs.map(getStory);
    // tableCreator(myParsedArray);
    
}

function getStory(source) {
    return console.log('getStory cucc');
}

function tableCreator(array){
    let table = document.createElement ('ul');
    array.forEach(function(element) {
        let newRow = document.createElement('li');
        newRow.appendChild(pubDate);
    });
    // console.log(allDiv);
    allDiv[0].appendChild(table);
};

function click() {
    console.log("click event");
    allDiv[0].innerHTML = "";
    var searchWord = document.getElementById('search').value;
    console.log(searchWord);
    if (searchWord !== "") {
        ajax('GET', '/search', handleData, searchWord);        
    };
};