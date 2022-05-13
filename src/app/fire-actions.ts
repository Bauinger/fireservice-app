export class LoadMainData {
  static readonly type = '[Fire] Load main data';
}

export class LoadBazInfo {
  static readonly type = '[Fire] Load BAZ info';
}

export class LoadDistrictDetail {
  static readonly type = '[Fire] Load district detail';
  constructor(public districtId: string) {}
}

export class LoadIncidentDetail {
  static readonly type = '[Fire] Load incident detail';
  constructor(public incidentId: string) {}
}

export class ActivateIntervalForMainDataSync {
  static readonly type = '[Fire] Activate interval for MainData-Sync';
}

export class ActivateIntervalForLoadBazInfo {
  static readonly type = '[Fire] Activate interval for load BAZ info';
}

export class ActivateIntervalForLoadDistrictDetail {
  static readonly type = '[Fire] Activate interval for load district detail';
  constructor(public districtId: string) {}
}

export class ActivateIntervalForLoadIncidentDetail {
  static readonly type = '[Fire] Activate interval for load incident detail';
  constructor(public incidentId: string) {}
}

