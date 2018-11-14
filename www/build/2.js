webpackJsonp([2],{

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupAddPageModule", function() { return GroupAddPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_add__ = __webpack_require__(528);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupAddPageModule = /** @class */ (function () {
    function GroupAddPageModule() {
    }
    GroupAddPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__group_add__["a" /* GroupAddPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group_add__["a" /* GroupAddPage */]),
            ],
        })
    ], GroupAddPageModule);
    return GroupAddPageModule;
}());

//# sourceMappingURL=group-add.module.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_group_service_group_service__ = __webpack_require__(163);
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
 * Generated class for the GroupAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GroupAddPage = /** @class */ (function () {
    function GroupAddPage(navCtrl, navParams, camera, groupService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.groupService = groupService;
    }
    GroupAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GroupAddPage');
    };
    GroupAddPage.prototype.takeImage = function () {
        var _this = this;
        var options = {
            quality: 65,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.imgSrc = base64Image;
        }, function (err) {
            // Handle error
        });
    };
    GroupAddPage.prototype.selectTags = function () {
        console.log("tags");
        this.navCtrl.pop();
    };
    GroupAddPage.prototype.createGroup = function () {
        this.groupService.createGroup(this.imgSrc);
    };
    GroupAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group-add',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/group-add/group-add.html"*/'<!--\n  Generated template for the GroupAddPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add New Group</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <h2>Start a new group</h2>\n    <p>Find new people and do your thing together</p>\n  </div>\n  <ion-card>\n    <img *ngIf="imgSrc" [src]="imgSrc" />\n    \n      <ion-row padding>\n\n        <ion-label stacked class="label-text">Please Select Group Image</ion-label>\n        <ion-item>\n          <button ion-button round outline color="dark" (click)="takeImage()"><ion-icon name="image" style="font-size:30px;"></ion-icon></button>\n        </ion-item>\n      </ion-row>\n\n   \n  </ion-card>\n    <ion-list>\n\n      <ion-item>\n        <ion-label stacked class="label-text">Group Name</ion-label>\n        <ion-input type="text"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked class="label-text">Description</ion-label>\n        <ion-textarea></ion-textarea>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked class="label-text">Interest Tags</ion-label>\n        <ion-input type="text" (click)="selectTags()"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button full (click)="createGroup()">Create Group</button>\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/group-add/group-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__providers_group_service_group_service__["a" /* GroupServiceProvider */]])
    ], GroupAddPage);
    return GroupAddPage;
}());

//# sourceMappingURL=group-add.js.map

/***/ })

});
//# sourceMappingURL=2.js.map