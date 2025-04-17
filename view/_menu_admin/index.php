<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Administración</title>
    <link rel="stylesheet" href="view/css/materialize.min.css" media="screen,projection" />
    <link rel="stylesheet" href="view/css/_menu.css?6" media="screen,projection" />
    <link rel="stylesheet" href="view/css/_card01.css?6" media="screen,projection" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <script src="view/js/jquery.min.js?6"></script>
</head>

<body>

    <header>
        <nav class="blue-grey darken-3">
            <div class="nav-wrapper">
                <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons white-text">menu</i></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="#" id="txt_username_nav" class="bold">---</a></li>
                    <li><a href="#" id="bt_salir_nv"><i class="material-icons white-text" title="Salir">exit_to_app</i></a></li>
                </ul>
            </div>
        </nav>

        <ul id="slide-out" class="sidenav sidenav-fixed blue-grey darken-3">
            <li class="lg-logo">
                <img src="view/img/general/logo2.png" width="154px" />
            </li>
            <li class="divider hide-on-large-only"></li>
            <li class="hide-on-large-only"><a href="#!" id="txt_username_menu" class="truncate bold center">-</a></li>
            <li class="divider"></li>
            <!-- <li>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header waves-effect">Usuarios<i class="material-icons">group</i><i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" id="bt_prod">Productos</a></li>
                                <li><a href="#!" id="bt_clie">Clientes</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li> -->
            <li>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header waves-effect white-text">Usuarios<i class="material-icons yellow-text text-darken-2">person_outline</i><i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_usad"><i class="material-icons">person</i>Administrador</a></li>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_enti"><i class="material-icons">domain</i>Entidades</a></li>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_uscl"><i class="material-icons">group</i>Clientes</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header waves-effect white-text">Listas<i class="material-icons blue-text text-darken-2">list</i><i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_files"><i class="material-icons blue-text">file_upload</i>Cargar Archivos</a></li>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_histo"><i class="material-icons">featured_play_list</i>Historico Listas</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header waves-effect white-text">Registro Civil<i class="material-icons  lime-text text-darken-2">featured_play_list</i><i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_nombr"><i class="material-icons blue-text">person</i>Nombre</a></li>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_verif"><i class="material-icons blue-text">person</i>Verificación por nombres</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a href="#!" class="collapsible-header waves-effect sidenav-close white-text"><i class="material-icons red-text">date_range</i>Agendamiento<i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_agend"><i class="material-icons">date_range</i>Agendar</a></li>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_grdage"><i class="material-icons">description</i>Agendado</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a href="#!" class="collapsible-header waves-effect sidenav-close white-text"><i class="material-icons red-text">date_range</i>Historico<i class="material-icons right">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_logHis"><i class="material-icons teal-text">receipt</i>Log</a></li>
                                <li><a href="#!" class="collapsible-header waves-effect sidenav-close" id="bt_logUsu"><i class="material-icons teal-text">receipt</i>Log Usuarios</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li><a href="#!" class="collapsible-header waves-effect sidenav-close white-text" id="bt_ccont"><i class="material-icons yellow-text">lock</i>Cambiar contraseña</a></li>
            <li><a href="#!" class="collapsible-header waves-effect white-text" id="bt_salir"><i class="material-icons red-text">exit_to_app</i>Salir</a></li>
            <li><span class="white-text">-</span></li>
            <li><span class="white-text">-</span></li>
        </ul>
    </header>

    <div id="dv_here" class="grey-text text-lighten-1"></div>

    <main id="res"></main>

    <script type="text/javascript" src="view/js/materialize.min.js"></script>
    <script src="view/js/_s001.js?6"></script>
    <script src="view/js/_s002.js?6"></script>
    <script src="view/js/_menu.js?6"></script>
</body>

</html>