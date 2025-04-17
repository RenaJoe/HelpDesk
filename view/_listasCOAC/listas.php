<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Cooperativas</title>

    <!-- MATERIALIZECSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link rel="stylesheet" href="../../view/css/general.css">
    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

    <style>
        body {
            font-size: 16px;
            /* Tamaño base aumentado */
        }

        .user-image {
            width: 100px;
            border-radius: 50%;
        }

        .sidenav {
            width: 301px;
            font-size: 15px;
            /* Tamaño para el menú lateral */
        }

        .main-content {
            margin-left: 270px;
            margin-top: 20px;
        }

        .centered-form {
            max-width: 700px;
            margin: 0 auto;
        }

        @media only screen and (max-width: 992px) {
            .main-content {
                margin-left: 0;
            }
        }

        .form-section {
            margin-bottom: 30px;
        }

        .section-title {
            font-weight: bold;
            color: #252A54;
            margin-bottom: 15px;
            font-size: 18px;
            /* Tamaño para títulos de sección */
        }

        nav,
        .sidenav {
            background-color: #252A54 !important;
        }

        .btn-action {
            margin: 10px 5px;
            width: 220px;

        }

        .nav-item-orange {
            background-color: #F07427;
            margin: 0 15px 1px 15px;
            border-radius: 9px;
            text-align: left;
            font-size: 15px;
        }

        .nav-item-orange a {
            color: white !important;
            font-weight: bold;
            display: block;
            padding: 0 16px;
        }

        .nav-item-white a {
            color: #FDF5E6 !important;
            font-size: 15px;
        }

        .nav-item-white:hover {
            background-color: #F07427 !important;
            /* Color más oscuro al pasar el mouse */
            border-color: #f5f5f5 !important;
            /* Borde más claro al pasar el mouse */
            margin: 0 15px 1px 15px;
            border-radius: 9px;
        }

        .btn-cerrar-formulario {
            margin: 20px;
            font-weight: bold;
            font-size: 15px;
            background-color: #F44336 !important;
            /* Color rojo original */
            transition: all 0.3s ease;
            /* Transición suave */
            border-radius: 9px;
        }

        .btn-cerrar-formulario:hover {
            background-color: #d65c61 !important;
            /* Color más oscuro al pasar el mouse */
            border-color: #f5f5f5 !important;
            /* Borde más claro al pasar el mouse */
        }
    </style>

</head>

<body>
    <!-- NAVBAR -->
    <nav>
        <div class="nav-wrapper">
            <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons">menu</i>
            </a>
        </div>
    </nav>

    <ul id="slide-out" class="sidenav sidenav-fixed">
        <li>
            <div class="user-view">
                <div class="background"></div>
                <a><img class="circle" src="../../assets/img/find_user.png"></a>
                <a><span class="white-text name" style="font-size: 17px; font-weight: bold;">COMERCIAL</span></a>
            </div>
        </li>

        <li class="nav-item-white">
            <a href="/Helpdesk/view/_form/form.php">Registrar Nueva Cooperativa</a>
        </li>
        <li class="nav-item-orange">
            <a href="/Helpdesk/view/_listasCOAC/listas.php">Lista de Cooperativas</a>
        </li>

        <li>
            <a href="../../view/_control_administrador/index.php" class="btn btn-cerrar-formulario waves-effect waves-light">REGRESAR</a>
        </li>
    </ul>

    <!-- MAIN CONTENT -->
    <!-- MAIN CONTENT -->
    <main class="main-content">
        <div class="container">
            <h4 class="center-align orange-text">Lista de Cooperativas</h4>

            <!-- Tabla Responsive -->
            <div class="card z-depth-3">
                <div class="card-content">
                    <div class="row">
                        <div class="col s12">
                            <!-- Barra de búsqueda -->
                            <div class="input-field col s12 m6">
                                <i class="material-icons prefix">search</i>
                                <input id="search" type="text" placeholder="Buscar cooperativa...">
                            </div>

                            <!-- Botón de agregar -->
                            <div class="col s12 m6 right-align">
                                <a href="/Helpdesk/view/_form/form.php" class="btn orange waves-effect waves-light">
                                    <i class="material-icons left">add</i>Nueva Cooperativa
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Tabla -->
                    <table class="striped highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Segmento</th>
                                <th>Ubicación</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>COAC Andina</td>
                                <td>Financiero</td>
                                <td>Quito</td>
                                <td>contacto@coop1.com</td>
                                <td>0982102525</td>
                                <td><span class="new badge green" data-badge-caption="Activo"></span></td>
                                <td>
                                    <a href="#" class="btn-small blue waves-effect waves-light"><i class="material-icons">edit</i></a>
                                    <a href="#" class="btn-small red waves-effect waves-light"><i class="material-icons">delete</i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>COAC Nuevo Amanecer</td>
                                <td>Agropecuario</td>
                                <td>Guayaquil</td>
                                <td>info@coop2.com</td>
                                <td>0963033493</td>
                                <td><span class="new badge orange" data-badge-caption="Pendiente"></span></td>
                                <td>
                                    <a href="#" class="btn-small blue waves-effect waves-light"><i class="material-icons">edit</i></a>
                                    <a href="#" class="btn-small red waves-effect waves-light"><i class="material-icons">delete</i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>COAC 16 de Julio</td>
                                <td>Transporte</td>
                                <td>Cuenca</td>
                                <td>admin@coop3.com</td>
                                <td>022699196</td>
                                <td><span class="new badge red" data-badge-caption="Inactivo"></span></td>
                                <td>
                                    <a href="#" class="btn-small blue waves-effect waves-light"><i class="material-icons">edit</i></a>
                                    <a href="#" class="btn-small red waves-effect waves-light"><i class="material-icons">delete</i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Paginación -->
                    <ul class="pagination center-align">
                        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                        <li class="active"><a href="#!">1</a></li>
                        <li class="waves-effect"><a href="#!">2</a></li>
                        <li class="waves-effect"><a href="#!">3</a></li>
                        <li class="waves-effect"><a href="#!">4</a></li>
                        <li class="waves-effect"><a href="#!">5</a></li>
                        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </main>


    <!-- SCRIPTS -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            M.AutoInit(); // Inicializar MaterializeCSS
            // Inicializar select
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
        });
    </script>
</body>

</html>