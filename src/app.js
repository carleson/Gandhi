/**
 * Words of Gandhi
 *
 * Source: https://github.com/carleson/Gandhi
 *
 * This is a simple quote appliaction with random Mahatma Gandhi quotes.
 * http://www.brainyquote.com/quotes/authors/m/mahatma_gandhi.html
 *
 */

// DEBUGGING
var DEBUG = true;
var VERSION = 0.8;

// INCLUDES
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var Settings = require('settings');

// GLOBAL VARIABLES
var showSplashscreen = true;
var shakeSupport = true;
var splashscreenTimer = 0;
var Page = 0;
var Quotes = [
  "“Be the change you want to see in the world”",
  "“First they ignore you, then they laught at you, then they fight you, then you win”",
  "“Those who know how to think need no teachers”",
  "“There is more to life than increasing itś speed”",
  "”Where there is love there is life”",
  "”An eye for an eye will make the whole world blind”",
  "”Live as if you were to die tomorrow. Learn as if you were to live forever”",
  "”the best way to find yourself is to lose yourself in the service of others”",
  "”God has no religion”",
  "”Happiness is when what you think, what you say and what you do are in harmony”",
  "”Keep your thoughts positive - because your thoughts become your words”",
  "”Keep your words positive - because your words become your behavior”",
  "”Keep your behavior positive - because you behavior becomes your habits,”",
  "”Keep your habits positive - because your habits become your values”",
  "”Keep your values positive - because your values become your destiny”",
  "”Poverty is the worst form of violence”",
  "”Freedom is not worth having if it does not include the freedom to make mistakes”",
  "”Truth never damages a cause that is just”",
  "”It is health that is real wealth and not pieces of gold and silver”",
  "”My life is my message”",
  "”A nation's culture resides in the hearts and in the soul of its people”",
  "”If I had no sense of humor, I would long ago have committed suicide”",
  "”In a gentle way, you can shake the world”"
];

// CONFIGURATION
// WINDOWS
// EVENT LISTENERS
Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
  var url = 'http://carleson.github.io/Pebble/Gandhi/index.html';
  console.log('Showing configuration page: ' + url);

  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  //Save configuration
  Settings.data({
  name: 'Pebble',
  splashscreen: configData['splashscreen'],
  shake: configData['shake'], 
  backgroundColor: configData['background_color'],
  });
  
  if(DEBUG)
    {
      var options = Settings.data();
      console.log(JSON.stringify(options));       
    }
});

showSplashscreen = Settings.data('splashscreen');
shakeSupport = Settings.data('shake');

var wind = new UI.Window({ fullscreen: true });
var image = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: 'images/Gandhi.png'
});

if (showSplashscreen === true)
{
  if(DEBUG) console.log( "Display SplashScreen..." );
  wind.add(image);
  wind.show();
  splashscreenTimer = 2000;
}

var main = new UI.Card({
  title: 'Gandhi',
  icon: 'images/Gandhi28.png',
  subtitle: '',
  scrollable: true,
  body: GetQuotes()
});

setTimeout(function() {
  // Display the mainScreen
  main.show();
  // Hide the splashScreen to avoid showing it when the user press Back.
  if (showSplashscreen === true)
  {
    wind.hide();
  }
}, splashscreenTimer);

main.on('click', 'select', function(e) {
  main.body(GetQuotes());
  });

main.on('accelTap', function(e) {
   if (shakeSupport)
     {
       Vibe.vibrate('short');
       main.body(GetQuotes()); 
     }
  });

// UTILITY FUNCTIONS

function GetQuotes() {
  return Quotes[GetRandomPage()];
}

function GetRandomPage(){
  var number = 0;
  do {
       number = Math.floor((Math.random() * Quotes.length-1) + 1);
     }
  while (number == Page);
  Page = number;  
  return number;
}

function parseColor(color) {
	if (typeof color === 'number') {
		//make sure our hexadecimal number is padded out
		color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
	}
	return color;
};

function colourHexToName(colour)
{
    var colours = {"#f0f8ff":"aliceblue",
    "#faebd7":"antiquewhite",
    "#00ffff":"aqua",
    "#7fffd4":"aquamarine",
    "#f0ffff":"azure",
    "#f5f5dc":"beige",
    "#ffe4c4":"bisque",
    "#000000":"black",
    "#ffebcd":"blanchedalmond",
    "#0000ff":"blue",
    "#8a2be2":"blueviolet",
    "#a52a2a":"brown",
    "#deb887":"burlywood",
    "#5f9ea0":"cadetblue",
    "#7fff00":"chartreuse",
    "#d2691e":"chocolate",
    "#ff7f50":"coral",
    "#6495ed":"cornflowerblue",
    "#fff8dc":"cornsilk",
    "#dc143c":"crimson",
    "#00ffff":"cyan",
    "#00008b":"darkblue",
    "#008b8b":"darkcyan",
    "#b8860b":"darkgoldenrod",
    "#a9a9a9":"darkgray",
    "#006400":"darkgreen",
    "#bdb76b":"darkkhaki",
    "#8b008b":"darkmagenta",
    "#556b2f":"darkolivegreen",
    "#ff8c00":"darkorange",
    "#9932cc":"darkorchid",
    "#8b0000":"darkred",
    "#e9967a":"darksalmon",
    "#8fbc8f":"darkseagreen",
    "#483d8b":"darkslateblue",
    "#2f4f4f":"darkslategray",
    "#00ced1":"darkturquoise",
    "#9400d3":"darkviolet",
    "#ff1493":"deeppink",
    "#00bfff":"deepskyblue",
    "#696969":"dimgray",
    "#1e90ff":"dodgerblue",
    "#b22222":"firebrick",
    "#fffaf0":"floralwhite",
    "#228b22":"forestgreen",
    "#ff00ff":"fuchsia",
    "#dcdcdc":"gainsboro",
    "#f8f8ff":"ghostwhite",
    "#ffd700":"gold",
    "#daa520":"goldenrod",
    "#808080":"gray",
    "#008000":"green",
    "#adff2f":"greenyellow",
    "#f0fff0":"honeydew",
    "#ff69b4":"hotpink",
    "#cd5c5c":"indianred", 
    "#4b0082":"indigo",
    "#fffff0":"ivory",
    "#f0e68c":"khaki",
    "#e6e6fa":"lavender",
    "#fff0f5":"lavenderblush",
    "#7cfc00":"lawngreen",
    "#fffacd":"lemonchiffon",
    "#add8e6":"lightblue",
    "#f08080":"lightcoral",
    "#e0ffff":"lightcyan",
    "#fafad2":"lightgoldenrodyellow",
    "#d3d3d3":"lightgrey",
    "#90ee90":"lightgreen",
    "#ffb6c1":"lightpink",
    "#ffa07a":"lightsalmon",
    "#20b2aa":"lightseagreen",
    "#87cefa":"lightskyblue",
    "#778899":"lightslategray",
    "#b0c4de":"lightsteelblue",
    "#ffffe0":"lightyellow",
    "#00ff00":"lime",
    "#32cd32":"limegreen",
    "#faf0e6":"linen",
    "#ff00ff":"magenta",
    "#800000":"maroon",
    "#66cdaa":"mediumaquamarine",
    "#0000cd":"mediumblue",
    "#ba55d3":"mediumorchid",
    "#9370d8":"mediumpurple",
    "#3cb371":"mediumseagreen",
    "#7b68ee":"mediumslateblue",
    "#00fa9a":"mediumspringgreen",
    "#48d1cc":"mediumturquoise",
    "#c71585":"mediumvioletred",
    "#191970":"midnightblue",
    "#f5fffa":"mintcream",
    "#ffe4e1":"mistyrose",
    "#ffe4b5":"moccasin",
    "#ffdead":"navajowhite",
    "#000080":"navy",
    "#fdf5e6":"oldlace",
    "#808000":"olive",
    "#6b8e23":"olivedrab",
    "#ffa500":"orange",
    "#ff4500":"orangered",
    "#da70d6":"orchid",
    "#eee8aa":"palegoldenrod",
    "#98fb98":"palegreen",
    "#afeeee":"paleturquoise",
    "#d87093":"palevioletred",
    "#ffefd5":"papayawhip",
    "#ffdab9":"peachpuff",
    "#cd853f":"peru",
    "#ffc0cb":"pink",
    "#dda0dd":"plum",
    "#b0e0e6":"powderblue",
    "#800080":"purple",
    "#ff0000":"red",
    "#bc8f8f":"rosybrown",
    "#4169e1":"royalblue",
    "#8b4513":"saddlebrown",
    "#fa8072":"salmon",
    "#f4a460":"sandybrown",
    "#2e8b57":"seagreen",
    "#fff5ee":"seashell",
    "#a0522d":"sienna",
    "#c0c0c0":"silver",
    "#87ceeb":"skyblue",
    "#6a5acd":"slateblue",
    "#708090":"slategray",
    "#fffafa":"snow",
    "#00ff7f":"springgreen",
    "#4682b4":"steelblue",
    "#d2b48c":"tan",
    "#008080":"teal",
    "#d8bfd8":"thistle",
    "#ff6347":"tomato",
    "#40e0d0":"turquoise",
    "#ee82ee":"violet",
    "#f5deb3":"wheat",
    "#ffffff":"white",
    "#f5f5f5":"whitesmoke",
    "#ffff00":"yellow",
    "#9acd32":"yellowgreen"};

    return colours[colour.toLowerCase()];
}
// Prepare the accelerometer
if (shakeSupport) Accel.init();