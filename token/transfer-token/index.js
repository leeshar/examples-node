import {JsonRpc, Api, JsSignatureProvider} from '@proton/js';
import fetch from 'node-fetch';

const ENDPOINT = 'https://proton.greymass.com';
const ACCOUNT_PERMISSION='active';
const ACCOUNT='';
const PRIVATE_KEY='';


const rpc = new JsonRpc([ENDPOINT], { fetch: fetch })
const api = new Api({ rpc, signatureProvider: new JsSignatureProvider([PRIVATE_KEY])})

const transferToken = async ({ tokenContract, to, quantity, memo }) => {
    await api.transact({actions: [{
        account: tokenContract,
        name: 'transfer',
        data: {
            from: ACCOUNT,
            to,
            quantity,
            memo
        },
        authorization: [{ actor: ACCOUNT, permission: ACCOUNT_PERMISSION }]
    }]}, {
        blocksBehind: 3,
        expireSeconds: 30,
    }).then(res => {
        console.log(res.transaction_id, 'txid', to, 'to');
    })
    console.log(`${quantity} successfully transferred from ${ACCOUNT} to ${to}`)
}

export default transferToken;