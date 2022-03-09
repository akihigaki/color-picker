//when the user clicks anywhere on the page
document.addEventListener('click', async () => {
  // Prompt user to select any serial port.
  var port = await navigator.serial.requestPort();
  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200, bufferSize: 16777216 });

  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  reader = inputStream.getReader();
  readLoop();
});

buttonVal = 0
potVal = 0
joyyVal = 0
joyxVal = 0
isRGB = true
buttonReset = true
maxValue = 4095

async function readLoop() {
  counterVal = 0;
  prevString = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      console.log("closing connection")
      reader.releaseLock();
      break;
    }
    if (value) {
      btnIndex = value.indexOf("button")
      if (btnIndex != -1) {
        btnString = value.substring(value.indexOf(":", btnIndex)+1, value.indexOf(",", btnIndex))
        buttonVal = parseInt(btnString)
      }
      
      potIndex = value.indexOf("pot")
      if (potIndex != -1) {
        potString = value.substring(value.indexOf(":", potIndex)+1, value.indexOf(",", potIndex))
        potVal = parseInt(potString)
      }

      yIndex = value.indexOf("joyy")
      if (yIndex != -1) {
        yString = value.substring(value.indexOf(":", yIndex)+1, value.indexOf(",", yIndex))
        joyyVal = parseInt(yString)
      }

      xIndex = value.indexOf("joyx")
      if (xIndex != -1) {
        xString = value.substring(value.indexOf(":", xIndex)+1, value.indexOf(",", xIndex))
        joyxVal = parseInt(xString)
      }

      // set the title based on the button
      if (buttonVal == 0 && buttonReset) {
        buttonReset = false
        if (isRGB) {
          document.getElementById("title").innerHTML = "HSV Color Picker"
          isRGB = false
        }
        else {
          document.getElementById("title").innerHTML = "RGB Color Picker"
          isRGB = true
        }
      }
      else if (buttonVal == 0) {
        buttonReset = false
      }
      else {
        buttonReset = true
      }

      // show the rgb/hsv values based on sensor readings
      if (isRGB) {
        redValue = parseInt(potVal / 4095 * 255)
        greenValue = parseInt(joyxVal / 4095 * 255)
        blueValue = parseInt(joyyVal / 4095 * 255)
        document.getElementById("one").innerHTML = "Red: ".concat(redValue)
        document.getElementById("two").innerHTML = "Green: ".concat(greenValue)
        document.getElementById("three").innerHTML = "Blue: ".concat(blueValue)
        document.getElementById("color").style.backgroundColor = 'rgb(' + redValue + ', ' + greenValue + ', ' + blueValue + ')'
      }
      else {
        hueValue = potVal / 4095
        satValue = joyxVal / 4095
        valValue = joyyVal / 4095
        document.getElementById("one").innerHTML = "Hue: ".concat(hueValue)
        document.getElementById("two").innerHTML = "Saturation: ".concat(satValue)
        document.getElementById("three").innerHTML = "Value: ".concat(valValue)
        
        // convert from hsv to rgb for display, math from https://gist.github.com/mjackson/5311256
        var r, g, b;
        var i = Math.floor(hueValue * 6);
        var f = hueValue * 6 - i;
        var p = valValue * (1 - satValue);
        var q = valValue * (1 - f * satValue);
        var t = valValue * (1 - (1 - f) * satValue);

        switch (i % 6) {
          case 0: r = valValue, g = t, b = p; break;
          case 1: r = q, g = valValue, b = p; break;
          case 2: r = p, g = valValue, b = t; break;
          case 3: r = p, g = q, b = valValue; break;
          case 4: r = t, g = p, b = valValue; break;
          case 5: r = valValue, g = p, b = q; break;
        }
        document.getElementById("color").style.backgroundColor = 'rgb(' + (r * 255) + ', ' + (g * 255) + ', ' + (b * 255) + ')'
      }
    }
  }
};
