"use strict";
var _a, _b;
let transacciones = [];
let idCounter = 1;
let balanceTotal = 0;
function agregarTransaccion(monto, descripcion, tipo) {
    if (monto <= 0) {
        alert("El monto debe ser positivo.");
        return;
    }
    if (!descripcion.trim()) {
        alert("La descripción no puede estar vacía.");
        return;
    }
    const nuevaTransaccion = {
        id: idCounter++,
        monto: monto,
        descripcion: descripcion,
        tipo: tipo
    };
    transacciones.push(nuevaTransaccion);
    // Actualizamos el balance
    if (tipo === 'ingreso') {
        balanceTotal += monto;
    }
    else if (tipo === 'gasto') {
        balanceTotal -= monto;
    }
    renderizar();
}
function renderizar() {
    const balanceElement = document.getElementById("balance");
    balanceElement.innerHTML = `Balance Total: $${balanceTotal.toFixed(2)}`;
    const listaTransaccionesElement = document.getElementById("transacciones");
    listaTransaccionesElement.innerHTML = '';
    transacciones.forEach((transaccion) => {
        const transaccionElement = document.createElement("div");
        transaccionElement.classList.add("transaccion");
        transaccionElement.classList.add(transaccion.tipo === 'ingreso' ? "ingreso-item" : "gasto-item");
        transaccionElement.innerHTML = `
            <strong>${transaccion.descripcion}</strong> - $${transaccion.monto.toFixed(2)} (${transaccion.tipo})
        `;
        listaTransaccionesElement.appendChild(transaccionElement);
    });
}
(_a = document.getElementById("btnIngreso")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const monto = parseFloat(document.getElementById("monto").value);
    const descripcion = document.getElementById("descripcion").value;
    agregarTransaccion(monto, descripcion, 'ingreso');
});
(_b = document.getElementById("btnGasto")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const monto = parseFloat(document.getElementById("monto").value);
    const descripcion = document.getElementById("descripcion").value;
    agregarTransaccion(monto, descripcion, 'gasto');
});
