import SceneA from  './SceneA.js';
import SceneB from  './SceneB.js';
import SceneC from  './SceneC.js';

export default class SceneD extends Phaser.Scene {

    constructor()
    {
        super({key: 'SceneD'});
    }


    preload()
    {
      
        console.log('llegó a SceneD');

    }

    create()
    {
        // grapics es la forma de graficar objetos o figuras 2D
         let graphics = this.add.graphics();       
                             //color , alpha
         graphics.fillStyle('0x00FF00', 1);        //Estilo de llenado
        //Figura y coordenadas 
        //                 posición | tamaño 
         graphics.fillRect(70, 70, 1550, 730);
        //Coordenadas | 'texto' | condiciones 
         this.add.text(100, 90, 'D', {font: '200px Arial', fill: '0x000000'});

       // Imagen para pasar a SceneA
       this.TheNextScene = this.add.image(1450, 650, 'NextScene')
       .setScale(0.5)
       .setInteractive() // Hacer la imagen interactiva
       .on('pointerdown', () => {
           this.scene.start('SceneA'); // Cambiar a SceneA
       });

       // Imagen para pasar a SceneB
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