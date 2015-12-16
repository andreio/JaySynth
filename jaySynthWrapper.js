'use strict';

angular.module('JaySynth', ['virtualKeyboard','niceKnob'])
    .factory('jaySynth', function () {
        return new JaySynth(new AudioContext());
    })
    .controller('synth', function ($scope,virtualKeyboard) {
        $scope.__defineGetter__('keyboardActive',virtualKeyboard.__lookupGetter__('active'));
        $scope.__defineSetter__('keyboardActive',virtualKeyboard.__lookupSetter__('active'))
    })
    .directive('oscillator', function (jaySynth,virtualKeyboard) {
        return {
            restrict:'E',
            scope:true,
            controller: function ($scope) {
                var oscCallbacks = {};
                virtualKeyboard.active= true;
                virtualKeyboard.noteOn(function(e,note){
                    if(oscCallbacks[note])return;
                    oscCallbacks[note] = jaySynth.in(note,$scope.type);
                })
                virtualKeyboard.noteOff(function(e,note){
                    if(!oscCallbacks[note])return;
                    oscCallbacks[note]();
                    delete oscCallbacks[note];
                });
                virtualKeyboard.reset(function(e){
                    for(var k in oscCallbacks)
                        oscCallbacks[k]();
                    oscCallbacks={};
                })

            },
            link: function (scope) {

            }}
    })
    .directive('filter', function (jaySynth) {
        return  {
            scope:true,
            controller: function ($scope) {
                $scope.__defineSetter__('type',jaySynth.filter.__lookupSetter__('type'));
                $scope.__defineGetter__('type',jaySynth.filter.__lookupGetter__('type'));
                $scope.__defineSetter__('Q',jaySynth.filter.__lookupSetter__('Q'));
                $scope.__defineGetter__('Q',jaySynth.filter.__lookupGetter__('Q'));
                $scope.__defineSetter__('freq',jaySynth.filter.__lookupSetter__('freq'));
                $scope.__defineGetter__('freq',jaySynth.filter.__lookupGetter__('freq'));
                $scope.__defineSetter__('gain',jaySynth.filter.__lookupSetter__('gain'));
                $scope.__defineGetter__('gain',jaySynth.filter.__lookupGetter__('gain'));
            }
        }

    })
    .directive('lfo', function (jaySynth) {
        return {
            scope: true,
            controller: function ($scope) {
                $scope.__defineSetter__('freq',jaySynth.lfo.__lookupSetter__('freq'));
                $scope.__defineGetter__('freq',jaySynth.lfo.__lookupGetter__('freq'));
                $scope.__defineSetter__('gain',jaySynth.lfo.__lookupSetter__('gain'));
                $scope.__defineGetter__('gain',jaySynth.lfo.__lookupGetter__('gain'));
            }
        }
    })
    .directive('mixer', function (jaySynth) {
        return {
            scope: true,
            controller: function ($scope) {
                $scope.__defineSetter__('volume',jaySynth.mixer.__lookupSetter__('volume'));
                $scope.__defineGetter__('volume',jaySynth.mixer.__lookupGetter__('volume'));
            }
        }
    });
