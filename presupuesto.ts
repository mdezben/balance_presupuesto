type TipoTransaccion = 'ingreso' | 'gasto';

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}

let transacciones: Transaccion[] = [];
let idCounter = 1;
let balanceTotal = 0;

function agregarTransaccion(monto: number, descripcion: string, tipo: TipoTransaccion) {
    if (monto <= 0) {
        alert("El monto debe ser positivo.");
        return;
    }
    if (!descripcion.trim()) {
        alert("La descripción no puede estar vacía.");
        return;
    }
    
    const nuevaTransaccion: Transaccion = {
        id: idCounter++,
        monto: monto,
        descripcion: descripcion,
        tipo: tipo
    };
    
    transacciones.push(nuevaTransaccion);

    // Actualizamos el balance
    if (tipo === 'ingreso') {
        balanceTotal += monto;
    } else if (tipo === 'gasto') {
        balanceTotal -= monto;
    }

    renderizar();
}

function renderizar() {
    const balanceElement = document.getElementById("balance")!;
    balanceElement.innerHTML = `Balance Total: $${balanceTotal.toFixed(2)}`;

    const listaTransaccionesElement = document.getElementById("transacciones")!;
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

document.getElementById("btnIngreso")?.addEventListener("click", () => {
    const monto = parseFloat((document.getElementById("monto") as HTMLInputElement).value);
    const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
    agregarTransaccion(monto, descripcion, 'ingreso');
});

document.getElementById("btnGasto")?.addEventListener("click", () => {
    const monto = parseFloat((document.getElementById("monto") as HTMLInputElement).value);
    const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
    agregarTransaccion(monto, descripcion, 'gasto');
});
