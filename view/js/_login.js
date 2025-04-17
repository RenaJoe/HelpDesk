function vacio(input,span){
    if(document.getElementById(input).value === ""){
        document.getElementById(span).innerHTML = "Campo obligatorio!";
        setTimeout(() => {
            document.getElementById(span).innerHTML = "";
        }, 3500);
    }
}
function ingresar(e){
    e.preventDefault();
    var u = document.getElementById("user");
    var p = document.getElementById("pass");
    if(u.value !== "" && p.value !== ""){
        $.ajax({
            data:  {"d1":u.value,"d2":p.value},
            url:   url,
            dataType: "json",
            type:  'post',
            success: function(r){
                if(r[0]){
                    window.location.href = r[1];
                }else{
                    $("#alerta").css({display:'block'});
                    $("#alerta").html(r[1]);
                    u.value = "";
                    p.value = "";
                    u.focus();
                    setTimeout(() => {
                        $("#alerta").css({display:'none'});
                    }, 3000);
                }
            },
            error: function(xhr){
                $("#alerta").css({display:'block'});
                $("#alerta").html("Ocurrio un error!");
                console.error(xhr.responseText);
            }
        });
    }else{
        vacio("user","u_lrt");
        vacio("pass","p_lrt");
    }
}
window.onload = function(){
    document.getElementById("form").addEventListener('submit',function(e){return ingresar(e);});
    document.getElementById("user").focus();
    document.getElementById("user").addEventListener("blur", function(){vacio("user","u_lrt");});
    document.getElementById("pass").addEventListener("blur", function(){vacio("pass","p_lrt");});
};