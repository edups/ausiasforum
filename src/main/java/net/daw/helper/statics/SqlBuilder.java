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
import java.util.Iterator;
import java.util.Map;

public class SqlBuilder {

    public static String buildSqlWhere(ArrayList<FilterBeanHelper> alFilter) {
        String strSQLFilter = "";
        if (alFilter != null) {
            Iterator iterator = alFilter.iterator();
            while (iterator.hasNext()) {
                FilterBeanHelper oFilterBean = (FilterBeanHelper) iterator.next();
                String strFilterFieldName = oFilterBean.getFilter();
                if (strFilterFieldName.length() >= 4) {
                    if ("obj_".equals(strFilterFieldName.substring(0, 4))) {
                        strFilterFieldName = "id_" + strFilterFieldName.substring(4);
                    }
                }
                switch (oFilterBean.getFilterOperator()) {
                    case "like":
                        strSQLFilter += " AND " + strFilterFieldName + " LIKE '%" + oFilterBean.getFilterValue() + "%'";
                        break;
                    case "notlike":
                        strSQLFilter += " AND " + strFilterFieldName + " NOT LIKE '%" + oFilterBean.getFilterValue() + "%'";
                        break;
                    case "equals":
                        strSQLFilter += " AND " + strFilterFieldName + " = '" + oFilterBean.getFilterValue() + "'";
                        break;
                    case "notequalto":
                        strSQLFilter += " AND " + strFilterFieldName + " <> '" + oFilterBean.getFilterValue() + "'";
                        break;
                    case "less":
                        strSQLFilter += " AND " + strFilterFieldName + " < " + oFilterBean.getFilterValue() + "";
                        break;
                    case "lessorequal":
                        strSQLFilter += " AND " + strFilterFieldName + " <= " + oFilterBean.getFilterValue() + "";
                        break;
                    case "greater":
                        strSQLFilter += " AND " + strFilterFieldName + " > " + oFilterBean.getFilterValue() + "";
                        break;
                    case "greaterorequal":
                        strSQLFilter += " AND " + strFilterFieldName + " >= " + oFilterBean.getFilterValue() + "";
                        break;
                }
            }
        }
        return strSQLFilter;
    }

    public static String buildSqlOrder(HashMap<String, String> hmOrder) {
        String strSQLOrder = "";
        if (hmOrder != null) {
            strSQLOrder += " ORDER BY";
            String strOrderFieldName;
            for (Map.Entry oPar : hmOrder.entrySet()) {
                strOrderFieldName = (String) oPar.getKey();
                if (strOrderFieldName.length() >= 4) {
                    if ("obj_".equals(strOrderFieldName.substring(0, 4))) {
                        strOrderFieldName = "id_" + strOrderFieldName.substring(4);
                    }
                }
                strSQLOrder += " " + strOrderFieldName + " " + oPar.getValue() + ",";
            }
            strSQLOrder = strSQLOrder.substring(0, strSQLOrder.length() - 1);
        }
        return strSQLOrder;
    }

    public static String buildSqlLimit(int intTotalRegs, int intRegsPerPage, int intPageNumber) {
        int maxPaginas = new Double(intTotalRegs / intRegsPerPage).intValue();
        intPageNumber = Math.min(intPageNumber - 1, maxPaginas) + 1;
        int intOffset = Math.max(((intPageNumber - 1) * intRegsPerPage), 0);
        return " LIMIT " + intOffset + " , " + intRegsPerPage;
    }

}
