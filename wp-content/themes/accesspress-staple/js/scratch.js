var noteNameFlag = 0; // 0 is off, 1 is on
var n1Flag = 0, // for all note flags, 0 is off, 1 is on (noteSetFlags)
    n2Flag = 0,
    n3Flag = 0,
    n4Flag = 0,
    n5Flag = 0,
    n6Flag = 0,
    n7Flag = 0,
    n8Flag = 0,
    n9Flag = 0,
    n10Flag = 0,
    n11Flag = 0,
    n12Flag = 0; 

var testMsg = "";    

/*****************************************************************
*   functions to populate chordScale{}, currChromScale, currDiatonicScale   
*****************************************************************/
function tester(){
    var ionian = "0221222";
    var scaleSpell = ionian.split("");
    var thisDiatonicScale = [];
    var i;
    for( i = 0; i < scaleSpell.length; i++ ){
        scaleSpell[i] = parseInt(scaleSpell[i]);
    }
    var step = 0;
    for( i = 0; i < scaleSpell.length; i++ ){
        step = step + scaleSpell[i];            
        thisDiatonicScale[i] = chromFlat[step];
    }
    str = "";
    for( i = 0; i < scaleSpell.length; i++ ){
        str = str + thisDiatonicScale[i].toString();
    }        
}
function setDisplays(){ 
    initChordScale();   //alert("initChordScale()completed");
    displayNeckNotes(); //alert("displayNeckNotes() complete");
    displayPianoNotes();  //alert("displayPianoNotes() complete");
    testPrint();
    tester();
}

function displayPianoNotes(){
    var i;
    var j;
    str = "bttnn";
    // show the note names from current chromatic scale on the piano display
    for( i = 0; i < currChromScale.length; i++ ){
        str = str + (i+1).toString();
        document.getElementById(str).innerHTML = currChromScale[i];
        for( j = 0; j < currDiatonicScale.length; j++ ){
            if( currDiatonicScale[j] == currChromScale[i] ){
                if( noteNameFlag == 0 )
                    document.getElementById(str).setAttribute('class', 'myButton noteButton noteOn nameOff'); 
                else
                    document.getElementById(str).setAttribute('class', 'myButton noteButton noteOn nameOn');   
            }
        }
        str = "bttnn";
    }
}

function displayNeckNotes(){
    var neckNotes = document.getElementsByClassName("note");
    var value; // the value attribute of current neckNote
    var valueArray; // the text and numerical components ( ie, "n6" -> ("n","6") )
    var valueNum; // the numerical component only ( ie, "6" )
    var valueInt; // conver the numerical component to an integer
    var chromNote; // the target note of currChromScale 

    // reset the neck
    reset();

    // set the name and innerHTML for each note
    for( i = 0; i < neckNotes.length; i++ ){
        value = neckNotes[i].getAttribute("value"); 
        valueArray = value.split(""); 
        if( valueArray.length == 2 )
            valueNum = valueArray[1];
        else
            valueNum = valueArray[1] + valueArray[2]; 
        valueInt = parseInt(valueNum);
        chromNote = currChromScale[valueInt - 1];
        neckNotes[i].setAttribute( 'name', chromNote );
        neckNotes[i].innerHTML = chromNote;  

    // show notes from current diatonic scale
        var j;
        for ( j = 0; j < currDiatonicScale.length; j++ ){
            if( currDiatonicScale[j] == chromNote )
                neckNotes[i].setAttribute('class','note visible black');
        }   
    }
}

function initChordScale(){
    chordScale.cat = document.getElementById("catDropMenu").value;
    chordScale.chord = document.getElementById("chordDropMenu").value;
    chordScale.scale = document.getElementById("scaleDropMenu").value;
    chordScale.root = document.getElementById("rootDropMenu").value;     
    // if the value in the HTML tag uses "s" instead of "#" then convert it

    setTypeAndMode();       //alert("setTypeAndMode() completed")

    // after returning from setTypeAndMode(), you know chordScale.Type
    // so use it to reset the root for mode 3 of melMi if needed
    // (the order of the next statement must come after setTypAndMode() )
    var mode = chordScale.mode;
    var type = chordScale.type;
    var root = chordScale.root;
    if( ( mode == "3" && type == "melMi" ) || ( mode == "6" && type == "harmMi" || 
          mode == "3" && type == "harmMi") || ( mode == "6" && type == "harmMa" ) ){
        for( i = 0; i < melMiMode3RootLookup.length; i++ ){
            if( melMiMode3RootLookup[i] == root ){
                root = melMiMode3RootConvert[i];
                chordScale.root = root;
                break;            
            }
        }
    }
    setCurrChromScale();    
    setKey();              
    setCurrDiatonicScale(); 
}

function setCurrDiatonicScale(){
    var type = chordScale.type;
    if( type == "dim" ) setDimScale();
    else if( type == "dblHarmMa" ) setDblHarmMaScale();
    else if( type == "harmMa" ) setHarmMaScale();
    else if( type == "harmMi" ) setHarmMiScale();
    else if( type == "ma" ) setMaScale(); 
    else if( type == "wt" ) setWtScale();
    else if( type == "aug" ) setAugScale();
    else if( type == "bebop" ) setBebopScale();
    else if( type == "blues" ) setBluesScale();
    else if( type == "pent" ) setPentScale();
    else if( type == "melMi" ) setMelMiScale();
}

function setKey(){
    var root = chordScale.root;
    var mode = chordScale.mode;
    var chromScale = currChromScale;
    var offset;

    // find the offset, which is the distance in half steps
    // (also in array indices) between the root and the key tonic
    // in the ascending direction of the currChromScale
    if( mode == "1" ){
        chordScale.key = root;
        return;
    }
    else if( mode == "2" ) offset = 10;
    else if( mode == "3" ) offset = 8;
    else if( mode == "4" ) offset = 7;
    else if( mode == "5" ) offset = 5;
    else if( mode == "6" ) offset = 3;
    else if( mode == "7" ) offset = 1;

    // find the position of the root in the chromScale
    var i;
    var rootPos; 

    for( i = 0; i < chromScale.length; i++ ){
        if( chromScale[i] == root ){
            rootPos = i;
        }
    }   
    // using the currChromScale, start at the index that contains
    // the root note, and then move forward by a number of indices
    // equal to the offset. . . the index where you stop will hold the key
    for( i = 0; i < offset; i++ ){
        // apply a circular array technique to make sure 
        // the key is found 
        if( (rootPos + 1) > (chromScale.length - 1) ){
            rootPos = 0;
        } 
        else{
            rootPos = rootPos + 1;
        }
    }
    // the landing index for rootPos is the key we need,
    // so update chordScale.key to reflect this new info
    chordScale.key = chromScale[rootPos];
}

function resetRootCheck(){
    // see if the root is among the values that
    // should be enharmonically reset for the selected mode
    mode = chordScale.mode;
    var root = chordScale.root;    
    var resetLookup;
    if( mode == "1" ) resetLookup = maResetMode1;
    if( mode == "2" ) resetLookup = maResetMode2;
    if( mode == "3" ) resetLookup = maResetMode3;
    if( mode == "4" ) resetLookup = maResetMode4;
    if( mode == "5" ) resetLookup = maResetMode5;
    if( mode == "6" ) resetLookup = maResetMode6;
    if( mode == "7" ) resetLookup = maResetMode7; 

    // search for the root in resetLookup
    var i;
    var foundFlag = false;
    for( i = 0; i < resetLookup.length; i++ ){
        if( resetLookup[i] == root ){
            foundFlag = true;
        }
    }
 
    // if the root is one that needs to be reset, 
    // then use the maEnharmonicConvert lookup to reset it
    if( foundFlag ){
        var loc;
        for( i = 0; i < maEnharmonicLookup.length; i++ ){
            if( maEnharmonicLookup[i] == root ){
                root = maEnharmonicConvert[i];
                break;           
            }
        }
  
    // update chordScale.root to use enharmonic spelling
    chordScale.root = root;  
    }
    return root;   
}

function setCurrChromScale(){
    // check if root should be reset to an enharmonic value
    var root = resetRootCheck();

    // determine which version of chromScale to use
    var modeLookup = [];
    var mode = chordScale.mode;

    // determine which mode lookup table to use
    if( mode == "1" ) modeLookup = maKeysMode1;
    if( mode == "2" ) modeLookup = maKeysMode2;
    if( mode == "3" ) modeLookup = maKeysMode3;
    if( mode == "4" ) modeLookup = maKeysMode4;
    if( mode == "5" ) modeLookup = maKeysMode5;
    if( mode == "6" ) modeLookup = maKeysMode6;
    if( mode == "7" ) modeLookup = maKeysMode7; 

    // find the root's position within the lookup table
    var rootPos;
    var i;
    for( i = 0; i < modeLookup.length; i++ ){
        if( modeLookup[i] == root ){
            rootPos = i;
        }
    }

    // based on rootPos, return the chromVersion value 
    // from the same position in chromVersion[]
    var version = chromVersion[rootPos];
    var thisChrom = [];
    var i;
    // use the chromVersion val to determine the base chromatic scale
    if( version == "cf" || version == "cf1" || version == "cf2" ){
        // make a local copy of chromFlat        
        for( i = 0; i < chromFlat.length; i++ ){
            thisChrom[i] = chromFlat[i];
        }     
    }
    else{
        // make a local copy of chromSharp        
        for( i = 0; i < chromSharp.length; i++ ){
            thisChrom[i] = chromSharp[i];
        }        
    }
    // modify chrom scale for keys C#, Cb, F#, Gb 
    if( version == "cs1" || version == "cs2" ){
        thisChrom[5] = "E#"; // mod for keys F# and C#
    }
    if( version == "cs2" ){
        thisChrom[0] = "B#"; // mod for key C#    
    }
    if( version == "cf1" || version == "cf2" ){
        thisChrom[11] = "Cb"; // mod for keys Gb and Cb
    }
    if( version == "cf2" ){
        thisChrom[4] = "Fb"; // mod for key Cb
    }    

    // set the value of currChromScale
    currChromScale = thisChrom;

}

function setTypeAndMode(){
    // rem: the lookup arrays used below reside in dropMenu.js 
    // and were built solely to facilitate this look-up procedure
    var scale = chordScale.scale;
    var cat = chordScale.cat;
    var nameLookup = [];
    var typeLookup = [];
    var modeLookup = [];

    switch( cat ){
        case 'Major':
            nameLookup = maScaleName;
            typeLookup = maScaleType;
            modeLookup = maScaleMode;
            break;
        case 'Minor':
            nameLookup = miScaleName;
            typeLookup = miScaleType;
            modeLookup = miScaleMode;
            break;
        case 'Dom7':
            nameLookup = dom7ScaleName;
            typeLookup = dom7ScaleType;
            modeLookup = dom7ScaleMode;
            break;
        case 'Dim':  
            nameLookup = dimScaleName;
            typeLookup = dimScaleType;
            modeLookup = dimScaleMode;      
            break;
        case 'HalfDim':
            nameLookup = halfDimScaleName;
            typeLookup = halfDimScaleType;
            modeLookup = halfDimScaleMode;
            break;
        default:
            ////alert("Error thrown on setParentAndMode()!");
    }  
    var i;
    var loc;
    var myVar = nameLookup.length;
    for( i = 0; i < nameLookup.length; i++ ){
        if( nameLookup[i] == scale ) loc = i;
    }
    chordScale.type = typeLookup[loc];
    chordScale.mode = modeLookup[loc]; 
}

function testPrint(){

    document.getElementById("outputField").innerHTML = "";
    document.getElementById("outputField2").innerHTML = "";

    var str =   "cat: " + chordScale.cat + "<br />" + 
                "root: " + chordScale.root + "<br />" + 
                "chord: " + chordScale.chord + "<br />" + 
                "scale: " + chordScale.scale + "<br />" + 
                "type: " + chordScale.type + "<br />" + 
                "mode: " + chordScale.mode + "<br />" + 
                "key: " + chordScale.key + "<br />" + 
                "testMsg: " + testMsg + "<br />";

    var chromStr = "<br />currChromScale: ";
    var i; // index
    for( i = 0; i < currChromScale.length; i++ ){
        chromStr = chromStr + currChromScale[i] + " ";
    }

    var diatonicStr = "<br />currDiatonicScale: ";
    for( i = 0; i < currDiatonicScale.length; i++ ){
        diatonicStr = diatonicStr + currDiatonicScale[i] + " ";
    }    
    document.getElementById("outputField").innerHTML = str;
    document.getElementById("outputField2").innerHTML = chromStr;  
    document.getElementById("outputField3").innerHTML = diatonicStr;     

    testMsg = "";       
}
/*****************************************************************
*   Interface Behaviors
******************************************************************/	
function reset(){
    if( noteNameFlag == 1 ) toggleNames();
    if( n1Flag == 1 ){
        n1Flag = 0;
        document.getElementById("bttnn1").style.backgroundColor="white";
        document.getElementById("bttnn1").style.color="black";  
    }
    if( n3Flag == 1 ){
        n3Flag = 0;
        document.getElementById("bttnn3").style.backgroundColor="white";
        document.getElementById("bttnn3").style.color="black";  
    }
    if( n5Flag == 1 ){
        n5Flag = 0;
        document.getElementById("bttnn5").style.backgroundColor="white";
        document.getElementById("bttnn5").style.color="black";  
    }
    if( n6Flag == 1 ){
        n6Flag = 0;
        document.getElementById("bttnn6").style.backgroundColor="white";
        document.getElementById("bttnn6").style.color="black";  
    }
    if( n8Flag == 1 ){
        n8Flag = 0;
        document.getElementById("bttnn8").style.backgroundColor="white";
        document.getElementById("bttnn8").style.color="black";  
    }
    if( n10Flag == 1 ){
        n10Flag = 0;
        document.getElementById("bttnn10").style.backgroundColor="white";
        document.getElementById("bttnn10").style.color="black";  
    }
    if( n12Flag == 1 ){
        n12Flag = 0;
        document.getElementById("bttnn12").style.backgroundColor="white";
        document.getElementById("bttnn12").style.color="black";  
    }
    if( n2Flag == 1 ){
        n2Flag = 0;
        document.getElementById("bttnn2").style.backgroundColor="rgb(100,100,100)";
    }
    if( n4Flag == 1 ){
        n4Flag = 0;
        document.getElementById("bttnn4").style.backgroundColor="rgb(100,100,100)";
    }
    if( n7Flag == 1 ){
        n7Flag = 0;
        document.getElementById("bttnn7").style.backgroundColor="rgb(100,100,100)";
    }
    if( n9Flag == 1 ){
        n9Flag = 0;
        document.getElementById("bttnn9").style.backgroundColor="rgb(100,100,100)";
    }
    if( n11Flag == 1 ){
        n11Flag = 0;
        document.getElementById("bttnn11").style.backgroundColor="rgb(100,100,100)";
    }
    
    var array = document.getElementsByClassName("note");
    var index;
    for( index = 0; index < 90; index ++){
        // if a note is on, turn it off
        if( array[index].getAttribute("class") == 'note visible black' ||
            array[index].getAttribute("class") == 'note visible trans' ){
            array[index].setAttribute('class', 'note invisible trans');  
        }               
    }// end for
}// end function

function myBttnOver(x){
    //thisBttn = document.getElementById(x.id);
    //thisBttn.style.backgroundColor="rgb(240,80,60)";

    var thisBttn = document.getElementById(x.id);
    var thisBttnId = document.getElementById(x.id).getAttribute("id");
    var thisBttnName = document.getElementById(x.id).getAttribute("name");

    if( thisBttnId == "resetBttn" )
        thisBttn.style.backgroundColor="rgb(240,80,60)";
    
    if( thisBttnId == "namesBttn" ){
        if( noteNameFlag == 1 )
            thisBttn.style.backgroundColor="rgb(240,150,140)";
        else
            thisBttn.style.backgroundColor="rgb(240,80,60)";
    }

    if( thisBttnId == "enharmonicBttn" ){
        if( enharmonicFlag == 1 )
            thisBttn.style.backgroundColor="rgb(240,150,140)";
        else
            thisBttn.style.backgroundColor="rgb(240,80,60)";             
    }

    if( thisBttnId == ('bttn' + thisBttnName) ){
        if( (thisBttnName + 'Flag') == 1 ){
            if( thisBttnName.length == 1 )
                thisBttn.style.backgroundColor="rgb(100,100,100)";
            else{
                thisBttn.style.backgroundColor="white";
                thisBttn.style.color="black";          
            }
        }
        else{
            thisBttn.style.backgroundColor="rgb(240,80,60)"; 
            thisBttn.style.color="white"; 
	}
    }
}

function myBttnOut(x){
    var thisBttn = document.getElementById(x.id);
    var thisBttnId = document.getElementById(x.id).getAttribute("id");
    var thisBttnName = document.getElementById(x.id).getAttribute("name");
    var thisFlagVal = getThisFlag(thisBttnName + 'Flag');

    if( thisBttnId == "resetBttn" )
        thisBttn.style.backgroundColor="rgb(240,150,140)";
    
    if( thisBttnId == "namesBttn" ){
        if( noteNameFlag == 1 )
            thisBttn.style.backgroundColor="rgb(240,80,60)";
        else
            thisBttn.style.backgroundColor="rgb(240,150,140)";
    }

    if( thisBttnId == "enharmonicBttn" ){
        if( enharmonicFlag == 1 )
            thisBttn.style.backgroundColor="rgb(240,80,60)";
        else
            thisBttn.style.backgroundColor="rgb(240,150,140)";             
    }

    if( thisBttnId == ('bttn' + thisBttnName) ){
        if( thisFlagVal == 1 ){
            thisBttn.style.backgroundColor="rgb(240,80,60)";
            thisBttn.style.color="white";
	}
        else{
            if( thisBttnName.length == 1 ){
		thisBttn.style.backgroundColor="white";
		thisBttn.style.color="black";
	    }
	    else
		thisBttn.style.backgroundColor="rgb(100,100,100)";
        }
    }
}

function flipThisFlag(thisFlag){
    switch( thisFlag ){
        case 'n1Flag':
            if( n1Flag == 0 ) n1Flag = 1;
            else n1Flag = 0;
            return n1Flag;
            break;
        case 'n3Flag':
            if( n3Flag == 0 ) n3Flag = 1;
            else n3Flag = 0;
            return n3Flag;
            break;
        case 'n5Flag':
            if( n5Flag == 0 ) n5Flag = 1;
            else n5Flag = 0;
            return n5Flag;
            break;
        case 'n6Flag':
            if( n6Flag == 0 ) n6Flag = 1;
            else n6Flag = 0;
            return n6Flag;
            break;
        case 'n8Flag':
            if( n8Flag == 0 ) n8Flag = 1;
            else n8Flag = 0;
            return n8Flag;
            break;
        case 'n10Flag':
            if( n10Flag == 0 ) n10Flag = 1;
            else n10Flag = 0;
            return n10Flag;
            break;
        case 'n12Flag':
            if( n12Flag == 0 ) n12Flag = 1;
            else n12Flag = 0;
            return n12Flag;
            break;
        case 'n2Flag':
            if( n2Flag == 0 ) n2Flag = 1;
            else n2Flag = 0;
            return n2Flag;
            break;
        case 'n4Flag':
            if( n4Flag == 0 ) n4Flag = 1;
            else n4Flag = 0;
            return n4Flag;
            break;
        case 'n7Flag':
            if( n7Flag == 0 ) n7Flag = 1;
            else n7Flag = 0;
            return n7Flag;
            break;
        case 'n9Flag':
            if( n9Flag == 0 ) n9Flag = 1;
            else n9Flag = 0;
            return n9Flag;
            break;
        case 'n11Flag':
            if( n11Flag == 0 ) n11Flag = 1;
            else n11Flag = 0;
            return n11Flag;
            break;
    }
}

function getThisFlag(thisFlag){
   switch( thisFlag ){
        case 'n1Flag':
            return n1Flag;
            break;
        case 'n3Flag':
            return n3Flag;
            break;
        case 'n5Flag':
            return n5Flag;
            break;
        case 'n6Flag':
            return n6Flag;
            break;
        case 'n8Flag':
            return n8Flag;
            break;
        case 'n10Flag':
            return n10Flag;
            break;
        case 'n12Flag':
            return n12Flag;
            break;
        case 'n2Flag':
            return n2Flag;
            break;
        case 'n4Flag':
            return n4Flag;
            break;
        case 'n7Flag':
            return n7Flag;
            break;
        case 'n9Flag':
            return n9Flag;
            break;
        case 'n11Flag':
            return n11Flag;
            break;
    }
}

function toggleNoteSet(x){
    var thisBttn = document.getElementById(x.id);
    var thisBttnName = document.getElementById(x.id).getAttribute("name");
    var thisNoteName = document.getElementById(x.id).getAttribute("name");
    var thisFlagVal = flipThisFlag(thisBttnName + 'Flag');   


//alert(thisBttn + " " + thisBttnName + " " + thisNoteName + " " + thisFlagVal);

    // turn the button on 
    if( thisFlagVal == 1 ){
        if( !noteNameFlag )
            thisBttn.setAttribute('class','myButton noteButton noteOn nameOff');
        else
            thisBttn.setAttribute('class','myButton noteButton noteOn nameOn');            
    }
    // turn the button off  
    else{
        thisBttn.setAttribute('class','myButton noteButton noteOff nameOff');
    }
 
    var array = document.getElementsByClassName("note");
    var index;
    for( index = 0; index < 90; index ++){
        if( array[index].getAttribute("name") == thisNoteName ){

            // if flag is on, turn notes on
            if( thisFlagVal == 1 ){
                if( noteNameFlag == 1 )
                    array[index].setAttribute('class', 'note visible black');
                else
                     array[index].setAttribute('class', 'note visible trans');
            }
            // if flag is off, turn notes off  
            else{
                array[index].setAttribute('class', 'note invisible trans');
            }
        }// end outer if
    }// end for
}// end function  

function toggleNames(x){
    // toggle noteNameFlag
    if( document.getElementById(x.id).getAttribute("value") == "off" ){
        noteNameFlag = 0;

        // make piano note names silver
        var i;
        str = "bttnn";
        var n;
        for( i = 0; i < 12; i++ ){
            n = i + 1;
            str = "bttnn" + n; 
            var thisClass = document.getElementById(str).getAttribute("class");            
            if( thisClass == "myButton noteButton noteOn nameOn")
                document.getElementById(str).setAttribute('class', 'myButton noteButton noteOn nameOff');
            str = "bttnn";
        }
    }
    else if( document.getElementById(x.id).getAttribute("value") == "on" ){
        noteNameFlag = 1;

        // make piano note names black
        var i;
        var str = "bttnn";
        var n;
        for( i = 0; i < 12; i++ ){
            n = i + 1;
            str = "bttnn" + n; 
            var thisClass = document.getElementById(str).getAttribute("class");
            if( thisClass == "myButton noteButton noteOn nameOff" ){
                document.getElementById(str).setAttribute('class', 'myButton noteButton noteOn nameOn');
            }            
            str = "bttnn";
        }
    }

    // toggle the note names on/off for the entire neck
    var array = document.getElementsByClassName("note");
    var index;
    for( index = 0; index < 90; index ++){
	if( noteNameFlag == 1 ){
            // toggle the note name to on
            var noteName = array[index].getAttribute("name");
            array[index].innerHTML = noteName;
            
	    // if the note is visible, make the note name black
            if( array[index].getAttribute("class") == "note visible trans" ){
                array[index].setAttribute('class','note visible black');
            }
        }
        else{
	    // toggle the note name to off
            array[index].innerHTML = "";
        }
    }
}

function toggleNote(x){
    var thisNote = document.getElementById(x.id);

    // if a note is on, turn it off
    if( thisNote.getAttribute("class") == 'note visible black' ||
        thisNote.getAttribute("class") == 'note visible trans' ){
        thisNote.setAttribute('class', 'note invisible trans');  
    }
    else{
        // if a note is off, turn it on      
        thisNote.setAttribute('class', 'note visible black');
    }   
}
