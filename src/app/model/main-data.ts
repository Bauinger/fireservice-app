  /**
   * k = key of station
   * t = name of station
   * z = warnstate
   * e = incident count
   * f = department count
   */
  export interface District {
      k: string;
      t: string;
      z: number;
      e: number;
      f: number;
  }

  /**
   * s = number of occurences
   * a = alert level
   * m = alert message
   */
  export interface StatisticRecord {
      s: number;
      a: string;
      m: string;
  }

  /**
   * s = sum of firefighting operations
   * c = multiple statistic records
   */
  export interface StatisticPeriod {
      s: number;
      v: StatisticRecord[];
  }

  /**
   * h1 = actual values
   * h2 = values last 12 hours
   * h3 = values last 24 hours
   */
  export interface MainData {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Bezirke: District[];
      h1: StatisticPeriod;
      h2: StatisticPeriod;
      h3: StatisticPeriod;
  }
