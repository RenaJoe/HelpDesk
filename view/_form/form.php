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

        /* Parte blanca del menú lateral */
        .sidenav-white-section {
            background-color: white;
            margin-top: -20px;
            /* Empalme con la sección azul */
            padding-top: 20px;
            height: calc(100% - 180px);
            /* Ajuste de altura */
        }

        .main-content {
            margin-left: 270px;
            padding: 20px;
            transition: margin-left 0.3s;
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

        /* Tamaños para campos de formulario */
        .input-field label {
            font-size: 15px;
        }

        .input-field input,
        .input-field textarea,
        .input-field select {
            font-size: 16px;
        }

        /* Estilo para el enlace de Registrar Nueva Cooperativa */
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
            margin: 0 15px 0 15px;
            border-radius: 9px;
        }

        /* Título principal */
        h4 {
            font-size: 30px !important;

        }

        /* Checkboxes y radios */
        [type="checkbox"]+span:not(.lever),
        [type="radio"]+span:not(.lever) {
            font-size: 15px;
            padding-left: 25px;
        }


        .btn-cerrar-formulario {
            margin: 20px;
            font-weight: bold;
            font-size: 15px;
            background-color: #F44336 !important;
            /* Color rojo original */
            transition: all 0.3s ease;
            /* Transición suave */
            border-radius: 10px;
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

        <li class="nav-item-orange">
            <a href="/Helpdesk/view/_form/form.php">Registrar Nueva Cooperativa</a>
        </li>
        <li class="nav-item-white">
            <a href="../../view/_listasCOAC/listas.php">Lista de Cooperativas</a>
        </li>

        <li>
            <a href="../../view/_listasCOAC/listas.php" class="btn btn-cerrar-formulario waves-effect waves-light">CERRAR FORMULARIO</a>
        </li>
    </ul>

    <!-- MAIN CONTENT -->
    <main class="main-content">
        <div class="centered-form">
            <div class="card-panel z-depth-3">
                <h4 class="orange-text center-align">Registro de Cooperativas</h4>
                <form>
                    <!-- Nombre de la Cooperativa -->
                    <div class="input-field form-section">
                        <input id="nombre_cooperativa" type="text" class="validate">
                        <label for="nombre_cooperativa">Nombre de la Cooperativa</label>
                    </div>

                    <!-- Segmento -->
                    <div class="input-field form-section">
                        <textarea id="segmento_cooperativa" class="materialize-textarea"></textarea>
                        <label for="segmento_cooperativa">Segmento al que pertenece</label>
                    </div>

                    <!-- Ubicacion -->
                    <div class="input-field form-section">
                        <textarea id="ubicacion_cooperativa" class="materialize-textarea"></textarea>
                        <label for="ubicacion_cooperativa">Ubicación de la Cooperativa</label>
                    </div>

                    <!-- Número de la Cooperativa -->
                    <div class="input-field form-section">
                        <input id="numero_cooperativa" type="text" class="validate">
                        <label for="numero_cooperativa">Número de la Cooperativa</label>
                    </div>

                    <!-- Correo de la Cooperativa -->
                    <div class="input-field form-section">
                        <input id="correo_cooperativa" type="email" class="validate">
                        <label for="correo_cooperativa">Correo de la Cooperativa</label>
                    </div>

                    <!-- Requerimiento -->
                    <div class="input-field form-section">
                        <textarea id="requerimiento" class="materialize-textarea"></textarea>
                        <label for="requerimiento">Requerimiento</label>
                    </div>

                    <!-- Sistemas -->
                    <div class="form-section">
                        <p class="section-title">Sistemas:</p>
                        <div class="row">
                            <div class="col s12 m4">
                                <label>
                                    <input type="checkbox" />
                                    <span>Lavado de Activos</span>
                                </label>
                            </div>
                            <div class="col s12 m4">
                                <label>
                                    <input type="checkbox" />
                                    <span>Providencias Judiciales</span>
                                </label>
                            </div>
                            <div class="col s12 m4">
                                <label>
                                    <input type="checkbox" />
                                    <span>Listas de Control</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Requisitos -->
                    <div class="form-section">
                        <p class="section-title">Requisitos:</p>
                        <div class="row">
                            <div class="col s12 m3">
                                <label>
                                    <input type="checkbox" />
                                    <span>Instalación</span>
                                </label>
                            </div>
                            <div class="col s12 m3">
                                <label>
                                    <input type="checkbox" />
                                    <span>Información</span>
                                </label>
                            </div>
                            <div class="col s12 m3">
                                <label>
                                    <input type="checkbox" />
                                    <span>Soporte</span>
                                </label>
                            </div>
                            <div class="col s12 m3">
                                <label>
                                    <input type="checkbox" />
                                    <span>Capacitación</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="input-field form-section">
                        <select>
                            <option value="" disabled selected>Elija una opción</option>
                            <option value="1">Comercial</option>
                            <option value="2">Contabilidad</option>
                            <option value="3">Sistemas</option>
                            <option value="4">Cumplimiento</option>
                        </select>
                        <label>Realizado por</label>
                    </div>

                    <!-- Departamento -->
                    <div class="form-section">
                        <p class="section-title">Departamento:</p>
                        <div class="row">
                            <div class="col s12 m3">
                                <label>
                                    <input name="group1" type="radio" checked />
                                    <span>Contabilidad</span>
                                </label>
                            </div>
                            <div class="col s12 m3">
                                <label>
                                    <input name="group1" type="radio" />
                                    <span>Sistemas</span>
                                </label>
                            </div>
                            <div class="col s12 m3">
                                <label>
                                    <input name="group1" type="radio" />
                                    <span>Providencias</span>
                                </label>
                            </div>
                            <div class="col s12 m3">
                                <label>
                                    <input name="group1" type="radio" />
                                    <span>Cumplimiento</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="center-align form-section">
                        <button class="btn orange darken-2 waves-effect waves-light btn-action" type="submit">Guardar y Enviar</button>
                        <button class="btn orange darken-2 waves-effect waves-light btn-action" type="reset">Guardar Contrato</button>
                    </div>
                </form>
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