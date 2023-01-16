import transferToken from './token/transfer-token/index.js';
const main = async () => {
   
    const account = [
        "metal"
    ];

    for(let i = 0; i < account.length; i++){
        await transferToken({
                        tokenContract: 'eosio.token',
                        to: account[i],
                        quantity: '2422.0000 XPR',
                        memo: ''
        })
    }
}

main()