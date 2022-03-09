## Module 2 - Interactive Devices: Color Picker

[Video Demonstration](https://youtu.be/VrcGGNZTAoM)

### Vision
This project was to use a button, a potentiometer, and a joystick to physically interact with a device. Since the potentiometer and joystick represent three axes of motion, I decided to create a color picker where each axis is one of 3 values in RGB or HSV. I also wanted to create this for myself becuase I wanted to gain a more intuitive understanding of the HSV color model.

### General Idea
I created a device where the potentiometer changed the values of one axis, and the two directions of the joystick changed the two values of the other axes. The button was used to switch between the RGB and HSV color models. This allows for a more interactive and helpful understanding of both color models and is able to easily compare between the two.

### Setup: Hardware
The sensors were soldered onto the ESP32 as follows:
<ul>
  <li> One pin of the button was connected to ground and the other to pin 22 on the ESP32. </li>
  <li> The left pin of the potentiometer was connected to ground, the middle pin to pin 12, and the right pin to ground. </li>
  <li> On the joystick, the ground pin was connected to ground, the 5V pin was connected to 3V, the VRx pin was connected to pin 27, and the VRy pin was connected to pin 26. </li>
</ul>

I housed everything in a plastic box, and drilled holes so that the sensors can poke outside of it. I also used hot glue to glue down the potentiometer so that it wouldn't move when I turned it.

### Setup: Software
The software was done in the Arduino IDE and Javascript. The Arduino code on the device side simply reads the values of each sensor and sends them over a serial port to the computer. Then the javascript code takes the serial message and calculates the proper RGB/HSV values before displaying them though an HTML.

The code is attached in [this repo](https://github.com/akihigaki/color-picker)

### Technical Issues
The biggest technical issue that I faced was getting the data from the ESP32 to be read correctly in Javascript. The data was often fragmented and seemed unreliable. However, instead of thinking of the sensor values aggregated as a JSON, instead I parsed the string of each value individually, so some of the sensor values would get updated, even if other sensor values were not successfully sent. This allowed for much smoother data transfer between the two devices.

Hope you liked this project!
