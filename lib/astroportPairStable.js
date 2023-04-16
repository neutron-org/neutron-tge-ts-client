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
    queryPair = async () => {
        return this.client.queryContractSmart(this.contractAddress, { pair: {} });
    };
    queryPool = async () => {
        return this.client.queryContractSmart(this.contractAddress, { pool: {} });
    };
    queryConfig = async () => {
        return this.client.queryContractSmart(this.contractAddress, { config: {} });
    };
    queryShare = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { share: args });
    };
    querySimulation = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { simulation: args });
    };
    queryReverseSimulation = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { reverse_simulation: args });
    };
    queryCumulativePrices = async () => {
        return this.client.queryContractSmart(this.contractAddress, { cumulative_prices: {} });
    };
    queryQueryComputeD = async () => {
        return this.client.queryContractSmart(this.contractAddress, { query_compute_d: {} });
    };
    receive = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { receive: {} }, fee || "auto", memo, funds);
    };
    provideLiquidity = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { provide_liquidity: args }, fee || "auto", memo, funds);
    };
    swap = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { swap: args }, fee || "auto", memo, funds);
    };
    updateConfig = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || "auto", memo, funds);
    };
    proposeNewOwner = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { propose_new_owner: args }, fee || "auto", memo, funds);
    };
    dropOwnershipProposal = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { drop_ownership_proposal: {} }, fee || "auto", memo, funds);
    };
    claimOwnership = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { claim_ownership: {} }, fee || "auto", memo, funds);
    };
}
exports.Client = Client;
