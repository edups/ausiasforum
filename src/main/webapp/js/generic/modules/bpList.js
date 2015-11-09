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



var bpListModule = function () {
}
bpListModule.prototype = new pListModule();
bpListModule.prototype.loadThButtons = function (meta, strClase, UrlFromParamsWithoutOrder) {
    return button.getTableHeaderButtons(meta.Name, strClase, 'bpList', UrlFromParamsWithoutOrder);
}
bpListModule.prototype.bindAll = function (place, objParams, callbackFunction, oModel, oView) {
    var thisObject = this;
    $('.pagination_link').unbind('click');
    $('.pagination_link').click(function (event) {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["page"]);
        paramsObject["page"] = parseInt($(this).attr('id'));
        
        //ausiasFLOW.getComponent('view').strParams['id']
        
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        thisObject.strParams=paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    $('#selectVisibleFields').unbind('change');
    $("#selectVisibleFields").change(function () {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["vf"]);
        paramsObject["vf"] = $("#selectVisibleFields option:selected").val();
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    $('.rpp_link').unbind('click');
    $('.rpp_link').on('click', function (event) {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["rpp"]);
        paramsObject["rpp"] = parseInt($(this).attr('id'));
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    if (callbackFunction) {
        $('.btn.btn-default.selector_button').unbind('click');
        $('.btn.btn-default.selector_button').click(function (event) {
            callbackFunction(parseInt($(this).attr('id')))
        });
    }
    ;
    $('#btnFiltrar').unbind('click');
    $("#btnFiltrar").click(function (event) {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["filter", "filteroperator", "filtervalue"]);
        paramsObject["filter"] = $("#selectFilter option:selected").val();
        paramsObject["filteroperator"] = $("#selectFilteroperator option:selected").val();
        paramsObject["filtervalue"] = $("#inputFiltervalue").val();
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    $('.orderAsc').unbind('click');
    $('.orderAsc').on('click', function (event) {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["order", "ordervalue"]);
        paramsObject["order"] = $(this).attr('id');
        paramsObject["ordervalue"] = "asc";
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    $('.orderDesc').unbind('click');
    $('.orderDesc').on('click', function (event) {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["order", "ordervalue"]);
        paramsObject["order"] = $(this).attr('id');
        paramsObject["ordervalue"] = "desc";
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    $('#linkQuitarOrden').unbind('click');
    $('#linkQuitarOrden').click(function () {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["order", "ordervalue"]);
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
    $('#linkQuitarFiltro').unbind('click');
    $('#linkQuitarFiltro').click(function () {
        paramsObject = parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["filter", "filteroperator", "filtervalue"]);
        
        thisObject.strParams=paramsObject;
        //ausiasFLOW.pListModule_paramsObject = paramsObject;
        ausiasFLOW.dataRenderFillAndBind(thisObject, true);
        return false;
    });
}
