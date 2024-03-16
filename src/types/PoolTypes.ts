export interface Pools {
  data?: PoolDataEntity[] | null;
}
export interface PoolDataEntity {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}
export interface Attributes {
  base_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_usd: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  address: string;
  name: string;
  pool_created_at: string;
  fdv_usd: string;
  market_cap_usd?: string | null;
  price_change_percentage: PriceChangePercentageOrVolumeUsd;
  transactions: Transactions;
  volume_usd: PriceChangePercentageOrVolumeUsd;
  reserve_in_usd: string;
}
export interface PriceChangePercentageOrVolumeUsd {
  m5: string;
  h1: string;
  h6: string;
  h24: string;
}
export interface Transactions {
  m5: M5OrM15OrM30OrH1OrH24;
  m15: M5OrM15OrM30OrH1OrH24;
  m30: M5OrM15OrM30OrH1OrH24;
  h1: M5OrM15OrM30OrH1OrH24;
  h24: M5OrM15OrM30OrH1OrH24;
}
export interface M5OrM15OrM30OrH1OrH24 {
  buys: number;
  sells: number;
  buyers?: number | null;
  sellers?: number | null;
}
export interface Relationships {
  base_token: BaseTokenOrQuoteTokenOrDex;
  quote_token: BaseTokenOrQuoteTokenOrDex;
  dex: BaseTokenOrQuoteTokenOrDex;
}
export interface BaseTokenOrQuoteTokenOrDex {
  data: Data;
}
export interface Data {
  id: string;
  type: string;
}
