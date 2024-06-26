import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult, InstantiateResult } from "@cosmjs/cosmwasm-stargate"; 
import { StdFee } from "@cosmjs/amino";
import { Coin } from "@cosmjs/amino";
/**
 * A thin wrapper around u128 that is using strings for JSON encoding/decoding, such that the full u128 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 *
 * # Examples
 *
 * Use `from` to create instances of this and `u128` to get the value out:
 *
 * ``` # use cosmwasm_std::Uint128; let a = Uint128::from(123u128); assert_eq!(a.u128(), 123);
 *
 * let b = Uint128::from(42u64); assert_eq!(b.u128(), 42);
 *
 * let c = Uint128::from(70u32); assert_eq!(c.u128(), 70); ```
 */
export type Uint128 = string;

export interface Cw20MerkleAirdropSchema {
  responses:
    | AccountMapResponse
    | AccountMapResponse1
    | ConfigResponse
    | IsClaimedResponse
    | IsPausedResponse
    | MerkleRootResponse
    | TotalClaimedResponse;
  query: IsClaimedArgs | AccountMapArgs | AllAccountMapsArgs;
  execute: ClaimArgs | UpdateReserveArgs;
  instantiate?: InstantiateMsg;
  [k: string]: unknown;
}
export interface AccountMapResponse {
  external_address: string;
  host_address: string;
  [k: string]: unknown;
}
export interface AccountMapResponse1 {
  external_address: string;
  host_address: string;
  [k: string]: unknown;
}
export interface ConfigResponse {
  credits_address: string;
  owner: string;
  reserve_address: string;
  [k: string]: unknown;
}
export interface IsClaimedResponse {
  is_claimed: boolean;
  [k: string]: unknown;
}
export interface IsPausedResponse {
  is_paused: boolean;
  [k: string]: unknown;
}
export interface MerkleRootResponse {
  airdrop_start: number;
  /**
   * MerkleRoot is hex-encoded merkle root.
   */
  merkle_root: string;
  total_amount: Uint128;
  vesting_duration_seconds: number;
  vesting_start: number;
  [k: string]: unknown;
}
export interface TotalClaimedResponse {
  total_claimed: Uint128;
  [k: string]: unknown;
}
export interface IsClaimedArgs {
  address: string;
}
export interface AccountMapArgs {
  external_address: string;
}
export interface AllAccountMapsArgs {
  limit?: number | null;
  start_after?: string | null;
}
export interface ClaimArgs {
  amount: Uint128;
  /**
   * Proof is hex-encoded merkle proof.
   */
  proof: string[];
  [k: string]: unknown;
}
export interface UpdateReserveArgs {
  address: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  /**
   * A point in time from which it is possible to claim airdrops
   */
  airdrop_start: number;
  credits_address: string;
  /**
   * hrp is the bech32 parameter required for building external network address from signature message during claim action. example "cosmos", "terra", "juno"
   */
  hrp?: string | null;
  /**
   * MerkleRoot is hex-encoded merkle root.
   */
  merkle_root: string;
  reserve_address: string;
  total_amount?: Uint128 | null;
  /**
   * Total duration of vesting. At `vesting_start.seconds() + vesting_duration_seconds` point of time it is no longer possible to claim airdrops. At the very same point of time, it is possible to withdraw all remaining cNTRNs, exchange them for NTRNs and send to reserve, using `[ExecuteMsg::WithdrawAll]` message
   */
  vesting_duration_seconds: number;
  /**
   * A point in time from which a vesting is configured for cNTRNs. At this point, it is still possible for users to claim their airdrops.
   */
  vesting_start: number;
  [k: string]: unknown;
}


function isSigningCosmWasmClient(
  client: CosmWasmClient | SigningCosmWasmClient
): client is SigningCosmWasmClient {
  return 'execute' in client;
}

export class Client {
  private readonly client: CosmWasmClient | SigningCosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient | SigningCosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
  }
  mustBeSigningClient() {
    return new Error("This client is not a SigningCosmWasmClient");
  }
  static async instantiate(
    client: SigningCosmWasmClient,
    sender: string,
    codeId: number,
    initMsg: InstantiateMsg,
    label: string,
    fees: StdFee | 'auto' | number,
    initCoins?: readonly Coin[],
  ): Promise<InstantiateResult> {
    const res = await client.instantiate(sender, codeId, initMsg, label, fees, {
      ...(initCoins && initCoins.length && { funds: initCoins }),
    });
    return res;
  }
  static async instantiate2(
    client: SigningCosmWasmClient,
    sender: string,
    codeId: number,
    salt: number,
    initMsg: InstantiateMsg,
    label: string,
    fees: StdFee | 'auto' | number,
    initCoins?: readonly Coin[],
  ): Promise<InstantiateResult> {
    const res = await client.instantiate2(sender, codeId, new Uint8Array([salt]), initMsg, label, fees, {
      ...(initCoins && initCoins.length && { funds: initCoins }),
    });
    return res;
  }
  queryConfig = async(): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { config: {} });
  }
  queryMerkleRoot = async(): Promise<MerkleRootResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { merkle_root: {} });
  }
  queryIsClaimed = async(args: IsClaimedArgs): Promise<IsClaimedResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { is_claimed: args });
  }
  queryTotalClaimed = async(): Promise<TotalClaimedResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { total_claimed: {} });
  }
  queryAccountMap = async(args: AccountMapArgs): Promise<AccountMapResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { account_map: args });
  }
  queryAllAccountMaps = async(args: AllAccountMapsArgs): Promise<AccountMapResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { all_account_maps: args });
  }
  queryIsPaused = async(): Promise<IsPausedResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { is_paused: {} });
  }
  claim = async(sender:string, args: ClaimArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { claim: args }, fee || "auto", memo, funds);
  }
  withdrawAll = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { withdraw_all: {} }, fee || "auto", memo, funds);
  }
  pause = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { pause: {} }, fee || "auto", memo, funds);
  }
  resume = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { resume: {} }, fee || "auto", memo, funds);
  }
  updateReserve = async(sender:string, args: UpdateReserveArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update_reserve: args }, fee || "auto", memo, funds);
  }
}
