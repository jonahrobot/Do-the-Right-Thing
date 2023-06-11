/*
    Base class for all draggable and placeable objects.
*/
class Placeable extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, group){
        super(scene, x, y, texture, frame);

        // Add to Phaser systems
        scene.add.existing(this);
        scene.physics.add.existing(this);  

        // Set up phaser properties
        this.body.setCollideWorldBounds(true);  
        this.setInteractive();

        // Remember scene
        this.scene = scene;

        // Drag states
        this.heldDown = false;
        this.placed = false;
        this.placed = false;
        this.over = false;

        // Group
        this.group = group;
    
        // State tracker
        this.currentObjectOver = null;
        this.deactive = false;
    }

    drop(){
        this.placed = false;
        this.setGravityY(650); 
        this.deactive = true;

        this.scene.time.delayedCall(1000, () => { 
            this.deactive = false;
        });
    }

    // When picture collides with another mark that other object as above the placeable
    onHit(hitObject){
        this.over = true;
        this.currentObjectOver = hitObject;

        // When not hitting something, not over
        this.scene.time.delayedCall(100, () => { 
            this.over = false;
        });
    }

    // Place the placeable object over currently hovered object
    place(){
        //this.setOrigin(0)
        if(this.deactive == true) { return; }
        this.x = this.currentObjectOver.x;
        this.y = this.currentObjectOver.y;
        this.placed = true;
        this.currentObjectOver.destroy();
    }

    // Toggle if held down from outside object
    setHeldDown(bool){
        this.heldDown = bool;
    }

    update(){

        // If already placed, stop update
        if(this.placed){
            return;
        }

        // Move with mouse if being dragged
        if(this.heldDown){
            this.x = game.input.mousePointer.x;
            this.y = game.input.mousePointer.y;
            this.setGravityY(0);
            this.setVelocity(0)
        }else{

            // If not held down and over something, place
            if(this.over == true){
                this.place();
            }else{
                // Otherwise apply gravity
                this.setGravityY(650);
            }
        }
    }

}