// project.js - Story Generator using Fillers and a String Template
// Author: Brent Chou
// Date: 4/7/2024

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file


function main() {
  
  const fillers = {
    town: ["Loguetown", "Cocoyashi Village", "Syrup Village", "Orange Town", "Whisky Peak", "Water 7", "Ebisu Town", "Fusha Village", "Shimotsuki Village"],
    last_name: ["Monkey D.", "Roronoa", "Vinsmoke", "Kozuki", "Gol D.", "Nefertari", "Charlotte", "Donquixote", "Portgas D.", "Kurozumi", "Boa"],
    first_name: ["Luffy", "Shanks", "Ace", "Sabo", "Dragon", "Edward", "Bege", "Momonosuke", "Oden", "Vivi", "Bonney", "Hancock", "Rebecca"],
    famous_title: ["Crescent Moon Hunter", "King of the Pirates", "Sniper King", "the Demon King", "the Devil Child", "Heavenly Yaksha", "the Fire-Fist", "the Dragon Claw", "Light of the Revolution", "the Pirate Empress"],
    crew: ["Straw Hat Pirates", "Beast Pirates", "Barto Club", "Kidd Pirates", "Whitebeard Pirates", "Roger Pirates", "Heart Pirates", "Black Cat Pirates", "Fish-Man Pirates", "Sun Pirates", "Happo Navy"],
    bounty: ["10", "5,000,000", "3,400,000,000", "682", "4,570,000,000", "70,000,000", "1,110,000,000", "12,800,457,000", "1,000", "66,000,000", "13,000,000", "450,000,000"],
    first_mate: ["Pirate Hunter Roronoa Zoro", "Massacre Soldier Killer", "King the Conflageration", "Dark King Silvers Rayleigh", "Benn Beckman", "Aokiji", "Trafalgar Law, Surgeon of Death", "Eustass Captain Kidd"],
    crewmate_1: ["Cat Burglar Nami", "Soul King Brooke", "First Son of the Sea Jinbe", "Foxfire Kine'mon", "Bepo", "Oni Princess Yamato", "Vista of the Flower Swords", "Desert King Sir Crocodile"],
    crewmate_2: ["Nico Robin", "Cyborg Franky", "Vinsmoke Sanji", "Marco the Phoenix", "God Usopp", "Bartolomeo","Fujitora", "Koby the Hero", "Bartholomew Kuma", "Hawk Eyes Mihawk"],
    devil_fruit: ["Flame Flame Fruit", "Clear Clear Fruit", "Swim Swim Fruit", "Soul Soul Fruit", "Plume Plume Fruit", "Gum Gum Fruit", "Glare Glare Fruit", "Venom Venom Fruit", "Rumble Rumble Fruit"],
    villain: ["Blackbeard", "Big Mom", "Hundred Beast Kaido", "Fleet Admiral Akainu", "Gecko Moria", "Hody Jones", "Buggy the Clown", "Don Krieg", "Captain Kuro", "Fish Man Arlong", "Axe-Hand Morgan (Yes, his hand is really an axe...)"],
    one_liner: ["Are We Friends? Or Are We Foes? That’s The Kind Of Thing You Decide For Yourselves!", "I Am Going To Be The Pirate King!", "GIVE ME MEAT!", "You're in our way."],
    
  };
  
  const template = `"A Letter From the nearby Town Mayor"
  
  
  Dear $last_name $first_name, $famous_title!
  
  Thank you for saving $town! 
  
  I have never been fond of pirates, but maybe some do have good hearts. I have heard stories all about the $crew Crew and their $bounty Berry Bounty. 
  
  You and your friends are just as terrifying as the legends say. I am glad we can now count on you as an ally and can never repay what you have done for us.
  
  I know better than to mess with you, $first_mate, $crewmate_1, and $crewmate_2. Please take this as a token of our appreciation. (The Town Mayor attached this note to a treasure chest that reveals the $devil_fruit)
  
  We will be forever in your debt!
  
  
  -End Note
  
  
  
  Your victory is short-lived as you have immediately run into the infamous $villain just as you hit open water. You yell at your crew to prepare for battle and you announce "$one_liner"
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
  
}

// let's get this party started - uncomment me
main();