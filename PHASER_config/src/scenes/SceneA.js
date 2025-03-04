import SceneB from './SceneB.js';
import SceneC from './SceneC.js';

export default class SceneA extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneA' });
    }

    preload() {
        console.log('llegó a SceneA');

        this.load.path = './assets/'; 
        this.load.image('NextScene', 'ChangeScene.png'); 
    }

    create() {
        let graphics = this.add.graphics();       
        graphics.fillStyle('0x0000FF', 1);        
        graphics.fillRect(70, 70, 1550, 730);
        this.add.text(100, 90, 'A', { font: '200px Arial', fill: '0x000000' });

        // Imagen para pasar a SceneB
        this.TheNextScene = this.add.image(1450, 650, 'NextScene')
            .setScale(0.5)
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneB'); // Cambiar a SceneB
            });

        // Imagen para pasar a SceneC
        this.ThePreviewScene = this.add.image(250, 650, 'NextScene')
            .setScale(0.5)
            .setFlipX(true) // Voltea la imagen horizontalmente
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneC'); // Cambiar a SceneC
            });
    }


    update()
    {


    }

}