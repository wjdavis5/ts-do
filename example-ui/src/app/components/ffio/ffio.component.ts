import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FfioService} from "../../services/ffio.service";
import {Feature} from "../../models/features";
import {map, tap} from 'rxjs/operators';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {LogService} from "../../services/log.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-ffio',
  templateUrl: './ffio.component.html',
  styleUrls: ['./ffio.component.css']
})
export class FfioComponent implements OnInit,AfterViewInit  {

  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Feature>;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading: boolean = false;
  features: Array<Feature> = new Array<Feature>();
  dataSource = new MatTableDataSource<Feature>(this.features);
  displayedColumns: string[] = ['name', 'value', 'toggle'];
  logService: LogService;
  customer: string = "";

  constructor(private ffioService: FfioService, logService: LogService) {
    this.logService = logService;
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    interval(500).subscribe(value =>{
      let console = document.getElementById("console")
      console!.scrollTop = console!.scrollHeight;
    });
  }

  ngOnInit(): void {
  }

  GetFeatures(customer: string): void {
    this.loading = true;
    this.logService.AppendLog(`Getting features for customer: ${customer}`);
    this.features.splice(0,this.features.length);
    this.ffioService.GetFeatures(customer).
      pipe(
        tap(value => {
          this.logService.AppendLog(`Got ${value.length} features`);
          this.logService.AppendLog(`Sample: ${JSON.stringify(value[0])}`);
        }))
      .subscribe(value => {
        this.features.push(... value);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      });
  }
  ToggleFeature(feature:Feature){
    this.loading = true;
    this.logService.AppendLog(`Toggling Feature: ${JSON.stringify(feature)}`);
    this.ffioService.ToggleFeature(feature).pipe(
      tap(value => this.logService.AppendLog(`\t=>${JSON.stringify(value)}`))
    ).subscribe(feature => {
      const index = this.features.findIndex(value => value.name === feature.name);
      this.features[index].value = feature.value;
      this.loading = false;
    },
      err => {
        this.loading = false;
        this.logService.AppendLog(JSON.stringify(err))
      })

  }
}
