//////////////////////////////////////////////////////////////////////////////////////////
                                        //SPACE BATTLE//
//////////////////////////////////////////////////////////////////////////////////////////
                                    ///////////////////////
const battleWinCheck = badGuy => {
  if (badGuy.hull <= 0) {
    console.log("You blew up " + badGuy.name + " Nice job!");
    victory();
  } else {
    console.log("keep shooting nice attack keep playing");
  }
};

// Funinction will check if game is over by using a conditional -- if yes console.log  oh joy ---
//else - if not over have next alien ship in [ bad guys ] attack you

const didIWin = () => {
  if (badGuys[0] === "dead") {
    // this is working now
    console.log("%c Congrats there winner winner chicken dinner for you!", "font-size:18px; background:darkgreen; color:white; border: 4px dashed gold;");
    console.log("Awesome job playing you won !!!! Click the link on the page to refresh and play again");
  } else {
    console.log("%c ... There are still aliens left to kill ...", "background:red; color:white;");
    console.log("%c .. Look out here comes one now ..", "background: lightyellow; color:red; font-size:15px;");
    if (badGuys[3] === "dead") {
      badGuys[0].attack(youHero);
    } else {
      badGuys[0].fight(youHero); /// al#5 al#6 and al#7 will use more powerful missles
      ///    to attack you they have unlimited shots so I upgraded hull fix to 3 times so can win  .........
    }
  }
};

// lets make it so a bad guy ship can be destroyed
//if ship hull <= 0 remove first with splice add "dead"
//to the end of badGuys array when first ship in  array = "dead" then game over you got em all!

const victory = () => {
  if (badGuys[0].hull <= 0) {
    console.log("%c !! Awesome !!.. you destroyed the alien ship ..!!", "background:orange; font-size:18px; border:3px solid green; color:white;");
    badGuys[badGuys.length] = "dead";
    badGuys.splice(0, 1);
    didIWin();
  } else {
    console.log("%c .. Good shot but they are still alive ..", "background:lightyellow; font-size:15px; color:red;");
    didIWin();
  }
};

// Defeat function -- indicates the game is over and to refresh the page to restart
const defeat = youHero => {
  if (youHero.hull <= 0) {
    console.log("%c Game over you are dead.... Sorry - refresh the page to play again", "font-size:18px; background:darkgreen; color:white; border: 4px dashed gold;");
    console.log(` Oh No your ship blew up ! The ${youHero.name} is gone! Refresh the page to try again Captian! Good thing it was just a simulation...`);
  } else {
    console.log("%c .. Your turn now captian enter your move below .. ", "background:lightskyblue; color:black; font-size:20px;");
  }
};

// Missle array to limit big shots outside construcor
this.myMissles = ["M", "M", "M", "M", "M", "M"];
/// none left to shoot when myMissles = ["o","o","o","o","o","o","o",etc...];

// hero ship constructor below
class Hero {
  constructor(name, hull, accuracy) {
    this.name = name;
    this.hull = hull || 20;
    this.accuracy = accuracy || 0.7;
    this.weapons = {
      lasers: 5,
      missles: myMissles.length
    };
  }
  announceHealth() {
    console.log("I am" + this.name + "my shields are now " + this.hull);
  }
  attack(badGuy) {
    if (this.hull >= 1) {
      //attack with missles if you are still alive
      if (badGuy.name === badGuys[0].name) {
        // attack the right bad guy
        if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
          // above random to determine if hit
          if (myMissles[0] == "M") {
            // can only use certian amount of missles
            console.log(this.name + " used  missles 10 hitpoints dealt");
            console.log(
              badGuy.name + " got hit with a missle, their health is down to"
            );
            console.log((badGuy.hull += -10));
            myMissles[myMissles.length] = "o";
            myMissles.splice(0, 1);
            victory(badGuy); // check if you destroted the ship or not and they or the next one returns fire
          } else {
            console.log("%c You are out of missles switch to lasers", "background:lightskyblue; color:black; font-size:18px;");
            // does not count as turn - could be typo
            console.log("%c Your turn captian enter your move below ..... ", "background:lightskyblue; color:red; font-size:22px;");
          }
        } else {
          console.log("%c You missed", "background:lightgray; color:red;");
          victory(badGuy); // you missed but that was your turn they get to shoot at you now
        }
      } else {
        console.log("%c What are you shooting at ? dead aliens or the wrong target - choose another target or refresh the page to play again", "background:black; color:white; font-size:20px;");
        console.log("%c ..... Your turn captian enter your move below ..... ", "background:lightskyblue; color:black; font-size:20px"); // if you target a dead alien or does not count as turn
      }
    } else {
      console.log("you are dead refresh the game to play again"); ///// if your hull is less than 1 and you are trying to attack still
    }
  }
  laser(badGuy) {
    if (this.hull >= 1) {
  // Attack with lasers if you are still alive
//following logic similiar to missle but no array to access for shot count
//since lasers are unlimited
      if (badGuy.name === badGuys[0].name) {
        if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
// Above random to determine if hit or not
          console.log(this.name + " used laser " + this.weapons.lasers + " hitpoints dealt");
          console.log(badGuy.name + " got hit with your - S - lasers, their health is down to");
          console.log((badGuy.hull += -this.weapons.lasers));
          victory(badGuy);
        } else {
          console.log("%c That shot was close but unfortunately you missed ", "background:lightskyblue; color:white; font-size:20px;");
          victory(badGuy);
        }
      } else {
        console.log("%c You have already destroyed the alien ship! Choose another target or refresh the page to play again", "background:black; color:white; font-size:20px;");
        console.log("%c It is still your turn now captian enter your move below ..... ", "background:lightskyblue; color:black; font-size:20px;");
      }
    } else {
      console.log("you are dead reset the game refresh the page to play again"); // Game has ended --- refresh page to play again.
    }
  }
}

// Hero ship(player) has been created
let youHero = new Hero(" USS NEWARK ");

// enemy ship constructor same as hero but evil alien
class Alienship {
  constructor(name) {
    this.name = name;
    this.hull = Math.floor(Math.random() * 4) + 3; // make random between 3 & 6
    this.firepower = Math.floor(Math.random() * 3) + 2; // make random between 2 & 4 for the alien lasers
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10; // make random between .6 and .8 -- hit accuracy
    this.weapons = {
      lazers: Math.floor(Math.random() * 3) + 2,
      mizzle: 7
    };
  }
  announceHealth() {
    console.log("We are the " + this.name + " our shields are now " + this.hull);
  }
  fight(youHero) {
    if (this.name === badGuys[0].name) {
      if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
    //    this.talkSmack();
        console.log(this.name + " used lazer " + this.weapons.lazers + " hitpoints dealt");
      //  console.log("%c ........ take that huumooonns! .......", "backgroundcolor:darkgreen; color:white;");
        console.log("%c We got hit by alien lazers our hull power is down to the tiny number on the next line... ", "background:lightskyblue; color:black; font-size:15px;");
        console.log((youHero.hull -= this.firepower));
        defeat(youHero); /// but did you die? also returns it to your move
      } else {
        console.log(this.name + " missed. Lucky us!"); /// so you know who shot at you-- who next target is
        console.log("good those alien scumbags missed us " + youHero.name + "took no damage. Hull power at " + youHero.hull); /// hit update for player
        defeat(youHero); /// returns to your move no damage dealt - live to fight another day
      }
    } else {
      console.log("dead aliens can't shoot"); // indiactor of dead alien. shoot next ship
      //return to your move
      defeat(youHero);
    }
  }
  // missles for the last 2 enemies
  attack(youHero) {
    if (this.name === badGuys[0].name) {
      if (Math.floor(Math.random() * Math.floor(9)) / 10 <= this.accuracy) {
        console.log(this.name + " used  missles with a z dealing 7 hit points to you ship..");
        console.log(youHero.name + " got hit with an alien Z * missle, their health is down to");
        console.log((youHero.hull += -7));
        defeat(youHero);
      } else {
        console.log(this.name + "  can not hit the side of a barn"); /// so you know who next target is when they appear but miss
        console.log("Ha! those aliens shoot like stormtroopers " + youHero.name + "took no damage. Hull power  =  " + youHero.hull); // you know they missed
        defeat(youHero); // no damage awesome but return to your move with this
      }
    } else {
      console.log("dead aliens can't shoot"); // This will be logged if the player continues to shoot the same object/dead alien
      //return to your move
      defeat(youHero);
    }
  }
}

// would need enemy ships in an array so they can be removed when dead.
//empty array = win game

let badGuys = [];

// need constructor function to push to empty bad-Guys array.
//// will build last bad guy first then each subsequent pushed before it into array
// construct in reverse order because I want ship 1 to be first target.
// The unshift() method adds one or more elements to the beginning of an array
//and returns the new length of the array.

badGuys.unshift((al7 = new Alienship("AL #7")));
badGuys.unshift((al6 = new Alienship("AL #6")));
badGuys.unshift((al5 = new Alienship("AL #5")));
badGuys.unshift((al4 = new Alienship("AL #4")));
badGuys.unshift((al3 = new Alienship("AL #3")));
badGuys.unshift((al2 = new Alienship("AL #2")));
badGuys.unshift((al1 = new Alienship("AL #1")));
// they are generated with random attributes

///// ********************************************************************** //////
                // The code below was created for storyline purposes

console.log("%c Welcome to the Space Battle! You are captian of the USS NEWARK!.", "font-size: 15px; background:black; border: 2px solid red; color:white;");
console.log("             ......You must destroy all of the aliens to win the game.....  ");
console.log(" You have unlimited lasers (weak) to fire but a limited number of missles (strong) you can fire.");
console.log("You can checkout the USS NEWARK by pressing the arrow below");
console.log(youHero);
console.log("There are 6 alien ships on our scanners and I don't think they are friendly... ");
console.log("You can see the scanner results below by clicking on the little arrow beside the (6) [Alienship, Alienship, ....] on the above line... ");
console.log(badGuys);
al1.fight(youHero); // the alien will shoot before you.
