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

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.annotation.Annotation;
import net.daw.dao.publicinterface.ViewDaoInterface;
import net.daw.dao.publicinterface.MetaDaoInterface;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import net.daw.bean.generic.implementation.BeanGenImpl;
import net.daw.bean.group.GroupBeanImpl;
import net.daw.helper.annotations.MethodMetaInformation;
import net.daw.helper.statics.AppConfigurationHelper;
import net.daw.helper.statics.ExceptionBooster;
import net.daw.helper.statics.FilterBeanHelper;
import net.daw.helper.statics.MetaEnum;
import net.daw.helper.statics.SqlBuilder;

public class ViewDaoGenImpl<BEAN_CLASS> extends MetaDaoGenImpl<BEAN_CLASS> implements ViewDaoInterface<BEAN_CLASS>, MetaDaoInterface<BEAN_CLASS> {
//

    public ViewDaoGenImpl(Connection pooledConnection) throws Exception {
        super(pooledConnection);
    }

    @Override
    public int getPages(int intRegsPerPag, ArrayList<FilterBeanHelper> alFilter) throws Exception {
        strSqlSelectDataOrigin += SqlBuilder.buildSqlWhere(alFilter);
        int pages = 0;
        try {
            pages = oMysql.getPages(strSqlSelectDataOrigin, intRegsPerPag);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPages ERROR: " + ex.getMessage()));
        }
        return pages;
    }

    @Override
    public int getCount(ArrayList<FilterBeanHelper> alFilter) throws Exception {
        strSqlSelectDataOrigin += SqlBuilder.buildSqlWhere(alFilter);
        int pages = 0;
        try {
            pages = oMysql.getCount(strSqlSelectDataOrigin);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getCount ERROR: " + ex.getMessage()));
        }
        return pages;
    }

//    @Override
//    public ArrayList<BEAN_CLASS> getPage(int intRegsPerPag, int intPage, ArrayList<FilterBeanHelper> alFilter, HashMap<String, String> hmOrder) throws Exception {
//        strSqlSelectDataOrigin += SqlBuilder.buildSqlWhere(alFilter);
//        strSqlSelectDataOrigin += SqlBuilder.buildSqlOrder(hmOrder);
//        Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
//        Method metodo_setId = tipo.getMethod("setId", Integer.class);
//        ArrayList<Integer> arrId;
//        ArrayList<BEAN_CLASS> arrCliente = new ArrayList<>();
//        try { //pte!!
//            arrId = oMysql.getPage(strSqlSelectDataOrigin, intRegsPerPag, intPage);
//            Iterator<Integer> iterador = arrId.listIterator();
//            while (iterador.hasNext()) {
//                Object oBean = Class.forName(tipo.getName()).newInstance();
//                metodo_setId.invoke(oBean, iterador.next());
//                arrCliente.add(this.get((BEAN_CLASS) oBean, AppConfigurationHelper.getJsonDepth()));
//            }
//        } catch (Exception ex) {
//            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPage ERROR: " + ex.getMessage()));
//        }
//        return arrCliente;
//
//    }
    @Override
    public ArrayList<BEAN_CLASS> getPage(int intRegsPerPag, int intPage, ArrayList<FilterBeanHelper> alFilter, HashMap<String, String> hmOrder) throws Exception {
        strSqlSelectDataOrigin += SqlBuilder.buildSqlWhere(alFilter);
        strSqlSelectDataOrigin += SqlBuilder.buildSqlOrder(hmOrder);
        Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
        //Method metodo_setId = tipo.getMethod("setId", Integer.class);
//        ArrayList<Integer> arrId;
        ArrayList<BEAN_CLASS> arrCliente = new ArrayList<>();
        ResultSet oResultSet = null;
        try { //pte!!
            oResultSet = oMysql.getPage(strSqlSelectDataOrigin, intRegsPerPag, intPage);
            arrCliente = fillBeanArray(oResultSet, tipo);

//            Iterator<Integer> iterador = arrId.listIterator();
//            while (iterador.hasNext()) {
//                Object oBean = Class.forName(tipo.getName()).newInstance();
//                metodo_setId.invoke(oBean, iterador.next());
//                arrCliente.add(this.get((BEAN_CLASS) oBean, AppConfigurationHelper.getJsonDepth()));
//            }
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPage ERROR: " + ex.getMessage()));
        }
        return arrCliente;

    }

    private ArrayList<BEAN_CLASS> fillBeanArray(ResultSet oResultSet, Class<BEAN_CLASS> tipo) throws Exception {
        ArrayList<BEAN_CLASS> vector = new ArrayList<>();
        try {
            while (oResultSet.next()) {
                BEAN_CLASS oBean = (BEAN_CLASS) Class.forName(tipo.getName()).newInstance();
                for (Method method : tipo.getDeclaredMethods()) {
                    if (isSetter(method)) {
                        //System.out.println("* ---> " + method.getName());
                        Field field = getFieldName(method);
                        Annotation[] methodAnnotations = field.getDeclaredAnnotations();
                        for (Integer i = 0; i < methodAnnotations.length; i++) {
                            if (methodAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
                                MethodMetaInformation methodAnnotation = (MethodMetaInformation) methodAnnotations[i];
                                if (methodAnnotation.IsObjForeignKey() == false) {
                                    //oBean = parseValue(oBean, method, methodAnnotation.Type().toString(), (String) oResultSet.getInt(method.getName().substring(3).toLowerCase(Locale.ENGLISH)));
                                    if (methodAnnotation.Type() == MetaEnum.FieldType.Integer) {
                                        method.invoke(oBean, oResultSet.getInt(method.getName().substring(3).toLowerCase(Locale.ENGLISH)));
                                    }
                                    if (methodAnnotation.Type() == MetaEnum.FieldType.String) {
                                        method.invoke(oBean, oResultSet.getString(method.getName().substring(3).toLowerCase(Locale.ENGLISH)));
                                    }
                                    if (methodAnnotation.Type() == MetaEnum.FieldType.Date) {
                                        method.invoke(oBean, oResultSet.getDate(method.getName().substring(3).toLowerCase(Locale.ENGLISH)));
                                    }
                                    if (methodAnnotation.Type() == MetaEnum.FieldType.Boolean) {
                                        method.invoke(oBean, oResultSet.getBoolean(method.getName().substring(3).toLowerCase(Locale.ENGLISH)));
                                    }
                                } else {
                                }
                            }
                        }
                    }
                }
                oBean = this.fillForeign((BEAN_CLASS) oBean, tipo, AppConfigurationHelper.getJsonDepth());
                vector.add((BEAN_CLASS) oBean);
            }
        } catch (SQLException | ClassNotFoundException ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":fillBeanArray ERROR: " + ex.getMessage()));
        }
        return vector;
    }

    @Override
    public ArrayList<BEAN_CLASS> getAll(ArrayList<FilterBeanHelper> alFilter, HashMap<String, String> hmOrder) throws Exception {
        ArrayList<BEAN_CLASS> vector = null;
        try {
            Class<BEAN_CLASS> classBEAN = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
//            if (classBEAN.isAnnotationPresent(TableSourceMetaInformation.class)) {
//                strSqlSelectDataOrigin += SqlBuilder.buildSqlWhere(alFilter);
//                strSqlSelectDataOrigin += SqlBuilder.buildSqlOrder(hmOrder);
//                Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
//                Method metodo_setId = tipo.getMethod("setId", Integer.class);
//                ArrayList<Integer> arrId;
//                arrId = oMysql.getAllId(strSqlSelectDataOrigin);
//                Iterator<Integer> iterador = arrId.listIterator();
//                while (iterador.hasNext()) {
//                    Object oBean = Class.forName(tipo.getName()).newInstance();
//                    metodo_setId.invoke(oBean, iterador.next());
//                    vector.add(this.get((BEAN_CLASS) oBean, AppConfigurationHelper.getJsonDepth()));
//                }
//            }
//            if (classBEAN.isAnnotationPresent(SelectSourceMetaInformation.class)) {
            ResultSet oResultSet = null;
            Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            String strSqlWhere = SqlBuilder.buildSqlWhere(alFilter);
            String strSQL = strSqlSelectDataOrigin.substring(0, strSqlSelectDataOrigin.indexOf("1=1") + 3) + " " + strSqlWhere + " " + strSqlSelectDataOrigin.substring(strSqlSelectDataOrigin.indexOf("1=1") + 3, strSqlSelectDataOrigin.length());
            strSQL += SqlBuilder.buildSqlOrder(hmOrder);
            oResultSet = oMysql.getAllSql(strSQL);
            vector = fillBeanArray(oResultSet, tipo);
            //}

        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPage ERROR: " + ex.getMessage()));
        }
        return vector;
    }

    private BEAN_CLASS parseValue(BEAN_CLASS oBean, Method method, String strTipoParamMetodoSet, String strValor) throws Exception {
        try {
            switch (strTipoParamMetodoSet) {
                case "java.lang.Double":
                    method.invoke(oBean, Double.parseDouble(strValor));
                    break;
                case "java.lang.Integer":
                    method.invoke(oBean, Integer.parseInt(strValor));
                    break;
                case "java.lang.Boolean":
                    if (Integer.parseInt(strValor) == 1) {
                        method.invoke(oBean, true);
                    } else {
                        method.invoke(oBean, false);
                    }
                    break;
                case "java.util.Date":
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                    method.invoke(oBean, format.parse(strValor));
                    break;
                default:
                    method.invoke(oBean, strValor);
                    break;
            }

        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":parseValue ERROR: " + ex.getMessage()));
        }
        return oBean;
    }

    private BEAN_CLASS fillForeign(BEAN_CLASS oBean, Class<BEAN_CLASS> tipo, int expand) throws Exception {
        try {
            for (Field field : tipo.getDeclaredFields()) {
                Annotation[] fieldAnnotations = field.getDeclaredAnnotations();
                for (Integer i = 0; i < fieldAnnotations.length; i++) {
                    if (fieldAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
                        MethodMetaInformation fieldAnnotation = (MethodMetaInformation) fieldAnnotations[i];
                        if (fieldAnnotation.IsObjForeignKey() == true) {

                            Constructor DaoConstructor;
                            String strTabla = fieldAnnotation.ReferencesTable().substring(0, 1).toUpperCase(Locale.ENGLISH) + fieldAnnotation.ReferencesTable().substring(1);
                            //String strMethod = fieldAnnotation.ReferencesTable().substring(0, 1).toLowerCase(Locale.ENGLISH) + fieldAnnotation.ReferencesTable().substring(1);
                            DaoConstructor = Class.forName("net.daw.dao.specific.implementation." + strTabla + "Dao").getConstructor(Connection.class);
                            TableDaoGenImpl oAjenaDao = (TableDaoGenImpl) DaoConstructor.newInstance(oConnection);
                            BeanGenImpl oAjenaBean = (BeanGenImpl) Class.forName("net.daw.bean.specific.implementation." + strTabla + "Bean").newInstance();
                            //Method metodo_getId_Ajena = tipo.getMethod("getId_" + strMethod);

                            String strForeignIdName = fieldAnnotation.MyIdName().substring(0, 1).toUpperCase(Locale.ENGLISH) + fieldAnnotation.MyIdName().substring(1);

                            Method metodo_getId_Ajena = tipo.getMethod("get" + strForeignIdName);
                            int intIdAjena = (Integer) metodo_getId_Ajena.invoke(oBean);

                            //todas las ajenas llevan id
                            Method metodo_setId_ajena = oAjenaBean.getClass().getMethod("setId", Integer.class);
                            metodo_setId_ajena.invoke(oAjenaBean, intIdAjena); //oAjenaBean.setId(intIdAjena);

                            oAjenaBean = (BeanGenImpl) oAjenaDao.get(oAjenaBean, expand - 1);
                            //Method method_setObj_Propia = tipo.getDeclaredMethod("setObj_" + strMethod, oAjenaBean.getClass());
                            //Method method_setObj_Propia = tipo.getDeclaredMethod("set" +  methodAnnotation.MyObjName(), oAjenaBean.getClass());

                            //crear un nuevo oGroupBean groupBeanImpl
                            //
                            GroupBeanImpl oGroupBean = new GroupBeanImpl();

                            ///////------ insertar en oGroupBean el bean oAjenaBean
                            oGroupBean.setBean(oAjenaBean);
                            //insertar en el oGroupBean el campo meta

//                            String strTabla2 = fieldAnnotation.ReferencesTable().substring(0, 1).toUpperCase(Locale.ENGLISH) + fieldAnnotation.ReferencesTable().substring(1);
//                            Constructor DaoConstructor2;
//                            DaoConstructor2 = Class.forName("net.daw.dao.specific.implementation." + strTabla2 + "Dao").getConstructor(Connection.class);
//                            MetaDaoGenImpl oAjenaMetaDao = (MetaDaoGenImpl) DaoConstructor2.newInstance(oConnection);
//
//                            oGroupBean.setMeta(oAjenaMetaDao.getmetainformation());
                            oGroupBean.setMeta(oAjenaDao.getmetainformation());

                            //escribir el oGrupBean en el obean:
                            Method method_setObj_Propia = getWriteMethod(field);

                            //String strForeignObjName = field.getName().substring(0, 1).toUpperCase(Locale.ENGLISH) + field.getName().substring(1);
                            //Method method_setObj_Propia = tipo.getDeclaredMethod("set" + strForeignObjName, oAjenaBean.getClass());
                            method_setObj_Propia.invoke(oBean, oGroupBean); //cambiar o ajena bean por o group bean
                            //field.set(oBean, oAjenaBean); //no, because property is private!!!
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":fillForeign ERROR: " + ex.getMessage()));
        }
        return oBean;
    }

//    private BEAN_CLASS getMetaForeign(BEAN_CLASS oBean, Class<BEAN_CLASS> tipo) throws Exception {
//        try {
//            for (Field field : tipo.getDeclaredFields()) {
//                Annotation[] fieldAnnotations = field.getDeclaredAnnotations();
//                for (Integer i = 0; i < fieldAnnotations.length; i++) {
//                    if (fieldAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
//                        MethodMetaInformation fieldAnnotation = (MethodMetaInformation) fieldAnnotations[i];
//                        if (fieldAnnotation.IsMetaForeignKey() == true) {
//                            ArrayList<MetaBeanGenImpl> oMetaBeanList = new ArrayList<>();
//
//                            String strTabla = fieldAnnotation.ReferencesTable().substring(0, 1).toUpperCase(Locale.ENGLISH) + fieldAnnotation.ReferencesTable().substring(1);
//
//                            Constructor DaoConstructor;
//                            DaoConstructor = Class.forName("net.daw.dao.specific.implementation." + strTabla + "Dao").getConstructor(Connection.class);
//                            MetaDaoGenImpl oAjenaMetaDao = (MetaDaoGenImpl) DaoConstructor.newInstance(oConnection);
//
//                            oMetaBeanList = oAjenaMetaDao.getmetainformation();
//
//                            Method method_setObj_Propia = getWriteMethod(field);
//                            method_setObj_Propia.invoke(oBean, oMetaBeanList);
//                        }
//                    }
//                }
//            }
//        } catch (Exception ex) {
//            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":fillForeign ERROR: " + ex.getMessage()));
//        }
//        return oBean;
//    }
//    private BEAN_CLASS fillMetaForeign(BEAN_CLASS oBean, Class<BEAN_CLASS> tipo) throws Exception {
//        try {
//            for (Field field : tipo.getDeclaredFields()) {
//                Annotation[] fieldAnnotations = field.getDeclaredAnnotations();
//                for (Integer i = 0; i < fieldAnnotations.length; i++) {
//                    if (fieldAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
//                        MethodMetaInformation fieldAnnotation = (MethodMetaInformation) fieldAnnotations[i];
//                        if (fieldAnnotation.IsMetaForeignKey() == true) {
//                            ArrayList<MetaBeanGenImpl> oMetaBeanList = new ArrayList<>();
//
//                            String strTabla = fieldAnnotation.ReferencesTable().substring(0, 1).toUpperCase(Locale.ENGLISH) + fieldAnnotation.ReferencesTable().substring(1);
//
//                            Constructor DaoConstructor;
//                            DaoConstructor = Class.forName("net.daw.dao.specific.implementation." + strTabla + "Dao").getConstructor(Connection.class);
//                            MetaDaoGenImpl oAjenaMetaDao = (MetaDaoGenImpl) DaoConstructor.newInstance(oConnection);
//
//                            oMetaBeanList = oAjenaMetaDao.getmetainformation();
//
//                            Method method_setObj_Propia = getWriteMethod(field);
//                            method_setObj_Propia.invoke(oBean, oMetaBeanList);
//                        }
//                    }
//                }
//            }
//        } catch (Exception ex) {
//            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":fillForeign ERROR: " + ex.getMessage()));
//        }
//        return oBean;
//    }
    private BEAN_CLASS fill(BEAN_CLASS oBean, Class<BEAN_CLASS> tipo, Method metodo_getId) throws Exception {
        try {
            for (Method method : tipo.getDeclaredMethods()) {
                if (isSetter(method)) {
//                    System.out.println("* ---> " + method.getName());
                    Field field = getFieldName(method);
                    Annotation[] methodAnnotations = field.getDeclaredAnnotations();
                    for (Integer i = 0; i < methodAnnotations.length; i++) {
                        if (methodAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
                            MethodMetaInformation methodAnnotation = (MethodMetaInformation) methodAnnotations[i];
                            if ((methodAnnotation.IsObjForeignKey() == false) && (methodAnnotation.IsId() == false)) {

                                //------!!!!!!!
                                String strValor = oMysql.getOne(strSqlSelectDataOrigin, field.getName().toLowerCase(Locale.ENGLISH), (Integer) metodo_getId.invoke(oBean));
//                                System.out.println("            ---> metodo: " + methodAnnotation.ShortName());
//                                System.out.println("            ---> valor: " + strValor);
                                if (strValor != null) {
                                    final Class<?> classTipoParamMetodoSet = method.getParameterTypes()[0];
                                    oBean = parseValue(oBean, method, classTipoParamMetodoSet.getName(), strValor);
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":fill ERROR: " + ex.getMessage()));
        }
        return oBean;
    }

    public boolean isGetter(Method method) {
        if (!method.getName().startsWith("get")) {
            return false;
        }
        if (method.getParameterTypes().length != 0) {
            return false;
        }
        if (void.class.equals(method.getReturnType())) {
            return false;
        }
        return true;
    }

    public boolean isSetter(Method method) {
        if (!method.getName().startsWith("set")) {
            return false;
        }
        if (method.getParameterTypes().length != 1) {
            return false;
        }
        return true;
    }

    public Field getFieldName(Method method) {
        try {
            Class<?> classFromMethod = method.getDeclaringClass();
            BeanInfo infoOfTheBean = Introspector.getBeanInfo(classFromMethod);
            PropertyDescriptor[] propertyDescriptors = infoOfTheBean.getPropertyDescriptors();
            for (PropertyDescriptor propDesc : propertyDescriptors) {
                if (method.equals(propDesc.getWriteMethod()) || method.equals(propDesc.getReadMethod())) {
                    Class clss = method.getDeclaringClass();
                    for (Field field : clss.getDeclaredFields()) {
                        if (field.getName().equals(propDesc.getName())) {
                            return field;
                        }
                    }
                }
            }
        } catch (IntrospectionException | SecurityException ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getFieldName ERROR: " + ex.getMessage()));
        }
        return null;
    }

    public Method getReadMethod(Field field) {
        try {
            Class<?> classFromMethod = field.getDeclaringClass();
            BeanInfo infoOfTheBean = Introspector.getBeanInfo(classFromMethod);
            PropertyDescriptor[] propertyDescriptors = infoOfTheBean.getPropertyDescriptors();
            for (PropertyDescriptor propDesc : propertyDescriptors) {
                if (field.getName().equals(propDesc.getName())) {
                    //System.out.println(propDesc.getDisplayName());
                    return propDesc.getReadMethod();
                }
            }
        } catch (IntrospectionException ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getReadMethod ERROR: " + ex.getMessage()));
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getReadMethod ERROR: " + ex.getMessage()));
        }
        return null;
    }

    public Method getWriteMethod(Field field) {
        try {
            Class<?> classFromMethod = field.getDeclaringClass();
            BeanInfo infoOfTheBean = Introspector.getBeanInfo(classFromMethod);
            PropertyDescriptor[] propertyDescriptors = infoOfTheBean.getPropertyDescriptors();
            for (PropertyDescriptor propDesc : propertyDescriptors) {
                if (field.getName().equals(propDesc.getName())) {
                    //System.out.println(propDesc.getDisplayName());
                    return propDesc.getWriteMethod();
                }
            }
        } catch (IntrospectionException ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getWriteMethod ERROR: " + ex.getMessage()));
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getWriteMethod ERROR: " + ex.getMessage()));
        }
        return null;
    }

    @Override
    public BEAN_CLASS get(BEAN_CLASS oBean, Integer expand) throws Exception {
        try {
            Class<BEAN_CLASS> tipo = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            Method metodo_getId = tipo.getMethod("getId");
            Method metodo_setId = tipo.getMethod("setId", Integer.class);
            if ((Integer) metodo_getId.invoke(oBean) > 0) {
                try {
                    if (!oMysql.existsOne(strSqlSelectDataOrigin, (Integer) metodo_getId.invoke(oBean))) {
                        metodo_setId.invoke(oBean, 0);
                    } else {
                        oBean = fill(oBean, tipo, metodo_getId);
                        if (expand > 0) {
                            oBean = fillForeign(oBean, tipo, expand);
                            //oBean = fillMetaForeign(oBean, tipo);
                        }
                    }
                } catch (Exception ex) {
                    ExceptionBooster.boost(new Exception(this.getClass().getName() + ":get ERROR: " + ex.getMessage()));
                }
            } else {
                metodo_setId.invoke(oBean, 0);
            }
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":get ERROR: " + ex.getMessage()));
        }
        return oBean;

    }

}
