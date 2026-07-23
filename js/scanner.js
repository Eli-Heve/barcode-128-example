let port;
let availablePort;

navigator.serial.getPorts().then((ports) => {
  availablePort = ports[0];
  checkIfScannerIsAllowed();
});

async function connect_serial_scanner(scannerChoice) {
  //prettier-ignore
  if (!("serial" in navigator)) {
    send_notification("Web serial not supported by your browser", "bad");
    return;
  }

  let portInfo;

  if (availablePort != undefined) {
    portInfo = availablePort.getInfo();
  }

  try {
    if (scannerChoice.value === "new") {
      port = await navigator.serial.requestPort();
    } else {
      port = await navigator.serial.requestPort({
        filters: [
          {
            usbProductId: portInfo.usbProductId,
            usbVendorId: portInfo.usbVendorId,
          },
        ],
      });
    }

    await port.open({ baudRate: 9600 });

    send_notification("Successfully connected to the serial port!", "good");

    const decoder = new TextDecoder("utf-8");

    let readBuffer = [];

    while (port.readable) {
      const reader = port.readable.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();

          let directString = decoder.decode(value);

          readBuffer.push(directString);

          if (!directString.endsWith("\r\n")) {
            continue;
          }

          let string = readBuffer.join("");
          readBuffer = [];

          writeToOutput("scanner", string === "NR" ? "No Read" : string);

          if (done) {
            break;
          }
        }
      } catch (error) {
        send_notification("Error with serial port.", "bad");
        console.error(error);
      } finally {
        reader.releaseLock();
      }
    }
  } catch (error) {
    send_notification("Failed to connect to the serial port.", "bad");
    console.error(error);
  }
}

function writeToOutput(format, message) {
  let scannerTextContainer = document.getElementById("scanner-text");

  let messageElement = document.createElement("h3");
  messageElement.innerText = `${format}: ${message}`;

  scannerTextContainer.append(messageElement);
}

let webcamElement;
let barcodeDetector;
let webcamCanvas;
let webcamCTX;

const format_map = {
  qr_code: "QR",
  code_128: "128 Barcode",
  upc_a: "UPC A",
};

async function connect_webcam_scanner() {
  try {
    let stream = null;
    webcamElement = document.getElementById("webcam-based-detector");
    webcamCanvas = new OffscreenCanvas(720, 720);
    webcamCTX = webcamCanvas.getContext("2d");

    let listOfWantedSupportedFormats = (
      await BarcodeDetector.getSupportedFormats()
    ).filter((element) => ["qr_code", "code_128", "upc_e"].includes(element));

    barcodeDetector = new BarcodeDetector({
      formats: listOfWantedSupportedFormats,
    });

    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "environment",
        width: 720,
        height: 720,
      },
    });

    webcamElement.style.display = "block";
    webcamElement.srcObject = stream;
    await webcamElement.play();

    webcamElement.requestVideoFrameCallback(handleVideoFrame);
  } catch (error) {
    console.log(error);
  }
}

let hasScanned = [];
let lastScanned = {};

function handleVideoFrame(now) {
  webcamCTX.drawImage(webcamElement, 0, 0);

  barcodeDetector
    .detect(webcamCanvas)
    .then((barcodes) => {
      barcodes.forEach((barcode) => {
        if (!hasScanned.includes(barcode.rawValue)) {
          writeToOutput(format_map[barcode.format], barcode.rawValue);
          hasScanned.push(barcode.rawValue);
          lastScanned[barcode.rawValue] = now;
        }
        Object.entries(lastScanned).forEach((element) => {
          if (element[1] + 2000 < now) {
            hasScanned.splice(hasScanned.indexOf(element[0]), 1);
            delete lastScanned[element[0]];
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  webcamElement.requestVideoFrameCallback(handleVideoFrame);
}

async function connect_device() {
  const scannerChoice = document.getElementById("scanner");

  if (scannerChoice.value === "webcam") {
    connect_webcam_scanner();
  } else {
    connect_serial_scanner(scannerChoice);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  checkIfScannerIsAllowed();
});

function checkIfScannerIsAllowed() {
  const scannerChoice = document.getElementById("scanner");
  const scannerOption = document.getElementById("scanner-selected");
  const scannerWebcamOption = document.getElementById("scanner-webcam-option");

  if (
    availablePort !== undefined &&
    scannerChoice !== null &&
    scannerOption == undefined
  ) {
    const option = document.createElement("option");

    option.innerText = "Existing Scanner";
    option.value = "existing";
    option.selected = "selected";
    option.id = "scanner-selected";

    scannerChoice.append(option);
  }

  if (scannerWebcamOption == undefined && "BarcodeDetector" in globalThis) {
    const webcamOption = document.createElement("option");

    webcamOption.innerText = "Webcam Scanner";
    webcamOption.value = "webcam";
    webcamOption.id = "scanner-webcam-option";

    scannerChoice.append(webcamOption);
  }
}
