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

pagination = {
    getPageLinks: function (url, page_number, total_pages, neighborhood) {
        vector = "<ul class=\"pagination\">";
        if (page_number > 1)
            vector += ('<li><a class="pagination_link" id="' + (page_number - 1) + '" href="' + url + '&page=' + (page_number - 1) + '">prev</a></li>');
        if (page_number > neighborhood + 1)
            vector += ('<li><a class="pagination_link" id="1" href="' + url + '&page=1">1</a></li>');
        if (page_number > neighborhood + 2)
            vector += ('<li>' + '<a href="#">...</a>' + '</li>');
        for (i = (page_number - neighborhood); i <= (page_number + neighborhood); i++) {
            if (i >= 1 && i <= total_pages) {
                if (page_number === i) {
                    vector += ('<li class="active"><a class="pagination_link" id="' + i + '" href="' + url + '&page=' + i + '">' + i + '</a></li>');
                }
                else
                    vector += ('<li><a class="pagination_link" id="' + i + '" href="' + url + '&page=' + i + '">' + i + '</a></li>');
            }
        }
        if (page_number < total_pages - (neighborhood + 1))
            vector += ('<li>' + '<a href="#">...</a>' + '</li>');
        if (page_number < total_pages - (neighborhood))
            vector += ('<li><a class="pagination_link" id="' + total_pages + '" href="' + url + '&page=' + total_pages + '">' + total_pages + '</a></li>');
        if (page_number < total_pages)
            vector += ('<li><a class="pagination_link"  id="' + (page_number + 1) + '" href="' + url + '&page=' + (page_number + 1) + '">next</a></li>');
        vector += "</ul>";
        return vector;
    },
    getRppLinks: function (UrlFromParamsWithoutRpp, rpp) {
        var botonera = '<ul class="pagination">';
        if (rpp == 10)
            botonera += '<li class="active">';
        else
            botonera += '<li>';
        botonera += '<a class="rpp_link" id="10" href="' + UrlFromParamsWithoutRpp + '&rpp=10">10</a></li>';
        if (rpp == 50)
            botonera += '<li class="active">';
        else
            botonera += '<li>';
        botonera += '<a class="rpp_link" id="50" href="' + UrlFromParamsWithoutRpp + '&rpp=50">50</a></li>';
        if (rpp == 100)
            botonera += '<li class="active">';
        else
            botonera += '<li>';
        botonera += '<a class="rpp_link" id="100" href="' + UrlFromParamsWithoutRpp + '&rpp=100">100</a></li>';
        botonera += '</ul>';
        return botonera;
    }
}