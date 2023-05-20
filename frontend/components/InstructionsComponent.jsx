//https://random-data-api.com/api/v2/users
import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useSigner, useNetwork, useBalance} from 'wagmi'
export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>dapp</h1>
			</header>

			<div className={styles.buttons_container}>
				<PageBody></PageBody>
			</div>

			<div>Footer</div>
		</div>
	);
}

function PageBody() {
	return (
		<div>
			<WalletInfo></WalletInfo>
			<RequestTokens></RequestTokens>
		</div>
	)
}

function WalletInfo() {
	// the below two lines gives a dynamic response by injecting data to render
	const { data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();
	if (signer) return (
		<>
			<p>Your account address is {signer._address}</p>
			<p>Connected to the {chain.name} network</p>
			<button onClick={() => signMessage(signer,"I love potato")}>Sign</button>
			<WalletBalance></WalletBalance>
			<ApiInfo></ApiInfo>
		</>
	)
	else if (isLoading) return (
		<>
			<p>Loading...</p>
		</>
	)
	else return (
		<>
			<p>Connect account to continue</p>
		</>
	)
}

function signMessage(signer, message) {
	signer.signMessage(message).then(
		(signature)=>{console.log(signature)},
	    (error) =>{console.log(error);
	})
}

function WalletBalance(){
	const { data: signer } = useSigner();
	const { data, isError, isLoading } = useBalance({
		address: signer._address,
	  })
	 
	  if (isLoading) return <div>Fetching balance…</div>
	  if (isError) return <div>Error fetching balance</div>
	  return (
		<div>
		  Balance: {data?.formatted} {data?.symbol}
		</div>
	  )
}

function ApiInfo() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);

	useEffect(()=>{
		setLoading(true);
		fetch('https://random-data-api.com/api/v2/users')
		.then((res) => res.json())
		.then((data) => {
			console.log("bab", data)
			setData(data);
			setLoading(false);
		});
	},[])

	if(isLoading) return <p> Loading ...</p>
	if(!data) return <p> No profile data...</p>

	return (
		<div>
			<h3>{data.username}</h3>
			<h3>{data.email}</h3>
		</div>
	)
}

function RequestTokens() {
	const { data: signer } = useSigner();
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(null);
	console.log("amir", txData);
	if(txData) return (
		<div>
			<p>Transaction completed</p>
			<a href={"https://goerli.etherscan.io/tx/" + txData.hash} target="_blank">{txData.hash}</a>
		</div>
	)
	if(isLoading) return <p>Requesting tokens to be minted...</p>;
	return (
		<div>
			<button onClick={() => {requestTokens(signer, "signature", setLoading, setTxData)}}>RequestTokens</button>
		</div>
	)
}

function requestTokens(signer, signature, setLoading, setTxData) {
       console.log("valeu", signer._address)
		setLoading(true);
		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({address: signer._address, signature: signature})
		};
		console.log("val", requestOptions);
		fetch('http://localhost:3001/request-tokens', requestOptions)
			.then((res) => res.json())
			.then((data) => {
				console.log("datahash", data)
				setTxData(data);
				setLoading(false);
			}).catch((error) =>{
				console.log("errorsing", error)
			})
		;
}