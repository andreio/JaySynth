/**
 * Created with IntelliJ IDEA.
 * User: andrei
 * Date: 03/10/14
 * Time: 15:34
 * To change this template use File | Settings | File Templates.
 */
angular.module('virtualKeyboard', [])
    .constant('keyMappings', {
        75: 523.251,
        74: 493.883,
        85: 466.164,
        72: 440.000,
        89: 415.305,
        71: 391.995,
        84: 369.994,
        70: 349.228,
        68: 329.628,
        69: 311.127,
        83: 293.665,
        87: 277.183,
        65: 261.626
    })
    .factory('virtualKeyboard', function (keyMappings) {
        var active = false,
            keys = {},
            callbacks = {
                noteOn: [],
                noteOff: [],
                reset: []
            }
        angular.element(window).on('keydown', function (e) {
            if (keys[e.which] || !active || angular.element(e.target).is('input'))return;
            keys[e.which] = 1;
            for(var k in callbacks.noteOn){
                callbacks.noteOn[k]('note-on',keyMappings[e.which])
            }
        })
        angular.element(window).on('keyup', function (e) {
            if (!keys[e.which] || !active)return;
            for(var k in callbacks.noteOff){
                callbacks.noteOff[k]('note-off',keyMappings[e.which])
            }
            delete keys[e.which];
        })
        angular.element(window).on('blur',function () {
            if (!active)return;
            for(var k in callbacks.reset){
                callbacks.reset[k]('note-die')
            }
        })
        return {
            set active(value) {
                if(!(active=value))
                    angular.element(window).triggerHandler('blur');
            },
            get active(){
                return active;
            },
            get keys() {
                return keys;
            },
            noteOn: function (fn) {
                var index = callbacks.noteOn.push(fn) - 1;
                return function () {
                    return callbacks.noteOn.splice(index, 1);
                }
            },
            noteOff: function (fn) {
                var index = callbacks.noteOff.push(fn) - 1;
                return function () {
                    return callbacks.noteOff.splice(index, 1);
                }
            },
            reset:function(fn){
                var index = callbacks.reset.push(fn) - 1;
                return function () {
                    return callbacks.reset.splice(index, 1);
                }
            }

        }
    })