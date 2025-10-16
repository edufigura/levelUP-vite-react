import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../../Footer.jsx";
import '../../../styles/Blog.css';


const Blog = () => {
  return (
    <>
      {/* Cuerpo */}
      <div className="container mt-5 pt-5">
        <div className="row">
          {/* Título página */}
          <div className="col text-white">
            <h1>Noticias Importantes</h1>
          </div>

          {/* Noticia 1 */}
          <div className="row">
            <div
              className="card bg-dark text-white border-secondary shadow-lg"
              style={{ width: "500px" }}
            >
              <br />
              <h3>Stardew Valley tendrá otra actualización</h3>
              <p>
                El creador del juego explicó que "tras la actualización 1.6 pensé en que no sabía si haría otra actualización. 
                Pero quería compartir algo con vosotros esta noche, una especie de secreto... habrá otra actualización".
              </p>
              <button
                className="btn btn-accent ms-3 mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Ver Noticia
              </button>
              <br />
            </div>
          </div>

          {/* Espacio en blanco */}
          <div className="row">
            <br />
            <br />
          </div>

          {/* Noticia 2 */}
          <div className="row">
            <div
              className="card bg-dark text-white border-secondary shadow-lg"
              style={{ width: "500px" }}
            >
              <br />
              <h3>
                Análisis de Kirby y la tierra olvidada – Nintendo Switch 2 Edition + El mundo astral, la guinda del pastel
              </h3>
              <p>
                Lo último que Kirby ha absorbido son tus excusas para no darle una oportunidad a La tierra olvidada + El mundo astral.
                Su Nintendo Switch 2 Edition es una de las mejores lanzadas hasta la fecha. Trae consigo una expansión con niveles de lo más vistosos
                y un chute de fluidez y resolución sin el que ya no podemos vivir. Al juego ahora da gusto verlo y entran aún más ganas de reivindicarlo
                como uno de los mejores del personaje y un plataformas imprescindible. El salto de nuestra bola rosa favorita a las 3D es uno de los más
                exitosos de la historia reciente. Para que os hagáis una idea de su calidad, decir que no anda muy lejos de dos obras maestras como Donkey Kong Bananza
                o Super Mario Odyssey no es ninguna tontería. Apenas les separa una chispita de originalidad, de magia, de variedad y desafío en sus contenidos.
                Como HAL Laboratory sume estos ingredientes en una futura entrega, cuidado...
              </p>
              <button
                className="btn btn-accent ms-3 mx-auto"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Ver Noticia
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* Footer */}
      <Footer></Footer>
    </>
  );
};

export default Blog;