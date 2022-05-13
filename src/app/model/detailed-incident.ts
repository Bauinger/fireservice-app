
  /**
   * n = name of participant
   * s = ?
   * dt = disposition (date time)
   * at = alerting (date time)
   * at = disengaged (date time)
   * it = funrisings (date time)
   */
  export interface IncidentParticipant {
      n: string;
      s: string;
      dt: string;
      at: string;
      ot: string;
      it: string;
  }

  /**
   *  m = incident message
   *  o = location
   *  p = ?
   *  o2 = second location
   *  d = Date
   *  t = start time
   *  a = alert level
   *  n = ?
   *  id = ?
   *  Dispo = list of incident participants
   */
  export interface DetailedIncident {
      m: string;
      o: string;
      p: string;
      o2: string;
      d: string;
      t: string;
      a: string;
      n: string;
      id: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Dispo: IncidentParticipant[];
  }
