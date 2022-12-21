import Navbar from "../components/navbar";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");

	useEffect(() => {
		loadNFTs();
	}, []);
  
	async function loadNFTs() {
		const provider = new ethers.providers.JsonRpcProvider();
		const tokenContract = new ethers.Contract(
			nftaddress,
			NFT.abi,
			provider
		);
		const marketContract = new ethers.Contract(
			nftmarketaddress,
			Market.abi,
			provider
		);
		const data = await marketContract.fetchMarketItems();
		
		//this is a json representation from ipfs for instanceof(description, image, name, etc.)
		const items = await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(
					i.price.toString(),
					"ether"
				);
				//we are setting this stuff to the item
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
					name: meta.data.name,
					description: meta.data.description,
				};
				return item;
			})
		);
		setNfts(items);
		setLoadingState("loaded"); //set loading state to loaded
	}
	
	async function buyNft(nft) {
		//web3Modal connects to the wallet
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);

		const signer = provider.getSigner();
		const contract = new ethers.Contract(
			nftmarketaddress,
			Market.abi,
			signer
		);

		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

		const transaction = await contract.createMarketSale(
			nftaddress,
			nft.tokenId,
			{
				value: price,
			}
		);
		await transaction.wait();
		loadNFTs(); //this should show the nft's that are not sold, technically speaking one's that are "still available to purchase"
	}
	
	if (loadingState === "loaded" && !nfts.length)
		return (
			<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
		);
}
