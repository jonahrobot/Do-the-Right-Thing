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
        this.title = this.add.text(2*(w/4.5), h/4, 'Do the Right Thing', menuConfig).setOrigin(0);
        menuConfig.fontSize = '20px'
        this.main = this.add.text(2*(w/4.5), h/2.5, 'A Spike Lee classic where misunderstandings and racist ideologies cross to create a tragedy that affects all involved.', menuConfig).setOrigin(0);
        menuConfig.fontSize = '28px'
        this.add.text(2*(w/4.5), h-100, '-> to continue', menuConfig).setOrigin(0);

    }

    // Check for right key input
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            if(this.index == 0){
                this.title.text = "Scene 1"
                this.main.text = "You play as Sal, a Italian American Restaurant owner setting up his wall of Fame. You will notice a lack of room for non Italian Americans, which builds the center conflict of the story."
            }
            if(this.index == 1){
                this.scene.start('playScene');
            }
            this.index += 1;
        }
    }
}