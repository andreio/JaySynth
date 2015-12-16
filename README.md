# JaySynth

Simple JS audio synthetizer.
Uses AudioContext for audio stuff and AngularJS for UI.

#Components

##Oscillator

The main sound generator. It creates sound waves based on the algorithm selected in "Type" .

Settings:
  Type - Sine, Square, Sawtooth, Triangle

##Filter

It is used to cut frequencies based on the algorithm selected in "Type" . "Frequency" determines at which frequency value the filter takes efect. "Q" determines the slope of the filter.

Settings:
  Type - LowPass, HighPass, BandPass, LowShelf, HighShelf, Peaking, Notch, Allpass
  Frequency
  Q param

##LFO

It is a very fast oscillator which acts as a modulator for the main oscillator. "Frequency" determines the 'speed' of the LFO and "Gain" the strength of the effect.

Settings:
  Frequency
  Gain

#Output

Controls the output of JaySynth. "Volume" determines the final output of the synthetizer.

Settings 
  Volume
  
#Input
The synth can by played with a midi keyboard or the computer keyboard if "Virtual keyboard ON" is checked.
Notes on computer keyboard:
  awsedrf
  CDEFGAB
  
To learn more about synthetizers: 
https://en.wikipedia.org/wiki/Synthesizer


