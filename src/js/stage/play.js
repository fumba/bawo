import { Stage, game, ColorLayer, BitmapText } from 'melonjs/dist/melonjs.module';
import { devLog } from '../utils';

class PlayScreen extends Stage {
  constructor() {
    super();

    const { world, viewport } = game;
    this.world = world;
    this.viewport = viewport;
    devLog('[PlayScreen] initiated...');
  }

  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // add a gray background to the default Stage
    this.world.addChild(new ColorLayer('background', '#202020'));

    // add a font text display object
    this.world.addChild(
      new BitmapText(this.viewport.width / 2, this.viewport.height / 2, {
        font: 'PressStart2P',
        size: 2.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: 'Bawo Game !'
      })
    );
  }
}

export default PlayScreen;
