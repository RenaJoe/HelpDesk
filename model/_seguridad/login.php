<?php
/* Creado por: Bryan Alejandro Chamba Freire */
class Login extends Con{

 
    public $E = null;
    public $U = null;
    
    public function sAplIni($e,$u){
        $sql = 'select a.apl_nombre from sec_grupos g, sec_aplicaciones a, sec_usuarios u '.
            'where g.apl_codigo = a.apl_codigo and g.gru_codigo = u.gru_codigo and u.usu_login = \''.$u.'\' and u.emp_codigo = '.$e.';';

        return $this->sel($sql);
    }

    public function uPass($e,$u,$op,$np){
        $sql = 'update sec_usuarios set usu_passw = \''.$np.'\' '.
            'where emp_codigo = '.$e.' and usu_login = \''.$u.'\' and usu_passw = \''.$op.'\';';
        return $this->iud($sql);
    }

    
    public function sVerUsu($u,$p){

        $sql = 'select g.login, g.pswd,g.rol_id,r.rol_tipo from ges_users g, ges_rol r '.
            'where login = \''.$u.'\' and pswd = \''.$p.'\' '.
            'and g.rol_id = r.rol_id ';

            
        return $this->sel($sql);
    }

}