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
	
	async function createSale() {
		
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		//why are we interacting with two contracts here?
		let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
		let transaction = await contract.createToken(url);
		let tx = await transaction.wait();

		let event = tx.events[0];
		let value = event.args[2]; //args[2]???? what is the 3rd position of args about??? : Jason
		let tokenId = value.toNumber();

		const price = ethers.utils.parseUnits(formInput.price, 'ether');

		contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice });

	}
	return (
		<div>
        <Navbar />
				<p className="text-4xl font-bold">Create an NFT</p>
		</div>
	);
}
