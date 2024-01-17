import React, { useEffect, useState, FunctionComponent } from 'react';
import { Navbar, Image, Container, Nav, Dropdown, OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import Link from 'next/link'; 
import logo from "../../assets/images/logo.png";
import { useAccount, useConnect, useDisconnect, useConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { FaEthereum } from "react-icons/fa";
import { BiInfoCircle, BiPowerOff } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import metamask from "../../assets/images/metamask.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const HeaderNew: FunctionComponent = () => {
    const [copyTextSourceCode, setCopyTextSourceCode] = useState<string>("Copy address to clipboard");
    const { address, isConnected } = useAccount();
    const [getNetwork, setNetwork] = useState<string | undefined>();
    const [checkMetaMask, setCheckMetaMask] = useState<boolean>(false);
    const { chain } = useAccount();
    const { chains } = useConfig();
    const { connect } = useConnect();

    useEffect(() => {
        if (isConnected) {
            console.log('Success', { address, chainId: chain?.id });
            setCheckMetaMask(false);
        } else {
            setCheckMetaMask(true);
        }
    }, [isConnected, address, chain]);
    const { disconnect } = useDisconnect();
    const handleDisconnect = async () => {
        await disconnect()
    }
    useEffect(() => {
        if (chain?.id == 90001 || chain?.id == 11155111) {
            setNetwork(chain.name)
            console.log(chain.name);
        }
        else {
            setNetwork("Unsupported Network")
        }
    }, [chain]);
    const handleSourceCopy = () => {
        if (copyTextSourceCode === "Copy address to clipboard") {
            setCopyTextSourceCode("Copied.")
        }
    }
    const renderTooltip = (props: TooltipProps) => (
        <Tooltip id="button-tooltip" {...props}>
            {copyTextSourceCode}
        </Tooltip>
    );
    return (
        <>
            <header className='app_header'>
                <Navbar expand="lg" variant="dark">
                    <Container fluid>
                        <Link href="/" className='app_logo'>
                            <Image src={logo.src} alt="logo" fluid/>
                        </Link>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >

                            </Nav>
                            <div className='right_header_wrap'>

                                <div className='header_btn_wrap'>
                                    {
                                        isConnected ? <button className='btn disconnect_btn header_btn me-2'>{getNetwork}</button> : ""
                                    }

                                    {/* {
                                    getNetwork !== "Unsupported Network" ? <button className='btn disconnect_btn header_btn me-2'><FaEthereum /> {getNetwork}</button> : <button className='btn disconnect_btn header_btn me-2'><BiInfoCircle /> {getNetwork} </button>
                                } */}
                                </div>
                                {/* <div className='header_btn_wrap'>

{address ? <button className='btn disconnect_btn header_btn' onClick={() => handleDisconnect()}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAsElEQVRYR2PslBX+z4AHHLiVgiLroDYHn3IGUtUzjjpg0IUAehyiRzipaYCQfow0MOoAuoeA5/dylHIAPY7RHWSt9Q5vOXD0mhDecgPdPMZRBwx4CJBaEOFNAFgkCZUbJNcFow4YDYHREBjwEKC0LkD3AMnlwKgDqB4CLYqpKO0BQvX5b5YgvOmQ9c86FHlC7QnGUQcMeAigN0jQIxg90aGnEUrVY7QJKTWQVAePOgAAXAoAZIiZ6M4AAAAASUVORK5CYII=" alt="Profile Icon" />
                                    {address.slice(0, 5)}...{address.slice(-5)}</button> : <button onClick={() => connect()} className='btn disconnect_btn header_btn'>Connect Wallet</button>}
                            </div> */}

                                <div className='dropdown_wrap'>
                                    {checkMetaMask === true ? <a className='btn disconnect_btn header_btn' href='https://metamask.io/' target='_blank' rel='noopener noreferrer'><Image src={metamask} alt="metamask icn" fluid/> Please Install Metamask Wallet</a> : address ? <Dropdown>
                                        <Dropdown.Toggle variant="success" id="swan_header_dropdown" >
                                            {address.slice(0, 5)}...{address.slice(-5)}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className='user_profile_wrap'>
                                                <figure className='user_profile'>
                                                    <Image src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAsElEQVRYR2PslBX+z4AHHLiVgiLroDYHn3IGUtUzjjpg0IUAehyiRzipaYCQfow0MOoAuoeA5/dylHIAPY7RHWSt9Q5vOXD0mhDecgPdPMZRBwx4CJBaEOFNAFgkCZUbJNcFow4YDYHREBjwEKC0LkD3AMnlwKgDqB4CLYqpKO0BQvX5b5YgvOmQ9c86FHlC7QnGUQcMeAigN0jQIxg90aGnEUrVY7QJKTWQVAePOgAAXAoAZIiZ6M4AAAAASUVORK5CYII=' alt="Profile Icon" />
                                                </figure>
                                                <h4>{address.slice(0, 5)}...{address.slice(-5)}
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 250 }}
                                                        overlay={renderTooltip}>
                                                        <CopyToClipboard text={address}>
                                                            <span className="d-inline-block"><MdContentCopy onClick={handleSourceCopy} /> </span>
                                                        </CopyToClipboard>
                                                    </OverlayTrigger>
                                                </h4>
                                            </div>
                                            <Link href="/account/deposit">
  <Dropdown.Item><AiOutlineDownload /> View Deposit</Dropdown.Item>
</Link>
<Link href="/account/withdraw">
  <Dropdown.Item><AiOutlineUpload /> View Withdrawals</Dropdown.Item>
</Link>
                                            <Dropdown.Item onClick={() => handleDisconnect()}><BiPowerOff /> Disconnect</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> : <button onClick={() => connect({connector: injected() })} className='btn disconnect_btn header_btn'>Connect Wallet</button>}
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}
export default HeaderNew