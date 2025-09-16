export class RegularExpressions {
     
    static readonly EMAIL_REGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     
    static readonly HAS_UPPER = /[A-Z]/;
    static readonly HAS_LOWER = /[a-z]/;
    static readonly HAS_NUMBER = /\d/;
    static readonly HAS_SPECIALS = /[^A-Za-z0-9]/g;
}
