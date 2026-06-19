if (!window.autoClickerInstalled) {
  window.autoClickerInstalled = true;

  let timer = null;
  let x = 0;
  let y = 0;

  document.addEventListener("mousemove", e => {
    x = e.clientX;
    y = e.clientY;
  });

  chrome.runtime.onMessage.addListener((msg) => {

    if (msg.action === "start") {
      clearInterval(timer);

      const clickX = x;
      const clickY = y;

      timer = setInterval(() => {
        const el = document.elementFromPoint(clickX, clickY);

        if (el) {
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
        }
      }, msg.interval);
    }

    if (msg.action === "stop") {
      clearInterval(timer);
    }

  });
}
