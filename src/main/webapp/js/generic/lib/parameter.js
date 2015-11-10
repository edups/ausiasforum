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

var parameter = {
    getUrlObjectFromUrlString: function (url) {
        var a;
        if (typeof url == 'undefined') {
            return {};
        } else {
            if (url == "") {
                return {};
            } else {
                a = url.split('&');
            }
        }
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p = a[i].split('=');
            if (p.length != 2)
                p = ['id', p[0]]; //id parameter by default
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    },
    getStrSystemFilters: function (objFields) {
        var strResult = "";
        if (objFields['systemfilter'] != "") {
            strResult += objFields['systemfilter'];
            strResult += "=";
            strResult += objFields['systemfiltervalue'];
        }
        return strResult;
    },
    validateUrlObjectParameters: function (objParams) {
        //security borders comprobation, pendent of moving
        if (objParams["vf"] > 20) {
            objParams["vf"] = 20;
        }
        if (objParams["page"] > 100000) {
            objParams["page"] = 100000;
        }
        if (objParams["rpp"] > 100) {
            objParams["rpp"] = 100;
        }
        return objParams;
    },
    defaultizeUrlObjectParametersForLists: function (objParams) {
        if (typeof objParams["vf"] == 'undefined')
            objParams["vf"] = 99;
        return objParams;
    },
    defaultizeUrlObjectParameters: function (objParams) {
        if (typeof objParams["id"] == 'undefined')
            objParams["id"] = 1;
    return objParams;
    },
    getUrlObjectFromParamsWithoutParamArray: function (urlObj, nameParameterArray) {
        var newUrlObj = jQuery.extend(true, {}, urlObj); //http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
        $.each(nameParameterArray, function () {
            delete newUrlObj[this];
        })
        return newUrlObj;
    },
    getUrlStringFromParamsObject: function (urlObj) {
        var result = "";
        for (var key in urlObj) {
            result += "&" + key + "=" + urlObj[key];
        }
        return result.substring(1);
    },
    printOrderParamsInUrl: function (objParams) {
        if (objParams)
            if (objParams.order) {
                return '&order=' + objParams.order + '&ordervalue=' + objParams.ordervalue;
            } else {
                return '';
            }
    },
    printFilterParamsInUrl: function (objParams) {
        if (objParams)
            if (objParams.filter) {
                return "&filter=" + objParams.filter + "&filteroperator=" + objParams.filteroperator + "&filtervalue=" + objParams.filtervalue;
            } else {
                return '';
            }
    },
    printSystemFilterParamsInUrl: function (objParams) {
        if (objParams)
            if (objParams.systemfilter) {
                return "&systemfilter=" + objParams.systemfilter + "&systemfilteroperator=" + objParams.systemfilteroperator + "&systemfiltervalue=" + objParams.systemfiltervalue;
            } else {
                return '';
            }
    }
};
