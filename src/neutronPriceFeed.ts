import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult, InstantiateResult } from "@cosmjs/cosmwasm-stargate"; 
import { StdFee } from "@cosmjs/amino";
/**
 * A thin wrapper around u64 that is using strings for JSON encoding/decoding, such that the full u64 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 *
 * # Examples
 *
 * Use `from` to create instances of this and `u64` to get the value out:
 *
 * ``` # use cosmwasm_std::Uint64; let a = Uint64::from(42u64); assert_eq!(a.u64(), 42);
 *
 * let b = Uint64::from(70u32); assert_eq!(b.u64(), 70); ```
 */
export type Uint64 = string;
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
/**
 * A human readable address.
 *
 * In Cosmos, this is typically bech32 encoded. But for multi-chain smart contracts no assumptions should be made other than being UTF-8 encoded and of reasonable length.
 *
 * This type represents a validated address. It can be created in the following ways 1. Use `Addr::unchecked(input)` 2. Use `let checked: Addr = deps.api.addr_validate(input)?` 3. Use `let checked: Addr = deps.api.addr_humanize(canonical_addr)?` 4. Deserialize from JSON. This must only be done from JSON that was validated before such as a contract's state. `Addr` must not be used in messages sent by the user because this would result in unvalidated instances.
 *
 * This type is immutable. If you really need to mutate it (Really? Are you sure?), create a mutable copy using `let mut mutable = Addr::to_string()` and operate on that `String` instance.
 */
export type Addr = string;
export type String = string;
export type ArrayOfPriceFeedRate = PriceFeedRate[];

export interface NeutronPriceFeedSchema {
  responses: Config | String | ArrayOfPriceFeedRate;
  execute: UpdateConfigArgs | UpdateOwnerArgs;
  instantiate?: InstantiateMsg;
  [k: string]: unknown;
}
export interface Config {
  ask_count: Uint64;
  client_id: string;
  execute_gas: Uint64;
  fee_limit: Coin[];
  max_update_interval: number;
  min_count: Uint64;
  multiplier: Uint64;
  oracle_script_id: Uint64;
  owner: Addr;
  prepare_gas: Uint64;
  symbols: string[];
}
export interface Coin {
  amount: Uint128;
  denom: string;
  [k: string]: unknown;
}
export interface PriceFeedRate {
  rate: Uint64;
  request_id: Uint64;
  resolve_time: Uint64;
}
export interface UpdateConfigArgs {
  new_config: UpdateConfigMsg;
}
export interface UpdateConfigMsg {
  ask_count?: Uint64 | null;
  client_id?: string | null;
  execute_gas?: Uint64 | null;
  fee_limit?: Coin[] | null;
  max_update_interval?: number | null;
  min_count?: Uint64 | null;
  multiplier?: Uint64 | null;
  oracle_script_id?: Uint64 | null;
  prepare_gas?: Uint64 | null;
  symbols?: string[] | null;
}
export interface UpdateOwnerArgs {
  new_owner: string;
}
export interface InstantiateMsg {
  ask_count: Uint64;
  client_id: string;
  execute_gas: Uint64;
  fee_limit: Coin[];
  max_update_interval?: number | null;
  min_count: Uint64;
  multiplier: Uint64;
  oracle_script_id: Uint64;
  owner?: string | null;
  prepare_gas: Uint64;
  symbols: string[];
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
  queryGetError = async(): Promise<String> => {
    return this.client.queryContractSmart(this.contractAddress, { get_error: {} });
  }
  queryGetRate = async(): Promise<ArrayOfPriceFeedRate> => {
    return this.client.queryContractSmart(this.contractAddress, { get_rate: {} });
  }
  queryGetConfig = async(): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, { get_config: {} });
  }
  request = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { request: {} }, fee || "auto", memo, funds);
  }
  updateConfig = async(sender:string, args: UpdateConfigArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || "auto", memo, funds);
  }
  updateOwner = async(sender:string, args: UpdateOwnerArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update_owner: args }, fee || "auto", memo, funds);
  }
}
