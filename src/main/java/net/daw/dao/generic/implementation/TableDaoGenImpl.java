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
package net.daw.dao.generic.implementation;

import net.daw.dao.publicinterface.TableDaoInterface;
import net.daw.dao.publicinterface.ViewDaoInterface;
import net.daw.dao.publicinterface.MetaDaoInterface;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Locale;
import net.daw.helper.statics.ExceptionBooster;

public abstract class TableDaoGenImpl<BEAN_CLASS> extends ViewDaoGenImpl<BEAN_CLASS> implements TableDaoInterface<BEAN_CLASS>, ViewDaoInterface<BEAN_CLASS>, MetaDaoInterface<BEAN_CLASS> {
   
    public TableDaoGenImpl(Connection pooledConnection) throws Exception {
        super(pooledConnection);       
    }
    
    @Override
    public BEAN_CLASS set(BEAN_CLASS oBean) throws Exception {
        Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        Method metodo_getId = tipo.getMethod("getId");
        Method metodo_setId = tipo.getMethod("setId", Integer.class);
        try {
            if ((Integer) metodo_getId.invoke(oBean) == 0) {
                metodo_setId.invoke(oBean, oMysql.insertOne(strTableOrigin));
            }
            for (Method method : tipo.getMethods()) {
                if (method.getName().length() >= 5) { //los campos como minimo han de tener dos caracteres + el get o el set = 5 caracteres
                    if (!method.getName().substring(3).equalsIgnoreCase("id")) {
                        if (method.getName().substring(0, 3).equalsIgnoreCase("get")) {
                            if (!method.getName().substring(0, 6).equalsIgnoreCase("getObj")) {
                                if (!method.getName().equals("getClass")) {
                                    final Class<?> classTipoDevueltoMetodoGet = method.getReturnType();
                                    String value = method.invoke(oBean).toString();
                                    switch (classTipoDevueltoMetodoGet.getName()) {
                                        case "java.util.Date":
                                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                                            value = format.format(method.invoke(oBean));
                                            break;
                                        case "java.lang.Boolean":
                                            if ("true".equals(value)) {
                                                value = "1";
                                            } else {
                                                value = "0";
                                            }
                                            break;
                                    }
                                    String strCampo = method.getName().substring(3).toLowerCase(Locale.ENGLISH);
                                    oMysql.updateOne((Integer) metodo_getId.invoke(oBean), strTableOrigin, strCampo, value);
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":set ERROR: " + ex.getMessage()));
        }
        return oBean;
    }

    @Override
    public int remove(BEAN_CLASS oBean) throws Exception {
        int result = 0;
        Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        Method metodo_getId = tipo.getMethod("getId");
        try {
            result = oMysql.removeOne((Integer) metodo_getId.invoke(oBean), strTableOrigin);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":remove ERROR: " + ex.getMessage()));
        }
        return result;
    }


}
