const defaultMessage = "https://www.devpipeline.com";

document.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("code128");
  const barcodeContainer = document.getElementById("code-128-container");
  const barcodeWidthSlider = document.getElementById("barcode-width");
  const barcodeFormText = document.getElementById("barcode-text");

  barcodeFormText.value = defaultMessage;

  updateBarcode(defaultMessage, "b", false, true, "black");

  window.addEventListener("resize", (event) => {
    barcodeWidthSlider.value = canvas.width;
    barcodeWidthSlider.max = barcodeContainer.offsetWidth - 8;
  });

  barcodeWidthSlider.max = barcodeContainer.offsetWidth - 8;
  barcodeWidthSlider.value = canvas.width;

  barcodeWidthSlider.addEventListener("input", updateBarcodeSlider);
  barcodeWidthSlider.addEventListener("mouseup", (event) => {
    const formData = new FormData(barcodeForm);
    const formValues = Object.fromEntries(formData);

    const barCodeMap =
      formValues["barcode-text"] == ""
        ? [defaultMessage, "b", event.target.value, true, "black"]
        : [
            formValues["barcode-text"],
            formValues["codeType"],
            event.target.value,
            formValues["barMarkers"],
            formValues["barColor"],
          ];

    updateBarcode(...barCodeMap);
  });
});

function updateBarcodeSlider(event) {
  const canvas = document.getElementById("code128");
  canvas.style.width = `${event.target.value}px`;
}

const barcodeForm = document.getElementById("scanner-form");

function updateBarcode(text, type, width, shouldAddMarkers, barColor) {
  const canvas = document.getElementById("code128");
  const barcodeContainer = document.getElementById("code-128-container");

  let ctx = canvas.getContext("2d");

  const { barcodeSum } = getBarcodeStats(text, type);

  let scaleX = width / barcodeSum;

  currentBarcode = createBarCode(
    text,
    type,
    width !== false ? scaleX : 1,
    shouldAddMarkers,
    barColor
  );

  canvas.width = currentBarcode.width;
  canvas.height = currentBarcode.height;
  ctx.drawImage(currentBarcode, 0, 0);

  let barcodeWidthSlider = document.getElementById("barcode-width");

  if (width === false) {
    barcodeWidthSlider.value = canvas.width;
    canvas.style.width = `${canvas.width}px`;
  }
}

barcodeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const barcodeContainer = document.getElementById("code-128-container");

  const formData = new FormData(barcodeForm);
  const formValues = Object.fromEntries(formData);

  if (
    formValues["barcode-text"] == undefined ||
    formValues["barcode-text"].length == 0
  ) {
    send_notification("Barcode Text not included", "bad");
    return;
  }

  updateBarcode(
    formValues["barcode-text"],
    formValues["codeType"],
    false,
    formValues["barMarkers"],
    formValues["barColor"]
  );
  send_notification("QRCode generated", "good");
});

function checkIfDisableMarkers(event) {
  let markerCheckbox = document.getElementById("barMarkers");

  if (event.target.value !== "black") {
    markerCheckbox.checked = false;
    markerCheckbox.disabled = true;
  } else {
    markerCheckbox.checked = true;
    markerCheckbox.disabled = false;
  }
}
