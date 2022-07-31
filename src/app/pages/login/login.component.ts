import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, FormControl, AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ngx-validators'
import { HrmService } from 'src/app/services/hrm.service';
import { userTable } from 'src/app/userTable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    model: userTable = new userTable()
    credentional: any;

    constructor(
        private router: Router,
        private hrm: HrmService
    ) {

    }


    login() {
        let loginModel = {
            userName: this.model.userName,
            password: this.model.password,
        };
        console.log("loginModel", loginModel)
        this.hrm.AdminLogin(loginModel).subscribe(result => {
            this.credentional = result;
            console.log(this.credentional);
            if (!this.credentional.isSuccess) {
                alert('Invalid Email and Password');
            }
            else {
                const data = result;
                localStorage.setItem('token', JSON.stringify(this.credentional.token));
                if (data)
                    localStorage.setItem('user', JSON.stringify(data));
                this.router.navigate(['/']);
            }
        })
    }


    // ngAfterViewInit() {
    //     document.getElementById('preloader').classList.add('hide');
    // }

}
