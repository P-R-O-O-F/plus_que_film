import Link from 'next/link';

const NotFound = () => {
  return (
    <div
      className="flex flex-col justify-center items-center h-full relative"
      style={{
        height: 'calc(100vh )',  
        backgroundImage: `url('/images/404_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(95%)', 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="relative z-10 p-10 rounded-lg text-center"
        style={{
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white">
        Désolé, notre spécialiste en films n'a pas
        </p>
        <p className="text-xl mb-8 text-white">
        réussi à trouver le film que vous cherchez.
        </p>
        <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
