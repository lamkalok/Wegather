webpackJsonp([0],{

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(532);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.shareServiceProvider.showLoading();
        if (this.password == this.password2) {
            this.user = {
                img: "",
                name: this.name,
                email: this.email,
                phone: this.phone,
            };
            console.log(this.user);
            this.authServiceProvider.signup(this.email, this.password).then(function (value) {
                var uid = _this.authServiceProvider.getLoggedUID();
                console.log("UID: " + uid);
                _this.userServiceProvider.createUser(_this.user, uid).then(function () {
                    _this.shareServiceProvider.hideLoading();
                    _this.navCtrl.pop();
                    _this.shareServiceProvider.showToast("Register success");
                    //this.navCtrl.push('RegisterSelectCategoriesPage')
                });
            })
                .catch(function (err) {
                _this.shareServiceProvider.hideLoading();
                _this.shareServiceProvider.showAlert("Register Fail, Something went wrong!");
            });
        }
        else {
            this.shareServiceProvider.showAlert("Register Fail, please input the same password!");
        }
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n      <img src="../../assets/imgs/wegather_logo.png">\n\n  <div>\n    <form #registerForm="ngForm">\n   \n        <ion-list inset>\n\n            <ion-item>\n             \n              <ion-input [(ngModel)]="name" type="text" placeholder="User Name" name="name" required></ion-input>\n            </ion-item>\n          \n            <ion-item>\n            \n              <ion-input [(ngModel)]="phone" type="text" placeholder="Your Phone Number" name="phone" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n               \n                <ion-input [(ngModel)]="email" type="text" placeholder="Email Address" name="email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n               \n                <ion-input [(ngModel)]="password" type="password" placeholder="Password (8+ letters and numbers)" name="password" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n                \n                <ion-input [(ngModel)]="password2" type="password" placeholder="Password (8+ letters and numbers)" name="password" required></ion-input>\n            </ion-item>\n          \n          </ion-list>\n\n           \n<br />\n      <ion-row>\n        <ion-col class="signup-col">\n\n          <button ion-button block color="skyblue" outline (click)="register()">Submit</button>\n\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=0.js.map