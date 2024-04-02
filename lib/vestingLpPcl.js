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
    static async instantiate(client, sender, codeId, initMsg, label, fees, initCoins) {
        const res = await client.instantiate(sender, codeId, initMsg, label, fees, {
            ...(initCoins && initCoins.length && { funds: initCoins }),
        });
        return res;
    }
    static async instantiate2(client, sender, codeId, salt, initMsg, label, fees, initCoins) {
        const res = await client.instantiate2(sender, codeId, new Uint8Array([salt]), initMsg, label, fees, {
            ...(initCoins && initCoins.length && { funds: initCoins }),
        });
        return res;
    }
    queryConfig = async () => {
        return this.client.queryContractSmart(this.contractAddress, { config: {} });
    };
    queryVestingAccount = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { vesting_account: args });
    };
    queryVestingAccounts = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { vesting_accounts: args });
    };
    queryAvailableAmount = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { available_amount: args });
    };
    queryTimestamp = async () => {
        return this.client.queryContractSmart(this.contractAddress, { timestamp: {} });
    };
    queryVestingState = async () => {
        return this.client.queryContractSmart(this.contractAddress, { vesting_state: {} });
    };
    queryManagedExtension = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { managed_extension: args });
    };
    queryWithManagersExtension = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { with_managers_extension: args });
    };
    queryHistoricalExtension = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { historical_extension: args });
    };
    claim = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { claim: args }, fee || "auto", memo, funds);
    };
    registerVestingAccounts = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { register_vesting_accounts: args }, fee || "auto", memo, funds);
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
    setVestingToken = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { set_vesting_token: args }, fee || "auto", memo, funds);
    };
    managedExtension = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { managed_extension: args }, fee || "auto", memo, funds);
    };
    withManagersExtension = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { with_managers_extension: args }, fee || "auto", memo, funds);
    };
    historicalExtension = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { historical_extension: args }, fee || "auto", memo, funds);
    };
    receive = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { receive: args }, fee || "auto", memo, funds);
    };
}
exports.Client = Client;
