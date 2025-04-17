function dBlock(id) {
    if (document.getElementById(id) == null) return;
    document.getElementById(id).style.display = "block";
}
function dNone(id) {
    setTimeout(() => {
        if (document.getElementById(id) == null) return;
        document.getElementById(id).style.display = "none";
    }, 150);
}

function uplFlList(e) {
    e.preventDefault();
    let l = document.getElementById('nptLista');
    let fl = document.getElementById("archivo");
    let fs = fl.files;
    let f = new FormData();
    let extval = ['xlsx', 'xml', 'txt'];
    for (var i = 0; i < fs.length; i++) {
        var tmp_name = fs[i].name.split(".");
        var tp_len = tmp_name.length;
        var ext = tmp_name[tp_len - 1];
        let ctrl1 = true;
        for (let i = 0; i < extval.length; i++) {
            if (ext !== extval[i]) {
                ctrl1 = false;
            } else {
                ctrl1 = true;
                break;
            };
        }
        if (!ctrl1) {
            alert("Seleccione los archivos con una extencion valida (xlsx,xml)");
            return false;
        }
        f.append('f' + i, fs[i]);
    }
    if (l.value === "") {
        M.toast({ html: '¡Seleccione lista!', classes: 'red' });
    } else if (fs.length === 0) {
        M.toast({ html: '¡Seleccione por lo menos un archivo!', classes: 'red' });
    } else {
        f.append('d0', l.value);
        $.ajax({
            data: f,
            url: urlS('listas'),
            contentType: false,
            processData: false,
            cache: false,
            type: 'post',
            dataType: 'json',
            beforeSend: function () {
                M.toast({ html: '¡Procesando...!' });
                document.getElementById('btnUpdFile').disabled = true;
                document.getElementById('resData').innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], classes: 'green' });
                    document.getElementById('resData').innerHTML =
                        '<ul class="collection"><li class="collection-item green">' + r[1] + '</li></ul>';
                } else {
                    M.toast({ html: r[1], classes: 'red' });
                    document.getElementById('resData').innerHTML =
                        '<ul class="collection"><li class="collection-item red">' + r[1] + '</li></ul>';
                }
                document.getElementById('archivo').value = '';
                document.getElementById('btnUpdFile').disabled = false;
            },
            error: function (xhr) {
                document.getElementById('btnUpdFile').disabled = false;
                document.getElementById('resData').innerHTML = '';
                M.toast({ html: '¡Ocurrio un error!', classes: 'red' });
                console.error(xhr.responseText);
            }
        });
    }
}
function fmrDocsList() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("listas", false));
    let inter = setInterval(() => {
        if (document.getElementById('fmrUpdFile') !== null) {
            $('select').formSelect();
            document.getElementById('fmrUpdFile').addEventListener('submit', (e) => uplFlList(e));
            clearInterval(inter);
        }
    }, 300);
}
function uplFlExcelt(e) {
    
    e.preventDefault();
    let fl = document.getElementById("excel");
    let fs = fl.files;
    let f = new FormData();
    let extval = ['xlsx'];
    for (var i = 0; i < fs.length; i++) {
        var tmp_name = fs[i].name.split(".");
        var tp_len = tmp_name.length;
        var ext = tmp_name[tp_len - 1];
        let ctrl1 = true;
        for (let i = 0; i < extval.length; i++) {
            if (ext !== extval[i]) {
                ctrl1 = false;
            } else {
                ctrl1 = true;
                break;
            };
        }
        if (!ctrl1) {
            alert("Seleccione los archivos con una extencion valida (xlsx,xml)");
            return false;
        }
        f.append('f' + i, fs[i]);
    }
    if (fs.length === 0) {
        M.toast({ html: '¡Seleccione por lo menos un archivo!', classes: 'red' });
    } else {
        f.append('d0', 'C-R');
        $.ajax({
            data: f,
            url: urlS('registro_civil'),
            contentType: false,
            processData: false,
            cache: false,
            type: 'post',
            dataType: 'json',
            beforeSend: function () {
                M.toast({ html: '¡Procesando...!' });
                document.getElementById('btnUpdFile').disabled = true;
                document.getElementById('resData').innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], classes: 'green' });
                    document.getElementById('resData').innerHTML =`<ul class="collection"><li class="collection-item green">${r[1]}</li></ul>
                    <ul class="collection"><li class="collection-item blue">Encontrados: ${r[4]} <br>Sin exito:  ${r[5]}</li></ul>
                        <div class="col s12">
                            <div class="center">
                                <a href="excel.php?F=${r[3]}" target="_blank" download class="waves-effect waves-light btn teal darken-4">
                                <i class="material-icons right">download</i>Descargar resultados</a>
                            </div>
                        </div>`;
                } else {
                    M.toast({ html: r[1], classes: 'red' });
                    document.getElementById('resData').innerHTML =
                        '<ul class="collection"><li class="collection-item red">' + r[1] + '</li></ul>';
                }
                document.getElementById('excel').value = '';
                document.getElementById('btnUpdFile').disabled = false;
            },
            error: function (xhr) {
                document.getElementById('btnUpdFile').disabled = false;
                document.getElementById('resData').innerHTML = '';
                M.toast({ html: '¡Ocurrio un error!', classes: 'red' });
                console.error(xhr.responseText);
            }
        });
    }
}

function fmrRegCiv() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("registro_civil", "c_masiva"));
    let inter = setInterval(() => {
        if (document.getElementById('fmrUpdExcel') !== null) {
            document.getElementById('fmrUpdExcel').addEventListener('submit', (e) => uplFlExcelt(e));
            clearInterval(inter);
        }
    }, 300);
}
function srchCliCli() {
    let content = document.getElementById("autoC");
    var e = document.getElementById("cliente");
    let l = e.value.length;
    if (l > 1) {
        $.ajax({
            data: { "d0": "S-CL", "d1": e.value.toUpperCase(), "d2": "D", "d3": "l" },
            url: urlS("facturas"),
            dataType: "json",
            type: 'post',
            success: function (r) {
                let tt = "";
                r[1].forEach(item => {
                    tt += '<li onclick="selCliCli(this,\'cliente\',[\'cod_cli\',\'' + item[2] + '\']);">' + item[0] + ' ' + item[1] + '</li>';
                });
                content.innerHTML = tt;
                content.style.display = "block";
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    } else {
        content.style.display = "none";
    }
}
function validarCC(id = "d1_cl") {
    var e = document.getElementById(id);
    var tp = e.value.length;
    if (tp == 10) {
        var t = valCI(e.value);
        if (!t) {
            M.toast({ html: 'Cedula incorrecta!', displayLength: 2500, classes: "red lighten-1" });
            e.focus();
            return false;
        }
    }
    if (tp < 10 || tp == 11 || tp == 12 || tp == 14) {
        M.toast({ html: 'Documento no valido!', displayLength: 2500, classes: "red lighten-1" });
        e.focus();
        return false;
    }
}

function grdUsers() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("usuarios", false));
}

function grdClies() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("clientes", false));
}
////////////************//
function grdHisto() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("listas", "historico"));
}
function grdCivil() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("registro_civil", false));
}
function grdLogRegLis() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("log", false));
}
function grdLogConCli() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("log", "clientes"));
}


///////////////////*** */

function frmNewClient() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("clientes", "nuevo"));
    var intv = setInterval(function () {
        if (document.getElementById("frm_Clie") !== null) {
            $(document).ready(function () {
                $('#d5').datepicker({
                    format: 'yyyy-mm-dd',
                    autoClose: true,
                    i18n: {
                        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        weekdays: ['Domingo', 'Lunes', 'Martes', , 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
                    },
                    onClose: function () {
                        var edad = document.getElementById("d6");
                        edad.value = calAge(document.getElementById("d5").value, document.getElementById("fecact").value);
                    },
                    minDate: new Date(1935, 1, 1),
                    maxDate: new Date(2019, 1, 1)
                });
            });
            $('select').formSelect();
            document.getElementById("d2").addEventListener('keyup', function (event) {
                validarCI();
            });
            document.getElementById("d2").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
                validarCI(true);
            });
            document.getElementById("d3").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
                mayus(e);
            });
            document.getElementById("d4").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
                mayus(e);
            });
            document.getElementById("d5").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
                if (e.value != "") {
                    var edad = document.getElementById("d6");
                    edad.value = calAge(e.value, document.getElementById("fecact").value);
                }
            });
            document.getElementById("d6").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
                var fn = document.getElementById("d5");
                if (fn.value != "") {
                    var edad = document.getElementById("d6");
                    edad.value = calAge(fn.value, document.getElementById("fecact").value);
                }
            });
            document.getElementById("d7").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("frm_Clie").addEventListener('submit', function (event) {
                event.preventDefault();
                svClie();
            });
            clearInterval(intv);
        }
    }, 300);
}
function svClie() {
    var ti = document.getElementById("d1");
    var cr = document.getElementById("d2");
    var ap = document.getElementById("d3");
    var no = document.getElementById("d4");
    var fn = document.getElementById("d5");
    var ed = document.getElementById("d6");
    var ma = document.getElementById("d7");
    var lo = document.getElementById("d8");
    var pa = document.getElementById("d9");
    var gr = document.getElementById("d10");
    var gn = document.getElementById("d11");
    var en = document.getElementById("d12");
    if (!valFormatoFecha(fn.value)) {
        M.toast({ html: 'Fecha no es valida!', classes: "red lighten-1" });
        return false;
    }
    if (ti.value == "0") {
        M.toast({ html: 'Seleccione tipo identificacion!', classes: "red lighten-1" });
        return false;
    }
    if (gr.value == "0") {
        M.toast({ html: 'Seleccione Grupo!', classes: "red lighten-1" });
        return false;
    }
    if (gn.value == "") {
        M.toast({ html: 'Seleccione genero!', classes: "red" });
        return false;
    }
    if (en.value == "") {
        M.toast({ html: 'Seleccione entidad!', classes: "red" });
        return false;
    }
    if (ed.value < 18) {
        M.toast({ html: 'Su edad no es valida!', classes: "red lighten-1" });
        return false;
    } else {
        var d1 = rp(ti.value);
        var d2 = rp(cr.value);
        var d3 = rp(ap.value);
        var d4 = rp(no.value);
        var d5 = rp(fn.value);
        var d6 = rp(ed.value);
        var d7 = rp(ma.value, [" "]);
        var d8 = rp(lo.value, [" "]);
        var d9 = rp(pa.value);
        var d10 = rp(gr.value);
        var d11 = rp(gn.value);
        var d12 = rp(en.value);
        $.ajax({
            data: { "d0": "I", "d1": d1, "d2": d2, "d3": d3, "d4": d4, "d5": d5, "d6": d6, "d7": d7, "d8": d8, "d9": d9, "d10": d10, "d11": d11, "d12": d12 },
            url: urlS("clientes"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...' });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], classes: "green" });
                    grdClies();
                } else {
                    M.toast({ html: r[1], classes: "red" });
                }
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}
function upClie() {
    var co = document.getElementById("cods");
    var ti = document.getElementById("d1");
    var cr = document.getElementById("d2");
    var ap = document.getElementById("d3");
    var no = document.getElementById("d4");
    var fn = document.getElementById("d5");
    var ed = document.getElementById("d6");
    var ma = document.getElementById("d7");
    var lo = document.getElementById("d8");
    var es = $('input[name="d9"]:checked').val();
    var gr = document.getElementById("d10");
    var en = document.getElementById("d12");
    if (!valFormatoFecha(fn.value)) {
        M.toast({ html: 'Fecha no es valida!', classes: "red lighten-1" });
        return false;
    }
    if (ti.value == "0") {
        M.toast({ html: 'Seleccione tipo identificacion!', classes: "red lighten-1" });
        return false;
    }
    if (gr.value == "0") {
        M.toast({ html: 'Seleccione Grupo!', classes: "red lighten-1" });
        return false;
    }
    if (en.value == "") {
        M.toast({ html: 'Seleccione entidad!', classes: "red lighten-1" });
        return false;
    }
    if (ed.value < 18) {
        M.toast({ html: 'Su edad no es valida!', classes: "red lighten-1" });
        return false;
    } else {
        var d1 = rp(ti.value);
        var d2 = rp(cr.value);
        var d3 = rp(ap.value);
        var d4 = rp(no.value);
        var d5 = rp(fn.value);
        var d6 = rp(ed.value);
        var d7 = rp(ma.value, [" "]);
        var d8 = rp(lo.value, [" "]);
        var d9 = rp(es);
        var d10 = rp(gr.value);
        var d11 = rp(co.value);
        var d12 = rp(en.value);

        $.ajax({
            data: { "d0": "U", "d1": d1, "d2": d2, "d3": d3, "d4": d4, "d5": d5, "d6": d6, "d7": d7, "d8": d8, "d9": d9, "d10": d10, "d11": d11, "d12": d12 },
            url: urlS("clientes"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 3000, classes: "teal lighten-1" });
                    grdClies();
                } else {
                    M.toast({ html: r[1], classes: "red lighten-1" });
                }
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });

    }
}
function NroLic() {
    let bt = document.getElementById("btn_act");
    var es = $('input[name="d9"]:checked').val();
    var en = document.getElementById("d12");
    var d1 = rp(es);
    var d2 = rp(en.value);
    if (d1 == 'A') {
        $.ajax({
            data: { "d0": "N-T", "d1": d1, "d2": d2 },
            url: urlS("clientes"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 3000, classes: "teal lighten-1" });

                } else {
                    M.toast({ html: r[1], classes: "red lighten-1" });

                    bt.addEventListener('disabled');

                }
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }

}

function edClie(c) {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("clientes", "editar", "d1=" + c));
    var intv = setInterval(function () {
        if (document.getElementById("frm_Clie") !== null) {
            $('select').formSelect();
            document.getElementById("d1").focus();
            document.getElementById("d2").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
            });
            document.getElementById("frm_Clie").addEventListener('submit', function (event) {
                event.preventDefault();
                upClie();
            });
            clearInterval(intv);
        }
    }, 300);
}


function pagProds(p) {
    $.ajax({
        data: { "d0": "P", "d1": p, "d2": "A", "d3": "G", "d4": "H" },
        url: urlS("productos"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', displayLength: 500, classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                document.getElementById("tbd_res").innerHTML = r[1];
                document.getElementById("ul_pag").innerHTML = r[2];
                document.getElementById("pag").innerHTML = p;
            } else {
                M.toast({ html: r[1], classes: "red lighten-1" });
            }
        },
        error: function (xhr) {
            M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
            console.error(xhr.responseText);
        }
    });
}

function viewAgendamiento() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("agenda", false));
    let inter = setInterval(() => {
        if (document.getElementById('fmrAgenda') !== null) {
            $('select').formSelect();
            document.getElementById('fmrAgenda').addEventListener('submit', (e) => inAgenda(e));
            clearInterval(inter);
        }
    }, 300);
}

function inAgenda(e) {
    e.preventDefault();
    let ta = document.getElementById("nptTipAgenda");
    let en = document.getElementById("nptEntidad");
    let fe = document.getElementById("nptFecha");
    let ho = document.getElementById("nptHora");
    let re = document.getElementById("nptResponsables");
    let de = document.getElementById("nptDescri");
    if (ta.value == "") {
        M.toast({ html: 'Seleccione tipo de agenda!', classes: "red lighten-1" });
        return false;
    }
    if (en.value == "") {
        M.toast({ html: 'Seleccione entidad!', classes: "red lighten-1" });
        en.focus();
        return false;
    }
    if (fe.value == "") {
        M.toast({ html: 'Seleccione fecha!', classes: "red lighten-1" });
        fe.focus();
        return false;
    }
    if (ho.value == "") {
        M.toast({ html: 'Seleccione hora!', classes: "red lighten-1" });
        ho.focus();
        return false;
    }
    if (re.value == "") {
        M.toast({ html: 'Seleccione por lo menos un responsable!', classes: "red lighten-1" });
        return false;
    }
    if (de.value == "") {
        M.toast({ html: 'Ingrese un detalle del agendamiento!', classes: "red lighten-1" });
        de.focus();
        return false;
    } else {
        let data = {
            d0: 'AGEN',
            d1: rp(ta.value),
            d2: en.value.split('|')[0],
            d3: rp(fe.value),
            d4: rp(ho.value),
            d5: [],
            d6: rp(de.value)
        };
        for (let option of re.options) {
            if (option.selected) {
                data['d5'].push(option.value);
            }
        }
        console.log(data);
        $.ajax({
            data: data,
            url: urlS("agenda"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 3000, classes: "teal lighten-1" });
                    viewAgendamiento();
                } else {
                    M.toast({ html: r[1], classes: "red lighten-1" });
                }
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}

function viewGrdAgendamiento(fi = '', ff = '', en = '') {
    let entid = null;
    if (en != '') {
        entid = en.split('|');
        entid = entid[0];
    } else {
        entid = '';
    }
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("agenda", "grd_agenda", "FI=" + fi + "&FF=" + ff + "&EN=" + entid));
    var intv = setInterval(function () {
        if (document.getElementById("fmrFil") !== null) {
            document.getElementById("fmrFil").addEventListener('submit', function (e) {
                e.preventDefault();
                viewGrdAgendamiento(
                    e.target.elements.nptFechaIni.value,
                    e.target.elements.nptFechaFin.value,
                    e.target.elements.nptEntidad.value
                );
            });
            clearInterval(intv);
        }
    }, 300);
}

