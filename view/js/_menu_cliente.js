function cargaInicio() {
    $.ajax({
        data: { "d1": "IN" },
        url: urlM,
        dataType: "json",
        type: 'post',
        success: function(r) {
            if (r[0]) {
                document.getElementById("txt_username_nav").innerHTML = r[1];
                document.getElementById("txt_username_menu").innerHTML = r[1];
            } else {
                console.error(r[1]);
            }
        },
        error: function(xhr) {
            alert("Ocurrio un error!");
            console.error(xhr.responseText);
        }
    });
}
// if (document.getElementById("serv1") != null) {
//     document.getElementById("serv1").addEventListener('click', function() {
//         document.getElementById("dv_here").innerHTML = "Consulta listas"
//         listasConsulta();
//     });
// }

// if (document.getElementById("serv2") != null) {
//     document.getElementById("serv2").addEventListener('click', function() {
//         document.getElementById("dv_here").innerHTML = "Contactabilidad"
//         contactabilidad();
//     });
// }

// if (document.getElementById("serv3") != null) {
//     document.getElementById("serv3").addEventListener('click', function() {
//         document.getElementById("dv_here").innerHTML = "Providencias Judiciales"
//         providenciasJudiciales();
//     });
// }
// ////// consulta masiva //// 
// document.getElementById("bt_masiva").addEventListener('click',function(){
//     document.getElementById("dv_here").innerHTML = "Consulta Masiva"
//     ConsultaMasiva();
// });

// document.getElementById("parai").addEventListener('click',function(){
//     document.getElementById("dv_here").innerHTML = "Paraísos fiscales"
//     paraisos();
// });

// document.getElementById("bt_ccont").addEventListener('click', function() {
//     document.getElementById("dv_here").innerHTML = "Cambiar contraseña"
//     fmrChgPass();
// });
document.getElementById("bt_salir_nv").addEventListener('click', function() { cerrarSesion(); });
// document.getElementById("bt_salir").addEventListener('click', function() { cerrarSesion(); });
cargaInicio();