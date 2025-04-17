<?php
/* Creado por: Bryan Alejandro Chamba Freire */
include '../../config/dt00.php';
include '../../config/cnxn.php';
if(filter_input(INPUT_POST,'d1')){
    session_start();
    $o = filter_input(INPUT_POST,'d1');
    switch($o){
        case 'IN':
            include '../../model/_seguridad/seguridad.php';
            $db = new Seguridad();
            $db->E = $_SESSION['E'];
            $db->U = $_SESSION['U'];
            // $sNom = $db->sNomUser();
            $r = [true,''];
        break;
        case 'CS':
            $db = new Con();
            // $db->iLog($_SESSION['E'],$_SESSION['U'],'Salida','Cierre de sesion');
            session_destroy();
            $r = [true,'./'];
        break;
        default:
            $r = [false,'Faltan criterios necesarios(default)!'];
        break;
    }
}else{
    $r = [false,'Faltan criterios necesarios!'];
}
echo json_encode($r);