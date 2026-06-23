// static/osep/checklists/checklist-submit.js
// OSEP SmartRing 自我檢核表共用送出程式
// MVP-19：將 C401～C406 重複的送出 JavaScript 抽成共用檔案

(function () {
  // Google Apps Script Web App URL
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbznEiflKFq17wqIBGtplJUazjuqZmfGdqFJmGth4zBYQPwyaZmh6vGkkzmb5LIB-kg/exec'

  const config = window.OSEP_CHECKLIST_CONFIG || {};

  const submitButton =
    document.getElementById("submitButton") ||
    document.getElementById("submitBtn");

  let submitStatus = document.getElementById("submitStatus");

  function ensureStatusElement() {
    if (submitStatus) {
      return;
    }

    if (!submitButton || !submitButton.parentNode) {
      return;
    }

    submitStatus = document.createElement("p");
    submitStatus.id = "submitStatus";
    submitStatus.className = "submit-status";
    submitButton.parentNode.insertBefore(submitStatus, submitButton.nextSibling);
  }

  function getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
      .map((item) => item.value)
      .join("；");
  }

  function setStatus(message, type) {
    ensureStatusElement();

    if (!submitStatus) {
      return;
    }

    submitStatus.textContent = message;
    submitStatus.classList.remove("success", "error", "warning");

    if (type) {
      submitStatus.classList.add(type);
    }
  }

  function validateBasicInfo() {
    const className = getInputValue("className");
    const seatNumber = getInputValue("seatNumber");
    const studentName = getInputValue("studentName");

    if (!className || !seatNumber || !studentName) {
      setStatus("請先填寫班級、座號與姓名。", "warning");
      return false;
    }

    return true;
  }

  function buildPayload() {
    return {
      chapter: config.chapter || "",
      taskCode: config.taskCode || "",
      taskTitle: config.taskTitle || "",

      className: getInputValue("className"),
      seatNumber: getInputValue("seatNumber"),
      studentName: getInputValue("studentName"),

      doneItems: getCheckedValues("doneItems"),
      explainItems: getCheckedValues("explainItems"),
      challengeItems: getCheckedValues("challengeItems"),

      reflection: getInputValue("reflection"),
      userAgent: navigator.userAgent
    };
  }

  async function submitChecklist() {
    if (!WEB_APP_URL || WEB_APP_URL.includes("請保留") || WEB_APP_URL.includes("請貼上")) {
      setStatus("尚未設定 Google Apps Script Web App URL。", "error");
      return;
    }

    if (!validateBasicInfo()) {
      return;
    }

    const payload = buildPayload();

    if (!payload.taskCode || !payload.taskTitle) {
      setStatus("檢核表任務設定不完整，請確認 OSEP_CHECKLIST_CONFIG。", "error");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "送出中……";
    }

    setStatus("資料送出中，請稍候……", "warning");

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      console.log("Checklist submitted:", response);

      setStatus(
        "已送出自我檢核表。",
        "success"
      );
    } catch (error) {
      console.error("Checklist submit failed:", error);
      setStatus("送出失敗，請檢查網路連線或通知老師。", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "送出自我檢核";
      }
    }
  }

  function initChecklistSubmit() {
    ensureStatusElement();

    if (!submitButton) {
      console.warn("找不到 submitButton 或 submitBtn，未啟用自我檢核表送出功能。");
      return;
    }

    submitButton.addEventListener("click", submitChecklist);
  }

  document.addEventListener("DOMContentLoaded", initChecklistSubmit);
})();