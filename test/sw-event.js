const SWcontroller = require('client-sw-ready-event/lib/sw-client.js');
const SwStream = require('sw-stream/lib/sw-stream.js');

const background = new SWcontroller({
  fileName: '/service-worker.js',
  scope: '/'
});

background.on('ready', () => {
  let swStream = SwStream({
    serviceWorker: background.controller
  });
})

background.startWorker();