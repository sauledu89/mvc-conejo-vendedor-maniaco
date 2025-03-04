//
class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Bootloader',
        });

         // En este apartado se definen las variables
         // También se pueden definir en create
        
    }
        
    init() {
        console.log('soy init');
        console.log('Scene Bootloader');
    }

    preload() {
        console.log('soy preload');
        //IMAGENES                     
        // Desde dónde se pre-cargan los assets               
        this.load.path = './assets/';                 
        // phaser.cargar.tipo de asset('nombre que le asignamos al asset'. './nombre del archivo en la carpeta. extensión del archivo')             
      
        this.load.image('BG', './BG.png'); 

        // SONIDOS ¿m4a? mientras más ligero el formato más rápido carga en el juego
        // También se puede solucionar si tienes una pantalla de carga que dé suficiente tiempo
        // A que carguen los recursos de cualquier formato

        // this.load.audio('OST', ['vicarious.m4a']);                   // Música del nivel
        // this.load.audio('shoot', './boom3.wav');                     // Sonido al disparar P1
       
    }

// En create se da uso a los assets precargados y se les añade cualidades y comportamientos
    create() {
        console.log('soy create'); 
        
        // Creación de la música del nivel con cualidad : en loop
        // const miaudio = this.sound.add('OST');
        // miaudio.play({
        //    loop: true
        //});

       // Al crear algo en pantalla usando un asset de preload le ponemos un nuevo nombre personalizado.
        // Funciona como crear una nueva variable y asignarle uno de los assets como valor.

        // Creación de elemento sfx

//phaser.variablename = tipo de asset ('Nombre del asset en preload') 
  
        // this.rip = this.sound.add('explosion');

        // Creación de elemento imagen -> BackGround
        //BackGround
        this.BG = this.add.image(850, 435, 'BG').setDisplaySize(1698, 868);
        
        // Creación de todos los KeyBindings que se usarán en el juego.
        //Se llama a la función de Phaser
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
    
        this.teclaA = this.input.keyboard.addKey(keyCodes.A);
        this.teclaD = this.input.keyboard.addKey(keyCodes.D);
    

} // AQUÍ TERMINA LA FUNCIÓN CREATE

// Función Update para actualizar cada frame
// Movimiento implementado con controles WASD y FLECHAS

    update(time, delta) {
        
        // ------------------------------------ Jugador 1 ----------------------------------
         // --------------------------- Movimiento normal para Player 1 ----------------
// En update, verifica isDashing antes de aplicar movimiento normal
// Uso de condiciones 
// Si No está haciendo dash haz esto... 

}
}

export default Bootloader;
