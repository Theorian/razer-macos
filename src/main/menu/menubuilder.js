import {
  getMenuItemBreathe, getMenuItemBrightness,
  getMenuItemNone, getMenuItemOldMouseEffects, getMenuItemReactive, getMenuItemRipple, getMenuItemSetCustomColor,
  getMenuItemSpectrum, getMenuItemStarlight,
  getMenuItemStatic,
  getMenuItemWaveExtended, getMenuItemWaveSimple,
} from './menucommon';

const featureMapping = {
  'none': getMenuItemNone,
  'static': getMenuItemStatic,
  'waveSimple': getMenuItemWaveSimple,
  'waveExtended': getMenuItemWaveExtended,
  'spectrum': getMenuItemSpectrum,
  'breathe': getMenuItemBreathe,
  'reactive': getMenuItemReactive,
  'starlight': getMenuItemStarlight,
  'brightness': getMenuItemBrightness,
  'oldMouseEffects': getMenuItemOldMouseEffects,
  'ripple': getMenuItemRipple,
};

export function createMenuFor(razerApp, razerDevice) {

  let deviceMenu = [
    { type: 'separator' },
    {
      label: razerDevice.getName(),
    },
    { type: 'separator' },
  ];

  let features = razerDevice.features;
  if (features == null) {
    // build menu based on device type
    switch (razerDevice.mainType) {
      case 'keyboard':
        features = ["none","static", "waveExtended", "spectrum", "reactive", "breathe", "starlight", "ripple", "brightness"];
        break;
      case 'mouse':
        features = ["none","static", "waveSimple", "spectrum", "reactive", "breathe", "oldMouseEffects"];
        break;
      case 'mousedock':
        features = ["none", "static", "spectrum", "breathe"];
        break;
      case 'mousemat':
        features = ["none", "static", "waveSimple", "spectrum", "breathe"];
        break;
      case 'egpu':
        features = ["none", "static", "waveSimple", "spectrum", "breathe"];
        break;
      case 'headphone':
        features = ["none", "static", "spectrum", "breathe"];
        break;
      case 'accessory':
        features = ["none", "static", "waveExtended", "spectrum", "breathe"];
        break;
      default:
        features = [];
    }
  }

  const featureMenu = features.filter(feature => typeof feature !== 'undefined' && feature !== '').map(feature => {
    if(!featureMapping.hasOwnProperty(feature)) {
      throw 'Feature "'+feature+'" defined for device "'+razerDevice.name+'" is not available. Available feature are: '+Object.keys(featureMapping);
    }
    return featureMapping[feature](razerDevice, razerApp)
  });
  deviceMenu = deviceMenu.concat(featureMenu);
  deviceMenu = deviceMenu.concat([getMenuItemSetCustomColor(razerDevice, 'Custom settings', razerApp)])
  return deviceMenu;
}