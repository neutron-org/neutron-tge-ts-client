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
 * A fixed-point decimal value with 18 fractional digits, i.e. Decimal256(1_000_000_000_000_000_000) == 1.0
 *
 * The greatest possible value that can be represented is 115792089237316195423570985008687907853269984665640564039457.584007913129639935 (which is (2^256 - 1) / 10^18)
 */
export type Decimal256 = string;
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
 * Vec wrapper for internal use. Some business logic relies on an order of this vector, thus it is forbidden to sort it or remove elements. New values can be added using .update() ONLY.
 */
export type RestrictedVectorFor_AssetInfoAnd_Uint128 = [AssetInfo, Uint128][];
export type PoolType = "USDC" | "ATOM";
/**
 * A fixed-point decimal value with 18 fractional digits, i.e. Decimal(1_000_000_000_000_000_000) == 1.0
 *
 * The greatest possible value that can be represented is 340282366920938463463.374607431768211455 (which is (2^128 - 1) / 10^18)
 */
export type Decimal = string;
/**
 * Vec wrapper for internal use. Some business logic relies on an order of this vector, thus it is forbidden to sort it or remove elements. New values can be added using .update() ONLY.
 */
export type RestrictedVectorFor_AssetInfoAnd_Decimal = [AssetInfo, Decimal][];
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
export type Nullable_Uint128 = Uint128 | null;
export type Nullable_Uint1281 = Uint128 | null;
export interface NeutronLockdropSchema {
    responses: Config | LockUpInfoResponse | PoolInfo | Nullable_Uint128 | Nullable_Uint1281 | StateResponse | UserInfoResponse | UserInfoWithListResponse;
    query: PoolArgs | UserInfoArgs | UserInfoWithLockupsListArgs | LockUpInfoArgs | QueryUserLockupTotalAtHeightArgs | QueryLockupTotalAtHeightArgs;
    execute: IncreaseLockupForArgs | UpdateConfigArgs | SetTokenInfoArgs | WithdrawFromLockupArgs | ClaimRewardsAndOptionallyUnlockArgs | ProposeNewOwnerArgs;
    [k: string]: unknown;
}
export interface Config {
    /**
     * Bootstrap Auction contract address
     */
    auction_contract: Addr;
    /**
     * Credits contract address
     */
    credits_contract: Addr;
    /**
     * Generator (Staking for dual rewards) contract address
     */
    generator?: Addr | null;
    /**
     * Timestamp when Contract will start accepting LP Token deposits
     */
    init_timestamp: number;
    /**
     * Number of seconds during which lockup positions be accepted
     */
    lock_window: number;
    /**
     * Total NTRN lockdrop incentives to be distributed among the users
     */
    lockdrop_incentives: Uint128;
    /**
     * Describes rewards coefficients for each lockup duration
     */
    lockup_rewards_info: LockupRewardsInfo[];
    /**
     * Max. no. of weeks allowed for lockup
     */
    max_lock_duration: number;
    /**
     * Max lockup positions a user can have
     */
    max_positions_per_user: number;
    /**
     * Min. no. of weeks allowed for lockup
     */
    min_lock_duration: number;
    /**
     * Account which can update the config
     */
    owner: Addr;
    /**
     * Account which can update the generator and token addresses
     */
    token_info_manager: Addr;
    /**
     * Withdrawal Window Length :: Post the deposit window
     */
    withdrawal_window: number;
    [k: string]: unknown;
}
export interface LockupRewardsInfo {
    coefficient: Decimal256;
    duration: number;
    [k: string]: unknown;
}
export interface LockUpInfoResponse {
    astroport_lp_token: Addr;
    astroport_lp_transferred?: Uint128 | null;
    /**
     * User's Astroport LP units, calculated as lp_units_locked (terraswap) / total LP units locked (terraswap) * Astroport LP units minted post migration
     */
    astroport_lp_units?: Uint128 | null;
    /**
     * ASTRO tokens receivable as generator rewards that user can claim
     */
    claimable_generator_astro_debt: Uint128;
    /**
     * Proxy tokens receivable as generator rewards that user can claim
     */
    claimable_generator_proxy_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
    duration: number;
    /**
     * Generator NTRN tokens lockup received as generator rewards
     */
    generator_ntrn_debt: Uint128;
    /**
     * Generator Proxy tokens lockup received as generator rewards
     */
    generator_proxy_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
    /**
     * Terraswap LP units locked by the user
     */
    lp_units_locked: Uint128;
    /**
     * NTRN tokens received as rewards for participation in the lockdrop
     */
    ntrn_rewards: Uint128;
    /**
     * Terraswap LP token
     */
    pool_type: PoolType;
    /**
     * Timestamp beyond which this position can be unlocked
     */
    unlock_timestamp: number;
    /**
     * Boolean value indicating if the user's has withdrawn funds post the only 1 withdrawal limit cutoff
     */
    withdrawal_flag: boolean;
    [k: string]: unknown;
}
export interface PoolInfo {
    amount_in_lockups: Uint128;
    /**
     * Ratio of Generator NTRN rewards accured to astroport pool share
     */
    generator_ntrn_per_share: Decimal;
    /**
     * Ratio of Generator Proxy rewards accured to astroport pool share
     */
    generator_proxy_per_share: RestrictedVectorFor_AssetInfoAnd_Decimal;
    /**
     * Share of total NTRN incentives allocated to this pool
     */
    incentives_share: Uint128;
    /**
     * Boolean value indicating if the LP Tokens are staked with the Generator contract or not
     */
    is_staked: boolean;
    lp_token: Addr;
    /**
     * Weighted LP Token balance used to calculate NTRN rewards a particular user can claim
     */
    weighted_amount: Uint256;
    [k: string]: unknown;
}
export interface StateResponse {
    /**
     * Vector containing LP addresses for all the supported LP Pools
     */
    supported_pairs_list: PoolType[];
    /**
     * Total NTRN incentives share
     */
    total_incentives_share: Uint128;
    [k: string]: unknown;
}
export interface UserInfoResponse {
    /**
     * NTRN tokens receivable as generator rewards that user can claim
     */
    claimable_generator_ntrn_debt: Uint128;
    /**
     * Lockup positions
     */
    lockup_infos: LockUpInfoResponse1[];
    /**
     * Number of lockup positions the user is having
     */
    lockup_positions_index: number;
    /**
     * NTRN tokens transferred to user
     */
    ntrn_transferred: boolean;
    /**
     * Total NTRN tokens user received as rewards for participation in the lockdrop
     */
    total_ntrn_rewards: Uint128;
    [k: string]: unknown;
}
export interface LockUpInfoResponse1 {
    astroport_lp_token: Addr;
    astroport_lp_transferred?: Uint128 | null;
    /**
     * User's Astroport LP units, calculated as lp_units_locked (terraswap) / total LP units locked (terraswap) * Astroport LP units minted post migration
     */
    astroport_lp_units?: Uint128 | null;
    /**
     * ASTRO tokens receivable as generator rewards that user can claim
     */
    claimable_generator_astro_debt: Uint128;
    /**
     * Proxy tokens receivable as generator rewards that user can claim
     */
    claimable_generator_proxy_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
    duration: number;
    /**
     * Generator NTRN tokens lockup received as generator rewards
     */
    generator_ntrn_debt: Uint128;
    /**
     * Generator Proxy tokens lockup received as generator rewards
     */
    generator_proxy_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
    /**
     * Terraswap LP units locked by the user
     */
    lp_units_locked: Uint128;
    /**
     * NTRN tokens received as rewards for participation in the lockdrop
     */
    ntrn_rewards: Uint128;
    /**
     * Terraswap LP token
     */
    pool_type: PoolType;
    /**
     * Timestamp beyond which this position can be unlocked
     */
    unlock_timestamp: number;
    /**
     * Boolean value indicating if the user's has withdrawn funds post the only 1 withdrawal limit cutoff
     */
    withdrawal_flag: boolean;
    [k: string]: unknown;
}
export interface UserInfoWithListResponse {
    /**
     * Lockup positions
     */
    lockup_infos: LockUpInfoSummary[];
    /**
     * Number of lockup positions the user is having
     */
    lockup_positions_index: number;
    /**
     * NTRN tokens transferred to user
     */
    ntrn_transferred: boolean;
    /**
     * Total NTRN tokens user received as rewards for participation in the lockdrop
     */
    total_ntrn_rewards: Uint128;
    [k: string]: unknown;
}
export interface LockUpInfoSummary {
    duration: number;
    pool_type: PoolType;
    [k: string]: unknown;
}
export interface PoolArgs {
    pool_type: PoolType;
}
export interface UserInfoArgs {
    address: string;
}
export interface UserInfoWithLockupsListArgs {
    address: string;
}
export interface LockUpInfoArgs {
    duration: number;
    pool_type: PoolType;
    user_address: string;
}
export interface QueryUserLockupTotalAtHeightArgs {
    height: number;
    pool_type: PoolType;
    user_address: string;
}
export interface QueryLockupTotalAtHeightArgs {
    height: number;
    pool_type: PoolType;
}
export interface IncreaseLockupForArgs {
    amount: Uint128;
    duration: number;
    pool_type: PoolType;
    user_address: string;
    [k: string]: unknown;
}
export interface UpdateConfigArgs {
    new_config: UpdateConfigMsg;
    [k: string]: unknown;
}
export interface UpdateConfigMsg {
    /**
     * Bootstrap Auction contract address
     */
    auction_contract_address?: string | null;
    /**
     * Generator (Staking for dual rewards) contract address
     */
    generator_address?: string | null;
    [k: string]: unknown;
}
export interface SetTokenInfoArgs {
    atom_token: string;
    generator: string;
    usdc_token: string;
    [k: string]: unknown;
}
export interface WithdrawFromLockupArgs {
    amount: Uint128;
    duration: number;
    pool_type: PoolType;
    user_address: string;
    [k: string]: unknown;
}
export interface ClaimRewardsAndOptionallyUnlockArgs {
    duration: number;
    pool_type: PoolType;
    withdraw_lp_stake: boolean;
    [k: string]: unknown;
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
    [k: string]: unknown;
}
export declare class Client {
    private readonly client;
    contractAddress: string;
    constructor(client: CosmWasmClient | SigningCosmWasmClient, contractAddress: string);
    mustBeSigningClient(): Error;
    queryConfig: () => Promise<Config>;
    queryState: () => Promise<StateResponse>;
    queryPool: (args: PoolArgs) => Promise<PoolInfo>;
    queryUserInfo: (args: UserInfoArgs) => Promise<UserInfoResponse>;
    queryUserInfoWithLockupsList: (args: UserInfoWithLockupsListArgs) => Promise<UserInfoWithListResponse>;
    queryLockUpInfo: (args: LockUpInfoArgs) => Promise<LockUpInfoResponse>;
    queryQueryUserLockupTotalAtHeight: (args: QueryUserLockupTotalAtHeightArgs) => Promise<Nullable_Uint128>;
    queryQueryLockupTotalAtHeight: (args: QueryLockupTotalAtHeightArgs) => Promise<Nullable_Uint128>;
    increaseLockupFor: (sender: string, args: IncreaseLockupForArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    receive: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    increaseNtrnIncentives: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    updateConfig: (sender: string, args: UpdateConfigArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    setTokenInfo: (sender: string, args: SetTokenInfoArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    withdrawFromLockup: (sender: string, args: WithdrawFromLockupArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    claimRewardsAndOptionallyUnlock: (sender: string, args: ClaimRewardsAndOptionallyUnlockArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    callback: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    proposeNewOwner: (sender: string, args: ProposeNewOwnerArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    dropOwnershipProposal: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    claimOwnership: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
