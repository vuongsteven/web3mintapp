import { useState } from 'react';
import { ethers , BigNumber } from 'ethers'; //package allows you to connect to the blockchain (alternative to web3.js)
import radiantRobosNFT from './RadiantRobosNFT.json';
import { Box, Flex, Button, Input, Text} from '@chakra-ui/react';

const radiantRoboAddress = "0xCCe950f39Cb6776d3dcfCfAe8D1D64fF6859fC97";

const MainMint = ( { accounts, setAccounts } ) => {
    const [ mintAmount , setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if(window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum); //allows for ethers to connect to the blockchain
            const signer = provider.getSigner(); //anytime you need to make a transaction, you need something to sign it
            const contract = new ethers.Contract (
                radiantRoboAddress,
                radiantRobosNFT.abi,
                signer
            );
            try {
                const response = await contract.mintRadiantRobos(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.05 * mintAmount).toString())
                });
                console.log('response: ' + response);
            }catch(err) {
                console.log(err);
            }
        }
    }

    const handleDecrement = () => {
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if(mintAmount >= 2) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" paddingBottom="320px" height="100vh">
            <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000000">Radiant Robos</Text>
                <Text fontSize="26px" font-family="VT323" letterSpacing="-5.5%" textShadow="0 2px 2px #000000">Defy the limits. Become Radiant.</Text>
            </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#D6517D"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            borderRadius="5px"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick = {handleDecrement}
                            >
                            -</Button>
                        <Input 
                            readOnly
                            width="100px"
                            height="40px"
                            textAlign="center"
                            fontFamily="inherit"
                            marginTop="10px"
                            paddingLeft="19px"

                            type="number" value={mintAmount}/>
                        <Button 
                            backgroundColor="#D6517D"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            borderRadius="5px"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleIncrement}
                            >+
                            </Button>
                    </Flex>
                    <Button 
                        backgroundColor="#D6517D"
                        fontFamily="inherit"
                        marginTop="10px"
                        cursor="pointer"
                        color="white"
                        padding="5px"
                        borderRadius="5px"
                        onClick={handleMint}
                        >
                        MINT NOW
                        </Button>
                </div>
            ) : (
                <Text marginTop="70px" letterSpacing="-5.5%" color="#D6517D">Connect to mint a Radiant Robo!</Text>
            )}
            </Box>
        </Flex>
    )
}

export default MainMint;



