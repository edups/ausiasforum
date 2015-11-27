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

import net.daw.bean.generic.implementation.BeanGenImpl;
import net.daw.bean.publicinterface.BeanInterface;
import com.google.gson.annotations.Expose;
import java.util.Date;
import net.daw.bean.group.GroupBeanImpl;
import net.daw.helper.annotations.MethodMetaInformation;
import net.daw.helper.annotations.TableSourceMetaInformation;
import net.daw.helper.statics.MetaEnum;

@TableSourceMetaInformation(
        TableName = "documento",
        Description = "Documento"
)
public class DocumentoBean extends BeanGenImpl implements BeanInterface {

    public DocumentoBean() {
        this.id = 0;
    }

    public DocumentoBean(Integer id) {
        this.id = id;
    }

    @Expose
    @MethodMetaInformation(
            IsId = true,
            UltraShortName = "Iden.",
            ShortName = "Identif.",
            Description = "Número Identificador",
            Type = MetaEnum.FieldType.Integer,
            DefaultValue = "0"
    )
    private Integer id;

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Tít.",
            ShortName = "Título",
            Description = "Título del documento",
            Type = MetaEnum.FieldType.String,
            MinLength = 1,
            MaxLength = 255,
            DefaultValue = "Sin título",
            IsForeignKeyDescriptor = true
    )
    private String titulo = "";

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Cont.",
            ShortName = "Contenido",
            Description = "Cuerpo del documento",
            Type = MetaEnum.FieldType.String,
            MinLength = 1,
            MaxLength = 999999999,
            DefaultValue = "Sin contenido"
    )
    private String contenido = "";

    @Expose
    @MethodMetaInformation(
            UltraShortName = "F.alta",
            ShortName = "Fecha de alta",
            Description = "Fecha de creación del documento",
            Type = MetaEnum.FieldType.Date,
            DefaultValue = "01/01/2000",
            IsForeignKeyDescriptor = true
    )
    private Date alta = new Date();

    @Expose
    @MethodMetaInformation(
            UltraShortName = "F.mod.",
            ShortName = "Fecha de modificación",
            Description = "Fecha de la última modificación del documento",
            Type = MetaEnum.FieldType.Date,
            DefaultValue = "01/01/2000"
    )
    private Date cambio = new Date();

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Hits",
            ShortName = "Hits",
            Description = "Número de visitas del documento",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer hits = 0;

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

    @Expose(serialize = false)
    @MethodMetaInformation(
            UltraShortName = "Tipo",
            ShortName = "Tipo de documento",
            Description = "Identificador de tipo de documento",
            IsIdForeignKey = true,
            ReferencesTable = "tipodocumento",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer id_tipodocumento = 0; //importante inicializar a 0 las claves ajenas

    @Expose(deserialize = false)
    @MethodMetaInformation(
            UltraShortName = "Tipo",
            ShortName = "Tipo de documento",
            Description = "Referencia al tipo de documento",
            IsObjForeignKey = true,
            ReferencesTable = "tipodocumento",
            MyIdName = "id_tipodocumento"
    )
    private GroupBeanImpl obj_tipodocumento = null;

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
            UltraShortName = "¿Pub?",
            ShortName = "¿Publicado?",
            Description = "¿El documento ha sido publicado?",
            Type = MetaEnum.FieldType.Boolean,
            DefaultValue = "0"
    )
    private Boolean publicado = false;

    @Expose
    @MethodMetaInformation(
            UltraShortName = "¿Ptd?",
            ShortName = "¿Portada?",
            Description = "¿El documento es portada?",
            Type = MetaEnum.FieldType.Boolean,
            DefaultValue = "0"
    )
    private Boolean portada = false;

    @Expose
    @MethodMetaInformation(
            UltraShortName = "¿Dst?",
            ShortName = "¿Destacado?",
            Description = "¿El documento debe ser destacado?",
            Type = MetaEnum.FieldType.Boolean,
            DefaultValue = "0"
    )
    private Boolean destacado = false;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) throws Exception {
        this.contenido = contenido;
    }

//     public String getPresentacion() {
//        return presentacion;
//    }
//
//    public void setPresentacion(String contenidoParseado) {
//        this.presentacion = contenidoParseado;
//    }
    public Date getAlta() {
        return alta;
    }

    public void setAlta(Date fecha) {
        this.alta = fecha;
    }

    public Date getCambio() {
        return cambio;
    }

    public void setCambio(Date fecha) {
        this.cambio = fecha;
    }

    public Integer getHits() {
        return hits;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getId_tipodocumento() {
        return id_tipodocumento;
    }

    public void setId_tipodocumento(Integer id_tipodocumento) {
        this.id_tipodocumento = id_tipodocumento;
    }

    public String getEtiquetas() {
        return etiquetas;
    }

    public void setEtiquetas(String etiquetas) {
        this.etiquetas = etiquetas;
    }

    public Boolean getPublicado() {
        return publicado;
    }

    public void setPublicado(Boolean publicado) {
        this.publicado = publicado;
    }

    public Boolean getPortada() {
        return portada;
    }

    public void setPortada(Boolean portada) {
        this.portada = portada;
    }

    public Boolean getDestacado() {
        return destacado;
    }

    public void setDestacado(Boolean destacado) {
        this.destacado = destacado;
    }

    public GroupBeanImpl getObj_usuario() {
        return obj_usuario;
    }

    public void setObj_usuario(GroupBeanImpl obj_usuario) {
        this.obj_usuario = obj_usuario;
    }

    public GroupBeanImpl getObj_tipodocumento() {
        return obj_tipodocumento;
    }

    public void setObj_tipodocumento(GroupBeanImpl obj_tipodocumento) {
        this.obj_tipodocumento = obj_tipodocumento;
    }

}
