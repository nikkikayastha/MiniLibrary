import './contact.css';

export default function Contact() {
    return (
        <footer className="footer" id='contact'>
            <div style={{ color: 'white' }} className="inner-footer grid-cols-1 md:grid-cols-4 gap-12">

                <div>
                    <h3>MiniLibrary</h3>
                    <p className="text-gray-300 leading-7 text-left">
                        Join Today
                    </p>
                </div>

                <div>
                    <h5>Sitemap</h5>
                    <ul className='menu'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Features</li>
                    </ul>
                </div>

                <div>
                    <h5>Utility</h5>
                    <ul className='menu'>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className='form'>
                    <p>Contact Us</p>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type='email' placeholder='Your Email' />
                        <input type='text' placeholder='Your Enquiry' style={{ height: '70px' }} />
                        <button className='btn' style={{ backgroundColor: 'white', color: 'black', width: '50px', padding: '2px' }}>Send</button>
                    </form>
                </div>
            </div>
            <hr style={{ border: "1px dotted white", margin: '10px' }} />

            <div style={{ color: 'white', textAlign: 'center' }}>
                © 2025 MiniLibrary
            </div>
        </footer>
    );
}