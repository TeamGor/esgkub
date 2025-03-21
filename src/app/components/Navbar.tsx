export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-white text-2xl font-bold">MyApp</div>
      <ul className="flex space-x-6">
        <li><a href="#home" className="text-white hover:text-gray-400">Home</a></li>
        <li><a href="#about" className="text-white hover:text-gray-400">About</a></li>
        <li><a href="#services" className="text-white hover:text-gray-400">Services</a></li>
        <li><a href="#contact" className="text-white hover:text-gray-400">Contact</a></li>
      </ul>
    </nav>
  );
}
