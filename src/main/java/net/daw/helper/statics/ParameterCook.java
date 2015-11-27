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
package net.daw.helper.statics;

import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;

public class ParameterCook {

    public static String prepareMode(HttpServletRequest request) {
        String result = null;
        if (request.getParameter("mode") == null) {
            result = "wrappered";
        } else {
            result = request.getParameter("mode");
        }
        return result;
    }

    public static String prepareObject(HttpServletRequest request) {
        String result = null;
        if (request.getParameter("ob") == null) {
            result = "usuario";
        } else {
            result = request.getParameter("ob").toLowerCase();
        }
        return result;
    }

    public static String prepareCamelCaseObject(HttpServletRequest request) {
        String result = null;
        if (request.getParameter("ob") == null) {
            result = "Usuario";
        } else {
            result = Character.toUpperCase(request.getParameter("ob").charAt(0)) + request.getParameter("ob").substring(1);
        }
        return result;
    }

    public static int prepareId(HttpServletRequest request) {
        int result = 0;
        if (request.getParameter("id") == null) {
            result = 0;
        } else {
            result = Integer.parseInt(request.getParameter("id"));
        }
        return result;
    }

    public static String prepareJson(HttpServletRequest request) {
        String result = null;
        if (request.getParameter("json") == null) {
            result = "";
        } else {
            result = request.getParameter("json").replaceAll("%2F", "/");
        }
        return result;
    }

    public static String prepareOperation(HttpServletRequest request) {
        String result = null;
        if (request.getParameter("op") == null) {
            result = "inicio";
        } else {
            result = request.getParameter("op").toLowerCase();
        }
        return result;
    }

    public static String prepareCamelCaseOperation(HttpServletRequest request) {
        String result = null;
        if (request.getParameter("op") == null) {
            result = "Inicio";
        } else {
            result = Character.toUpperCase(request.getParameter("op").charAt(0)) + request.getParameter("op").substring(1);
        }
        return result;
    }

    public static Integer prepareRpp(HttpServletRequest request) {
        int intRegsPerPag;
        if (request.getParameter("rpp") == null) {
            intRegsPerPag = 10;
        } else {
            intRegsPerPag = Integer.parseInt(request.getParameter("rpp"));
        }
        return intRegsPerPag;
    }

    public static Integer preparePage(HttpServletRequest request) {
        int intPage;
        if (request.getParameter("page") == null) {
            intPage = 1;
        } else {
            intPage = Integer.parseInt(request.getParameter("page"));
        }
        return intPage;
    }

    public static ArrayList<FilterBeanHelper> prepareFilter(HttpServletRequest request) {
        ArrayList<FilterBeanHelper> alFilter = new ArrayList<>();
        if (request.getParameter("filter") != null) {
            if (request.getParameter("filteroperator") != null) {
                if (request.getParameter("filtervalue") != null) {
                    FilterBeanHelper oFilterBean = new FilterBeanHelper();
                    oFilterBean.setFilter(request.getParameter("filter"));
                    oFilterBean.setFilterOperator(request.getParameter("filteroperator"));
                    oFilterBean.setFilterValue(request.getParameter("filtervalue"));
                    oFilterBean.setFilterOrigin("user");
                    alFilter.add(oFilterBean);
                }
            }
        }
        if (request.getParameter("systemfilter") != null) {
            if (request.getParameter("systemfilteroperator") != null) {
                if (request.getParameter("systemfiltervalue") != null) {
                    FilterBeanHelper oFilterBean = new FilterBeanHelper();
                    oFilterBean.setFilter(request.getParameter("systemfilter"));
                    oFilterBean.setFilterOperator(request.getParameter("systemfilteroperator"));
                    oFilterBean.setFilterValue(request.getParameter("systemfiltervalue"));
                    oFilterBean.setFilterOrigin("system");
                    alFilter.add(oFilterBean);
                }
            }
        }
        return alFilter;
    }

    public static HashMap<String, String> prepareOrder(HttpServletRequest request) {
        HashMap<String, String> hmOrder = new HashMap<>();
        if (request.getParameter("order") != null) {
            if (request.getParameter("ordervalue") != null) {
                hmOrder.put(request.getParameter("order"), request.getParameter("ordervalue"));
            } else {
                hmOrder = null;
            }
        } else {
            hmOrder = null;
        }
        return hmOrder;
    }

    public static int prepareInt(String strParameter, HttpServletRequest request) {
        int result = 0;
        if (request.getParameter(strParameter) == null) {
            result = 0;
        } else {
            result = Integer.parseInt(request.getParameter(strParameter));
        }
        return result;
    }
}
