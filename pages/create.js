import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function Create() {
	return (
		<div>
        <Navbar />
				<p className="text-4xl font-bold">Create an NFT</p>
		</div>
	);
}
