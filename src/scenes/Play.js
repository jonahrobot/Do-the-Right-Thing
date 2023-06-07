class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    create(){

        let w = game.config.width;
        let h = game.config.height;

        // Timer Font
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            lineSpacing: 20,
            wordWrap: { width: 500, useAdvancedWrap: true, spacing: 10 }
        }

        this.timer = 6000;
        this.initTime = this.time.now;

        // Pre Define Target Spots
        this.spots = [[490,122],[488,372],[686,244],[292,244],[94,123]]
        this.spotIndex = 0;

        // Create array of photos
        this.photos = ['photo_1','photo_2','photo_3','photo_4','photo_5','photo_6']
        
        // Create Background
        this.add.image(0,0,'spr_background_1').setOrigin(0).setDepth(-1);
        this.add.image(299/2,h,'box').setOrigin(0.5,0.9).setDepth(1);

        // Create Groups
        let config = {
            classType: Phaser.Physics.Arcade.Sprite,
            runChildUpdate: true
        }; 
        
        this.pictures = this.add.group(config);
        this.target = this.add.group(config);

        // Create Photos
        this.pictures.add(new Picture(this,299/2,h-40,this.photos[this.spotIndex]));
        //this.pictures.add(new Picture(this,100,h/4,'photo_2'));

        // Set up Input
        this.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            gameObject.setHeldDown(true);
        });

        this.input.on('gameobjectup', (pointer, gameObject) =>
        {
            gameObject.setHeldDown(false);
        });

        // Create Target
        this.target.add(new Target(this,this.spots[this.spotIndex][0],this.spots[this.spotIndex][1],'photo_spot').setOrigin(0).setDepth(-1));
    
        this.timerText = this.add.text(w - 64, 64, this.timer, timerConfig).setOrigin(0.5);
    }

    update(){

        let w = game.config.width;
        let h = game.config.height;

        // Finally, Check for collisions

        this.physics.world.collide(this.pictures, this.target, this.collision, null, this);

        this.timer = Math.floor(this.timer) - Math.floor((this.time.now-this.initTime)/1000);
        this.timerText.text = this.timer;

        // No target, create new target
        if(this.target.getLength() == 0){
            this.spotIndex += 1

            if(this.spotIndex < this.spots.length){
                this.target.add(new Target(this,this.spots[this.spotIndex][0],this.spots[this.spotIndex][1],'photo_spot').setOrigin(0).setDepth(-1));
            }
            
            // Create new picture
            this.pictures.add(new Picture(this,299/2,h-40,this.photos[this.spotIndex]));
        }
    }

    collision(picture,target){
        picture.onHit(target);
    }
}