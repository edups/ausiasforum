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

var session = {
    loginForm: function () {
        return (                
                dom.div('id="broth_modal_login" class="modal fade bs-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"',                
                        dom.div('class="modal-dialog modal-sm"',
                                dom.div('class="modal-content"',
                                        dom.div('class="modal-header"',
                                                dom.div('class="panel-title text-center"', 'Introduce login y password')
                                                ) +
                                        dom.div('class="modal-body"',
                                                dom.div('class="row"',
                                                        dom.div('class="col-md-12 col-lg-12"',
                                                                dom.form('role="form"',
                                                                        dom.fieldset('',
                                                                                dom.div('class="form-group"',
                                                                                        dom.input('class="form-control" id="broth_input_login" placeholder="Login" name="email" type="email" value="rafael" autofocus', '')
                                                                                        ) +
                                                                                dom.div('class="form-group"',
                                                                                        dom.input('class="form-control" id="broth_input_password" placeholder="Password" name="password" type="password" value="rafael"', '')
                                                                                        ) +
                                                                                dom.a('href="index.html" id="broth_button_login" class="btn btn-lg btn-success btn-block"', 'Login')
                                                                                )

                                                                        )
                                                                )
                                                        )
                                                ) +
                                        dom.div('class="modal-footer" id="broth_login_modal_footer"', '')
                                        )
                                )
                        )
                )
    },         
    updateConnectedState: function (loginName) {
        $('#broth_username_id').text(loginName);
        $('.broth_show_when_logged_in').show();
        $('.broth_show_when_logged_out').hide();
        //$("#broth_username_menu_id").css('display', 'block', 'important');
        session.unloadLoginForm();
        loadRoutes();        
        Path.listen();
    },
    updateDisconnectedState: function () {
        $('#broth_username_id').text("Login");
        $('.broth_show_when_logged_in').hide();
        $('.broth_show_when_logged_out').show();
        //$("#broth_username_menu_id").css('display', 'none', 'important');
        session.loadLoginForm();
    },
    checkAndUpdateUserConnectionState: function () {
        promise.getSession().done(function (data) {
            if (data['status'] == 200) {
                session.updateConnectedState(data.message);
            } else {
                session.updateDisconnectedState();
            }
            ;
        });
    },
    login: function (username, password) {
        promise.getLogin(username, password).done(function (response) {
            $("#infoPanel").html(response.message);
            session.updateConnectedState(response.message);
        });
    },
    logout: function () {
        promise.getLogout().done(function (response) {
            $("#infoPanel").html(response.message);
            session.updateDisconnectedState();
        });
    },
    loadLoginForm: function () {
        //$('#loginFormBroth').css('display', 'block');
        //$("#documentoForm").append(thisObject.getEmptyModal());
        $("#broth_login_modal_footer").html("");
        
        $('#brothModalLogin').append(session.loginForm());
        modal.load('#broth_modal_login', true);
        //$('#broth_modal_login').css('width', '20%');

        $("#broth_button_login").unbind('click');
        $("#broth_button_login").click(function () {
            username = $("#broth_input_login").val();
            password = $("#broth_input_password").val();
            $("#broth_login_modal_footer").html("Please, wait while contacting server for authentication...");
            promise.getLogin(username, password).done(function (response) {
                if (response.status == 200) {
                    $("#broth_login_modal_footer").html("Welcome, you're allowed to enter the site!");
                    session.unloadLoginForm();
                    session.updateConnectedState(response.message)
                } else {
                    $("#broth_login_modal_footer").html("Login, password or both are incorrect. Please try it again.");
                    session.updateDisconnectedState();
                }
            })
            return false;
        });
    },
    unloadLoginForm: function () {
        //$("#login").unbind('click');
        //$('#loginFormBroth').css('display', 'none');
        $('#broth_modal_login').modal('hide');
        //$('#broth_modal_login').empty();
    }


}