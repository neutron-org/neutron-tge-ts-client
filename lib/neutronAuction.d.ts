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
export type PoolType = "USDC" | "ATOM";
export interface NeutronAuctionSchema {
    responses: Config | State | UserInfoResponse;
    query: UserInfoArgs;
    execute: UpdateConfigArgs | SetTokenInfoArgs | WithdrawArgs | LockLpArgs | WithdrawLpArgs;
    [k: string]: unknown;
}
export interface Config {
    /**
     * ATOM denom
     */
    atom_denom?: string | null;
    /**
     * Number of seconds post init_timestamp during which deposits / withdrawals will be allowed
     */
    deposit_window: number;
    /**
     * Timestamp since which USDC / ATOM deposits will be allowed
     */
    init_timestamp: number;
    /**
     * Lockdrop Contract address
     */
    lockdrop_contract_address?: Addr | null;
    /**
     * Lock window for LP tokens
     */
    lp_tokens_lock_window: number;
    /**
     * min exchange freshness rate (seconds)
     */
    max_exchange_rate_age: number;
    /**
     * Min NTRN amount to be distributed as pool liquidity
     */
    min_ntrn_amount: Uint128;
    /**
     * Base denom
     */
    ntrn_denom: string;
    /**
     * Account who can update config
     */
    owner: Addr;
    /**
     * Pool info
     */
    pool_info?: PoolInfo | null;
    /**
     * Price feed contract address
     */
    price_feed_contract: Addr;
    /**
     * Reserve Contract address
     */
    reserve_contract_address: Addr;
    /**
     * Account who can update denoms
     */
    token_info_manager: Addr;
    /**
     * USDC denom
     */
    usdc_denom?: string | null;
    /**
     * Vesting LP-ATOM Contract address
     */
    vesting_atom_contract_address: Addr;
    /**
     * vesting for lp duration
     */
    vesting_lp_duration: number;
    /**
     * vesting migration users pack size
     */
    vesting_migration_pack_size: number;
    /**
     * Vesting LP-USDC Contract address
     */
    vesting_usdc_contract_address: Addr;
    /**
     * Number of seconds post deposit_window completion during which only withdrawals are allowed
     */
    withdrawal_window: number;
    [k: string]: unknown;
}
export interface PoolInfo {
    /**
     * NTRN-ATOM LP Token address
     */
    ntrn_atom_lp_token_address: string;
    /**
     * NTRN-ATOM LP Pool address
     */
    ntrn_atom_pool_address: string;
    /**
     * NTRN-USDC LP Token address
     */
    ntrn_usdc_lp_token_address: string;
    /**
     * NTRN-USDC LP Pool address
     */
    ntrn_usdc_pool_address: string;
    [k: string]: unknown;
}
export interface State {
    /**
     * locked ATOM LP shares
     */
    atom_lp_locked: Uint128;
    /**
     * LP count for ATOM amount
     */
    atom_lp_size: Uint128;
    /**
     * ATOM NTRN amount
     */
    atom_ntrn_size: Uint128;
    is_rest_lp_vested: boolean;
    /**
     * Total LP shares minted post liquidity addition to the NTRN-ATOM Pool
     */
    lp_atom_shares_minted?: Uint128 | null;
    /**
     * Total LP shares minted post liquidity addition to the NTRN-USDC Pool
     */
    lp_usdc_shares_minted?: Uint128 | null;
    /**
     * Timestamp at which liquidity was added to the NTRN-ATOM and NTRN-USDC LP Pool
     */
    pool_init_timestamp: number;
    /**
     * Total ATOM deposited to the contract
     */
    total_atom_deposited: Uint128;
    /**
     * Total USDC deposited to the contract
     */
    total_usdc_deposited: Uint128;
    /**
     * locked USDC LP shares
     */
    usdc_lp_locked: Uint128;
    /**
     * LP count for USDC amount
     */
    usdc_lp_size: Uint128;
    /**
     * USDC NTRN amount
     */
    usdc_ntrn_size: Uint128;
    [k: string]: unknown;
}
export interface UserInfoResponse {
    /**
     * Total stable delegated by the user
     */
    atom_deposited: Uint128;
    atom_lp_amount: Uint128;
    atom_lp_locked: Uint128;
    /**
     * Total stable delegated by the user
     */
    usdc_deposited: Uint128;
    usdc_lp_amount: Uint128;
    usdc_lp_locked: Uint128;
    /**
     * Withdrawal counter to capture if the user already withdrew UST during the "only withdrawals" window
     */
    withdrawn: boolean;
    [k: string]: unknown;
}
export interface UserInfoArgs {
    address: string;
}
export interface UpdateConfigArgs {
    new_config: UpdateConfigMsg;
    [k: string]: unknown;
}
export interface UpdateConfigMsg {
    lockdrop_contract_address?: string | null;
    owner?: string | null;
    pool_info?: PoolInfo | null;
    price_feed_contract?: string | null;
    vesting_migration_pack_size?: number | null;
    [k: string]: unknown;
}
export interface SetTokenInfoArgs {
    atom_denom?: string | null;
    pool_info?: PoolInfo | null;
    usdc_denom?: string | null;
    [k: string]: unknown;
}
export interface WithdrawArgs {
    amount_atom: Uint128;
    amount_usdc: Uint128;
    [k: string]: unknown;
}
export interface LockLpArgs {
    amount: Uint128;
    asset: PoolType;
    duration: number;
    [k: string]: unknown;
}
export interface WithdrawLpArgs {
    amount: Uint128;
    asset: PoolType;
    duration: number;
    [k: string]: unknown;
}
export declare class Client {
    private readonly client;
    contractAddress: string;
    constructor(client: CosmWasmClient | SigningCosmWasmClient, contractAddress: string);
    mustBeSigningClient(): Error;
    queryConfig: () => Promise<Config>;
    queryState: () => Promise<State>;
    queryUserInfo: (args: UserInfoArgs) => Promise<UserInfoResponse>;
    updateConfig: (sender: string, args: UpdateConfigArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    setTokenInfo: (sender: string, args: SetTokenInfoArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    deposit: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    withdraw: (sender: string, args: WithdrawArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    initPool: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    setPoolSize: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    lockLp: (sender: string, args: LockLpArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    withdrawLp: (sender: string, args: WithdrawLpArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    migrateToVesting: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    callback: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
