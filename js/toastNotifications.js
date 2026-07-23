let toastNotifications = [];
let totalToastCount = 0;

function send_notification(message, type) {
  const toastContainer = document.getElementById(
    "toast-notifications-container"
  );

  if (toastContainer === null) {
    console.error("Unable to find container for toast notification");
    return;
  }

  if (message == undefined || typeof message !== "string") {
    console.error("Message is not valid for toast notification.");
    return;
  }

  if (type !== "good" && type !== "bad") {
    console.error("Type is not valid for toast notification.");
    return;
  }

  let messageBox = document.createElement("div");
  messageBox.classList = `toast-message ${type} ${totalToastCount}`;
  messageBox.id = `toast-${totalToastCount}`;

  let messageHeader = document.createElement("h3");
  messageHeader.innerText = message;

  let messageClear = document.createElement("button");
  messageClear.innerText = "x";
  messageClear.onclick = function () {
    setRemoveToast(this.parentElement, 1);
  };

  messageBox.appendChild(messageHeader);
  messageBox.appendChild(messageClear);
  toastContainer.appendChild(messageBox);

  setTimeout(() => {
    messageBox.style.marginLeft = "0";
  }, 10);

  toastNotifications.push(messageBox);

  toastNotifications.forEach((element) => {
    element.style.marginTop = "10px";
  });

  setRemoveToast(messageBox, 8000);

  totalToastCount++;
}

function setRemoveToast(element, timeout) {
  setTimeout(() => {
    toastNotifications.shift();
    element.style.marginLeft = "110%";

    setTimeout(() => {
      element.remove();
    }, 400);
  }, timeout);
}
