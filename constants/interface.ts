export interface ReportInterface {
  id: number;
  report_monthly_id: number;
  date: string;
  desc: string;
  status: number;
  type: number;
  cash: number;
}

export interface ReportDetailInterface {
  date: string;
  debit: number;
  credit: number;
  total: number;
}

export interface CalculateDetailInterface {
  total: number;
  debit: number;
  credit: number;
}

export interface ResponseDetailInterface {
  data: {
    list: ReportDetailInterface[],
    calculate: CalculateDetailInterface,
  }
}

export interface ReportDetailDateInterface {
  date: string;
  desc: string;
  cash: number;
  status: number;
}

export interface ResponseDetailDateInterface {
  data: {
    list: ReportDetailDateInterface[],
    calculate: CalculateDetailInterface,
  }
}