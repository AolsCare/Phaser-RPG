import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }
  preload() {
    Player.preload(this);
    this.load.image("tiles", "Assets/RPG Nature Tileset.png");
    this.load.tilemapTiledJSON("map", "Assets/map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      "RPG Nature Tileset",
      "tiles",
      32,
      32,
      0,
      0
    );
    const layer1 = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
    this.player = new Player({
      scene: this,
      x: 100,
      y: 100,
      texture: "player",
      frame: "townsfolk_f_walk_1",
    });
    const layer2 = map.createStaticLayer("rocks Layer", tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.matter.world.convertTilemapLayer(layer2);

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player.update();
  }
}
