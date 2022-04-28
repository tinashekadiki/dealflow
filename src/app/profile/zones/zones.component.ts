import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup} from '@angular/forms';

// import {User} from '../../shared/models/profile/user.model';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'options', 'last_update'];
  dataSource: MatTableDataSource<any>;
  showMainZoneOptions = false;
  showSubZoneOptions = false;
  currentZone: number;
  numberOfSubZones: number;
  subZones: any[];
  zoneForm: FormGroup;
  subZoneForm: FormGroup;
  subCategory: FormGroup;
  currentSubCategoryList: any[];
  currentHasSubCategory: boolean;
  subCategoryData = [];
  showSubCategoryForm = [];
  zone_data: any = {};
  zoneData = {
    branchid: '',
    zoneDefinitionList: [
      {
        options: '1',
        subZoneDefinitions: [],
        zonename: 'Zone 1'
      },
      {
        options: '2',
        subZoneDefinitions: [],
        zonename: 'Zone 2'
      },
      {
        options: '3',
        subZoneDefinitions: [],
        zonename: 'Zone 3'
      },
      {
        options: '4',
        subZoneDefinitions: [],
        zonename: 'Zone 4'
      },
      {
        options: '5',
        subZoneDefinitions: [],
        zonename: 'Zone 5'
      }
    ]
  };


  constructor(private formBuilder: FormBuilder) {
    this.zoneForm = this.formBuilder.group({
      zonename: '',
      options: ''
    });

    this.subZoneForm = this.formBuilder.group({
      name: '',
      hassubcategory: '',
      subcategorynumber: ''
    });

    this.subCategory = this.formBuilder.group({
      name: ''
    });
  }

  editZone(main_i: number): void{
    this.currentZone = main_i;
    this.showMainZoneOptions = true;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>([
      {name: 'Regions', options: 5, last_update: '17 Mar 2021'}
    ]);
  }

  addSubCategory(id: number, event: any): void {

    console.log(event.target.value);

    this.zone_data.subZoneDefinitions.forEach((element, index) => {
      if (id === element.id) {

        for (let i = 0; i < event.target.value; i++) {
          this.zone_data.subZoneDefinitions[index].hassubcategory = 'True';
          this.zone_data.subZoneDefinitions[index].subCategoryDefinitionList.push({name: 'Deler SubCategory Name'});
        }
      }
    });
  }

  selectZone(zone: number, zone_data: any): void {
    console.log(zone);
    this.currentZone = zone;
    this.zone_data = zone_data;
    this.showMainZoneOptions = true;
  }

  counter(loop: number): Array<any> {
    let numArray: any[];
    numArray = new Array(loop);
    for (let i = 0; i < loop; i++) {
      numArray[i] = i + 1;
    }
    return numArray;
  }

  showSubZones(): void {
    this.showSubZoneOptions = true;
  }

  hideSubZones(): void {
    this.showSubZoneOptions = false;
  }

  updateZoneOptions(event: any): void {
    for (let i = 0; i < event.target.value; i++) {
      this.zone_data.subZoneDefinitions.push(
        {
          hassubcategory: false,
          id: i,
          name: 'Dealer SubZone Definitions',
          subCategoryDefinitionList: [],
          subcategorynumber: 1
        }
      );
    }
  }

  checkIfSubCategory(key): boolean {
    return this.showSubCategoryForm.includes(key);
  }

  updateSubCategory(event: any, key: string | number): void {
    this.showSubCategoryForm.push(key);

    if (this.subCategoryDataExists(key.toString())) {
      this.subCategoryData.forEach(element => {
        if (element.key === key.toString()) {
          element.options = event.target.value;
        }
      });
    } else {
      this.subCategoryData.push({
        key,
        options: event.target.value
      });
    }
  }


  subCategoryDataExists(key: string): any {
    console.log(this.subCategoryData, key);
    // let resp = this.subCategoryData.some(element => {
    //   element.key == key
    // });
    // console.log(resp);
    // return resp;
    this.subCategoryData.forEach(element => {
      if (element.key === key) {
        console.log(true);
        return true;
      }
    });
  }
}
