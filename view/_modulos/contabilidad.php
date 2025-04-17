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
            font-size: 16px; /* Tamaño base aumentado */
        }
        
        .user-image {
            width: 100px;
            border-radius: 50%;
        }

        .sidenav {
            width: 310px;
            font-size: 15px; /* Tamaño para el menú lateral */
        }
        
        .main-content {
            margin-left: 270px;
            padding: 20px;
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
            font-size: 18px; /* Tamaño para títulos de sección */
        }
        
        nav, .sidenav {
            background-color: #252A54 !important;
        }
        
        .btn-action {
            margin: 10px 5px;
            width: 220px;

        }
        
        /*Estilo para las letras del menu*/ 
        .nav-item-white a {
            color: #FDF5E6 !important;
            font-size: 15px;
            
        }

        .nav-item-white:hover {
            background-color: #F07427 !important; /* Color más oscuro al pasar el mouse */
            border-color: #f5f5f5 !important; /* Borde más claro al pasar el mouse */
            margin: 0 15px 0 15px;
            border-radius: 9px;
        }
        
       
        .btn-cerrar-formulario {
            margin: 20px;
            font-weight: bold;
            font-size: 15px;
            background-color: #F44336 !important; /* Color rojo original */
            transition: all 0.3s ease; /* Transición suave */
            border-radius: 9px;
        }
        
        .btn-cerrar-formulario:hover {
            background-color: #d65c61 !important; /* Color más oscuro al pasar el mouse */
            border-color: #f5f5f5 !important; /* Borde más claro al pasar el mouse */
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
        <li class="nav-item-white">
            <a href="/Helpdesk/view/_listasCOAC/listas.php">Lista de Cooperativas</a>
        </li>

        <li>
            <a href="../../view/_control_administrador/index.php" class="btn btn-cerrar-formulario waves-effect waves-light" >REGRESAR</a>
        </li>
    </ul>

    <!-- MAIN CONTENT -->
    

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