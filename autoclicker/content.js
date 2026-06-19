if (!window.autoClickerInstalled) {
  window.autoClickerInstalled = true;

  let timer = null;
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  chrome.runtime.onMessage.addListener(msg => {
    if (msg.action === "start") {
      clearInterval(timer);

      timer = setInterval(() => {
        const element = document.elementFromPoint(mouseX, mouseY);
        if (element) {
          element.click();
        }
      }, msg.interval);
    }

    if (msg.action === "stop") {
      clearInterval(timer);
      timer = null;
    }
  });
}
