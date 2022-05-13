  /**
   * m = alert message
   * a = alert level
   * n = number
   * o = location of operation
   * o2 = second location of operation
   * d = Date
   * t = Time
   * i = id of baseOperation
   * b = district_id
   */
  export interface BaseIncident {
      m: string;
      a: string;
      n: string;
      o: string;
      o2: string;
      d: string;
      t: string;
      i: string;
      b: string;
  }

  /**
   * target = bezrik_ + districtId
   * Einsatz = active incidents in specified district
   */
  export interface ActiveIncidentsPerDistrict {
      target: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Einsatz: BaseIncident[];
  }
