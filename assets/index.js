// 'use strict';

// const xml = new XMLHttpRequest();
// const body = document.querySelector('tbody');
// const url = 'http://localhost:3000'

// function ajax(method, response, callback, data){
//     xml.open(method, url + response, true);
//     httpRequest.onreadystatechange = function() {
//         if (httpRequest.readyState === 4){
//             console.log('Data received');
//             var data = httpRequest.responseText;
//             callback(JSON.parse(data)); 
//         }
//     }
//     xml.onload = function(){
//         body.innerHTML = xml.response;
//     }
//     xml.send();
    
// }

// // function getData(){
// //     ajax('GET', '/all', handleData);
// // }

// // getData();



// function handleData(data) {
//     console.log('handleData return with' + data);
// };

// let button = document.querySelector('button');
// button.addEventListener('click', function(){
//     let inputdata = document.getElementsByClassName('.inputfield')
//     let data = inputdata.value;
//     console.log(data);
//     ajax('GET', '/search', handleData);
// });

'use strict';

let allDiv = document.getElementsByClassName('container');
let button = document.getElementById('submit');
let input = document.getElementById('search');

button.addEventListener("click", click);
input.addEventListener("keypress", function(e) {
    var key = e.keyCode;
    if (key === 13) { // 13 is enter
      click();
    }
});

function getData(searchWord){
    let httpRequest = new XMLHttpRequest();
    var url = "localhost:3000"; 
    httpRequest.open('GET', url);
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4){
            console.log('Data received');
            var data = httpRequest.responseText;
            callback(JSON.parse(data)); 
        }
    }
    httpRequest.send();
    console.log('Request sended');
}

function callback(parsedData) {
    console.log(parsedData);
    let myParsedArray = parsedData.response.docs.map(getStory);
    // tableCreator(myParsedArray);
    
}

function getStory(source) {
    // console.log(source.multimedia);
    return console.log('getStory cucc');
    // return {"header": source.headline.print_headline,
    //         "snippet": source.snippet,
    //         "publication date": source.pub_date,
    //         "webUrl": source.web_url,
    //         "picture": source.multimedia.length > 0 ? source.multimedia[1].url : ''
        //  };
}

function tableCreator(array){
    let table = document.createElement ('ul');
    array.forEach(function(element) {
        // console.log(element.picture);
        let newRow = document.createElement('li');
        table.appendChild(newRow);
        let header = document.createElement('ul');
        let snippet = document.createElement('ul');
        let pubDate = document.createElement('ul');
        let linkImage = document.createElement('img');
        let permalink = document.createElement('a');
        permalink.textContent = element['header'];
        permalink.setAttribute('href', element['webUrl']);
        permalink.setAttribute('target', 'new');
        linkImage.setAttribute('src', 'http://www.nytimes.com/' + element['picture']);
        header.appendChild(permalink);
        header.appendChild(linkImage);
        snippet.textContent = element['snippet'];
        pubDate.textContent = element['publication date'];
        newRow.appendChild(header);
        newRow.appendChild(snippet);
        newRow.appendChild(pubDate);
    });
    // console.log(allDiv);
    allDiv[0].appendChild(table);
    

}

function click() {
    console.log("click event");
    allDiv[0].innerHTML = "";
    var searchWord = document.getElementById('search').value;
    if (searchWord !== "") {
        getData(searchWord);
    };
};