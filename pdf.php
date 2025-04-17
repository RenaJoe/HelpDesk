<?php
$opc = $_GET['P'];

switch($opc){
    case 'C-LISTA':
        include './controller/_listas/c_consultas_pdf.php';
        break;
    case 'PJ':
        $pdf = $_GET['FL'];
        $t = explode('.',$pdf);
        if(end($t) != 'pdf'){
            echo '¡File not found! (INVALID EXTENSION)';
        }else{
            header("Location: http://173.212.254.64/index.php?FL=$pdf", true, 301);
        }
        break;
    default:
        header('Location: ./');
        break;
}