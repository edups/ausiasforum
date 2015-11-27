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


dom = {
    div: function (strAttributes, strText) {
        return html.dom2('div', strAttributes, strText);
    },
    a: function (strAttributes, strText) {
        return html.dom2('a', strAttributes, strText);
    },
    span: function (strAttributes, strText) {
        return html.dom2('span', strAttributes, strText);
    },
    small: function (strAttributes, strText) {
        return html.dom2('small', strAttributes, strText);
    },
    h1: function (strAttributes, strText) {
        return html.dom2('h1', strAttributes, strText);
    },
    h2: function (strAttributes, strText) {
        return html.dom2('h2', strAttributes, strText);
    },
    h3: function (strAttributes, strText) {
        return html.dom2('h3', strAttributes, strText);
    },
    h4: function (strAttributes, strText) {
        return html.dom2('h4', strAttributes, strText);
    },
    h5: function (strAttributes, strText) {
        return html.dom2('h5', strAttributes, strText);
    },
    h6: function (strAttributes, strText) {
        return html.dom2('h6', strAttributes, strText);
    },
    p: function (strAttributes, strText) {
        return html.dom2('p', strAttributes, strText);
    },
    mark: function (strAttributes, strText) {
        return html.dom2('mark', strAttributes, strText);
    },
    del: function (strAttributes, strText) {
        return html.dom2('del', strAttributes, strText);
    },
    s: function (strAttributes, strText) {
        return html.dom2('s', strAttributes, strText);
    },
    i: function (strAttributes, strText) {
        return html.dom2('i', strAttributes, strText);
    },
    u: function (strAttributes, strText) {
        return html.dom2('u', strAttributes, strText);
    },
    strong: function (strAttributes, strText) {
        return html.dom2('strong', strAttributes, strText);
    },
    m: function (strAttributes, strText) {
        return html.dom2('m', strAttributes, strText);
    },
    code: function (strAttributes, strText) {
        return html.dom2('code', strAttributes, strText);
    },
    blockquote: function (strAttributes, strText) {
        return html.dom2('blockquote', strAttributes, strText);
    },
    footer: function (strAttributes, strText) {
        return html.dom2('footer', strAttributes, strText);
    },
    cite: function (strAttributes, strText) {
        return html.dom2('cite', strAttributes, strText);
    },
    ul: function (strAttributes, strText) {
        return html.dom2('ul', strAttributes, strText);
    },
    li: function (strAttributes, strText) {
        return html.dom2('li', strAttributes, strText);
    },
    table: function (strAttributes, strText) {
        return html.dom2('table', strAttributes, strText);
    },
    tr: function (strAttributes, strText) {
        return html.dom2('tr', strAttributes, strText);
    },
    td: function (strAttributes, strText) {
        return html.dom2('td', strAttributes, strText);
    },
    img: function (strAttributes, strText) {
        return html.dom2('img', strAttributes, strText);
    },
    br: function () {
        return "<br>\n";
    },
    form: function (strAttributes, strText) {
        return html.dom2('form', strAttributes, strText);
    },
    label: function (strAttributes, strText) {
        return html.dom2('label', strAttributes, strText);
    },
    select: function (strAttributes, strText) {
        return html.dom2('select', strAttributes, strText);
    },
    option: function (strAttributes, strText) {
        return html.dom2('option', strAttributes, strText);
    },
    input: function (strAttributes, strText) {
        return html.dom2('input', strAttributes, strText);
    },
    textarea: function (strAttributes, strText) {
        return html.dom2('textarea', strAttributes, strText);
    },
    button: function (strAttributes, strText) {
        return html.dom2('button', strAttributes, strText);
    },
    fieldset: function (strAttributes, strText) {
        return html.dom2('fieldset', strAttributes, strText);
    }
};

