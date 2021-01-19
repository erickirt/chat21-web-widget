import { UserTypingComponent } from '../../src/chat21-core/utils/user-typing/user-typing.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import * as firebase from 'firebase';


// Directives
import { TooltipModule } from 'ng2-tooltip-directive';

// Import the library module
import { environment } from '../environments/environment';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky';
import { AngularResizedEventModule } from 'angular-resize-event';

//config
import { CHAT_ENGINE_MQTT, CHAT_ENGINE_FIREBASE } from '../../src/chat21-core/utils/constants';
// utils
import { Globals } from './utils/globals';

// users
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

// providers
import { GlobalSettingsService } from './providers/global-settings.service';
import { SettingsSaverService } from './providers/settings-saver.service';
import { StorageService } from './providers/storage.service';
import { ChatPresenceHandlerService } from './providers/chat-presence-handler.service';
import { AuthService } from './providers/auth.service';
import { MessagingService } from './providers/messaging.service';
import { ConversationsService } from './providers/conversations.service';
import { UploadService } from './providers/upload.service';
import { ContactService } from './providers/contact.service';
import { AgentAvailabilityService } from './providers/agent-availability.service';
import { TranslatorService } from './providers/translator.service';
import { WaitingService } from './providers/waiting.service';
import { AppConfigService } from './providers/app-config.service';

import { ConversationsHandlerService } from '../chat21-core/providers/abstract/conversations-handler.service';
import { ConversationHandlerBuilderService } from '../chat21-core/providers/abstract/conversation-handler-builder.service';
import { ConversationHandlerService } from '../chat21-core/providers/abstract/conversation-handler.service';
import { FirebaseConversationsHandler } from '../chat21-core/providers/firebase/firebase-conversations-handler';
import { FirebaseConversationHandler } from '../chat21-core/providers/firebase/firebase-conversation-handler';
import { FirebaseConversationHandlerBuilderService } from '../chat21-core/providers/firebase/firebase-conversation-handler-builder.service';
// import { DatabaseProvider } from '../chat21-core/providers/database';
import { ChatManager } from './../chat21-core/providers/chat-manager';
import { CustomTranslateService } from './../chat21-core/providers/custom-translate.service';



// components
import { SelectionDepartmentComponent } from './components/selection-department/selection-department.component';
import { HomeConversationsComponent } from './components/home-conversations/home-conversations.component';
import { HomeComponent } from './components/home/home.component';
import { LauncherButtonComponent } from './components/launcher-button/launcher-button.component';
import { ConversationComponent } from './components/conversation-detail/conversation/conversation.component';
import { MessageAttachmentComponent } from './components/message-attachment/message-attachment.component';
import { PrechatFormComponent } from './components/prechat-form/prechat-form.component';
import { EyeeyeCatcherCardComponent } from './components/eyeeye-catcher-card/eyeeye-catcher-card.component';
import { PreviewLoadingFilesComponent } from './components/preview-loading-files/preview-loading-files.component';
import { MenuOptionsComponent } from './components/menu-options/menu-options.component';
import { ListAllConversationsComponent } from './components/list-all-conversations/list-all-conversations.component';
import { StarRatingWidgetComponent } from './components/star-rating-widget/star-rating-widget.component';
import { StarRatingWidgetService } from './components/star-rating-widget/star-rating-widget.service';
import { LastMessageComponent } from './components/last-message/last-message.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MarkedPipe } from './directives/marked.pipe';
import { ActivatedRoute } from '@angular/router';
import { FirebaseAuthService } from '../chat21-core/providers/firebase/firebase-auth-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader/src/http-loader';
import { ListConversationsComponent } from './components/list-conversations/list-conversations.component';
import { TypingService } from '../chat21-core/providers/abstract/typing.service';
import { FirebaseTypingService } from '../chat21-core/providers/firebase/firebase-typing.service';
import { MessageTextAreaComponent } from './components/conversation-detail/conversation-footer/message-text-area/message-text-area.component';
import { ConversationHeaderComponent } from './components/conversation-detail/conversation-header/conversation-header.component';
import { ConversationFooterComponent } from './components/conversation-detail/conversation-footer/conversation-footer.component';
import { Triggerhandler } from '../chat21-core/utils/triggerHandler';
import { FirebasePresenceService } from '../chat21-core/providers/firebase/firebase-presence.service';
import { PresenceService } from '../chat21-core/providers/abstract/presence.service';
import { ImageRepoService } from '../chat21-core/providers/abstract/image-repo.service';
import { FirebaseImageRepoService } from '../chat21-core/providers/firebase/firebase-image-repo';
import { FirebaseArchivedConversationsHandler } from '../chat21-core/providers/firebase/firebase-archivedconversations-handler';
import { ArchivedConversationsHandlerService } from '../chat21-core/providers/abstract/archivedconversations-handler.service';
import { ConversationContentComponent } from './components/conversation-detail/conversation-content/conversation-content.component';
import { BubbleMessageComponent } from './components/message/bubble-message/bubble-message.component';
import { TextComponent } from './components/message/text/text.component';
import { ImageComponent } from './components/message/image/image.component';
import { TextButtonComponent } from './components/message/buttons/text-button/text-button.component';
import { FrameComponent } from './components/message/frame/frame.component';
import { LinkButtonComponent } from './components/message/buttons/link-button/link-button.component';
import { ActionButtonComponent } from './components/message/buttons/action-button/action-button.component';
import { AvatarComponent } from './components/message/avatar/avatar.component';
import { ReturnReceiptComponent } from './components/message/return-receipt/return-receipt.component';


// FACTORIES
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    if (environment.remoteConfig) {
      return appConfig.loadAppConfig();
    }
  };
};

export function authenticationFactory(http: HttpClient, route: ActivatedRoute) {
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseAuthService(http, route);
  } else {
    return new FirebaseAuthService(http, route);
  }
}

export function conversationsHandlerFactory() {
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseConversationsHandler();
  } else {
    return new FirebaseConversationsHandler();
  }
}

export function archivedConversationsHandlerFactory() {
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseArchivedConversationsHandler();
  } else {
    return new FirebaseArchivedConversationsHandler();
  }
}

export function conversationHandlerBuilderFactory() {
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseConversationHandlerBuilderService();
  } else {
    return new FirebaseConversationHandlerBuilderService();
  }
}

export function conversationHandlerFactory() {
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseConversationHandler(true);
  } else {
    return new FirebaseConversationHandler(true);
  }
}

export function typingFactory() {
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseTypingService();
  } else {
    return new FirebaseTypingService();
  }
}

export function presenceFactory() {
  console.log('presenceFactory: ');
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebasePresenceService();
  } else {
    return new FirebasePresenceService();
  }
}

export function imageRepoFactory() {
  console.log('imageRepoFactory: ');
  if (environment.chatEngine === CHAT_ENGINE_MQTT) {
    return new FirebaseImageRepoService();
  } else {
    return new FirebaseImageRepoService();
  }
}



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    StarRatingWidgetComponent,
    SelectionDepartmentComponent,
    HomeConversationsComponent,
    HomeComponent,
    LauncherButtonComponent,
    ConversationComponent,
    PrechatFormComponent,
    EyeeyeCatcherCardComponent,
    PreviewLoadingFilesComponent,
    MenuOptionsComponent,
    ListAllConversationsComponent,
    MessageAttachmentComponent,
    LastMessageComponent,
    MarkedPipe,
    ListConversationsComponent,
    ConversationHeaderComponent,
    UserTypingComponent,
    MessageTextAreaComponent,
    ConversationFooterComponent,
    ConversationContentComponent,
    BubbleMessageComponent,
    TextComponent,
    ImageComponent,
    TextButtonComponent,
    FrameComponent,
    LinkButtonComponent,
    ActionButtonComponent,
    AvatarComponent,
    ReturnReceiptComponent
  ],
  imports: [
    BrowserModule,
    // firebase.initializeApp(environment.firebase),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    // AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    // AngularFirestoreModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LinkyModule,
    // https://medium.com/codingthesmartway-com-blog/using-bootstrap-with-angular-c83c3cee3f4a
    // NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'chat21-web-widget',
      storageType: 'localStorage'
     }),
    MomentModule,
    AngularResizedEventModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    TooltipModule
  ],
  providers: [
    AppConfigService, // https://juristr.com/blog/2018/01/ng-app-runtime-config/
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    // {
    //   provide: AuthService,
    //   useFactory: authenticationFactory,
    //   deps: [HttpClient, ActivatedRoute, Chat21Service]
    //  },
    {
      provide: AuthService,
      useFactory: authenticationFactory,
      deps: [HttpClient, ActivatedRoute]
    },
    {
      provide: ConversationsHandlerService,
      useFactory: conversationsHandlerFactory,
      deps: []
    },
    {
      provide: ArchivedConversationsHandlerService,
      useFactory: archivedConversationsHandlerFactory,
      deps: []
    },
    {
      provide: ConversationHandlerBuilderService,
      useFactory: conversationHandlerBuilderFactory,
      deps: []
    },
    {
      provide: ConversationHandlerService,
      useFactory: conversationHandlerFactory,
      deps: []
    },
    {
      provide: TypingService,
      useFactory: typingFactory,
      deps: []
    },
    {
      provide: PresenceService,
      useFactory: presenceFactory,
      deps: []
    },
    {
      provide: ImageRepoService,
      useFactory: imageRepoFactory,
      deps: []
    },
    AuthService,
    MessagingService,
    Globals,
    Triggerhandler,
    GlobalSettingsService,
    SettingsSaverService,
    ConversationsService,
    UploadService,
    ContactService,
    StarRatingWidgetService,
    AgentAvailabilityService,
    TranslatorService,
    ChatPresenceHandlerService,
    StorageService,
    WaitingService,
    //chat21-core
    CustomTranslateService,
    ChatManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
