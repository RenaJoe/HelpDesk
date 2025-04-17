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
    $filtro2 = filter_input(INPUT_GET, 'd5') ? filter_input(INPUT_GET, 'd5') : '';
    $filtro3 = filter_input(INPUT_GET, 'd6') ? filter_input(INPUT_GET, 'd6') : '';

    $n_reg = $db->sNRLogCli($filtro, $fecini, $fecfin, $filtro2, $filtro3);
    $n_pag = ceil($n_reg[0][0] / $limit);
    $data = $db->sLogUsu(0, $limit, $filtro, $fecini, $fecfin, $filtro2, $filtro3);
    $clie = $db->sClixLog();
    $select = $db->getEntidades();
    $reg = 1;
?>
    <div class="section">
        <div class="row">
        <h3 style="text-align:center; color:midnightblue; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">HISTORIAL CONSULTA DEL CLIENTE</h3>
        </div>
        <div class="">
            <div class="card right-align-container">
    <div class="card-content black-text">
        <div class="row">
            <div class="input-field col s12 m12 l2">
                <label class="active" for="npt_fecini">Desde</label>
                <input class="default-browser" style="height:60px" onchange="busquedaHisCon()" id="npt_fecini" value="<?php echo $fecini ?>" type="date">
            </div>
            <div class="input-field col s12 m12 l2">
                <label class="active" for="npt_fecfin">Hasta</label>
                <input class="default-browser" id="npt_fecfin" onchange="busquedaHisCon()" value="<?php echo $fecfin ?>" type="date" style="height:60px">
            </div>
            <div class="input-field col s12 m12 l4">
                <input list="lis_clien" id="npt_clien" placeholder="Ingrese la cedula" name="npt_clien" value="<?php echo $filtro2 ?>" style="height:60px" type="text" class="validate"></input>
                <label class="active" for="npt_clien">Busqueda por Cédula</label>
                <datalist id="lis_clien">
                    <?php 
                    if ($clie != false) {
                        foreach ($clie as $item) { ?>
                            <option value="<?php echo $item[0] ?>"><?php echo $item[1]?> </option>
                    <?php }
                    }
                    ?>
                </datalist>
            </div>
            <div class="input-field col s12 m12 l4">
                <div>
                    <label for="npt_usuar">Busqueda por Empresa</label>
                    <select class="browser-default" id="npt_usuar" name="npt_usuar">
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
    </div>
</div>
        </div>


        <div class="row">
            <div class="col s12">
                <table class="responsive-table no-padding">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Entidad</th>
                            <th>Descripcion</th>
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
                                    <td>
  <?php
  // Supongamos que $row[2] contiene la cadena que has mostrado
  $cadena = $row[2]; // Aquí colocas la cadena obtenida en $row[2]

  // Usar una expresión regular para encontrar los valores dentro de corchetes
  preg_match_all('/\[(.*?)\]/', $cadena, $matches);

  // Recorrer cada grupo encontrado entre corchetes
  foreach ($matches[1] as $valor) {
      // Limpiar las comillas dobles y los corchetes que queden
      $valor_limpio = str_replace(['"', '[', ']'], '', $valor);
      
      // Separar el valor por comas
      $partes = explode(',', $valor_limpio);

      // Formatear el valor según el número de partes
      if (count($partes) === 3) {
          $valor_formateado = $partes[0] . ': ' . $partes[1] . ' ' . $partes[2];
      } elseif (count($partes) === 2) {
          $valor_formateado = $partes[0] . ': ' . $partes[1];
      } else {
          $valor_formateado = $valor_limpio;
      }

      // Verificar si el valor contiene "SI" o "NO" para aplicar el color de fondo
      $clase_boton = strpos($valor_formateado, 'SI') !== false ? 'boton-rojo' : 'valor-boton';

      // Mostrar el valor formateado en un botón
      echo '<button class="' . $clase_boton . '">'
           . htmlspecialchars($valor_formateado) . 
           '</button>';
  }
  ?>
</td>
<style>
  .valor-boton {
      background-color: white;
      border: 1px solid #ccc;
      display: block;
      margin-bottom: 4px;
      padding: 6px;
      cursor: pointer;
      transition: background-color 0.3s; /* Efecto de transición */
  }
  .valor-boton:hover {
      background-color: #f0f0f0;
  }

  .boton-rojo {
      background-color: red;
      color: white;
      border: 1px solid #ccc;
      display: block;
      margin-bottom: 4px;
      padding: 6px;
      cursor: pointer;
      transition: background-color 0.3s; /* Efecto de transición */
  }
  .boton-rojo:hover {
      background-color: darkred;
  }
</style>

                                    <td><?php echo $row[3]; ?></td>
                                    <td><?php echo $row[4]; ?></td>
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
                        <li class="<?php echo $n_pag == 0 ? 'disabled' : 'waves-effect'; ?>"><a href="#!" onclick="<?php echo $n_pag > 1 ? 'pagHisCli(1)' : ''; ?>"> <i class="material-icons">arrow_back</i></a></li>
                        <li class="disabled"> <a href="#!"><i class="material-icons">chevron_left</i></a></li>
                        <?php
                        for ($i = 1; $i <= $n_pag; $i++) {
                            if ($i >= 7) {
                                break;
                            } ?>
                            <li class="waves-effect <?php echo $i == 1 ? 'active' : ''; ?>"><a href="#!" onclick="pagHisCli(<?php echo ($reg); ?>);return false;"><?php echo ($i); ?></a></li>
                        <?php
                        }
                        ?>
                        <li class="<?php echo $n_pag == 1 || $n_pag == 0 ? 'disabled' : 'waves-effect'; ?>"><a href="#!" onclick="<?php echo $n_pag > 1 ? 'pagHisCli(' . ($reg + 1) . ') ' : ''; ?>"><i class="material-icons">chevron_right</i></a></li>
                        <li class="<?php echo $n_pag == 0 ? 'disabled' : 'waves-effect'; ?>"><a href="#!" onclick="<?php echo $n_pag > 1 ? 'pagHisCli(' . $n_pag . ')' : ''; ?>"><i class="material-icons ">arrow_forward</i></a></li>
                    </ul>
                </div>
                <div class=" col s12 m6">
                    <div class="right">
                        <ul class="pagination">
                            <li class="active blue darken-3"><a href="#!"><span id="pag">1</span>-<?php echo ceil($n_pag); ?></a></li>
                            <li class="active blue darken-2"><a href="#!"><span id="pag">T: </span><?php echo $n_reg[0][0]; ?></a></li>
                            <li class="right">
                                <a href="#!">
                                    <select class="browser-default" id="npt_regis" style="height:33px" onchange="busquedaHisCon()">
                                        <?php
                                        foreach ([10, 30, 70] as $item) {
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

