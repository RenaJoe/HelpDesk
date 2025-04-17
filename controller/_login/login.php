<?php
/* Creado por: Bryan Alejandro Chamba Freire */

include '../../config/cnxn.php';
include '../../model/_seguridad/login.php';
if(filter_input(INPUT_POST,'d1') && filter_input(INPUT_POST,'d2')){
    $db = new Login();
    $p = $db->rp($_POST);
    $u = $p['d1'];
    $p = sha1($p['d2']);
    $user = $db->sVerUsu($u,$p);


    unset($p);
    if($user != false){
        // $e = $user[0][0];  
        //$sec = $db->sAplIni($e,$u);
        //$db->iLog($e,$u,'Ingreso','Ingreso al sistema');
        session_start();
        // $_SESSION['DUS'] = $user[0][1];
        // $_SESSION['G'] = $user[0][2];
        $_SESSION['E'] = $user[0][0];
        $_SESSION['U'] = $u;
        $_SESSION['P'] = $user[0][3];
        // $_SESSION['CEC'] = $user[0][3];
        // $_SESSION['E'] = $e;
        // $_SESSION['U'] = $u;
        $r = [true,'./'];
    }else{
        $r = [false,'Usuario o contraseña incorrectos!'];
    }
}else{
    $r = [false,'Llene campos necesarios!'];
}
echo json_encode($r);