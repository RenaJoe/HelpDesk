<?php
function getRealIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        return $_SERVER['HTTP_CLIENT_IP'];
       
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
   
    return $_SERVER['REMOTE_ADDR'];
}
$ip = getRealIP();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=0, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bienvenido</title>
    <link rel="stylesheet" href="view/css/general.css">
    <link rel="stylesheet" href="view/css/_login.css">
    <script src="view/js/jquery.min.js"></script>
    <script src="view\js\_login.js"></script>
</head>


<body>
    <form method="Post" id="form">
        <table>
            <tbody>
                <tr>
                    <td class="center"><img src="view\img\general\logo2.png" width="200px"></td>
                </tr>
                <tr>
                    <td class="tit">HELPDESK VIP-G</td>
                </tr>
            </tbody>
        </table>
        <label class="tit-npt">Usuario</label>
        <input type="text" class="npt" id="user" maxlength="25"/>
        <span id="u_lrt"></span>
        <label class="tit-npt">Contraseña</label>
        <input type="password" class="npt" id="pass" maxlength="25" autocomplete="off"/>
        <span id="p_lrt"></span>
        <strong><?php //echo $ip; ?></strong>
        <button id="btn_login">Ingresar</button>
    </form>
    <div id="alerta"></div>

</body>
</html>