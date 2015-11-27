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

tab = {
    getTab: function (params) {
        var tab1 = '';
        var tab2 = '';
        var ini = '<div role="tabpanel"><ul class="nav nav-tabs" role="tablist">';
        var midi = '</ul><div class="tab-content">';
        var fini = '</div></div>';
        $.each(params, function (index, value) {
            if (index == 0) {
                tab1 += '<li role="presentation" class="active"><a href="#pane' + index + '" aria-controls="pane' + index + '" role="tab" data-toggle="tab">' + value.name + '</a></li>';
                tab2 += '<div role="tabpanel" id="pane' + index + '" class="tab-pane fade active in">' + value.content + '</div>';
            } else {
                tab1 += '<li role="presentation"><a href="#pane' + index + '" aria-controls="pane' + index + '" role="tab" data-toggle="tab">' + value.name + '</a></li>';
                tab2 += '<div role="tabpanel" id="pane' + index + '" class="tab-pane fade">' + value.content + '</div>';
            }
        });
        return (ini + tab1 + midi + tab2 + fini);
    }
}
