// import {SwiperModule} from 'swiper/angular';
import { NgModule } from '@angular/core';
// import { SwiperModule } from 'swiper/angular';
// import { CookieModule,CookieService } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  // declarations:[HeaderComponent],
  imports: [BrowserModule,HttpClientModule],
  providers: [CookieService]
})
export class YourAppModule {}