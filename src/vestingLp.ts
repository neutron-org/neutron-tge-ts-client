import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate"; 
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
 * This structure describes the query messages available in a historical vesting contract.
 */
export type QueryMsgHistorical =
  | {
      unclaimed_amount_at_height: {
        address: string;
        height: number;
      };
    }
  | {
      unclaimed_total_amount_at_height: {
        height: number;
      };
    };
export type Uint64 = number;
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
/**
 * This structure describes the query messages available in a with_managers vesting contract.
 */
export type QueryMsgWithManagers = {
  vesting_managers: {};
};
/**
 * This structure describes the query messages available in a with_managers vesting contract.
 */
export type QueryMsgWithManagers1 = {
  vesting_managers: {};
};
/**
 * This structure describes the query messages available in a historical vesting contract.
 */
export type QueryMsgHistorical1 =
  | {
      unclaimed_amount_at_height: {
        address: string;
        height: number;
      };
    }
  | {
      unclaimed_total_amount_at_height: {
        height: number;
      };
    };
/**
 * This structure describes the execute messages available in a managed vesting contract.
 */
export type ExecuteMsgManaged = {
  remove_vesting_accounts: {
    /**
     * Specifies the account that will receive the funds taken from the vesting accounts.
     */
    clawback_account: string;
    vesting_accounts: string[];
  };
};
/**
 * This structure describes the execute messages available in a with_managers vesting contract.
 */
export type ExecuteMsgWithManagers =
  | {
      add_vesting_managers: {
        managers: string[];
      };
    }
  | {
      remove_vesting_managers: {
        managers: string[];
      };
    };

export interface VestingLpSchema {
  responses:
    | Uint128
    | Config
    | QueryMsgHistorical
    | QueryMsgManaged
    | Uint64
    | VestingAccountResponse
    | VestingAccountsResponse
    | VestingState
    | QueryMsgWithManagers;
  query:
    | VestingAccountArgs
    | AvailableAmountArgs
    | ManagedExtensionArgs
    | WithManagersExtensionArgs
    | HistoricalExtensionArgs;
  execute:
    | ClaimArgs
    | RegisterVestingAccountsArgs
    | ProposeNewOwnerArgs
    | SetVestingTokenArgs
    | ManagedExtensionArgs1
    | WithManagersExtensionArgs1
    | HistoricalExtensionArgs1;
  [k: string]: unknown;
}
/**
 * This structure stores the main parameters for the generator vesting contract.
 */
export interface Config {
  /**
   * Contains extensions information of the contract
   */
  extensions: Extensions;
  /**
   * Address that's allowed to change contract parameters
   */
  owner: Addr;
  /**
   * Address that's allowed to change vesting token
   */
  token_info_manager: Addr;
  /**
   * [`AssetInfo`] of the vested token
   */
  vesting_token?: AssetInfo | null;
}
/**
 * Contains extensions information for the contract.
 */
export interface Extensions {
  /**
   * Whether the historical extension is enabled for the contract.
   */
  historical: boolean;
  /**
   * Whether the managed extension is enabled for the contract.
   */
  managed: boolean;
  /**
   * Whether the with_managers extension is enabled for the contract.
   */
  with_managers: boolean;
}
/**
 * This structure describes the query messages available in a managed vesting contract.
 */
export interface QueryMsgManaged {
  [k: string]: unknown;
}
/**
 * This structure describes a custom struct used to return vesting data about a specific vesting target.
 */
export interface VestingAccountResponse {
  /**
   * The address that's vesting tokens
   */
  address: Addr;
  /**
   * Vesting information
   */
  info: VestingInfo;
}
/**
 * This structure stores parameters for a batch of vesting schedules.
 */
export interface VestingInfo {
  /**
   * The total amount of vested tokens already claimed
   */
  released_amount: Uint1281;
  /**
   * The vesting schedules
   */
  schedules: VestingSchedule[];
}
/**
 * This structure stores parameters for a specific vesting schedule
 */
export interface VestingSchedule {
  /**
   * The end point for the vesting schedule
   */
  end_point?: VestingSchedulePoint | null;
  /**
   * The start date for the vesting schedule
   */
  start_point: VestingSchedulePoint;
}
/**
 * This structure stores the parameters used to create a vesting schedule.
 */
export interface VestingSchedulePoint {
  /**
   * The amount of tokens being vested
   */
  amount: Uint1281;
  /**
   * The start time for the vesting schedule
   */
  time: number;
}
/**
 * This structure describes a custom struct used to return vesting data for multiple vesting targets.
 */
export interface VestingAccountsResponse {
  /**
   * A list of accounts that are vesting tokens
   */
  vesting_accounts: VestingAccountResponse1[];
}
/**
 * This structure describes a custom struct used to return vesting data about a specific vesting target.
 */
export interface VestingAccountResponse1 {
  /**
   * The address that's vesting tokens
   */
  address: Addr;
  /**
   * Vesting information
   */
  info: VestingInfo;
}
/**
 * This structure stores the accumulated vesting information for all addresses.
 */
export interface VestingState {
  /**
   * The total amount of tokens granted to the users
   */
  total_granted: Uint1281;
  /**
   * The total amount of tokens already claimed
   */
  total_released: Uint1281;
}
export interface VestingAccountArgs {
  address: string;
}
export interface AvailableAmountArgs {
  address: string;
}
export interface ManagedExtensionArgs {
  msg: QueryMsgManaged1;
}
/**
 * This structure describes the query messages available in a managed vesting contract.
 */
export interface QueryMsgManaged1 {
  [k: string]: unknown;
}
export interface WithManagersExtensionArgs {
  msg: QueryMsgWithManagers1;
}
export interface HistoricalExtensionArgs {
  msg: QueryMsgHistorical1;
}
export interface ClaimArgs {
  /**
   * The amount of tokens to claim
   */
  amount?: Uint1281 | null;
  /**
   * The address that receives the vested tokens
   */
  recipient?: string | null;
}
export interface RegisterVestingAccountsArgs {
  vesting_accounts: VestingAccount[];
}
/**
 * This structure stores vesting information for a specific address that is getting tokens.
 */
export interface VestingAccount {
  /**
   * The address that is getting tokens
   */
  address: string;
  /**
   * The vesting schedules targeted at the `address`
   */
  schedules: VestingSchedule[];
}
export interface ProposeNewOwnerArgs {
  /**
   * The validity period of the offer to change the owner
   */
  expires_in: number;
  /**
   * The newly proposed owner
   */
  owner: string;
}
export interface SetVestingTokenArgs {
  vesting_token: AssetInfo;
}
export interface ManagedExtensionArgs1 {
  msg: ExecuteMsgManaged;
}
export interface WithManagersExtensionArgs1 {
  msg: ExecuteMsgWithManagers;
}
export interface HistoricalExtensionArgs1 {
  msg: ExecuteMsgHistorical;
}
/**
 * This structure describes the execute messages available in a historical vesting contract.
 */
export interface ExecuteMsgHistorical {
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
  queryConfig = async(): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, { config: {} });
  }
  queryVestingAccount = async(args: VestingAccountArgs): Promise<VestingAccountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { vesting_account: args });
  }
  queryVestingAccounts = async(): Promise<VestingAccountsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, { vesting_accounts: {} });
  }
  queryAvailableAmount = async(args: AvailableAmountArgs): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, { available_amount: args });
  }
  queryTimestamp = async(): Promise<Uint64> => {
    return this.client.queryContractSmart(this.contractAddress, { timestamp: {} });
  }
  queryVestingState = async(): Promise<VestingState> => {
    return this.client.queryContractSmart(this.contractAddress, { vesting_state: {} });
  }
  queryManagedExtension = async(args: ManagedExtensionArgs): Promise<QueryMsgManaged> => {
    return this.client.queryContractSmart(this.contractAddress, { managed_extension: args });
  }
  queryWithManagersExtension = async(args: WithManagersExtensionArgs): Promise<QueryMsgWithManagers> => {
    return this.client.queryContractSmart(this.contractAddress, { with_managers_extension: args });
  }
  queryHistoricalExtension = async(args: HistoricalExtensionArgs): Promise<QueryMsgHistorical> => {
    return this.client.queryContractSmart(this.contractAddress, { historical_extension: args });
  }
  claim = async(sender:string, args: ClaimArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { claim: args }, fee || "auto", memo, funds);
  }
  receive = async(sender: string, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { receive: {} }, fee || "auto", memo, funds);
  }
  registerVestingAccounts = async(sender:string, args: RegisterVestingAccountsArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { register_vesting_accounts: args }, fee || "auto", memo, funds);
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
  setVestingToken = async(sender:string, args: SetVestingTokenArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { set_vesting_token: args }, fee || "auto", memo, funds);
  }
  managedExtension = async(sender:string, args: ManagedExtensionArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { managed_extension: args }, fee || "auto", memo, funds);
  }
  withManagersExtension = async(sender:string, args: WithManagersExtensionArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { with_managers_extension: args }, fee || "auto", memo, funds);
  }
  historicalExtension = async(sender:string, args: HistoricalExtensionArgs, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> =>  {
          if (!isSigningCosmWasmClient(this.client)) { throw this.mustBeSigningClient(); }
    return this.client.execute(sender, this.contractAddress, { historical_extension: args }, fee || "auto", memo, funds);
  }
}
