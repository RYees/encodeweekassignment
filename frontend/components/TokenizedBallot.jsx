//https://random-data-api.com/api/v2/users
import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from 'react-modal'
import {useSigner, useNetwork, useBalance} from 'wagmi';
const customStyles = {
    overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
       top: '50%',
       left: '50%',
       right: 'auto',
       bottom: 'auto',
       marginRight: '-50%',
       transform: 'translate(-50%, -50%)'
    }
 }

export default function TokenizedBallot() {
	const router = useRouter();
	return (
		<div className='text-white'>
			<header className=''>
				<h1 className="text-blue-500 flex justify-center mb-10 text-5xl font-bold">Tokenized Voting System</h1>
			</header>

			<div className=''>
				<PageBody></PageBody>
			</div>

			{/* <div>Footer</div> */}
		</div>
	);
}

function PageBody() {
	return (
		<div>
			<WalletInfo></WalletInfo>
            <div className="flex flex-wrap mx-44 mt-10">                
                <GrantMinterRole></GrantMinterRole>
                <RequestTokens></RequestTokens>
                <CheckBalance></CheckBalance>
                <CheckVotingPower></CheckVotingPower>
                <Delegate></Delegate>
                <Vote></Vote>
                <TransferToken></TransferToken>
                <QueryFinalResult></QueryFinalResult>
                {/* <WinnerProposal></WinnerProposal> */}
            </div>
		</div>
	)
}


function WalletInfo() {
	// the below two lines gives a dynamic response by injecting data to render
	const { data: signer, isError, isLoading } = useSigner();
	const { chain, chains } = useNetwork();
	if (signer) return (
		<>
            <p className="float-right mr-5 text-green-400">Connected to the {chain.name} network</p><br></br>
			<p className="float-right mr-5">{signer._address}</p>
			
			<button className="m-2 bg-yellow-400 p-3 rounded text-black text-xl hover:bg-yellow-300"
             onClick={() => signMessage(signer,"I love potato")}>
                Sign
            </button>

			<br></br>
            <WalletBalance></WalletBalance>
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
        
		<div className="float-right -mt-10 mr-5 text-red-200">
		  Balance: {data?.formatted} {data?.symbol}
		</div>
	  )
}

function GrantMinterRole() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
    	
	return (
		<div>
            <button className="m-2 bg-red-900 text-white py-10 px-10 w-64 rounded text-xl hover:bg-red-800"
             onClick={() => setIsOpen(true)}>
                GrantMinterRole
            </button>

            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                <input type="text" placeholder="put address" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">Grant</button>
            </Modal>
		</div>
	)
}

function CheckBalance() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
            <button className="m-2 bg-red-900 text-white py-10 px-10 w-64 rounded text-xl hover:bg-red-800"
              onClick={() => setIsOpen(true)}>
                CheckBalance
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                <div>Eth Value:</div><br></br>
                <input type="text" placeholder="put address" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">Show</button>
            </Modal>
		</div>
	)
}

function CheckVotingPower() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-56 rounded text-xl hover:bg-red-800"
             onClick={() => setIsOpen(true)}>
                CheckVotingPower
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                <div>Voting Power:</div><br></br>
                <input type="text" placeholder="put address" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">Show</button>
            </Modal>
		</div>
	)
}

function Delegate() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-64 rounded text-xl hover:bg-red-800"
             onClick={() => setIsOpen(true)}>
                Delegate
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                <input type="text" placeholder="put address" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">Delegate</button>
            </Modal>
		</div>
	)
}

function Vote() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-56 rounded text-xl hover:bg-red-800"
            onClick={() => setIsOpen(true)}>
                Vote
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end ml-32 -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                
                <input type="text" placeholder="voting on" className="mb-3 w-full border py-2 px-3" />
                <input type="number" placeholder="voting amount" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">Vote</button>
            </Modal>
		</div>
	)
}

function TransferToken() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-64 rounded text-xl hover:bg-red-800"
            onClick={() => setIsOpen(true)}>
                TransferToken
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96 ml-32">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>

                <input type="text" placeholder="to address" className="mb-3 w-full border py-2 px-3" />
                <input type="number" step={1} placeholder="token amount" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">
                    Transfer                      
                </button>
            </Modal>
		</div>
	)
}

function QueryFinalResult() {
	const [data, setData] = useState(null);
	const[isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-56 rounded text-xl hover:bg-red-800"
            onClick={() => setIsOpen(true)}>
                FinalResult
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                <div className="flex flex-col">
                    <p>Votee:&ensp;<strong className="font-bold">1</strong></p>
                    <p>Votee:&ensp;<strong className="font-bold">2</strong></p>
                    <p className="mb-5">Votee:&ensp;<strong className="font-bold">3</strong></p>
                    <h1 className="flex justify-center">Winner&ensp; <strong className="-mt-3 text-green-400 font-bold text-4xl">votee 3</strong></h1>
                </div>
            </Modal>
		</div>
	)
}
function WinnerProposal() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] =  useState(false);
    const [isOpen, setIsOpen] = useState(false);
	
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-56 rounded text-xl hover:bg-red-800"
            onClick={() => setIsOpen(true)}>
                WinnerProposal
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96">
                    <button className="hover:text-red-600 hover:font-bold" onClick={() => setIsOpen(false)}>Close</button>
                </div> <br></br>
                <div>Eth Value:</div><br></br>
                <input type="text" placeholder="put address" className="mb-3 w-full border py-2 px-3" />
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4">Show</button>
            </Modal>
		</div>
	)
}

function RequestTokens() {
	const { data: signer } = useSigner();
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        address: '',
        amount: ''
      });
    
    const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
    }
    console.log("mad", form);
	return (
		<div>
			<button className="m-2 bg-red-900 text-white py-10 px-10 w-56 rounded text-xl hover:bg-red-800"
                onClick={() => setIsOpen(true)}
            >
                RequestToken
            </button>
            {/* onClick={() => setIsOpen(true)} */}
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div className="flex justify-end -mt-5 w-96 ml-32">
                    <button className="hover:text-red-600 hover:font-bold"
                    onClick={() => setIsOpen(false)}>
                        Close
                    </button>
                </div> <br></br>
                <div>
                    {txData ? 
                        <div>
                            <a href={"https://goerli.etherscan.io/tx/" + txData.hash} target="_blank">{txData.hash}</a>
                        </div>
                    : null }
                    {isLoading ? <p>Requesting tokens to be minted...</p> : null}   
                </div><br></br>
                <input type="text" placeholder="put address" className="mb-3 w-full border py-2 px-3" value={form.address}
                    onChange={(e) => handleFormFieldChange('address', e)} />
                <input type="number" step={1} placeholder="put amount" className="mb-3 w-full border py-2 px-3" value={form.amount}
                    onChange={(e) => handleFormFieldChange('amount', e)}/>
                <button className="mx-1 bg-blue-900 p-2 rounded text-white px-4"
                 onClick={() => {requestTokens(signer, "signature", setLoading, setTxData)}}>
                 Show
                </button>
            </Modal>
		</div>
	)
}

function requestTokens(signer, signature, setLoading, setTxData) {
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