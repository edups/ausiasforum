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

var documentohiloPlist = function () {

};
documentohiloPlist.prototype = new pListModule();

documentohiloPlist.prototype.loadButtons = function (rowValues, strClass) {
    var botonera = "";
    botonera += '<div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-xs">';
    botonera += '<a class="btn btn-default cbo" id="' + rowValues[0].data + '"  href="#/post/plist/rpp=10&vf=10&systemfilter=obj_documento&systemfilteroperator=equals&systemfiltervalue=' + rowValues[0].data + '"><i class="fa fa-gamepad fa-1x"></i></a>';
    botonera += '</div></div>';
    return botonera;
};
//Botones Ordenado
documentohiloPlist.prototype.loadThButtons = function (meta, strClase, UrlFromParamsWithoutOrder) {
    return button.getTableHeaderButtons(meta.Name, strClase, 'hiloplist', UrlFromParamsWithoutOrder);
}



documentohiloPlist.prototype.getHeaderPageTableFunc = function (jsonMeta, strOb, UrlFromParamsWithoutOrder, visibles, acciones) {
    thisObject = this;
    acciones = typeof (acciones) != 'undefined' ? acciones : true;

    arr_meta_data_tableHeader_filtered = _.filter(jsonMeta, function (oItem) {
        if (oItem.Name == "id" || oItem.Name == "titulo" || oItem.Name == "alta") {
            return true;
        } else {
            return false;
        }
    });
    arr_meta_data_tableHeader = _.map(arr_meta_data_tableHeader_filtered, function (oMeta, key) {
        if (oMeta.IsId) {
            return '<div class="col-md-1">'
                    + oMeta.UltraShortName
                    + '<br />'
                    + thisObject.loadThButtons(oMeta, strOb, UrlFromParamsWithoutOrder)
                    + '</div>';
        } else if (oMeta.Name == "titulo") {
            return '<div class="col-md-7 col-md-offset-1 cabeceraTitulo">'
                    + oMeta.ShortName
                    + '<br />'
                    + thisObject.loadThButtons(oMeta, strOb, UrlFromParamsWithoutOrder)
                    + '</div>';
        } else {
            return  '<div class="col-md-2  cabeceraCuerpo">'
                    + 'Fecha de Creación'
                    + '<br />'
                    + thisObject.loadThButtons(oMeta, strOb, UrlFromParamsWithoutOrder)
                    + '</div>';
        }
    });

    //visibles
    if (visibles) {
        arr_meta_data_tableHeader_visibles = arr_meta_data_tableHeader.slice(1, parseInt(visibles));
    } else {
        arr_meta_data_tableHeader_visibles = arr_meta_data_tableHeader;
    }
    return '<div class="row cabeceraGlobal">' + arr_meta_data_tableHeader_visibles.join('') + '</div>';
}
documentohiloPlist.prototype.getBodyPageTableFunc = function (meta, page, printPrincipal, tdButtons_function, trPopup_function, visibles) {
    //thisObject.jsonData.message.page.list: es un array de objetos. Cada objeto contiene una fila de la tabla de la petición
    //thisObject.jsonData.message.meta; es un array de objetos. Every object contains metadata from every object to print in every row
    var matrix_meta_data = _.map(page, function (oRow, keyRow) {
        return _.map(meta, function (oMeta, keyMeta) {
            return  {meta: oMeta, data: oRow[oMeta.Name]};
        });
    });
    //Filtra los campos del array de objetos recogiendo los que son necesarios en nuestro caso
    matrix_meta_data_filtered = _.map(matrix_meta_data, function (oFilter) {
        return _.pick(oFilter, 0, 1, 3);
    });
    //is an array (rpp) of arrays (rows) of objects
    //every object contains the data and its metadata
    var arr_meta_data_table_buttons = _.map(matrix_meta_data_filtered, function (value, key) {
        return (_.map(matrix_meta_data_filtered[key], function (value2, key2) {
            var dataid = matrix_meta_data_filtered[key][0].data;

            if (value2.meta.Name == "titulo") {
                return   '<div class="row post">'
                        + '<div class="col-md-1 icono">'
                        + '<i class="fa fa-list-alt fa-2x"></i>'
                        + '</div>'
                        + '<div class="col-md-7 titulo">'
                        + '<a  id="' + dataid + '"  href="#/post/plist/rpp=10&vf=10&systemfilter=obj_documento&systemfilteroperator=equals&systemfiltervalue=' + dataid + '">'
                        + printPrincipal(value2)
                        + '</a>'
                        + '</div>'
            } else {

                return '<div class="col-md-4 matriz">'
                        + printPrincipal(value2)
                        + '</div>';
            }

        })
                )
                .slice(1, parseInt(visibles))
                .concat(['</div>']);
    });
    //is an array (rpp) of arrays (rows) of strings
    //every string contains the data of the table cell
    //there's an additional row to contain the buttons for the operations
    var arr_meta_data_table_buttons_reduced = _.map(arr_meta_data_table_buttons, function (value, key) {
        return _.reduce(value, function (memo, num) {
            return memo + num;
        });
    });
    //is an array (rpp) of strings 
    //where every string is a ...
    var str_meta_data_table_buttons_reduced_reduced = _.reduce(arr_meta_data_table_buttons_reduced, function (memo, num) {
        return memo + '<div class="temapost">' + num + '</div>';
    });
    //is a string that contains the table body
    return str_meta_data_table_buttons_reduced_reduced;
}

documentohiloPlist.prototype.render = function () {
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
        {'name': 'Indice de temas', 'content': strFilterFormClient}
    ]) + '<div id="tablePlace">' + strTable + '</div>';
};

documentohiloPlist.prototype.filterFormClientTemplate = function () {
    return (
            dom.div('class="row"',
                    dom.div('class="col-md-12"',
                            dom.p('',
                                    dom.form('class="navbar-form navbar-right" role="form" action="Controller" method="post" id="empresaForm"',
                                            dom.a('class="btn btn-default cbo" href="#/documento/hilonew"', 'Nuevo tema') +
                                            dom.input('id="inputFiltervalueClient" class="form-control" name="filtervalue" type="text" size="20" maxlength="50" value=""  width="100" style="width: 140px" placeholder="Buscar ..."') +
                                            dom.input('type="submit" class="btn" id="btnFiltrarClient" name="btnFiltrarClient" value="Buscar"')
                                            )
                                    )
                            )
                    )
            );
}

documentohiloPlist.prototype.bind = function () {
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
        ]) + '<div id="tablePlace">' + strTable + '</div>');
        return false;
    });
    $("[data-toggle='popover']").popover({trigger: "hover"});
};