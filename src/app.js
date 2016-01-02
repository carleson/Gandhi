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
var VERSION = 0.9;

// INCLUDES
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');
var Settings = require('settings');

// GLOBAL VARIABLES
var main;
var default_text_color = "#000000";
var default_background_color = "#ffffff"
var config_background_color;
var config_text_color;
var config_splashscreen = true;
var config_shake = true;
var splashscreenTimer = 0;
var Page = 0;
var colorHex;
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
  "”Keep your behavior positive - because you behavior becomes your habits”",
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
  if(DEBUG) console.log('Configuration page returned: ' + JSON.stringify(configData));

  //Save configuration
  Settings.data({
  name: 'Gandhi',
  splashscreen: configData['splashscreen'],
  shake: configData['shake'], 
  background_color:   configData['background_color'],
  text_color:   configData['text_color'],
  });
  
  if(DEBUG) displayConfig();
  LoadConfiguration();
  GetNewCard();
});

// CONFIGURATION
LoadConfiguration();

// WINDOWS
var wind = new UI.Window({ fullscreen: true });
var image = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: 'images/Gandhi.png'
});

if (config_splashscreen === true)
{
  if(DEBUG) console.log( "Display SplashScreen..." );
  wind.add(image);
  wind.show();
  splashscreenTimer = 2000;
}

  main = new UI.Card({
  title: 'Gandhi',
  icon: 'images/Gandhi28.png',
  subtitle: '',
  scrollable: true,
  backgroundColor: config_background_color,
  bodyColor: config_text_color,
  body: GetQuote()
});

setTimeout(function() {
  // Display the mainScreen
  main.show();
  // Hide the splashScreen to avoid showing it when the user press Back.
  if (config_splashscreen === true)
  {
    wind.hide();
  }
}, splashscreenTimer);

main.on('click', 'select', function(e) {
  GetNewCard();
  });

main.on('accelTap', function(e) {
   if (config_shake)
     {
       Vibe.vibrate('short');
       GetNewCard();
     }
  });

main.on('longSelect', function(e) {
  if(DEBUG) displayConfig();
});

// UTILITY FUNCTIONS

function LoadConfiguration()
{
  if(DEBUG) console.log( "Method call: LoadConfiguration()" );
  config_splashscreen = Settings.data('splashscreen');
  config_shake = Settings.data('shake');
  config_background_color = parseColor(Settings.data('background_color'));
  if (config_background_color == '') config_background_color = default_background_color
  
  config_text_color = parseColor(Settings.data('text_color'));
  if (config_text_color == '') config_text_color = default_text_color;
}

function GetNewCard() {
  if(DEBUG) console.log( "Method call: GetNewCard()" );
  main.body(GetQuote());
  main.backgroundColor(config_background_color);
  main.bodyColor(config_text_color);
}

function GetQuote() {
  if(DEBUG) console.log( "Method call: GetQuote()" );
  return Quotes[GetRandomPage()];
}

function GetRandomPage(){
    if(DEBUG) console.log( "Method call: GetRandomPage()" );
  var number = 0;
  do {
       number = Math.floor((Math.random() * Quotes.length-1) + 1);
     }
  while (number == Page);
  Page = number;  
  return number;
}

function parseColor(color) {
  if(DEBUG) console.log("Method call: parseColor()");
  if(DEBUG) console.log(color); 
  var fixed_color = '';
  if (typeof(color) != 'undefined' && color != null)
    {
      fixed_color = '#' + color.toString().slice(2);
      if(DEBUG) console.log(fixed_color);      
    }
  if(DEBUG) console.log( "Converting color: " + color + "into: " + fixed_color);
	return fixed_color;
};

function displayConfig()
{
  if(DEBUG) console.log( "Method call: displayConfig()" );
  console.log("------------------------------------------");
  console.log("Settings:");       
  var options = Settings.data();
  console.log(JSON.stringify(options));       
  console.log(" ");
  console.log("Variables:");
  console.log("Debug: " + DEBUG);
  console.log("Version: " + VERSION);
  console.log("default_text_color: " +  default_text_color);
  console.log("default_background_color: " +  default_background_color);
  console.log("config_background_color: " + config_background_color);
  console.log("config_text_color: " + config_text_color);
  console.log("config_splashscreen: " + config_splashscreen);
  console.log("config_shake: " + config_shake);
  console.log("splashscreenTimer: " + splashscreenTimer);
  console.log("------------------------------------------");
};


// Prepare the accelerometer
if (config_shake) Accel.init();