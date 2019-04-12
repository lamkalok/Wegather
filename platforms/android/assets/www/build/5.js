webpackJsonp([5],{

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageModule", function() { return EventDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_detail__ = __webpack_require__(534);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventDetailPageModule = /** @class */ (function () {
    function EventDetailPageModule() {
    }
    EventDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */]),
            ],
        })
    ], EventDetailPageModule);
    return EventDetailPageModule;
}());

//# sourceMappingURL=event-detail.module.js.map

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_event_service_event_service__ = __webpack_require__(308);
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
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventDetailPage = /** @class */ (function () {
    function EventDetailPage(navCtrl, navParams, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider, eventServiceProvider, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.eventServiceProvider = eventServiceProvider;
        this.alertCtrl = alertCtrl;
        this.attendedMembers = [];
        this.joinedThisEvent = false;
        this.isOrganizer = false;
        var eventSnapshot = navParams.data;
        this.id = eventSnapshot.id;
        if (this.id != null) {
            try {
                eventServiceProvider.getEvent(eventSnapshot.id).then(function (e) {
                    _this.event = e;
                    //subscribe is also real time update
                    _this.event.subscribe(function (e) {
                        _this.attendedMembers = [];
                        console.log(e);
                        _this.date_from = e.date_from.toDate();
                        _this.date_to = e.date_to.toDate();
                        _this.numberOfAttendedMembers = e.attendedMembers.length;
                        if (e.organizerID == _this.authServiceProvider.getLoggedUID()) {
                            _this.isOrganizer = true;
                        }
                        _this.userServiceProvider.getUser(e.organizerID).then(function (organizer) {
                            _this.organizerName = organizer.name;
                        });
                        e.attendedMembers.forEach(function (attendedMemberID) {
                            if (attendedMemberID == _this.authServiceProvider.getLoggedUID()) {
                                _this.joinedThisEvent = true;
                            }
                            _this.userServiceProvider.getUser(attendedMemberID).then(function (user) {
                                _this.attendedMembers.push(user);
                            });
                        });
                    });
                });
            }
            catch (error) {
            }
        }
    }
    EventDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventDetailPage');
    };
    EventDetailPage.prototype.goEvent = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "Join event",
            message: "Are you sure to join this event?",
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.eventServiceProvider.addMemeberToEvent(_this.authServiceProvider.getLoggedUID(), _this.id).then(function () {
                            _this.joinedThisEvent = true;
                            _this.shareServiceProvider.showToast("Join event successfully");
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    EventDetailPage.prototype.quitEvent = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: "Quit event",
            message: "Are you sure to quit this event?",
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.eventServiceProvider.removeMemberFromEvent(_this.authServiceProvider.getLoggedUID(), _this.id).then(function () {
                            _this.joinedThisEvent = false;
                            _this.shareServiceProvider.showToast("Quit event successfully");
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    EventDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-detail',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/event-detail/event-detail.html"*/'<!--\n  Generated template for the EventDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n    <ion-buttons end>\n        <button ion-button icon-start (click)="presentActionSheet()">\n            <ion-icon name=\'star-outline\' ></ion-icon>\n          \n          </button>\n        </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n  \n\n  <img class="cover" src="{{ (event | async)?.img }}">\n  <div padding-horizontal>\n    <p class="greyFont">{{ (event | async)?.groupID }}</p>\n    <h2>{{id}}</h2>\n    <!-- <ion-list>\n      <ion-item padding>\n         {{joinedThisEvent ? \'You are joined this event\' : \'Are you going to join?\'}} \n\n       \n\n        <ion-icon *ngIf="!joinedThisEvent" class="bigIcon" name="checkmark-circle-outline" color="secondary" item-end (click)="goEvent()"></ion-icon>\n        <ion-icon *ngIf="joinedThisEvent" class="bigIcon" name="close-circle-outline" color="danger" item-end padding-left (click)="quitEvent()"></ion-icon>\n      </ion-item>\n    </ion-list> -->\n\n    <div *ngIf="!isOrganizer">\n    <button *ngIf="!joinedThisEvent"  ion-button block color="skyblue" outline (click)="goEvent()">Join Event</button>\n    <button *ngIf="joinedThisEvent" ion-button block color="danger" outline (click)="quitEvent()">Quit Event</button>\n    </div>\n    <div *ngIf="isOrganizer">\n        <button ion-button block color="danger" outline >Cancel Event</button>\n    </div>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-icon name="time" item-start></ion-icon>\n        <h2>{{ (date_from | date)}}</h2>\n        <p>{{ (date_from | date:\'shortTime\')}} - {{ (date_to | date:\'shortTime\')}}</p>\n      </ion-item>\n      <ion-item>\n        <ion-icon name="pin" item-start></ion-icon>\n        <h2 text-wrap>{{ (event | async)?.location }}</h2>\n        \n      </ion-item>\n      <ion-item>\n        <ion-icon name="person" item-start></ion-icon>\n        <h2>Organized by {{organizerName}}</h2>\n      </ion-item>\n    </ion-list>\n\n    <h5>{{ numberOfAttendedMembers }} people are going</h5>\n    <div class="avatar_holder" padding-horizontal>\n\n      <ion-avatar *ngFor="let member of attendedMembers">\n        <img src="{{member.img}}">\n      </ion-avatar>\n    </div>\n\n    <div>\n      <p>\n          {{ (event | async)?.description }}\n      </p>\n    </div>\n\n    <h5>Photos</h5>\n    <div></div>\n    <button ion-button block color="skyblue" outline (click)="addPhoto()">Add Photo</button>\n\n    <h5>Comments</h5>\n    <div></div>\n    <button ion-button block color="skyblue" outline (click)="addComment()">Add Comment</button>\n\n\n    \n  </div>\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/event-detail/event-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_group_service_group_service__["a" /* GroupServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_event_service_event_service__["a" /* EventServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], EventDetailPage);
    return EventDetailPage;
}());

//# sourceMappingURL=event-detail.js.map

/***/ })

});
//# sourceMappingURL=5.js.map