async function consumirAPI() {
  const URL = "https://api.spacexdata.com/v3/launches";
  const respuesta = await fetch(URL);
  const datos = await respuesta.json();
  imprimirDatos(datos.splice(0, 100));
  abrirModal();
}

function imprimirDatos(datos) {
  const trTable = document.querySelector(".trTable");
  datos.forEach((dato) => {
    trTable.innerHTML += `
    <div class="card text-center p-3" style="width: 18rem">
    <img src="${dato.links.mission_patch}" class="card-img-top" alt="Mision image" />
    <div class="card-body">
      <h5 class="card-title">${dato.mission_name}</h5>
      <p class="card-text">${dato.launch_year}</p>
      <button
      type="button"
      class="btn btn-primary btnVerInfo"
      data-id="${dato.flight_number}"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Ver Info-Misión
    </button>
    </div>
    </div> 
    `;
  });
}

function abrirModal() {
  document.querySelectorAll(".btnVerInfo").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const dataId = btn.getAttribute("data-id");
      const URL2 = `https://api.spacexdata.com/v3/launches/${dataId}`;
      const respuesta = await fetch(URL2);
      const lanzamiento = await respuesta.json();
      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `
          <iframe
          src="https://www.youtube.com/embed/${lanzamiento.links.youtube_id}"
          frameborder="0"
        ></iframe>
        <hr />
        <ol>
          <li>
            <h5>Cohete:</h5>
            <h5>${lanzamiento.rocket.rocket_name}</h5>
          </li>
          <li>
            <h5>Tipo Cohete:</h5>
            <h5>${lanzamiento.rocket.rocket_type}</h5>
          </li>
          <li>
            <h5>Exito lanzamiento:</h5>
            <h5>${lanzamiento.launch_success}</h5>
          </li>
        </ol>
    `;
    });
  });
}

consumirAPI();
