lpTag.amd.define('src/dom-lib/Events', [], function() {

    var supportedEvents = [
        'click',
        'dblclick',
        'keypress',
        'keyup',
        'mousemove'
    ];

    function _bindEvent(domEl, eventType, callback) {
        if (window.addEventListener) {
            domEl.addEventListener(eventType, callback);
        } else {
            domEl.attachEvent('on' + eventType, callback);
        }
    }

    function _addSupportedEvents() {
        for (var se=0; se<supportedEvents.length; se++) {
            (function(eventType) {
                Events[eventType] = function (callback) {
                    _bindEvent(this.domEl, eventType, callback);
                }
            })(supportedEvents[se]);
        }
    }

    var Events = {};

    _addSupportedEvents();

    return Events;

});