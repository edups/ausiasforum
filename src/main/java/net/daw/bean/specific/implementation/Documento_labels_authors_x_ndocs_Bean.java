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

@SelectSourceMetaInformation( 
        SqlSelect = "select etiquetas, id_usuario, count(id) as numetiquetas from documento where publicado=0 group by etiquetas, id_usuario",
        Description = "Documento"
)
public class Documento_labels_authors_x_ndocs_Bean extends BeanGenImpl implements BeanInterface {
    
    @Expose
    @MethodMetaInformation(
            UltraShortName = "Etiq.",
            ShortName = "Etiquetas",
            Description = "Etiquetas del documento",
            Type = MetaEnum.FieldType.String,
            MinLength = 0,
            MaxLength = 255,
            DefaultValue = ""
    )
    private String etiquetas = "";

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Netiq.",
            ShortName = "Nº Etiqs.",
            Description = "Número de etiquetas",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer numetiquetas = 0;

     @Expose(serialize = false)
    @MethodMetaInformation(
            UltraShortName = "Usuario",
            ShortName = "Usuario",
            Description = "Identificador de Usuario",
            IsIdForeignKey = true,
            ReferencesTable = "usuario",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer id_usuario = 0; //important zero-initialize foreign keys

    @Expose(deserialize = false)
    @MethodMetaInformation(
            UltraShortName = "Usuario",
            ShortName = "Usuario",
            Description = "Referencia al usuario propietario",
            IsObjForeignKey = true,
            ReferencesTable = "usuario",
            MyIdName = "id_usuario"
    )
    private GroupBeanImpl obj_usuario = null;
    
    public String getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(String etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Integer getNumetiquetas() {
        return numetiquetas;
    }

    public void setNumetiquetas(Integer numetiquetas) {
        this.numetiquetas = numetiquetas;
    }

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

}
