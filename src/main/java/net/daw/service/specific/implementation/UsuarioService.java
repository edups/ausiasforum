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
package net.daw.service.specific.implementation;

import java.sql.Connection;
import java.sql.SQLException;
import net.daw.service.generic.implementation.TableServiceGenImpl;
import javax.servlet.http.HttpServletRequest;
import net.daw.bean.specific.implementation.UsuarioBean;
import net.daw.connection.implementation.BoneConnectionPoolImpl;
import net.daw.connection.publicinterface.ConnectionInterface;
import net.daw.dao.specific.implementation.UsuarioDao;
import net.daw.helper.statics.ExceptionBooster;
import net.daw.helper.statics.JsonMessage;

public class UsuarioService extends TableServiceGenImpl {

    public UsuarioService(HttpServletRequest request) {
        super(request);
    }

    public String login() throws SQLException, Exception {
        UsuarioBean oUserBean = (UsuarioBean) oRequest.getSession().getAttribute("userBean");
        String strAnswer = null;
        String strCode = "200";
        if (oUserBean == null) {
            String login = oRequest.getParameter("login");
            String pass = oRequest.getParameter("password");
            if (!login.equals("") && !pass.equals("")) {
                ConnectionInterface DataConnectionSource = null;
                Connection oConnection = null;
                try {
                    DataConnectionSource = new BoneConnectionPoolImpl();
                    oConnection = DataConnectionSource.newConnection();
                    UsuarioBean oUsuario = new UsuarioBean();
                    oUsuario.setLogin(login);
                    oUsuario.setPassword(pass);
                    UsuarioDao oUsuarioDao = new UsuarioDao(oConnection);
                    oUsuario = oUsuarioDao.getFromLogin(oUsuario);
                    if (oUsuario.getId() != 0) {
                        oRequest.getSession().setAttribute("userBean", oUsuario);
                        strAnswer = oUsuario.getLogin();
                    } else {
                        strCode = "403";
                        strAnswer = "User or password incorrect";
                    }
                } catch (Exception ex) {
                    ExceptionBooster.boost(new Exception(this.getClass().getName() + ":login ERROR " + ex.toString()));
                } finally {
                    if (oConnection != null) {
                        oConnection.close();
                    }
                    if (DataConnectionSource != null) {
                        DataConnectionSource.disposeConnection();
                    }
                }
            }
        } else {
            strAnswer = "Already logged in";
        }
        return JsonMessage.getJsonMsg(strCode, strAnswer);
    }

    public String logout() {        
        oRequest.getSession().invalidate();
        return JsonMessage.getJsonMsg("200", "Bye");
    }

    public String getsessionstatus() {
        String strAnswer = null;
        UsuarioBean oUserBean = (UsuarioBean) oRequest.getSession().getAttribute("userBean");
        if (oUserBean == null) {
            return JsonMessage.getJsonMsg("403", "ERROR: You don't have permission to perform this operation");
        } else {
            return JsonMessage.getJsonMsg("200", oUserBean.getLogin());
        }
    }

    public int sessionuserlevel() {
        String strAnswer = null;
        UsuarioBean oUserBean = (UsuarioBean) oRequest.getSession().getAttribute("userBean");
        if (oUserBean == null) {
            return 0;
        } else {
            return oUserBean.getId_estado();
        }
    }

}
