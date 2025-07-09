chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start-tabs") {
    const urls = [
      "http://103.230.107.233/",
      "http://103.230.107.235/",
      "http://103.230.104.203/",
      "http://103.230.104.222/"
    ];

    for (const url of urls) {
      chrome.tabs.create({ url });
    }
  }
});

