lpTag.amd.define('src/dom-lib/Accessors', [], function () {

    var Accessors = {

        text: function (text) {
            if (typeof text === 'undefined') {
                return this.domEl.innerHTML;
            }
            var textNode = document.createTextNode(text);
            this.html('');
            this.append(textNode);
            return this;
        },

        html: function(htmlText) {
            if (typeof htmlText === 'undefined') {
                return this.domEl.innerHTML;
            } else {
                this.domEl.innerHTML = htmlText;
            }
            return this;
        },

        value: function (val) {
            if (typeof val === 'undefined') {
                return this.domEl.value;
            } else {
                this.domEl.value = val;
            }
            return this;
        }

    };

    return Accessors;

});