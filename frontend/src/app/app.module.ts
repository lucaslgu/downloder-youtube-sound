import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PoModule } from '@po-ui/ng-components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DownloaderService } from './services/downloader.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PoModule,
    HttpClientModule
  ],
  providers: [
    DownloaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
