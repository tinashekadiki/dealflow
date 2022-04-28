import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http'
import { NotificationsComponent } from './notifications.component';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
class ProfileServiceSub {

}

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let profileService = new ProfileServiceSub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      providers: [HttpClient, {provide: ProfileService, useClass: ProfileServiceSub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    profileService = TestBed.inject(ProfileServiceSub);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
