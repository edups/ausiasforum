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
import net.daw.bean.group.GroupBeanImpl;
import net.daw.helper.annotations.MethodMetaInformation;
import net.daw.helper.annotations.TableSourceMetaInformation;
import net.daw.helper.statics.MetaEnum;

@TableSourceMetaInformation(
        TableName = "usuario",
        Description = "Usuarios del sistema"
)
public class UsuarioBean extends BeanGenImpl implements BeanInterface {

    public UsuarioBean() {
        this.id = 0;
    }

    public UsuarioBean(Integer id) {
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
            UltraShortName = "Login",
            ShortName = "Login",
            Description = "Nombre de usuario",
            Type = MetaEnum.FieldType.String,
            IsForeignKeyDescriptor = true
    )
    private String login = "";

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Pass",
            ShortName = "Password",
            Description = "Frase de paso",
            Type = MetaEnum.FieldType.String
    )
    private String password = "";

    @Expose(serialize = false)
    @MethodMetaInformation(
            UltraShortName = "Tipo",
            ShortName = "Tipo de usuario",
            Description = "Identificador de Tipo de Usuario",
            IsIdForeignKey = true,
            ReferencesTable = "tipousuario",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer id_tipousuario = 0; //importante inicializar a 0 las claves ajenas

    @Expose(deserialize = false)
    @MethodMetaInformation(
            UltraShortName = "Tipo",
            ShortName = "Tipo de usuario",
            Description = "Tipo del usuario",
            IsObjForeignKey = true,
            ReferencesTable = "tipousuario",
            MyIdName = "id_tipousuario"
    )
    private GroupBeanImpl obj_tipousuario = null;

    @Expose(serialize = false)
    @MethodMetaInformation(
            UltraShortName = "Estado",
            ShortName = "Estado de usuario",
            Description = "Identificador de Estado de Usuario",
            IsIdForeignKey = true,
            ReferencesTable = "estado",
            Type = MetaEnum.FieldType.Integer
    )
    private Integer id_estado = 0; //importante inicializar a 0 las claves ajenas

    @Expose(deserialize = false)
    @MethodMetaInformation(
            UltraShortName = "Estado",
            ShortName = "Estado de usuario",
            Description = "Estado del usuario",
            IsObjForeignKey = true,
            ReferencesTable = "estado",
            MyIdName = "id_estado"
    )
    private GroupBeanImpl obj_estado = null;

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Ciudad",
            ShortName = "Ciudad",
            Description = "Ciudad del usuario",
            IsForeignKeyDescriptor = true)
    private String ciudad = "";

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Firma",
            ShortName = "Firma",
            Description = "Firma del usuario"
    )
    private String firma = "";

    @Expose
    @MethodMetaInformation(
            UltraShortName = "Skin",
            ShortName = "Skin",
            Description = "Skin elegido por el usuario para la aplicación"
    )
    private String skin = "";

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId_tipousuario() {
        return id_tipousuario;
    }

    public void setId_tipousuario(Integer id_tipousuario) {
        this.id_tipousuario = id_tipousuario;
    }

    public Integer getId_estado() {
        return id_estado;
    }

    public void setId_estado(Integer id_estado) {
        this.id_estado = id_estado;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getFirma() {
        return firma;
    }

    public void setFirma(String firma) {
        this.firma = firma;
    }

    public String getSkin() {
        return skin;
    }

    public void setSkin(String skin) {
        this.skin = skin;
    }

    public GroupBeanImpl getObj_tipousuario() {
        return obj_tipousuario;
    }

    public void setObj_tipousuario(GroupBeanImpl obj_tipousuario) {
        this.obj_tipousuario = obj_tipousuario;
    }

    public GroupBeanImpl getObj_estado() {
        return obj_estado;
    }

    public void setObj_estado(GroupBeanImpl obj_estado) {
        this.obj_estado = obj_estado;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
