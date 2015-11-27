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

modal = {
    getEmptyModal: function (name) {
        var modal = '<div id="' + name + '" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
        modal += '<div class="modal-dialog modal-lg">';
        modal += '<div class="modal-content">';
        modal += '<div class="modal-header" id="modal-header"></div>';
        modal += '<div class="modal-body" id="modal-body"></div>';
        modal += '<div class="modal-footer" id="modal-footer"></div>';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';
        return modal;
    },
    load: function (modalName, keyb) {
        $(modalName).modal({
            keyboard: keyb
        })
    },
    loadModal: function (modalName, headerData, bodyData, footerData, keyb) {
        $(modalName + ' .modal-header').empty().append(headerData);
        $(modalName + ' .modal-body').empty().append(bodyData);
        $(modalName + ' .modal-footer').empty().append(footerData);
        $(modalName).modal({
            keyboard: keyb
        })
    },
    getModalHeader: function (title) {
        cabecera = '<button id="full-width" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';
        cabecera += '<h1 id="myModalLabel">' + title + '</h1>';
        return cabecera;
    },
    getModalFooter: function () {
        return pie = '<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Cerrar</button>';
    },
    loadModalNotify: function (place, message, afterNotifyFunction) {
        $(place).append(modal.getEmptyModal('modal01'));
        modal.loadModal('#modal01', modal.getModalHeader('Respuesta del servidor'), message, modal.getModalFooter(), true);
        $('#modal01').css({'right': '20px', 'left': '20px', 'width': 'auto', 'margin': '10px', 'display': 'block'});
        $('#modal01').on('hidden.bs.modal', afterNotifyFunction);
    }
}