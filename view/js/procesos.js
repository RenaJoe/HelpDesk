/* Creado por: Bryan Alejandro Chamba Freire */
//require comands.js
var cfn = function(){
    function loadConf(){
        document.getElementById("ipt_psd_door").focus();
        document.getElementById("btn-conf").addEventListener('click', function (){
            $("#configuraciones").css({display:'block'});
            $("#door1").css({display:'none'});
            jx_param_text(
                path("configuracionesAll",2),
                {
                    "d1":$("#ipt_psd_door").val()
                },
                "configuraciones"
            );
        });
        document.getElementById("btn-canc").addEventListener('click', function (){
            document.getElementById("data").innerHTML = "";
        });
    }
    function err(){
        $("#configuraciones").css({display:'none'});
        $("#configuraciones").html("");
        $("#door1").css({display:'block'});
    }
    function uploFirEle(){
        var f = document.getElementById("p12");
        var p = document.getElementById("password").value;
        var maxS = 20000;
        var fs = f.files;
        var dir = path("cargaArcP12"); 
        if(fs.length === 0){
            alert("Seleccione un archivo!");
            return false;
        }
        var f = new FormData();
        var tmp_name = fs[0].name.split(".");
        var tp_len = tmp_name.length;
        var ext = tmp_name[tp_len-1];
        var sizef = fs[0].size;
        if(ext !== "p12"){
            alert("Seleccione el archivo con una extencion valida (p12)");
            return false;
        }
        if(sizef > maxS){
            alert("Tamo maximo del archivo "+(maxS/1000)+"KB\nTamaño del archivo "+(sizef/1000)+"KB");
            return false;
        }
        f.append('f',fs[0]);
        f.append('d2',p);
        if(fs.length === 0 || p.length === 0){
            alert("Ingrese todos los campos!");
        }else{
            $.ajax({
                data:  f,
                url:   dir,
                contentType: false,
                processData: false,
                cache: false,
                dataType: "json",
                type:  'post',
                beforeSend: function(){
                    $("#alerta").css({display:"block"});
                },
                success: function(response) {
                    if(response[0] === "Carga exitosa"){
                        $("#text-mensaje").html(response[0] + " - " + response[1]);
                    }else{
                        $("#text-mensaje").html(response[0]);
                        console.log(response[0]);
                    }
                },
                error: function(xhr){
                    $("#text-mensaje").html("Ocurrio un error grave!");
                    console.log(xhr.responseText);
                }
            });
            setTimeout(function(){$("#alerta").css({display:"none"});},4000);
        }
    }
    function updConf(str){
        var p;
        var ids = str.split("|");
        switch (ids[0]){
            case "paths":
                p = [
                    str,
                    $("#"+ids[1]).val(),
                    $("#"+ids[2]).val(),
                    $("#"+ids[3]).val(),
                    $("#"+ids[4]).val(),
                    $("#"+ids[5]).val()
                ];
            break;
            case "email":
                p = [
                    str,
                    ""+$('input[name="'+ids[1]+'"]:checked').val(),
                    ""+$('input[name="'+ids[2]+'"]:checked').val(),
                    ""+$('input[name="'+ids[3]+'"]:checked').val(),
                    ""+$('input[name="'+ids[4]+'"]:checked').val(),
                    ""+$('input[name="'+ids[5]+'"]:checked').val(),
                    ""+$('input[name="'+ids[6]+'"]:checked').val(),
                ];
            break;
            case "correo":
                p = [
                    str,
                    $("#"+ids[1]).val(),
                    $("#"+ids[2]).val(),
                ];
            break;
            case "conexion":
                p = [
                    str,
                    $("#"+ids[1]).val(),
                    $("#"+ids[2]).val(),
                    $("#"+ids[3]).val(),
                    $("#"+ids[4]).val(),
                    $("#"+ids[5]).val()
                ];
            break;
            case "firma":
                uploFirEle();
                return false;
            break;
            case "smtp":
                p = [
                    str,
                    $("#"+ids[1]).val(),
                    $("#"+ids[2]).val(),
                ];
            break;
            default:
                alert("No se a encontrado la configuraciones deseadas!");
                return false;
            break;
        }
        jx_param_dvflot(
            path("updConfiguracionesAll"),
            {'array': JSON.stringify(p)},
            ['alerta','text-mensaje']
        );
    }
    return{
        CfnFn00:loadConf,
        CfnFn01:err,
        CfnFn02:uploFirEle,
        CfnFn03:updConf
    };
}();
var proc = function(){
    function uploFileXml(){
        var f = document.getElementById("archivos");
        var fs = f.files;
        var f = new FormData();
        for(var i=0;i<fs.length;i++){
            var tmp_name = fs[i].name.split(".");
            var tp_len = tmp_name.length;
            var ext = tmp_name[tp_len-1];
            if(ext !== "xml"){
                alert("Seleccione los archivos con una extencion valida (xml)");
                return false;
            }
            f.append('f'+i,fs[i]);
        }
        if(fs.length === 0){
            alert("Seleccione por lo menos un archivo!");
        }else{
            f.append('d1',$("#d7").val());
            $.ajax({
                data:  f,
                url:   './funciones/cargaInfoXml.php',
                contentType: false,
                processData: false,
                cache: false,
                type:  'post',
                beforeSend: function(){
                    $("#res_carga").html("<img src=\"./img/procesando.gif\" width=\"20\" height=\"20\" />Subiendo!");
                },
                success: function(response) {
                    $("#res_carga").html(response);
                },
                error: function(xhr){
                    $("#res_carga").html(xhr.responseText);
                }
            });
        }
    }
    function uploFileXmlStru(){
        document.getElementById("contectResponse").className = "cargXML";
        document.getElementById("data").innerHTML = "";
        var f = document.createElement("form");
        f.setAttribute('method',"post");
        f.setAttribute('enctype',"multipart/form-data");
        f.setAttribute('action',"funciones/cargaInfoXml.php");
        var h = document.createElement("h3"); //h3
        var h_texto = document.createTextNode("Cargar multiples archivos"); 
        h.appendChild(h_texto);
        var d = document.createElement("div"); //div 1
        var i = document.createElement("input"); //input element, text
        i.setAttribute('type',"file");
        i.setAttribute('name',"archivo[]");
        i.setAttribute('id',"archivos");
        i.setAttribute('multiple',"");
        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"button");
        s.setAttribute('value',"Cargar");
        s.setAttribute('onclick',"proc.PrcFn00();");
        d.appendChild(i);
        f.appendChild(h);
        f.appendChild(d);
        f.appendChild(s);
        var r = document.createElement("div");
        r.setAttribute('id',"res_carga");
        document.getElementById("data").appendChild(f);
        document.getElementById("data").appendChild(r);
    }
    return{
        PrcFn00:uploFileXml,
        PrcFn01:uploFileXmlStru
    };
}();
window.onload = () => {
    addEventMenu("opc01_std", "mouseover", "sp_aux", "Estados");
    addEventMenu("opc01_std", "mouseout", "sp_aux", "");
    addEventMenu("opc02_car", "mouseover", "sp_aux", "Subir");
    addEventMenu("opc02_car", "mouseout", "sp_aux", "");
    addEventMenu("opc00_cfn", "mouseover", "sp_aux", "Configuraciones");
    addEventMenu("opc00_cfn", "mouseout", "sp_aux", "");
    document.getElementById("opc02_car").addEventListener("click", function(){
        proc.PrcFn01();
    });
    document.getElementById("opc00_cfn").addEventListener("click", function(){
        jx_text(path("configuracionesAll",3),"data");
        let ctrl1 = 1;
        var intv001 = setInterval(() => {
            if(document.getElementById("door1")){
                cfn.CfnFn00();
                clearInterval(intv001);
            }else if(ctrl1 >= 40){
                clearInterval(intv001);
                alert("Tiempo de espera superado!");
            }
            ctrl1++;
        }, 200);
    });
};