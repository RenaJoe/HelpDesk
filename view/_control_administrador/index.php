<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HELPDESK</title>

    <!-- MATERIALIZECSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <!-- GOOGLE ICONS -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <style>
        /* Color azul personalizado similar al de COMERCIAL */
        .blue-custom {
            background-color: #252A54 !important;
        }

        /* Ajustes para centrar el main */
        main {
            margin-left: 100px;
            /* Igual al ancho del sidenav */
            padding: 50px;
            transition: margin-left .3s;
        }

        @media only screen and (max-width: 992px) {
            main {
                margin-left: 0;
            }
        }

        /* Centrar el contenido dentro del container */
        .container {
            width: 50%;
            max-width: 1000px;
        }

        /* Ajustar la tabla para que no sea demasiado ancha */
        .card .card-content {
            overflow-x: auto;
        }
    </style>
</head>

<body>
    <header>
        <!-- NAVBAR - Cambiado a azul -->
        <nav class="blue-custom">
            <div class="nav-wrapper">
                <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                    <i class="material-icons" aria-hidden="true">menu</i>
                </a>
            </div>
        </nav>

        <!-- SIDENAV -->
        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li>
                <div class="user-view">
                    <!-- Fondo cambiado a azul -->
                    <div class="background blue-custom"></div>
                    <a><img class="circle" src="../../assets/img/find_user.png"></a>
                    <a><span class="white-text name" style="font-size: 17px; font-weight: bold;">Usuario</span></a>
                </div>
            </li>

            <li>
                <a class="dropdown-trigger" href="#!" data-target="areas-dropdown">
                    <i class="material-icons">apps</i>Áreas VIP-G<i class="material-icons right">arrow_drop_down</i>
                </a>
            </li>

            <li><a href="tab-panel.html"><i class="material-icons">info</i>Información</a></li>
            <li><a href="chart.html"><i class="material-icons">bar_chart</i>Cooperativas</a></li>
            <li>
                <a href="..\..\view\_login\" class="btn red lighten-1" style="margin: 20px;">CERRAR SESIÓN </a>
            </li>
        </ul>

        <!-- DROPDOWN STRUCTURE -->
        <ul id="areas-dropdown" class="dropdown-content">
            <li><a href="/Helpdesk/view/_listasCOAC/listas.php">Comercial</a></li>
            <li><a href="../../view/_modulos/contabilidad.php">Contabilidad</a></li>
            <li><a href="ui.html">Sistemas</a></li>
        </ul>
    </header>

    <main class="container">
        <!-- PAGE CONTENT -->
        <h2 class="center-align">Bienvenidos</h2>
        <div class="card z-depth-3">
            <div class="card-content">
                <span class="card-title center-align black-text text-darken-2">Nómina de Empleados</span>
                <table class="striped centered responsive-table">
                    <!-- Cabecera de tabla cambiada a azul -->
                    <thead class="blue-custom white-text">
                        <tr>
                            <th>Nombre</th>
                            <th>NOMBRE 2</th>
                            <th>Usuario</th>
                            <th>Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jerson</td>
                            <td>Pillajo</td>
                            <td>sistemas@vipg</td>
                            <td>Sí</td>
                        </tr>
                        <tr>
                            <td>Diego</td>
                            <td>Morocho</td>
                            <td>cumplimiento@vipg</td>
                            <td>Sí</td>
                        </tr>
                        <tr>
                            <td>Mónica</td>
                            <td>Tomalo</td>
                            <td>comercial@vipg</td>
                            <td>Sí</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!-- SCRIPTS -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            M.AutoInit(); // Inicializar MaterializeCSS
        });
    </script>
</body>

</html>