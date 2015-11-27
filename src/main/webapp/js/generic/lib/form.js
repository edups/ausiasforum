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

$.fn.serializeObject = function ()
{
    // http://jsfiddle.net/davidhong/gP9bh/
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = encodeURIComponent(this.value) || '';
        }
    });
    return o;
};

form = {
    form: function (id, content) {
        return (
                dom.form('class="form-horizontal" role="form" action="#" id="' + id + '" name="formulario"',
                        dom.div('id="fields' + id + '"', content) +
                        dom.div('class="form-group"',
                                dom.div('class="col-sm-offset-2 col-sm-10"',
                                        dom.div('id="messages"', '')
                                        )
                                ) +
                        dom.div('class="form-group"',
                                dom.div('class="col-sm-offset-2 col-sm-10"',
                                        dom.button('class="btn btn-primary" id="submitForm"', 'Guardar')
                                        )
                                )

                        )
                );
    },
    formInputTypeDate: function (fieldName, fieldShortName, fieldUltraShortName, controlWidth) {
        return(
                dom.div('id="' + fieldName + '-group" class="form-group"',
                        dom.label('class="col-sm-2 control-label" for="' + fieldName + '"', fieldShortName + ':') +
                        dom.div('class="control col-sm-' + controlWidth + '"',
                                dom.div('class="input-group date" id="' + fieldName + '_group"',
                                        dom.span('class="input-group-addon"',
                                                dom.span('class="glyphicon glyphicon-calendar"', '')
                                                ) +
                                        dom.input('type="text" class="form-control" id="' + fieldName + '" name="' + fieldName + '" placeholder="' + fieldUltraShortName + '"', '')
                                        )
                                )
                        ) +
                '<script type="text/javascript">$("#' + fieldName + '_group").datetimepicker({format: "DD/MM/YYYY",locale: "es"});</script>'
                );
    },
    formForeign: function (fieldName, fieldShortName) {
        return(
                dom.div('class="form-group"',
                        dom.label('class="col-sm-2 control-label" for="' + fieldName + '"', fieldShortName + ':') +
                        dom.div('class="control col-sm-3"',
                                dom.div('class="input-group foreign" id="' + fieldName + '_group"',
                                        dom.span('class="input-group-addon" id="' + fieldName + '_button"',
                                                dom.span('class="glyphicon glyphicon-search"', '')
                                                ) +
                                        dom.input('readonly="true" class="form-control" id="' + fieldName + '" class="input-mini" name="' + fieldName + '" type="text" size="5" maxlength="5"', '')
                                        )
                                ) +
                        dom.label('class="col-sm-7" for="' + fieldName + '_desc" id="' + fieldName + '_desc"', '')
                        )
                );
    },
    formCheckBox: function (fieldName, fieldShortName) {
        return(
                dom.div('id="' + fieldName + '-group" class="form-group"',
                        dom.label('class="col-sm-2 control-label"  for="' + fieldName + '"', fieldShortName + ":") +
                        dom.div('class="control col-sm-1"',
                                dom.input('type="checkbox" id="' + fieldName + '" name="' + fieldName + '" value="true"', '')
                                )
                        )
                );
    },
    formInputTypeInteger: function (fieldName, fieldShortName, controlWidth) {
        return(
                dom.div('id="' + fieldName + '-group" class="form-group  has-success has-feedback"',
                        dom.label('class="col-sm-2 control-label"  for="' + fieldName + '"', fieldShortName + ":") +
                        dom.div('class="control col-sm-' + controlWidth + '"',
                                dom.input('type="text" id="' + fieldName + '" class="form-control" name="' + fieldName + '" size="15" placeholder="' + fieldName + '"', '')
                                )
                        )
                );
    },
    formInputTypeText: function (fieldName, fieldShortName, controlWidth) {
        return(
                dom.div('id="' + fieldName + '-group" class="form-group has-feedback"',
                        dom.label('class="col-sm-2 control-label"  for="' + fieldName + '"', fieldShortName + ":") +
                        dom.div('class="control col-sm-' + controlWidth + '"',
                                dom.input('type="text" id="' + fieldName + '" class="form-control" name="' + fieldName + '" size="15" placeholder="' + fieldName + '"', '')
                                )
                        )
                );
    },
    getFormTemplate: function (strClass, jsonMeta) {
        var matrix_form = _.map(jsonMeta, function (value, index) {
            if (value.IsIdForeignKey == false && value.IsObjForeignKey == false) {
                if (value.Type == "String") {
                    return form.formInputTypeText(value.Name, value.ShortName, form.getInputTypeTextLenght(value.MaxLength));
                }
                if (value.Type == "Boolean") {
                    return form.formCheckBox(value.Name, value.ShortName);
                }
                if (value.Type == "Integer") {
                    return form.formInputTypeInteger(value.Name, value.ShortName, form.getInputTypeTextLenght(value.MaxInteger.toString().length));
                }
                if (value.Type == "Date") {
                    return form.formInputTypeDate(value.Name, value.ShortName, value.ShortName, form.getInputTypeTextLenght(10));
                }
            } else {
                if (value.IsObjForeignKey) {
                    return form.formForeign(value.Name, value.ShortName);
                }
            }
        });
        var string_form = _.reduce(matrix_form, function (memo, control) {
            return memo + control;
        });
        return form.form(strClass + 'Form', string_form);
    },
    getFormValues: function (strClass) {
        var valores = [];
        var disabled = $('#' + strClass + 'Form').find(':input:disabled').removeAttr('disabled');
        valores = $('#' + strClass + 'Form').serializeObject();
        disabled.attr('disabled', 'disabled');
        return valores;
    },
    populateSelectBox: function (place, values, captions) {
        var combo = $(place);
        if (combo.is("select")) {
            $.each(values, function (index) {
                if (typeof captions === "undefined")
                    combo.append($("<option />").val(this).text(this));
                else
                    combo.append($("<option />").val(this).text(captions[index]));
            });
        }
    },
    getInputTypeTextLenght: function (intMaxLenght) {
        if (intMaxLenght <= 255) {
            if (intMaxLenght <= 200) {
                if (intMaxLenght <= 150) {
                    if (intMaxLenght <= 100) {
                        if (intMaxLenght <= 50) {
                            if (intMaxLenght <= 25) {
                                return 3;
                            } else {
                                return 4;
                            }
                            ;
                        } else {
                            return 5;
                        }
                        ;
                    } else {
                        return 6;
                    }
                    ;
                } else {
                    return 7;
                }
                ;
            } else {
                return 8;
            }
            ;
        } else {
            return 9;
        }
        ;
    },
    getForeign: function (obMain, obForeign) {
        $('#' + obMain + 'Form #obj_' + obForeign + '_button').unbind('click');
        $('#' + obMain + 'Form #obj_' + obForeign + '_button').click(function () {
            $('#' + obMain + 'Form').append(modal.getEmptyModal('modal01'));
            modal.loadModal('#modal01', modal.getModalHeader('Elección de ' + obForeign), "", modal.getModalFooter(), true);
            ausiasFLOW.initialize(ebpListModule, $('#modal-body'), obForeign , 'plist', {"vf": 4}, function (id) {
                $('#obj_' + obForeign).val(id);
                promise.getOne(obForeign, id).done(function (json) {
                    $('#obj_' + obForeign + '_desc').html(html.printObject2(obForeign, json.message.meta.message,json.message.bean.message));
                });
                $('#modal01').modal('hide');
            });
            return false;
        });

    }
};
