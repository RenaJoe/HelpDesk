<?php
/* Creado por: Bryan Alejandro Chamba Freire */

use Symfony\Component\VarDumper\VarDumper;

include '../../config/dt00.php';
include '../../config/cnxn.php';
include '../../model/_seguridad/seguridad.php';
if (filter_input(INPUT_POST, 'd0')) {
    session_start();
    $db = new Seguridad();
    $e = $_SESSION['E'];
    $u = $_SESSION['U'];
    $db->E = $e;
    $db->U = $u;
    $opc = filter_input(INPUT_POST, 'd0');
    switch ($opc) {
        case 'P-D':
            $datos = '';
            $paginacion = '';
            $pag = filter_input(INPUT_POST, 'd1');
            $filtro = filter_input(INPUT_POST, 'd2') ? filter_input(INPUT_POST, 'd2') : '';
            $limit = filter_input(INPUT_POST, 'd4');
            $fecini = filter_input(INPUT_POST, 'd3');
            $fecfin = filter_input(INPUT_POST, 'd5');
            $n_reg = $db->sNRLog($filtro,$fecini,$fecfin);
            $n_pag = ceil($n_reg[0][0]/$limit);
            $p = $pag - 1;
            $ini = $p;

            if ($ini > 0) {
                $ini = $ini * $limit;
            } else {
                $ini = 0;
            }
            $data = $db->sLog($ini,$limit,$filtro,$fecini,$fecfin);

            foreach ($data as $item) {
                $datos .= '<tr>';
                $datos .= '<td>' . $item[0] . '</td>';
                $datos .= '<td>' . $item[1] . '</td>';
                $datos .= '<td>' . $item[2] . '</td>';
                $datos .= '<td>' . $item[3] . '</td>';
                $datos .= '<td>' . $item[4] . '</td>';
                $datos .= '<td>' . $item[5] . '</td>';
                $datos .= '<td>' . $item[6] . '</td>';
                $datos .= '</tr>';
            }
            $paginacion .= '<li><a href="#!" onclick="' . ($pag == 1 ? '' : 'paglogAcc(1)') . ';"><i class="material-icons tiny"  >arrow_back</i></a></li>';
            $paginacion .= '<li class="' . ($pag == 1 ? 'disabled "><a href="#!"><i class="material-icons">chevron_left</i></a></li>' : 'waves-effect <a href="#!" onclick="paglogAcc(' . ($pag == 1 ? 1 : $pag - 1) . ')"><i class="material-icons">chevron_left</i></a></li>') . '';
            for ($i = $pag; $i <= $n_pag; $i++) {
                if ($i >= $pag + 4) {
                    $paginacion .= '<li class="' . ($pag == $i ? 'active' : 'waves-effect') . '"><a href="#!" onclick="paglogAcc(' . ($i) . ')">' . ($i) . '</a></li>';
                    break;
                } else {
                    $paginacion .= '<li class="' . ($pag == $i ? 'active' : 'waves-effect') . '"><a href="#!" onclick="paglogAcc(' . ($i) . ')">' . ($i) . '</a></li>';
                }
            }
            $paginacion .= '<li class="' . ($pag == $n_pag ? 'disabled "><a href="#!"><i class="material-icons">chevron_right</i></a></li>' : 'waves-effect <a href="#!" onclick="paglogAcc(' . ($pag >= $n_pag ? $n_pag : $pag + 1) . ')"> <i class="material-icons">chevron_right</i></a></li> ') . '';
            $paginacion .= '<li><a href="#!" onclick="' . ($pag == $n_pag ? '' : 'paglogAcc(' . $n_pag . ')') . ';"><i class="material-icons ">arrow_forward</i></a></li>';
            $r = [true, $datos, $paginacion];
            break;

            case 'PH-C':
                $datos = '';
                $paginacion = '';
                $pag = filter_input(INPUT_POST, 'd1');
                $filtro = filter_input(INPUT_POST, 'd2') ? filter_input(INPUT_POST, 'd2') : '';
                $limit = filter_input(INPUT_POST, 'd4');
                $fecini = filter_input(INPUT_POST, 'd3');
                $fecfin = filter_input(INPUT_POST, 'd5');
                $filtro2 = filter_input(INPUT_POST, 'd6');
                $filtro3 = filter_input(INPUT_POST, 'd7');

                $n_reg = $db->sNRLogCli($filtro,$fecini,$fecfin,$filtro2,$filtro3);
                $n_pag = ceil($n_reg[0][0]/$limit);
                $p = $pag - 1;
                $ini = $p;
    
                if ($ini > 0) {
                    $ini = $ini * $limit;
                } else {
                    $ini = 0;
                }
                $data = $db->sLogUsu($ini, $limit, $filtro,$fecini,$fecfin,$filtro2,$filtro3);
    
                foreach ($data as $item) {
                    $datos .= '<tr>';
                    $datos .= '<td>' . $item[0] . '</td>';
                    $datos .= '<td>' . $item[1] . '</td>';
                    $datos .= '<td>' . $item[2] . '</td>';
                    $datos .= '<td>' . $item[3] . '</td>';
                    $datos .= '<td>' . $item[4] . '</td>';
                    $datos .= '</tr>';
                }
                $paginacion .= '<li><a href="#!" onclick="' . ($pag == 1 ? '' : 'pagHisCli(1)') . ';"><i class="material-icons tiny"  >arrow_back</i></a></li>';
                $paginacion .= '<li class="' . ($pag == 1 ? 'disabled "><a href="#!"><i class="material-icons">chevron_left</i></a></li>' : 'waves-effect <a href="#!" onclick="pagHisCli(' . ($pag == 1 ? 1 : $pag - 1) . ')"><i class="material-icons">chevron_left</i></a></li>') . '';
                for ($i = $pag; $i <= $n_pag; $i++) {
                    if ($i >= $pag + 4) {
                        $paginacion .= '<li class="' . ($pag == $i ? 'active' : 'waves-effect') . '"><a href="#!" onclick="pagHisCli(' . ($i) . ')">' . ($i) . '</a></li>';
                        break;
                    } else {
                        $paginacion .= '<li class="' . ($pag == $i ? 'active' : 'waves-effect') . '"><a href="#!" onclick="pagHisCli(' . ($i) . ')">' . ($i) . '</a></li>';
                    }
                }
                $paginacion .= '<li class="' . ($pag == $n_pag ? 'disabled "><a href="#!"><i class="material-icons">chevron_right</i></a></li>' : 'waves-effect <a href="#!" onclick="pagHisCli(' . ($pag >= $n_pag ? $n_pag : $pag + 1) . ')"> <i class="material-icons">chevron_right</i></a></li> ') . '';
                $paginacion .= '<li><a href="#!" onclick="' . ($pag == $n_pag ? '' : 'pagHisCli(' . $n_pag . ')') . ';"><i class="material-icons ">arrow_forward</i></a></li>';
                $r = [true, $datos, $paginacion];
                break;
        default:
            $r = [false, 'Faltan criterios (default)!'];
            break;
    }
} else {
    $r = [false, 'Faltan criterios necesarios!'];
}
echo json_encode($r);
