import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult, InstantiateResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { Coin } from "@cosmjs/amino";
/**
 * This enum describes available Token types. ## Examples ``` # use cosmwasm_std::Addr; # use astroport::asset::AssetInfo::{NativeToken, Token}; Token { contract_addr: Addr::unchecked("stake...") }; NativeToken { denom: String::from("uluna") }; ```
 */
export type AssetInfo = {
    token: {
        contract_addr: Addr;
    };
} | {
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
 * This enum describes available pair types. ## Available pool types ``` # use astroport::factory::PairType::{Custom, Stable, Xyk}; Xyk {}; Stable {}; Custom(String::from("Custom")); ```
 */
export type PairType = {
    xyk: {};
} | {
    stable: {};
} | {
    concentrated: {};
} | {
    custom: string;
};
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
export type ArrayOfTupleOf_AssetInfoAnd_Uint256 = [AssetInfo, Uint256][];
export type Uint64 = number;
/**
 * A fixed-point decimal value with 18 fractional digits, i.e. Decimal256(1_000_000_000_000_000_000) == 1.0
 *
 * The greatest possible value that can be represented is 115792089237316195423570985008687907853269984665640564039457.584007913129639935 (which is (2^256 - 1) / 10^18)
 */
export type Decimal256 = string;
export type ArrayOfTupleOf_AssetInfoAnd_Decimal256 = [AssetInfo, Decimal256][];
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
export type Uint641 = string;
export interface AstroportOracleSchema {
    responses: Config | ArrayOfTupleOf_AssetInfoAnd_Uint256 | Uint64 | ArrayOfTupleOf_AssetInfoAnd_Decimal256;
    query: ConsultArgs | TWAPAtHeightArgs;
    execute: UpdatePeriodArgs | UpdateManagerArgs;
    instantiate?: InstantiateMsg;
    [k: string]: unknown;
}
/**
 * Global configuration for the contract
 */
export interface Config {
    /**
     * The assets in the pool. Each asset is described using a [`AssetInfo`]
     */
    asset_infos?: AssetInfo[] | null;
    /**
     * The factory contract address
     */
    factory: Addr;
    /**
     * Manager is the only one who can set pair info, if not set already
     */
    manager: Addr;
    /**
     * The address that's allowed to change contract parameters
     */
    owner: Addr;
    /**
     * Information about the pair (LP token address, pair type etc)
     */
    pair?: PairInfo | null;
    /**
     * Time between two consecutive TWAP updates.
     */
    period: number;
}
/**
 * This structure stores the main parameters for an Astroport pair
 */
export interface PairInfo {
    /**
     * Asset information for the assets in the pool
     */
    asset_infos: AssetInfo[];
    /**
     * Pair contract address
     */
    contract_addr: Addr;
    /**
     * Pair LP token address
     */
    liquidity_token: Addr;
    /**
     * The pool type (xyk, stableswap etc) available in [`PairType`]
     */
    pair_type: PairType;
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
    height: Uint641;
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
/**
 * This structure stores general parameters for the contract. Modified by us
 */
export interface InstantiateMsg {
    /**
     * The factory contract address
     */
    factory_contract: string;
    /**
     * Manager is the only one who can set pair info, if not set already
     */
    manager: string;
    /**
     * Minimal interval between Update{}'s
     */
    period: number;
}
export declare class Client {
    private readonly client;
    contractAddress: string;
    constructor(client: CosmWasmClient | SigningCosmWasmClient, contractAddress: string);
    mustBeSigningClient(): Error;
    static instantiate(client: SigningCosmWasmClient, sender: string, codeId: number, initMsg: InstantiateMsg, label: string, fees: StdFee | 'auto' | number, initCoins?: readonly Coin[]): Promise<InstantiateResult>;
    static instantiate2(client: SigningCosmWasmClient, sender: string, codeId: number, salt: number, initMsg: InstantiateMsg, label: string, fees: StdFee | 'auto' | number, initCoins?: readonly Coin[]): Promise<InstantiateResult>;
    queryConsult: (args: ConsultArgs) => Promise<ArrayOfTupleOf_AssetInfoAnd_Uint256>;
    queryTWAPAtHeight: (args: TWAPAtHeightArgs) => Promise<ArrayOfTupleOf_AssetInfoAnd_Decimal256>;
    queryConfig: () => Promise<Config>;
    queryLastUpdateTimestamp: () => Promise<Uint64>;
    update: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    updatePeriod: (sender: string, args: UpdatePeriodArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    updateManager: (sender: string, args: UpdateManagerArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    setAssetInfos: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
