export const CONFIG = {
    WEB3_PROVIDER_URL: 'https://godwoken-testnet-web3-rpc.ckbapp.dev',
    ROLLUP_TYPE_HASH: '0x4cc2e6526204ae6a2e8fcf12f7ad472f41a1606d5b9624beebd215d780809f6a',
    ETH_ACCOUNT_LOCK_CODE_HASH: '0xdeec13a7b8e100579541384ccaf4b5223733e4a5483c3aec95ddc4c1d5ea5b22',
    DEFAULT_SEND_OPTIONS: {
        gas: 6000000
    },
    CONSTANTS: {
        ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
        //SCORES_CONTRACT_ADDRESS: "0xf1AfcEd1515019F0113c87A63147885F28E10E97"
        //SCORES_CONTRACT_ADDRESS: "0xf1afced1515019f0113c87a63147885f28e10e97"
        SCORES_CONTRACT_ADDRESS: "0x340ad995e6d73a33003041146a85b4d3d9f622fa"
    }
} as const;
