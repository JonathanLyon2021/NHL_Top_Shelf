import {useState} from 'react';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {useRouter} from 'next/router';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import Link from "next/link";
export default function Library() {
    
	return (
		<div>
			<p className="text-4xl font-bold">My Assets</p>
		</div>
	);
}
