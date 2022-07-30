import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  records: any;
  person: any;
  reporterDetails: any;
  startDate = "07/26/2022";
  endDate: any = new Date();
  todayDate = new Date().getDate();
  personImagesDetail: any;
  cityProvinceReports: any;
  images: void;
  report1: any;
  fullReports: any;
  cityReport: any;
  provinceReport: any;
  cityReports: any;
  provinceReports: any;
  persontageCases: any;
  constructor(
    private hrm: HrmService,
    private datePipe: DatePipe,
    private http: HttpClient,
  ) {
    this.GetAllRecord();
    this.getAllReports();
  }
  FormatDateTime() {
    this.startDate = this.datePipe.transform(this.startDate, 'MM/dd/YYYY');
    this.endDate = this.datePipe.transform(this.endDate, 'MM/dd/YYYY');
    this.GetAllRecord();
    this.getAllReports()
  }
  GetAllRecord() {
    let latest_date = this.datePipe.transform(this.endDate, 'MM/dd/YYYY');
    this.hrm.get_record(this.startDate, latest_date).subscribe(result => {
      this.records = result as [];
      this.person = this.records.data;
    })
  }
  getAllReports() {
    let latest_date = this.datePipe.transform(this.endDate, 'MM/dd/YYYY');
    this.hrm.getReport(this.startDate, latest_date).subscribe(result => {
      this.report1 = result;
      this.persontageCases = (60) - (0.5) / (60) * (100);
      // this.persontageCases= (this.report1.data.fullReport.totalCases) - (this.report1.data.fullReport.caseCompleted) / (this.report1.data.fullReport.totalCases) * (100);
      this.cityReports = this.report1.data.cityReport;
      this.provinceReports = this.report1.data.provinceReport;
      console.log("per", this.persontageCases);
    })
  }

  // for loader/
  getIMDBData() {
    return this.http
      .get<any>('http://www.omdbapi.com/?apikey=YOUR_OMDB_KEY&s=car').subscribe((response) => {
        console.log(response);
      }
      );
  }



}
