'use strict';

const xml = new XMLHttpRequest();
const body = document.querySelector('tbody');
const url = 'http://localhost:3000'

function ajax(method, response, callback, data){
    xml.open(method, url + response, true);
    xml.onload = function(){
        body.innerHTML = xml.response;
    }
    xml.send();
}

function getData(){
    ajax('GET', '/all', handleData);
}

getData();

function handleData(data) {
    
}