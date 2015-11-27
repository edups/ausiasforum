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
package net.daw.helper.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import net.daw.helper.statics.MetaEnum;
import net.daw.helper.statics.MetaEnum.FieldType;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
//@Target(ElementType.TYPE)
public @interface MethodMetaInformation {

    public String UltraShortName() default "";

    public String ShortName() default "";

    public String Description() default "";

    public boolean IsId() default false;

    public boolean IsIdForeignKey() default false;

    public boolean IsObjForeignKey() default false;

    public String MyIdName() default ""; //in an obj_ field identifies its id_ pair field

    public String ReferencesTable() default ""; //in an obj_ or id_ field identifies its foreign table

    public boolean IsForeignKeyDescriptor() default false; //field that is used to show this object as a foreign key

    public MetaEnum.FieldType Type() default FieldType.String;

    public int MaxLength() default 255;

    public int MinLength() default 0;

    public int MaxDecimal() default 2;

    public int MaxInteger() default 10;

    public String DefaultValue() default "";

}
