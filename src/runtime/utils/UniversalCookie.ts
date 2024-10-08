import { useRequestEvent } from '#imports';
import { parse, serialize, type CookieSerializeOptions } from 'cookie-es';
import { setCookie as _setCookie, deleteCookie } from 'h3';

export default class UniversalCookie {
  private requestEvent;
  /**
   * Since the cookies in the request are not updated until the request is finished.
   * We need to cache the cookies in the request to get the latest cookies.
   * This is only used in the server side.
   */
  private cache: Record<string, string> | null = null;

  constructor() {
    this.requestEvent = useRequestEvent();
    if (import.meta.server && this.requestEvent) {
      this.cache = parse(this.requestEvent?.headers?.get('cookie') || '');
    }
  }

  getCookie(name: string): string | undefined {
    if (import.meta.server) {
      return this.requestEvent ? this.cache![name] : undefined;
    }

    return parse(document.cookie)[name];
  }

  setCookie(name: string, value: string | null, options: CookieSerializeOptions = {}) {
    if (value == null) {
      this.deleteCookie(name, options);
      return;
    }

    if (import.meta.server) {
      if (!this.requestEvent) return;
      _setCookie(this.requestEvent, name, value, options);
      this.cache![name] = value;
    } else {
      document.cookie = serialize(name, value, options);
    }
  }

  deleteCookie(name: string, options: CookieSerializeOptions = {}) {
    if (import.meta.server) {
      if (!this.requestEvent) return;
      deleteCookie(this.requestEvent, name, options);
      delete this.cache![name];
    } else {
      document.cookie = serialize(name, '', { ...options, maxAge: -1 });
    }
  }
}
