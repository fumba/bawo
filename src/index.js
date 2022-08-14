import {
  audio,
  loader,
  state,
  device,
  video,
  utils,
  plugin,
  pool
} from 'melonjs/dist/melonjs.module';

import './index.css';

import TitleScreen from './js/stage/title';
import PlayScreen from './js/stage/play';
import PlayerEntity from './js/renderables/player';

import DataManifest from './manifest';
import { devLog } from './js/utils';

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (!video.init(1218, 562, { parent: 'screen', scale: 'auto' })) {
    devLog('Your browser does not support HTML5 canvas.');
    return;
  }

  // initialize the debug plugin in development mode.
  if (process.env.NODE_ENV === 'development') {
    import('./js/plugin/debug/debugPanel').then((debugPlugin) => {
      // automatically register the debug panel
      utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, 'debugPanel');
    });
  }

  // Initialize the audio.
  audio.init('mp3,ogg');

  // allow cross-origin for image/texture loading
  loader.crossOrigin = 'anonymous';

  // set and load all resources.
  loader.preload(DataManifest, function _() {
    // set the user defined game stages
    state.set(state.MENU, new TitleScreen());
    state.set(state.PLAY, new PlayScreen());

    // add our player entity in the entity pool
    pool.register('mainPlayer', PlayerEntity);

    // Start the game.
    state.change(state.PLAY);
  });
});
