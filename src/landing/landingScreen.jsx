import './landing.css';
import { useNavigate } from 'react-router-dom';
import About from './about';
import Contact from './contact';
import Features from './features';
import { Link } from 'react-scroll';

export default function LandingScreen() {
    const navigate = useNavigate();
    return (
        <>
            <nav className='navbar'>
                <h1>MiniLibrary</h1>
                <div style={{ display: 'flex', gap: '50px' }}>
                    <Link
                        to='home'
                        smooth={true}
                        duration={500}
                        spy={true}
                        offset={-80}
                        activeClass="active"
                    >Home</Link>
                    <Link
                        to='feature'
                        smooth={true}
                        duration={500}
                        spy={true}
                        offset={-80}
                        activeClass="active"
                    >Features</Link>
                    <Link
                        to='about'
                        smooth={true}
                        duration={500}
                        spy={true}
                        offset={-100}
                        activeClass="active"
                    >About Us</Link>
                    <Link
                        to='contact'
                        smooth={true}
                        duration={500}
                        spy={true}
                        offset={-80}
                        activeClass="active"
                    >Contact Us</Link>
                </div>
                <button onClick={() => navigate("/login")}>Sign In</button>
            </nav>
            <div className="container" id='home'>
                <div className="left-container">
                    <h1>Organize, Track, and Manage Your <span style={{ color: '#8d8cf0' }}>Library</span> Effortlessly</h1>
                    <h4>An efficient and reliable platform for librarians.</h4>
                    <button onClick={() => navigate("/login")}>Get Started </button>
                </div>
                <img alt="landing" src={require('../assets/landing.png')} />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#8d8cf0" fill-opacity="1" d="M0,64L48,58.7C96,53,192,43,288,58.7C384,75,480,117,576,144C672,171,768,181,864,176C960,171,1056,149,1152,165.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            <Features />
            <About />
            <Contact />
        </>
    )
}