import { NgModule, Optional, SkipSelf } from "@angular/core";
import { ILoadOnce } from "./i-load-once.guard";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "../shared/shared.module";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
  providers: [UserService]
})
export class CoreModule extends ILoadOnce {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
