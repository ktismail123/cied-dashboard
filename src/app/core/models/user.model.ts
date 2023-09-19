/** Login Details */
export interface IUserLogin {
  success: boolean
  detail: string
  code: number
  data: IUserLoginData
}

export interface IUserLoginData {
  token: string
  id: string
  username: string
  status: number
  email_verified: boolean
  terms_accepted: boolean
}

/** User Details */
export interface IUserDetails {
  success: boolean
  detail: string
  code: number
  data: IUserDetailsData
}

export interface IUserDetailsData {
  id: string
  first_name: string
  last_name: string
  email: string
  dob: string
  phone: IUserDetailsDataPhone
  address: string
  terms_accepted: boolean
  privacy_accepted: boolean
  email_verified: boolean
  status: number
  image: string
  updated_email: string
  blocked: boolean
  date_joined: string
  type: number
}

export interface IUserDetailsDataPhone {
  dial_code: string
  phone: string
}

/** Stages and graph values */
export interface IStageGraph {
  success: boolean
  detail: string
  code: number
  data: IStageGraphData
}

export interface IStageGraphData {
  graph: IGraphData[]
  stage_type_count: IStageData[]
}

export interface IGraphData {
  stage_name: string
  leads: number
}

export interface IStageData {
  stage_type: string
  value: string
}

/** Active Leads status */
export interface IActiveLeads {
  success: boolean
  detail: string
  code: number
  data: IActiveLeadsData
}

export interface IActiveLeadsData {
  count: number
  next: unknown
  previous: unknown
  results: IActiveLeadsDataResult[]
}

export interface IActiveLeadsDataResult {
  id: string
  lead_count: number
  updated_on: string
  is_deleted: boolean
  name: string
  is_active: boolean
  position: number
  is_default: boolean
  form: number
}

/** Leads list */
export interface ILeadsList {
  success: boolean
  detail: string
  code: number
  data: ILeadsListData
}

export interface ILeadsListData {
  count: number
  total_deal_Value: number
  next: unknown
  previous: unknown
  results: ILeadsListDataResult[]
}

export interface ILeadsListDataResult {
  id: string
  name: string
  forms: Form[]
  organization: ILeadsListOrganization
  label: unknown[]
  stage_contact: unknown
  category: ILeadsListDataResultCategory
  description: string
  pipedrive: string
  probability: number
  source: string
  stage: Stage[]
  type: string
  created_on: string
  updated_on: string
  updater: number
  dealer_probablity: number
  deal_value: string
  is_deleted: boolean
  stage_submission_id?: string
  current_stage: ILeadsListDataResultCurrentStage
  previous_contact: unknown[]
  prospect_history: ProspectHistory[]
}

export interface Form {
  submission_id: string
  form: string
  type: string
}

export interface ILeadsListOrganization {
  id: string
  logo: string
  org_profile: unknown[]
  is_deleted: boolean
  name: string
  email: string
  website: string
  country: string
  team_size: string
  revenue: string
  address: string
  linked_in: unknown
  pipdrive_id: number
}

export interface ILeadsListDataResultCategory {
  id: string
  name: string
}

export interface Stage {
  name: string
  id: string
  is_active: boolean
  stage_form_id?: string
  position: number
  probability: number
  lead_count: number
  updated_on: string
  is_deleted: boolean
  stage_history_id?: string
}

export interface ILeadsListDataResultCurrentStage {
  id: string
  lead_count: number
  updated_on: string
  is_deleted: boolean
  name: string
  is_active: boolean
  position: number
  is_default: boolean
  form: number
}

export interface ProspectHistory {
  submission_id: string
  form: string
  type: string
}

/**Probality */
export interface Iprobability {
  success: boolean
  detail: string
  code: number
  data: IprobabilityData
}

export interface IprobabilityData {
  low_deal_value: number
  medium_deal_value: number
  high_deal_value: unknown
  low_count: number
  low_percent: number
  high_count: number
  high_percent: number
  medium_count: number
  medium_percent: number
}

/**  Probability*/
export interface IProbability {
  perc: string;
  title: string;
  count: string;
  color: string;
}