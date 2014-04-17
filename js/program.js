function showMoreOrLess(thisObj,bonusContent){
    var caption = thisObj.innerHTML;
    if ( caption == "Read more" ) {
        document.getElementById(bonusContent).style.display = "inline";
        thisObj.innerHTML = "Close";
    } else {
        document.getElementById(bonusContent).style.display = "none";
        thisObj.innerHTML = "Read more";
    }
}

