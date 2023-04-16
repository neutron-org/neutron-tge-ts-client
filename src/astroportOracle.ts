import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate"; 
import { StdFee } from "@cosmjs/amino";
import { Coin } from "@cosmjs/amino";
/**
 * This enum describes available Token types. ## Examples ``` # use cosmwasm_std::Addr; # use astroport::asset::AssetInfo::{NativeToken, Token}; Token { contract_addr: Addr::unchecked("stake...") }; NativeToken { denom: String::from("uluna") }; ```
 */
export type AssetInfo =
  | {
      token: {
        contract_addr: Addr;
      };
    }
  | {
      native_token: {
        denom: string;
      };
    };
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
/**
 * An implementation of u256 that is using strings for JSON encoding/decoding, such that the full u256 range can be used for clients that convert JSON numbers to floats, like JavaScript and jq.
 *
 * # Examples
 *
 * Use `from` to create instances out of primitive uint types or `new` to provide big endian bytes:
 *
 * ``` # use cosmwasm_std::Uint256; let a = Uint256::from(258u128); let b = Uint256::new([ 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 0u8, 1u8, 2u8, ]); assert_eq!(a, b); ```
 */
export type Uint256 = string;
export type TupleOf_AssetInfoAnd_Uint256 = [AssetInfo, Uint256][];
/**
 * A fixed-point decimal value with 18 fractional digits, i.e. Decimal256(1_000_000_000_000_000_000) == 1.0
 *
 * The greatest possible value that can be represented is 115792089237316195423570985008687907853269984665640564039457.584007913129639935 (which is (2^256 - 1) / 10^18)
 */
export type Decimal256 = string;
export type TupleOf_AssetInfoAnd_Decimal256 = [AssetInfo, Decimal256][];
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

export interface AstroportOracleSchema {
  responses: TupleOf_AssetInfoAnd_Uint256 | TupleOf_AssetInfoAnd_Decimal256;
  query: ConsultArgs | TWAPAtHeightArgs;
  execute: UpdatePeriodArgs | UpdateManagerArgs;
  [k: string]: unknown;
}
export interface ConsultArgs {
  /**
   * The amount of tokens for which to compute the token price
   */
  amount: Uint128;
  /**
   * The asset for which to compute a new TWAP value
   */
  token: AssetInfo;
}
export interface TWAPAtHeightArgs {
  /**
   * The amount of tokens for which to compute the token price
   */
  height: Uint64;
  /**
   * The asset for which to compute a new TWAP value
   */
  token: AssetInfo;
}
export interface UpdatePeriodArgs {
  new_period: number;
}
export interface UpdateManagerArgs {
  new_manager: string;
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
  queryConsult = async(args: ConsultArgs): Promise<TupleOf_AssetInfoAnd_Uint256[]> => {
    return this.client.queryContractSmart(this.contractAddress, { consult: args });
  }
  queryTWAPAtHeight = async(args: TWAPAtHeightArgs): Promise<TupleOf_AssetInfoAnd_Decimal256[]> => {
    return this.client.queryContractSmart(this.contractAddress, { t_w_a_p_at_height: args });
  }
  update = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update: {} }, fee || "auto", memo, funds);
  }
  updatePeriod = async(sender:string, args: UpdatePeriodArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update_period: args }, fee || "auto", memo, funds);
  }
  updateManager = async(sender:string, args: UpdateManagerArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update_manager: args }, fee || "auto", memo, funds);
  }
  setAssetInfos = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { set_asset_infos: {} }, fee || "auto", memo, funds);
  }
}
