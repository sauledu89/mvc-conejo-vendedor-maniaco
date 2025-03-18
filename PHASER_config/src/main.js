import SceneA from './scenes/SceneA.js';
import SceneB from './scenes/SceneB.js';
import SceneC from './scenes/SceneC.js'; 

const config = {
    title: 'Protocolos',
    url: 'http://google.es',
    version: "0.0.1",

    type: Phaser.AUTO,
    width: 1700,
    height: 870,
    parent: 'game-container',
    pixelart: true,
    backgroundColor: '#34495e',

    banner: {
        hidePhaser: true,
        text: "#fff0f",
        background: [
            '#16a085',
            '#2ecc71',
            '#e74c3c',
            '#000000',
        ]
    },

//  Se agregan todas las escenas al array de Phaser
scene: [SceneA, SceneB, SceneC],
physics: {
    default: "arcade",
    arcade: {
        debug: false,
        gravity: { y: 1000 } // Sin gravedad
    }
}

};

const game = new Phaser.Game(config);
function init()
{
    console.log('Soy Init');
}


/*
    scene:[Bootloader],            // Manda a la escena Bootloader

    physics: {
        default: "arcade",
        arcade: {
            debug: false, // Modo de depuración activado
            gravity: { y: false } // Sin gravedad para movimiento libre
            
        }
    }
*/




/*
    scene: {
        preload: preload,
        create: create,
        update: update
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: true, // Modo de depuración activado
            gravity: { y: 0 } // Sin gravedad para movimiento libre
        }
    }
};

const game = new Phaser.Game(config);

function preload() {
    console.log("Soy preload");

    // Cargar la imagen del pájaro
    this.load.image("bird", "./assets/bird.png");
}

function create() {
    console.log("Soy create");

    // Crear el pájaro con física habilitada
    this.pajaro = this.physics.add.image(100, 50, "bird");

    // Configuración de las teclas de control (WASD y flechas)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
}

function update(time, delta) {
    // Mover el pájaro a la derecha
    if (this.cursors.right.isDown || this.keyD.isDown) {
        this.pajaro.x += 7;
    }
    // Mover el pájaro a la izquierda
    else if (this.cursors.left.isDown || this.keyA.isDown) {
        this.pajaro.x -= 7;
    }

    // Mover el pájaro a la derecha
    if (this.cursors.right.isDown || this.keyS.isDown) {
            this.pajaro.y += 7;
    }
    // Mover el pájaro a la izquierda
    else if (this.cursors.left.isDown || this.keyW.isDown) {
            this.pajaro.y -= 7;
    }
    */