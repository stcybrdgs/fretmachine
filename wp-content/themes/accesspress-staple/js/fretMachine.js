/*****************************************************************
*   data: global variables
*****************************************************************/
var testMsg = "";    
// for the following global variables: 0 = off, 1 = on
// and all are initialized by buttonsInit() upon page load
var namesFlag = 0; 
var numeralsFlag = 0; 
var noNamesFlag = 1;
var chordFlag = 0;
var scaleFlag = 0;
var noneFlag = 1;
var resetFlag = 1;
var setFlag = 0;
var diatonicState = "names"; // holds last state -> "names" or "nums"
var highlightState = "white"; // holds highlight state -> "orange" or "white"
var setState = "unset"; // holds state of "set" (set at least once) or "unset" (never set) 

/*****************************************************************
*   functions to populate chordScale, currChromScale, currDiatonicScale   
*****************************************************************/
// behavior for namesButton
function namesOn(){
    diatonicState = "names";

    // turn on namesFlag, turn off numeralsFlag and noNamesFlag
    namesFlag = 1;
    numeralsFlag = 0;
    noNamesFlag = 0;
    lightButton();

    // turn on neck names (ie, set innerHTML for each note)
    var neckNotes = document.getElementsByClassName("note");
    var value; // the value attribute of current neckNote
    var valueArray; // the text and numerical components ( ie, "n6" -> ("n","6") )
    var valueNum; // the numerical component only ( ie, "6" )
    var valueInt; // conver the numerical component to an integer
    var chromNote; // the target note of currChromScale     
    var i;
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
    }    

    // for notes that are visible, make the names orange
    for( i = 0; i < neckNotes.length; i++ ){
        if( neckNotes[i].getAttribute("class") == "note visible trans" )
            neckNotes[i].setAttribute('class','note visible orange');
    }
 }

// behavior for noNamesButton
function noNamesOn(){
    // turn on noNamesFlag, turn off numeralsFlag and namesFlag
    noNamesFlag = 1;
    namesFlag = 0;
    numeralsFlag = 0;
    lightButton();  

    // turn off neck names (ie, turn off innerHTML)
    var neckNotes = document.getElementsByClassName("note");
    var i;
    for( i = 0; i < neckNotes.length; i++ ){
        neckNotes[i].innerHTML = "";           
    }    
}

// behavior for chordButton
function chordOn(){
    highlightState = "orange";

    // turn on chordFlag, turn off other flags
    scaleFlag = 0;
    chordFlag = 1;
    noneFlag = 0;
    lightButton();  
       
    if( setState == "set" ){     
        // remove higlights for notes in currDiatonicScale if needed
        unhighlightScaleNotes();

        // highlight neck notes in the currChord
        var neckNotes = document.getElementsByClassName("note");
        //var pianoNotes = document.getElementsByClassName("noteButton");
        var i;
        var j;
        var currScale;   

        for( i = 0; i < neckNotes.length; i++ ){
            for( j = 0; j < currChord.length; j++ ){
                if( neckNotes[i].getAttribute("name") == currChord[j] ){
                    neckNotes[i].setAttribute('class','note highlight white');
                    break;
                }
            }
        }
    }   
}

function unhighlightScaleNotes(){
    if( highlightState == "orange" ){

        var neckNotes = document.getElementsByClassName("note");
        //var pianoNotes = document.getElementsByClassName("noteButton");
        var i;
        var j;

        // unhighlight neck notes
        for( i = 0; i < neckNotes.length; i ++ ){
            for( j = 0; j < currDiatonicScale.length; j++ ){
                if( currDiatonicScale[j] == neckNotes[i].getAttribute("name") ){
                    if( namesFlag == 1 )
                        neckNotes[i].setAttribute('class','note visible orange');
                    else
                        neckNotes[i].setAttribute('class','note visible trans');  
                }
            }
        }
    }
}

function hideChordNotes(){
    if( highlightState == "orange" ){
        var neckNotes = document.getElementsByClassName("note");
        //var pianoNotes = document.getElementsByClassName("noteButton");
        var i;
        var j;

        // unhighlight neck notes
        for( i = 0; i < neckNotes.length; i ++ ){
            for( j = 0; j < currChord.length; j++ ){
                if( currChord[j] == neckNotes[i].getAttribute("name") ){
                        neckNotes[i].setAttribute('class','note invisible trans');
                }
            }
        }
    }
}

// behavior for scaleButton
function scaleOn(){
    highlightState = "orange";

    // turn on scaleFlag, turn off chordFlag and noneFlag
    scaleFlag = 1;
    chordFlag = 0;
    noneFlag = 0;
    lightButton();  

    if( setState == "set" ){
        // remove higlights for currChord if needed
        hideChordNotes();

        // highlight neck notes in the currDiatonicScale
        var neckNotes = document.getElementsByClassName("note");
        //var pianoNotes = document.getElementsByClassName("noteButton");
        var i;
        var j;
        var currScale;   

        if( diatonicState == "names" ) currScale = currDiatonicScale;
        else currScale = currDiatonicScaleNums;
        for( i = 0; i < neckNotes.length; i++ ){
            for( j = 0; j < currScale.length; j++ ){
                if( neckNotes[i].getAttribute("name") == currScale[j] ){
                    neckNotes[i].setAttribute('class','note highlight white');
                    break;
                }
            }
        }
    }
}

// behavior for noneButton
function noneOn(){   
    highlightState = "white";

    // turn on noneFlag, turn off chordFlag and scaleFlag
    noneFlag = 1;
    chordFlag = 0;
    scaleFlag = 0;
    lightButton();    

    if( setState == "set" ){
        // turn off highlights for neck notes in the currDiatonicScale
        var neckNotes = document.getElementsByClassName("note");
        //var pianoNotes = document.getElementsByClassName("noteButton");
        var i;
        var j;
        var currScale;

        // use prevailing diatonic scale to turn off highlights on neck and piano
        if( diatonicState == "names" ) currScale = currDiatonicScale;
        else currScale = currDiatonicScaleNums;
       
        for( i = 0; i < neckNotes.length; i++ ){
            for( j = 0; j < currScale.length; j++ ){
                if( neckNotes[i].getAttribute("name") == currScale[j] ){
                    neckNotes[i].setAttribute('class','note visible orange');
                    break;
                }
            }
        }   
    }
}

function flagsAndButtonsInit(){
    // initialize set/unset buttons
    setFlag = 0;;
    resetFlag = 1;

    // initialize note style buttons
    namesFlag = 0; 
    numeralsFlag = 0; 
    noNamesFlag = 1;

    // initialize note group buttons
    chordFlag = 0; 
    scaleFlag = 0; 
    noneFlag = 1;

    // initialize state vars
    diatonicState = "names"; 
    highlightState = "white"; 
    setState = "unset"; 
    
    // light button if needed
    lightButton();
}

function lightButton(){
    var thisFlag = [namesFlag, noNamesFlag, chordFlag, scaleFlag, noneFlag, setFlag, resetFlag];
    var thisButton = ["namesButton", "noNamesButton", "chordButton", "scaleButton", "noneButton", "setButton", "resetButton"];
    var i;           
    for( i = 0; i < thisFlag.length; i++ ){
        if( thisFlag[i] == 1 )
            document.getElementById(thisButton[i]).style.backgroundColor = "rgb(240,80,60)"; 
        else
            document.getElementById(thisButton[i]).style.backgroundColor = "rgb(240,150,140)"; 
    }
}

// behavior for setButton
function set(){
    setState = "set";    
    setFlag = 1;
    resetFlag = 0;
    lightButton();
    initChordScale();           
    setCurrChromScale();           
    setKey();                   
    setCurrDiatonicScale();        
    setCurrChromNumerals();     
    setCurrDiatonicNumerals();  
    setCurrChord();             
    showNeckNotes();            
    print();    
}

function setCurrChord(){
    var cat = document.getElementById("catDropMenu").value;
    var chord = document.getElementById("chordDropMenu").value;  
    var root; 
    var currScale = [];
    var i;
    var j;
    var loc = 0;        
    var spelling = [];

    currScale = currChromScale;
    root = currDiatonicScale[0];

    // var majorChords = ["&#916;","&#916;+4","&#916;+5","&#916;b6"];
    if( cat == "Major" ){
        if( chord == "&#916;+5" ) spelling = [0,4,4,3];  // ma+5
        else if( chord == "&#916;" && chordScale.scale == "Blues" ) spelling = [0,4,3,4,3];
        else spelling = [0,4,3,4];  // ma, ma+4, mab6
    }
    else if( cat == "Dom7" ){
        if( chord == "7+" ) spelling = [0,4,4,2];
        else if( chord == "7" && chordScale.scale == "Blues" ) spelling = [0,4,3,3,4];        
        else if( chord == "7b9" ) spelling = [0,4,3,3,3];
        else if( chord == "7+9" ) spelling = [0,4,4,2,4];
        else spelling = [0,4,3,3]; 
    }
    else if( cat == "Minor" ){
        if( chord == "&ndash;7" && document.getElementById("scaleDropMenu").value == "Diminished WH" )
             spelling = [0,3,4,4];           
        else if( chord == "&ndash;&#916;7" ||
            chord == "&ndash;6" ||
            chord == "&ndash;&#916;7b6" )
            spelling = [0,3,4,4];
        else 
            spelling = [0,3,4,3];
    }        
    else if( cat == "Dim" ){
        spelling = [0,3,3,3];
    }    
    else if( cat == "HalfDim" ){
        spelling = [0,3,3,3];
    }
    // find location of root in currScale
    for( i = 0; i < currScale.length; i++ ){
        if( currScale[i] == root ){
            loc = i;
            break;
        }
    }

    for( i = 0; i < spelling.length; i++ ){
        if( (loc + spelling[i]) > ( currScale.length - 1 ) ){
            loc = (loc + spelling[i]) - currScale.length;
        }
        else{
            loc = loc + spelling[i];        
        }
        currChord[i] = currScale[loc];   
    }    
}

function setCurrChromNumerals(){
    var noteName = ["C","D","E","F","G","A","B"];
    var noteNum = ["1","9","3","4","5","6","7"];
    var i;
    var j;
    var noteStr;
    var noteTxt;
    var noteAccidental;

    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i].length == 1 ){
            for( j = 0; j < noteName.length; j++ ){
                if( currChromScale[i] == noteName[j])
                    currChromScaleNums[i] = noteNum[j];
            }
        } 
        else{
            str = currChromScale[i].split("");
            noteTxt = str[0];
            noteAccidental = str[1];
            for( j = 0; j < noteName.length; j++ ){
                if( noteName[j] == noteTxt ){
                    currChromScaleNums[i] = (noteAccidental + noteNum[j]);
                }
            }
        }
    }
}

function setCurrDiatonicNumerals(){
    // resize currDiatonicNumerals if needed
    setCurrDiatonicNumsSize(currDiatonicScale.length);

    var i;
    var j;
    for( i = 0; i < currDiatonicScale.length; i++){
        for( j = 0; j < currChromScale.length; j++ ){
            if( currChromScale[j] == currDiatonicScale[i] ){
                currDiatonicScaleNums[i] = currChromScaleNums[j];       
            }
        }
    }
}

// behavior for resetButton
function reset(){   
    setState = "unset";
    resetFlag = 1;
    lightButton();

    // reset flags
    flagsAndButtonsInit();

    // reset neck notes to class="note invisible trans" and innerHTML = ""
    var neckNotes = document.getElementsByClassName("note");
    var i;
    for( i = 0; i < neckNotes.length; i++ ){
        neckNotes[i].setAttribute('class','note invisible trans');
        neckNotes[i].innerHTML = "";
    }

    // reset drop menu values to root: C, cat: Ma, chord: Ma, scale: Bebop Major
    document.getElementById("rootDropMenu").value = "C";
    document.getElementById("catDropMenu").value = "Major";
    changeChordMenu();

    // reset the output fields
    document.getElementById("rootMsg").innerHTML = "<strong>root</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("keyMsg").innerHTML = "<strong>key</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("typeMsg").innerHTML = "<strong>type</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("diatonicMsg").innerHTML = "<strong>diatonic</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("convertedMsg").innerHTML = "<strong>converted root</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("chordMsg").innerHTML = "<strong>chord</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("modeMsg").innerHTML = "<strong>mode</strong>:&nbsp;&nbsp;&nbsp;unset";
    document.getElementById("chromaticMsg").innerHTML = "<strong>chromatic</strong>:&nbsp;&nbsp;&nbsp;unset";    
}

function initChordScale(){
    chordScale.cat = document.getElementById("catDropMenu").value;
    chordScale.chord = document.getElementById("chordDropMenu").value;
    chordScale.scale = document.getElementById("scaleDropMenu").value;
    chordScale.root = document.getElementById("rootDropMenu").value;     

    setTypeAndMode();       

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

function showNeckNotes(){
    var neckNotes = document.getElementsByClassName("note");
    var value; // the value attribute of current neckNote
    var valueArray; // the text and numerical components ( ie, "n6" -> ("n","6") )
    var valueNum; // the numerical component only ( ie, "6" )
    var valueInt; // convert the numerical component to an integer
    var chromNote; // the target note of currChromScale 

    // set the names and innerHTML for each note
    for( i = 0; i < neckNotes.length; i++ ){
        value = neckNotes[i].getAttribute("value"); 
        valueArray = value.split(""); 
        if( valueArray.length == 2 ){
            valueNum = valueArray[1];
        }
        else{
            valueNum = valueArray[1] + valueArray[2]; 
        }
        valueInt = parseInt(valueNum);
        chromNote = currChromScale[valueInt - 1];
        neckNotes[i].setAttribute( 'name', chromNote );  // set the name
        if( namesFlag == 1 ){
            neckNotes[i].innerHTML = chromNote;  // set the innerHTML
        }

    // turn all neck notes to invisible
        neckNotes[i].setAttribute('class','note invisible trans');    

    // show notes from current diatonic scale
        var j;
        for ( j = 0; j < currDiatonicScale.length; j++ ){
            if( currDiatonicScale[j] == chromNote ){
                if( namesFlag == 1 || numeralsFlag == 1 ){               
                    neckNotes[i].setAttribute('class','note visible orange');
                }
                else{
                    neckNotes[i].setAttribute('class','note visible trans');
                }
            }   
        }
    }

    if( diatonicState == "nums" && noNamesFlag == 1 ){
        numeralsOn(); // align neckNote names to numerals if numeralsFlag is on
        noNamesOn();
    }
    else if( diatonicState == "nums" && noNamesFlag == 0 ){
        numeralsOn(); // align neckNote names to numerals if numeralsFlag is on
    }    
    if( highlightState == "orange" ){
        if( scaleFlag == 1 ) scaleOn();
        else if( chordFlag == 1 ) chordOn();
    }
}

function showPianoNotes(){
/*
   // this function to provide functionality for a future roll out

    var pianoNotes = document.getElementsByClassName("noteButton");    
    var i;
    var j;
    str = "bttnn";

    // turn all piano notes to invisible
    for( i = 0; i < 12; i++ ){
        str = str + (i+1).toString();
        document.getElementById(str).setAttribute('class', 'myButton noteButton noteOff white');
        str = "bttnn";            
    }

    // select correct chromatic and diatonic scale to use (ie, note name vs numerals )
    var thisChromScale = [];
    var thisDiatonicScale = [];
    if( numeralsFlag == 1 ){
        thisChromScale = currChromScaleNums;
        thisDiatonicScale = currDiatonicScaleNums;
    }
    else{
        thisChromScale = currChromScale;
        thisDiatonicScale = currDiatonicScale;
    }

    // set names and innerHTML for pianoNotes based on current chromatic scale
    for( i = 0; i < thisChromScale.length; i++ ){
        str = str + (i+1).toString();
        document.getElementById(str).setAttribute('name', thisChromScale[i]);    
        if( noNamesFlag == 1 )
            document.getElementById(str).innerHTML = "";    
        else        
            document.getElementById(str).innerHTML = thisChromScale[i];


        if( setState == "set" ){    
            for( j = 0; j < thisDiatonicScale.length; j++ ){
                if( thisDiatonicScale[j] == thisChromScale[i] ){
                    if( namesFlag == 1 || numeralsFlag == 1 )
                        document.getElementById(str).setAttribute('class', 'myButton noteButton noteOn orange');   
                    else
                        document.getElementById(str).setAttribute('class', 'myButton noteButton noteOn white');                     
                }
            }
        }
        str = "bttnn";
    }

    if( setState == "set" ){
        // if highlightState == "orange", then highlight the "on" piano notes
        if( highlightState == "orange" && setState == "set" ){
            for( i = 0; i < pianoNotes.length; i++ ){
                if( pianoNotes[i].getAttribute("class") == "myButton noteButton noteOn orange" ||
                    pianoNotes[i].getAttribute("class") == "myButton noteButton noteOn white" ){
                    pianoNotes[i].setAttribute('class','myButton noteButton highlight white');
                }
            }
        }
    }
    if( highlightState == "orange" ){
        if( scaleFlag == 1 ) scaleOn();
        else if( chordFlag == 1 ) chordOn();
    }    
*/
}

function print(){
    // var chordScale = {cat:"", root:"", chord:"", scale:"", type:"", mode:"", key:""};
    var root = document.getElementById("rootDropMenu").value;
    var chromScale = currChromScale;
    var convertedRoot = chordScale.root;
    var diatonicScale = currDiatonicScale; 
    var key = chordScale.key;
    var chord = currChord; 
    var mode = chordScale.mode;
    var type;

    if( chordScale.type == "ma" ) type = "Major";
    if( chordScale.type == "melMi" ) type = "Melodic Minor";
    if( chordScale.type == "harmMi" ) type = "Harmonic Minor";
    if( chordScale.type == "harmMa" ) type = "Harmonic Major";
    if( chordScale.type == "pent" ) type = "Pentatonic";
    if( chordScale.type == "blues" ) type = "Blues";
    if( chordScale.type == "bebop" ) type = "Bebop";
    if( chordScale.type == "aug" ) type = "Augmented";
    if( chordScale.type == "dim" ) type = "Diminished";
    if( chordScale.type == "wt" ) type = "Whole Tone";

    document.getElementById("rootMsg").innerHTML = "<strong>root</strong>:&nbsp;&nbsp;&nbsp;" + root;
    document.getElementById("keyMsg").innerHTML = "<strong>key</strong>:&nbsp;&nbsp;&nbsp;" + key;
    document.getElementById("typeMsg").innerHTML = "<strong>type</strong>:&nbsp;&nbsp;&nbsp;" + type;
    document.getElementById("diatonicMsg").innerHTML = "<strong>diatonic</strong>:&nbsp;&nbsp;&nbsp;" + diatonicScale;
    document.getElementById("convertedMsg").innerHTML = "<strong>converted root</strong>:&nbsp;&nbsp;&nbsp;" + convertedRoot;
    document.getElementById("chordMsg").innerHTML = "<strong>chord</strong>:&nbsp;&nbsp;&nbsp;" + chord;
    document.getElementById("modeMsg").innerHTML = "<strong>mode</strong>:&nbsp;&nbsp;&nbsp;" + mode;
    document.getElementById("chromaticMsg").innerHTML = "<strong>chromatic</strong>:&nbsp;&nbsp;&nbsp;" + chromScale;                            
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

    var chromNumsStr = "<br />currChromNumsScale: ";
    var i; // index
    for( i = 0; i < currChromScaleNums.length; i++ ){
        chromNumsStr = chromNumsStr + currChromScaleNums[i] + " ";
    }

    var diatonicNumsStr = "<br />currDiatonicScale: ";
    for( i = 0; i < currDiatonicScaleNums.length; i++ ){
        diatonicNumsStr = diatonicNumsStr + currDiatonicScaleNums[i] + " ";
    }    

    document.getElementById("outputField").innerHTML = str;
    document.getElementById("outputField2").innerHTML = chromStr;  
    document.getElementById("outputField3").innerHTML = diatonicStr;     
    document.getElementById("outputField4").innerHTML = chromNumsStr;  
    document.getElementById("outputField5").innerHTML = diatonicNumsStr;         
    document.getElementById("outputField6").innerHTML = "currChord:  " + currChord;  

    testMsg = "";       
}

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

