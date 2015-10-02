/*************************************************************
*    createScaleFunctions
*    these helper functions use currChromScale to compute the short
*    diatonic form of the scale name stored in chordScale.scale;
*    each of these functions is triggered from the driver function
*    setCurrDiatonicScale(), except for setAugScale() and 
*    setDimScale(), which are constructed based on lookup tables
*
**************************************************************/
function setAugScale(){
    // note: the currDiatonicScale for augmented is constructed
    // from a lookup, so the currChromScale needs to be synched
    // at the end of the function

    // make sure currDiatonicScale is the correct size
    var sizeNeeded = 6;
    setCurrDiatonicSize(sizeNeeded); 
    var i;    

    // convert the currChromScale to synch with augmented lookup scales
    // if root == C || root == Ab, Eb->D#    
    if ( chordScale.root == "C" || chordScale.root == "Ab" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Eb" ) 
                currChromScale[i] = "D#";
        }
    }
    // if root == Db || root == F, Ab->G#
    else if ( chordScale.root == "Db" || chordScale.root == "F" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Ab" ) 
                currChromScale[i] = "G#";
        }
    }
    // if root == D || root == F#, A#->Bb
    else if ( chordScale.root == "D" || chordScale.root == "F#" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "A#" ) 
                currChromScale[i] = "Bb";
        }
    }    
    // if root == G || root == B, D#->Eb
    else if ( chordScale.root == "G" || chordScale.root == "B" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "D#" ) 
                currChromScale[i] = "Eb";
        }
    }    
    // if root == A || root == C#, C#->Db
    else if ( chordScale.root == "A" || chordScale.root == "C#" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "C#" ) 
                currChromScale[i] = "Db";
        }
    }    
    // if root == Eb || root == Cb, Gb->F#, Bb->A#
    else if ( chordScale.root == "Eb" || chordScale.root == "Cb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
            if( currChromScale[i] == "Bb" ) 
                currChromScale[i] = "A#";            
        }
    }    
    // if root == Bb || root == Gb, Gb->F#, Db->C#
    else if ( chordScale.root == "Bb" || chordScale.root == "Gb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
            if( currChromScale[i] == "Db" ) 
                currChromScale[i] = "C#";            
        }
    }        
    // if root == E, G#->Ab 
    else if ( chordScale.root == "E" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "G#" ) 
                currChromScale[i] = "Ab";
        }
    }    

    // next, perform root conversion if needed
    // and then select the correct lookup array to use    
    if( chordScale.root == "Gb" ) chordScale.root = "F#";
    else if( chordScale.root == "C#" ) chordScale.root = "Db";
    else if( chordScale.root == "Cb" ) chordScale.root = "B";

    var lookup = [];
    for( i = 0; i < rootAug.length; i++ ){ 
        if( rootAug[i] == chordScale.root ){
            lookup = augVersion[i]; // correct lookup array
            break;
        }
    }  
    // perform root conversions for the lookup array if needed
    if( lookup == aug1 && chordScale.root == "Eb" ) chordScale.root = "D#";
    else if( lookup == aug2 && chordScale.root == "Ab" ) chordScale.root = "G#";        
    else if( lookup == aug4 && chordScale.root == "Bb" ) chordScale.root = "A#";        

    // update key
    chordScale.key = chordScale.root;

    // find starting note in lookup
    var loc;
    for( i = 0; i < lookup.length; i++ ){ 
        if( lookup[i] == chordScale.root ){
            loc = i; // location of starting note
            break;                
        }
    }

    // generate the aug scale and store in currDiatonicScale
    for( i = 0; i < lookup.length; i++ ){            
        currDiatonicScale[i] = lookup[loc];
        if( ( loc + 1 ) > ( lookup.length - 1 ) )
            loc = 0;
        else
            loc++;
    }
}

function syncDimWH(){
    // DIM WH
    // if root == F# || root == A, D#->Eb
    if( chordScale.root == "F#" || chordScale.root == "A" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "D#" ) 
                currChromScale[i] = "Eb";
        }
    }
    // if root == F || root == Ab, Db->C#
    else if( chordScale.root == "F" || chordScale.root == "Ab" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Db" ) 
                currChromScale[i] = "C#";
        }
    }        
    // if root == Db || root == Bb, Gb->F#
    else if( chordScale.root == "Db" || chordScale.root == "Bb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
        }
    }               
    // if root == B || root == D, G#->Ab, A#->Bb
    else if( chordScale.root == "B" || chordScale.root == "D" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "G#" ) 
                currChromScale[i] = "Ab";
            if( currChromScale[i] == "A#" ) 
                currChromScale[i] = "Bb";                
        }
    }               
    // if root == Eb || root == C, Gb->F#, Ab->G#
    else if( chordScale.root == "Eb" || chordScale.root == "C" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
            if( currChromScale[i] == "Ab" ) 
                currChromScale[i] = "G#";                
        }
    }           
    // if root == E || root == G, A#->Bb, C#->Db, D#->Eb
    else if( chordScale.root == "E" || chordScale.root == "G" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "A#" ) 
                currChromScale[i] = "Bb";
            if( currChromScale[i] == "C#" ) 
                currChromScale[i] = "Db";   
            if( currChromScale[i] == "D#" ) 
                currChromScale[i] = "Eb";   
        }
    }           
    // if root == Gb, Gb->F#, Ab->G#
    else if( chordScale.root == "Gb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
            if( currChromScale[i] == "Ab" ) 
                currChromScale[i] = "G#";                
        }
    }          
    // if root == Cb, Db->C#, Cb->B
    else if( chordScale.root == "Cb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Db" ) 
                currChromScale[i] = "C#";
            if( currChromScale[i] == "Cb" ) 
                currChromScale[i] = "B";                
        }
    } 
    // if root == Gb, Gb->F#, Ab->G#
    else if( chordScale.root == "Gb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
            if( currChromScale[i] == "Ab" ) 
                currChromScale[i] = "G#";                
        }
    }         
    // if root == C#, C#->Db, D#->Eb, A#->Bb
    else if( chordScale.root == "C#" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "C#" ) 
                currChromScale[i] = "Db";
            if( currChromScale[i] == "D#" ) 
                currChromScale[i] = "Eb";    
            if( currChromScale[i] == "A#" ) 
                currChromScale[i] = "Bb"; 
        }
    }         
}    


function syncDimHW(){
    // if root == Cb || root == B, D#->Eb
    if( chordScale.root == "Cb" || chordScale.root == "B" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "D#" ) 
                currChromScale[i] = "Eb";
        }
    }      
    // if root == D || root == F, Gb->F#, Ab->G#
    else if( chordScale.root == "D" || chordScale.root == "F" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
            if( currChromScale[i] == "Ab" ) 
                currChromScale[i] = "G#";            
        }
    }        
    // if root == E || root == C#, G#->Ab, A#->Bb
    else if( chordScale.root == "E" || chordScale.root == "C#" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "G#" ) 
                currChromScale[i] = "Ab";
            if( currChromScale[i] == "A#" ) 
                currChromScale[i] = "Bb";            
        }
    }     
    // if root == Eb || root == C, Gb->F#
    else if( chordScale.root == "Eb" || chordScale.root == "C" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";
        }
    }       
    // if root == A || root == F# || root == Gb, A#->Bb, C#->Db, D#->Eb
    else if( chordScale.root == "A" || chordScale.root == "F#" ||
             chordScale.root == "Gb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "A#" ) 
                currChromScale[i] = "Bb";
            if( currChromScale[i] == "C#" ) 
                currChromScale[i] = "Db";    
            if( currChromScale[i] == "D#" ) 
                currChromScale[i] = "Eb";  
        }
    }       
    // if root == Ab, Ab->G#, Gb->F#
    else if( chordScale.root == "Ab" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Ab" ) 
                currChromScale[i] = "G#";
            if( currChromScale[i] == "Gb" ) 
                currChromScale[i] = "F#";    
        }
    }      
    // if root == Db || root == G || root == Bb, Db->C#   
    else if( chordScale.root == "Db" || chordScale.root == "G" ||
             chordScale.root == "Bb" ){
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == "Db" ) 
                currChromScale[i] = "C#";
        }
    }         
}

function setDimScale(){
    // make sure currDiatonicScale is the correct size
    var sizeNeeded = 8;
    setCurrDiatonicSize(sizeNeeded); 

    // convert the currChromScale to synch with diminished lookup scales
    if( chordScale.scale == "Diminished WH" ) syncDimWH();
    else syncDimHW();

    // select the correct lookup array to use
    // and perform root conversion if needed
    var lookup = [];
    if( chordScale.scale == "Diminished WH" ){
        lookup = rootDimWH;   

        if( chordScale.root == "Gb" ) chordScale.root = "F#";
        else if( chordScale.root == "C#" ) chordScale.root = "Db";     
        else if( chordScale.root == "Cb" ) chordScale.root = "B";        
    } 
    else{
        lookup = rootDimHW;

        if( chordScale.root == "Ab" ) chordScale.root = "G#";
        else if( chordScale.root == "Db" ) chordScale.root = "C#";     
        else if( chordScale.root == "Gb" ) chordScale.root = "F#";    
        else if( chordScale.root == "Cb" ) chordScale.root = "B";                  
    }
    chordScale.key = chordScale.root;

    // method: lookup root in rootDimWH, pair it to the dim array
    // identified at the parallel index in dimVersion,
    // pull back the array of notes (ie, from dim1, dim2, or dim3)
    // then starting at the root, extract the correct seq of 8 notes
    var loc;
    var i;
    for( i = 0; i < lookup.length; i++ ){ 
        if( lookup[i] == chordScale.root ){
            loc = i; // location of root
            break;
        }
    }  
    var dimScale = dimVersion[loc]; // pulling back the array of notes
    for( i = 0; i < dimScale.length; i++ ){ 
        if( dimScale[i] == chordScale.root ){
            loc = i; // location of starting note
            break;                
        }
    }

    for( i = 0; i < dimScale.length; i++ ){            
        currDiatonicScale[i] = dimScale[loc];
        if( ( loc + 1 ) > ( dimScale.length - 1 ) )
            loc = 0;
        else
            loc++;
    }
}

function setMaScale(){
    // make sure currDiatonicScale is the correct size
   var sizeNeeded = 7;
    setCurrDiatonicSize(sizeNeeded); 

    var root = chordScale.root;
    var key = chordScale.key;
    var chromatic = currChromScale;
    var majorPattern = [0,2,2,1,2,2,2];
    var tempDiatonic = [];

    // use key to find starting location in chromatic scale
    var i;
    var loc;
    for( i = 0; i < chromatic.length; i++ ){
        if( chromatic[i] == key ) loc = i;
    } 

    // parse chromatic scale into diatonic major of the key	 			
    var step = loc;
    for( i = 0; i < majorPattern.length; i++ ){
        // apply a circular array technique to make sure 
        // all diatonic notes are found 
        if( (step + majorPattern[i]) > (chromatic.length - 1) ){
	        // case 1: 
	        if( (step + majorPattern[i]) == chromatic.length ){
                step = 0;
            }
            // case 2:
	        else if( (step + majorPattern[i]) == (chromatic.length + 1) ){
                step = 1;
            }
        }            
        else{
            step = step + majorPattern[i];
        }
        tempDiatonic[i] = chromatic[step];
    }

    // use root to find starting location in diatonic scale
    for( i = 0; i < tempDiatonic.length; i++ ){
        if( tempDiatonic[i] == root ) loc = i;
    } 

    // re-arrange the diatonic major into mode starting on root
    // and store result in currDiatonicScale[]
    step = loc;
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[step]
        // apply a circular array technique to make sure 
        // all diatonic notes are found 
	if( (step + 1) > (tempDiatonic.length - 1) ){
	    step = 0;
	}
        else{
            step = step + 1;
        }
    }
}

function setWtScale(){
    // get mixolydian
    // (wt is already set to mode 5)
    setMaScale();    

    // make sure currDiatonicScale is the correct size
    // note: set this size AFTER you pull back the major scale
    var sizeNeeded = 6;
    setCurrDiatonicSize(sizeNeeded); 

    // next, make adjustments to currChromScale to reflect #4, #5
    // and set flags if chrom changes are needed for the root       
    var root = chordScale.root;
    var old = "", nu = "";
    var old2 = "", nu2 = "";
    var oldnuflag = false;
    var old2nu2flag = false; 

    if( root == "A" ){ 
        old  = "F"; nu  = "E#"; 
        oldnuflag = true;
    }
    else if( root == "E" ){ 
        old  = "C"; nu  = "B#"; 
        oldnuflag = true;        
    }
    else if( root == "B" ){ 
        old  = "F"; nu  = "E#"; 
        old2 = "G"; nu2 = "F##"; 
        oldnuflag = true;        
        old2nu2flag = true; 
    }
    else if( root == "F#" ){ 
        old  = "C"; nu  = "B#"; 
        old2 = "D"; nu2 = "C##"; 
        oldnuflag = true;        
        old2nu2flag = true; 
    }
    else if( root == "C#" ){ 
        old  = "G"; nu  = "F##";
        old2 = "A"; nu2 = "G##";
        oldnuflag = true;        
        old2nu2flag = true; 
    }               
    else if( root == "G#" ){
        old  = "D"; nu  = "C##";
        old2 = "E"; nu2 = "D##";
        oldnuflag = true;        
        old2nu2flag = true; 
    } 
    else if( root == "Bb" ){
        old  = "Gb"; nu = "F#";
        oldnuflag = true;        
    }
    else if( root == "F" ){
        old  = "Db"; nu = "C#";
        oldnuflag = true;        
    }
    else if( root == "C" ){
        old  = "Gb"; nu  = "F#";
        old2 = "Ab"; nu2 = "G#";
        oldnuflag = true;        
        old2nu2flag = true; 
    }   
    else if( root == "G" ){
        old  = "Db"; nu  = "C#";
        old2 = "Eb"; nu2 = "D#";
        oldnuflag = true;        
        old2nu2flag = true; 
    }  
    if( oldnuflag ){
       
        var i;
        for( i = 0; i < currChromScale.length; i++ ){
            if( currChromScale[i] == old ){ 
                currChromScale[i] = nu;
                if( !old2nu2flag ) break;
            }
            if( old2nu2flag ){
                if( currChromScale[i] == old2 ){ 
                    currChromScale[i] = nu2;
                    break;
                }
            }
        }
    }   
    // declare offsets for finding #4 and #5 in currChromScale
    var s4offset = 5; 
    var s5offset = 7; 
    var sb7offset = 9;  

    // find location of root in currChromScale
    var loc;
    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i] == root ) loc = i;
    }
    // update currDiatonicScale to pick up #4/#5 changes 
    // from currChromScale
    for( i = 0; i <= sb7offset; i++ ){
        if( ( loc + 1 ) > ( currChromScale.length - 1 ) )
            loc = 0;
        else
            loc ++;         
        if( i == s4offset ) 
            currDiatonicScale[3] = currChromScale[loc];
        else if( i == s5offset ) 
            currDiatonicScale[4] = currChromScale[loc];    
        else if( i == sb7offset ) 
            currDiatonicScale[5] = currChromScale[loc];                 
    }
}

function setBebopScale(){
    var scale = chordScale.scale;
    if( scale == "Bebop Major") getBebopMajor();
    if( scale == "Bebop Minor") getBebopMinor();
    if( scale == "Bebop Minor No. 2") getBebopMinor2();
    if( scale == "Bebop Dominant") getBebopDominant();
    if( scale == "Bebop Scale") getBebopHalfDim();
}

function getRootLoc(){
    var root = chordScale.root;
    var loc;
    var i;
    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i] == root ) loc = i;
    }
    return loc;
}

function getBebopNote(x){
    var thisNote;  
    var loc = getRootLoc(); // find the loc of root in currChromScale
    var i;
    for( i = 0; i < x; i++ ){
        if( ( loc + 1 ) > ( currChromScale.length - 1 ) )
            loc = 0;
        else
            loc ++;  
        thisNote = currChromScale[loc]
    } 
    return thisNote;
}

function setCurrDiatonicSize(x){
    var currSize = currDiatonicScale.length;
    var numToPop;
    var numToPush;
    var i;
    if( currSize == x ) return;
    else if( currSize > x ){ 
        for( i = 0; i < ( currSize - x ); i++ ){
            currDiatonicScale.pop();
        }
    }
    else{
        for( i = 0; i < ( x - currSize ); i++ ){
            currDiatonicScale.push("");
        }
    }
}

function setCurrDiatonicNumsSize(x){
    var currSize = currDiatonicScaleNums.length;
    var numToPop;
    var numToPush;
    var i;
    if( currSize == x ) return;
    else if( currSize > x ){ 
        for( i = 0; i < ( currSize - x ); i++ ){
            currDiatonicScaleNums.pop();
        }
    }
    else{
        for( i = 0; i < ( x - currSize ); i++ ){
            currDiatonicScaleNums.push("");
        }
    }
}

function getBebopMajor(){
    // method: get ionian and add a #5
    setMaScale(); // note: Bebop Major is already tagged by mode 1

    var offset = 8; // bebop note is located at this offset from root
    var bebopNote = getBebopNote(offset);

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale    
    var sizeNeeded = 8;
    setCurrDiatonicSize(sizeNeeded); 
    
    // copy currDiatonicScale into temp container, adding bebopNote
    var i;
    var tempDiatonic = [];
    for( i = 0; i < currDiatonicScale.length; i++ ){
        if( i == 5 )
            tempDiatonic[i] = bebopNote; 
        else if( i > 5 ) 
            tempDiatonic[i] = currDiatonicScale[i - 1]; 
        else
            tempDiatonic[i] = currDiatonicScale[i]; 
    }

    // copy temp back into currDiatonicScale, 
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[i];
    }    
}

function getBebopMinor(){
    // method: get dorian and add a nat3    
    setMaScale(); // note: Bebop Minor is already tagged by mode 2   

    var offset = 4; // bebop note is located at this offset from root
    var bebopNote = getBebopNote(offset);

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale
    var sizeNeeded = 8;
    setCurrDiatonicSize(sizeNeeded); 
    
    // copy currDiatonicScale into temp container, adding bebopNote
    var i;
    var tempDiatonic = [];
    for( i = 0; i < currDiatonicScale.length; i++ ){
        if( i == 3 )
            tempDiatonic[i] = bebopNote; 
        else if( i > 3 ) 
            tempDiatonic[i] = currDiatonicScale[i - 1]; 
        else
            tempDiatonic[i] = currDiatonicScale[i]; 
    }

    // copy temp back into currDiatonicScale, 
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[i];
    }       
}

function getBebopMinor2(){
    // method: get melodic minor and add a #5
    setMelMiScale(); // note: Bebop Minor No. 2 is already tagged by mode 1

    var offset = 8; // bebop note is located at this offset from root
    var bebopNote = getBebopNote(offset);

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale
    var sizeNeeded = 8;
    setCurrDiatonicSize(sizeNeeded); 
    
    // copy currDiatonicScale into temp container, adding bebopNote
    var i;
    var tempDiatonic = [];
    for( i = 0; i < currDiatonicScale.length; i++ ){
        if( i == 5 )
            tempDiatonic[i] = bebopNote; 
        else if( i > 5 ) 
            tempDiatonic[i] = currDiatonicScale[i - 1]; 
        else
            tempDiatonic[i] = currDiatonicScale[i]; 
    }

    // copy temp back into currDiatonicScale, 
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[i];
    }        
}

function getBebopDominant(){
    // method: get mixolydian and add a nat7
    setMaScale(); // note: Bebop Dominant is already tagged by mode 5  

    var offset = 11; // bebop note is located at this offset from root
    var bebopNote = getBebopNote(offset);

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale    
    var sizeNeeded = 8;
    setCurrDiatonicSize(sizeNeeded); 
    
    // copy currDiatonicScale into temp container, adding bebopNote
    var i;
    var tempDiatonic = [];
    for( i = 0; i < currDiatonicScale.length; i++ ){
        if( i == 7 )
            tempDiatonic[i] = bebopNote; 
        else
            tempDiatonic[i] = currDiatonicScale[i]; 
    }

    // copy temp back into currDiatonicScale, 
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[i];
    }          
}

function getBebopHalfDim(){
    // (ie, bebop half-diminished)    
    // method: get locrian and add a nat 5 
    setMaScale(); // note: Bebop Scale is already tagged by mode 7 

    var offset = 7; // bebop note is located at this offset from root
    var bebopNote = getBebopNote(offset);

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale    
    var sizeNeeded = 8;
    setCurrDiatonicSize(sizeNeeded); 
    
    // copy currDiatonicScale into temp container, adding bebopNote
    var i;
    var tempDiatonic = [];
    for( i = 0; i < currDiatonicScale.length; i++ ){
        if( i == 5 )
            tempDiatonic[i] = bebopNote; 
        else if( i > 5 ) 
            tempDiatonic[i] = currDiatonicScale[i - 1];         
        else
            tempDiatonic[i] = currDiatonicScale[i]; 
    }

    // copy temp back into currDiatonicScale, 
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[i];
    }             
}

function setBluesScale(){
    // method: get dorian, add a #4 (or b6), remove the 2nd and 6th
    setMaScale(); // note: blues scale is already tagged by mode 2

    var offset = 6; // bebop note is located at this offset from root
    var bluesNote = getBebopNote(offset);
 
    // get the b7 tone of currDiatonicScale before you resize it
    var b7 = currDiatonicScale[6];

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale
    var sizeNeeded = 6;
    setCurrDiatonicSize(sizeNeeded); 
    
    // dorian: C D Eb F    G A Bb
    // blues:  C   Eb F Gb G   Bb 
    // copy currDiatonicScale into temp container, adding bebopNote
    var i;
    var tempDiatonic = [];

    for( i = 0; i < currDiatonicScale.length; i++ ){
        if( i == 1 || i == 2 )
             tempDiatonic[i] = currDiatonicScale[i + 1];  
        else if( i == 3 )  
            tempDiatonic[i] = bluesNote; 
        else if ( i == 5 )
            tempDiatonic[i] = b7;
        else // i = 0 || i == 4
            tempDiatonic[i] = currDiatonicScale[i];
    }
    // copy temp back into currDiatonicScale, 
    for( i = 0; i < tempDiatonic.length; i++ ){
        currDiatonicScale[i] = tempDiatonic[i];
    }      
}

function setPentScale(){
    if( chordScale.scale == "Major Pentatonic" ){ 
        // method: get ionian, remove 4th and 7th        
        // (major pentatonic is already tagged with mode 1)
        
        setMaScale(); // get ionian

        var ma6 = currDiatonicScale[5]; // save 6th tone before resizing the scale

        // make sure currDiatonicScale is the correct size
        // note: make sure to set this size AFTER pulling back blues scale
        var sizeNeeded = 5;
        setCurrDiatonicSize(sizeNeeded); 

        // modify currDiatonicScale to get rid of 4th and 7th
        for( i = 0; i < currDiatonicScale.length; i++ ){
            if( i == 3 )
                 currDiatonicScale[i] = currDiatonicScale[i + 1];  
            else if( i == 4 )  
                currDiatonicScale[i] = ma6; 
        }        
    }
    else if( chordScale.scale == "Minor Pentatonic" ){
        // method: get blues, remove #4/b6
        // (minor pentatonic is already tagged with mode 2) 

        setBluesScale(); // get blues

        var b7 = currDiatonicScale[5]; // save b7 before resizing the scale

        // make sure currDiatonicScale is the correct size
        // note: make sure to set this size AFTER pulling back blues scale
        var sizeNeeded = 5;
        setCurrDiatonicSize(sizeNeeded); 

        // modify currDiatonicScale to get rid of #4/b6 tone
        for( i = 0; i < currDiatonicScale.length; i++ ){
            if( i == 3 )
                 currDiatonicScale[i] = currDiatonicScale[i + 1];  
            else if( i == 4 )  
                currDiatonicScale[i] = b7; 
        }
    }
}
function setMelMiScale(){
    // if mode == 3, change the root so that you can get correct ma scale
    var root = chordScale.root;
    var key = chordScale.key;
    var i; // index

    // set currChromScale and currDiatonicScale based on 
    setMaScale();

    // make sure currDiatonicScale is the correct size
    // note: make sure to set this size AFTER pulling back major scale    
    var sizeNeeded = 7;
    setCurrDiatonicSize(sizeNeeded);     

    // modify the currChromScale for 5 cases:
    var old = "";
    var nu = "";
    if( key == "G" ){ 
        old = "A#";
        nu = "Bb";
    }
    else if( key == "Cb" ){ 
        old = "D";
        nu = "Ebb";
    }
    else if( key == "Gb" ){ 
        old = "A";
        nu = "Bbb";
    }
    else if( key == "Db" ){ 
        old = "E";
        nu = "Fb";
    }
    else if( key == "Ab" ){ 
        old = "B";
        nu = "Cb";
    }
    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i] == old ){ 
            currChromScale[i] = nu;
            i = currChromScale.length;
        }
    } 

    // identify offsets to be used for locating the 3rd within currChromaticScale
    if( mode == "1" ) offset = 3;
    else if( mode == "2" ) offset = 1;
    else if( mode == "3" ) offset = 11;
    else if( mode == "4" ) offset = 10;
    else if( mode == "5" ) offset = 8;
    else if( mode == "6" ) offset = 6;
    else if( mode == "7" ) offset = 4;
    
    // use the correct 3rd from currChrom to replace the bad 3rd in currDiatonic;
    // first, find the root in currChromScale:
    var i; 
    var loc;
    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i] == root ) loc = i;
    }
    // next, find the correct b3rd for the current mode:
    var b3rd;
    for( i = 0; i < offset; i++ ){
        if ( ( loc + 1 ) > ( currChromScale.length - 1 ) ){
            loc = 0;
        }        
        else
            loc++;
        b3rd = currChromScale[loc];
    }
    // next, replace the 3rd in currDiatonic
    if( mode == "1" ) currDiatonicScale[2] = b3rd;
    if( mode == "2" ) currDiatonicScale[1] = b3rd;
    if( mode == "3" ) currDiatonicScale[0] = b3rd;
    if( mode == "4" ) currDiatonicScale[6] = b3rd;
    if( mode == "5" ) currDiatonicScale[5] = b3rd;
    if( mode == "6" ) currDiatonicScale[4] = b3rd;
    if( mode == "7" ) currDiatonicScale[3] = b3rd;

    // finally, if mode == "3", update chordScale.root = b3rd;
    if( mode == "3" )
        chordScale.root = b3rd;
}

function setHarmMiScale(){
    // methodology: get melodic minor, then mod 6->b6
    // get melodic minor-
    setMelMiScale(); 

    // restore chordScale root for mode 6
    var mode = chordScale.mode;    
    if( mode == "6" ){
        var i;
        for( i = 0; i < harmMiMode6RootLookup.length; i++ ){
            if( harmMiMode6RootLookup[i] == chordScale.root ){
                chordScale.root = harmMiMode6RootConvert[i];
                break;                
            }
        }
    }

    // modify currChromScale for keys G and D
    if( chordScale.key == "G" ){
        for( i = 0; i < currChromScale.length; i ++ ){
            if( currChromScale[i] == "D#" ) currChromScale[i] = "Eb";
        }
    }
    else if( chordScale.key == "D" ){
         for( i = 0; i < currChromScale.length; i ++ ){
            if( currChromScale[i] == "A#" ) currChromScale[i] = "Bb";
        }       
    }

    // identify offsets to be used for locating the b6 within currChromaticScale
    var offset;
    if( mode == "1" ) offset = 8;    
    else if( mode == "2" ) offset = 6;
    else if( mode == "3" ) offset = 5;
    else if( mode == "4" ) offset = 3;
    else if( mode == "5" ) offset = 1;
    else if( mode == "6" ) offset = 0;
    else if( mode == "7" ) offset = 9;    

    // get loc of root in currChromScale
    var loc;
    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i] == chordScale.root ) loc = i;    
    }
    // next, use offset and loc to find correct b6 for the current mode:
    var b6;
    for( i = 0; i < offset; i++ ){        
        if( ( loc + 1 ) > ( currChromScale.length - 1 ) ){
            loc = 0;
        }        
        else
            loc++;
        b6 = currChromScale[loc];   
    }    

    // next, replace the b6 in currDiatonic
    if( mode == "1" ) currDiatonicScale[5] = b6;
    if( mode == "2" ) currDiatonicScale[4] = b6;
    if( mode == "3" ) currDiatonicScale[3] = b6;
    if( mode == "4" ) currDiatonicScale[2] = b6;
    if( mode == "5" ) currDiatonicScale[1] = b6;
    if( mode == "6" ) currDiatonicScale[0] = chordScale.root;
    if( mode == "7" ) currDiatonicScale[6] = b6;
}

function setHarmMaScale(){
    // methodology: get major, then mod 6->b6
    // get major
    setMaScale(); 

    // restore chordScale root for mode 6 (use the harmMi lookups) 
    var mode = chordScale.mode;    
    if( mode == "6" ){
        var i;
        for( i = 0; i < harmMiMode6RootLookup.length; i++ ){
            if( harmMiMode6RootLookup[i] == chordScale.root ){
                chordScale.root = harmMiMode6RootConvert[i];
                break;                
            }
        }
    }

    // modify currChromScale for keys G and D
    if( chordScale.key == "G" ){
        for( i = 0; i < currChromScale.length; i ++ ){
            if( currChromScale[i] == "D#" ) currChromScale[i] = "Eb";
        }
    }
    else if( chordScale.key == "D" ){
         for( i = 0; i < currChromScale.length; i ++ ){
            if( currChromScale[i] == "A#" ) currChromScale[i] = "Bb";
        }       
    }

    // identify offsets to be used for locating the b6 within currChromaticScale
    var offset;
    if( mode == "1" ) offset = 8;    
    else if( mode == "2" ) offset = 6;
    else if( mode == "3" ) offset = 4;
    else if( mode == "4" ) offset = 3;
    else if( mode == "5" ) offset = 1;
    else if( mode == "6" ) offset = 0;
    else if( mode == "7" ) offset = 9;    

    // get loc of root in currChromScale
    var loc;
    for( i = 0; i < currChromScale.length; i++ ){
        if( currChromScale[i] == chordScale.root ) loc = i;    
    }
    // next, use offset and loc to find correct b6 for the current mode:
    var b6;
    for( i = 0; i < offset; i++ ){        
        if( ( loc + 1 ) > ( currChromScale.length - 1 ) ){
            loc = 0;
        }        
        else
            loc++;
        b6 = currChromScale[loc];   
    }    

    // next, replace the b6 in currDiatonic
    if( mode == "1" ) currDiatonicScale[5] = b6;
    if( mode == "2" ) currDiatonicScale[4] = b6;
    if( mode == "3" ) currDiatonicScale[3] = b6;
    if( mode == "4" ) currDiatonicScale[2] = b6;
    if( mode == "5" ) currDiatonicScale[1] = b6;
    if( mode == "6" ) currDiatonicScale[0] = chordScale.root;
    if( mode == "7" ) currDiatonicScale[6] = b6;
}

function setDblHarmMaScale(){
    // method: get harmMa and then flat the 2nd

    // to be implemented in a future rollout
}

