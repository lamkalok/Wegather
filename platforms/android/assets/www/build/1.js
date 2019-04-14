webpackJsonp([1],{

/***/ 875:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserGroupsPageModule", function() { return UserGroupsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_groups__ = __webpack_require__(886);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserGroupsPageModule = /** @class */ (function () {
    function UserGroupsPageModule() {
    }
    UserGroupsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__user_groups__["a" /* UserGroupsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_groups__["a" /* UserGroupsPage */]),
            ],
        })
    ], UserGroupsPageModule);
    return UserGroupsPageModule;
}());

//# sourceMappingURL=user-groups.module.js.map

/***/ }),

/***/ 886:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGroupsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(138);
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
 * Generated class for the UserGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserGroupsPage = /** @class */ (function () {
    function UserGroupsPage(navCtrl, navParams, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider, actionSheetCtrl, alertCtrl) {
        // let newPromise = new Promise((resolve, reject) => {
        //       resolve(this.authServiceProvider.userData.uid);
        // });
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        // newPromise.then(uid=>{
        //   this.uid = uid;
        // })
        this.groupServiceProvider.getUserJoindedGroups(this.authServiceProvider.userData.joinedGroups).then(function (data) {
            console.log(data);
            var uid = _this.authServiceProvider.userData.uid;
            _this.ownedGroup = data.filter(function (item, index, array) {
                if (item.owner == uid) {
                    return item;
                }
            });
            _this.joinedGroup = data.filter(function (item, index, array) {
                if (item.owner != uid) {
                    return item;
                }
            });
            console.log("I am owner", _this.ownedGroup);
            console.log("Joined Group", _this.joinedGroup);
        });
    }
    UserGroupsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserGroupsPage');
    };
    UserGroupsPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = null;
        var page = "CreateEventPage";
        actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Create New Group',
                    handler: function () {
                        console.log('Create Event');
                        _this.navCtrl.push(page);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    UserGroupsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-groups',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/user-groups/user-groups.html"*/'<!--\n  Generated template for the UserGroupsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>User Groups</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start (click)="presentActionSheet()">\n        <ion-icon name=\'more\' ></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <ion-item-group>\n      <ion-item-divider color="light">Owned Group</ion-item-divider>\n      <ion-item *ngFor="let og of ownedGroup">{{ og.id }}</ion-item>\n     \n    </ion-item-group>\n    <ion-item-group>\n        <ion-item-divider color="light">Joined Group</ion-item-divider>\n        <ion-item *ngFor="let jg of joinedGroup">{{ jg.id }}</ion-item>\n       \n      </ion-item-group>\n\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/user-groups/user-groups.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], UserGroupsPage);
    return UserGroupsPage;
}());

//# sourceMappingURL=user-groups.js.map

/***/ })

});
//# sourceMappingURL=1.js.map