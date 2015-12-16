angular.module('niceKnob', [])
    .directive('slider', function ($window) {
        return {
            scope: {
                actionY: '=',
                actionX: '='
            },
            link: function (scope, el) {
                var $wind = angular.element($window),
                    mouseDown = false, $html = angular.element('html');
                $html.on('mousedown', function (e) {
                    if (e.target !== el[0])return;
                    mouseDown = true;
                    $html.addClass('cursorless');
                })
                    .on('mousemove', function (e) {
                        if (!mouseDown)return;
                        (scope.actionY||angular.noop).call(undefined, e.originalEvent.movementY);
                        (scope.actionY||angular.noop).call(undefined, e.originalEvent.movementX);
                        e.preventDefault();
                    })
                    .on('mouseup', function (e) {
                        if (!mouseDown)return;
                        mouseDown = false;
                        $html.removeClass('cursorless');
                    })
            }
        }
    })
    .directive('niceKnob', function ($timeout,$rootScope) {
        return {
            require: 'ngModel',
            template: '<knob-control slider action-y="actionY" style="transform:rotate({{startAngle+(value-min)/range*270}}deg);"></knob-control><input class="knob-input" ng-model="tempValue">',
            scope: {
                min: '=',
                max: '=',
                step: '='
            },
            link: function (scope, el, attrs, ngModel) {
                var tempValue;
                scope.range = scope.max-scope.min;
                scope.startAngle = -135;
                scope.__defineSetter__('value', function (val) {
                    var val = parseFloat(val);
                    if(val>scope.max)val=scope.max;
                    if(val<scope.min)val=scope.min;
                    scope.tempValue=val;
                    ngModel.$setViewValue(val);

                });
                scope.__defineGetter__('value', function () {
                    return ngModel.$viewValue;
                });
                scope.__defineGetter__('tempValue',function(){
                    return tempValue;
                })
                scope.__defineSetter__('tempValue',function(value){
                    tempValue=value;
                })
                scope.$watch(attrs.ngModel,function(val){
                   if(val!=scope.value)
                    scope.value = val;
                });
                el.find('.knob-input').change(function(){
                    scope.value=scope.tempValue;
                });
                scope.actionY = function (val) {
                    scope.value+=-val*scope.step;
                }
                $timeout(function(){
                    scope.value=ngModel.$viewValue;
                },100);

            }
        }
    });