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

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import net.daw.dao.publicinterface.MetaDaoInterface;
import java.sql.Connection;
import java.util.ArrayList;
import net.daw.bean.meta.MetaBeanGenImpl;
import net.daw.data.specific.implementation.MysqlDataSpImpl;
import net.daw.helper.annotations.MethodMetaInformation;
import net.daw.helper.annotations.SelectSourceMetaInformation;
import net.daw.helper.annotations.TableSourceMetaInformation;
import net.daw.helper.statics.ExceptionBooster;

public abstract class MetaDaoGenImpl<BEAN_CLASS> implements MetaDaoInterface<BEAN_CLASS> {

    protected String strSqlSelectDataOrigin = null;
    protected String strTableOrigin = null;
    protected MysqlDataSpImpl oMysql = null;
    protected Connection oConnection = null;

    public MetaDaoGenImpl(Connection pooledConnection) throws Exception {
        try {
            Class<BEAN_CLASS> classBEAN = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            if (classBEAN.isAnnotationPresent(TableSourceMetaInformation.class)) {
                TableSourceMetaInformation annotationTableSourceMetaInformation = classBEAN.getAnnotation(TableSourceMetaInformation.class);
                //TableSourceMetaInformation annotationTableSourceMetaInformation = (TableSourceMetaInformation) annotation;
                strTableOrigin = annotationTableSourceMetaInformation.TableName();
                strSqlSelectDataOrigin = "select * from " + strTableOrigin + " where 1=1 ";
            }
            if (classBEAN.isAnnotationPresent(SelectSourceMetaInformation.class)) {
                SelectSourceMetaInformation annotationSelectSourceMetaInformation = classBEAN.getAnnotation(SelectSourceMetaInformation.class);
                //SelectSourceMetaInformation annotationSelectSourceMetaInformation = (SelectSourceMetaInformation) annotation;
                strTableOrigin = null; //never used for news, updates or deletions
                strSqlSelectDataOrigin = "select * from ( " + annotationSelectSourceMetaInformation.SqlSelect() + " ) as origin01 where 1=1 ";
            }
            if (strSqlSelectDataOrigin.equals(null)) {
                ExceptionBooster.boost(new Exception(this.getClass().getName() + ":constructor ERROR: " + classBEAN.getName() + " Beans must be annotated by SelectSourceMetaInformation or TableSourceMetaInformation "));
            }
            oConnection = pooledConnection;
            oMysql = new MysqlDataSpImpl(oConnection);
        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":constructor ERROR: " + ex.getMessage()));
        }
    }

    @Override
    public ArrayList<MetaBeanGenImpl> getmetainformation() throws Exception {
        ArrayList<MetaBeanGenImpl> alVector = null;
        try {
            Class<BEAN_CLASS> classBEAN = (Class<BEAN_CLASS>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            alVector = new ArrayList<>();
            Class<? super BEAN_CLASS> superClassBean = classBEAN.getSuperclass();
            for (Field field : superClassBean.getDeclaredFields()) {
                Annotation[] fieldAnnotations = field.getDeclaredAnnotations();
                for (Integer i = 0; i < fieldAnnotations.length; i++) {
                    if (fieldAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
                        MethodMetaInformation fieldAnnotation = (MethodMetaInformation) fieldAnnotations[i];
                        if (!fieldAnnotation.IsIdForeignKey()) {
                            MetaBeanGenImpl oMeta = new MetaBeanGenImpl();
                            oMeta.setName(field.getName());
                            oMeta.setDefaultValue(fieldAnnotation.DefaultValue());
                            oMeta.setDescription(fieldAnnotation.Description());
                            oMeta.setIsId(fieldAnnotation.IsId());
                            //oMeta.setIsIdForeignKey(fieldAnnotation.IsIdForeignKey());
                            oMeta.setIsObjForeignKey(fieldAnnotation.IsObjForeignKey());
                            //oMeta.setIsPathToObject(fieldAnnotation.IsPathToObject());
                            //oMeta.setIsMetaForeignKey(fieldAnnotation.IsMetaForeignKey());

                            oMeta.setMaxDecimal(fieldAnnotation.MaxDecimal());
                            oMeta.setMaxInteger(fieldAnnotation.MaxInteger());
                            oMeta.setMaxLength(fieldAnnotation.MaxLength());
                            oMeta.setMinLength(fieldAnnotation.MinLength());

                            oMeta.setMyIdName(fieldAnnotation.MyIdName());
                            //oMeta.setMyObjName(fieldAnnotation.MyObjName());
                            //oMeta.setMyMetaName(fieldAnnotation.MyMetaName());

                            oMeta.setReferencesTable(fieldAnnotation.ReferencesTable());

                            oMeta.setIsForeignKeyDescriptor(fieldAnnotation.IsForeignKeyDescriptor());

                            oMeta.setShortName(fieldAnnotation.ShortName());
                            oMeta.setType(fieldAnnotation.Type());
                            oMeta.setUltraShortName(fieldAnnotation.UltraShortName());
                            alVector.add(oMeta);
                        }
                    }
                }
            }
            //now fill the other fields metainformation
            for (Field field : classBEAN.getDeclaredFields()) {
                Annotation[] fieldAnnotations = field.getDeclaredAnnotations();
                for (Integer i = 0; i < fieldAnnotations.length; i++) {
                    if (fieldAnnotations[i].annotationType().equals(MethodMetaInformation.class)) {
                        MethodMetaInformation fieldAnnotation = (MethodMetaInformation) fieldAnnotations[i];
                        if (!fieldAnnotation.IsIdForeignKey()) {
                            MetaBeanGenImpl oMeta = new MetaBeanGenImpl();
                            oMeta.setName(field.getName());
                            oMeta.setDefaultValue(fieldAnnotation.DefaultValue());
                            oMeta.setDescription(fieldAnnotation.Description());
                            oMeta.setIsId(fieldAnnotation.IsId());
                            //oMeta.setIsIdForeignKey(fieldAnnotation.IsIdForeignKey());
                            oMeta.setIsObjForeignKey(fieldAnnotation.IsObjForeignKey());
                            //oMeta.setIsPathToObject(fieldAnnotation.IsPathToObject());
                            //oMeta.setIsMetaForeignKey(fieldAnnotation.IsMetaForeignKey());

                            oMeta.setMaxDecimal(fieldAnnotation.MaxDecimal());
                            oMeta.setMaxInteger(fieldAnnotation.MaxInteger());
                            oMeta.setMaxLength(fieldAnnotation.MaxLength());
                            oMeta.setMinLength(fieldAnnotation.MinLength());

                            oMeta.setMyIdName(fieldAnnotation.MyIdName());
                            //oMeta.setMyObjName(fieldAnnotation.MyObjName());
                            //oMeta.setMyMetaName(fieldAnnotation.MyMetaName());

                            oMeta.setReferencesTable(fieldAnnotation.ReferencesTable());

                            oMeta.setIsForeignKeyDescriptor(fieldAnnotation.IsForeignKeyDescriptor());

                            oMeta.setShortName(fieldAnnotation.ShortName());
                            oMeta.setType(fieldAnnotation.Type());
                            oMeta.setUltraShortName(fieldAnnotation.UltraShortName());
                            alVector.add(oMeta);
                        }
                    }
                }
            }

        } catch (Exception ex) {
            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getmetainformation ERROR: " + ex.getMessage()));
        }
        return alVector;
    }

//    @Override
//    public ArrayList<String> getColumnsNames() throws Exception {
//        ArrayList<String> alColumns = null;
//        try {
//            alColumns = oMysql.getColumnsName(strTableOrigin);
//        } catch (Exception ex) {
//            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getColumnsNames ERROR: " + ex.getMessage()));
//        }
//        return alColumns;
//    }
//
//    @Override
//    public ArrayList<String> getPrettyColumnsNames() throws Exception {
//        ArrayList<String> alColumns = null;
//        try {
//            alColumns = oMysql.getPrettyColumns(strTableOrigin);
//        } catch (Exception ex) {
//            ExceptionBooster.boost(new Exception(this.getClass().getName() + ":getPrettyColumnsNames ERROR: " + ex.getMessage()));
//        }
//        return alColumns;
//    }

}
