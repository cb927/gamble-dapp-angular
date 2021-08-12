import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { OffersComponent } from './offers/offers.component';
import { MarketComponent } from './market/market.component';
import { SetOfferComponent } from './set-offer/set-offer.component';
import { JoinOfferComponent } from './join-offer/join-offer.component';
import { AcceptOfferComponent } from './accept-offer/accept-offer.component';
import { SettledOfferComponent } from './settled-offer/settled-offer.component';
import { ContestOfferComponent } from './contest-offer/contest-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';

@NgModule({
  declarations: [
    OfferComponent,
	OffersComponent,
	MarketComponent,
	SetOfferComponent,
	JoinOfferComponent,
	AcceptOfferComponent,
	SettledOfferComponent,
 ContestOfferComponent,
 ViewOfferComponent,
  ],
  imports: [
    SharedModule,
    OfferRoutingModule,
  ],
})
export class OfferModule {}
