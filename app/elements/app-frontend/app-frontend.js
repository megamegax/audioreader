var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('polymer/paper-drawer-panel/paper-drawer-panel.html!');
require('polymer/paper-header-panel/paper-header-panel.html!');
require('polymer/paper-toolbar/paper-toolbar.html!');
require('./app-frontend.html!');
var AppFrontend = (function (_super) {
    __extends(AppFrontend, _super);
    function AppFrontend() {
        _super.apply(this, arguments);
    }
    AppFrontend = __decorate([
        component('app-frontend')
    ], AppFrontend);
    return AppFrontend;
})(polymer.Base);
AppFrontend.register();
