import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-reset-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './PasswordResetPage.component.html',
  styleUrl: './PasswordResetPage.component.css',
})
export class PasswordResetPageComponent implements OnInit {
  // @Input()
  // set userId(userId: string) {
  //   this.Id = userId;
  // }
  // @Input()
  // set token(token: string) {
  //   this.Token = token;
  // }

  // Id = '';
  // Token = '';

  Id: string = '';
  Token: string = '';

  constructor(private route: ActivatedRoute) {
    this.Id = this.route.snapshot.params['userId'];
    this.Token = this.route.snapshot.params['token'];
  }

  // ...


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params); // e.g. { "query": "shoes", "min_price": "10", "max_price": "75" }
      this.Id = params["userId"];
      this.Token = params["token"]; 

    });
  }


}
