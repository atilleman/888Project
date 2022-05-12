import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataHttpService } from 'src/app/services/data-http.service';
import { ProdDetailsService } from 'src/app/services/prod-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() ProductDetails: any;
  @Output('SearchParamsChange') searchParams: EventEmitter<any> = new EventEmitter<any>();

  MyUser:any={
    ID:0,
    FirstName:"",
    LastName:"",
    UserName:"",
    DOB:""
  }

  FirstName:string="";
  LastName:string="";
  UserName: string="";
  DOB: Date;
  IsUpdate: Boolean=false;

  constructor(private dataHttpService: DataHttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.MyUser.ID = this.route.snapshot.queryParamMap.get('ID');
      this.dataHttpService.PostData('Eight', 'GetMyUserDetails', this.MyUser).subscribe(results =>
      {
        this.FirstName = results.UserDetails[0].FirstName;
        this.LastName = results.UserDetails[0].LastName;
        this.UserName = results.UserDetails[0].UserName;
        this.DOB = results.UserDetails[0].DOB;
      })
  }

  UpdateUser(IsFormValid, MyUserID: number){
    if (IsFormValid)
    {
      this.MyUser.ID = MyUserID;
      this.MyUser.FirstName = this.FirstName;
      this.MyUser.LastName = this.LastName;
      this.MyUser.UserName = this.UserName;
      this.MyUser.DOB = this.DOB;

      this.dataHttpService.PostData('Eight', 'UpdateMyUser', this.MyUser).subscribe(results =>
      {
        this.IsUpdate = true;
        setTimeout(()=>{
          this.IsUpdate = false;
        }, 2000);
      })
    }
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

}

