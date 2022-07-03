import { IncidentParticipant } from './model/detailed-incident';
import { District, MainData, StatisticPeriod } from './model/main-data';
import { DataService } from './services/data.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
// eslint-disable-next-line max-len
import { LoadBazInfo, LoadMainData, LoadDistrictDetail, LoadIncidentDetail } from './fire-actions';
import { tap } from 'rxjs/operators';
import * as converter from 'xml-js';
import { BaseIncident } from './model/active-incidents-district';

const REFRESH_INTERVAL = 30000;

export interface FireStateModel {
  districts: District[];
  sumCurrent: number;
  currentStatisticValue: object;
  sum12h: number;
  staticticValue12h: any;
  sum24h: number;
  staticticValue24h: any;
  bazOnline: any;
  departmentCount: number;
  incidentCount: number;
  districtCount: number;
  mapColorStates: Map<string, string>;
  incidentsOfDistricts: BaseIncident[];
  nameOfDistrict: string;
  bazOnlineOfDistrict: boolean;
  incidentCountOfDistrict: number;
  alertLevelOfIncident: string;
  messageOfIncident: string;
  locationOfIncident: string;
  secondLocationOfIncident: string;
  dateTimeOfIncident: string;
  participantsOfIncident: IncidentParticipant[];
}

@State<FireStateModel>({
  name: 'fire',
  defaults: {
    districts: [],
    sumCurrent: 0,
    currentStatisticValue: null,
    sum12h: 0,
    staticticValue12h: null,
    sum24h: 0,
    staticticValue24h: null,
    bazOnline: {},
    departmentCount: 0,
    incidentCount: 0,
    districtCount: 0,
    mapColorStates: new Map<string, string>(),
    incidentsOfDistricts: null,
    nameOfDistrict: '',
    bazOnlineOfDistrict: false,
    incidentCountOfDistrict: 0,
    alertLevelOfIncident: '',
    messageOfIncident: '',
    locationOfIncident: '',
    secondLocationOfIncident: '',
    dateTimeOfIncident: '',
    participantsOfIncident: []
  }
})
@Injectable()
export class FireState {
  districtMapMappings = new Map<string, string>(
    [
      ['01', 'amstetten'],
      ['02', 'baden'],
      ['03', 'bruck-leitha'],
      ['04', 'gaenserndorf'],
      ['05', 'gmuend'],
      ['061', 'klosterneuburg'],
      ['062', 'purkersdorf'],
      ['063', 'schwechat'],
      ['07', 'hollabrunn'],
      ['08', 'horn'],
      ['09', 'stockerau'],
      ['10', 'krems'],
      ['11', 'lilienfeld'],
      ['12', 'melk'],
      ['13', 'mistelbach'],
      ['14', 'moedling'],
      ['15', 'neunkirchen'],
      ['17', 'st-poelten'],
      ['18', 'scheibbs'],
      ['19', 'tulln'],
      ['20', 'waidhofen-thaya'],
      ['21', 'wr-neustadt'],
      ['22', 'zwettl']
    ]
  );
  bazNamesMapping = new Map<string, string>(
    [
      ['LWZ', 'LWZ'],
      ['01', 'BAZ Amstetten'],
      ['02', 'BAZ Baden'],
      ['03', 'BAZ Bruck/Leitha'],
      ['04', 'BAZ Gänserndorf'],
      ['05', 'BAZ Gmünd'],
      ['061', 'AAZ Klosterneuburg'],
      ['062', 'AAZ Purkersdorf'],
      ['063', 'AAZ Schwechat'],
      ['07', 'BAZ Hollabrunn'],
      ['08', 'BAZ Horn'],
      ['09', 'BAZ Stockerau'],
      ['10', 'BAZ Krems'],
      ['11', 'BAZ Lilienfeld'],
      ['12', 'BAZ Melk'],
      ['13', 'BAZ Mistelbach'],
      ['14', 'BAZ Mödling'],
      ['15', 'BAZ Neunkirchen'],
      ['17', 'BAZ St. Pölten'],
      ['18', 'BAZ Scheibbs'],
      ['19', 'BAZ Tulln'],
      ['20', 'BAZ Waidhofen/T.'],
      ['21', 'BAZ Wr. Neustadt'],
      ['22', 'BAZ Zwettl']
    ]
  );
  warnStates = ['none', 'low', 'medium', 'high'];
  colorStatesMapping = new Map<number, string>(
    [
      [0, 'var(--ion-color-medium)'],
      [1, 'var(--ion-color-warning)'],
      [2, 'var(--ion-color-medium-danger)'],
      [3, 'var(--ion-color-danger)']
    ]
  );

  constructor(
    private dataService: DataService
  ) {}

  @Selector()
  static districts(state: FireStateModel) {
    return state.districts;
  }

  @Selector()
  static bazOnline(state: FireStateModel) {
    return state.bazOnline;
  }

  @Selector()
  static departmentCount(state: FireStateModel) {
    return state.departmentCount;
  }

  @Selector()
  static incidentCount(state: FireStateModel) {
    return state.incidentCount;
  }

  @Selector()
  static districtCount(state: FireStateModel) {
    return state.districtCount;
  }

  @Selector()
  static mapColorStates(state: FireStateModel) {
    return state.mapColorStates;
  }

  @Selector()
  static incidentsOfDistricts(state: FireStateModel) {
    return state.incidentsOfDistricts;
  }

  @Selector()
  static nameOfDistrict(state: FireStateModel) {
    return state.nameOfDistrict;
  }

  @Selector()
  static bazOnlineOfDistrict(state: FireStateModel) {
    return state.bazOnlineOfDistrict;
  }

  @Selector()
  static incidentCountOfDistrict(state: FireStateModel) {
    return state.incidentCountOfDistrict;
  }

  @Selector()
  static alertLevelOfIncident(state: FireStateModel) {
    return state.alertLevelOfIncident;
  }
  @Selector()
  static messageOfIncident(state: FireStateModel) {
    return state.messageOfIncident;
  }
  @Selector()
  static locationOfIncident(state: FireStateModel) {
    return state.locationOfIncident;
  }
  @Selector()
  static secondLocationOfIncident(state: FireStateModel) {
    return state.secondLocationOfIncident;
  }
  @Selector()
  static dateTimeOfIncident(state: FireStateModel) {
    return state.dateTimeOfIncident;
  }
  @Selector()
  static participantsOfIncident(state: FireStateModel) {
    return state.participantsOfIncident;
  }
  @Selector()
  static sumCurrent(state: FireStateModel) {
    return state.sumCurrent;
  }
  @Selector()
  static currentStatisticValue(state: FireStateModel) {
    return state.currentStatisticValue;
  }
  @Selector()
  static sum12h(state: FireStateModel) {
    return state.sum12h;
  }
  @Selector()
  static statisticValue12h(state: FireStateModel) {
    return state.staticticValue12h;
  }
  @Selector()
  static sum24h(state: FireStateModel) {
    return state.sum24h;
  }
  @Selector()
  static statisticValue24h(state: FireStateModel) {
    return state.staticticValue24h;
  }

  @Action(LoadMainData)
  loadMainData(ctx: StateContext<FireStateModel>, action: LoadMainData) {
    return this.dataService.getMainData()
      .pipe(
        tap((mainData: MainData) => {
          let dpC = 0;
          let idC = 0;
          const mcs = new Map<string, string>();
          let dC = 0;
          mainData.Bezirke.forEach((district: District) => {
            dpC += district.f;
            idC += district.e;
            if(district.k === '') {
              district.k = 'LWZ';
            }
            if(district.z > 0) {
              dC++;
            }
            mcs.set(this.districtMapMappings.get(district.k), this.colorStatesMapping.get(district.z));
          });
          ctx.patchState({
            districts: mainData.Bezirke,
            sumCurrent: mainData.h1.s,
            sum12h: mainData.h2.s,
            sum24h: mainData.h3.s,
            currentStatisticValue: this.processDataToStatistics(mainData.h1),
            staticticValue12h: this.processDataToStatistics(mainData.h2),
            staticticValue24h: this.processDataToStatistics(mainData.h3),
            departmentCount: dpC,
            incidentCount: idC,
            mapColorStates: mcs,
            districtCount: dC
          });
        })
      );
  }

  @Action(LoadBazInfo)
  loadBazInfo(ctx: StateContext<FireStateModel>, action: LoadBazInfo) {
    return this.dataService.getBazInfo()
     .pipe(
        tap(x => {
          const result = {};
          const data = JSON.parse(converter.xml2json(x, {compact: true, spaces: 4}));
          data?.root?.aBAZID?.forEach(baz => {
            // eslint-disable-next-line no-underscore-dangle
            const district = baz.cBezirk._cdata === undefined ? 'LWZ' : baz.cBezirk._cdata;
            // eslint-disable-next-line no-underscore-dangle
            result[district] = baz.nBAZStatus._cdata === 'ledgreen.gif';
          });
          ctx.patchState({
            bazOnline: result,
          });
        })
      );
  }

  @Action(LoadDistrictDetail)
  loadDistrictDetail(ctx: StateContext<FireStateModel>, action: LoadDistrictDetail) {
    return this.dataService.getActiveIncidents(action.districtId)
      .pipe(
        tap(activeIncidentsInDistrict =>
          ctx.patchState({
            incidentsOfDistricts: activeIncidentsInDistrict.Einsatz,
            nameOfDistrict: this.bazNamesMapping.get(action.districtId),
            bazOnlineOfDistrict: ctx.getState().bazOnline[action.districtId],
            incidentCountOfDistrict: activeIncidentsInDistrict.Einsatz.length
          })
        )
      );
  }

  @Action(LoadIncidentDetail)
  loadIncidentDetail(ctx: StateContext<FireStateModel>, action: LoadIncidentDetail) {
    return this.dataService.getIncidentData(action.incidentId)
      .pipe(
        tap(incidentData =>
          ctx.patchState({
            alertLevelOfIncident: incidentData.a,
            messageOfIncident: incidentData.m,
            locationOfIncident: incidentData.o,
            secondLocationOfIncident: incidentData.o2,
            dateTimeOfIncident: incidentData.d + ' ' + incidentData.t,
            participantsOfIncident: [...incidentData.Dispo]
          })
        )
      );
  }

  processDataToStatistics(val: StatisticPeriod) {
    let tec = 0;
    let fire = 0;
    let toxic = 0;
    let so = 0;
    val.v.forEach(x => {
      switch(x.a[0]) {
        case 'T':
          tec += x.s;
          break;
        case 'B':
          fire += x.s;
          break;
        case 'S':
          toxic += x.s;
          break;
        default:
          so += x.s;
          break;
      }
    });
    return [
      {
        name: 'Technische Einsätze',
        value: tec
      },
      {
        name: 'Brandeinsätze',
        value: fire
      },
      {
        name: 'Schadstoffeinsätze',
        value: toxic
      },
      {
        name: 'Sonstiges',
        value: so
      },
    ];
  }
}
