import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react'
import { ReactSession } from 'react-client-session';
import { useLocalStorage } from '../components/useLocalStorage/useLocalStorage';
import { useParams } from 'react-router'


export default function loginScreen() {
    ReactSession.setStoreType("memory");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [result, setResult] = useState({
        result: ''
    })

    const [data, setData] = useState([])

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the form data to the server
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            });
            const result = await response.json();

            if (result['result'] === 'Success') {
                console.log('Success');
                ReactSession.set("uid", result['id']);
                router.push({pathname: '/searchScreen'})
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => { //Sets form data when it is changed 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div class={styles.PageC}>
            <div class={styles.loginContainer}>
                <h2>SIGN IN</h2>
                <div class={styles.loginBox}>
                    <form class={styles.formAlign} onSubmit={handleSubmit}>
                        <label class={styles.label} for='userName'> Email :</label><br></br>
                        <input class={styles.input} type='email' id='userName' placeholder='Email@FDM.com' onChange={handleChange} name='email'></input><br></br>
                        <label class={styles.label} for='password'> Password : </label><br></br>
                        <input type='password' id='password' placeholder="*****************" class={styles.input} onChange={handleChange} name='password'></input><br></br>
                        <button class={styles.button} type='submit'>Login</button>
                    </form>
                    <Link href='/register'> Press this to register</Link>

                </div>

            </div>
            <img class={styles.logoImg} src="https://upload.wikimedia.org/wikipedia/commons/1/13/Fdm-logo-black.jpg" alt="FDM" width="250" height="250" />

        </div>
    );
}