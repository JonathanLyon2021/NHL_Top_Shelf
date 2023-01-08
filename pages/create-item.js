import { useState, useRef } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import { NFTStorage } from "nft.storage";
import { nftAddress, nftMarketAddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function CreateItem() {
	const fileUpload = useRef(null);
	//const apiKey =
	//	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxMzJkMThmZDQ4NjRlNzAxNjUwMzQwNThFOGQyNjkyOTREZDg5ZTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzIwODM4MjQ1OTMsIm5hbWUiOiJuZnRUb2tlbiJ9._YJPyY76oRQ6zxCOf7SIu-7r9BvajqY_GVF8QzyLuDk";
	const apiKey =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUwZGY2N0QwMDE3MjVlMDNGNzk1MzRBODVGNWJiYTVBYjE2Y2M2YTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MjYwMTEzNDcwMSwibmFtZSI6Im5obFRvcFNoZWxmIn0.TR6Sb2qeZI-svNnSLbW7u7CTwRXwDOxKtRKVk4l0hhc";
	const client = new NFTStorage({ token: apiKey });
	// const fileInput = document.querySelector('input[type="file"]');
	const [fileUrl, setFileUrl] = useState(null);
	const [formInput, updateFormInput] = useState({
		price: "",
		name: "",
		description: "",
	});
	const router = useRouter();

	async function onChange(e) {
		try {
			const url = URL.createObjectURL(fileUpload.current.files[0]);
			setFileUrl(url);
		} catch (e) {
			console.log("Error:", e);
		}
	}

	//creates item and saves it to ipfs
	async function createItem() {
		const { name, description, price } = formInput;
		if (!name || !description || !price || !fileUrl) return;

		try {
			const { name, type } = fileUpload.current.files[0];
			console.log("new File:", new File(fileUpload.current.files, name, {
				type,
			}), )
			const metadata = await client.store({
				name,
				description,
				image: new File(fileUpload.current.files, name, {
					type,
				}),
				properties: {
					price,
				},
			});
			const link = metadata.url.split("ipfs://")[1];
			const url = `https://nftstorage.link/ipfs/${link}`;

			//createSale(uploaded.image.href);
			console.log("url:", url);
			createSale(url);
		} catch (e) {
			console.log("Error uploading file: ", e);
		}
	}

	async function createSale(metadata) {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
		let transaction = await contract.createToken(metadata);
		let tx = await transaction.wait();
		let event = tx.events[0];
		let value = event.args[2];
		let tokenId = value.toNumber();
		const price = ethers.utils.parseUnits(formInput.price, "ether");

		contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		transaction = await contract.createMarketItem(
			nftAddress,
			tokenId,
			price,
			{
				value: listingPrice,
			}
		);
		await transaction.wait();
		router.push("/");
	}

	return (
		<div className="flex justify-center">
			<div className="w-1/2 flex flex-col pd-12">
				<input
					placeholder="Asset Name"
					className="mt-8 border rounded p-4"
					onChange={(e) =>
						updateFormInput({ ...formInput, name: e.target.value })
					}
				/>
				<textarea
					placeholder="Asset Description"
					className="mt-2 border rounded p-4"
					onChange={(e) =>
						updateFormInput({
							...formInput,
							description: e.target.value,
						})
					}
				/>
				<input
					placeholder="Asset Price in Goerli"
					className="mt-2 border rounded p-4"
					onChange={(e) =>
						updateFormInput({ ...formInput, price: e.target.value })
					}
				/>
				<input
					ref={fileUpload}
					type="file"
					name="Asset"
					className="my-4"
					onChange={onChange}
				/>
				{fileUrl && (
					<img className="rounded mt-4" width="350" src={fileUrl} />
				)}
				<button
					onClick={createItem}
					className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
				>
					Create Digital Asset
				</button>
			</div>

			<p className="text-4xl font-bold">Create an NFT</p>
		</div>
	);
}


