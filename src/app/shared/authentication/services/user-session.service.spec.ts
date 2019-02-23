import { async, TestBed } from '@angular/core/testing';

import { UserSessionService } from './user-session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserSessionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSessionService],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [UserSessionService]
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const service: UserSessionService = TestBed.get(UserSessionService);
    expect(service).toBeTruthy();
  });
});
