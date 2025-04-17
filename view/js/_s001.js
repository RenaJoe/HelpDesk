document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});
function grdLog() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("log", false));
}
function grdGrup() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("grupos", false));
}
function upGrup() {
    var co = document.getElementById("cods");
    var no = document.getElementById("d1");
    var ap = document.getElementById("d2");
    if (ap.value == "0") {
        M.toast({ html: 'Seleccione aplicacion de inicio!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    } else {
        var d1 = rp(no.value);
        var d2 = rp(ap.value, [" "]);
        var d3 = rp(co.value, [" "]);
        $.ajax({
            data: { "d0": "U", "d1": d1, "d2": d2, "d3": d3 },
            url: urlS("grupos"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 2500, classes: "teal lighten-1" });
                    grdGrup();
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

function edGrup(c) {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("grupos", "editar", "d1=" + c));
    var intv = setInterval(function () {
        if (document.getElementById("frm_grup") !== null) {
            document.getElementById("d1").focus();
            $('select').formSelect();
            document.getElementById("d1").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("frm_grup").addEventListener('submit', function (event) {
                event.preventDefault();
                upGrup();
            });
            clearInterval(intv);
        }
    }, 300);
}

function svGrup() {
    var no = document.getElementById("d1");
    var ap = document.getElementById("d2");
    if (ap.value == "0") {
        M.toast({ html: 'Seleccione aplicacion de inicio!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    } else {
        var d1 = rp(no.value);
        var d2 = rp(ap.value, [" "]);
        $.ajax({
            data: { "d0": "I", "d1": d1, "d2": ap.value },
            url: urlS("grupos"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 2500, classes: "teal lighten-1" });
                    frmNewGrup();
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

function frmNewGrup() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("grupos", "nuevo", "d1=1"));
    var intv = setInterval(function () {
        if (document.getElementById("frm_grup") !== null) {
            document.getElementById("d1").focus();
            $('select').formSelect();
            document.getElementById("d1").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("frm_grup").addEventListener('submit', function (event) {
                event.preventDefault();
                svGrup();
            });
            clearInterval(intv);
        }
    }, 300);
}

function validarCI(ctrl = false) {
    var e = document.getElementById("d2");
    var tp = document.getElementById("d1");
    if (tp.value == "C") {
        var l = e.value.length;
        if (l >= 10) {
            var t = valCI(e.value);
            if (!t) {
                M.toast({ html: 'Cedula incorrecta!', displayLength: 2500, classes: "red lighten-1" });
                e.value = "";
            }
        }
    }
    if (tp.value == "R") {
        if (ctrl) {
            var l = e.value.length;
            if (l !== 13) {
                M.toast({ html: 'Ruc incorrecta!', displayLength: 2500, classes: "red lighten-1" });
                e.focus();
            }
        }
    }
    if (tp.value == "0") {
        M.toast({ html: 'Seleccione tipo de documento!', displayLength: 2500, classes: "red lighten-1" });
        e.value = "";
    }
}
function grdUser() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("usuarios", false));
}

function svUser() {
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
    if (!valFormatoFecha(fn.value)) {
        M.toast({ html: 'Fecha no es valida!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    }
    if (ti.value == "0") {
        M.toast({ html: 'Seleccione tipo identificacion!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    }
    if (gr.value == "0") {
        M.toast({ html: 'Seleccione Grupo!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    }
    if (ed.value < 18) {
        M.toast({ html: 'Su edad no es valida!', displayLength: 2500, classes: "red lighten-1" });
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

        $.ajax({
            data: { "d0": "I", "d1": d1, "d2": d2, "d3": d3, "d4": d4, "d5": d5, "d6": d6, "d7": d7, "d8": d8, "d9": d9, "d10": d10 },
            url: urlS("usuarios"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 3000, classes: "teal lighten-1" });
                    grdUser();
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

function upUser() {
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
    if (!valFormatoFecha(fn.value)) {
        M.toast({ html: 'Fecha no es valida!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    }
    if (ti.value == "0") {
        M.toast({ html: 'Seleccione tipo identificacion!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    }
    if (gr.value == "0") {
        M.toast({ html: 'Seleccione Grupo!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    }
    if (ed.value < 18) {
        M.toast({ html: 'Su edad no es valida!', displayLength: 2500, classes: "red lighten-1" });
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
        $.ajax({
            data: { "d0": "U", "d1": d1, "d2": d2, "d3": d3, "d4": d4, "d5": d5, "d6": d6, "d7": d7, "d8": d8, "d9": d9, "d10": d10, "d11": d11 },
            url: urlS("usuarios"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 3000, classes: "teal lighten-1" });
                    grdUser();
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

function edUser(c) {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("usuarios", "editar", "d1=" + c));
    var intv = setInterval(function () {
        if (document.getElementById("frm_user") !== null) {
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
            document.getElementById("frm_user").addEventListener('submit', function (event) {
                event.preventDefault();
                upUser();
            });
            clearInterval(intv);
        }
    }, 300);
}
function frmNewUser() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("usuarios", "nuevo"));
    var intv = setInterval(function () {
        if (document.getElementById("frm_user") !== null) {
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
            document.getElementById("frm_user").addEventListener('submit', function (event) {
                event.preventDefault();
                svUser();
            });
            clearInterval(intv);
        }
    }, 300);
}

function grdEntid() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("entidades", false));
}
function pjAcc(e, u) {
    e.disabled = true;
    if (confirm('¿Liberar usuario PJ?')) {
        $.ajax({
            data: { "d0": "UPJ", "d1": u },
            url: urlS("usuarios"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], classes: "green lighten-1" });
                    grdUser();
                } else {
                    M.toast({ html: r[1], classes: "red lighten-1" });
                }
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 3000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    } else {
        e.disabled = false;
    }
}
function upEntid() {
    var co = document.getElementById("cods");
    var no = document.getElementById("d1");
    var es = $('input[name="d2"]:checked').val();
    var nt = document.getElementById("nrolic");
    var na = document.getElementById("nroact");
    var ni = document.getElementById("nroina");
    var d1 = rp(co.value);
    var d2 = rp(no.value);
    var d3 = rp(es, [" "]);
    var d4 = rp(nt.value);
    var d5 = rp(na.value);
    var d6 = rp(ni.value);
    $.ajax({
        data: { "d0": "U", "d1": d1, "d2": d2, "d3": d3 ,"d4" : d4},
        url: urlS("entidades"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                M.toast({ html: r[1], classes: "green lighten-1" });
                grdEntid();
            } else {
                M.toast({ html: r[1], classes: "red lighten-1" });
            }
        },
        error: function (xhr) {
            M.toast({ html: 'Ocurrio un error!', displayLength: 3000, classes: "red lighten-1" });
            console.error(xhr.responseText);
        }
    });
}
function edEntid(c) {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("entidades", "editar", "d1=" + c));
    var intv = setInterval(function () {
        if (document.getElementById("frm_apls") !== null) {
            document.getElementById("d1").focus();
            $('.collapsible').collapsible();
            let ms = document.getElementsByClassName('my-services');
            let s = document.getElementsByClassName('services');
            for (let i = 0; i < ms.length; i++) {
                ms[i].addEventListener('click', (e) => {
                    let btn = e.target;
                    btn.setAttribute('disabled', true);
                    let cds = btn.id.split('_');
                    $.ajax({
                        data: { "d0": "DS", "d1": cds[0], "d2": cds[1] },
                        url: urlS("entidades"),
                        dataType: "json",
                        type: 'post',
                        beforeSend: function () {
                            M.toast({ html: 'Procesando...', displayLength: 2000 });
                        },
                        success: function (r) {
                            if (r[0]) {
                                M.toast({ html: r[1], displayLength: 3500, classes: "green" });
                                edEntid(document.getElementById('cods').value);
                            } else {
                                M.toast({ html: r[1], classes: "red lighten-1" });
                            }
                        },
                        error: function (xhr) {
                            M.toast({ html: 'Ocurrio un error!', classes: "red" });
                            console.error(xhr.responseText);
                        }
                    });
                });
            }
            for (let i = 0; i < s.length; i++) {
                s[i].addEventListener('click', (e) => {
                    let btn = e.target;
                    btn.setAttribute('disabled', true);
                    let cds = btn.id.split('_');
                    $.ajax({
                        data: { "d0": "AS", "d1": cds[0], "d2": cds[1] },
                        url: urlS("entidades"),
                        dataType: "json",
                        type: 'post',
                        beforeSend: function () {
                            M.toast({ html: 'Procesando...', displayLength: 2000 });
                        },
                        success: function (r) {
                            if (r[0]) {
                                M.toast({ html: r[1], displayLength: 3500, classes: "green" });
                                edEntid(document.getElementById('cods').value);
                            } else {
                                M.toast({ html: r[1], classes: "red lighten-1" });
                            }
                        },
                        error: function (xhr) {
                            M.toast({ html: 'Ocurrio un error!', classes: "red" });
                            console.error(xhr.responseText);
                        }
                    });
                });
            }
            document.getElementById("frm_apls").addEventListener('submit', function (event) {
                event.preventDefault();
                upEntid();
            });
            clearInterval(intv);
        }
    }, 300);
}
function svEntid() {
    var no = document.getElementById("d1");
    var nro = document.getElementById("d2");
    var d1 = rp(no.value);
    var d2 = rp(nro.value);
    $.ajax({
        data: { "d0": "I", "d1": d1 , "d2" : d2},
        url: urlS("entidades"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', displayLength: 2000, classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                M.toast({ html: r[1], displayLength: 3500, classes: "teal lighten-1" });
                frmNewEntid();
            } else {
                M.toast({ html: r[1], classes: "red lighten-1" });
            }
        },
        error: function (xhr) {
            M.toast({ html: 'Ocurrio un error!', classes: "red lighten-1" });
            console.error(xhr.responseText);
        }
    });
}
function frmNewEntid() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("entidades", "nuevo"));
    var intv = setInterval(function () {
        if (document.getElementById("frm_apls") !== null) {
            document.getElementById("d1").focus();
            document.getElementById("d2").focus();
            document.getElementById("frm_apls").addEventListener('submit', function (event) {
                event.preventDefault();
                svEntid();
            });
            clearInterval(intv);
        }
    }, 300);
}

function grdEstbl() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlS("establesimientos", false));
}
function upEstb() {
    var es = document.getElementById("d1");
    var de = document.getElementById("d2");
    var cl = document.getElementById("d3");
    var d1 = rp(es.value);
    var d2 = rp(de.value);
    var d3 = rp(cl.innerHTML);
    $.ajax({
        data: { "d0": "U", "d1": d1, "d2": d2, "d3": d3 },
        url: urlS("establesimientos"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                M.toast({ html: r[1], displayLength: 2500, classes: "teal lighten-1" });
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
function edEstabls(c) {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("establesimientos", "editar", "d1=" + c));
    var intv = setInterval(function () {
        if (document.getElementById("frm_Establs") !== null) {
            $(document).ready(function () {
                $('.modal').modal();
            });
            document.getElementById("d2").focus();
            document.getElementById("frm_Establs").addEventListener('submit', function (event) {
                event.preventDefault();
                upEstb();
            });
            clearInterval(intv);
        }
    }, 300);
}
function selectCliEst(c, n, cr) {
    document.getElementById("sp_nom").value = n;
    document.getElementById("sp_cedruc").innerHTML = cr;
    document.getElementById("d3").innerHTML = c;
}
function srchCliEst() {
    var e = document.getElementById("d3_cl").value;
    if (e !== "") {
        $.ajax({
            data: { "d0": "S-CL", "d1": e, "d2": "D", "d3": "l" },
            url: urlS("establesimientos"),
            dataType: "json",
            type: 'post',
            success: function (r) {
                document.getElementById("tbd_res_search").innerHTML = r[1];
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}
function busquedaRapida() {
    var e = document.getElementById("bscr").value;
    if (e !== "" && e !== "0") {
        $.ajax({
            data: { "d0": "BR", "d1": e, "d2": "H", "d3": "5" },
            url: urlS("establesimientos"),
            dataType: "json",
            type: 'post',
            success: function (r) {
                if (r[0]) {
                    document.getElementById("tbd_res").innerHTML = r[1];
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
//////////////////////////////////////**************/
function busquedaClien() {
    var e = document.getElementById("npt_clien").value;
    var ent = document.getElementById("npt_entid").value;
    var reg = document.getElementById("npt_regis").value;
    var cli = document.getElementById("npt_cedul").value;

    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("clientes", "index", "d1=" + e + "&d2=" + ent + "&d3="+ cli + "&d4=" + reg  ));
}
function busquedaEnti() {
    var e = document.getElementById("npt_entida").value;
    var reg = document.getElementById("npt_regis").value;

    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("entidades", "index", "d1=" + e + "&d4=" + reg));
}
function busquedaAdms() {
    var e = document.getElementById("npt_usu").value;

    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("usuarios", "index", "d1=" + e));
}
function busquedaHisto() {
    var e = document.getElementById("npt_codig").value;
    var reg = document.getElementById("npt_regis").value;

    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("listas", "historico", "d1=" + e + "&d4=" + reg));

}
function busquedaDetaHisto(cab, tip) {

    var reg = document.getElementById("npt_regis").value;
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("listas", "detalle", "d1=" + cab + "&d2=" + tip + "&d4=" + reg));

}
function busquedaRegCivNom() {
    let e = document.getElementById("npt_nombre").value;
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("registro_civil", "index", "d1=" + e));
}
function busquedaLog() {
    let e = document.getElementById("npt_regis").value;
    let u = document.getElementById("npt_usuar").value;
    let i = document.getElementById("npt_fecini").value;
    let f = document.getElementById("npt_fecfin").value;
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("log", "index", "d1=" + e + "&d2=" + u + "&d3=" + i + "&d4=" + f));
}

function busquedaHisCon() {
    let e = document.getElementById("npt_regis").value;
    let u = document.getElementById("npt_usuar").value;
    let i = document.getElementById("npt_fecini").value;
    let f = document.getElementById("npt_fecfin").value;
    let fd = document.getElementById("npt_clien").value;


    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("log", "clientes", "d1=" + e + "&d2=" + u + "&d3=" + i + "&d4=" + f + "&d5=" + fd));
}

/////////////////////////////////////**************/

function pagHisCli(p) {
    let regist = document.getElementById('npt_regis').value;
    let filtro = document.getElementById('npt_usuar').value;
    let fecini = document.getElementById("npt_fecini").value;
    let fecfin = document.getElementById("npt_fecfin").value;
    let filtr2 = document.getElementById("npt_clien").value;
    //let filtr3 = document.getElementById("npt_nombr").value , "d7": filtr3 ;


    $.ajax({
        data: { "d0": "PH-C", "d1": p, "d2": filtro, "d3": fecini, "d4": regist, "d5": fecfin, "d6": filtr2},
        url: urlS("log"),
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

function svEstb() {
    var es = document.getElementById("d1");
    var de = document.getElementById("d2");
    var cl = document.getElementById("d3");
    var ru = document.getElementById("d4");
    var di = document.getElementById("d5");
    var te = document.getElementById("d6");
    var oc = document.getElementById("d7");
    var ce = document.getElementById("d8");
    if (cl.value == "") {
        M.toast({ html: 'Seleccione cliente!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    } else {
        var d1 = rp(es.value);
        var d2 = rp(de.value);
        var d3 = rp(cl.innerHTML);
        var d4 = rp(ru.value);
        var d5 = rp(di.value);
        var d6 = rp(te.value);
        var d7 = rp(oc.value);
        var d8 = rp(ce.value);
        $.ajax({
            data: { "d0": "I", "d1": d1, "d2": d2, "d3": d3, "d4": d4, "d5": d5, "d6": d6, "d7": d7, "d8": d8 },
            url: urlS("establesimientos"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 2500, classes: "teal lighten-1" });
                    edEstabls(r[2]);
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
function frmNewEstabls() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("establesimientos", "nuevo"));
    var intv = setInterval(function () {
        if (document.getElementById("frm_Establs") !== null) {
            $(document).ready(function () {
                $('.modal').modal();
            });
            $('select').formSelect();
            document.getElementById("d1").focus();
            document.getElementById("d1").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("d2").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
            });
            document.getElementById("d3").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value);
                e.value = t;
            });
            document.getElementById("frm_Establs").addEventListener('submit', function (event) {
                event.preventDefault();
                svEstb();
            });
            clearInterval(intv);
        }
    }, 300);
}

function grdPuntEmi(c) {
    document.getElementById("grd_pem").innerHTML = "";
    $("#grd_pem").load(urlGF("punto_emision", "index", "d1=" + c));
}
function edPuntEmi(c) {
    $("#fmr_pem").load(urlGF("punto_emision", "editar", "d1=" + c));
    var intv = setInterval(function () {
        if (document.getElementById("frm_PuntEmi") !== null) {
            document.getElementById("d2_pe").focus();
            clearInterval(intv);
        }
    }, 300);
}
function upPuem(event) {
    event.preventDefault();
    if (document.getElementById("d1_pe") == null) { return false; }
    var pu = document.getElementById("d1_pe");
    var de = document.getElementById("d2_pe");
    var di = document.getElementById("d3_pe");
    var es = document.getElementById("d1");
    var d1 = rp(pu.value);
    var d2 = rp(de.value);
    var d3 = rp(di.value);
    var d4 = rp(es.value);
    $.ajax({
        data: { "d0": "U", "d1": d1, "d2": d2, "d3": d3, "d4": d4 },
        url: urlS("punto_emision"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                M.toast({ html: r[1], displayLength: 2500, classes: "teal lighten-1" });
                grdPuntEmi(es.value);
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
function svPuem(event) {
    event.preventDefault();
    var pu = document.getElementById("d1_pe");
    var de = document.getElementById("d2_pe");
    var di = document.getElementById("d3_pe");
    var es = document.getElementById("d1");
    var d1 = rp(pu.value);
    var d2 = rp(de.value);
    var d3 = rp(di.value);
    var d4 = rp(es.value);
    $.ajax({
        data: { "d0": "I", "d1": d1, "d2": d2, "d3": d3, "d4": d4 },
        url: urlS("punto_emision"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', displayLength: 1000, classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                M.toast({ html: r[1], displayLength: 2500, classes: "teal lighten-1" });
                frmNewPuntEmi();
                grdPuntEmi(es.value);
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
function selectCliPem(c, n, cr) {
    document.getElementById("sp_nom_pe").value = n;
    document.getElementById("sp_cedruc_pe").innerHTML = cr;
    document.getElementById("d4_pe").innerHTML = c;
}
function srchCliPem() {
    var e = document.getElementById("d3_cl").value;
    if (e !== "") {
        $.ajax({
            data: { "d0": "S-CL", "d1": e, "d2": "D", "d3": "l", "d4": "O", "d5": "P" },
            url: urlS("punto_emision"),
            dataType: "json",
            type: 'post',
            success: function (r) {
                document.getElementById("tbd_res_search").innerHTML = r[1];
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}
function frmNewPuntEmi() {
    document.getElementById("fmr_pem").innerHTML = "";
    $("#fmr_pem").load(urlGF("punto_emision", "nuevo"));
}
/*paginacion*/
function pagLog(p) {

    $.ajax({
        data: { "d1": p },
        url: urlS("log"),
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
function pagApls(p) {
    let fil_entida = document.getElementById('npt_entida').value;
    let reg = document.getElementById('npt_regis').value;

    $.ajax({
        data: { "d0": "P", "d1": p, "d2": fil_entida, "d3": "G", "d4": reg },
        url: urlS("entidades"),
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
function pagUser(p) {
    let fil_user = document.getElementById('npt_usu').value;

    $.ajax({
        data: { "d0": "P", "d1": p, "d2": fil_user, "d3": "G", "d4": "H", "d5": "J", "d6": "G", "d7": "I", "d8": "G", "d9": "L", "d10": "-" },
        url: urlS("usuarios"),
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
function pagClies(p) {
    let fil_clien = document.getElementById('npt_clien').value;
    let fil_entid = document.getElementById('npt_entid').value;
    let reg = document.getElementById('npt_regis').value;
    let user = document.getElementById('npt_cedul').value;

    $.ajax({

        data: { "d0": "P", "d1": p, "d2": fil_clien, "d3": fil_entid, "d4": reg, "d5": user },
        url: urlS("clientes"),
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
function pagHisto(p) {
    let fil_codig = document.getElementById('npt_codig').value;
    let reg = document.getElementById('npt_regis').value;

    $.ajax({

        data: { "d0": "P", "d1": p, "d2": fil_codig, "d3": "H", "d4": reg, "d5": "J", "d6": "G", "d7": "I", "d8": "G", "d9": "L", "d10": "-" },
        url: urlS("listas"),
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
function delLis(cod, tip) {
    if (confirm('¿Desea eliminar el registro?')) {
        $.ajax({
            data: { "d0": "D-LIS", "d1": cod, "d2": tip },
            url: urlS("listas"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Eliminando...', displayLength: 1000, classes: "blue-grey" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 3000, classes: "green" });
                    grdHisto();
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
function edHisto(c, d) {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("listas", "detalle", "d1=" + c + "&d2=" + d));

}

function pagdetHis(p, cab, tip) {
    let reg = document.getElementById('npt_regis').value;

    $.ajax({

        data: { "d0": "P-D", "d1": cab, "d2": tip, "d3": p, "d4": reg, "d5": "J", "d6": "G", "d7": "I", "d8": "G", "d9": "L", "d10": "-" },
        url: urlS("listas"),
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
//////////////////////////****************** */
function paglogAcc(p) {
    
    let regist = document.getElementById('npt_regis').value;
    let filtro = document.getElementById('npt_usuar').value;
    let fecini = document.getElementById("npt_fecini").value;
    let fecfin = document.getElementById("npt_fecfin").value;

    $.ajax({

        data: { "d0": "P-D", "d1": p, "d2": filtro, "d3": fecini, "d4": regist, "d5": fecfin, "d6": "G", "d7": "I", "d8": "G", "d9": "L", "d10": "-" },
        url: urlS("log"),
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

function cleanRegCiv(){
    document.getElementById("frm_regis").innerHTML= '';
}
function grdRegCiv() {
    let nom = document.getElementById("npt_cedula").value;
    $.ajax({
        data: { "d0": "V-R", "d1": nom, "d2": "tip", "d3": "p", "d4": "reg", "d10": "-" },
        url: urlS("registro_civil"),
        dataType: "json",
        type: 'post',
        beforeSend: function () {
            M.toast({ html: 'Procesando...', displayLength: 500, classes: "teal lighten-2" });
        },
        success: function (r) {
            if (r[0]) {
                document.getElementById("frm_regis").innerHTML = `
                <div class="col s12 m12">
                    <div class="card white darken-1">
                        <div class="card-content black-text">
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="ntp_nomant" disabled name="ntp_nomant" value="${r[1][0][0]}" type="text" class="validate"></input>
                                    <label class="active" for="ntp_nomant">Busqueda por Entidad</label>

                                </div>
                                <div class="input-field col s6">
                                    <input id="npt_nuevon" name="ntp_nuevon" placeholder= "Actualizacion de Nombre" type="text" class="validate"></input>
                                    <label class="active" for="npt_nuevon">Busqueda por Entidad</label>
                                </div>
                                <div class="col s12">
                                    <div class="center">
                                        <a class="waves-effect waves-light btn-large blue" onclick="uNombre();return false;"><i class="material-icons left">refresh</i>Actualizar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            }else{
                alert(r[1]);
            }
        },
        error: function (xhr) {
            M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
            console.error(xhr.responseText);
        }
    });
}
function uNombre() {
    let nom = document.getElementById("npt_nuevon");
    let ced = document.getElementById("npt_cedula");
    let ant = document.getElementById("ntp_nomant");
    if (nom.value == '') {
        M.toast({ html: 'Ingrese un valor!', displayLength: 2500, classes: "red lighten-1" });
        return false;
    } else {
        let d1 = rp(nom.value);
        let d2 = rp(ced.value);
        let d3 = rp(ant.value);
        $.ajax({
            data: { "d0": "U-R", "d1": d1, "d2": d2 , "d3": d3},
            url: urlS("registro_civil"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                M.toast({ html: 'Procesando...', displayLength: 2000, classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], displayLength: 4000, classes: "green lighten-1" });
                    grdCivil();
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