function solveCaptcha() {
  const bodyText = document.body.innerText;
  const match = bodyText.match(/(\d+)\s*\+\s*(\d+)/);
  if (match) {
    return (parseInt(match[1]) + parseInt(match[2])).toString();
  }
  return "";
}

function fillAndSubmit(data) {
  const { exam, year, board, roll, reg } = data;

  const examSelect = document.getElementById("exam");
  const yearSelect = document.getElementById("year");
  const boardSelect = document.getElementById("board");
  const rollInput = document.getElementById("roll");
  const regInput = document.getElementById("reg");
  const capInput = document.getElementById("value_s");
  const submitBtn = document.getElementById("button2");

  if (examSelect) examSelect.value = exam;
  if (yearSelect) yearSelect.value = year;
  if (boardSelect) boardSelect.value = board;
  if (rollInput) rollInput.value = roll;
  if (regInput) regInput.value = reg;
  if (capInput) capInput.value = solveCaptcha();

  if (submitBtn && capInput.value !== "") {
    submitBtn.click();
    return true;
  }

  return false;
}

let submitted = false;

chrome.storage.local.get("formData", ({ formData }) => {
  const interval = setInterval(() => {
    if (!submitted) {
      submitted = fillAndSubmit(formData);
    } else {
      const pageText = document.body.innerText;
      const resultLoaded =
        pageText.includes("GPA") || pageText.includes("Result") || pageText.includes("Grade");

      const stillOnForm =
        pageText.includes("Captcha") || document.getElementById("roll") !== null;

      if (resultLoaded) {
        clearInterval(interval);
        const audio = new Audio(chrome.runtime.getURL("ping.mp3"));
        audio.play();
      } else if (stillOnForm) {
        submitted = false; // retry submission
        location.reload();
      }
    }
  }, 5000);
});

