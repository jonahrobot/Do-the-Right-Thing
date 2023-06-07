// Picture Prefab
class Picture extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, group){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);  
        this.body.setCollideWorldBounds(true);  

        this.scene = scene;
        this.heldDown = false;
        this.placed = false;

        this.group = group;
        this.placed = false;
        this.over = false;
        this.currentObjectOver = null;

        this.setInteractive();
    }

    onHit(hitObject){
        this.over = true;
        this.currentObjectOver = hitObject;

        this.scene.time.delayedCall(100, () => { 
            this.over = false;
        });
    }

    placePicture(){
        this.setOrigin(0)
        this.x = this.currentObjectOver.x;
        this.y = this.currentObjectOver.y;
        this.placed = true;
        this.currentObjectOver.destroy();
    }

    setHeldDown(bool){
        this.heldDown = bool;
    }

    update(){
        
        if(this.placed){
            return;
        }

        if(this.heldDown){
            this.x = game.input.mousePointer.x;
            this.y = game.input.mousePointer.y;
            this.setGravityY(0);
            this.setVelocity(0)
        }else{
            if(this.over == true){
                this.placePicture();
            }else{
                this.setGravityY(650);
            }
        }
    }

}