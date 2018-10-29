/*ate variables.
Capture the User’s file.
Convert the file to a buffer.
Send the buffered file to IPFS
IPFS returns a hash.
Get the User’s MetaMask Ethereum address
Send the IPFS for storage on Ethereum.
Using MetaMask, User will confirm the transaction to Ethereum.
Ethereum contract will return a transaction hash number.
The transaction hash number can be used to generate a transaction receipt with information such as the amount of gas used and the block number.
The IPFS and Ethereum information will render as it becomes available in a table using Bootstrap for CSS
*/


import React, { Component } from ‘react’;
//import logo from ‘./logo.svg’;
import ‘./App.css’;
import web3 from ‘./web3’;
import ipfs from ‘./ipfs’;
import storehash from ‘./storehash’;

class App_2 extends Component{


	state = {
		
		ipfsHash:null,
		buffer:'',
		ethAddress:'',
		blockNumber:'',
		transactionHash:'',
		gasUsed:'',
		txReceipt:'',
	};

	captureFile = (event) => {
		event.stopPropogation()
		event.preventDefault()
		const file = event.target.files[0]
		let reader = new window.FileReader()
	}

	//will process buffer and set it to buffer variable

	convertToBuffer = async(reader) => {

			const buffer = await Buffer.from(reader.result);


			this.setState({buffer});
	}


	onClick = async() => {


		try{

			this.setState({blockNumber:"waiting.."});
			this.setState({gasUsed:"waiting.."});




			await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) =>{
				console.log(err, txReceipt);
				this.setState({txReceipt});
			});
			//await for txnreceipt



			await this.setState({blockNumber: this.state.txReceipt.blockNumber});
				await.this.setState({gasUsed: this.state.txReceipt.gasUsed});
			}//try
			catch(error){
				console.log(error);
			}
			//cattch

		}//onclick


		//USER METAMASK INFORMATION
		onSubmit = async(event) => {
			event.preventDefault();


			//bring in user metamask information
			const accounts = await.web3.eth.getAccounts();

			console.log("sending from metamaksk account: "+ accounts[0]);

			//obtaun contract address
			const ethAddress = await storehash.options.address;
			this.setState({ethAddress});


			//save documents to ipfs, return its hash#, and set hash# to state
			await.ipfs.add(this.state.buffer, (err, ipfsHash)) => {

				console.lgo(err, ipfsHash);
				//setState by setting ipfsHash to ipfsHash[0]
				this.setState({ipfsHash: ipfsHash[0].hash});
			}


		// call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
  		//return the transaction hash from the ethereum contract

  		storehash.methods.sendHash(this.state.ipfsHash).send({
  			from: accounts[0]
  		}, (error, transacitonHash) => {
  			conole.log(transacitonHash);
  			this.setState({transacitonHash});
  		
  		}); //storehash
		} //await ipfs.add
		}; //onsubmit

	

		render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <h1> Ethereum and IPFS with Create React App</h1>
          </header>
          
          <hr />
<Grid>
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input 
              type = "file"
              onChange = {this.captureFile}
            />
             <Button 
             bsStyle="primary" 
             type="submit"> 
             Send it 
             </Button>
          </Form>
<hr/>
 <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
  <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>
                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>
                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
                
                </tbody>
            </Table>
        </Grid>
     </div>
      );
    } //render
} //App
export default App;
	






	
}


export default App;