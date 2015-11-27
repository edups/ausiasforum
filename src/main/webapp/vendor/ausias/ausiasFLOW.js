/*!
 * ausiasFLOW Library v1.0, July 2015
 * Copyright (C), Rafael Aznar
 * rafaaznar{at}gmail.com
 * CIPFP Ausias March, Valencia, Spain
 * Free to use & distribute under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function () {
    var ausiasFLOW = window.ausiasFLOW = {};
    var componentsList = [];
    ausiasFLOW.reset = function () {
        componentsList = [];
        return ausiasFLOW;
    };
    ausiasFLOW.renderFillAndBind = function (oComponent) {
        //render component with existing data
        if ('render' in oComponent) {
            var renderization = oComponent.render();
            if ($(oComponent.place).html() != $('<div/>').html(renderization).html()) {
                oComponent.place.empty().append(renderization);
            }
        }
        if ('fill' in oComponent) {
            oComponent.fill();
        }
        if ('bind' in oComponent) {
            oComponent.bind();
        }
        if ('bindAll' in oComponent) {
            oComponent.bindAll();
        }
        if (oComponent.callbackFunction && 'bindCallback' in oComponent) {
            oComponent.bindCallback(oComponent.callbackFunction);
        }
    };
    ausiasFLOW.dataRenderFillAndBind = function (oComponent) {
        var json;
        var that = this;
        if ('initialize' in oComponent) {
            oComponent.initialize(oComponent);
        }
        if ('getPromise' in oComponent) {
            //in the case the component needs to retrieve data from server
            //get the promise, execute and continue the process
            var promise = oComponent.getPromise();
            promise.done(function (json) {
                if ('getData' in oComponent) {
                    oComponent.getData(json);
                }
                that.renderFillAndBind(oComponent);

            }).fail(function () {
                if ('getData' in oComponent) {
                    oComponent.getData();
                }
                throw new Error("ausiasFLOW: Couldn't get server data");
            })
        } else {
            //no data to get from server, continue process
            this.renderFillAndBind(oComponent);
        }
    };
    ausiasFLOW.initialize = function () {
        //create a new component
        var oComponent = new arguments[0];
        //every component is asigned an id
        oComponent.id_module = componentsList.length;
        //fishing other configuration information
        oComponent.place = arguments[1];         //place to be rendered
        oComponent.strOb = arguments[2];         //object
        oComponent.strOp = arguments[3];         //module name
        oComponent.strParams = arguments[4];     //parameters for the component
        //specifies the callback operation
        //in the case the component is going to be used to select one object
        //and perform the specified callback operation over it 
        oComponent.callbackFunction = arguments[5];
        //add the new component @ the end of the list
        componentsList.push(oComponent);
        //begin the process of ordered method calling 
        this.dataRenderFillAndBind(oComponent);
        return oComponent;
    };
    ausiasFLOW.dataRenderFillAndBindAll = function () { //render with reload ajax call
        componentsList.forEach(function (oComponent) {
            this.dataRenderFillAndBind(oComponent);
        });
    };
    ausiasFLOW.renderFillAndBindAll = function () { 
        componentsList.forEach(function (oComponent) {
            this.renderFillAndBind(oComponent);
        });
    };    
    ausiasFLOW.getComponentByModuleName = function (name) {
        //return the module named 'name'
        var dev = null;
        componentsList.forEach(function (oComponent) {
            if (oComponent.strOp == name) {
                dev = oComponent;
            }
        });
        return dev;
    };
})();