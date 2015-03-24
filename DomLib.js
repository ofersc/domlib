amd.define('src/dom-lib/DomLib', [
    'src/dom-lib/Events',
    'src/dom-lib/Accessors'
], function(Events, Accessors) {

    function $$(cdata) {
        if (typeof cdata === 'string') {
            if (cdata.indexOf('<') === 0 && cdata.charAt(cdata.length - 1) === '>') {
                //TODO: replace with check against regex
                var tmpDomEl = document.createElement('div');
                tmpDomEl.innerHTML = cdata;
                this.domEl = tmpDomEl.children[0];
            } else {
                this.domEl = document.querySelector(cdata);
            }
        } else if (typeof cdata === 'object') {
            if (cdata.nodeType && cdata.nodeType === 1 || cdata.nodeType === 3) {
                this.domEl = cdata;
            }
            else {
                return cdata;
            }
        }
        return this.domEl ? this : null;
    }

    $$.prototype.find = function(queryString) {
        return this.domEl.querySelectorAll(queryString);
    };

    $$.prototype.children = function() {
        return this.domEl.children;
    }

    $$.prototype.findFirst = function(queryString) {
        var resultSet = this.find(queryString);
        return resultSet.length > 0 ? resultSet[0] : null;
    };

    $$.prototype.remove = function() {
        if (this.domEl.remove) {
            this.domEl.remove();
        } else if (this.domEl.parentNode) {
            this.domEl.parentNode.removeChild(this.domEl);
        }
    };

    $$.prototype.addClass = function(className) {
        if (this.domEl.className.indexOf(className) === -1) {
            this.domEl.className += ' ' + className;
        }
        return this;
    };

    $$.prototype.removeClass = function(className) {
        this.domEl.className = this.domEl.className.replace(className, '');
        return this;
    };

    $$.prototype.append = function(domEl) {
        var $domEl = $$(domEl);
        this.domEl.appendChild($domEl.domEl);
    };

    _$$.plugin = function(options) {
        if (typeof options === 'object' && Array.isArray(options)) {
            var plugins = options;
            for (var p=0; p<plugins.length; p++) {
                _$$.plugin(plugins[p]);
            }
        } else {
            $$.prototype[options.name] = options.func;
        }
    };

    function extend() {
        var extensions = arguments;
        var extension;
        for (var ex=0; ex<extensions.length; ex++) {
            extension = extensions[ex];
            for (var prop in extension) {
                $$.prototype[prop] = extension[prop];
            }
        }
    }

    extend(
        Events, // event handling mixin
        Accessors // accessors
    );

    function _$$(constructorData) {
        return new $$(constructorData);
    }

    return _$$;

});