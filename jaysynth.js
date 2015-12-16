function JaySynth(context) {
    function makeOscillator(freq, type) {
        var oscillator = context.createOscillator();
        oscillator.type = type || oscillator.type;
        oscillator.frequency.value = freq || oscillator.frequency.value;
        return oscillator;
    }

    function makeFilter(freq, detune, q, gain, type) {
        var filter = context.createBiquadFilter();
        filter.frequency = freq || filter.frequency;
        filter.detune = detune || filter.detune;
        filter.q = q || filter.q;
        filter.gain = gain || filter.gain;
        filter.type = type || filter.type;
        return filter;
    }

    function makeGain(value) {
        var gain = context.createGain();
        gain.gain.value = value;
        return gain;
    }

    var mainOut = makeGain(1),
        lfo = makeOscillator(7, 'sine'),
        filter = makeFilter(),
        lfoGain = makeGain(50);
    lfo.start(0);
    lfo.connect(lfoGain);
    mainOut.connect(context.destination);
    filter.connect(mainOut);


    return {
        mixer: {
            set volume(val) {
                mainOut.gain.value = val;
            },
            get volume(){
                return mainOut.gain.value;
            }
        },
        lfo: {
            set freq(freq) {
                lfo.frequency.value = freq;
            },

            set gain(val) {
                lfoGain.gain.value = val;
            },
            get freq() {
                return lfo.frequency.value;
            },

            get gain() {
                return lfoGain.gain.value;
            }
        },
        filter: {
            set type(type) {
                filter.type = type;
            },
            set gain(val) {
                filter.gain.value = val;
            },
            set Q(val) {
                filter.Q.value = val;
            },
            set freq(val) {
                filter.frequency.value = val;
            },
            get type() {
                return filter.type;
            },
            get gain() {
                return filter.gain.value;
            },
            get Q() {
                return filter.Q.value;
            },
            get freq() {
                return filter.frequency.value;
            }


        },
        in: function (freq, type) {
            var oscillator = makeOscillator(freq, type);
            lfoGain.connect(oscillator.frequency);
            oscillator.connect(filter);
            oscillator.start(0);
            return function () {
                oscillator.stop(0);
            }
        }
    }

}

var jaySynth = new JaySynth(new AudioContext());
