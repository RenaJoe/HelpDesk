function cargaInicio(){
    $.ajax({
        data:  {"d1":"IN"},
        url:   urlM,
        dataType: "json",
        type:  'post',
        success: function(r){
            if(r[0]){
                document.getElementById("txt_username_nav").innerHTML = r[1];
                document.getElementById("txt_username_menu").innerHTML = r[1];
            }else{
                console.error(r[1]);
            }
        },
        error: function(xhr){
            alert("Ocurrio un error!");
            console.error(xhr.responseText);
        }
    });
}
document.getElementById("bt_usad").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Usuarios > Administrador"
    grdUsers();
});
document.getElementById("bt_enti").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Usuarios > Entidades"
    grdEntid();
});
document.getElementById("bt_uscl").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Usuarios > Clientes"
    grdClies();
});

document.getElementById("bt_files").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Cargar archivos"
    fmrDocsList();
});

document.getElementById("bt_agend").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Agendamiento"
    viewAgendamiento();
});

document.getElementById("bt_grdage").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Agendado"
    viewGrdAgendamiento();
});

document.getElementById("bt_ccont").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Cambiar contraseña"
    fmrChgPass();
});
document.getElementById("bt_histo").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Historico Carga Listas"
    grdHisto();
});
document.getElementById("bt_logHis").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Historico Carga Listas"
    grdLogRegLis();
});
document.getElementById("bt_nombr").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Registro civil > Nombre"
    grdCivil(); 
});
document.getElementById("bt_logUsu").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "clientes > Consultas"
    grdLogConCli(); 
});
document.getElementById("bt_verif").addEventListener('click',function(){
    document.getElementById("dv_here").innerHTML = "Consultas > Clientes_Cedula"
    fmrRegCiv(); 
});
document.getElementById("bt_salir_nv").addEventListener('click',function(){cerrarSesion();});
document.getElementById("bt_salir").addEventListener('click',function(){cerrarSesion();});
cargaInicio();

