// import { Link } from 'react-router-dom';
// import './SignUp.css';
// export default function Signup() {
//     return (
//         <div className="main_container">
//             <div className='signup'>
//                 <h1>Create Your Account</h1>
//                 <h4>Make your library management easy</h4>
//                 <div className='name'>
//                     <div>
//                         <span>First Name</span>
//                         <input type='name' placeholder='Rajesh' />
//                     </div>
//                     <div>
//                         <span>Last Name</span>
//                         <input type='name' placeholder='Hamal' />
//                     </div>
//                 </div>
//                 <span>Email</span>
//                 <input type='email' placeholder='hamalrajesh62@gmail.com' />
//                 <span>Password</span>
//                 <input type='password' placeholder='********' />
//                 <span>Confirm Password</span>
//                 <input type='password' placeholder='********' />
//                 <p></p>
//                 <button style={{ color: 'white' }}>Sign Up</button>
//                 <p>Already have an account? <Link to={'/login'} style={{ color: 'blue' }}>Sign In.</Link></p>
//             </div>
//             <div className='right-container'>
//                 <img alt="Signup" src={require('../assets/singup_img.png')}></img>
//             </div>
//         </div>
//     )
// }

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../api/auth';
import './SignUp.css';

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            email: form.email,
            full_name: `${form.firstName} ${form.lastName}`,
            password: form.password,
            password2: form.password2,
        };

        registerUser(payload)
            .then(() => {
                alert("Account created successfully!");
                navigate("/login");
            })
            .catch((err) => {
                setErrors(err.response?.data || {});
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="main_container">
            <div className='signup'>
                <h1>Create Your Account</h1>
                <h4>Make your library management easy</h4>

                <form onSubmit={handleSubmit}>
                    <div className='name'>
                        <div>
                            <span>First Name</span>
                            <input
                                type='text'
                                name="firstName"
                                placeholder='Rajesh'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Last Name</span>
                            <input
                                type='text'
                                name="lastName"
                                placeholder='Hamal'
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <span>Email</span>
                    <input
                        type='email'
                        name="email"
                        placeholder='hamalrajesh62@gmail.com'
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email[0]}</p>}

                    <span>Password</span>
                    <input
                        type='password'
                        name="password"
                        placeholder='********'
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password[0]}</p>}

                    <span>Confirm Password</span>
                    <input
                        type='password'
                        name="password2"
                        placeholder='********'
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={loading} style={{ color: 'white' }}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p>
                    Already have an account?
                    <Link to={'/login'} style={{ color: 'blue' }}> Sign In.</Link>
                </p>
            </div>

            <div className='right-container'>
                <img alt="Signup" src={require('../assets/singup_img.png')} />
            </div>
        </div>
    );
}
