webpackJsonp([2],{

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSelectCategoriesPageModule", function() { return RegisterSelectCategoriesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_select_categories__ = __webpack_require__(537);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterSelectCategoriesPageModule = /** @class */ (function () {
    function RegisterSelectCategoriesPageModule() {
    }
    RegisterSelectCategoriesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register_select_categories__["a" /* RegisterSelectCategoriesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register_select_categories__["a" /* RegisterSelectCategoriesPage */]),
            ],
        })
    ], RegisterSelectCategoriesPageModule);
    return RegisterSelectCategoriesPageModule;
}());

//# sourceMappingURL=register-select-categories.module.js.map

/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterSelectCategoriesPage; });
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
 * Generated class for the RegisterSelectCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterSelectCategoriesPage = /** @class */ (function () {
    function RegisterSelectCategoriesPage(navCtrl, navParams, groupServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupServiceProvider = groupServiceProvider;
        this.count = 0;
        this.isValid = false;
    }
    RegisterSelectCategoriesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.categories = [];
        this.count = 0;
        this.isValid = false;
        console.log('ionViewDidLoad RegisterSelectCategoriesPage');
        this.groupServiceProvider.getCategories().then(function (list) {
            _this.categories = list;
        });
    };
    RegisterSelectCategoriesPage.prototype.ionViewWillLeave = function () {
        console.log('ionViewWillLeave RegisterSelectCategoriesPage');
    };
    RegisterSelectCategoriesPage.prototype.changeClass = function (cate) {
        if (cate.selected) {
            this.count--;
        }
        else {
            this.count++;
        }
        cate.selected = !cate.selected;
        if (this.count > 0) {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
    };
    RegisterSelectCategoriesPage.prototype.nextPage = function () {
        this.navCtrl.push('RegisterSelectGroupsPage', this.categories);
    };
    RegisterSelectCategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register-select-categories',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register-select-categories/register-select-categories.html"*/'<!--\n  Generated template for the RegisterSelectCategoriesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Categories</ion-title>\n    <ion-buttons end>\n      <button [disabled]="!isValid" ion-button icon-start (click)="nextPage()">\n        Next\n      </button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n\n\n\n\n</ion-content>\n\n<ion-content padding>\n  <p center text-center>Select some categories to get started</p>\n  <ion-list>\n      <ion-row no-padding>\n          <ion-col col-6 *ngFor="let cate of categories ; let i=index">\n                <ion-card [ngClass]="{\'selected\' : cate.selected}" (click)="changeClass(cate)">\n                    <img src="{{cate.img}}" />\n                    <div>{{cate.name}}<i class="fas fa-check" *ngIf="cate.selected"></i></div>\n                  </ion-card>\n          </ion-col >\n\n        </ion-row>\n      </ion-list>\n\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/register-select-categories/register-select-categories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_group_service_group_service__["a" /* GroupServiceProvider */]])
    ], RegisterSelectCategoriesPage);
    return RegisterSelectCategoriesPage;
}());

//# sourceMappingURL=register-select-categories.js.map

/***/ })

});
//# sourceMappingURL=2.js.map