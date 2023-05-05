import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Search from '../components/Search/Search';
import Link from 'next/link'
import { useEffect } from 'react';
import Login from './loginScreen';


//To run program use 'npm run dev'

export default function Home() {


    return (
        <div>
            <Login></Login>
        </div>
  );
}