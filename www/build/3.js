webpackJsonp([3],{

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupDetailPageModule", function() { return GroupDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_detail__ = __webpack_require__(533);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupDetailPageModule = /** @class */ (function () {
    function GroupDetailPageModule() {
    }
    GroupDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__group_detail__["a" /* GroupDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group_detail__["a" /* GroupDetailPage */]),
            ],
        })
    ], GroupDetailPageModule);
    return GroupDetailPageModule;
}());

//# sourceMappingURL=group-detail.module.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(71);
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
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GroupDetailPage = /** @class */ (function () {
    function GroupDetailPage(navCtrl, navParams, userServiceProvider, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userServiceProvider = userServiceProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.membersInGroup = [];
        this.organizers = [];
        this.group = navParams.data;
        console.log(this.group.id);
        try {
            this.numberOfMember = this.group.members.length;
            this.group.organizers.forEach(function (element) {
                _this.userServiceProvider.getUser(element).then(function (memberData) {
                    _this.organizers.push(memberData);
                });
            });
            this.group.members.forEach(function (member) {
                _this.userServiceProvider.getUser(member).then(function (memberData) {
                    _this.membersInGroup.push(memberData);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    GroupDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GroupDetailPage');
    };
    GroupDetailPage.prototype.presentActionSheet = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your album',
            buttons: [
                {
                    text: 'Destructive',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Archive',
                    handler: function () {
                        console.log('Archive clicked');
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
    GroupDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group-detail',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/group-detail/group-detail.html"*/'<!--\n  Generated template for the GroupDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n    <ion-buttons end>\n        <button ion-button icon-start (click)="presentActionSheet()">\n            <ion-icon name=\'more\' ></ion-icon>\n          \n          </button>\n        </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n\n  <img class="cover" src="{{group.img}}" >\n\n  <h2 padding-horizontal>{{group.id}}</h2>\n  <div class="avatar_holder" padding-horizontal>\n    <ion-avatar *ngFor="let member of membersInGroup">\n      <img src="{{member.img}}">\n    </ion-avatar>\n  </div>\n  <span class="small" padding-horizontal padding-top>{{numberOfMember}} Members</span>\n  <p class="greyFont" padding-horizontal>{{group.isPublic ? \'Public\' : \'Private\'}} Group</p>\n  <div padding-horizontal>\n    <p>{{group.shortDescription}}</p>\n    <span float-right style="color:red">Read more</span>\n  </div>\n\n  <div class="organizer" padding-horizontal>\n    <h3>Organizers</h3>\n    <ion-list>\n        <ion-item *ngFor="let organizer of organizers">\n          <ion-avatar item-start>\n              <img src="{{organizer.img}}">\n          </ion-avatar>\n          <h2>{{organizer.name}}</h2>\n          \n        </ion-item>\n       \n      </ion-list>\n  </div>\n\n  <div class="events" >\n      <h3 padding-horizontal>Events<span float-right style="color:red ; font-size:14px; ">See all</span></h3>\n      <ion-scroll scrollX="true" style="white-space: nowrap; height: 200px;" no-padding >\n          <div class="scroll-item" >\n              <ion-card>\n                  <ion-card-header>\n                    Header\n                  </ion-card-header>\n                  <ion-card-content text-wrap>\n                    The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n                  </ion-card-content>\n                </ion-card>\n          </div>\n          \n          <div class="scroll-item" >\n              <ion-card>\n                  <ion-card-header>\n                    Header\n                  </ion-card-header>\n                  <ion-card-content text-wrap>\n                    The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n                  </ion-card-content>\n                </ion-card>\n          </div>\n          <div class="scroll-item" >\n              <ion-card>\n                  <ion-card-header>\n                    Header\n                  </ion-card-header>\n                  <ion-card-content text-wrap>\n                    The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n                  </ion-card-content>\n                </ion-card>\n          </div>\n      </ion-scroll>\n\n  </div>\n\n  <div class="highlights" padding-horizontal>\n      <h3>Highlights</h3>\n      <ion-list>\n          <ion-card>\n              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMzkT8oqXXgV4rV1Sm3qxYRqg_Jim-JNEgYz7kEdbf7VUi1GMipw"/>\n              <ion-card-content>\n                <ion-card-title>\n                  Nine Inch Nails Live\n                  </ion-card-title>\n                <p>\n                  The most popular industrial group ever, and largely\n                  responsible for bringing the music to a mass audience.\n                </p>\n              </ion-card-content>\n              <ion-note float-right padding>11h ago</ion-note>\n            </ion-card>\n      </ion-list>\n  </div>\n\n  <!-- <div padding-horizontal class="events">\n    \n    \n    <ion-scroll scrollX="true" direction="x">\n        <ion-card>\n            <ion-card-header>\n              Header\n            </ion-card-header>\n            <ion-card-content text-wrap>\n              The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n            </ion-card-content>\n          </ion-card>\n          <ion-card>\n              <ion-card-header>\n                Header\n              </ion-card-header>\n              <ion-card-content text-wrap>\n                The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n              </ion-card-content>\n            </ion-card>\n            <ion-card>\n                <ion-card-header>\n                  Header\n                </ion-card-header>\n                <ion-card-content text-wrap>\n                  The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n                </ion-card-content>\n              </ion-card>\n    </ion-scroll>\n  </div> -->\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/group-detail/group-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], GroupDetailPage);
    return GroupDetailPage;
}());

//# sourceMappingURL=group-detail.js.map

/***/ })

});
//# sourceMappingURL=3.js.map