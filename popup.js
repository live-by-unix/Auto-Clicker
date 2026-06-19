document.getElementById("start").onclick = async () => {
  const interval = Number(document.getElementById("interval").value);

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.storage.local.set({
    interval,
    targetTabId: tab.id
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  chrome.tabs.sendMessage(tab.id, {
    action: "start",
    interval
  });
};

document.getElementById("stop").onclick = async () => {
  const { targetTabId } = await chrome.storage.local.get("targetTabId");

  chrome.tabs.sendMessage(targetTabId, {
    action: "stop"
  });
};
