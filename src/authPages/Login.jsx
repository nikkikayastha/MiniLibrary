// import { Link } from 'react-router-dom';
// import './Login.css';
// import { useState } from 'react';
// import { loginUser } from '../api/auth';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const payload = {
//             email,
//             password
//         };
//         console.log('Logging in with', payload);

//         loginUser(payload)
//             .then((response) => {
//                 const accessToken = response.data.access;
//                 // const refreshToken = response.data.refresh;
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//                 navigate("/dashboard");
//             })
//             .catch((err) => {
//                 alert("Login failed. Please check your credentials.");
//             });
//     };

//     return (
//         <div className='main_container'>
//             <div className='left_container'>
//                 <img alt="LogIn" src={require('../assets/signin_img.png')}></img>
//                 <p style={{ color: 'white', fontSize: '20px' }}>Digital door to your library</p>
//             </div>
//             <div className='login'>
//                 <h1>Welcome back!</h1>
//                 <h4>Login to your account.</h4>
//                 <input
//                     type='email'
//                     placeholder='Email'
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
//                 <button style={{ color: 'white' }} onClick={handleSubmit}>Sign In</button>

//                 <p>Don't have an account? <Link to={'/signup'} style={{ color: 'blue' }}>Sign Up</Link></p>
//             </div>
//         </div>
//     )
// }
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { loginUser } from '../api/auth';
import './Login.css';
import { setTokens } from '../utils/auth';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload = { email, password };

        try {
            const response = await loginUser(payload);
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            // Store tokens using utility function
            setTokens(accessToken, refreshToken);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                err.response?.data?.detail ||
                'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
        //     // Store tokens in memory (recommended for security)
        //     // Or use sessionStorage for tab-scoped storage
        //     sessionStorage.setItem('accessToken', accessToken);
        //     if (refreshToken) {
        //         sessionStorage.setItem('refreshToken', refreshToken);
        //     }

        //     // Set default authorization header
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        //     // Navigate to dashboard
        //     navigate('/dashboard');
        // } catch (err) {
        //     console.error('Login error:', err);
        //     setError(
        //         err.response?.data?.message || 
        //         err.response?.data?.detail ||
        //         'Login failed. Please check your credentials.'
        //     );
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className='main_container'>
            <div className='left_container'>
                <img alt="LogIn" src={require('../assets/signin_img.png')} />
                <p style={{ color: 'white', fontSize: '20px' }}>
                    Digital door to your library
                </p>
            </div>
            <div className='login'>
                <h1>Welcome back!</h1>
                <h4>Login to your account.</h4>

                {error && (
                    <div style={{
                        color: 'red',
                        padding: '10px',
                        marginBottom: '10px',
                        backgroundColor: '#ffebee',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <button
                        type='submit'
                        style={{ color: 'white' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p>
                    Don't have an account? {' '}
                    <Link to={'/signup'} style={{ color: 'blue' }}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}