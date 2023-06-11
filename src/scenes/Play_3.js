// Scene 3: Ending fight
class Play_3 extends Phaser.Scene{
    constructor(){
        super("playScene3");
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
       
        // Pre-define Target Spots
        this.spotX = 490
        this.spotY = h*0.7;
        this.spotIndex = 0; // Tracks what target coordinate is next

        // Set up order for picture frames
        this.photos = ['pizza']
        
        // Set up Environment
        this.add.image(0,0,'spr_background_1').setOrigin(0.5).setDepth(-1).setScale(2);
        this.add.image(299/2,h*0.78,'box_3').setOrigin(0.5,0.9).setDepth(1);
        this.ground = this.physics.add.image(-299,h*0.75,'background_2').setOrigin(0).setDepth(1).enableBody().setImmovable();
        this.trash = this.physics.add.image(w-350,h-100,'trash').setOrigin(0).setDepth(1).enableBody().setImmovable().setBodySize(20,20);;


        // Set up pictures and targets groups
        let config = {
            classType: Phaser.Physics.Arcade.Sprite,
            runChildUpdate: true
        }; 
        
        this.pictures = this.add.group(config);
        this.target = this.add.group(config);
        this.physics.add.collider(this.ground, this.pictures);

        // Create first photo
        this.pictures.add(new Placeable(this,299/2,300,this.photos[this.spotIndex]));

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
        this.target.add(new Target(this,this.spotX,this.spotY,'target').setOrigin(0.5).setDepth(-1));
        this.spotY -= 30;

        // Track end state
        this.createdBoom = false;
        this.trashedBoom = false;
    }

    update(){

        let w = game.config.width;
        let h = game.config.height;

        // Check if pictures and targets collide, if they do run play.collision
        this.physics.world.collide(this.pictures, this.target, this.collision, null, this);

        // If no target, create new target
        if(this.target.getLength() == 0 && this.createdBoom == false){
            this.spotIndex += 1

            if(this.spotIndex < 10){
                this.target.add(new Target(this,this.spotX,this.spotY,'target').setOrigin(0.5).setDepth(10 - this.spotIndex - 1));
                this.spotY -= 30;

                // Create new picture
                this.pictures.add(new Placeable(this,299/2,300,this.photos[0]));
            }else{

                // Create boom box and set up parameters
                this.boom = new Placeable(this,this.spotX,0,'boombox')
                this.boom.setVelocityY(500)
                this.physics.add.collider(this.ground, this.boom);

                // Prevent multiple from being created
                this.createdBoom = true;
            }
        }

        // Check for collision with pizza box, if so destroy pizza with this.doom
        if(this.createdBoom){
            this.boom.update();
            this.physics.world.collide(this.pictures, this.boom, this.doom,null, this);

            // Check if boom box is trashed, end scene if so
            this.physics.world.collide(this.trash, this.boom, this.end,null, this);
        }
    }

    // When Boom box hits pizza destroy it!
    doom(pizza,boombox){
        boombox.setVelocityY(boombox.body.velocity.y + 100 )
        pizza.destroy();
    }

    // End game when trashed boom box
    end(){
        if(this.trashedBoom == false){

            // Fade out...
            this.camera.fadeOut(5000, 0.5, 0, 0);

            // At end of fade go to end
            this.camera.on('camerafadeoutcomplete', () =>{
                this.scene.start("ending");
            })

            // Done
            this.trashedBoom = true
        }
    }

    // Runs when a picture and target collide
    collision(picture,target){

        // Trigger pictures onHit method to attach picture
        picture.onHit(target);
    }
}