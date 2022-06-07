import React from 'react';
import { Box, Flex, Button, Image, Link, Spacer } from '@chakra-ui/react';
import Twitter from './assets/social-media-icons/twitter_32x32.png';
import Email from './assets/social-media-icons/email_32x32.png';
import discord from './assets/social-media-icons/discord.png';

const NavBar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        //grabs accounts address from metamask
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts", //gets accounts from metamask wallet
            });
            setAccounts(accounts);
        }
    }
    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/* Social media icons will be displayed here*/}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.twitter.com/noberinos">
                    <Image src = {Twitter} boxSize="42px" margin="0 15px"/>
                </Link>
                <Link href="https://www.discord.com">
                    <Image src = {discord} boxSize="42px" margin="0 15px"/>
                </Link>
                <Link href="https://gmail.com">
                    <Image src = {Email} boxSize="42px" margin="0 15px"/>
                </Link>
            </Flex>
            {/* Connect button and sections */}
            <Flex justify="space-between" align="center" width="30%" padding="30px">
            <Box margin="0 15px">About</Box>
            <Spacer />
            <Box margin="0 15px">Mint</Box>
            <Spacer />
            {/* Connect Button */}
            { isConnected ? (
                <Box margin="0 15px">Connected</Box>
            ) : (
                <Button backgroundColor="#008080" color="white" cursor="pointer" fontFamily="inherit" variant="solid" borderRadius="5px" margin="0 15px" onClick={connectAccount}>Connect</Button>
            )}
            </Flex>

        </Flex>
    )
};

export default NavBar;