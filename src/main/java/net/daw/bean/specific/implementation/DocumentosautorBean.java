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
package net.daw.bean.specific.implementation;

import com.google.gson.annotations.Expose;
import net.daw.bean.generic.implementation.BeanGenImpl;
import net.daw.bean.group.GroupBeanImpl;
import net.daw.bean.publicinterface.BeanInterface;
import net.daw.helper.annotations.MethodMetaInformation;
import net.daw.helper.annotations.SelectSourceMetaInformation;
import net.daw.helper.statics.MetaEnum;

/**
 *
 * @author rafa
 */
@SelectSourceMetaInformation(
        SqlSelect = "select id_usuario, count(id) as numautores from documento group by id_usuario", //id y 1=1 obligatorios
        Description = "Documento"
)
public class DocumentosautorBean extends BeanGenImpl implements BeanInterface {

    @Expose(serialize = false)
    @MethodMetaInformation(
            UltraShortName = "Usuario",
            ShortName = "Usuario",
            Description = "Identificador de Usuario",
            IsIdForeignKey = true,
            ReferencesTable = "usuario",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer id_usuario = 0; //importante inicializar a 0 las claves ajenas

    @Expose(deserialize = false)
    @MethodMetaInformation(
            UltraShortName = "Usuario",
            ShortName = "Usuario",
            Description = "Referencia al usuario propietario",
            IsObjForeignKey = true,
            ReferencesTable = "usuario",
            MyIdName = "id_usuario"
            //MyMetaName = "meta_usuario"
    )
    private GroupBeanImpl obj_usuario = null;

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Ndocs.",
            ShortName = "Nº Docs.",
            Description = "Número de documentos",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer numautores = 0;

  

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public GroupBeanImpl getObj_usuario() {
        return obj_usuario;
    }

    public void setObj_usuario(GroupBeanImpl obj_usuario) {
        this.obj_usuario = obj_usuario;
    }

    public Integer getNumautores() {
        return numautores;
    }

    public void setNumautores(Integer numautores) {
        this.numautores = numautores;
    }



}
