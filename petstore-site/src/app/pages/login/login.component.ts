import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private auth: AuthService
	) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.loginForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", Validators.required]
		});
	}

	onSubmitLogin(value: any) {
		const email = value.email,
			password = value.password;
		this.auth.signIn(email, password).subscribe(
			result => {
				this.router.navigate(["/"]);
			},
			error => {
				console.log(error);
			}
		);
	}
}