import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot()],
    bootstrap: [AppComponent]
})
export class AppModule {}
