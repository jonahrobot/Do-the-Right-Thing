/*
    Dummy physics object to target for a placeable
*/
class Target extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, group){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);  
        this.body.setCollideWorldBounds(true);  

        this.group = group;
    }

    onHit(){
        this.destroy();
    }
}