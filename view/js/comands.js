function path(p,t=1){
    switch(t){
        case 1:
            return "controller/"+p+".php";
        break;
        case 2:
            return "components/"+p+".php";
        break;
        case 3:
            return "view/"+p+".html";
        break;
    }
}
function jx_param_dvflot(url,param,res){
    $.ajax({
        data:  param,
        url:   url,
        type:  'post',
        beforeSend: function(){
            $("#"+res[0]).css({display:'block'});
            $("#"+res[1]).html("Procesando, espere por favor...");
        },
        success: function(r){
            $("#"+res[1]).html(r);
        },
        error: function(xhr){
            $("#"+res[1]).html("Ocurrio un error grave!");
            console.error(xhr.responseText);
        }
    });
    setTimeout(function(){$("#"+res[0]).css({display:'none'});
    $("#"+res[1]).html("");},4000);
}
function jx_param_text(url,param,res){
    $.ajax({
        data:  param,
        url:   url,
        type:  'post',
        beforeSend: function(){
            $("#"+res).html("Procesando, espere por favor...");
        },
        success: function(r){
            $("#"+res).html(r);
        },
        error: function(xhr){
            $("#"+res).html("Ocurrio un error grave!");
            console.error(xhr.responseText);
        }
    });
}
function jx_param_dvflot_json(url,param,res){
    $.ajax({
        data:  param,
        url:   url,
        dataType: "json",
        type:  'post',
        beforeSend: function(){
            $("#"+res[0]).css({display:'block'});
            $("#"+res[1]).html("Procesando, espere por favor...");
        },
        success: function(r){
            if(r[0]){
                $("#"+res[1]).html(r[1]);
            }else{
                $("#"+res[1]).html(r[1]);
            }
        },
        error: function(xhr){
            $("#"+res[1]).html("Ocurrio un error grave!");
            console.log(xhr.responseText);
        }
    });
}
function jx_param_text_json(url,param,res){
    $.ajax({
        data:  param,
        url:   url,
        dataType: "json",
        type:  'post',
        beforeSend: function(){
            $("#"+res).html("Procesando, espere por favor...");
        },
        success: function(r){
            if(r[0]){
                $("#"+res).html(r[1]);
            }else{
                $("#"+res).html(r[1]);
            }
        },
        error: function(xhr){
            $("#"+res).html("Ocurrio un error grave!");
            console.log(xhr.responseText);
        }
    });
}
function jx_text(url,res){
    $.ajax({
        url:   url,
        type:  'post',
        beforeSend: function(){
            $("#"+res).html("Procesando, espere por favor...");
        },
        success: function(r){
            $("#"+res).html(r);
        },
        error: function(xhr){
            $("#"+res).html("Ocurrio un error grave!");
            console.error(xhr.responseText);
        }
    });
}
function addEventMenu(id1, eve, id2, tx) {
    document.getElementById(id1).addEventListener(eve, function(){
        document.getElementById(id2).innerHTML = tx;
    });
}