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
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000',
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
        this.spots = [[w/2,h/2],[503,230],[430,300],[240,340],[w*0.7,350]]
        this.spotIndex = 0; // Tracks what target coordinate is next

        // Set up order for car parts
        this.carParts = ['car_base','car_top','car_door','car_left','car_right']
        this.carTargets = ['car_base_target','car_top_target','car_door_target','car_left_target','car_right_target']
        
        // Set up Environment
        this.add.image(0,0,'background_2').setOrigin(0).setDepth(-1);
        this.add.image(w/2,h+48,'box_2').setOrigin(0.5,0.9).setDepth(1);
        this.add.image(w/2,h/2,'car_background').setOrigin(0.5).setDepth(-1);

        // Set up pictures and targets groups
        let config = {
            classType: Phaser.Physics.Arcade.Sprite,
            runChildUpdate: true
        }; 
        
        this.pictures = this.add.group(config);
        this.target = this.add.group(config);

        // Create first photo
        this.pictures.add(new Placeable(this,w/2,h-40,this.carParts[this.spotIndex]));

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
        this.target.add(new Target(this,
            this.spots[this.spotIndex][0],
            this.spots[this.spotIndex][1],
            this.carTargets[this.spotIndex]).setOrigin(0.5).setDepth(this.spots.length-this.spotIndex-1));

        // Track if items have fallen, don't respawn car parts if so
        this.itemsFell = false;

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

            // If there is more targets to create, add them using array spots information
            if(this.spotIndex < this.spots.length){
                this.target.add(new Target(this,
                    this.spots[this.spotIndex][0],
                    this.spots[this.spotIndex][1],
                    this.carTargets[this.spotIndex]).setOrigin(0.5).setDepth(this.spots.length-this.spotIndex-1));
            }else{
                this.pictures.getChildren().forEach(function(item) {
                   item.drop();
                }, this);
                this.itemsFell = true;
                this.spotIndex = -1;
            }
            
            // Create new picture
            if(this.itemsFell == false){
                this.pictures.add(new Placeable(this,w/2,h-100,this.carParts[this.spotIndex]));
            }
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