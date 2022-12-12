import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function Library() {
    
	return (
		<div>
			<Navbar />
			<p className="text-4xl font-bold">Library</p>
		</div>
	);
}
