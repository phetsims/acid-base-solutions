/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;