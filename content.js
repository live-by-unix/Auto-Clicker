if (!window.autoClickerInstalled) {
  window.autoClickerInstalled = true;

  let timer = null;
  let mouseX = null;
  let mouseY = null;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  chrome.runtime.onMessage.addListener(msg => {

    if (msg.action === "start") {

      if (mouseX === null || mouseY === null) {
        console.log("Move the mouse first.");
        return;
      }

      const clickX = mouseX;
      const clickY = mouseY;

      clearInterval(timer);

      timer = setInterval(() => {

        const el = document.elementFromPoint(clickX, clickY);

        if (!el) return;

        el.dispatchEvent(new MouseEvent("mousedown", {
          bubbles: true,
          clientX: clickX,
          clientY: clickY
        }));

        el.dispatchEvent(new MouseEvent("mouseup", {
          bubbles: true,
          clientX: clickX,
          clientY: clickY
        }));

        el.dispatchEvent(new MouseEvent("click", {
          bubbles: true,
          clientX: clickX,
          clientY: clickY
        }));

      }, msg.interval);

    }

    if (msg.action === "stop") {
      clearInterval(timer);
      timer = null;
    }

  });
}
