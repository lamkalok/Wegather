webpackJsonp([6],{

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupDetailPageModule", function() { return GroupDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_detail__ = __webpack_require__(881);
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

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_service_event_service__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_tabs__ = __webpack_require__(224);
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
    function GroupDetailPage(navCtrl, navParams, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider, eventServiceProvider, actionSheetCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.eventServiceProvider = eventServiceProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.membersInGroup = [];
        this.organizers = [];
        this.group = navParams.data;
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
        var _this = this;
        var actionSheet = null;
        // Not the group owner
        if (this.group.owner != this.authServiceProvider.getLoggedUID()) {
            actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        text: 'Quit Group',
                        role: 'destructive',
                        handler: function () {
                            var confirm = _this.alertCtrl.create({
                                title: "Are you sure to quit this group?",
                                message: "Reminder: You will also quit all of the event you have been joined",
                                buttons: [
                                    {
                                        text: 'No',
                                        handler: function () {
                                            console.log('No clicked');
                                        }
                                    },
                                    {
                                        text: 'Yes',
                                        handler: function () {
                                            var uid = _this.authServiceProvider.getLoggedUID();
                                            console.log('Yes clicked');
                                            if (_this.group.eventsSnapshot != undefined) {
                                                _this.group.eventsSnapshot.forEach(function (element) {
                                                    _this.eventServiceProvider.removeMemberFromEvent(uid, element.id);
                                                });
                                            }
                                            _this.userServiceProvider.removeGroupFromUser(uid, _this.group.id, _this.authServiceProvider).then(function () {
                                                _this.groupServiceProvider.removeMebmerFromGroup(uid, _this.group.id).then(function () {
                                                    _this.shareServiceProvider.showToast("Quit group successfully");
                                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */]);
                                                    _this.navCtrl.popToRoot();
                                                });
                                            });
                                        }
                                    }
                                ]
                            });
                            confirm.present();
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
        }
        else {
            actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        text: 'Organize New Event',
                        handler: function () {
                            console.log('Create Event');
                            _this.navCtrl.push("CreateEventPage", _this.group.id);
                        }
                    },
                    {
                        text: 'Delete Group',
                        role: 'destructive',
                        handler: function () {
                            console.log('Destructive clicked');
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
        }
        actionSheet.present();
    };
    GroupDetailPage.prototype.eventDetail = function (eventsSnapshot) {
        this.navCtrl.push("EventDetailPage", eventsSnapshot);
    };
    GroupDetailPage.prototype.goToMemberList = function () {
        this.navCtrl.push('UsersListPage', this.membersInGroup);
    };
    GroupDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group-detail',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/group-detail/group-detail.html"*/'<!--\n  Generated template for the GroupDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n    <ion-buttons end>\n      <button ion-button icon-start (click)="presentActionSheet()">\n        <ion-icon name=\'more\' ></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n\n  <img class="cover" src="{{group.img}}" >\n\n  <h2 padding-horizontal>{{group.id}}</h2>\n  <div class="avatar_holder" padding-horizontal (click)="goToMemberList()">\n    <ion-avatar *ngFor="let member of membersInGroup">\n      <img src="{{member.img}}">\n    </ion-avatar>\n  </div>\n  <span class="small" padding-horizontal padding-top>{{numberOfMember}} Members</span>\n  <p class="greyFont" padding-horizontal>{{group.isPublic ? \'Public\' : \'Private\'}} Group</p>\n  <div padding-horizontal>\n    <p>{{group.shortDescription}}</p>\n    <span float-right style="color:red">Read more</span>\n  </div>\n\n  <div class="organizer" padding-horizontal>\n    <h3>Organizers</h3>\n    <ion-list>\n        <ion-item *ngFor="let organizer of organizers">\n          <ion-avatar item-start>\n              <img src="{{organizer.img}}">\n          </ion-avatar>\n          <h2>{{organizer.name}}</h2>\n          \n        </ion-item>\n       \n      </ion-list>\n  </div>\n\n  <div class="events" >\n      <h3 padding-horizontal>Events<span float-right style="color:red ; font-size:14px; ">See all</span></h3>\n      <div class="holder" no-padding *ngIf="group.eventsSnapshot?.length > 0">\n          <ion-scroll scrollX="true" >\n              <div class="scroll-item" *ngFor="let event of group.eventsSnapshot">\n                  <ion-card (click)="eventDetail(event)">\n                      <ion-card-header text-wrap>\n                        {{event.id}}\n                      </ion-card-header>\n                      <ion-card-content text-wrap>\n                        {{event.description | slice:0 : 40}}...\n                      </ion-card-content>\n                      <ion-note float-right padding >{{event.date_from | date }}</ion-note>\n                    </ion-card>\n              </div>\n          </ion-scroll>\n      \n    </div>\n\n  </div>\n\n  <div class="highlights" padding-horizontal>\n      <h3>Highlights</h3>\n      <ion-list>\n          <ion-card>\n              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMzkT8oqXXgV4rV1Sm3qxYRqg_Jim-JNEgYz7kEdbf7VUi1GMipw"/>\n              <ion-card-content>\n                <ion-card-title>\n                  Nine Inch Nails Live\n                  </ion-card-title>\n                <p>\n                  The most popular industrial group ever, and largely\n                  responsible for bringing the music to a mass audience.\n                </p>\n              </ion-card-content>\n              <ion-note float-right padding>11h ago</ion-note>\n            </ion-card>\n      </ion-list>\n  </div>\n\n  <!-- <div padding-horizontal class="events">\n    \n    \n    <ion-scroll scrollX="true" direction="x">\n        <ion-card>\n            <ion-card-header>\n              Header\n            </ion-card-header>\n            <ion-card-content text-wrap>\n              The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n            </ion-card-content>\n          </ion-card>\n          <ion-card>\n              <ion-card-header>\n                Header\n              </ion-card-header>\n              <ion-card-content text-wrap>\n                The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n              </ion-card-content>\n            </ion-card>\n            <ion-card>\n                <ion-card-header>\n                  Header\n                </ion-card-header>\n                <ion-card-content text-wrap>\n                  The British use the term "header", but the American term "head-shot" the English simply refuse to adopt.\n                </ion-card-content>\n              </ion-card>\n    </ion-scroll>\n  </div> -->\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/group-detail/group-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_service_event_service__["a" /* EventServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], GroupDetailPage);
    return GroupDetailPage;
}());

//# sourceMappingURL=group-detail.js.map

/***/ })

});
//# sourceMappingURL=6.js.map