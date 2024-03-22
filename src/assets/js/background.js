import {
  App
} from '@wazo/euc-plugins-sdk';
let url;

const app = new App();

const ringStorage = (action, ring) => {
  switch(action) {
    case "set":
      localStorage.setItem("ring", ring);
      break;
    case "delete":
      localStorage.removeItem("ring");
      break;
  }
  return localStorage.getItem("ring");
}

const setRing = (ring) => {
  app.configureSounds({
    ring: ring
  });
}

const handleRing = (msg) => {
  const ring = msg.data;
  switch(ring) {
    case "original":
      app.resetSounds();
      ringStorage("delete")
      break;
    default:
      const sound = `${url}/assets/sounds/${ring}`;
      ringStorage("set", sound);
      setRing(sound);
  }
}

app.onBackgroundMessage = msg => {
  switch(msg.value) {
    case "ring":
      handleRing(msg);
      break;
   case "config":
     const ring = ringStorage();
     app.sendMessageToIframe({value: 'config', ring: ring});
     break;
  } 
}

(async () => {
  await app.initialize();
  const context = app.getContext();
  url = context.app.extra.baseUrl;

  const ring = ringStorage();
  if (ring) {
    setRing(ring);
  }
  console.log('ring background - background launched');
})();
