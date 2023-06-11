// Scene 2: Car Repair
class Play_2 extends Phaser.Scene{
    constructor(){
        super("playScene2");
    }

    create(){

        let w = game.config.width;
        let h = game.config.height;

        // Set up Camera
        this.cameras.main.setViewport(0, 0, w,h);
        this.camera = this.cameras.add(0, 0, w,h);

        // Set up timer text
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            lineSpacing: 20,
            wordWrap: { width: 500, useAdvancedWrap: true, spacing: 10 }
        }

        this.timerText = this.add.text(w - 128, 64, this.timer, timerConfig).setOrigin(0.5);

        // Start Timer
        this.timerLength = 20000;

        // When timer ends trigger play.onGameTimerend
        this.timedEvent = this.time.addEvent({  
            delay: this.timerLength, 
            callback: this.onGameTimerend,
            args: [this],
            loop: false,
            repeat: 0,
            timeScale: 1,
            paused: true
        });
       
        // Pre-define Target Spots
        this.spots = [[490,122],[488,372],[686,244],[292,244],[94,123]]
        this.spotIndex = 0; // Tracks what target coordinate is next

        // Set up order for car parts
        this.carParts = ['car_base','car_top','car_door','car_left','car_right']
        
        // Set up Environment
        this.add.image(0,0,'background_2').setOrigin(0).setDepth(-1);
        this.add.image(w/2,h,'box_2').setOrigin(0.5,0.9).setDepth(1);

        // Set up pictures and targets groups
        let config = {
            classType: Phaser.Physics.Arcade.Sprite,
            runChildUpdate: true
        }; 
        
        this.pictures = this.add.group(config);
        this.target = this.add.group(config);

        // Create first photo
        this.pictures.add(new Placeable(this,299/2,h-40,this.photos[this.spotIndex]));

        // Set up drag based input on pictures
        this.input.on('gameobjectdown', (pointer, gameObject) =>
        {
            gameObject.setHeldDown(true);
        });

        this.input.on('gameobjectup', (pointer, gameObject) =>
        {
            gameObject.setHeldDown(false);
        });

        // Create first Target
        this.target.add(new Target(this,this.spots[this.spotIndex][0],this.spots[this.spotIndex][1],'car_base_target').setOrigin(0).setDepth(-1));

    }

    update(){

        let w = game.config.width;
        let h = game.config.height;

        // Check if pictures and targets collide, if they do run play.collision
        this.physics.world.collide(this.pictures, this.target, this.collision, null, this);

        // Update Timer with current progress
        this.timerText.setText(`Time: ${Math.floor(this.timedEvent.getRemainingSeconds()).toString()}`);

        // If no target, create new target
        if(this.target.getLength() == 0){
            this.spotIndex += 1

            if(this.spotIndex < this.spots.length){
                this.target.add(new Target(this,this.spots[this.spotIndex][0],this.spots[this.spotIndex][1],'car_base_target').setOrigin(0).setDepth(-1));
            }
            
            // Create new picture
            this.pictures.add(new Placeable(this,299/2,h-40,this.photos[this.spotIndex]));
        }
    }

    // Runs when a picture and target collide
    collision(picture,target){

        // Trigger pictures onHit method to attach picture
        picture.onHit(target);

        this.timedEvent.paused = false;
    }

    // Runs when game timer ends
    onGameTimerend(mainThis){
        mainThis.camera.fadeOut(5000, 0.5, 0, 0);

        mainThis.camera.on('camerafadeoutcomplete', () =>{
            mainThis.scene.start("Scene2_Title");
        })
    }
}