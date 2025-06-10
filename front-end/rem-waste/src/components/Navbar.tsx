import logo from '../assets/logo.png'

function Navbar() {
    return (
        // the navbar
        <div className='flex items-center text-left main-color px-4 h-11 fixed w-full top-0 z-10 shadow-md'>
            <div className='flex items-center space-x-0.5 cursor-pointer'>
              <img className='w-8 h-8' src={logo} alt='logo'/>
              <span className='text-yellow-400 text-xs font-bold hover:text-yellow-200'>Rem Waste</span>
            </div>
        </div>
    );
}

export default Navbar;