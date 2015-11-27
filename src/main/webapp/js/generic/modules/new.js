/*
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * openAUSIAS: The stunning micro-library that helps you to develop easily 
 *             AJAX web applications by using Java and jQuery
 * openAUSIAS is distributed under the MIT License (MIT)
 * Sources at https://github.com/rafaelaznar/openAUSIAS
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var newModule = function () {
    var parametersObject;
    var jsonData;
    var strClass;
}
newModule.prototype = new baseModule();
function setForeign(prop, objParams) {
    promise.getOne(prop, objParams[prop]).done(function (jsonDataViewModuleReceived) {
        $('#obj_' + prop + '_desc').html(html.printObject2(prop, jsonDataViewModuleReceived.message.meta.message, jsonDataViewModuleReceived.message.bean.message));
    })
}
newModule.prototype.loadFormValues = function (objParams) {
    if (objParams) { //soporte claves ajenas pte revision
        for (var prop in objParams) {
            if (objParams.hasOwnProperty(prop)) {
                $('#obj_' + prop).val(objParams[prop]).attr("disabled", true);
                $('#obj_' + prop + "_button").attr("disabled", true).hide();
                setForeign(prop, objParams);
            }
        }
    }
}
newModule.prototype.doEventsLoading = function () {
};
newModule.prototype.initialize = function (oComponent) {
    parametersObject = oComponent.strParams;
    strClass = oComponent.strOb;
};
newModule.prototype.getPromise = function () {
    return promise.getMeta(strClass);
}
newModule.prototype.getData = function (jsonDataReceived) {
    if (jsonDataReceived.status == "200") {
        jsonData = jsonDataReceived;
    } else {
        //informar error
    }
};
newModule.prototype.render = function () {
    if (jsonData.status == "200") {
        return form.getFormTemplate(strClass, jsonData.message);
    } else {
        return util.notifyException(jsonData.status, jsonData.message);
    }
}
newModule.prototype.fill = function () {
    $('#id').val('0').attr("disabled", true);
    this.loadFormValues(parametersObject); //new operation can load forced foreigns & no foreigns
}
newModule.prototype.bind = function () {
    validation.loadValidationCallbacks(jsonData.message);
    this.doEventsLoading();
    $('#submitForm').unbind('click');
    $('#submitForm').click(function (e) {
        // okValidation(function (e) { ...
        var strValues = array.identificarArray(form.getFormValues(strClass));
        promise.setOne(strClass, {json: JSON.stringify(strValues)}).done(function (result) {
            if (result["status"] == "200") {
                resultadoMessage = 'Se ha creado el registro con id=' + result["message"];
            } else {
                resultadoMessage = "ERROR: No se ha creado el registro";
            }
            var mensaje = "<h5>Código: " + result["status"] + "</h5><h5>" + resultadoMessage + "</h5>";
            modal.loadModalNotify($('#broth_modal'), mensaje, function () {
                window.location.href = "#/" + strClass + "/view/" + result["message"];
                $('#broth_modal').empty();
            }, function () {
                $('#broth_content').empty();
                $('#broth_modal').empty();
            });
        });
        e.preventDefault();
        return false;
    });
}