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
var pListModule = function () {
    var strOb;
    var strOp
    var paramsObject;

    var jsonData;
    var jsonMeta;
    var jsonPage;
    var jsonPages;
    var jsonRegisters = undefined;

    var orderParams;
    var filterParams;
    var systemFilterParams;
    var strUrlFromParamsWithoutPage;
    var strUrlFromParamsWithoutRpp;
    var strUrlFromParamsWithoutOrder;
    var urlWithoutPage;
    var urlWithoutRpp;
}
pListModule.prototype = new listModule();
//pListModule.prototype.refresh = function () {
//    ausiasFLOW.renderPage();
//    return false;
//};
pListModule.prototype.loadThButtons = function (meta, strClase, UrlFromParamsWithoutOrder) {
    return button.getTableHeaderButtons(meta.Name, strClase, 'plist', UrlFromParamsWithoutOrder);
}
pListModule.prototype.getRegistersInfo = function (regs) {
    return dom.p('', "Mostrando una consulta de " + regs + " registros.");
};
pListModule.prototype.getOrderInfo = function (objParams) {
    if (objParams['order']) {
        strOrder = "<p><small>Contenido ordenado por " + objParams["order"] + " (" + objParams["ordervalue"] + ') <a href="#/' + strOb + '/plist/' + parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(objParams, ["order", "ordervalue"])) + '" id="linkQuitarOrden">(Quitar orden)</a></small></p>';
    } else {
        strOrder = dom.p('', 'Contenido no ordenado');
    }
    ;
    return strOrder;
};
pListModule.prototype.getFilterInfo = function (objParams) {
    if (objParams['filter']) {
        strFilter =
                dom.p('',
                        dom.small('',
                                'Contenido filtrado (' + objParams ['filter'] + ' ' + objParams['filteroperator'] + ' ' + objParams['filtervalue'] + ') ' +
                                dom.a('href="#/' + strOb + '/plist/' + parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(objParams, ["filter", "filteroperator", "filtervalue"])) + '" id="linkQuitarFiltro"', '(Quitar filtro)')
                                )
                        );
        //strFilter = "<p><small>Contenido filtrado (" + objParams ['filter'] + " " + objParams['filteroperator'] + " " + objParams['filtervalue'] + ') <a href="#/' + strOb + '/plist/' + parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(objParams, ["filter", "filteroperator", "filtervalue"])) + '" id="linkQuitarFiltro">(Quitar filtro)</a></small></p>';
    } else {
        strFilter = dom.p('', 'Contenido no filtrado');
    }
    return strFilter;
};
pListModule.prototype.informationTemplate = function (infor, paging, rpp) {
    return(
            dom.p('',
                    dom.div('class="row"',
                            dom.div('class="col-lg-3 col-md-3 col-sm-12"', infor) +
                            dom.div('class="col-lg-6  col-md-6 col-sm-8 text-center"', 'Paginación: <br/>' + paging) +
                            dom.div('class="col-lg-3  col-md-3 col-sm-4 text-center"', 'Registros por página: <br/>' + rpp)
                            )
                    )
            );
}
pListModule.prototype.visibleFieldsTemplate = function () {

    return(
            dom.div('class="row"',
                    dom.div('class="col-md-12 text-center"',
                            dom.p('',
                                    dom.p('', 'Campos visibles:') +
                                    dom.form('class="navbar-form" role="form" action="Controller" method="post" id="visibleFieldsForm"',
                                            dom.select('id="selectVisibleFields" class="form-control" name="filter" width="80" style="width: 70px"')
                                            )
                                    )
                            )
                    )
            );
}
pListModule.prototype.filterFormTemplate = function () {
    return(
            dom.div('class="row"',
                    dom.div('class="col-md-12"',
                            dom.p('',
                                    dom.form('class="navbar-form navbar-right" role="form" action="Controller" method="post" id="empresaForm"',
                                            dom.select('id="selectFilter" class="form-control" name="filter" style="width: 160px"', '') +
                                            dom.select('id="selectFilteroperator" class="form-control" name="filteroperator" width="80" style="width: 200px"',
                                                    dom.option('value="like"', 'contiene') +
                                                    dom.option('value="notlike"', 'no contiene') +
                                                    dom.option('value="equals"', 'es igual a') +
                                                    dom.option('value="notequalto"', 'es distinto de') +
                                                    dom.option('value="less"', 'es menor que') +
                                                    dom.option('value="lessorequal"', 'es menor o igual que') +
                                                    dom.option('value="greater"', 'es mayor que') +
                                                    dom.option('value="greaterorequal"', 'es mayor o igual que')
                                                    ) +
                                            dom.input('id="inputFiltervalue" class="form-control" name="filtervalue" type="text" size="20" maxlength="50" value=""  width="100" style="width: 140px" placeholder="Valor"') +
                                            dom.input('type="submit" class="btn" id="btnFiltrar" name="btnFiltrar" value="Filtrar"')
                                            )
                                    )
                            )
                    )
            );
}
pListModule.prototype.filterFormClientTemplate = function () {
    return (
            dom.div('class="row"',
                    dom.div('class="col-md-12"',
                            dom.p('',
                                    dom.form('class="navbar-form navbar-right" role="form" action="Controller" method="post" id="empresaForm"',
                                            dom.input('id="inputFiltervalueClient" class="form-control" name="filtervalue" type="text" size="20" maxlength="50" value=""  width="100" style="width: 140px" placeholder="Valor"') +
                                            dom.input('type="submit" class="btn" id="btnFiltrarClient" name="btnFiltrarClient" value="Filtrar"')
                                            )
                                    )
                            )
                    )
            );
}
pListModule.prototype.newTemplate = function (strOb) {
    return(
            dom.div('class="row"',
                    dom.div('class="col-md-12 text-center"',
                            dom.p('',
                                    dom.br() +
                                    dom.a('class="btn btn-primary" href="#/' + strOb + '/new"',
                                            'Crear un nuevo ' + strOb
                                            )
                                    )
                            )
                    )
            );
}
pListModule.prototype.defaultizeUrlObjectParametersForPaginatedLists = function (objParams) {
    if (typeof objParams["page"] == 'undefined')
        objParams["page"] = 1;
    if (typeof objParams["rpp"] == 'undefined')
        objParams["rpp"] = 10;
    if (typeof objParams["vf"] == 'undefined')
        objParams["vf"] = 10;
    return objParams;
}
pListModule.prototype.prepareParams = function (oComponent) {
    strOb = oComponent.strOb;
    strOp = oComponent.strOp;
    paramsObject = this.defaultizeUrlObjectParametersForPaginatedLists(oComponent.strParams);
    orderParams = parameter.printOrderParamsInUrl(paramsObject);
    filterParams = parameter.printFilterParamsInUrl(paramsObject);
    systemFilterParams = parameter.printSystemFilterParamsInUrl(paramsObject);
    strUrlFromParamsWithoutPage = parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["page"]));
    strUrlFromParamsWithoutRpp = parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["rpp"]));
    strUrlFromParamsWithoutOrder = parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["order", "ordervalue"]));
    urlWithoutPage = '#/' + strOb + '/' + strOp + '/' + strUrlFromParamsWithoutPage;
    urlWithoutRpp = '#/' + strOb + '/' + strOp + '/' + strUrlFromParamsWithoutRpp;
}
pListModule.prototype.initialize = function (oComponent) {
    this.prepareParams(oComponent);
};
pListModule.prototype.getPromise = function () {
    if (strOb && paramsObject && paramsObject.rpp && paramsObject.page) {
        return promise.getSome(strOb, paramsObject.rpp, paramsObject.page, filterParams, orderParams, systemFilterParams);
    }

};
pListModule.prototype.getData = function (jsonDataReturned) {
    if (jsonDataReturned) {
        if (jsonDataReturned.status == "200") {
            jsonData = jsonDataReturned;
            if (parseInt(paramsObject["page"]) > parseInt(jsonData.message.pages.data)) {
                paramsObject["page"] = parseInt(jsonData.message.pages.data);
            }
            if (paramsObject.vf) {
                if (jsonData.message.meta.length < paramsObject["vf"]) {
                    paramsObject["vf"] = jsonData.message.meta.length;
                }
            }
        } else {
            //informar del error
        }
    } else {
        //informar del error
    }
};
pListModule.prototype.render = function () {
    if (!strOb) {
        return "error: No class defined in paginatedList module";
    }
    if (!paramsObject) {
        return "error: No params defined in paginatedList module";
    }
    if (jsonData) {
        if (jsonData.status != "200") {
            return "error: Invalid status code returned by the server";
        }
    } else {
        return "error: Lost server connection";
    }

    strGeneralInformation = this.informationTemplate(
            this.getRegistersInfo(jsonData.message.registers.message) + this.getOrderInfo(paramsObject) + this.getFilterInfo(paramsObject),
            pagination.getPageLinks(urlWithoutPage, parseInt(paramsObject["page"]), parseInt(jsonData.message.pages.message), 2),
            pagination.getRppLinks(urlWithoutRpp, paramsObject['rpp'])
            );
    strVisibleFields = this.visibleFieldsTemplate();
    strFilterForm = this.filterFormTemplate();
    strFilterFormClient = this.filterFormClientTemplate();
    strNewButton = this.newTemplate(strOb);
    //console.log(this.loadButtons('2','1'))   //??

    strTable = table.getTable(
            this.getHeaderPageTableFunc(jsonData.message.meta.message, strOb, strUrlFromParamsWithoutOrder, paramsObject.vf),
            this.getBodyPageTableFunc(jsonData.message.meta.message, jsonData.message.page.message, html.printPrincipal, this.loadButtons, this.loadPopups, paramsObject.vf)
            );
    return tab.getTab([
        {'name': 'Consulta', 'content': strGeneralInformation},
        {'name': 'Campos visibles', 'content': strVisibleFields},
        {'name': 'Filtro de servidor', 'content': strFilterForm},
        {'name': 'Filtro de cliente', 'content': strFilterFormClient},
        {'name': 'Nuevo registro', 'content': strNewButton}
    ]) + '<div id="tablePlace">' + strTable + '</div>';
};
pListModule.prototype.bind = function () {
    thisObject = this;
    //visible fields
    $('#selectVisibleFields').empty()
    form.populateSelectBox($('#selectVisibleFields'), array.getIntegerArray(1, jsonData.message.meta.message.length))
    $("#selectVisibleFields").val(paramsObject["vf"]);
    $('#selectVisibleFields').unbind('change');
    $("#selectVisibleFields").change(function () {
        window.location.href = "#/" + strOb + "/plist/" + parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ['vf'])) + "&vf=" + $("#selectVisibleFields option:selected").val();
        return false;
    });
    //filter
    form.populateSelectBox($('#selectFilter'), array.getArrayFromMultiSlicedArray('Name', jsonData.message.meta.message), array.getArrayFromMultiSlicedArray('ShortName', jsonData.message.meta.message));
    $('#btnFiltrar').unbind('click');
    $("#btnFiltrar").click(function (event) {
        var filter = $("#selectFilter option:selected").val();
        var filteroperator = $("#selectFilteroperator option:selected").val();
        var filtervalue = $("#inputFiltervalue").val();
        window.location.href = '#/' + strOb + '/plist/' + parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ['filter', 'filteroperator', 'filtervalue'])) + "&filter=" + filter + "&filteroperator=" + filteroperator + "&filtervalue=" + filtervalue;
        return false;
    });
    //filter client
    form.populateSelectBox($('#selectFilterClient'), array.getArrayFromMultiSlicedArray('Name', jsonData.message.meta.message), array.getArrayFromMultiSlicedArray('ShortName', jsonData.message.meta.message));
    $('#btnFiltrarClient').unbind('click');
    $("#btnFiltrarClient").click(function (event) {
        var filtervalue = $("#inputFiltervalueClient").val();
        //pte  -> reconstruir this.jsonPage con /word/.test(str)
        var arrayFiltered = array.filterArray(filtervalue, jsonData.message.page.message);
        //window.location.href = '#/' + thisObject.strClase + '/plist/' + parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(thisObject.objParams, ['filter', 'filteroperator', 'filtervalue'])) + "&filter=" + filter + "&filteroperator=" + filteroperator + "&filtervalue=" + filtervalue;

        var strUrlFromParamsWithoutPage = parameter.getUrlStringFromParamsObject(parameter.getUrlObjectFromParamsWithoutParamArray(paramsObject, ["order", "ordervalue"]));

        var strTable = table.getTable(
                thisObject.getHeaderPageTableFunc(jsonData.message.meta.message, strOb, strUrlFromParamsWithoutPage, paramsObject.vf),
                thisObject.getBodyPageTableFunc(jsonData.message.meta.message, arrayFiltered, html.printPrincipal, thisObject.loadButtons, thisObject.loadPopups, paramsObject.vf)
                );
        $('#broth_content').empty().append(tab.getTab([
            {'name': 'Consulta', 'content': strGeneralInformation},
            {'name': 'Campos visibles', 'content': strVisibleFields},
            {'name': 'Filtro de servidor', 'content': strFilterForm},
            {'name': 'Filtro de cliente', 'content': strFilterFormClient},
            {'name': 'Nuevo registro', 'content': strNewButton}
        ]) + '<div id="tablePlace">' + strTable + '</div>');
        return false;
    });
    $("[data-toggle='popover']").popover({trigger: "hover"});
};
