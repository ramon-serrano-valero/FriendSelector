/*
* jQuery.weekCalendar v1.2.2
* http://www.redredred.com.au/
*
* Requires:
* - jquery.FriendSelector.css
* - jquery 1.3.x
* - jquery-ui 1.7.x (Selectable)
*
* Copyright (c) 2012 Ramón Serrano Valero
*/
(function ($) {
    $.fn.FriendSelector = function (options_user) {
        // jQuery.extend, una función built-in de jQuery, pensada para proveer variables con valores "default", modificables por el usuario
        // Aqui es donde comparamos los parametros que envia el user y las que pone el Plugin por defecto,  si el usuario no ingresa opciones se toman las predeterminadas, y si las ingresa, se sobreescriben.
            var options = jQuery.extend($.fn.FriendSelector.default_options, options_user);
        
        //Metemos el html del filtrado, botones y lista
            $(this).append('<input type=\"text\" title=\"' + options.text_filter + '\" class=\"filterFS\"/><br /><br /><div class=\"viewallFS\" ><span class=\"tabs_selectables\">&nbsp;<label name=\"lbl_viewall\">' + options.name_viewall + '</label>&nbsp;</span></div><div class=\"selectedsFS\"><span class=\"tabs_selectables\">&nbsp;<img src=\"ok_white.png\" /><label name=\"lbl_selecteds\">' + options.name_viewselecteds + '</asp:Label>&nbsp;</span></div><div class=\"unselectedsFS\"><span class=\"tabs_selectables">&nbsp;<label name="lbl_unselecteds\">' + options.name_viewunselecteds + '</label>&nbsp;</span></div><ul class=\"FriendSelectable columnas\" ></ul>');
        //Filtrado.........................................................................................................................
            $(".filterFS").each(function () {
                if ($(this).val() == $(this).attr('title'))
                    $(this).val('').attr('class', 'filterFS WaterMark');
                //$(this).val('').addClass('WaterMark');
                else
                    if ($.trim($(this).val()) == '')
                        $(this).val($(this).attr('title')).attr('class', 'filterFS WaterMark');
                //$(this).addClass('WaterMark').val($(this).attr('title'));
            });
            // AL OBTENER EL FOCO LIMPIA TITLE Y QUITA CLASE DE MARCA 
            $(".filterFS").focus(function () {

                if ($(this).hasClass("WaterMark")) {
                    $(this).attr('class', 'filterFS WaterMarkOff').val('');
                    //$(this).removeClass('WaterMark').val('');
                    //$(this).addClass('WaterMarkOff');
                }

            });
            // AL PERDER FOCO SI EL INPUT ESTÁ VACIO VUELVE A PONER MARCA 
            $(".filterFS").blur(function () {
                if ($(this).val() == '') {
                    $(this).attr('class', 'filterFS WaterMark').val($(this).attr('title'));
                    //$(this).removeClass('WaterMarkOff');
                    //$(this).addClass('WaterMark').val($(this).attr('title'));
                }
                else
                    $(this).addClass('WaterMarkOff');
            });
            $(".filterFS").keyup(function (event) {
                var childs = $(".FriendSelectable")[0].children;
                for (var i = 0; i < childs.length; i++) {
                    if ($($($(".FriendSelectable")[0].children[i])[0]).attr('name').toLowerCase().indexOf($(".filterFS").val().toLowerCase()) >= 0)
                        $($(".FriendSelectable")[0].children[i]).css('display', 'block');
                    else
                        $($(".FriendSelectable")[0].children[i]).css('display', 'none');
                }
            });
            //.................................................................................................................................
        
        //Logica de Selección de Items del listado usando la UI Selectable
        $(".FriendSelectable").selectable(
        {
            create: function (event, ui) {
                var arr_friends = options._create;
                for (var i = 0; i < arr_friends.length; i++)
                    $(".FriendSelectable").append('<li id=\"selectable_li_' + arr_users[i].id + '\" name=\"' + arr_users[i].name + '\"><div id=\"selectable_div_' + arr_users[i].id + '\"><img src=\"' + options.src_image + '\" width=\"20\" height=\"20\" /><label name=\"selectable_lbl_' + arr_users[i].id + '\">' + arr_users[i].name + '</label></div></li>');
                $("[name=lbl_selecteds]").text("(0) "+options.name_viewselecteds); //Seleccionados
                $("[name=lbl_unselecteds]").text("(" + this.children.length + ") "+options.name_viewunselecteds); //No Seleccionados
                $("[name=lbl_viewall]").text("(" + this.children.length + ") " + options.name_viewall); //Todos
            },
            selecting: function (event, ui) {
            },
            selected: function (event, ui) {
            },
            
            unselecting: function (event, ui) {
            },
            unselected: function (event, ui) {
                var elem = document.getElementById(ui.unselected.id);
                if (elem != null) {
                    $(elem).attr("class", "ui-selectee");
                    $(elem.children[0]).attr("class", "ui-selectee");
                    $(elem.children[0].children[0]).attr("class", "ui-selectee"); //$("#" + this.children[i].id).attr("class"));
                    $(elem.children[0].children[1]).attr("class", "ui-selectee");
                    //$(elem.children[0]).attr("class", "ui-selectee");
                    //$(elem.children[1]).attr("class", "ui-selectee");
                }
            },
            start: function (event, ui) {
            },
            stop: function (event, ui) {
                var childs = this.children;//Items totales
                var contSel = 0;//Items seleccionados
                var contUnSel = 0;//Items no seleccionados
                for (var i = 0; i < childs.length; i++) {
                    if ($(this.children[i]).attr("class") == "ui-selectee ui-selected")
                        contSel++;
                    else
                        contUnSel++;
                    $(this.children[i].children[0]).attr("class", "ui-selectee");
                    $(this.children[i].children[0].children[0]).attr("class", "ui-selectee");
                    $(this.children[i].children[0].children[1]).attr("class", "ui-selectee");

                    //$(this.children[i].children[0]).attr("class", "ui-selectee");
                    //$(this.children[i].children[1]).attr("class", "ui-selectee");
                }
                $("[name=lbl_selecteds]").text("(" + contSel + ") " + options.name_viewselecteds); //Seleccionados
                $("[name=lbl_unselecteds]").text("(" + contUnSel + ") " + options.name_viewunselecteds); //No Seleccionados
                $("[name=lbl_viewall]").text("(" + childs.length + ") " + options.name_viewall); //Todos
            }

        });

        //Acciones Muestreo..........................................................................................
            
            //Mostrar Todos los Seleccionados
            $('.selectedsFS').click(function () {
                $(".filterFS").attr('class', 'filterFS WaterMark').val($(".filterFS").attr('title'));
                //$(".filterFS").addClass('WaterMark').val($(".filterFS").attr('name'));
                var childs = $(".FriendSelectable")[0].children;
                for (var i = 0; i < childs.length; i++) {
                    if ($($(".FriendSelectable")[0].children[i]).attr('class') == "ui-selectee ui-selected")
                        $($(".FriendSelectable")[0].children[i]).css('display', 'block');
                    else
                        $($(".FriendSelectable")[0].children[i]).css('display', 'none');
                }
            });

            //Mostrar Todos los No Seleccionados
            $('.unselectedsFS').click(function () {
                $(".filterFS").attr('class', 'filterFS WaterMark').val($(".filterFS").attr('title'));
                //$(".filterFS").addClass('WaterMark').val($(".filterFS").attr('title'));
                var childs = $(".FriendSelectable")[0].children;
                for (var i = 0; i < childs.length; i++) {
                    if ($($(".FriendSelectable")[0].children[i]).attr('class') == "ui-selectee ui-selected")
                        $($(".FriendSelectable")[0].children[i]).css('display', 'none');
                    else
                        $($(".FriendSelectable")[0].children[i]).css('display', 'block');
                }
            });

            //Mostrar Todos
            $('.viewallFS').click(function () {
                $(".filterFS").attr('class', 'filterFS WaterMark').val($(".filterFS").attr('title'));
                //$(".filterFS").addClass('WaterMark').val($(".filterFS").attr('title'));
                var childs = $(".FriendSelectable")[0].children;
                for (var i = 0; i < childs.length; i++) {
                    $($(".FriendSelectable")[0].children[i]).css('display', 'block');
                }
            });
        //.........................................................................................................

        //};
    }

    //El plugin tiene estas opciones por defecto, pero el usuario puede modificar estas opciones por defecto de esta forma en cliente:
    //$("#div_container").FriendSelector.default_options.namedefaultparam = "value";
        $.fn.FriendSelector.default_options = {
            //namedefaultparam:  'valueparamdefault',namedefaultparam2:  'valueparamdefault2'
            name_viewall: 'Todos',
            name_viewselecteds: 'Seleccionados',
            name_viewunselecteds: 'No Seleccionados',
            text_filter: 'Filtrar por Nombre...',
            src_image: 'new_ico_user.png',
            _create: new Array()
        };

})(jQuery);