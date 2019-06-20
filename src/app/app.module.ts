import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { IntroductionComponent } from './samples/introduction/introduction.component';

@NgModule({
    declarations: [AppComponent, IntroductionComponent],
    imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
