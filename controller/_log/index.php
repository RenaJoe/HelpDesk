<?php
/* Creado por: Bryan Alejandro Chamba Freire */
include '../../config/dt00.php';
include '../../config/cnxn.php';
include '../../model/_seguridad/seguridad.php';
session_start();
if (isset($_SESSION['U'])) {
    $db = new Seguridad();
    $db->E = $_SESSION['E'];
    $limit = filter_input(INPUT_GET, 'd1') ? filter_input(INPUT_GET, 'd1') : '10';
    $filtro = filter_input(INPUT_GET, 'd2') ? filter_input(INPUT_GET, 'd2') : '';
    $fecini = filter_input(INPUT_GET, 'd3') ? filter_input(INPUT_GET, 'd3') : date('Y-m-d');
    $fecfin = filter_input(INPUT_GET, 'd4') ? filter_input(INPUT_GET, 'd4') : date('Y-m-d', strtotime(Date('Y-m-d') . "+ 1 year"));
    $n_reg = $db->sNRLog($filtro,$fecini,$fecfin);
    $n_pag = ceil($n_reg[0][0] / $limit);
    $data = $db->sLog(0, $limit, $filtro,$fecini,$fecfin);
    $select = $db->sLogUsers();
    $reg = 1;
?>
    <div class="section">
        <div class="row">
            <h3>Log</h3>
        </div>
        <div class="row">
            <div class="input-field col s12 m3 l3">
                <label class="active" for="npt_fecini">Desde</label>
                <input class="default-browser" onchange="busquedaLog();return false;" style="height:60px" id="npt_fecini" value="<?php echo $fecini ?>" type="date">
            </div>
            <div class="input-field col s12 m3 l3">
                <label class="active" for="npt_fecfin">Hasta</label>
                <input class="default-browser" id="npt_fecfin" value="<?php echo $fecfin ?>" type="date" style="height:60px">
            </div>
            <div class="input-field col s12 m3 l4">
                <div>
                    <label for="npt_usuar">Busqueda por usuario</label>
                    <select class="browser-default" id="npt_usuar" name="npt_usuar" >
                        <option value="" selected>Todos</option>
                        <?php
                        if ($select != false) {
                            foreach ($select as $item) { ?>
                                <option value="<?php echo $item[0] ?>" <?php echo $item[0] == $filtro ? 'selected' : ''; ?>><?php echo $item[1] ?></option>
                        <?php }
                        }
                        ?>
                    </select>
                </div>
            </div>
           
        </div>
        <div class="row">
            <div class="col s12">
                <table class="responsive-table no-padding">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Aplicacion</th>
                            <th>Accion</th>
                            <th>Descripcion</th>
                            <th>Cedula</th>
                            <th>Usuario</th>
                            <th>Fecha</th>

                        </tr>
                    </thead>
                    <tbody id="tbd_res">
                        <?php
                        if ($data != false) {
                            foreach ($data as $row) { ?>
                                <tr>
                                    <td><?php echo $row[0]; ?></td>
                                    <td><?php echo $row[1]; ?></td>
                                    <td><?php echo $row[2]; ?></td>
                                    <td><?php echo $row[3]; ?></td>
                                    <td><?php echo $row[4]; ?></td>
                                    <td><?php echo $row[5]; ?></td>
                                    <td><?php echo $row[6]; ?></td>
                                </tr>
                            <?php }
                        } else {
                            ?><tr>
                                <td colspan="4">NO-DATA</td><?php
                                                        }
                                                            ?>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <ul class="pagination" id="ul_pag">
                        <li class="<?php echo $n_pag == 0 ? 'disabled' : 'waves-effect';?>"><a href="#!" onclick="<?php echo $n_pag > 1 ? 'paglogAcc(1)' : '' ;?>"> <i class="material-icons">arrow_back</i></a></li>
                        <li class="disabled"> <a href="#!"><i class="material-icons">chevron_left</i></a></li>
                        <?php
                        for ($i = 1; $i <= $n_pag; $i++) {
                            if ($i >= 7) {
                                break;
                            } ?>
                            <li class="waves-effect <?php echo $i == 1 ? 'active' : ''; ?>"><a href="#!" onclick="paglogAcc(<?php echo ($reg); ?>);return false;"><?php echo ($i); ?></a></li>
                        <?php
                        }
                        ?>
                        <li class="<?php echo $n_pag == 1 || $n_pag == 0 ? 'disabled' : 'waves-effect'; ?>"><a href="#!" onclick="<?php echo $n_pag > 1 ? 'paglogAcc(' . ($reg + 1) . ') ' : ''; ?>"><i class="material-icons">chevron_right</i></a></li>
                        <li class="<?php echo $n_pag == 0 ? 'disabled' : 'waves-effect';?>"><a href="#!" onclick="<?php echo $n_pag > 1 ? 'paglogAcc('.$n_pag.')' : '';?>"><i class="material-icons ">arrow_forward</i></a></li>
                    </ul>
                </div>
                <div class=" col s12 m6">
                    <div class="right">
                        <ul class="pagination">
                            <li class="active blue darken-3"><a href="#!"><span id="pag">1</span>-<?php echo ceil($n_pag); ?></a></li>
                            <li class="active blue darken-2"><a href="#!"><span id="pag">T: </span><?php echo $n_reg[0][0]; ?></a></li>
                            <li class="right">
                                <a href="#!">
                                    <select class="browser-default" id="npt_regis" style="height:33px" onchange="busquedaLog()">
                                        <?php
                                        foreach ([10, 20, 30] as $item) {
                                            echo  '<option value="' . $item . '" ' . ($item == $limit ? 'selected' : '') . ' >' . $item . '</option>';
                                        }
                                        ?>
                                    </select>
                                </a>

                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
<?php
} else {
?>
    <h3 class="red-text">Usario no autorizado!</h2>
    <?php
}
