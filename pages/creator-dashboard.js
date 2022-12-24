import {useState} from 'react';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {useRouter} from 'next/router';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import Link from "next/link";
import Navbar from "../components/navbar";

export default function Dashboard() {
	return (
		<div>
        <Navbar />
				<p className="text-4xl font-bold">Dashboard</p>
		</div>
	);
}
