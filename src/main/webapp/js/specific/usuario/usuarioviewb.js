/* 
 * Copyright (c) 2015 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 * 
 * openAUSIAS: The stunning micro-library that helps you to develop easily 
 * AJAX web applications by using Java and jQuery
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
 * 
 */
var usuarioViewb = function () {
};
usuarioViewb.prototype = new viewModule();
usuarioViewb.prototype.getViewTemplate_func = function (strClass, jsonDataViewModule) {
    var tabla = "<table class=\"table table table-bordered table-condensed\">";
    var jsonMeta = jsonDataViewModule.meta.message;
    var jsonBean = jsonDataViewModule.bean.message;
    var valor;
    for (var k in jsonMeta) {
        var cabecera = jsonMeta[k].ShortName;        
        if (jsonMeta[k].IsObjForeignKey){
            nombre_obj=jsonMeta[k].Name;
            valor= {data: jsonBean[nombre_obj], meta:jsonMeta[k]};            
        } else {
            valor = jsonBean[jsonMeta[k].Name];
        }                
        var resultado= html.printPrincipal(valor);
//        valor = html.printPrincipal(jsonMeta[k]);
        tabla += '<tr><td><strong>' + cabecera + '</strong></td><td>' + resultado + '</td></tr>';

    }
    tabla += '</table>';
    return tabla;

}

