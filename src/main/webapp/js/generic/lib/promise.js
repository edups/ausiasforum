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
promise = {
    getSession: function () {
        return ajax.call(config.getAppUrl() + '?ob=usuario&op=getsessionstatus', 'GET', '');
    },
    getLogin: function (username, password) {
        return ajax.call(config.getAppUrl() + '?ob=usuario&op=login&login=' + username + '&password=' + password, 'GET', '');
    },
    getLogout: function () {
        return ajax.call(config.getAppUrl() + '?ob=usuario&op=logout', 'GET', '');
    },
    getOne: function (strClass, id) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=getaggregateviewone&id=' + id, 'GET', '');
    },
    getMeta: function (strClass) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=getmetainformation', 'GET', '');
    },
    getSome: function (strClass, rpp, page, filterParams, orderParams, systemfilterParams) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=getaggregateviewsome' + '&rpp=' + rpp + '&page=' + page + filterParams + orderParams + systemfilterParams, 'GET', '');
    },
    getAll: function (strClass, filterParams, orderParams, systemfilterParams) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=getaggregateviewall' + filterParams + orderParams + systemfilterParams, 'GET', '');
    },
    removeOne: function (strClass, id) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=remove&id=' + id, 'GET', '');
    },
    getPromise: function (strClass, operation, params) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=' + operation + params, 'GET', '');
    },
    setOne: function (strClass, jsonfile) {
        return ajax.call(config.getAppUrl() + '?ob=' + strClass + '&op=set', 'GET', jsonfile);
    }
}