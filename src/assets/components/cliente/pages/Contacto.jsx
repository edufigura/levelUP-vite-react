import React, { useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../../Footer.jsx";
import Logo from '../../../imagenes/logos/logo.png';
import '../../../styles/Contacto.css';


const Contacto = () => {
  useEffect(() => {
    // Simula la validación de Bootstrap del script original
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  return (
    <>
      
      {/* Cuerpo */}
      <div className="container mt-5 pt-5">
        <div className="row">
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo LevelUP"
            className="d-block mx-auto"
            style={{ width: "200px", height: "170px" }}
          />

          <div>
            <br />
          </div>

          {/* Formulario */}
          <div
            className="mx-auto card bg-dark text-white border-secondary shadow-lg"
            style={{ width: "400px" }}
          >
            <div className="col">
              <h1>Formulario de Contactos</h1>
            </div>

            <form className="row mt-2 g-3 needs-validation" noValidate>
              {/* Nombre Completo */}
              <div className="col-12 position-relative">
                <label htmlFor="nombreId" className="form-label">
                  Nombre Completo
                </label>
                <input type="text" className="form-control" id="nombreId" required />
                <div className="valid-tooltip">Correcto!</div>
                <div className="invalid-tooltip">Debe ingresar su nombre</div>
              </div>

              {/* Correo */}
              <div className="col-12 position-relative">
                <label htmlFor="correoId" className="form-label">
                  Correo
                </label>
                <input type="email" className="form-control" id="correoId" required />
                <div className="valid-tooltip">Correcto!</div>
                <div className="invalid-tooltip">Debe ingresar un correo</div>
              </div>

              {/* Contenido */}
              <div className="col-12 position-relative">
                <label htmlFor="contenidoId" className="form-label">
                  Contenido
                </label>
                <textarea
                  className="form-control"
                  id="contenidoId"
                  rows="6"
                  required
                ></textarea>
                <div className="valid-tooltip">Correcto!</div>
                <div className="invalid-tooltip">Debe ingresar contenido del contacto</div>
              </div>

              {/* Botón */}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br />

      {/* Google Maps */}
      <section className="py-5 bg-dark text-light">
        <div className="container text-center">
          <h2 className="mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Encuéntranos
          </h2>
          <p className="mb-4">Visita nuestras tiendas LevelUP</p>

          <div className="ratio ratio-16x9 shadow-lg border border-secondary">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.8649162629517!2d-71.53575902339345!3d-33.03368917355751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de64d74fd4af%3A0x8004f381e9055a38!2sDuoc%20UC%20Vi%C3%B1a%20Del%20Mar!5e0!3m2!1ses-419!2scl!4v1760549811363!5m2!1ses-419!2scl"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación LevelUP"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </>
  );
};

export default Contacto;