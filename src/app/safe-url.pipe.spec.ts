import { SafeUrlPipe } from './safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it } from 'node:test';

describe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;

  beforeEach(() => {
    const sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeUrlPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
