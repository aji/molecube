import * as molecube from './molecube.ts';
import * as hexagon from './hexagon.ts';
import * as widget from './widget.ts';

(window as any).m = molecube;
hexagon.setup();
widget.setup();
