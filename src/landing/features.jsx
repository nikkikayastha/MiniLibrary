import './features.css';
export default function Features() {
    return (
        <div className='features' id='feature'>
            <h1 style={{ textAlign: 'center' }}>Streamline Your <span>Library Operations</span></h1>
            <div className='feature-card-container'>
                <div className='feature-card'>
                    <img alt='books' src={require('../assets/book-stack.png')} />
                    <h3>Manage Books</h3>
                    <p>Easily manage and organize library books.</p>
                </div>
                <div className='feature-card'>
                    <img alt='members' src={require('../assets/members.png')} />
                    <h3>Manage Members</h3>
                    <p>Register members, manage profiles, and control memberships.</p>
                </div>
                <div className='feature-card'>
                    <img alt='books' src={require('../assets/borrow-book.png')} />
                    <h3>Track Borrowing</h3>
                    <p>Issue and return books easily while maintaining borrowing history.</p>
                </div>
                <div className='feature-card'>
                    <img alt='books' src={require('../assets/track.png')} />
                    <h3>Check Availability</h3>
                    <p>Instantly available books issued, or low in stock.</p>
                </div>
            </div>
        </div>
    )
}