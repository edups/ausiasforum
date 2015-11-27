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
package net.daw.bean.meta;

import com.google.gson.annotations.Expose;
import net.daw.helper.statics.MetaEnum;

public class MetaBeanGenImpl {

    @Expose
    private String Name = "";
    @Expose
    private String UltraShortName = "";
    @Expose
    private String ShortName = "";
    @Expose
    private String Description = "";
    @Expose
    private boolean IsId = false;
    @Expose
    private boolean IsIdForeignKey = false;
    @Expose
    private boolean IsObjForeignKey = false;
    @Expose
    private String MyObjName = "";
    @Expose
    private String MyMetaName = "";
    @Expose
    private String MyIdName = "";
    @Expose
    private String ReferencesTable = "";
    @Expose
    private boolean IsForeignKeyDescriptor = false;
    @Expose
    private MetaEnum.FieldType Type = MetaEnum.FieldType.String;
    @Expose
    private int MaxLength = 255;
    @Expose
    private int MinLength = 0;
    @Expose
    private int MaxDecimal = 2;
    @Expose
    private int MaxInteger = 10;
    @Expose
    private String DefaultValue = "";

    public String getUltraShortName() {
        return UltraShortName;
    }

    public void setUltraShortName(String UltraShortName) {
        this.UltraShortName = UltraShortName;
    }

    public String getShortName() {
        return ShortName;
    }

    public void setShortName(String ShortName) {
        this.ShortName = ShortName;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String Description) {
        this.Description = Description;
    }

    public boolean isIsId() {
        return IsId;
    }

    public void setIsId(boolean IsId) {
        this.IsId = IsId;
    }

    public boolean isIsIdForeignKey() {
        return IsIdForeignKey;
    }

    public void setIsIdForeignKey(boolean IsIdForeignKey) {
        this.IsIdForeignKey = IsIdForeignKey;
    }

    public boolean isIsObjForeignKey() {
        return IsObjForeignKey;
    }

    public void setIsObjForeignKey(boolean IsObjForeignKey) {
        this.IsObjForeignKey = IsObjForeignKey;
    }

    public String getReferencesTable() {
        return ReferencesTable;
    }

    public void setReferencesTable(String ReferencesTable) {
        this.ReferencesTable = ReferencesTable;
    }

    public MetaEnum.FieldType getType() {
        return Type;
    }

    public void setType(MetaEnum.FieldType Type) {
        this.Type = Type;
    }

    public int getMaxLength() {
        return MaxLength;
    }

    public void setMaxLength(int MaxLength) {
        this.MaxLength = MaxLength;
    }

    public int getMinLength() {
        return MinLength;
    }

    public void setMinLength(int MinLength) {
        this.MinLength = MinLength;
    }

    public int getMaxDecimal() {
        return MaxDecimal;
    }

    public void setMaxDecimal(int MaxDecimal) {
        this.MaxDecimal = MaxDecimal;
    }

    public int getMaxInteger() {
        return MaxInteger;
    }

    public void setMaxInteger(int MaxInteger) {
        this.MaxInteger = MaxInteger;
    }

    public String getDefaultValue() {
        return DefaultValue;
    }

    public void setDefaultValue(String DefaultValue) {
        this.DefaultValue = DefaultValue;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public void setIsForeignKeyDescriptor(boolean ForeignKeyDescriptor) {
        this.IsForeignKeyDescriptor = ForeignKeyDescriptor;
    }

    public boolean isIsForeignKeyDescriptor() {
        return IsForeignKeyDescriptor;
    }

    public String getMyObjName() {
        return MyObjName;
    }

    public void setMyObjName(String MyObjName) {
        this.MyObjName = MyObjName;
    }

    public String getMyMetaName() {
        return MyMetaName;
    }

    public void setMyMetaName(String MyMetaName) {
        this.MyMetaName = MyMetaName;
    }

    public String getMyIdName() {
        return MyIdName;
    }

    public void setMyIdName(String MyIdName) {
        this.MyIdName = MyIdName;
    }
}
