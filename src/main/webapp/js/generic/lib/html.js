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

html = {
    escapeHtml: function (str) {
        return str.replace(/[&<>]/g, function (tag) {
            var tagsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }
            return tagsToReplace[tag] || tag;
        });
    },
    escapeHtml2: function (str) {
        if (typeof (str) === 'string') {
            return strclipString
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
        } else {
            return str;
        }
    },
    htmlEncode: function (value) { //creates a ghost div for jQuery to normalize the html content
        return $('<div/>').text(value).html();
    },
    htmlDecode: function (value) {
        return $('<div/>').html(value).text();
    },
    print: function (value) {
        return string.clipString(html.escapeHtml(decodeURIComponent(value)));
    },
    getId: function (value) {
        return _.filter(value, function (oItem) {
            return oItem.meta.IsId;
        })[0].data;
    },
    printObject: function (value) {
        var arr_metadata = _.map(value.data.meta, function (oMeta) {
            if (oMeta.IsForeignKeyDescriptor) {
                return  value.data.bean[oMeta.Name];
            } else {
                return "";
            }
        });
        var strForeign = arr_metadata.join(' ');
        return '<a href="#/' + value.meta.ReferencesTable + '/view/' + value.data.bean.id + '">' + value.data.bean.id + ": " + html.print(strForeign) + '</a>';
    },
    printObject2: function (strClass, metaValue, beanValue) {
        var arr_metadata = _.map(metaValue, function (oMeta) {
            if (oMeta.IsForeignKeyDescriptor) {
                return  oMeta.Name + ': ' + beanValue[oMeta.Name] + ';';
            } else {
                return "";
            }
        });
        var strForeign = _.without(arr_metadata, '').join(' ');
        return '<a href="#/' + strClass + '/view/' + beanValue.id + '"><strong>' + beanValue.id + "</strong> (" + html.print(strForeign) + ')</a>';
    },
    printValue: function (value) {
        switch (value.meta.Type) {
            case 'Boolean':
                if (value.data == true) {
                    return html.getIcon('glyphicon-ok');
                } else {
                    return html.getIcon('glyphicon-remove');
                }
                break;
            default:
                return html.print(value.data);
        }
    },
    printPrincipal: function (value) {
        if (value.meta) {
            if (value.meta.IsObjForeignKey) {
                return  html.printObject2(value.meta.ReferencesTable, value.data.meta, value.data.bean);
            } else {
                return   html.printValue(value);
            }
        } else {
            return html.print(value);
        }
    },
    getIcon: function (strIcon) {
        return dom.i('class="glyphicon ' + strIcon + '"');
    },
    dom: function (strLabel, strText, strAttr) {
        if (!strAttr)
            strAttr = '';
        else
            strAttr = ' ' + strAttr;
        return '<' + strLabel + strAttr + '>' + strText + '</' + strLabel + '>\n';
    },
    dom2: function (strLabel, strAttr, strText) {
        if (!strAttr)
            strAttr = '';
        else
            strAttr = ' ' + strAttr;
        if (!strText)
            return '<' + strLabel + strAttr + ' />';
        else
            return '<' + strLabel + strAttr + '>' + strText + '</' + strLabel + '>';

    },
    getPageHeader: function (icon, title, subtitle) {
        return(
                dom.div('class="row"',
                        dom.div('class="col-xs-9 text-left"',
                                dom.h1('id="broth_title"', title) +
                                dom.h1('', dom.small('id="broth_subtitle"', subtitle))
                                ) +
                        dom.div('class="col-xs-3 text-right" id="broth_operationicon"', icon)
                        )
                );
    },
    getSpinner: function () {
        return dom.img('src="images/ajax-loading.gif" alt="cargando..."', '');
    },
    getPanel: function (id, title, content) {
        return (
                '<div class="panel panel-default">\n\
                            <div class="panel-heading">' + title + '</div>\n\
                            <div class="panel-body">\n\
                                <div class="text-center">\n\
                                    <div id="' + id + '">\n\
                            ' + content + '\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>'
                );
    },
    linkBack: function () {
        history.back();
        return false;
    },
    createGhostDiv: function (id, data) {
        var divContainer = $('<div>').attr({
            id: id
        });
        $('body').append(divContainer);
        $('#' + id).append(data);
    },
    creoleParse: function (content, lugar) {
        var div = document.createElement('div');
        div.innerHTML = "";
        creole.parse(div, content);
        lugar.empty().html(div);
        var codigo = lugar.html();
        codigo = codigo.replace("<table>", '<table class="table table-bordered"><tbody>');
        codigo = codigo.replace("</table>", '</tbody></table>');
        lugar.empty().append(codigo);
    }
}