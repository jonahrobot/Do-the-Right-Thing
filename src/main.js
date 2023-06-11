/*

Name: Jonah Ryan
Game: Do the Right Thing
Hours spent: 35

Components Used: Tween, Timer, Text Objects, Arcade Physics, Cameras

*/

let config = {
    type: Phaser.CANVAS,
    width: 940,
    height: 580,
    backgroundColor: '#000000',
    roundPixels: true,
    pixelArt: false,
    autoCenter: true,
    physics: {
      default: 'arcade',
      arcade: {
          debug: false,
          gravity: {
              x: 0,
              y: 0
          }
      }
    },
    scene: [Loading, Scene1_Title, Play_1, Scene2_Title, Play_2,Scene3_Title,Play_3,ending]
  }

let game = new Phaser.Game(config);
