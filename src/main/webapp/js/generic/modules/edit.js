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
var editModule = function () {
    var jsonData;
    var strClass;
    var parametersObject;
}
editModule.prototype = new baseModule();
editModule.prototype.loadFormValues = function (objParams) {
};
editModule.prototype.fillForm = function (meta, data) {
    arr_meta_data = _.map(meta, function (value) {
        return  {meta: value, data: data[value.Name]};
    });
    $.each(arr_meta_data, function (index, v) {
        if (v.meta.IsObjForeignKey) {
            $('#' + v.meta.Name).val(v.data.bean.id);
            $('#' + v.meta.Name + "_desc").html(html.printPrincipal( v));
        } else {
            switch (v.meta.Type) {
                case 'Boolean':
                    if (data[v.meta.Name]) {
                        $('#' + v.meta.Name).attr("checked", true);
                    } else {
                        $('#' + v.meta.Name).attr("checked", false);
                    }
                    break;
                default:
                    $('#' + v.meta.Name).val(decodeURIComponent(v.data));
            }
        }
    });
};
editModule.prototype.doEventsLoading = function () {
};
editModule.prototype.defaultizeUrlObjectParameters = function (objParams) {
    if (typeof objParams["id"] === 'undefined') {
        objParams["id"] = 1;
    }
    return objParams;
};
editModule.prototype.initialize = function (oComponent) {
    strClass = oComponent.strOb;
    parametersObject = this.defaultizeUrlObjectParameters(oComponent.strParams);
};
editModule.prototype.getPromise = function () {
    return promise.getOne(strClass, parametersObject['id']);
};
editModule.prototype.getData = function (jsonDataReceived) {
    if (jsonDataReceived.status == "200") {
        jsonData = jsonDataReceived;
    } else {
        //informar error
    }
}
editModule.prototype.render = function () {
    if (jsonData.status == "200") {
        return form.getFormTemplate(strClass, jsonData.message.meta.message);
    } else {
        return util.notifyException(jsonData.status, jsonData.message);
    }
}
editModule.prototype.fill = function () {
    if (jsonData.status == "200") {
        this.fillForm(jsonData.message.meta.message, jsonData.message.bean.message);
        this.loadFormValues(parametersObject); //edit operation can load forced foreigns
    }
}
editModule.prototype.bind = function () {
    var thisObject = this;
    if (jsonData.status == "200") {
        validation.loadValidationCallbacks(jsonData.message.meta.message);
        this.doEventsLoading();
        $('#id').attr("disabled", true);
        $('#submitForm').unbind('click');
        $('#submitForm').click(function (e) {
            //oView.okValidation(function (e) {
            strValues = array.identificarArray(form.getFormValues(strClass));
            promise.setOne(strClass, {json: JSON.stringify(strValues)}).done(function (result) {
                if (result["status"] == "200") {
                    resultadoMessage = 'Se ha modificado el registro con id=' + result["message"];
                } else {
                    resultadoMessage = "ERROR: No se ha modificado el registro";
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

}
