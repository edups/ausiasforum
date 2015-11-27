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
var removeModule = function () {
    var jsonData;
    var strClass;
    var parametersObject;
}
removeModule.prototype = new viewModule();

removeModule.prototype.fill = function () {
    $('#broth_content').append(
            dom.div('id="result"','¿Seguro que desea borrar el registro?')+
            dom.a('class="btn btn-danger" id="btnBorrarSi" href="#"','Sí, borrar')
            );
    $('#btnBorrarSi').unbind('click');
    $('#btnBorrarSi').click(function (event) {
        promise.removeOne(strClass, parametersObject['id']).done(function (result) {
            if (result["status"] == "200") {
                resultadoMessage = 'Se ha eliminado el registro con id=' + result["message"];
            } else {
                resultadoMessage = "ERROR: No se ha eliminado el registro";
            }
            var mensaje = "<h5>Código: " + result["status"] + "</h5><h5>" + resultadoMessage + "</h5>";
            modal.loadModalNotify($('#broth_modal'), mensaje, function () {
                //window.location.href = "#/" + strClass + "/plist/";
                $('#broth_content').empty();
                $('#broth_modal').empty();
            }, function () {
                $('#broth_content').empty();
                $('#broth_modal').empty();
            });
        });
        return false;
    });
}
