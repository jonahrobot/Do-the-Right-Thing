class Scene3_Title extends Phaser.Scene{
    constructor(){
        super("Scene3_Title");
    }

    preload(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    create(){

        let w = game.config.width;
        let h = game.config.height;

        this.index = 0;

        // Set up main menu font
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            lineSpacing: 20,
            wordWrap: { width: 500, useAdvancedWrap: true, spacing: 10 }
        }

        // Create Background 
        this.add.image(0,0,'spr_background_1').setOrigin(0.5).setScale(2).setDepth(-1);
        this.add.image(w/4.5,h/2,'movie_box').setOrigin(0.5).setScale(0.35);

        // Create menu text
        this.title = this.add.text(2*(w/4.5), h/4, 'Scene 3', menuConfig).setOrigin(0);
        menuConfig.fontSize = '20px'
        this.main = this.add.text(2*(w/4.5), h/2.5, 'In the ending of the movie Sal, the Italian American Pizza Chef, breaks the radio of Radio Raheem a pivotal character that expressed the movement of MLK in the movie. This scene ends violently and that part will not be depicted.', menuConfig).setOrigin(0);
        menuConfig.fontSize = '28px'
        this.add.text(2*(w/4.5), h-100, '-> to continue', menuConfig).setOrigin(0);

    }

    // Check for right key input
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            this.scene.start('playScene3');
        }
    }
}