
import Container from "./componente/container";
import EmptyState from "./componente/EmptyState";
import getListings, { IListingsParams } from "./accion/getListings";
import ListingCard from "./componente/listings/ListingCard";
import getCurrentUser from "./accion/getCurrentUser";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <>
      <Container>
        <section className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </section>
      </Container>
      
      {/* Pie de página */}
      <footer className="border-t py-8 mt-16">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Información de copyright y enlaces */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <span className="text-gray-600">© 2025 Airbnb, Inc.</span>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Privacidad</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Términos</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">Datos de la empresa</a>
              </div>
            </div>
            
            {/* Idioma, moneda y redes sociales */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Español (CO)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$ COP</span>
              </div>
              
              {/* Iconos de redes sociales */}
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}