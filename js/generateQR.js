let isDragging = false;
let qrForm;

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.getElementById("qr-code-canvas");
  let ctx = canvas.getContext("2d");

  qrForm = document.getElementById("qr-form");

  let versionOptions = document.getElementById("codeVersion");

  for (let i = 1; i <= 40; i++) {
    let newOption = document.createElement("option");

    newOption.innerText = "Version: " + i;
    newOption.value = i;

    if (i === 4) {
      newOption.selected = "selected";
    }

    versionOptions.append(newOption);
  }

  qrForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (generateQR()) {
      send_notification("QRCode generated", "good");
    }
  });

  generateQR();

  canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
  });
  canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
      let { x: eventX, y: eventY } = event;
      let { top, left } = canvas.getBoundingClientRect();

      let { x, y } = { x: eventX - left, y: eventY - top };

      ctx.fillStyle = "red";

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
  document.addEventListener("mouseup", (event) => {
    isDragging = false;
  });
});

function generateQR() {
  const formData = new FormData(qrForm);
  const formValues = Object.fromEntries(formData);

  setQR(formValues["qr-text"], formValues["codeVersion"], formValues["codeEC"]);
}

async function setQR(data, version, EC) {
  try {
    const qrCode = await new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data,
      backgroundOptions: {
        color: "#FFFFFF",
      },
      qrOptions: {
        typeNumber: version,
        errorCorrectionLevel: EC,
      },
    });
    let canvas = document.getElementById("qr-code-canvas");
    let ctx = canvas.getContext("2d");

    ctx.drawImage(
      await createImageBitmap(await qrCode.getRawData("png")),
      0,
      0
    );

    return true;
  } catch (error) {
    console.log(error);
    if (error.startsWith("code length overflow")) {
      send_notification(
        `Version to low for number of characters: ${error.split("(")[1].split(">").join(" > ").slice(0, -1)}`,
        "bad"
      );
    }
    return false;
  }
}
