webpackJsonp([8],{

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateEventPageModule", function() { return CreateEventPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_event__ = __webpack_require__(540);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CreateEventPageModule = /** @class */ (function () {
    function CreateEventPageModule() {
    }
    CreateEventPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__create_event__["a" /* CreateEventPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__create_event__["a" /* CreateEventPage */]),
            ],
        })
    ], CreateEventPageModule);
    return CreateEventPageModule;
}());

//# sourceMappingURL=create-event.module.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_share_service_share_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_service_user_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_group_service_group_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_event_service_event_service__ = __webpack_require__(310);
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
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateEventPage = /** @class */ (function () {
    function CreateEventPage(navCtrl, navParams, camera, shareServiceProvider, authServiceProvider, userServiceProvider, groupServiceProvider, eventServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.shareServiceProvider = shareServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.groupServiceProvider = groupServiceProvider;
        this.eventServiceProvider = eventServiceProvider;
        this.today = new Date(Date.now()).toISOString();
        this.event = {
            //dateStarts: new Date(Date.now()).toISOString(),
            name: "",
            location: "",
            description: "",
            dateStarts: undefined,
            dateEnd: "",
            img: ""
        };
        this.groupID = this.navParams.data;
        console.log(this.groupID);
    }
    CreateEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateEventPage');
    };
    CreateEventPage.prototype.takeImage = function () {
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
    CreateEventPage.prototype.createEvent = function () {
        var _this = this;
        try {
            this.shareServiceProvider.showLoading();
            console.log(this.event);
            this.eventServiceProvider.uploadEventImage(this.imgSrc, this.event.name, this.authServiceProvider.getLoggedUID()).then(function (url) {
                url.subscribe(function (u) {
                    _this.event.img = u;
                    _this.eventServiceProvider.createEvent(_this.event, _this.authServiceProvider.getLoggedUID(), _this.groupID).then(function () {
                        _this.eventServiceProvider.createEventSnapShot(_this.event, _this.authServiceProvider.getLoggedUID(), _this.groupID).then(function () {
                            _this.shareServiceProvider.hideLoading();
                            _this.shareServiceProvider.showToast("Event create successfully");
                            _this.navCtrl.pop();
                        });
                    });
                });
            });
        }
        catch (error) {
            this.shareServiceProvider.hideLoading();
            this.shareServiceProvider.showToast("Event create fail: " + error);
        }
    };
    CreateEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-event',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/create-event/create-event.html"*/'<!--\n  Generated template for the GroupAddPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Organize New Event</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <h2>Organize a new event</h2>\n    <p>Find the right people to make it happen.</p>\n  </div>\n  <ion-card>\n    <img *ngIf="imgSrc" [src]="imgSrc" />\n    \n      <ion-row padding>\n\n        <ion-label stacked class="label-text">Please select a image for the event cover</ion-label>\n        <ion-item>\n          <button ion-button round outline color="dark" (click)="takeImage()"><ion-icon name="image" style="font-size:30px;"></ion-icon></button>\n        </ion-item>\n      </ion-row>\n\n   \n  </ion-card>\n    <ion-list>\n\n      <ion-item>\n        <ion-label stacked class="label-text">Event Name</ion-label>\n        <ion-input type="text" [(ngModel)]="event.name"></ion-input>\n      </ion-item>\n      \n      <ion-item>\n        <ion-label stacked class="label-text">Start Time</ion-label>\n        <ion-datetime displayFormat="HH:mm MMM DD YYYY" [(ngModel)]="event.dateStarts" min="2019" max="2099-12-31"></ion-datetime>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked class="label-text">End Time</ion-label>\n        <ion-datetime displayFormat="HH:mm MMM DD YYYY" [(ngModel)]="event.dateEnd" min="{{event?.dateStarts ? event.dateStarts : today}}" max="2099-12-31"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked class="label-text">Description</ion-label>\n        <ion-textarea [(ngModel)]="event.description"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked class="label-text">Location</ion-label>\n        <ion-input type="text" [(ngModel)]="event.location"></ion-input>\n      </ion-item>\n      \n      <!-- <ion-item>\n        <ion-label stacked class="label-text">Start Time</ion-label>\n        <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="event.timeStarts"></ion-datetime>\n      </ion-item> -->\n\n    </ion-list>\n\n    <button ion-button block color="orange" outline (click)="createEvent()">Create Event</button>\n</ion-content>\n'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/create-event/create-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__providers_share_service_share_service__["a" /* ShareServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_group_service_group_service__["a" /* GroupServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_event_service_event_service__["a" /* EventServiceProvider */]])
    ], CreateEventPage);
    return CreateEventPage;
}());

//# sourceMappingURL=create-event.js.map

/***/ })

});
//# sourceMappingURL=8.js.map