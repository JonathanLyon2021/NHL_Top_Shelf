import { ethers, providers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");

	useEffect(() => {
		loadNFTs();
	}, []);

	async function loadNFTs() {
		const INFURA_PROJECT_ID = "460a2af81be44b31aed0e928f26cbc53";
		const infuraProvider = new providers.InfuraProvider(
			"goerli",
			INFURA_PROJECT_ID
		); //why dont we need like infura provider method? : ask J
		const tokenContract = new ethers.Contract(
			nftAddress,
			NFT.abi,
			infuraProvider
		);
		const marketContract = new ethers.Contract(
			nftMarketAddress,
			Market.abi,
			infuraProvider
		);
		const data = await marketContract.fetchMarketItems();
		//this is a json representation from ipfs for instanceof(description, image, name, etc.)
		const items = await Promise.all(
			data.map(async (i) => {
				const tokenId = Number(i.itemId.toString());
				const tokenUri = await tokenContract.tokenURI(tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(
					i.price.toString(),
					"ether"
				);
				const link = meta.data?.image?.split("ipfs://")[1];
				const url = `https://nftstorage.link/ipfs/${link}`;

				//We are mapping over the items array, setting this stuff to the item.
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: url || " ",
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
			nftMarketAddress,
			Market.abi,
			signer
		);

		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

		const transaction = await contract.createMarketSale(
			nftAddress,
			nft.tokenId,
			{
				value: price,
			}
		);
		await transaction.wait();
		loadNFTs(); //this should show the nft's that are not sold, technically speaking, "still available to purchase"
	}

	if (loadingState === "loaded" && !nfts.length)
		return (
			<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
		);

	return (
		<div>
			<div className="flex justify-center">
				<div className="px-4" style={{ maxWidth: "1600px" }}>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
						{nfts.map((nft, i) => (
							<div
								key={i}
								className="border shadow rounded-xl overflow-hidden"
							>
								<img src={nft.image} />
								<div className="p-4">
									<p
										style={{ height: "64px" }}
										className="text-2xl font-semibold"
									>
										{nft.name}
									</p>
									<div
										style={{
											height: "70px",
											overflow: "hidden",
										}}
									>
										<p className="text-gray-400">
											{nft.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
