import SceneA from  './SceneA.js';
import SceneC from  './SceneC.js';
export default class SceneB extends Phaser.Scene {

    constructor()
    {
        super({key: 'SceneB' });
    }


    preload()
    {
        console.log('llegó a SceneB');
        this.load.path = './assets/'; 
        this.load.image('NextScene', 'ChangeScene.png'); 

        this.load.path = './assets/imagenes/'; 
        this.load.image('MenuBunny', 'menubunnybutton.png'); 
        this.load.image('MenuBunny', 'menufarm.png'); 

    }

    create()
    {
        // grapics es la forma de graficar objetos o figuras 2D
         let graphics = this.add.graphics();       
                             //color , alpha
         graphics.fillStyle('0xFF0000', 1);        //Estilo de llenado
        //Figura y coordenadas 
        //                 posición | tamaño 
         graphics.fillRect(70, 70, 1550, 730);
        //Coordenadas | 'texto' | condiciones 
         this.add.text(100, 90, 'B', {font: '200px Arial', fill: '0x000000'});

        // Imagen para pasar a SceneC
        this.TheNextScene = this.add.image(1450, 650, 'NextScene')
            .setScale(0.5)
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneC'); // Cambiar a SceneB
            });

        // Imagen para pasar a SceneA
        this.ThePreviewScene = this.add.image(250, 650, 'NextScene')
            .setScale(0.5)
            .setFlipX(true) // Voltea la imagen horizontalmente
            .setInteractive() // Hacer la imagen interactiva
            .on('pointerdown', () => {
                this.scene.start('SceneA'); // Cambiar a SceneC
            });

    }

    update()
    {


    }

}