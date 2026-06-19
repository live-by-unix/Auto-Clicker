const intervalInput = document.getElementById("interval");
const status = document.getElementById("status");

chrome.storage.local.get(["interval"], ({interval}) => {
  if(interval) intervalInput.value = interval;
});

async function send(action) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  chrome.tabs.sendMessage(tab.id, {
    action,
    interval: Number(intervalInput.value)
  });
}

document.getElementById("start").onclick = async () => {
  chrome.storage.local.set({
    interval: Number(intervalInput.value)
  });

  await send("start");
  status.textContent = "Running";
};

document.getElementById("stop").onclick = async () => {
  await send("stop");
  status.textContent = "Stopped";
};
