import { Stage, game, ColorLayer, BitmapText } from 'melonjs/dist/melonjs.module';

class PlayScreen extends Stage {
  constructor() {
    super();
    this.world = game.world;
  }

  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // add a gray background to the default Stage
    this.world.addChild(new ColorLayer('background', '#202020'));

    // add a font text display object
    this.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2, {
        font: 'PressStart2P',
        size: 4.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: 'Hello World !'
      })
    );
  }
}

export default PlayScreen;
