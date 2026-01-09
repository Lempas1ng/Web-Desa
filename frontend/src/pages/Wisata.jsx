import { Link } from 'react-router-dom';
import { wisataData } from '../data';

export default function Wisata() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Destinasi Wisata</h1>
        <p className="text-gray-600">Jelajahi keindahan alam Desa Sukajaya Lempasing</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wisataData.map((item) => (
          <Link to={`/wisata/${item.id}`} key={item.id} className="group block h-full">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
              <div className="relative overflow-hidden h-56">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{item.description}</p>
                <div className="mt-auto text-primary text-sm font-medium flex items-center">
                    Lihat Selengkapnya <span className="ml-1 text-lg">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}