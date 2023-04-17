# TGE Typescript client
So example:
```typescript

const client = await SigningCosmWasmClient.connectWithSigner(
    `https://rpc.rehearsal2.rs-testnet.polypore.xyz`,
    offlineSigner,
    {
        gasPrice,
    }
);

const auctionClient = new NeutronAuction.Client(client, "neutron1unrweswtzadqmxz5qt2ws44rpf39kwqtk064vy0u5n0lkmsqdrxs4f65ha");
const res = await auctionClient.setTokenInfo(address, {
    atom_denom: "uatom",
    usdc_denom: "uusd",
});

```