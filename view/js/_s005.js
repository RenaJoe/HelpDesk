document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

function inCliListas(e, c) {
    let k = e.key.toLowerCase();
    if (k == 'enter') {
        let v = e.target.value.toUpperCase();
        if (v != '') {
            if (confirm('¿Los apellidos y nombres ingresa son correctos?\n' + v)) {
                $.ajax({
                    data: { "d0": "I-CLIL", "d1": c, "d2": v },
                    url: urlS("listas"),
                    dataType: "json",
                    type: 'post',
                    beforeSend: function () {
                        e.target.disabled = true;
                    },
                    success: function (r) {
                        if (r[0]) {
                            M.toast({ html: r[1], classes: "green lighten-1" });
                            seCliListas();
                        } else {
                            M.toast({ html: r[1], classes: "red lighten-1" });
                            e.target.disabled = false;
                        }
                    },
                    error: function (xhr) {
                        M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                        console.error(xhr.responseText);
                    }
                });
            }
        } else {
            M.toast({ html: '¡Ingrese apellidos y nombres completos!', classes: "red lighten-1" });
        }
    }
}

function seCliListas() {
    var cl = document.getElementById("d1");
    if (cl.value == "") {
        M.toast({ html: 'Ingrese una identificación!', classes: "red" });
        return false;
    } else {
        var d1 = rp(cl.value, [" "]);
        $.ajax({
            data: { "d0": "SEARCH", "d1": d1 },
            url: urlS("listas"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                document.getElementById("btnSearchLts").disabled = true;
                document.getElementById('resData').innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
                M.toast({ html: 'Procesando...', classes: "teal lighten-2" });
            },
            success: function (r) {
                document.getElementById('resData').innerHTML = r[1];
                document.getElementById("btnPrint").addEventListener('click', (e, c = r[2]) => {
                    let popup = window.open('./pdf.php?P=C-LISTA&C=' + c, 'popup', 'width=1000,height=700,directories=no,location=no,menubar=no,status=no,toolbar=no,titlebar=no');
                    popup.onload = (e, p = popup) => { p.print(); };
                    listasConsulta();
                });
                document.getElementById("btnSearchLts").disabled = false;
                let ntex = document.getElementById('npt_add_person');
                if (ntex != null) {
                    ntex.addEventListener('keyup', (e, cd = r[2]) => inCliListas(e, cd));
                }
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}

function listasConsulta() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("listas", "c_consultas"));
    var intv = setInterval(function () {
        if (document.getElementById("fmrListas") !== null) {
            document.getElementById("d1").focus();
            document.getElementById("d1").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("fmrListas").addEventListener('submit', function (event) {
                event.preventDefault();
                seCliListas();
            });
            clearInterval(intv);
        }
    }, 300);
}

function seCliContact() {
    var cl = document.getElementById("d1");
    if (cl.value == "") {
        M.toast({ html: 'Ingrese una identificación!', classes: "red" });
        return false;
    } else {
        var d1 = rp(cl.value, [" "]);
        $.ajax({
            data: { "d0": "SEARCH", "d1": d1 },
            url: urlS("contactabilidad"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                document.getElementById("btnSearchLts").disabled = true;
                document.getElementById('resData').innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
                M.toast({ html: 'Procesando...', classes: "teal lighten-2" });
            },
            success: function (r) {
                let res = document.getElementById('resData');
                res.innerHTML = '';
                if (r[0]) {
                    let campos = ['Codigo/Tipo empresa', 'Empresa', 'Telefono empresa', 'Dirección empresa',
                        'Fax empresa', 'Nombres afiliado', 'Dirección afiliado', 'Telefono afiliado',
                        'Celular afiliado', 'Email afiliado', 'Salario afiliado', 'Fecha ingreso',
                        'Fecha salida', 'Puesto afiliado', 'Año', 'Mes'
                    ];
                    r[1].forEach(item => {
                        let table = document.createElement('table');
                        let thead = document.createElement('thead');
                        let tbody = document.createElement('tbody');
                        table.className = 'striped tbl-layout-01';
                        thead.innerHTML = '<tr><th>CAMPO</th><th>DETALLE</th></tr>';
                        item.forEach((elem, key) => {
                            let tr = document.createElement('tr');
                            tr.innerHTML = `<td>${campos[key]}</td><td>${elem != null ? elem : ''}</td>`;
                            tbody.appendChild(tr);
                        });
                        table.appendChild(thead);
                        table.appendChild(tbody);
                        res.appendChild(table);
                    });
                } else {
                    res.innerHTML = r[1];
                }
                document.getElementById("btnSearchLts").disabled = false;
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}

function contactabilidad() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("contactabilidad", "c_contactabilidad"));
    var intv = setInterval(function () {
        if (document.getElementById("fmrContact") !== null) {
            document.getElementById("d1").focus();
            document.getElementById("d1").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("fmrContact").addEventListener('submit', function (event) {
                event.preventDefault();
                seCliContact();
            });
            clearInterval(intv);
        }
    }, 300);
}

function seCliProJud() {
    var cl = document.getElementById("d1");
    if (cl.value == "") {
        M.toast({ html: 'Ingrese una identificación!', classes: "red" });
        return false;
    } else {
        var d1 = rp(cl.value, [" "]);
        $.ajax({
            data: { "d0": "SEARCH", "d1": d1 },
            url: urlS("pjudiciales"),
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                document.getElementById("btnSearchLts").disabled = true;
                document.getElementById('resData').innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
                M.toast({ html: 'Procesando...', classes: "teal lighten-2" });
            },
            success: function (r) {
                if (r[0]) {
                    let html = `<h3 style="font-size:28px;"><i class="material-icons" style="font-size:30px;color:#42444E;">person</i>${r[2]}</h3>`;
                    r[1].forEach(item => {
                        html += `
                        <div class="card-judicial">
                            <div class="card-judicial-header">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>Fecha</span> ${item[0]}
                                            </td>
                                            <td>
                                                <span>Ciudad</span> ${item[1]}
                                            </td>
                                            <td>
                                                <span>Circular</span> ${item[2]}
                                            </td>
                                            <td><a href="./pdf.php?P=PJ&FL=${item[3]}" target="_blank"><i class="material-icons">picture_as_pdf</i></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>Ente Emisor</span> ${item[4]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>Remitente</span> ${item[5]}
                                            </td>
                                            <td>
                                                <span>Cargo remitente</span> ${item[6]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>NRO OFICIO</span> ${item[7]}
                                            </td>
                                            <td>
                                                <span>NRO JUICIO</span> ${item[8]}
                                            </td>
                                            <td>
                                                <span>TIPO ACCIÓN</span> ${item[9]}
                                            </td>
                                            <td>
                                                <span>ACCIÓN</span> ${item[10]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>VALOR</span> ${item[11]}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `;
                    });
                    // <td>
                    //                             <span>IMPLICADOS PERSONAS JURIDICAS</span> ${item[12]}
                    //                         </td>
                    document.getElementById('resData').innerHTML = html;
                } else {
                    document.getElementById('resData').innerHTML = 'NO-DATA';
                }
                document.getElementById("btnSearchLts").disabled = false;
            },
            error: function (xhr) {
                M.toast({ html: 'Ocurrio un error!', displayLength: 2000, classes: "red lighten-1" });
                console.error(xhr.responseText);
            }
        });
    }
}

function providenciasJudiciales() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("pjudiciales", "c_consultas"));
    var intv = setInterval(function () {
        if (document.getElementById("fmrProJuj") !== null) {
            document.getElementById("d1").focus();
            document.getElementById("d1").addEventListener('blur', function (event) {
                var e = document.getElementById(this.id);
                var t = rp(e.value, [" "]);
                e.value = t;
            });
            document.getElementById("fmrProJuj").addEventListener('submit', function (event) {
                event.preventDefault();
                seCliProJud();
            });
            clearInterval(intv);
        }
    }, 300);
}

function funcionJudicial() {
    document.getElementById("res").innerHTML = "";
    $("#res").html('<iframe src="http://consultas.funcionjudicial.gob.ec/informacionjudicial/public/informacion.jsf" frameborder="0" width="100%" height="1200px"></iframe>');
}

function paraisos() {
    document.getElementById("res").innerHTML = "";
    $("#res").html('<iframe src="http://194.163.161.250/informer/paraisos/paraisos.php" frameborder="0" width="100%" height="4000px"></iframe>');
}


function ConsultaMasiva() {
    document.getElementById("res").innerHTML = "";
    $("#res").load(urlGF("listas", "c_masivaListas"));
    let inter = setInterval(() => {
        if (document.getElementById('ExlMasivo') !== null) {
            document.getElementById('ExlMasivo').addEventListener('submit', (e) => uplFlMasivo(e));
            clearInterval(inter);
        }
    }, 300);

}


function uplFlMasivo(e) {

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
        f.append('d0', 'CM-L');
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
                document.getElementById('btnMasivo').disabled = true;
                document.getElementById('resData').innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';
            },


            success: function (r) {
                if (r[0]) {
                    M.toast({ html: r[1], classes: 'green' });
                    document.getElementById('resData').innerHTML = `<ul class="collection"><li class="collection-item green">${r[1]}</li></ul>
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
                document.getElementById('btnMasivo').disabled = false;

            },

            error: function (xhr) {
                document.getElementById('btnMasivo').disabled = false;
                document.getElementById('resData').innerHTML = '';
                M.toast({ html: '¡Ocurrio un error!', classes: 'red' });
                console.error(xhr.responseText);
            }
        });
    }
}