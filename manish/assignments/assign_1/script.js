// JavaScript Document

function loadDoc(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     callback(xhttp.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function getImageSuccess1(response)
{
  console.log(response);  
}


function getImageSuccess2(response)
{
  console.log(response);  
}

/*
Usage:
loadDoc('image1.txt', getImageSuccess);

loadDoc('image2.txt', getImageSuccess);
*/