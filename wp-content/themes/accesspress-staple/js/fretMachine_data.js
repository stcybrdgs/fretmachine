/*************************************************************
*    Data: lookup arrays to help createScaleFunctions
**************************************************************/
// lookup tables for processing key signatures and diatonic scales;
// note: for the maChromVersion array, the following definitions apply:
// cf  -> chromFlat, ie use the chromFlat version of the scale
// cs  -> chromSharp, ie use the chromSharp version of the scale
// cf1 -> modify the scale by changing B to Cb
// cf2 -> modify the scale by changing B to Cb and E to Fb
// cs1 -> modify the scale by changing E to E#
// cs2 -> modify the scale by changing E to E# and B to B#
var maKeysMode1 = ["G","D","A","E","B","F#","C#","Cb","Gb","Db","Ab","Eb","Bb","F","C"];
var maKeysMode2 = ["A","E","B","F#","C#","G#","D#","Db","Ab","Eb","Bb","F","C","G","D"];
var maKeysMode3 = ["B","F#","C#","G#","D#","A#","E#","Eb","Bb","F","C","G","D","A","E"];
var maKeysMode4 = ["C","G","D","A","E","B","F#","Fb","Cb","Gb","Db","Ab","Eb","Bb","F"];
var maKeysMode5 = ["D","A","E","B","F#","C#","G#","Gb","Db","Ab","Eb","Bb","F","C","G"];
var maKeysMode6 = ["E","B","F#","C#","G#","D#","A#","Ab","Eb","Bb","F","C","G","D","A"];
var maKeysMode7 = ["F#","C#","G#","D#","A#","E#","B#","Bb","F","C","G","D","A","E","B"];
var maResetMode1 = ["A#","B#","D#","E#","Fb","G#"];
var maResetMode2 = ["A#","B#","Cb","E#","Fb","Gb"];
var maResetMode3 = ["Ab","B#","Cb","Db","Fb","Gb"];
var maResetMode4 = ["A#","B#","C#","D#","E#","G#"];
var maResetMode5 = ["A#","B#","Cb","D#","E#","Fb"];
var maResetMode6 = ["B#","Cb","Db","E#","Fb","Gb"];
var maResetMode7 = ["Ab","Cb","Db","Eb","Fb","Gb"];
var maEnharmonicLookup  = ["A#","B#","D#","E#","Fb","G#","Cb","Gb","Ab","Db","C#","Eb"];
var maEnharmonicConvert = ["Bb","C","Eb","F","E","Ab","B","F#","G#","C#","Db","D#"];
var melMiMode3RootLookup = ["C","F","Bb","Eb","Ab","Db","Gb","B","E","A","D","G","Cb","C#","F#"];
var melMiMode3RootConvert = ["C#","F#","B","E","A","D","G","C","E#","A#","D#","G#","C","D","G"];
var chromVersion = ["cs","cs","cs","cs","cs","cs1","cs2","cf2","cf1","cf","cf","cf","cf","cf","cf"];
var harmMiMode6RootLookup = ["C#","F#","B","E","A","D","G","C","F","A#","D#","G#","D","G","C"];
var harmMiMode6RootConvert = ["C","F","Bb","Eb","Ab","Db","Gb","B","E","A","D","G","C#","F#","Cb"];
var chromSharp = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var chromFlat = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
var maSpelling = "2212221"    
var currChromScale = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
var currDiatonicScale = [];
var currChromScaleNums = ["1","b9","9","b3","3","4","b5","5","b6","6","b7","7"];
var currDiatonicScaleNums = [];
var currChord = [];
//var adHocNoteVal = [];
//var adHocNoteClass = [];
var chordScale = {cat:"", root:"", chord:"", scale:"", type:"", mode:"", key:""};


/*************************************************************
*    Data: Arrays to populate the chord menus
**************************************************************/
// chord menus
var majorChords = ["&#916;","&#916;+4","&#916;+5","&#916;b6"];
var minorChords = ["&ndash;7","&ndash;6","&ndash;&#916;7","&ndash;&#916;7b6","&ndash;7b9b6","&ndash;7b6","&ndash;7+11"];
var dom7Chords = ["7","7sus4b9","7+4","7+","7+9","7b6","7b9"];
var dimChords = ["&#1054"];
var halfDimChords = ["&#8709;","&#8709;#2"];


/*************************************************************
*    Data: Arrays to populate the scale menus;
**************************************************************/
// scale menus: Major
//
var majorScales = ["Bebop Major","Blues","Diminished HW","Hungarian Major","Ionian","Major Pentatonic"];
var majorS4Scales = ["Lydian"];
var majorS5Scales = ["3rd mode Harmonic Minor","Augmented","Lydian Augmented","Lydian Augmented #2"];
var majorB6Scales = ["Harmonic Major"];
var majorArray = [majorScales, majorS4Scales, majorS5Scales, majorB6Scales];

// scale menus: Minor
//
var minor7Scales = ["Bebop Minor","Blues","Diminished WH","Dorian","Minor Pentatonic"];
var minor6Scales = ["Bebop Minor No. 2"];
var minorMa7Scales = ["Lydian Diminished","Melodic Minor"];
var minorMa7b6Scales = ["Harmonic Minor"];
var minor7b9b6Scales = ["Phrygian"];
var minor7b6Scales = ["Aeolian"];
var minor7S11Scales = ["Dorian #4"];
var minorArray = [minor7Scales,minor6Scales,minorMa7Scales,minorMa7b6Scales,minor7b9b6Scales,minor7b6Scales,minor7S11Scales];

// scale menus: Dom7
//
var dom7Scales = ["Bebop Dominant","Blues","Major Pentatonic","Mixolydian"];
var dom7sus4b9Scales = ["Bebop Dominant","Mixolydian","Susb9"];
var dom7S4Scales = ["Lydian Dominant"];
var dom7S5Scales = ["Whole Tone"];
var dom7S9Scales = ["Diminished Whole Tone"];
var dom7b6Scales = ["Hindu"];
var dom7b9Scales = ["Diminished HW","Mixolydian b9","Spanish","Super Phrygian"];
var dom7Array = [dom7Scales,dom7sus4b9Scales,dom7S4Scales,dom7S5Scales,dom7S9Scales,dom7b6Scales,dom7b9Scales];

// scale menus: Diminished
//
var dimScales = ["Diminished WH","Locrian b4 bb7","Locrian Diminished 7"];

// scale menus: Half Diminished
//
var halfDimScales = ["Bebop Scale","Locrian","Locrian nat6"];
var halfDimS2Scales = ["Dorian b5","Locrian #2"];
var halfDimArray = [halfDimScales,halfDimS2Scales];


/*************************************************************
*    Data: Arrays to look up modes and types based on names
**************************************************************/
// modes and types: Major
//
var maScaleName = ["3rd mode Harmonic Minor","Augmented","Bebop Major","Blues","Diminished HW","Harmonic Major","Hungarian Major","Ionian","Lydian","Lydian Augmented","Lydian Augmented #2","Major Pentatonic"];
var maScaleType = ["harmMi","aug","bebop","blues","dim","harmMa","harmMi","ma","ma","melMi","harmMa","pent"];
var maScaleMode = ["3","1","1","2","2","1","6","1","4","3","6","1"];

// modes and types: Minor
//
var miScaleName = ["Aeolian","Bebop Minor","Bebop Minor No. 2","Blues","Diminished WH","Dorian","Dorian #4","Harmonic Minor","Lydian Diminished","Melodic Minor","Minor Pentatonic","Phrygian"];
var miScaleType = ["ma","bebop","bebop","blues","dim","ma","harmMi","harmMi","harmMa","melMi","pent","ma"];
var miScaleMode = ["6","2","1","2","1","2","4","1","4","1","2","3"];

// modes and types: dom7
//
var dom7ScaleName = ["Bebop Dominant","Bebop Dominant","Blues","Diminished HW","Diminished Whole Tone","Hindu","Lydian Dominant","Major Pentatonic","Mixolydian","Mixolydian","Mixolydian b9","Spanish","Super Phrygian","Susb9","Whole Tone"];
var dom7ScaleType = ["bebop","bebop","blues","dim","melMi","melMi","melMi","pent","ma","ma","harmMa","harmMi","harmMa","melMi","wt"];
var dom7ScaleMode = ["5","5","2","1","7","5","4","1","5","5","5","5","3","2","5"];

// modes and types: Diminished
//
var dimScaleName = ["Diminished WH","Locrian b4 bb7","Locrian Diminished 7"];
var dimScaleType = ["dim","harmMi","harmMa"];
var dimScaleMode = ["1","7","7"];

// modes and types: Half Diminished
//
var halfDimScaleName = ["Bebop Scale","Dorian b5","Locrian","Locrian #2","Locrian nat6"];
var halfDimScaleType = ["bebop","harmMa","ma","melMi","harmMi"];
var halfDimScaleMode = ["7","2","7","6","2"];

/*************************************************************
*    Data: Arrays to look up dimWh / dimHW scales based on root
**************************************************************/
var dim1 = ["Eb","F","F#","G#","A","B","C","D"];
var dim2 = ["D","E","F","G","Ab","Bb","B","C#"];
var dim3 = ["Db","Eb","E","F#","G","A","Bb","C"];

var rootDimWH = ["Eb","F#","A","C","D","F","Ab","B","Db","E","G","Bb"];
var rootDimHW = ["F","G#","B","D","E","G","Bb","C#","Eb","F#","A","C"];
var dimVersion = [dim1,dim1,dim1,dim1,dim2,dim2,dim2,dim2,dim3,dim3,dim3,dim3];

/*************************************************************
*    Data: Arrays to look up augmented scales based on root
**************************************************************/
var aug1 = ["C","D#","E","G","Ab","B"]; 
var aug2 = ["Db","E","F","G#","A","C"]; 
var aug3 = ["D","F","F#","A","Bb","C#"];
var aug4 = ["Eb","F#","G","A#","B","D"];
var rootAug = ["C","E","Ab","Db","F","A","D","F#","Bb","Eb","G","B"];
var augVersion = [aug1,aug1,aug1,aug2,aug2,aug2,aug3,aug3,aug3,aug4,aug4,aug4];