export default class SceneD extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneD', active: true });

        this.nivelTienda = 0;
        this.menuAbierto = false;
        console.log("✅ Constructor de SceneD ejecutado");
    }

    preload() {
        console.log("✅ SceneD está cargando assets...");
        this.load.path = './assets/imagenes/';
        for (let i = 0; i <= 6; i++) {
            this.load.image(`TiendaNivel${i}`, `tienda_nivel_${i}.png`);
        }
    }

    create() {
        console.log("✅ SceneD ha iniciado correctamente.");

        // 📌 El menú inicia oculto hasta que el jugador lo abra
        this.menu = this.add.image(850, 890, `TiendaNivel${this.nivelTienda}`)
            .setScale(0.2)
            .setDepth(2)
            .setVisible(false) // 🔹 Asegurar que inicie invisible
            .setInteractive()
            .on('pointerdown', () => this.evolucionarTienda());

        console.log(`✅ SceneD ha creado su tienda en nivel ${this.nivelTienda}`);

        // 📌 Emitir evento para SceneA cuando SceneD esté lista
        let sceneA = this.scene.get('SceneA');
        if (sceneA) {
            sceneA.events.emit('SceneDReady');
            console.log("📢 Evento SceneDReady emitido correctamente");
        } else {
            console.error("⚠️ Error: SceneA no encontrada al intentar emitir SceneDReady.");
        }

        // 📌 Escuchar evento para actualizar la tienda desde SceneA
        this.events.on('ActualizarTienda', (nuevoNivel) => {
            this.nivelTienda = nuevoNivel;
            this.menu.setTexture(`TiendaNivel${this.nivelTienda}`);
            console.log(`🔄 Tienda en SceneD ahora está en nivel ${this.nivelTienda}`);
        });
    }

    toggleMenu() {
        this.menuAbierto = !this.menuAbierto;
        this.menu.setVisible(this.menuAbierto);
        console.log(`Menú de la tienda ${this.menuAbierto ? 'abierto' : 'cerrado'}`);
    }

    evolucionarTienda() {
        if (this.nivelTienda < 6) {
            this.nivelTienda++;
            this.menu.setTexture(`TiendaNivel${this.nivelTienda}`);

            console.log(`🔄 Tienda evolucionada a nivel ${this.nivelTienda}`);

            // 📢 Notificar a SceneA que la tienda ha cambiado de nivel
            this.scene.get('SceneA').events.emit('ActualizarTienda', this.nivelTienda);
        } else {
            console.log("⚠️ La tienda ya ha alcanzado su nivel máximo.");
        }
    }
}
