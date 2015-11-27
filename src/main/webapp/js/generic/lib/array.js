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

var array = {
    getArrayFromMultiSlicedArray: function (field, arrayToBeSliced) {
        var resultArray = [];
        $.each(arrayToBeSliced, function (index, value) {

            resultArray.push(value[field]);
        })
        return resultArray;
    },
    filterArray: function (strSearchTerm, arrayData) {
        var resultArray = [];
        $.each(arrayData, function (index1, value1) {
            thisValue1 = value1;
            $.each(value1, function (index2, value2) {

                if ((new RegExp(strSearchTerm)).test(value2)) {
                    resultArray.push(thisValue1);
                    return false;
                }
            })
        })
        return resultArray;
    },
    getIntegerArray: function (min, max) {
        var iArray = [];
        for (var counter = min; counter <= max; counter++) {
            iArray.push(counter);
        }
        return iArray;
    },
    identificarArray: function (arr) {
        var newObj = {};
        for (var property in arr) {
            if (arr.hasOwnProperty(property)) {
                if (property.match("^obj_")) {
                    newObj[string.identificar(property)] = arr[property];
                } else {
                    newObj[property] = arr[property];
                }
            }
        }
        return newObj;
    }
}



