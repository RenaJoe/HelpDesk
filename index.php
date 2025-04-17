<?php
/* Creado por: Bryan Alejandro Chamba Freire */
session_start();
if(isset($_SESSION['P'])){
//echo (!isset($_GET['EMP']))?die('Usuario no autorizado'):'';
    include 'view/_'.$_SESSION['P'].'/index.php';
}else{
    include 'view/_login/index.php';
}