import {Component, EventEmitter, forwardRef, Injector, Input, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '@app/_bases';
import { Survey } from '@app/_models';

@Component({
  selector: 'survey-select',
  templateUrl: 'survey_select.component.html',
  // styleUrls: ['survey_select.component.css']
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SurveySelectComponent),
    multi: true
  }]  
})
export class SurveySelectComponent extends BaseComponent implements ControlValueAccessor {
  /**
   * array of main objects for this page
  */
  @Input('surveys') surveys: [];
  @Input('filter') filter: [Number];

  // emit event of changing survey, and transfer survey object
  @Output('change') change = new EventEmitter();

  selcetedSurvey = null;

  /** For loading surveys */
  object_type = Survey;
  nextOffset = true;
  params = null;

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor (public injector: Injector) {
    super(injector);
  }

  public get ngModel(): string { return this.selcetedSurvey }
  public set ngModel(v: string) {
    if (v !== this.selcetedSurvey) {     
      this.selcetedSurvey = v;
      this._onChange(v);
    }
  }  

  writeValue(value: any): void {    
    this.ngModel = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  /** This part is for getting surveys */
  /**
   * Make params for getting list of objects
   */ 
  initParams() {
    return {
      "offset": 0,
      "limit": this.APPCONSTS.FIRSTLOAD_COUNT
    }
  }

  /**
   * Load object  data into page
  */
  loadMainPageObjects() {
    // start search
    this.search();
  }

  /**
   *  Search for list of main objects in page for management
   * - For example: if the derived component is customer management, this method will search for all customers
   * - All subsequence search for other segment will be processed by {@link BaseComponent.loadMore | loadMore() method} 
  */
  search() {
    // Init search state
    this.nextOffset = true;
    this.objects = null;
    
    // Making search parameters
    this.params = this.initParams();
    
    // start search
    this.loadMore();
  }

  /**
   * Remove survey that meet types in filter list
   * @input filter is list of survey types that will be passed by this function
   * @output return list of survey
  */
  filterSurvey(surveys, filter:[Number]) {
    if (!surveys || !surveys.length)   return null;
    if (!filter || !filter.length)   return surveys;

    let out = [];
    for (let item of surveys) {
      let type = item.type;
      if (filter.includes(type)) {
        out.push(item);
      }
    }
    return out;
  }

  /**
  * Insert new object list into current list. Apply when scroll down page
  */
  insertObjectsToList(data) {
    if (data.length==this.params.limit) {
      this.params.offset += this.params.limit;
      this.params.limit = this.APPCONSTS.LOADMORE_COUNT;
      this.nextOffset = true;
    }
      
    data = this.filterSurvey(data, this.filter);
    if (this.objects == undefined || this.objects == null) {
      this.objects = data;
    } else {
      if(data && data.length > 0){
        this.objects = this.objects.concat(data);
      }
    }
  }
    
  /**
   * Load more objects when scroll down; search for next segment of objects
   **/ 
  loadMore() {
    let url = this.getListingURL();

    if (this.nextOffset) {
      this.nextOffset = false;
      this.app_service.postAPI(url, this.params, this.insertObjectsToList.bind(this));
    }
  }

  /**
   * hanlde event on change survey selection
  */
  changeSelectedSurvey($event) {
    // console.log("Input - Change selected survey model: ", this.selcetedSurvey);
    // console.log("Input - selected survey event: ", $event);
    this.change.emit(this.selcetedSurvey);
  }

}
