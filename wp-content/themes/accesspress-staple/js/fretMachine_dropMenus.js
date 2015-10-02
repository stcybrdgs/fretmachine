/******************************************************
*    function:     changeChordMenu()
*    
*    description:  
*    when a user selects a new value from the category menu,
*    the contents of the chord menu are erased; the chord menu
*    is then rebuilt with the contents from the chord array 
*    corresponding to the value that prevails in the category menu.
*     
*******************************************************/
function changeSetButton(){
    setState = "unset";     
    setFlag = 0;
    lightButton();
}

function changeChordMenu(){
    setFlag = 0;
    lightButton();    

    var catSelection = document.getElementById("catDropMenu").value;
    var chordMenu = document.getElementById("chordDropMenu");
    var chordArray;
		
    switch( catSelection ){
        case 'Major':
    	    chordArray = majorChords; 
    	    break;
        case 'Minor':
    	    chordArray = minorChords; 
    	    break;
        case 'Dom7':
    	    chordArray = dom7Chords; 
    	    break;
        case 'Dim':  
    	    chordArray = dimChords; 
    	    break;
	    case 'HalfDim':
    	    chordArray = halfDimChords; 
    	    break;
        default:
            alert("Error thrown on chord menu selection!");
    }

    chordMenu.innerHTML=""; // clear chordMenu

    var index;
    var htmlString = "";
    for( index=0; index < chordArray.length; index++){

	// generate inner HTML for the chordDropMenu
        htmlString = htmlString + "<option value=\"\"></option>";
    }  
	
    // put the htmlString into the chordDropMenu to create the option set
    chordMenu.innerHTML = htmlString;

    // add values and labels from chordArray to the menu    
    for( index=0; index < chordArray.length; index++){  
	chordMenu.options[index].value =  chordArray[index];
        chordMenu.options[index].innerHTML =  chordArray[index];
    }

    changeScaleMenu();     
}


/******************************************************
*    function:     changeScaleMenu()
*    
*    description:  
*    when a new value prevails in the chord menu,
*    the contents of the scale menu are erased; the scale menu
*    is then rebuilt with the contents from the scale array 
*    corresponding to the value that prevails in the chord menu.
*     
*******************************************************/
function changeScaleMenu(){
    setFlag = 0;
    lightButton();

    var chordSelection = document.getElementById("chordDropMenu").value;
 
    if( chordSelection.slice(0,1) == "7" ){ 
        var scaleArray = getDom7Scales(chordSelection);
    }
    else if( chordSelection.slice(0,2) == "&n" ){
        var scaleArray = getMinorScales(chordSelection);
    }
    else if( chordSelection.slice(0,3) == "&#9" ){
        var scaleArray = getMajorScales(chordSelection);
    }
    else if( chordSelection.slice(0,3) == "&#1" ){
        var scaleArray = getDimScales(chordSelection);
    }
    else{
        var scaleArray = getHalfDimScales(chordSelection);
    }

    var scaleMenu = document.getElementById("scaleDropMenu");
		
    scaleMenu.innerHTML=""; // clear scaleMenu

    var index;
    var htmlString = "";
    for( index=0; index < scaleArray.length; index++){

	// generate inner HTML for the chordDropMenu
        htmlString = htmlString + "<option value=\"\"></option>";
    }  
	
    // put the htmlString into the scaleDropMenu to create the option set
    scaleMenu.innerHTML = htmlString;

    // add values and labels from scaleArray to the menu    
    for( index=0; index < scaleArray.length; index++){  
	scaleMenu.options[index].value =  scaleArray[index];
        scaleMenu.options[index].innerHTML =  scaleArray[index];
    }
}


/******************************************************
*    function: getDom7Scales()
*              getMinorScales()  
*              getMajorScales()  
*              getDimScales()
*              getHalfDimScales()
*    
*    description:  
*    these functions are helper functions for changeScaleMenu();
*    each helper uses a lookup to find the name of the
*    scale array that holds the info needed for the 
*    scaleDropMenu, and then the helper returns that name to
*    changeScaleMenu(); 
*     
*******************************************************/
function getDom7Scales(x){
    var index;
    var scaleLoc;
    for( index = 0; index < dom7Chords.length; index++ ){
        if( x == dom7Chords[index] ) scaleLoc = index;
    }
    var scaleArray = dom7Array[scaleLoc];
    return scaleArray;
}

function getMinorScales(x){
    var index;
    var scaleLoc;
    for( index = 0; index < minorChords.length; index++ ){
        if( x == minorChords[index] ) scaleLoc = index;
    }
    var scaleArray = minorArray[scaleLoc];
    return scaleArray;
}

function getMajorScales(x){
    var index;
    var scaleLoc;
    for( index = 0; index < majorChords.length; index++ ){
        if( x == majorChords[index] ) scaleLoc = index;
    }
    var scaleArray = majorArray[scaleLoc];
    return scaleArray;
}

function getDimScales(x){
    var scaleArray = dimScales
    return scaleArray;
}

function getHalfDimScales(x){
    var index;
    var scaleLoc;
    for( index = 0; index < halfDimChords.length; index++ ){
        if( x == halfDimChords[index] ) scaleLoc = index;
    }
    var scaleArray = halfDimArray[scaleLoc];
    return scaleArray;
}

