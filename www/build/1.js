webpackJsonp([1],{

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSelectGroupsPageModule", function() { return RegisterSelectGroupsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_select_groups__ = __webpack_require__(535);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterSelectGroupsPageModule = /** @class */ (function () {
    function RegisterSelectGroupsPageModule() {
    }
    RegisterSelectGroupsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register_select_groups__["a" /* RegisterSelectGroupsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register_select_groups__["a" /* RegisterSelectGroupsPage */]),
            ],
        })
    ], RegisterSelectGroupsPageModule);
    return RegisterSelectGroupsPageModule;
}());

//# sourceMappingURL=register-select-groups.module.js.map

/***/ }),

/***/ 535:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterSelectGroupsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_group_service_group_service__ = __webpack_require__(167);
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
 * Generated class for the RegisterSelectGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterSelectGroupsPage = /** @class */ (function () {
    function RegisterSelectGroupsPage(navCtrl, navParams, groupServiceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupServiceProvider = groupServiceProvider;
        this.groups = [];
        this.count = 0;
        this.isValid = false;
        console.log(this.navParams);
        var data = this.navParams.data;
        if (data != null) {
            try {
                data.forEach(function (element) {
                    if (element.selected) {
                        console.log("selected cate: " + element.name);
                        var groupNames = element.groups;
                        if (groupNames != undefined) {
                            groupNames.forEach(function (group) {
                                groupServiceProvider.getGroup(element.name, group).then(function (g) {
                                    _this.groups.push(g);
                                });
                            });
                        }
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    RegisterSelectGroupsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterSelectGroupsPage');
    };
    RegisterSelectGroupsPage.prototype.joinGroup = function (group) {
        if (group.joined) {
            this.count--;
        }
        else {
            this.count++;
        }
        group.joined = !group.joined;
        if (this.count > 0) {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
    };
    RegisterSelectGroupsPage.prototype.nextPage = function () {
        this.navCtrl.push('RegisterPage', this.groups);
    };
    RegisterSelectGroupsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register-select-groups',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register-select-groups/register-select-groups.html"*/'<!--\n  Generated template for the RegisterSelectGroupsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Groups</ion-title>\n    <ion-buttons end>\n      <button [disabled]="!isValid" ion-button icon-start (click)="nextPage()">\n        Next\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p center text-center>Join groups to start gathering with other people based on your interest.</p>\n  <ion-list>\n    <ion-card *ngFor="let group of groups ; let i = index">\n      <img src="{{ group.img }}" />\n      <ion-card-content>\n        \n          <div>\n            {{ group.id }}\n            <ion-note>\n              {{ group.numberOfMembers }} members\n              <ion-icon name="add-circle" class="joinIcon" float-end *ngIf="!group.joined" (click)="joinGroup(group)"></ion-icon>\n              <span float-end *ngIf="group.joined" (click)="joinGroup(group)">Joined</span>\n            </ion-note>\n          </div>\n        \n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register-select-groups/register-select-groups.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_group_service_group_service__["a" /* GroupServiceProvider */]])
    ], RegisterSelectGroupsPage);
    return RegisterSelectGroupsPage;
}());

//# sourceMappingURL=register-select-groups.js.map

/***/ })

});
//# sourceMappingURL=1.js.map