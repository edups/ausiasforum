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
validation = {
    getFormValidationCode: function (jsonMeta) {
        var matrix_form = _.map(jsonMeta, function (value, index) {
            if (value.IsIdForeignKey == false && value.IsObjForeignKey == false) {
                if (value.Type == "String") {
                    return  function () {
                        $('#' + value.Name).keyup(function (event) {
                            validation.resetValidationControl(value.Name);
                            var controlValue = $('#' + value.Name).val();
                            if (validation.validateMinLength(value.MinLength, controlValue)) {
                                if (validation.validateMaxLength(value.MaxLength, controlValue)) {
                                    validation.showValidationOKControl(value.Name);
                                } else {
                                    validation.showValidationErrorControl(value.Name, 'El valor ha de tener como máximo ' + value.MaxLength + ' caracteres');
                                }
                            } else {
                                validation.showValidationErrorControl(value.Name, 'El valor ha de tener como mínimo ' + value.MinLength + ' caracteres');
                            }
                        })
                    }
                }
                if (value.Type == "Boolean") {

                }
                if (value.Type == "Integer") {
                    return  function () {
                        $('#' + value.Name).keyup(function (event) {
                            validation.resetValidationControl(value.Name);
                            var controlValue = $('#' + value.Name).val();
                            if (validation.validateInteger(controlValue)) {
                                if (validation.validateMaxInteger(value.MaxInteger, controlValue)) {
                                    validation.showValidationOKControl(value.Name);
                                } else {
                                    validation.showValidationErrorControl(value.Name, 'EL valor entero ha de ser menor que ' + value.MaxInteger);
                                }
                            } else {
                                validation.showValidationErrorControl(value.Name, 'El valor ha de ser un número entero');
                            }
                        })
                    }
                }
                if (value.Type == "Date") {
                    return  function () {
                        $('#' + value.Name).keyup(function (event) {
                            validation.resetValidationControl(value.Name);
                            var controlValue = $('#' + value.Name).val();
                            if (validation.validateSpanishDate(controlValue)) {
                                validation.showValidationOKControl(value.Name);
                            } else {
                                validation.showValidationErrorControl(value.Name, 'Introduzca una fecha válida');
                            }
                        })
                    }
                }
            } else {
                if (value.IsObjForeignKey) {
                    return '';
                }
            }
        });
        return matrix_form;
    },
    resetValidationForm: function () {
        $(".feedback").remove();
        $(".form-group").removeClass("has-success");
        $(".form-group").removeClass("has-error");
        $(".form-group").removeClass("has-feedback");
    },
    resetValidationControl: function (strIdAttr) {
        $("#" + strIdAttr + "-group .feedback").remove();
        $("#" + strIdAttr + "-group").removeClass("has-success");
        $("#" + strIdAttr + "-group").removeClass("has-error");
        $("#" + strIdAttr + "-group").removeClass("has-feedback");
    },
    showValidationErrorControl: function (strIdAttr, strMsg) {
        $("#" + strIdAttr + "-group").addClass("has-error");
        $("#" + strIdAttr + "-group").addClass("has-feedback");
        $("#" + strIdAttr + "-group .control").append('<span class="feedback glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
        $("#" + strIdAttr + "-group .control").append('<span class="feedback control-label" for="' + strIdAttr + '">' + strMsg + '</span>');
    },
    showValidationOKControl: function (strIdAttr) {
        $("#" + strIdAttr + "-group").addClass("has-success");
        $("#" + strIdAttr + "-group").addClass("has-feedback");
        $("#" + strIdAttr + "-group .control").append('<span class="feedback glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
    },
    validateLeapYear: function (year) {
        if ((year % 100 != 0) && ((year % 4 == 0) || (year % 400 == 0))) {
            return true;
        }
        else {
            return false;
        }
    },
    validateSpanishDate: function (strDate) {
        if (strDate != undefined && strDate.value != "") {
            strDate = strDate.replace(/-/g, '/');
            var expreg = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
            if (!expreg.test(strDate)) {
                return false;
            }
            //var intYear = parseInt(strDate.substring(0, 4));
            //var strDay = strDate.substring(8, 10);
            //var strMonth = strDate.substring(5, 7);

            var intYear = parseInt(strDate.substring(6, 10));
            var strDay = strDate.substring(0, 2);
            var strMonth = strDate.substring(3, 5);


            switch (strMonth) {
                case "01":
                case "03":
                case "05":
                case "07":
                case "08":
                case "10":
                case "12":
                    nDays = 31;
                    break;
                case "04":
                case "06":
                case "09":
                case "11":
                    nDays = 30;
                    break;
                case "02":
                    if (validation.validateLeapYear(intYear)) {
                        nDays = 29
                    } else {
                        nDays = 28
                    }
                    ;
                    break;
                default:
                    return false;
            }

            if (strDay > nDays || strDay == 0) {
                return false;
            }
            return true;
        }
    },
    validateNotempty: function (strString) {
        if (strString) {
            return true
        } else {
            return false;
        }
    },
    validateEmail: function (strString) {
        var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if (pattern.test(strString)) {
            return true;
        } else {
            return false;
        }
    },
    validateFloatNumber: function (strString) {
        var pattern = /^-?\d+(\.\d+)?$/;
        if (pattern.test(strString)) {
            return true;
        } else {
            return false;
        }
    },
    validateInteger: function (strString) {
        var pattern = /^-?\d+$/;
        if (pattern.test(strString)) {
            return true;
        } else {
            return false;
        }
    },
    validateMaxInteger: function (intMaxInteger, intInteger) {
        if (intInteger > intMaxInteger) {
            return false;
        } else {
            return true;
        }
    },
    validateMaxLength: function (intMaxLength, strString) {
        if (strString.length > intMaxLength) {
            return false;
        } else {
            return true;
        }
    },
    validateMinLength: function (intMinLength, strString) {
        if (strString.length < intMinLength) {
            return false;
        } else {
            return true;
        }
    },
    loadValidationCallbacks: function (meta) {
        validation.resetValidationForm();
        var validationFunctionArray = validation.getFormValidationCode(meta);
        _.each(validationFunctionArray, function (validationFunction) {
            if (typeof (validationFunction) === "function") {
                validationFunction();
            }
            ;
        });
    },
    okValidation: function (f) {
        $('#' + this.clase + 'Form').on('success.form.bv', f);
    }
};