class Scene2_Title extends Phaser.Scene{
    constructor(){
        super("Scene2_Title");
    }

    preload(){
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
        this.title = this.add.text(2*(w/4.5), h/4, 'Scene 2', menuConfig).setOrigin(0);
        menuConfig.fontSize = '20px'
        this.main = this.add.text(2*(w/4.5), h/2.5, 'This scene depicts a moment in the movie where a rich Italian tourist gets into a argument with local kids. It ends in his car being sprayed down with water damaging its finish.', menuConfig).setOrigin(0);
        menuConfig.fontSize = '28px'
        this.add.text(2*(w/4.5), h-100, '-> to continue', menuConfig).setOrigin(0);

    }

    // Check for right key input
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            this.scene.start('playScene');
        }
    }
}