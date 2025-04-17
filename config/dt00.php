<?php
/* Creado por: Bryan Alejandro Chamba Freire */

use Symfony\Component\VarDumper\VarDumper;

class Data{    
    private const FL = '../config/dt00.json';
    public $DT = null;
    public function dt(){
        $d = (file_exists(self::FL)) ? file_get_contents(self::FL) : file_exists('../'.self::FL) ? file_get_contents('../'.self::FL) : file_get_contents(str_replace('../','./',self::FL));
        $dt = json_decode($d,true);
        $this->DT = $dt;
        return $dt;
    }
    public function getPS(){
        return $this->PS;
    }
    public function uploadFile($ruta,$nombre,$files){
        $uploaded = [];
        $onlyName = null;
        foreach($files as $key){
            if ($key['error'] == UPLOAD_ERR_OK) {
                $NombreOriginal = $key['name'];
                $onlyName = explode('.',$NombreOriginal);
                array_pop($onlyName);
                $onlyName = implode('.',$onlyName);
                $Nombre = $nombre != false ? $nombre : $NombreOriginal;
                $temporal = $key['tmp_name'];
                $Destino = $ruta.$Nombre;
                move_uploaded_file($temporal, $Destino);
                chmod($Destino, 0755);
            }
            if($key['error'] == ''){
                if(is_file($Destino)){
                    array_push($uploaded,[true,$NombreOriginal,'@(-> Archivo <b>'.$NombreOriginal.'</b> procesado.',$onlyName]);
                }else{
                    array_push($uploaded,[true,$NombreOriginal,'@(-> Archivo <b>'.$NombreOriginal.'</b> No se pudo subir correctamente.']);
                }
            }else{
                array_push($uploaded,
                    [false,'@(-> No se pudo subir el archivo <b>'.$NombreOriginal.'</b> debido al siguiente Error: '.$key['error']]
                );
            }
        }
        return $uploaded;
    }

    function getInfoExcel($archivo,$columnas,$hoja,$filaInicio,$camposFechas){
        $inputFileType = PHPExcel_IOFactory::identify($archivo);
        $objReader = PHPExcel_IOFactory::createReader($inputFileType);
    
        $objPHPExcel = $objReader->load($archivo);
        $sheet = $objPHPExcel->getSheet($hoja);//hoja
        $highestRow = $sheet->getHighestRow(); 
        $highestColumn = $sheet->getHighestColumn();
    
        $data = [];
        $cont = 0;
        for ($row = $filaInicio; $row <= $highestRow; $row++){
            $campos = array();
            foreach($columnas as $col){
                $txt = trim(str_replace('\'','"',$sheet->getCell($col.$row)->getValue()));
                if($txt != '' && $camposFechas != false){
                    for($i=0;$i<count($camposFechas);$i++){
                        $formato = $camposFechas[$i][0];
                        for ($e=1;$e<count($camposFechas[$i]);$e++){
                            if($col == $camposFechas[$i][$e]){
                                if(is_numeric($txt))
                                    $txt = date($formato, PHPExcel_Shared_Date::ExcelToPHP($txt));
                            }
                        }
                    }
                }
                array_push($campos,$txt);
            }
            array_push($data,$campos);
            ++$cont;
        }
        return $data;

        
    }


    function crearExcelConDatos($rutaArchivo, $encabezados, $datos2) {
        $objPHPExcel = new PHPExcel();
        $sheet = $objPHPExcel->getActiveSheet();
    
        // encabezados
        $col = 'A';
        foreach ($encabezados as $encabezado) {
            $sheet->setCellValue($col . '1', $encabezado);
            $col++;
        }
        // Escribir los datos del array a partir de la siguiente fila
        $fila = 2;
        foreach ($datos2 as $dato) {
            $col = 'B';
                $sheet->setCellValue('A' . $fila, $dato[0]);
                $sheet->setCellValue('B' . $fila, $dato[1]);

                $fila++;
        }
        // Crear el objeto Writer para guardar el archivo Excel
        $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
        // Guardar en la ruta especificada
        $objWriter->save($rutaArchivo);
        // Devolver la ruta donde se guardó el archivo de Excel
        return $rutaArchivo;
    }


    function crearExcelMasivo($rutaArchivo, $encabezados, $datos2) {
        $objPHPExcel = new PHPExcel();
        $sheet = $objPHPExcel->getActiveSheet();
    
        // encabezados
        $col = 'A';
        foreach ($encabezados as $encabezado) {
            $sheet->setCellValue($col . '1', $encabezado);
            $col++;
        }
        // Escribir los datos del array a partir de la siguiente fila
        $fila = 2;
        foreach ($datos2 as $dato) {
            $col = 'B';
                $sheet->setCellValue('A' . $fila, $dato[0]);
                $sheet->setCellValue('B' . $fila, $dato[1]);
                $sheet->setCellValue('c' . $fila, $dato[2]);

                $fila++;
        }
        // Crear el objeto Writer para guardar el archivo Excel
        $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
        // Guardar en la ruta especificada
        $objWriter->save($rutaArchivo);
        // Devolver la ruta donde se guardó el archivo de Excel
        return $rutaArchivo;
    }

    function getInfoXml($archivo){
        $lol = simplexml_load_file($archivo, 'SimpleXMLElement', LIBXML_NOCDATA);
        $array = json_decode(json_encode((array)$lol), TRUE);
        return $array;
    }

    function getInfoTxt($archivo){
        $data = file_get_contents($archivo);
        return $data;
    }

}