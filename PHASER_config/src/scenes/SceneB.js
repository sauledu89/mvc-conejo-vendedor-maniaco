export default class SceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneB', active: true });

        this.menuAbierto = false;
    }

    preload() {
        this.load.path = './assets/imagenes/';
        this.load.image('MenuCultivos', 'menufarm.png');
    }

    create() {
        this.menu = this.add.image(850, 750, 'MenuCultivos')
            .setScale(0.2)
            .setDepth(2)
            .setVisible(false)
            .setInteractive();

        console.log("✅ SceneB ha creado su menú correctamente.");

        // Emitimos un evento para avisar a SceneA que SceneB ya está lista
        this.scene.get('SceneA').events.emit('SceneBReady');
    }

    toggleMenu() {
        this.menuAbierto = !this.menuAbierto;
        this.menu.setVisible(this.menuAbierto);
        console.log(`Menú de cultivos ${this.menuAbierto ? 'abierto' : 'cerrado'}`);
    }
}
