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
    queryState = async () => {
        return this.client.queryContractSmart(this.contractAddress, { state: {} });
    };
    queryPool = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { pool: args });
    };
    queryUserInfo = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { user_info: args });
    };
    queryUserInfoWithLockupsList = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { user_info_with_lockups_list: args });
    };
    queryLockUpInfo = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { lock_up_info: args });
    };
    queryQueryUserLockupTotalAtHeight = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { query_user_lockup_total_at_height: args });
    };
    queryQueryLockupTotalAtHeight = async (args) => {
        return this.client.queryContractSmart(this.contractAddress, { query_lockup_total_at_height: args });
    };
    increaseLockupFor = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { increase_lockup_for: args }, fee || "auto", memo, funds);
    };
    receive = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { receive: {} }, fee || "auto", memo, funds);
    };
    increaseNtrnIncentives = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { increase_ntrn_incentives: {} }, fee || "auto", memo, funds);
    };
    updateConfig = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || "auto", memo, funds);
    };
    setTokenInfo = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { set_token_info: args }, fee || "auto", memo, funds);
    };
    withdrawFromLockup = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { withdraw_from_lockup: args }, fee || "auto", memo, funds);
    };
    claimRewardsAndOptionallyUnlock = async (sender, args, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { claim_rewards_and_optionally_unlock: args }, fee || "auto", memo, funds);
    };
    callback = async (sender, fee, memo, funds) => {
        if (!isSigningCosmWasmClient(this.client)) {
            throw this.mustBeSigningClient();
        }
        return this.client.execute(sender, this.contractAddress, { callback: {} }, fee || "auto", memo, funds);
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
