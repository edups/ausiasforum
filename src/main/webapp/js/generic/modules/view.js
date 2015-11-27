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
var viewModule = function () {    
    var strClass;
    var parametersObject;
    var jsonDataViewModule;
}
viewModule.prototype = new baseModule();
viewModule.prototype.getViewTemplate_func = function (strClass, jsonDataViewModule) {
    arr_meta_data = _.map(jsonDataViewModule.meta.message, function (value) {
        return  {meta: value, data: jsonDataViewModule.bean.message[value.Name]};
    });
    arr_meta_data_table = _.map(arr_meta_data, function (value, key) {
        return  '<tr><td><strong>' + value.meta.ShortName + '</strong></td><td>' + html.printPrincipal(value) + '</td></tr>';
    });
    return "<table class=\"table table table-bordered table-condensed\">"
            + arr_meta_data_table.join('')
            + '</table>';
};
viewModule.prototype.initialize = function (oComponent) {
    strClass = oComponent.strOb;
    parametersObject = oComponent.strParams;
}
viewModule.prototype.getPromise = function () {
    if (parametersObject['id'] && strClass) {
        return promise.getOne(strClass, parametersObject['id']);
    }
}
viewModule.prototype.getData = function (jsonDataViewModuleReceived) {
    if (jsonDataViewModuleReceived) {
        if (jsonDataViewModuleReceived.status == "200") {
            jsonDataViewModule = jsonDataViewModuleReceived;
        } else {
            //informar error
        }
    } else {
        //informar error
    }
}
viewModule.prototype.render = function () {
    if (!strClass) {
        return 'ERROR: No class defined';
    }
    if (!parametersObject['id']) {
        return 'ERROR: No id defined';
    }
    if (!jsonDataViewModule.message) {
        return 'ERROR: Server communication interrupted';
    }
    return this.getViewTemplate_func(strClass, jsonDataViewModule.message);
}
