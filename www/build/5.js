webpackJsonp([5],{

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageModule", function() { return EventDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_detail__ = __webpack_require__(531);
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

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
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
    function EventDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EventDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventDetailPage');
    };
    EventDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-event-detail',template:/*ion-inline-start:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/event-detail/event-detail.html"*/'<!--\n  Generated template for the EventDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n    <ion-buttons end>\n        <button ion-button icon-start (click)="presentActionSheet()">\n            <ion-icon name=\'star-outline\' ></ion-icon>\n          \n          </button>\n        </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding>\n  \n  \n\n  <img class="cover" src="http://coinsbird.com/wp-content/uploads/2018/09/20180912A.jpg">\n  <div padding-horizontal>\n    <p class="greyFont">比特幣研究會</p>\n    <h2>幣少分享會</h2>\n    <ion-list>\n      <ion-item padding>\n        Are you going?\n        <ion-icon class="bigIcon" name="checkmark-circle-outline" color="secondary" item-end></ion-icon>\n        <ion-icon class="bigIcon" name="close-circle-outline" color="danger" item-end padding-left></ion-icon>\n      </ion-item>\n    </ion-list>\n    <ion-list no-lines>\n      <ion-item>\n        <ion-icon name="time" item-start></ion-icon>\n        <h2>Monday, 14 January</h2>\n        <p>19:00 - 21:00</p>\n      </ion-item>\n      <ion-item>\n        <ion-icon name="pin" item-start></ion-icon>\n        <h2>Crescent Moon</h2>\n        <p>2-16 Hop Kwan Street, Tai Kok Tsui, HK</p>\n      </ion-item>\n      <ion-item>\n        <ion-icon name="person" item-start></ion-icon>\n        <h2>Organized by 幣少</h2>\n      </ion-item>\n    </ion-list>\n\n    <h5>8 people are going</h5>\n    <div class="avatar_holder" padding-horizontal>\n\n      <ion-avatar>\n        <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1">\n      </ion-avatar>\n      <ion-avatar>\n        <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1">\n      </ion-avatar>\n    </div>\n\n    <div>\n      <p>\n          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n      </p>\n    </div>\n\n    <h5>Photos</h5>\n    <div></div>\n    <button ion-button block color="skyblue" outline (click)="addPhoto()">Add Photo</button>\n\n    <h5>Comments</h5>\n    <div></div>\n    <button ion-button block color="skyblue" outline (click)="addComment()">Add Comment</button>\n\n\n    \n  </div>\n</ion-content>'/*ion-inline-end:"/Users/lamkalok/Desktop/Ionic/Wegather/src/pages/event-detail/event-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], EventDetailPage);
    return EventDetailPage;
}());

//# sourceMappingURL=event-detail.js.map

/***/ })

});
//# sourceMappingURL=5.js.map