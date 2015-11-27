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

configuration = {
    pathConfig: function () {

        Path.map("#/about").to(function () {
            $('#broth_panel_heading').empty().append(html.getPageHeader('<i class="fa fa-comments fa-5x"></i>', "openAusiàs", "the astonising framework"));
            $('#broth_content').empty();
        });
        Path.root("#/home");
        Path.map("#/").to(function () {
            $('#broth_panel_heading').empty().append(html.getPageHeader('<i class="fa fa-comments fa-5x"></i>', "openAusiàs", "the astonising framework"));
        });
        Path.map("#").to(function () {
            $('#broth_panel_heading').empty().append(html.getPageHeader('<i class="fa fa-comments fa-5x"></i>', "openAusiàs", "the astonising framework"));
            $('#broth_content').empty();
        });
        Path.map("#/home").to(function () {
            $('#broth_panel_heading').empty().append(html.getPageHeader('<i class="fa fa-comments fa-5x"></i>', "openAusiàs", "the astonising framework"));
            $('#broth_content').empty();
        });
        Path.rescue(function () {
            $('#broth_panel_heading').empty().append(html.getPageHeader('<i class="fa fa-ambulance fa-5x"></i>', "404: la página no existe", "la dirección no es correcta"));
            $('#broth_content').empty().append('<a href="' + config.getAppClientUrl() + '"/#/home">Ir a la página principal</a>');
        });
    }
}

