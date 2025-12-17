document.addEventListener('DOMContentLoaded', function() {
    // 1. OBTENER EL ID DE LA URL
    // Ejemplo: Si la URL es detalle.html?id=persa, esta línea obtiene 'persa'
    const params = new URLSearchParams(window.location.search);
    const razaId = params.get('id');

    if (razaId) {
        // 2. CARGAR LOS DATOS DEL JSON
        fetch('data/razas.json') // Asegúrate de que esta ruta sea correcta
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                // 3. BUSCAR EL GATO ESPECÍFICO
                // Encuentra el objeto dentro del arreglo donde el 'id' coincide con el ID de la URL
                const raza = data.find(r => r.id === razaId);

                if (raza) {
                    // 4. INYECTAR LA INFORMACIÓN EN EL HTML

                    document.getElementById('nombre_raza').textContent = raza.nombre;
                    document.getElementById('imagen-raza').src = raza.imagen;
                    document.getElementById('imagen-raza').alt = raza.nombre;
                    document.getElementById('cuidado-texto').textContent = raza.cuidado;

                    // Rellenar la lista de características
                    const ul = document.getElementById('lista-caracteristicas');
                    ul.innerHTML = `
                        <li><strong>Origen:</strong> ${raza.origen}</li>
                        <li><strong>Carácter:</strong> ${raza.caracter}</li>
                        <li><strong>Pelaje:</strong> ${raza.pelaje}</li>
                        <li><strong>Vida:</strong> ${raza.vida}</li>
                    `;
                } else {
                    document.getElementById('nombre-raza').textContent = "Raza no encontrada.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('nombre-raza').textContent = "Error al cargar los datos.";
            });
    }
});