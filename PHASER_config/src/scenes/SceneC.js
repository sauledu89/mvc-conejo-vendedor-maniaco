export default class SceneC extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneC', active: true });

        this.menuAbierto = false;
    }

    preload() {
        this.load.path = './assets/imagenes/';
        this.load.image('MenuConejo', 'menubunny.png');
    }

    create() {
        this.menu = this.add.image(850, 750, 'MenuConejo')
            .setScale(0.2)
            .setDepth(2)
            .setVisible(false)
            .setInteractive();

        console.log("✅ SceneC ha creado su menú correctamente.");

        // Emitimos un evento para avisar a SceneA que SceneC ya está lista
        this.scene.get('SceneA').events.emit('SceneCReady');
    }

    toggleMenu() {
        this.menuAbierto = !this.menuAbierto;
        this.menu.setVisible(this.menuAbierto);
        console.log(`Menú del conejo ${this.menuAbierto ? 'abierto' : 'cerrado'}`);
    }
}
