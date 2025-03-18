import SceneA from  './SceneA.js';
import SceneB from  './SceneB.js';
import SceneD from  './SceneD.js';

export default class SceneC extends Phaser.Scene {

    constructor()
    {
        super({key: 'SceneC'});
    }


    preload()
    {
      
        console.log('llegó a SceneC');

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
         this.add.text(100, 90, 'C', {font: '200px Arial', fill: '0x000000'});

       // Imagen para pasar a SceneA
       this.TheNextScene = this.add.image(1450, 650, 'NextScene')
       .setScale(0.5)
       .setInteractive() // Hacer la imagen interactiva
       .on('pointerdown', () => {
           this.scene.start('SceneD'); // Cambiar a SceneD
       });

       // Imagen para pasar a SceneB
       this.ThePreviewScene = this.add.image(250, 650, 'NextScene')
       .setScale(0.5)
       .setFlipX(true) // Voltea la imagen horizontalmente
       .setInteractive() // Hacer la imagen interactiva
       .on('pointerdown', () => {
           this.scene.start('SceneB'); // Cambiar a SceneB
       });


    }

    update()
    {


    }

}