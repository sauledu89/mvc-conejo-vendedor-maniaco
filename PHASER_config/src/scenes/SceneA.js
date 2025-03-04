import SceneB from './SceneB.js';
import SceneC from './SceneC.js';
import SceneD from './SceneD.js';

export default class SceneA extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneA' });
    }

    preload() {
        console.log('llegó a SceneA');

        this.load.path = './assets/'; 
        this.load.image('NextScene', 'ChangeScene.png'); 

        this.load.path = './assets/imagenes/'; 
        this.load.image('BG', 'background.jpg'); 
        this.load.image('MenuBunny', 'menubunnybutton.png'); 
        this.load.image('MenuFarm', 'menufarmbutton.png'); 
        this.load.image('MenuStore', 'menustorebutton.png'); 
        this.load.image('TheFarm', 'farm.png'); 
        this.load.image('Nube', 'cloud.png'); 
        this.load.image('StoreOne', 'onecoin.png'); 
    }

    create() {
        let graphics = this.add.graphics();       
        graphics.fillStyle('0x0000FF', 1);        
        graphics.fillRect(70, 70, 1550, 730);
        this.add.text(100, 90, 'D', { font: '200px Arial', fill: '0x000000' });

        // Imagen de Fondo
         this.BG = this.add.image(850, 435, 'BG').setDisplaySize(1700, 870); 

         //TierraCultivo
         this.TierraCultivo = this.add.image(240, 700, 'TheFarm').setDisplaySize(450, 100); 

         //Nubesita
         this.Nubesita = this.add.image(240, 300, 'Nube').setScale(0.5);

         //StoreOne
         this.Tienda01 = this.add.image(1400, 520, 'StoreOne').setScale(0.45);         

        // Imagen para pasar a SceneB
        this.TheNextScene = this.add.image(850, 880, 'MenuFarm')
            .setScale(0.3)
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneB'); // Menu de los cultivos
            });

        // Imagen para pasar a SceneC
        this.ThePreviewScene = this.add.image(700, 880, 'MenuBunny')
            .setScale(0.3)
            .setFlipX(true) // Voltea la imagen horizontalmente
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneC'); // Menu del conejo vendedor maniaco
            });

        // Imagen para pasar a SceneD  1450, 650,
        this.ThePreviewScene = this.add.image(1000, 880, 'MenuStore')
            .setScale(0.3)
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneD'); // Menu de la tienda
            });    
    }


    update()
    {


    }

}