import SceneB from './SceneB.js';
import SceneC from './SceneC.js';
import SceneD from './SceneD.js';

export default class SceneA extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneA' });
        this.humedad = 0;
        this.cultivos = 0;
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
        this.load.image('Gota', 'water.png');
        this.load.image('Zanahoria', 'carrot.png');
    }

    create() {

        let graphics = this.add.graphics();       
        graphics.fillStyle('0x0000FF', 1);        
        graphics.fillRect(70, 70, 1550, 730);
        this.add.text(100, 90, 'D', { font: '200px Arial', fill: '0x000000' });

        // Imagen de Fondo
         this.BG = this.add.image(850, 435, 'BG').setDisplaySize(1700, 870); 

         // Tierra de Cultivo con físicas
        this.TierraCultivo = this.physics.add.image(240, 700, 'TheFarm')
        .setDisplaySize(450, 80)
        .setDepth(1)
        .setImmovable(true); // La hace estática para que no se mueva con colisiones
        this.TierraCultivo.body.allowGravity = false; 

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

        // Grupo de gotas
        this.gotasdeagua = this.physics.add.group({ 
            bounceX: 0.1, 
            bounceY: 0.1 
        });

        // Colisión entre gotas y la tierra
        this.physics.add.collider(this.gotasdeagua, this.TierraCultivo, (tierra, gota) => {
            gota.destroy(); // Destruye la gota al tocar la tierra
            this.humedad = this.humedad + 1;
            console.log('LE SUMAS UNO ' + this.humedad);
        });
       
        // Nube interactiva que genera gotas
        this.Nubesita = this.add.image(240, 150, 'Nube')
            .setScale(0.5)
            .setDepth(1)
            .setInteractive()
            .on('pointerdown', () => {
                let nuevaGota = this.physics.add.image(Phaser.Math.Between(150, 350), 150, 'Gota')
                    .setScale(0.25)
                    .setDepth(0);
                
                nuevaGota.body.allowGravity = true; 
                nuevaGota.body.setCircle(100);
                
                this.gotasdeagua.add(nuevaGota);
            });
    }


    update()
    {
        if (this.humedad == 20){
            this.zanahoria = this.physics.add.image(Phaser.Math.Between(50, 400), Phaser.Math.Between(550, 600), 'Zanahoria').setScale(.3)
            this.zanahoria.setCollideWorldBounds(true);
            this.zanahoria.body.setCircle(300);
            this.zanahoria.setOffset(-150,600);
            this.zanahoria.setDepth(0);
            this.zanahoria.setBounce(.5);
            this.physics.add.collider(this.zanahoria, this.zanahoria);
            this.humedad = 0;
        }
    }

}