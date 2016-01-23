/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/// <reference path="../typings/auto.d.ts" />
//CUSTOM COMPONENTS
require('elements/media-player/media-player');
//IRON COMPONENTS
require('polymer/iron-flex-layout/iron-flex-layout.html!');
require('polymer/iron-icons/av-icons.html!');
require('polymer/iron-pages/iron-pages.html!');
require('polymer/iron-selector/iron-selector.html!');
require('polymer/iron-media-query/iron-media-query.html!');
//PAPER ELEMENTS
require('polymer/paper-drawer-panel/paper-drawer-panel.html!');
require('polymer/paper-icon-button/paper-icon-button.html!');
require('polymer/paper-item/paper-item.html!');
require('polymer/paper-material/paper-material.html!');
require('polymer/paper-menu/paper-menu.html!');
require('polymer/paper-header-panel/paper-header-panel.html!');
require('polymer/paper-toolbar/paper-toolbar.html!');
require('polymer/paper-button/paper-button.html!');
require('polymer/paper-styles/typography.html!');
require('polymer/paper-toast/paper-toast.html!');
require('polymer/paper-item/paper-item.html!');
//STYLES
require('styles/app-theme.html!');
require('styles/shared-styles.html!');
//ROUTING
require('elements/routing.html!');
(function (document) {
    'use strict';
    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');
    // Sets app default base URL
    app.baseUrl = '/';
    if (window.location.port === '') {
    }
    /* app.displayInstalledToast = function () {
         // Check to make sure caching is actually enabled—it won't be in the dev environment.
         if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
             Polymer.dom(document).querySelector('#caching-complete').show();
         }
     };
 */
    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function () {
        console.log('Our app is ready to rock!');
    });
    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function () {
        // imports are loaded and elements have been registered
    });
    // Main area's paper-scroll-header-panel custom condensing transformation of
    // the appName in the middle-container and the bottom title in the bottom-container.
    // The appName is moved to top and shrunk on condensing. The bottom sub title
    // is shrunk to nothing on condensing.
    app.closeDrawer = function () {
        app.$.paperDrawerPanel.closeDrawer();
    };
})(document);
