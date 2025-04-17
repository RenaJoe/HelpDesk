<?php
if (isset($_GET['F'])) {
    $rutaArchivo = $_GET['F'];
    $rutaCompleta = 'files/temp/' . $rutaArchivo;
    if (file_exists($rutaCompleta)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $rutaArchivo . '"');
        header('Content-Length: ' . filesize($rutaCompleta));
        readfile($rutaCompleta);
        exit;
    } else {
        echo "Archivo no encontrado.";
    }
}
?>