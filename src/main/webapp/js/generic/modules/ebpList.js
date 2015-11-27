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
var ebpListModule = function () {
}
ebpListModule.prototype = new bpListModule();
ebpListModule.prototype.loadThButtons = function (meta, strClase, UrlFromParamsWithoutOrder) {
    return button.getTableHeaderButtons(meta.Name, strClase, 'ebpList', UrlFromParamsWithoutOrder);
}
ebpListModule.prototype.loadButtons = function (rowValues, strClass) {
    var botonera = "";
    botonera += '<div class="btn-toolbar" role="toolbar"><div class="btn-group btn-group-xs">';
    botonera += '<a class="btn btn-default selector_button" id="' + html.getId(rowValues) + '"  href="#"><i class="glyphicon glyphicon-ok"></i></a>';
    botonera += '</div></div>';
    return botonera;
};
ebpListModule.prototype.bindCallback = function (callbackFunction) {
    $('.btn.btn-default.selector_button').unbind('click');
    $('.btn.btn-default.selector_button').click(function (event) {
        callbackFunction(parseInt($(this).attr('id')))
        return false;
    });
};