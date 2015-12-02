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
     jsonData_filtered = _.filter(jsonData.message, function(oItem){
        if (oItem.Name=="id" || oItem.Name=="titulo" || oItem.Name =="obj_tipodocumento") {
            return true;
        } else {
            return false;
        }
    } );
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
                    $('#obj_' + obForeign + '_desc').html(html.printObject2(obForeign, json.message.meta.message,json.message.bean.message));
                });
//                $('#modal01').modal('hide');
//            });
//            return false;
//        });


}
}

 documentohiloNew.prototype.doEventsLoading = function () {
   form.getForeign('documento','usuario'); 
   form2.gethilo('documento','tipodocumento');     
   
};
