class Loading extends Phaser.Scene{
    constructor(){
        super("Loading");
    }

    preload(){
       

        this.load.setPath("./assets/Game 1/"); 
        // Game 1 Assets
        this.load.image('spr_background_1','Game_1_background.png');
        this.load.image('photo_1','Photo_1.png');
        this.load.image('photo_2','Photo_2.png');
        this.load.image('photo_3','Photo_3.png');
        this.load.image('photo_4','Photo_4.png');
        this.load.image('photo_5','Photo_5.png');
        this.load.image('photo_6','Photo_6.png');
        this.load.image('photo_spot','Photo_Spot.png');
        this.load.image('movie_box','movieTitle.jpg')
        this.load.image('box','Box.png');

        // Game 2 Assets
        this.load.setPath("./assets/Game 2/"); 
        this.load.image('background','background_2.png')
        this.load.image('box_2','box_2.png')
        this.load.image('car_background','car_background_2.png')
        this.load.image('car_base','car_base_2.png')
        this.load.image('car_base_target','car_base_target_2.png')
        this.load.image('car_door','car_door_2.png')
        this.load.image('car_door_target','car_door_target_2.png')
        this.load.image('car_left','car_left_2.png')
        this.load.image('car_left_target','car_left_target_2.png')
        this.load.image('car_right','car_right_2.png')
        this.load.image('car_right_target','car_right_target_2.png')
        this.load.image('car_top','car_top_2.png')
        this.load.image('car_top_target','car_top_target_2.png')
        this.load.image('water','water.png')

        // Game 3 Assets
        this.load.setPath("./assets/Game 3/"); 
        this.load.image('boombox','boombox_3.png')
        this.load.image('box_3','box_3.png')
        this.load.image('pizza','pizza_3.png')
        this.load.image('target','target_3.png')
        this.load.image('trash','trash_3.png')
    }

    create(){
        console.log("LOADING");
    }

    update(){
        this.scene.start('Title');
    }
}