<?php
/* Creado por: Bryan Alejandro Chamba Freire */
class Seguridad extends Con
{

    public $E = null;
    public $U = null;

    public function sNomUser()
    {
        $sql = 'select d.dus_apelli||\' \'||d.dus_nombre from sec_usuarios u, tbl_dat_usuarios d ' .
                'where u.emp_codigo = d.emp_codigo and u.dus_codigo = d.dus_codigo and u.usu_login = \'' . $this->U . '\' and u.emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }

    public function sNRLog($b, $fi, $ff)
    {
        $w = $b == '' ? '' : ' and log_usuari = \'' . $b . '\' ';
        $sql = 'select count(*) from l_log where ' .
            'to_char(log_fecsis, \'YYYY-MM-DD\') between \'' . $fi . '\' and \'' . $ff . '\' ' .
            '' . $w . ' ;';
        return $this->sel($sql);
    }

    public function sLog($i, $f, $b, $fi, $ff)
    {
        $w = $b == '' ? '' : ' and log_usuari = \'' . $b . '\' ';
        $sql = 'select log_codigo , log_appnam , log_accion ,log_descri ,log_auxil1, ' .
            'log_usuari  ,log_fecsis,to_char(log_fecsis, \'YYYY-MM-DD\') ' .
            'from l_log where ' .
            'to_char(log_fecsis, \'YYYY-MM-DD\') between \'' . $fi . '\' and \'' . $ff . '\' ' .
            '' . $w . ' order by log_codigo desc offset ' . $i . ' limit ' . $f . ';';
        return $this->sel($sql);
    }


    public function sGrupos()
    {
        $sql = 'select g.gru_codigo,g.gru_descri,a.apl_nombre from sec_grupos g,sec_aplicaciones a ' .
            'where g.apl_codigo = a.apl_codigo order by g.gru_codigo;';
        return $this->sel($sql);
    }

    public function sGrupo($c)
    {
        $sql = 'select gru_descri,apl_codigo from sec_grupos ' .
            'where gru_codigo = ' . $c . ' ';
        return $this->sel($sql);
    }

    private function sCodGrupo()
    {
        $sql = 'select count(*)+1 from sec_grupos;';
        $cod = $this->sel($sql);
        return $cod[0][0];
    }

    public function iGrupo($no, $ap)
    {
        $cod = $this->sCodGrupo();
        $sql = 'insert into sec_grupos values(' . $cod . ',\'' . $no . '\',' . $ap . ',\'' . $this->U . '\',\'' . Date('Y-m-d') . '\');';
        return $this->iud($sql);
    }

    public function uGrupo($cod, $no, $ap)
    {
        $sql = 'update sec_grupos set ' .
            'gru_descri = \'' . $no . '\',apl_codigo = ' . $ap . ',gru_usuari = \'' . $this->U . '\',gru_fecsis = \'' . Date('Y-m-d') . '\' ' .
            'where gru_codigo = ' . $cod . ';';
        return $this->iud($sql);
    }

    public function getEntidades()
    {
        $sql = 'select cec_codigo,cec_descri ,cec_estado '
            .'from tbl_cab_empresas_clientes where emp_codigo = ' . $this->E . '  '
            .' order by cec_descri;';

        return $this->sel($sql);
    }
    //++++++++++++++//
    public function sNREntid($b)
    {
        $sql = 'select count(cec_codigo)' .
            'from tbl_cab_empresas_clientes where emp_codigo = ' . $this->E . '  ' .
            'and (cec_descri ilike \'%' . $b . '%\');';
        return $this->sel($sql);
    }
    /**/
    public function sEntids($i = 0, $f = 15, $b)
    {
        $sql = 'select cec_codigo,cec_descri,cec_estado,'
            . 'coalesce((select string_agg(\'*\'||s.ser_nombre,\'<br/>\') 
            from tbl_det_empresas_clientes e, tbl_servicios s 
            where s.ser_codigo = e.ser_codigo and s.emp_codigo = e.emp_codigo and 
            e.cec_codigo = tbl_cab_empresas_clientes.cec_codigo and 
            e.emp_codigo = tbl_cab_empresas_clientes.emp_codigo),\'\') as servicios '
            . 'from tbl_cab_empresas_clientes where emp_codigo = ' . $this->E . '  '
            . 'and (cec_descri ilike \'%' . $b . '%\') order by cec_descri offset ' . $i . ' limit ' . $f . ';';
        return $this->sel($sql);
    }

    public function sEntid($c)
    {
        $sql = 'select cec_codigo,cec_descri,cec_estado,cec_nrolic from tbl_cab_empresas_clientes ' .
            'where cec_codigo = ' . $c . ' and emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }

    public function sServicios($c)
    {
        $sql = 'select cec_codigo,cec_descri,cec_estado from tbl_cab_empresas_clientes ' .
            'where cec_codigo = ' . $c . ' and emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }
    public function uEntidest($est,$cod){
        $sql = 'update '.
            'sec_usuarios set usu_estado = \''.$est.'\' where cec_codigo = '.$cod.' ' ;
        return $this->iud($sql);
    }
    

    private function sCodEntidad()
    {
        $sql = 'select count(cec_codigo)+1 from tbl_cab_empresas_clientes where emp_codigo = ' . $this->E . ';';
        $cod = $this->sel($sql);
        return $cod[0][0];
    }

    public function iEntidad($no,$nro)
    {
        $cod = $this->sCodEntidad();
        $sql = 'insert into tbl_cab_empresas_clientes values(' .
            $cod . ',\'' . $this->E . '\',\'' . $no . '\',\'A\',\'' . $this->U . '\',\'' . Date('Y-m-d') . '\', '.$nro.');';
        return $this->iud($sql);
    }

    public function uEntid($cod, $no, $es, $nro)
    {
        $sql = 'update tbl_cab_empresas_clientes set ' .
            'cec_descri = \'' . $no . '\',cec_estado = \'' . $es . '\' , cec_nrolic = '.$nro.' ' .
            'where cec_codigo = ' . $cod . ' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    /**/
    public function sNRUsers($b)
    {
        $sql = 'select count(u.dus_codigo) ' .
            'from sec_usuarios u, tbl_dat_usuarios d ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and cec_codigo = 0 ' .
            'and (d.dus_apelli||\' \'||d.dus_nombre) ilike \'%' . $b . '%\' ;';
        return $this->sel($sql);
    }

    public function sUsers($cod)
    {
        $sql = 'select 
            d.tdo_codigo,d.dus_cedruc,d.dus_apelli,d.dus_nombre,d.dus_fecnac,
            d.dus_edad,u.usu_login,u.usu_estado,u.gru_codigo,d.dus_email,
            u.cec_codigo,u.usu_macadd ' .
            'from sec_usuarios u, tbl_dat_usuarios d ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and d.dus_codigo = \'' . $cod . '\' and d.emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }
    //******

    public function sUsersAdms($i = 0, $f = 1, $b)
    {
        $sql = 'select u.dus_codigo,u.usu_login,d.dus_apelli||\' \'||d.dus_nombre,d.dus_cedruc,u.usu_estado ' .
            'from sec_usuarios u, tbl_dat_usuarios d ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and cec_codigo = 0 ' .
            'and (d.dus_apelli||\' \'||d.dus_nombre) ilike \'%' . $b . '%\' ' .
            'order by dus_codigo offset ' . $i . ' limit ' . $f . ';';
        return $this->sel($sql);
    }

    public function sLogUsers()
    {
        $sql = 'select u.usu_login,d.dus_apelli||\' \'||d.dus_nombre ' .
            'from sec_usuarios u, tbl_dat_usuarios d ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and cec_codigo = 0 ;';
        return $this->sel($sql);
    }
    ///***

    public function sUsersAdm()
    {
        $sql = 'select u.dus_codigo,u.usu_login,d.dus_apelli||\' \'||d.dus_nombre,d.dus_cedruc,u.usu_estado ' .
            'from sec_usuarios u, tbl_dat_usuarios d ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and cec_codigo = 0;';
        return $this->sel($sql);
    }

    public function sNRUsersCli($fil = '', $fil2 = '', $fil3 = '')
    {
        $sql = 'select count(u.dus_codigo) ' .
            'from sec_usuarios u, tbl_dat_usuarios d, tbl_cab_empresas_clientes cec ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'u.cec_codigo = cec.cec_codigo and u.emp_codigo = cec.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and u.cec_codigo > 0 ' .
            'and (d.dus_apelli||\' \'||d.dus_nombre) ilike \'%' . $fil . '%\' and cec.cec_descri ilike \'%' . $fil2 . '%\' '.
            ' and u.usu_login ilike \'%' . $fil3 . '%\' ';
      
        return $this->sel($sql);
    }

    public function sUsersCli()
    {
        $sql = 'select u.dus_codigo,u.usu_login,d.dus_apelli||\' \'||d.dus_nombre,' .
            'd.dus_cedruc,u.usu_estado,cec.cec_descri ' .
            'from sec_usuarios u, tbl_dat_usuarios d, tbl_cab_empresas_clientes cec ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'u.cec_codigo = cec.cec_codigo and u.emp_codigo = cec.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and u.cec_codigo > 0;';
        return $this->sel($sql);
    }
    public function sUsersClis($i = 0, $f = 1, $b = '', $b2 = '',$b3 = '')
    {
        $sql = 'select u.dus_codigo,u.usu_login,d.dus_apelli||\' \'||d.dus_nombre,' .
            'd.dus_cedruc,u.usu_estado,cec.cec_descri ' .
            'from sec_usuarios u, tbl_dat_usuarios d, tbl_cab_empresas_clientes cec ' .
            'where u.dus_codigo = d.dus_codigo and ' .
            'u.emp_codigo = d.emp_codigo and ' .
            'u.cec_codigo = cec.cec_codigo and u.emp_codigo = cec.emp_codigo and ' .
            'd.emp_codigo = ' . $this->E . ' and u.cec_codigo > 0 ' .
            'and (d.dus_apelli||\' \'||d.dus_nombre) ilike \'%' . $b . '%\' ' .
            'and cec.cec_descri ilike \'%' . $b2 . '%\' and u.usu_login ilike \'%' . $b3. '%\' ' .
            'order by dus_codigo offset ' . $i . ' limit ' . $f . ';';

        return $this->sel($sql);
    }
    public function NrocliA($cod){
        $sql = 'select count(cec.cec_codigo) ,u.usu_estado,cec.cec_descri, cec.cec_nrolic '.
        'from sec_usuarios u, tbl_cab_empresas_clientes cec where '.
        'u.cec_codigo = cec.cec_codigo and u.emp_codigo = cec.emp_codigo '.
        'and u.cec_codigo = '.$cod.' and u.usu_estado = \'A\' group by cec.cec_codigo,u.usu_estado,cec.cec_descri, cec.cec_nrolic ;';
        return $this->sel($sql);
    }
    public function NrocliI($cod){
        $sql = 'select count(cec.cec_codigo) ,u.usu_estado,cec.cec_descri, cec.cec_nrolic '.
        'from sec_usuarios u, tbl_cab_empresas_clientes cec where '.
        'u.cec_codigo = cec.cec_codigo and u.emp_codigo = cec.emp_codigo '.
        'and u.cec_codigo = '.$cod.' and u.usu_estado = \'I\' group by cec.cec_codigo,u.usu_estado,cec.cec_descri, cec.cec_nrolic ;';
        return $this->sel($sql);
    }

    public function iUsers($lo, $pa, $dus_cod, $gr, $admcli = 0)
    {
        $sql = 'insert into sec_usuarios values(' .
            '\'' . $lo . '\',\'' . $pa . '\',\'A\',\'' . $dus_cod . '\',' . $gr . ',' . $this->E . ',' . $admcli . ',\'' . $this->U . '\',\'' . Date('Y-m-d') . '\');';
        return $this->iud($sql);
    }

    public function uUser($es, $lo, $gr, $en = 0)
    {
        $sql = 'update sec_usuarios set ' .
            'usu_estado = \'' . $es . '\', gru_codigo = ' . $gr . ', cec_codigo = ' . $en . ' ' .
            'where usu_login = \'' . $lo . '\' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    public function dUser($lo)
    {
        $sql = 'delete from sec_usuarios where usu_login = \'' . $lo . '\' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    /**/
    public function sCodDatUsers()
    {
        $sql = 'select coalesce(max(dus_codigo),0)+1 ' .
            'from tbl_dat_usuarios ' .
            'where emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }

    public function iDatUsers($dus_cod, $ti, $cr, $ap, $no, $fn, $ed, $ma, $gen = '')
    {
        $sql = 'insert into tbl_dat_usuarios values(' .
            '\'' . $dus_cod . '\',\'' . $this->E . '\',\'' . $ti . '\',\'' . $cr . '\',\'' . $ap . '\',\'' . $no . '\',\'\',\'' . $fn .
            '\',\'' . $ed . '\',\'' . $ma . '\',\'' . $this->U . '\',\'' . Date('Y-m-d') . '\');';
        return $this->iud($sql);
    }

    public function uDatUser($co, $ap, $no, $fn, $ed, $ma)
    {
        $sql = 'update tbl_dat_usuarios set ' .
            'dus_apelli = \'' . $ap . '\', dus_nombre = \'' . $no . '\', dus_fecnac = \'' . $fn . '\', dus_edad = ' . $ed . ', dus_email = \'' . $ma . '\', dus_usuari = \'' . $this->U . '\', dus_fecsis = \'' . Date('Y-m-d') . '\' ' .
            'where dus_codigo = \'' . $co . '\' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    public function uDatPj($us)
    {
        $sql = 'update sec_usuarios set ' .
            'usu_macadd = null ' .
            'where usu_login = \'' . $us . '\' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    public function dDatUser($dus_cod)
    {
        $sql = 'delete from tbl_dat_usuarios where dus_codigo = \'' . $dus_cod . '\' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    /**/
    public final function sMyServiciosDisp($cec)
    {
        $sql = 'select e.cec_codigo,s.ser_codigo,s.ser_nombre,s.ser_descri,s.ser_icon ' .
            'from tbl_det_empresas_clientes e, tbl_servicios s ' .
            'where s.ser_codigo = e.ser_codigo and ' .
            's.emp_codigo = e.emp_codigo and ' .
            'e.cec_codigo = ' . $cec . ' and ' .
            'e.emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }

    public final function sServiciosDisp()
    {
        $sql = 'select ser_codigo,ser_nombre,ser_descri,ser_icon ' .
            'from tbl_servicios ' .
            'where emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }

    public function dServ($cod, $ser)
    {
        $sql = 'delete from tbl_det_empresas_clientes ' .
            'where cec_codigo = ' . $cod . ' and ser_codigo = ' . $ser . ' and emp_codigo = ' . $this->E . ';';
        return $this->iud($sql);
    }

    private final function sCodDetServ($cec)
    {
        $sql = 'select coalesce(max(dec_codigo),0)+1 ' .
            'from tbl_det_empresas_clientes ' .
            'where emp_codigo = ' . $this->E . ' and cec_codigo = ' . $cec . ';';
        $cod = $this->sel($sql);
        return $cod[0][0];
    }

    public function iServ($cod, $ser, $fec)
    {
        $dod = $this->sCodDetServ($cod);
        $sql = 'insert into tbl_det_empresas_clientes '
            . 'values(' . $dod . ',' . $cod . ',' . $this->E . ',' . $ser . ',\'' . $fec . '\',null,100,\'A\',\'' . $fec . '\',\'' . $this->U . '\');';
        return $this->iud($sql);
    }

    public function sMyServDisp($cec)
    {
        $sql = 'select s.ser_codigo,s.ser_nombre ' .
            'from tbl_det_empresas_clientes e, tbl_servicios s ' .
            'where s.ser_codigo = e.ser_codigo and ' .
            's.emp_codigo = e.emp_codigo and ' .
            'e.cec_codigo = ' . $cec . ' and ' .
            'e.emp_codigo = ' . $this->E . ';';
        return $this->sel($sql);
    }

    //////////////////////////////////////////////////// JEFF ////////////////////////////////////////////////////////

    public function sNroLicUsu($cec)
    {
        $sql = 'select cec_codigo , cec_nrolic,
        (select count(*) as activas from sec_usuarios where cec_codigo = ' . $cec . ' and usu_estado = \'A\' ),
        (select count(*) as inactivas from sec_usuarios where cec_codigo = ' . $cec . ' and usu_estado = \'I\')
        from tbl_cab_empresas_clientes where cec_codigo = ' . $cec . '';
        return $this->sel($sql);
    }

    public function sConCli($cod)
    {
        $sql = 'select usu_login from sec_usuarios where cec_codigo = ' . $cod . ' and usu_estado = \'I\' '; 
        return $this->sel($sql);

    }
    
    public function sNRLogCli($b,$fi,$ff,$fd,$ft)
    {
        $w = $b == '' ? '' : ' and d.cec_codigo = \'' . $b . '\' ';
        $w .= $fd == '' ? '' : ' and d.eco_usuari = \'' . $fd . '\' ';
        $w .= $ft == '' ? '' : ' and  (u.dus_apelli||\' \'||u.dus_nombre) ilike  \'' . $ft . '\' ';

        $sql = 'select count(d.eco_codigo) '.
        'from tbl_det_empresa_consultas d ,tbl_cab_empresas_clientes c, tbl_dat_usuarios u where ' .
        'to_char(d.eco_fecsis, \'YYYY-MM-DD hh:mm\') between \'' . $fi . '\' and \'' . $ff . '\' ' .
        'and d.cec_codigo = c.cec_codigo and d.eco_usuari = u.dus_cedruc  ' . $w . '   ';

        return $this->sel($sql);
    }

    public function sLogUsu($i, $f, $b, $fi, $ff,$fd,$ft)
    {
        $w = $b == '' ? '' : ' and d.cec_codigo = \'' . $b . '\' ';
        $w .= $fd == '' ? '' : ' and d.eco_usuari = \'' . $fd . '\' ';
        $w .= $ft == '' ? '' : ' and  (u.dus_apelli||\' \'||u.dus_nombre) ilike  \'%' . $ft . '%\' ';

        $sql = 'select d.eco_codigo , c.cec_descri  , d.eco_descri ,d.eco_usuari , '.
            'to_char(d.eco_fecsis, \'YYYY-MM-DD hh:mm AM\'), (u.dus_apelli||\' \'||u.dus_nombre) ' .
            'from tbl_det_empresa_consultas d ,tbl_cab_empresas_clientes c, tbl_dat_usuarios u where ' .
            'to_char(d.eco_fecsis, \'YYYY-MM-DD hh:mm\') between \'' . $fi . '\' and \'' . $ff . '\' ' .
            'and d.cec_codigo = c.cec_codigo and d.eco_usuari = u.dus_cedruc  ' . $w . '  order by d.eco_codigo desc offset ' . $i . ' limit ' . $f . ';';

        return $this->sel($sql);
    }

    public function sClixLog()
    {
        $sql = 'select u.usu_login , (d.dus_apelli||\' \'||d.dus_nombre)  from '.
        ' sec_usuarios u ,  tbl_dat_usuarios d where u.dus_codigo = d.dus_codigo order by u.usu_login asc   ';
        return $this->sel($sql);
    }


}