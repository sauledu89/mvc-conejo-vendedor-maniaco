import SceneB from './SceneB.js';
import SceneC from './SceneC.js';
import SceneD from './SceneD.js';

export default class SceneA extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneA', active:true});

        this.openMenu = null; // Variable para rastrear el menú abierto
        this.nivelTienda = 0; //Nivel inicial de la tienda
        this.escenasListas = {}; // Guardar qué escenas ya están listas

        this.humedad = 0;
        this.cultivos = 0;
        this.movimiento = 0;
        this.counter = 0;
        this.movrate = 1;
        this.crono = 0;
        this.clientrate = 1000;
        this.isclient = 0;
        this.clientmovrate = 0;
        this.monedas = 0;
        this.precio = 1;
    }

          
 // Función para activar/desactivar los menús en otras escenas
 toggleMenu(sceneKey) {
    let scene = this.scene.get(sceneKey);

    if (scene && scene.menu) {
        scene.toggleMenu();
        this.openMenu = scene.menuAbierto ? sceneKey : null;
    } else {
        // 📌 Verificar si la escena YA está lista antes de mostrar el mensaje de espera
        if (this.escenasListas[sceneKey]) {
            console.warn(`⚠️ SceneA: La escena '${sceneKey}' está lista pero no tiene menú.`);
            return;
        }

        console.warn(`⚠️ SceneA: Esperando a que la escena '${sceneKey}' se inicialice...`);

        const eventosDeEscena = {
            'SceneB': 'SceneBReady',
            'SceneC': 'SceneCReady',
            'SceneD': 'SceneDReady'
        };

        if (eventosDeEscena[sceneKey]) {
            console.log(`⏳ SceneA está esperando el evento '${eventosDeEscena[sceneKey]}'`);

            this.events.once(eventosDeEscena[sceneKey], () => {
                console.log(`✅ SceneA ha detectado que '${sceneKey}' está lista.`);
                this.escenasListas[sceneKey] = true;
                this.toggleMenu(sceneKey);
            });
        }
    }

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
       // this.load.image('StoreOne', 'onecoin.png'); 
        this.load.image('Gota', 'water.png');
        this.load.image('Zanahoria', 'carrot.png');
        this.load.image('Conejo', 'pinkbunny.png');
        this.load.image('Cliente', 'bluebunny.png');

        // 📌 Cargar todas las imágenes de StoreOne (nivel 0 a 6)
        for (let i = 0; i <= 6; i++) {
            this.load.image(`StoreNivel${i}`, `store_nivel_${i}.png`);
        }

    }

    create() {

      //  let graphics = this.add.graphics();       
      //  graphics.fillStyle('0x0000FF', 1);        
      //  graphics.fillRect(70, 70, 1550, 730);
      //  this.add.text(100, 90, 'D', { font: '200px Arial', fill: '0x000000' });

        // Imagen de Fondo
         this.BG = this.add.image(850, 435, 'BG').setDisplaySize(1700, 870); 

         // Tierra de Cultivo con físicas
        this.TierraCultivo = this.physics.add.image(240, 700, 'TheFarm')
        .setDisplaySize(450, 80)
        .setDepth(1)
        .setImmovable(true); // La hace estática para que no se mueva con colisiones
        this.TierraCultivo.body.allowGravity = false; 

        //StoreOne
        //this.Tienda01 = this.physics.add.image(1300, 510, 'StoreOne').setDisplaySize(530, 450)
        //this.Tienda01.body.setCircle(300);
        //this.Tienda01.setCollideWorldBounds(true);
        //this.Tienda01.setOffset(200,800)
        //.setDepth(1);

// Crear StoreOne con su imagen inicial
this.Tienda01 = this.physics.add.image(1300, 510, `StoreNivel${this.nivelTienda}`)
.setDisplaySize(530, 450)
this.Tienda01.body.setCircle(300);
this.Tienda01.setCollideWorldBounds(true);
this.Tienda01.setOffset(200,800)
.setDepth(1);

console.log(`✅ SceneA ha creado StoreOne en nivel ${this.nivelTienda}`);

     // 📌 Escuchar el evento de SceneD al inicio
     this.events.once('SceneDReady', () => {
        console.log("✅ SceneA ha detectado que SceneD está lista.");
        this.escenasListas['SceneD'] = true;
    });
// Escuchar evento desde SceneD para actualizar StoreOne
this.events.on('ActualizarTienda', (nuevoNivel) => {
this.actualizarStoreOne(nuevoNivel);
});

         //Botón para activar el menú de cultivos (SceneB)
         this.btnMenuCultivos = this.add.image(700, 880, 'MenuFarm')
         .setScale(0.3)
         .setInteractive()
         .on('pointerdown', () => {
             this.toggleMenu('SceneB');
         });

     //Botón para activar el menú del conejo (SceneC)
     this.btnMenuConejo = this.add.image(850, 880, 'MenuBunny')
         .setScale(0.3)
         .setFlipX(true)
         .setInteractive()
         .on('pointerdown', () => {
             this.toggleMenu('SceneC');
         });

     // Botón para activar el menú de la tienda (SceneD)
     this.btnMenuTienda = this.add.image(1000, 880, 'MenuStore')
         .setScale(0.3)
         .setInteractive()
         .on('pointerdown', () => {
             this.toggleMenu('SceneD');
         });

         // Detecta clics en cualquier parte de la pantalla
        this.input.on('pointerdown', (pointer, gameObjects) => {
            if (this.openMenu && gameObjects.length === 0) {
                // Si hay un menú abierto y el usuario hace clic en un área vacía, lo cierra
                this.toggleMenu(this.openMenu);
            }
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

        //el conejo vendedor
        this.conejo = this.physics.add.image(1000, 600, 'Conejo')
        .setDisplaySize(260, 280)
        .setDepth(0)
        .setInteractive()
        .on('pointerdown', () => {
            this.movimiento = -this.movrate;
        })
        this.conejo.body.setCircle(300);
        this.conejo.setCollideWorldBounds(true);
        this.conejo.setOffset(0,550);

        //conejo y tienda colision
        this.physics.add.collider(this.conejo, this.Tienda01, (conejo, Tienda01) => {
            this.movimiento = 0; //mueve al conejo a la derecha
            this.conejo.x -= 1;
            this.counter += 1;
        });
    }

// Función para actualizar la imagen de StoreOne según su nivel
actualizarStoreOne(nuevoNivel) {
    if (nuevoNivel <= 6) {
        this.nivelTienda = nuevoNivel;
        this.Tienda01.setTexture(`StoreNivel${this.nivelTienda}`);
        console.log(`🔄 StoreOne ha evolucionado a nivel ${this.nivelTienda}`);
    }
}

    update(time, delta)
    {
        //crear zanahorias cuando la humedad es 20
        if (this.humedad == 20){

            this.zanahoriasgrupo = this.physics.add.group({ 
                bounceX: 0.1,
                bounceY: 0.1
            });

            this.zanahoria = this.physics.add.image(Phaser.Math.Between(50, 400), Phaser.Math.Between(550, 600), 'Zanahoria').setScale(.3)
            this.zanahoria.body.setCircle(300);
            this.zanahoria.setOffset(-150,600);
            this.zanahoria.setDepth(0);
            this.zanahoria.setBounce(.5);
            this.physics.add.collider(this.zanahoria, this.zanahoria);
            this.humedad = 0;
            this.zanahoriasgrupo.add(this.zanahoria);
            this.zanahoria.setCollideWorldBounds(true);

            //colision entre zanahoria y conejo
            this.physics.add.collider(this.conejo, this.zanahoriasgrupo, (conejo, zanahoria) => {
                this.movimiento = this.movrate; //mueve al conejo a la derecha
                zanahoria.destroy();
                this.cultivo += 1;
            });
        }

        this.conejo.x += this.movimiento //conejo siempre se mueve cómo diga this.movimiento

        //reloj siempre se mueve para arriba
        this.crono += 1;

        //llega un cliente
        if(this.crono > this.clientrate && this.isclient == 0){
            this.crono = 0;
            this.isclient = 1;
            this.cliente = this.add.image(1500, 610,'Cliente')
            .setDisplaySize(260, 280)
            .setDepth(1)
        }

        if(this.isclient == 1 && this.counter > 0){
            this.monedas += this.precio;
            this.isclient = 0;
            this.crono = 0;
            this.cliente.destroy();
            this.counter -= 1;
            console.log(this.monedas + ' monedas')
        }
    }

}