import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult, InstantiateResult } from "@cosmjs/cosmwasm-stargate"; 
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
export type CallbackArgs =
  | {
      update_pool_on_dual_rewards_claim: {
        pool_type: PoolType;
        prev_reward_balances: Asset[];
        [k: string]: unknown;
      };
    }
  | {
      withdraw_user_lockup_rewards_callback: {
        duration: number;
        pool_type: PoolType;
        user_address: Addr;
        withdraw_lp_stake: boolean;
        [k: string]: unknown;
      };
    }
  | {
      finish_lockup_migration_callback: {
        /**
         * The duration of the lock period.
         */
        duration: number;
        /**
         * The lockup info from the XYK lockdrop contract. Is used to create a LockupInfoV2 entry on the PCL lockdrop contract's side.
         */
        lockup_info: LockupInfoV2;
        /**
         * The address of the LP token of the pool.
         */
        lp_token: string;
        /**
         * The type of the pool the lockup is related to.
         */
        pool_type: PoolType;
        /**
         * The amount of staked LP token the PCL lockdrop contract possesses of before liquidity provision and staking to the incentives. Used to calculate LP token amount received for liquidity provision.
         */
        staked_lp_token_amount: Uint128;
        /**
         * The address of the user which owns the lockup.
         */
        user_address: Addr;
        /**
         * The lockup owner's info from the XYK lockdrop contract. Is used to create a UserInfo entry on the PCL lockdrop contract's side.
         */
        user_info: UserInfo;
        [k: string]: unknown;
      };
    };
export type PoolType2 = "USDC" | "ATOM";

export interface NeutronLockdropPclSchema {
  responses:
    | Config
    | LockUpInfoResponse
    | PoolInfo
    | Nullable_Uint128
    | Nullable_Uint1281
    | StateResponse
    | UserInfoResponse
    | UserInfoWithListResponse;
  query:
    | PoolArgs
    | UserInfoArgs
    | UserInfoWithLockupsListArgs
    | LockUpInfoArgs
    | QueryUserLockupTotalAtHeightArgs
    | QueryLockupTotalAtHeightArgs;
  execute:
    | UpdateConfigArgs
    | ClaimRewardsAndOptionallyUnlockArgs
    | CallbackArgs
    | ProposeNewOwnerArgs
    | MigrateXykLiquidityArgs;
  instantiate?: InstantiateMsg;
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
   * Incentives contract address
   */
  incentives: Addr;
  /**
   * Total NTRN lockdrop incentives to be distributed among the users
   */
  lockdrop_incentives: Uint128;
  /**
   * Describes rewards coefficients for each lockup duration
   */
  lockup_rewards_info: LockupRewardsInfo[];
  /**
   * Account which can update the config
   */
  owner: Addr;
  /**
   * Original XYK lockdrop contract address
   */
  xyk_lockdrop_contract: Addr;
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
   * Tokens receivable as incentives rewards that user can claim
   */
  claimable_incentives_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
  duration: number;
  /**
   * incentives tokens lockup received as incentives rewards
   */
  incentives_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
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
   * Ratio of incentives rewards accured to astroport pool share
   */
  incentives_rewards_per_share: RestrictedVectorFor_AssetInfoAnd_Decimal;
  /**
   * Share of total NTRN incentives allocated to this pool
   */
  incentives_share: Uint128;
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
   * Tokens receivable as incentives rewards that user can claim
   */
  claimable_incentives_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
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
   * Tokens receivable as incentives rewards that user can claim
   */
  claimable_incentives_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
  duration: number;
  /**
   * incentives tokens lockup received as incentives rewards
   */
  incentives_debt: RestrictedVectorFor_AssetInfoAnd_Uint128;
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
export interface UpdateConfigArgs {
  new_config: UpdateConfigMsg;
  [k: string]: unknown;
}
export interface UpdateConfigMsg {
  /**
   * incentives (Staking for dual rewards) contract address
   */
  incentives_address?: string | null;
  [k: string]: unknown;
}
export interface ClaimRewardsAndOptionallyUnlockArgs {
  duration: number;
  pool_type: PoolType;
  withdraw_lp_stake: boolean;
  [k: string]: unknown;
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
export interface LockupInfoV2 {
  astroport_lp_transferred?: Uint128 | null;
  /**
   * Generator NTRN tokens loockup received as generator rewards
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
   * Timestamp beyond which this position can be unlocked
   */
  unlock_timestamp: number;
  /**
   * Boolean value indicating if the user's has withdrawn funds post the only 1 withdrawal limit cutoff
   */
  withdrawal_flag: boolean;
  [k: string]: unknown;
}
export interface UserInfo {
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
export interface MigrateXykLiquidityArgs {
  /**
   * The duration of the lock period.
   */
  duration: number;
  /**
   * The lockup info from the XYK lockdrop contract. Is used to create a LockupInfoV2 entry on the PCL lockdrop contract's side.
   */
  lockup_info: LockupInfoV2;
  /**
   * The type of the pool the lockup is related to.
   */
  pool_type: PoolType2;
  /**
   * The address of the user which owns the lockup.
   */
  user_address_raw: string;
  /**
   * The lockup owner's info from the XYK lockdrop contract. Is used to create a UserInfo entry on the PCL lockdrop contract's side.
   */
  user_info: UserInfo;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  /**
   * Share of total NTRN incentives allocated to the NTRN/ATOM PCL pool
   */
  atom_incentives_share: Uint128;
  /**
   * Address of the LP token of the NTRN/ATOM PCL pool
   */
  atom_token: string;
  /**
   * Weighted LP Token balance used to calculate NTRN rewards a particular NTRN/ATOM pool depositor can claim
   */
  atom_weighted_amount: Uint256;
  /**
   * Auction contract address
   */
  auction_contract: string;
  /**
   * Credits contract address
   */
  credits_contract: string;
  /**
   * Incentives (Staking for dual rewards) contract address
   */
  incentives: string;
  /**
   * Total NTRN lockdrop incentives distributed among the users.
   */
  lockdrop_incentives: Uint128;
  /**
   * Describes rewards coefficients for each lockup duration
   */
  lockup_rewards_info: LockupRewardsInfo[];
  /**
   * Account which can update config
   */
  owner?: string | null;
  /**
   * Share of total NTRN incentives allocated to the NTRN/USDC PCL pool
   */
  usdc_incentives_share: Uint128;
  /**
   * Address of the LP token of the NTRN/USDC PCL pool
   */
  usdc_token: string;
  /**
   * Weighted LP Token balance used to calculate NTRN rewards a particular NTRN/USDC pool depositor can claim
   */
  usdc_weighted_amount: Uint256;
  /**
   * Original XYK lockdrop contract address
   */
  xyk_lockdrop_contract: string;
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
  queryConfig = async(): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, { config: {} });
  }
  queryState = async(): Promise<StateResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { state: {} });
  }
  queryPool = async(args: PoolArgs): Promise<PoolInfo> => {
    return this.client.queryContractSmart(this.contractAddress, { pool: args });
  }
  queryUserInfo = async(args: UserInfoArgs): Promise<UserInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { user_info: args });
  }
  queryUserInfoWithLockupsList = async(args: UserInfoWithLockupsListArgs): Promise<UserInfoWithListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { user_info_with_lockups_list: args });
  }
  queryLockUpInfo = async(args: LockUpInfoArgs): Promise<LockUpInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { lock_up_info: args });
  }
  queryQueryUserLockupTotalAtHeight = async(args: QueryUserLockupTotalAtHeightArgs): Promise<Nullable_Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, { query_user_lockup_total_at_height: args });
  }
  queryQueryLockupTotalAtHeight = async(args: QueryLockupTotalAtHeightArgs): Promise<Nullable_Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, { query_lockup_total_at_height: args });
  }
  updateConfig = async(sender:string, args: UpdateConfigArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { update_config: args }, fee || "auto", memo, funds);
  }
  claimRewardsAndOptionallyUnlock = async(sender:string, args: ClaimRewardsAndOptionallyUnlockArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { claim_rewards_and_optionally_unlock: args }, fee || "auto", memo, funds);
  }
  callback = async(sender:string, args: CallbackArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { callback: args }, fee || "auto", memo, funds);
  }
  proposeNewOwner = async(sender:string, args: ProposeNewOwnerArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { propose_new_owner: args }, fee || "auto", memo, funds);
  }
  dropOwnershipProposal = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { drop_ownership_proposal: {} }, fee || "auto", memo, funds);
  }
  claimOwnership = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { claim_ownership: {} }, fee || "auto", memo, funds);
  }
  migrateXykLiquidity = async(sender:string, args: MigrateXykLiquidityArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { migrate_xyk_liquidity: args }, fee || "auto", memo, funds);
  }
}
