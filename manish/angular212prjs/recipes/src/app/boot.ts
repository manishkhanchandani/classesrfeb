///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
//import { enableProdMode } from 'angular2/core';

import { NotificationsService } from './notifications/notifications.service';
import { RecipeSearchService } from './recipe-search/recipe-search.service';
import { AppComponent } from './app';

//enableProdMode();
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    NotificationsService,
    RecipeSearchService ]);
