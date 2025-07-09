document.getElementById("start").addEventListener("click", () => {
  const data = {
    exam: document.getElementById("exam").value,
    year: document.getElementById("year").value,
    board: document.getElementById("board").value,
    roll: document.getElementById("roll").value,
    reg: document.getElementById("reg").value
  };

  // Save to storage
  chrome.storage.local.set({ formData: data }, () => {
    chrome.runtime.sendMessage({ action: "start-tabs" });
    window.close(); // close popup
  });
});

