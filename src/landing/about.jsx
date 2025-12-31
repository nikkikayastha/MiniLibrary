import './about.css'
export default function About() {
    return (
        <div className="page-container" id='about'>
            <h1>Why Choose <span>MiniLibrary</span>?</h1>
            <div className='why'>
                <div className="reasons">
                    <div className="card">
                        <h4>Real-Time Book Availability</h4>
                        <p>Instantly know whether a book is available, issued, or out of stock. The system automatically updates availability as books are issued and returned, ensuring accurate and up-to-date library records at all times.</p>
                    </div>
                    <div className="card">
                        <h4>Fast Search & Smart Filters</h4>
                        <p>Quickly find books, members, or borrowing records using advanced search adn filter options. Search by title, author, category, member name, or date to save time and streamline daily operations.</p>
                    </div>
                </div>
                <div>
                    <img alt='why_us' src={require('../assets/why-choose-section.png')} />
                </div>
            </div>
            <h3>Trusted By Libraries</h3>
        </div>
    );
}