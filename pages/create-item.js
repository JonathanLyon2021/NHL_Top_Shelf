import {useState} from 'react';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {useRouter} from 'next/router';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import Link from "next/link";
import Navbar from "../components/navbar";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import { nftaddress, nftmarketaddress } from "../config";

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function CreateItem() {
	const [fileUrl, setFileUrl] = useState(null);
	const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
	const router = useRouter();

	async function onChange(e) {
		const file = e.target.files[0];
		try {
			const added = await client.add(
				file,
				{
					progress: (prog) => console.log(`received: ${prog}`)
				}
			)
			const url = `https://ipfs.infura.io/ipfs/${added.path}`
			setFileUrl(url);
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div>
        <Navbar />
				<p className="text-4xl font-bold">Create an NFT</p>
		</div>
	);
}
