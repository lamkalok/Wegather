webpackJsonp([0],{

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(537);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_tabs__ = __webpack_require__(97);
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
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.joinedGroups = [];
        //console.log(navParams.data);
        try {
            var groups = navParams.data;
            groups.forEach(function (element) {
                if (element.joined) {
                    console.log(element);
                    _this.joinedGroups.push(element.id);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        var regex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");
        if (this.password == this.password2) {
            if (this.password.match(regex)) {
                this.shareServiceProvider.showLoading();
                this.authServiceProvider.signup(this.email, this.password).then(function (value) {
                    var Uid = _this.authServiceProvider.getLoggedUID();
                    _this.user = {
                        uid: Uid,
                        img: "",
                        name: _this.name,
                        email: _this.email,
                        phone: _this.phone,
                        joinedGroups: _this.joinedGroups,
                    };
                    console.log("UID: " + Uid);
                    _this.userServiceProvider.createUser(_this.user, Uid).then(function () {
                        _this.groupServiceProvider.addMemberToGroup(_this.user, _this.joinedGroups).then(function () {
                            _this.userServiceProvider.getUser(_this.authServiceProvider.firebaseAuth.auth.currentUser.uid).then(function (u) {
                                _this.authServiceProvider.userData = u;
                                _this.shareServiceProvider.hideLoading();
                                //this.navCtrl.pop();
                                _this.shareServiceProvider.showToast("Register success");
                                //this.navCtrl.push('RegisterSelectCategoriesPage')
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__tabs_tabs__["a" /* TabsPage */]);
                                _this.navCtrl.popToRoot();
                            });
                        });
                    });
                })
                    .catch(function (err) {
                    _this.shareServiceProvider.hideLoading();
                    _this.shareServiceProvider.showAlert("Register Fail, Something went wrong!");
                });
            }
            else {
                this.shareServiceProvider.showAlert("Register Fail, password should longer than 8 length and contains number and letter !");
            }
        }
        else {
            this.shareServiceProvider.showAlert("Register Fail, please input the same password!");
        }
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n      <img src="../../assets/imgs/wegather_logo.png">\n\n  <div>\n    <form #registerForm="ngForm">\n   \n        <ion-list inset>\n\n            <ion-item>\n             \n              <ion-input [(ngModel)]="name" type="text" placeholder="User Name" name="name" required></ion-input>\n            </ion-item>\n          \n            <ion-item>\n            \n              <ion-input [(ngModel)]="phone" type="text" placeholder="Your Phone Number" name="phone" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n               \n                <ion-input [(ngModel)]="email" type="text" placeholder="Email Address" name="email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n               \n                <ion-input [(ngModel)]="password" type="password" placeholder="Password (8+ letters and numbers)" name="password" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n                \n                <ion-input [(ngModel)]="password2" type="password" placeholder="Password (8+ letters and numbers)" name="password" required></ion-input>\n            </ion-item>\n          \n          </ion-list>\n\n           \n<br />\n      <ion-row>\n        <ion-col class="signup-col">\n\n          <button ion-button block color="skyblue" outline (click)="register()">Submit</button>\n\n        </ion-col>\n      </ion-row>\n\n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
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