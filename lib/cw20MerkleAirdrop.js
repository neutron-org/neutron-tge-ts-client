"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
function isSigningCosmWasmClient(client) {
    return 'execute' in client;
}
class Client {
    client;
    contractAddress;
    constructor(client, contractAddress) {
        this.client = client;
        this.contractAddress = contractAddress;
    }
    mustBeSigningClient() {
        return new Error("This client is not a SigningCosmWasmClient");
    }
    queryConfig = async () => {
        return this.client.queryContractSmart(this.contractAddress, { config: {} });
    };
    queryMerkleRoot = async () => {
        return this.client.queryContractSmart(this.contractAddress, { merkle_root: {} });
    };
    queryIsClaimed = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { is_claimed: args });
    };
    queryTotalClaimed = async () => {
        return this.client.queryContractSmart(this.contractAddress, { total_claimed: {} });
    };
    queryAccountMap = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { account_map: args });
    };
    queryAllAccountMaps = async () => {
        return this.client.queryContractSmart(this.contractAddress, { all_account_maps: {} });
    };
    queryIsPaused = async () => {
        return this.client.queryContractSmart(this.contractAddress, { is_paused: {} });
    };
    claim = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { claim: args }, fee || "auto", memo, funds);
    };
    withdrawAll = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { withdraw_all: {} }, fee || "auto", memo, funds);
    };
    pause = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { pause: {} }, fee || "auto", memo, funds);
    };
    resume = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { resume: {} }, fee || "auto", memo, funds);
    };
}
exports.Client = Client;
