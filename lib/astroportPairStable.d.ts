import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import { Coin } from "@cosmjs/amino";
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
 * Binary is a wrapper around Vec<u8> to add base64 de/serialization with serde. It also adds some helper methods to help encode inline.
 *
 * This is only needed as serde-json-{core,wasm} has a horrible encoding for Vec<u8>. See also <https://github.com/CosmWasm/cosmwasm/blob/main/docs/MESSAGE_TYPES.md>.
 */
export type Binary = string;
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
export type Uint1281 = string;
export type Asset1 = Asset[];
/**
 * A fixed-point decimal value with 18 fractional digits, i.e. Decimal(1_000_000_000_000_000_000) == 1.0
 *
 * The greatest possible value that can be represented is 340282366920938463463.374607431768211455 (which is (2^128 - 1) / 10^18)
 */
export type Decimal = string;
export interface AstroportPairStableSchema {
    responses: ConfigResponse | CumulativePricesResponse | PairInfo | PoolResponse | Uint1281 | ReverseSimulationResponse | Asset1 | SimulationResponse;
    query: ShareArgs | SimulationArgs | ReverseSimulationArgs;
    execute: ProvideLiquidityArgs | SwapArgs | UpdateConfigArgs | ProposeNewOwnerArgs;
    [k: string]: unknown;
}
/**
 * This struct is used to return a query result with the general contract configuration.
 */
export interface ConfigResponse {
    /**
     * Last timestamp when the cumulative prices in the pool were updated
     */
    block_time_last: number;
    /**
     * The contract owner
     */
    owner?: Addr | null;
    /**
     * The pool's parameters
     */
    params?: Binary | null;
}
/**
 * This structure is used to return a cumulative prices query response.
 */
export interface CumulativePricesResponse {
    /**
     * The assets in the pool to query
     */
    assets: Asset[];
    /**
     * The vector contains cumulative prices for each pair of assets in the pool
     */
    cumulative_prices: [AssetInfo, AssetInfo, Uint128][];
    /**
     * The total amount of LP tokens currently issued
     */
    total_share: Uint128;
}
/**
 * This enum describes a Terra asset (native or CW20).
 */
export interface Asset {
    /**
     * A token amount
     */
    amount: Uint128;
    /**
     * Information about an asset stored in a [`AssetInfo`] struct
     */
    info: AssetInfo;
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
/**
 * This struct is used to return a query result with the total amount of LP tokens and assets in a specific pool.
 */
export interface PoolResponse {
    /**
     * The assets in the pool together with asset amounts
     */
    assets: Asset[];
    /**
     * The total amount of LP tokens currently issued
     */
    total_share: Uint128;
}
/**
 * This structure holds the parameters that are returned from a reverse swap simulation response.
 */
export interface ReverseSimulationResponse {
    /**
     * The amount of fees charged by the transaction
     */
    commission_amount: Uint128;
    /**
     * The amount of offer assets returned by the reverse swap
     */
    offer_amount: Uint128;
    /**
     * The spread used in the swap operation
     */
    spread_amount: Uint128;
}
/**
 * This structure holds the parameters that are returned from a swap simulation response
 */
export interface SimulationResponse {
    /**
     * The amount of fees charged by the transaction
     */
    commission_amount: Uint128;
    /**
     * The amount of ask assets returned by the swap
     */
    return_amount: Uint128;
    /**
     * The spread used in the swap operation
     */
    spread_amount: Uint128;
}
export interface ShareArgs {
    amount: Uint128;
}
export interface SimulationArgs {
    ask_asset_info?: AssetInfo | null;
    offer_asset: Asset;
}
export interface ReverseSimulationArgs {
    ask_asset: Asset;
    offer_asset_info?: AssetInfo | null;
}
export interface ProvideLiquidityArgs {
    /**
     * The assets available in the pool
     */
    assets: Asset[];
    /**
     * Determines whether the LP tokens minted for the user is auto_staked in the Generator contract
     */
    auto_stake?: boolean | null;
    /**
     * The receiver of LP tokens
     */
    receiver?: string | null;
    /**
     * The slippage tolerance that allows liquidity provision only if the price in the pool doesn't move too much
     */
    slippage_tolerance?: Decimal | null;
}
export interface SwapArgs {
    ask_asset_info?: AssetInfo | null;
    belief_price?: Decimal | null;
    max_spread?: Decimal | null;
    offer_asset: Asset;
    to?: string | null;
}
export interface UpdateConfigArgs {
    params: Binary;
}
export interface ProposeNewOwnerArgs {
    /**
     * The date after which this proposal expires
     */
    expires_in: number;
    /**
     * Newly proposed contract owner
     */
    owner: string;
}
export declare class Client {
    private readonly client;
    contractAddress: string;
    constructor(client: CosmWasmClient | SigningCosmWasmClient, contractAddress: string);
    mustBeSigningClient(): Error;
    queryPair: () => Promise<PairInfo>;
    queryPool: () => Promise<PoolResponse>;
    queryConfig: () => Promise<ConfigResponse>;
    queryShare: (args: ShareArgs) => Promise<Asset[]>;
    querySimulation: (args: SimulationArgs) => Promise<SimulationResponse>;
    queryReverseSimulation: (args: ReverseSimulationArgs) => Promise<ReverseSimulationResponse>;
    queryCumulativePrices: () => Promise<CumulativePricesResponse>;
    queryQueryComputeD: () => Promise<Uint128>;
    receive: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    provideLiquidity: (sender: string, args: ProvideLiquidityArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    swap: (sender: string, args: SwapArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    updateConfig: (sender: string, args: UpdateConfigArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    proposeNewOwner: (sender: string, args: ProposeNewOwnerArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    dropOwnershipProposal: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    claimOwnership: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
