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
/**
 * Expiration represents a point in time when some event happens. It can compare with a BlockInfo and will return is_expired() == true once the condition is hit (and for every block in the future)
 */
export type Expiration = {
    at_height: number;
} | {
    at_time: Timestamp;
} | {
    never: {};
};
/**
 * A point in time in nanosecond precision.
 *
 * This type can represent times from 1970-01-01T00:00:00Z to 2554-07-21T23:34:33Z.
 *
 * ## Examples
 *
 * ``` # use cosmwasm_std::Timestamp; let ts = Timestamp::from_nanos(1_000_000_202); assert_eq!(ts.nanos(), 1_000_000_202); assert_eq!(ts.seconds(), 1); assert_eq!(ts.subsec_nanos(), 202);
 *
 * let ts = ts.plus_seconds(2); assert_eq!(ts.nanos(), 3_000_000_202); assert_eq!(ts.seconds(), 3); assert_eq!(ts.subsec_nanos(), 202); ```
 */
export type Timestamp = Uint64;
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
 * A human readable address.
 *
 * In Cosmos, this is typically bech32 encoded. But for multi-chain smart contracts no assumptions should be made other than being UTF-8 encoded and of reasonable length.
 *
 * This type represents a validated address. It can be created in the following ways 1. Use `Addr::unchecked(input)` 2. Use `let checked: Addr = deps.api.addr_validate(input)?` 3. Use `let checked: Addr = deps.api.addr_humanize(canonical_addr)?` 4. Deserialize from JSON. This must only be done from JSON that was validated before such as a contract's state. `Addr` must not be used in messages sent by the user because this would result in unvalidated instances.
 *
 * This type is immutable. If you really need to mutate it (Really? Are you sure?), create a mutable copy using `let mut mutable = Addr::to_string()` and operate on that `String` instance.
 */
export type Addr = string;
export type Nullable_MinterResponse = MinterResponse | null;
export interface CreditsSchema {
    responses: AllAccountsResponse | AllAllowancesResponse | Allocation | AllowanceResponse | BalanceResponse | BalanceResponse1 | Config | Nullable_MinterResponse | TokenInfoResponse | TotalSupplyResponse | VestedAmountResponse | WithdrawableAmountResponse;
    query: WithdrawableAmountArgs | VestedAmountArgs | AllocationArgs | BalanceArgs | TotalSupplyAtHeightArgs | BalanceAtHeightArgs | AllowanceArgs | AllAllowancesArgs | AllAccountsArgs;
    execute: UpdateConfigArgs | AddVestingArgs | TransferArgs | BurnArgs | BurnFromArgs;
    instantiate?: InstantiateMsg;
    [k: string]: unknown;
}
export interface AllAccountsResponse {
    accounts: string[];
    [k: string]: unknown;
}
export interface AllAllowancesResponse {
    allowances: AllowanceInfo[];
    [k: string]: unknown;
}
export interface AllowanceInfo {
    allowance: Uint128;
    expires: Expiration;
    spender: string;
}
export interface Allocation {
    /**
     * Total allocated amount that can be withdrawn
     */
    allocated_amount: Uint128;
    /**
     * Vesting schedule settings for this allocation
     */
    schedule: Schedule;
    /**
     * Amount that has already been withdrawn from account (Does not include reward withdraws)
     */
    withdrawn_amount: Uint128;
    [k: string]: unknown;
}
export interface Schedule {
    /**
     * Specified in seconds. Tokens start to get unlocked at `start_time + cliff` time.
     */
    cliff: number;
    /**
     * Duration of the vesting/unlocking process. At time `start_time + duration`, 100% of the tokens are vested/unlocked in full.
     */
    duration: number;
    /**
     * Timestamp in UNIX seconds when vesting/unlocking starts
     */
    start_time: number;
    [k: string]: unknown;
}
export interface AllowanceResponse {
    allowance: Uint128;
    expires: Expiration;
    [k: string]: unknown;
}
export interface BalanceResponse {
    balance: Uint128;
}
export interface BalanceResponse1 {
    balance: Uint128;
}
export interface Config {
    /**
     * Airdrop contract address
     */
    airdrop_address?: Addr | null;
    /**
     * DAO contract address
     */
    dao_address: Addr;
    /**
     * Lockdrop contract address
     */
    lockdrop_address?: Addr | null;
    /**
     * When can start withdrawing untrn tokens
     */
    when_withdrawable?: number | null;
    [k: string]: unknown;
}
export interface MinterResponse {
    /**
     * cap is a hard cap on total supply that can be achieved by minting. Note that this refers to total_supply. If None, there is unlimited cap.
     */
    cap?: Uint128 | null;
    minter: string;
}
export interface TokenInfoResponse {
    decimals: number;
    name: string;
    symbol: string;
    total_supply: Uint128;
}
export interface TotalSupplyResponse {
    total_supply: Uint128;
    [k: string]: unknown;
}
export interface VestedAmountResponse {
    /**
     * Amount that is still vested for the user.
     */
    amount: Uint128;
    [k: string]: unknown;
}
export interface WithdrawableAmountResponse {
    /**
     * Amount that the user can withdraw at this block height.
     */
    amount: Uint128;
    [k: string]: unknown;
}
export interface WithdrawableAmountArgs {
    address: string;
}
export interface VestedAmountArgs {
    address: string;
}
export interface AllocationArgs {
    address: string;
}
export interface BalanceArgs {
    address: string;
}
export interface TotalSupplyAtHeightArgs {
    height?: number | null;
}
export interface BalanceAtHeightArgs {
    address: string;
    height?: number | null;
}
export interface AllowanceArgs {
    owner: string;
    spender: string;
}
export interface AllAllowancesArgs {
    limit?: number | null;
    owner: string;
    start_after?: string | null;
}
export interface AllAccountsArgs {
    limit?: number | null;
    start_after?: string | null;
}
export interface UpdateConfigArgs {
    config: UpdateConfigMsg;
    [k: string]: unknown;
}
export interface UpdateConfigMsg {
    /**
     * Airdrop contract address
     */
    airdrop_address?: string | null;
    /**
     * Lockdrop contract address,
     */
    lockdrop_address?: string | null;
    /**
     * When can start withdrawing untrn tokens
     */
    when_withdrawable?: number | null;
    [k: string]: unknown;
}
export interface AddVestingArgs {
    address: string;
    amount: Uint128;
    duration: number;
    start_time: number;
    [k: string]: unknown;
}
export interface TransferArgs {
    amount: Uint128;
    recipient: string;
    [k: string]: unknown;
}
export interface BurnArgs {
    amount: Uint128;
    [k: string]: unknown;
}
export interface BurnFromArgs {
    amount: Uint128;
    owner: string;
    [k: string]: unknown;
}
export interface InstantiateMsg {
    dao_address: string;
    [k: string]: unknown;
}
export declare class Client {
    private readonly client;
    contractAddress: string;
    constructor(client: CosmWasmClient | SigningCosmWasmClient, contractAddress: string);
    mustBeSigningClient(): Error;
    static instantiate(client: SigningCosmWasmClient, sender: string, codeId: number, initMsg: InstantiateMsg, label: string, fees: StdFee | 'auto' | number, initCoins?: readonly Coin[]): Promise<InstantiateResult>;
    static instantiate2(client: SigningCosmWasmClient, sender: string, codeId: number, salt: number, initMsg: InstantiateMsg, label: string, fees: StdFee | 'auto' | number, initCoins?: readonly Coin[]): Promise<InstantiateResult>;
    queryWithdrawableAmount: (args: WithdrawableAmountArgs) => Promise<WithdrawableAmountResponse>;
    queryVestedAmount: (args: VestedAmountArgs) => Promise<VestedAmountResponse>;
    queryAllocation: (args: AllocationArgs) => Promise<Allocation>;
    queryBalance: (args: BalanceArgs) => Promise<BalanceResponse>;
    queryTotalSupplyAtHeight: (args: TotalSupplyAtHeightArgs) => Promise<TotalSupplyResponse>;
    queryBalanceAtHeight: (args: BalanceAtHeightArgs) => Promise<BalanceResponse>;
    queryTokenInfo: () => Promise<TokenInfoResponse>;
    queryMinter: () => Promise<Nullable_MinterResponse>;
    queryAllowance: (args: AllowanceArgs) => Promise<AllowanceResponse>;
    queryAllAllowances: (args: AllAllowancesArgs) => Promise<AllAllowancesResponse>;
    queryAllAccounts: (args: AllAccountsArgs) => Promise<AllAccountsResponse>;
    queryConfig: () => Promise<Config>;
    updateConfig: (sender: string, args: UpdateConfigArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    addVesting: (sender: string, args: AddVestingArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    transfer: (sender: string, args: TransferArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    withdraw: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    burn: (sender: string, args: BurnArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    burnFrom: (sender: string, args: BurnFromArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
    mint: (sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
