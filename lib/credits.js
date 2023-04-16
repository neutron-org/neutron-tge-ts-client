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
    queryWithdrawableAmount = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { withdrawable_amount: args });
    };
    queryVestedAmount = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { vested_amount: args });
    };
    queryAllocation = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { allocation: args });
    };
    queryBalance = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { balance: args });
    };
    queryTotalSupplyAtHeight = async () => {
        return this.client.queryContractSmart(this.contractAddress, { total_supply_at_height: {} });
    };
    queryBalanceAtHeight = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { balance_at_height: args });
    };
    queryTokenInfo = async () => {
        return this.client.queryContractSmart(this.contractAddress, { token_info: {} });
    };
    queryMinter = async () => {
        return this.client.queryContractSmart(this.contractAddress, { minter: {} });
    };
    queryAllowance = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { allowance: args });
    };
    queryAllAllowances = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { all_allowances: args });
    };
    queryAllAccounts = async () => {
        return this.client.queryContractSmart(this.contractAddress, { all_accounts: {} });
    };
    queryConfig = async () => {
        return this.client.queryContractSmart(this.contractAddress, { config: {} });
    };
    updateConfig = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || "auto", memo, funds);
    };
    addVesting = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { add_vesting: args }, fee || "auto", memo, funds);
    };
    transfer = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { transfer: args }, fee || "auto", memo, funds);
    };
    withdraw = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { withdraw: {} }, fee || "auto", memo, funds);
    };
    burn = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { burn: args }, fee || "auto", memo, funds);
    };
    burnFrom = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { burn_from: args }, fee || "auto", memo, funds);
    };
    mint = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { mint: {} }, fee || "auto", memo, funds);
    };
}
exports.Client = Client;
