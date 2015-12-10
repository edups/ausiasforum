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
var documentohiloNew = function () {
};
documentohiloNew.prototype = new newModule();

//documentohiloNew.prototype.doEventsLoading = function () {
documentohiloNew.prototype.render = function () {
    if (jsonData.status == "200") {
        jsonData_filtered = _.filter(jsonData.message, function (oItem) {
            if (oItem.Name == "id" || oItem.Name == "titulo" || oItem.Name == "obj_tipodocumento") {
                return true;
            } else {
                return false;
            }
        });
        return form.getFormTemplate(strClass, jsonData_filtered);
    } else {
        return util.notifyException(jsonData.status, jsonData.message);
    }

};
form2 = {
    gethilo: function (obMain, obForeign) {
//        $('#' + obMain + 'Form #obj_' + obForeign + '_button').unbind('click');
//        $('#' + obMain + 'Form #obj_' + obForeign + '_button').click(function () {
//            $('#' + obMain + 'Form').append(modal.getEmptyModal('modal01'));
//            modal.loadModal('#modal01', modal.getModalHeader('Elección de ' + obForeign), "", modal.getModalFooter(), true);
//            ausiasFLOW.initialize(ebpListModule, $('#modal-body'), obForeign , 'plist', {"vf": 4}, function (id) {
        $('#obj_' + obForeign).val(1);
        promise.getOne(obForeign, 1).done(function (json) {
            $('#obj_' + obForeign + '_desc').html(html.printObject2(obForeign, json.message.meta.message, json.message.bean.message));
        });
//                $('#modal01').modal('hide');
//            });
//            return false;
//        });


    }
}

documentohiloNew.prototype.doEventsLoading = function () {
    form.getForeign('documento', 'usuario');
    form2.gethilo('documento', 'tipodocumento');

};
modal2 = {
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
        // pie=    '<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" id="hilo">Ver el hilo nuevo</button>'
        pie = '<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" id="foro">Ir al foro</button>';
        return pie;
    },
    loadModalNotify: function (place, message, afterNotifyFunction) {
        $(place).append(modal2.getEmptyModal('modal01'));
        modal2.loadModal('#modal01', modal2.getModalHeader('Respuesta del servidor'), message, modal2.getModalFooter(), true);
        $('#modal01').css({'right': '20px', 'left': '20px', 'width': 'auto', 'margin': '10px', 'display': 'block'});
        $('#modal01').on('hidden.bs.modal', afterNotifyFunction);
    }
}

documentohiloNew.prototype.bind = function () {
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
            modal2.loadModalNotify($('#broth_modal'), mensaje, function () {

                window.location.href = "#/documento/hiloplist/page=1&rpp=10&vf=10&systemfilter=obj_tipodocumento&systemfilteroperator=equals&systemfiltervalue=1";

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
