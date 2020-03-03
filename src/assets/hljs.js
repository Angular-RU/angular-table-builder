/*! highlight.js v9.15.10 | BSD3 License | git.io/hljslicense */
!(function(e) {
    var t = ('object' == typeof window && window) || ('object' == typeof self && self);
    'undefined' == typeof exports || exports.nodeType
        ? t &&
          ((t.hljs = e({})),
          'function' == typeof define &&
              define.amd &&
              define([], function() {
                  return t.hljs;
              }))
        : e(exports);
})(function(n) {
    var d = [],
        o = Object.keys,
        h = {},
        c = {},
        t = /^(no-?highlight|plain|text)$/i,
        l = /\blang(?:uage)?-([\w-]+)\b/i,
        r = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
        a = {
            case_insensitive: 'cI',
            lexemes: 'l',
            contains: 'c',
            keywords: 'k',
            subLanguage: 'sL',
            className: 'cN',
            begin: 'b',
            beginKeywords: 'bK',
            end: 'e',
            endsWithParent: 'eW',
            illegal: 'i',
            excludeBegin: 'eB',
            excludeEnd: 'eE',
            returnBegin: 'rB',
            returnEnd: 'rE',
            relevance: 'r',
            variants: 'v',
            IDENT_RE: 'IR',
            UNDERSCORE_IDENT_RE: 'UIR',
            NUMBER_RE: 'NR',
            C_NUMBER_RE: 'CNR',
            BINARY_NUMBER_RE: 'BNR',
            RE_STARTERS_RE: 'RSR',
            BACKSLASH_ESCAPE: 'BE',
            APOS_STRING_MODE: 'ASM',
            QUOTE_STRING_MODE: 'QSM',
            PHRASAL_WORDS_MODE: 'PWM',
            C_LINE_COMMENT_MODE: 'CLCM',
            C_BLOCK_COMMENT_MODE: 'CBCM',
            HASH_COMMENT_MODE: 'HCM',
            NUMBER_MODE: 'NM',
            C_NUMBER_MODE: 'CNM',
            BINARY_NUMBER_MODE: 'BNM',
            CSS_NUMBER_MODE: 'CSSNM',
            REGEXP_MODE: 'RM',
            TITLE_MODE: 'TM',
            UNDERSCORE_TITLE_MODE: 'UTM',
            COMMENT: 'C',
            beginRe: 'bR',
            endRe: 'eR',
            illegalRe: 'iR',
            lexemesRe: 'lR',
            terminators: 't',
            terminator_end: 'tE'
        },
        N = '</span>',
        v = { classPrefix: 'hljs-', tabReplace: null, useBR: !1, languages: void 0 };
    function y(e) {
        return e
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    function b(e) {
        return e.nodeName.toLowerCase();
    }
    function w(e, t) {
        var r = e && e.exec(t);
        return r && 0 === r.index;
    }
    function u(e) {
        return t.test(e);
    }
    function p(e) {
        var t,
            r = {},
            a = Array.prototype.slice.call(arguments, 1);
        for (t in e) r[t] = e[t];
        return (
            a.forEach(function(e) {
                for (t in e) r[t] = e[t];
            }),
            r
        );
    }
    function m(e) {
        var n = [];
        return (
            (function e(t, r) {
                for (var a = t.firstChild; a; a = a.nextSibling)
                    3 === a.nodeType
                        ? (r += a.nodeValue.length)
                        : 1 === a.nodeType &&
                          (n.push({ event: 'start', offset: r, node: a }),
                          (r = e(a, r)),
                          b(a).match(/br|hr|img|input/) || n.push({ event: 'stop', offset: r, node: a }));
                return r;
            })(e, 0),
            n
        );
    }
    function i(e) {
        if (a && !e.langApiRestored) {
            for (var t in ((e.langApiRestored = !0), a)) e[t] && (e[a[t]] = e[t]);
            (e.c || []).concat(e.v || []).forEach(i);
        }
    }
    function E(s) {
        function l(e) {
            return (e && e.source) || e;
        }
        function c(e, t) {
            return new RegExp(l(e), 'm' + (s.cI ? 'i' : '') + (t ? 'g' : ''));
        }
        !(function t(r, e) {
            if (!r.compiled) {
                if (((r.compiled = !0), (r.k = r.k || r.bK), r.k)) {
                    function a(r, e) {
                        s.cI && (e = e.toLowerCase()),
                            e.split(' ').forEach(function(e) {
                                var t = e.split('|');
                                n[t[0]] = [r, t[1] ? Number(t[1]) : 1];
                            });
                    }
                    var n = {};
                    'string' == typeof r.k
                        ? a('keyword', r.k)
                        : o(r.k).forEach(function(e) {
                              a(e, r.k[e]);
                          }),
                        (r.k = n);
                }
                (r.lR = c(r.l || /\w+/, !0)),
                    e &&
                        (r.bK && (r.b = '\\b(' + r.bK.split(' ').join('|') + ')\\b'),
                        r.b || (r.b = /\B|\b/),
                        (r.bR = c(r.b)),
                        r.endSameAsBegin && (r.e = r.b),
                        r.e || r.eW || (r.e = /\B|\b/),
                        r.e && (r.eR = c(r.e)),
                        (r.tE = l(r.e) || ''),
                        r.eW && e.tE && (r.tE += (r.e ? '|' : '') + e.tE)),
                    r.i && (r.iR = c(r.i)),
                    null == r.r && (r.r = 1),
                    r.c || (r.c = []),
                    (r.c = Array.prototype.concat.apply(
                        [],
                        r.c.map(function(e) {
                            return (function(t) {
                                return (
                                    t.v &&
                                        !t.cached_variants &&
                                        (t.cached_variants = t.v.map(function(e) {
                                            return p(t, { v: null }, e);
                                        })),
                                    t.cached_variants || (t.eW && [p(t)]) || [t]
                                );
                            })('self' === e ? r : e);
                        })
                    )),
                    r.c.forEach(function(e) {
                        t(e, r);
                    }),
                    r.starts && t(r.starts, e);
                var i = r.c
                    .map(function(e) {
                        return e.bK ? '\\.?(?:' + e.b + ')\\.?' : e.b;
                    })
                    .concat([r.tE, r.i])
                    .map(l)
                    .filter(Boolean);
                r.t = i.length
                    ? c(
                          (function(e, t) {
                              for (
                                  var r = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./, a = 0, n = '', i = 0;
                                  i < e.length;
                                  i++
                              ) {
                                  var s = a,
                                      c = l(e[i]);
                                  for (0 < i && (n += t); 0 < c.length; ) {
                                      var o = r.exec(c);
                                      if (null == o) {
                                          n += c;
                                          break;
                                      }
                                      (n += c.substring(0, o.index)),
                                          (c = c.substring(o.index + o[0].length)),
                                          '\\' == o[0][0] && o[1]
                                              ? (n += '\\' + String(Number(o[1]) + s))
                                              : ((n += o[0]), '(' == o[0] && a++);
                                  }
                              }
                              return n;
                          })(i, '|'),
                          !0
                      )
                    : {
                          exec: function() {
                              return null;
                          }
                      };
            }
        })(s);
    }
    function k(e, t, i, r) {
        function c(e, t, r, a) {
            var n = '<span class="' + (a ? '' : v.classPrefix);
            return e ? (n += e + '">') + t + (r ? '' : N) : t;
        }
        function s() {
            (b +=
                null != u.sL
                    ? (function() {
                          var e = 'string' == typeof u.sL;
                          if (e && !h[u.sL]) return y(p);
                          var t = e ? k(u.sL, p, !0, d[u.sL]) : x(p, u.sL.length ? u.sL : void 0);
                          return 0 < u.r && (m += t.r), e && (d[u.sL] = t.top), c(t.language, t.value, !1, !0);
                      })()
                    : (function() {
                          var e, t, r, a, n, i, s;
                          if (!u.k) return y(p);
                          for (a = '', t = 0, u.lR.lastIndex = 0, r = u.lR.exec(p); r; )
                              (a += y(p.substring(t, r.index))),
                                  (n = u),
                                  (i = r),
                                  void 0,
                                  (s = l.cI ? i[0].toLowerCase() : i[0]),
                                  (e = n.k.hasOwnProperty(s) && n.k[s])
                                      ? ((m += e[1]), (a += c(e[0], y(r[0]))))
                                      : (a += y(r[0])),
                                  (t = u.lR.lastIndex),
                                  (r = u.lR.exec(p));
                          return a + y(p.substr(t));
                      })()),
                (p = '');
        }
        function o(e) {
            (b += e.cN ? c(e.cN, '', !0) : ''), (u = Object.create(e, { parent: { value: u } }));
        }
        function a(e, t) {
            if (((p += e), null == t)) return s(), 0;
            var r = (function(e, t) {
                var r, a, n;
                for (r = 0, a = t.c.length; r < a; r++)
                    if (w(t.c[r].bR, e))
                        return (
                            t.c[r].endSameAsBegin &&
                                (t.c[r].eR = ((n = t.c[r].bR.exec(e)[0]),
                                new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm'))),
                            t.c[r]
                        );
            })(t, u);
            if (r)
                return r.skip ? (p += t) : (r.eB && (p += t), s(), r.rB || r.eB || (p = t)), o(r), r.rB ? 0 : t.length;
            var a = (function e(t, r) {
                if (w(t.eR, r)) {
                    for (; t.endsParent && t.parent; ) t = t.parent;
                    return t;
                }
                if (t.eW) return e(t.parent, r);
            })(u, t);
            if (a) {
                var n = u;
                for (
                    n.skip ? (p += t) : (n.rE || n.eE || (p += t), s(), n.eE && (p = t));
                    u.cN && (b += N), u.skip || u.sL || (m += u.r), (u = u.parent) !== a.parent;

                );
                return a.starts && (a.endSameAsBegin && (a.starts.eR = a.eR), o(a.starts)), n.rE ? 0 : t.length;
            }
            if (
                (function(e, t) {
                    return !i && w(t.iR, e);
                })(t, u)
            )
                throw new Error('Illegal lexeme "' + t + '" for mode "' + (u.cN || '<unnamed>') + '"');
            return (p += t), t.length || 1;
        }
        var l = M(e);
        if (!l) throw new Error('Unknown language: "' + e + '"');
        E(l);
        var n,
            u = r || l,
            d = {},
            b = '';
        for (n = u; n !== l; n = n.parent) n.cN && (b = c(n.cN, '', !0) + b);
        var p = '',
            m = 0;
        try {
            for (var f, g, _ = 0; (u.t.lastIndex = _), (f = u.t.exec(t)); )
                (g = a(t.substring(_, f.index), f[0])), (_ = f.index + g);
            for (a(t.substr(_)), n = u; n.parent; n = n.parent) n.cN && (b += N);
            return { r: m, value: b, language: e, top: u };
        } catch (e) {
            if (e.message && -1 !== e.message.indexOf('Illegal')) return { r: 0, value: y(t) };
            throw e;
        }
    }
    function x(r, e) {
        e = e || v.languages || o(h);
        var a = { r: 0, value: y(r) },
            n = a;
        return (
            e
                .filter(M)
                .filter(_)
                .forEach(function(e) {
                    var t = k(e, r, !1);
                    (t.language = e), t.r > n.r && (n = t), t.r > a.r && ((n = a), (a = t));
                }),
            n.language && (a.second_best = n),
            a
        );
    }
    function f(e) {
        return v.tabReplace || v.useBR
            ? e.replace(r, function(e, t) {
                  return v.useBR && '\n' === e ? '<br>' : v.tabReplace ? t.replace(/\t/g, v.tabReplace) : '';
              })
            : e;
    }
    function s(e) {
        var t,
            r,
            a,
            n,
            i,
            s = (function(e) {
                var t,
                    r,
                    a,
                    n,
                    i = e.className + ' ';
                if (((i += e.parentNode ? e.parentNode.className : ''), (r = l.exec(i))))
                    return M(r[1]) ? r[1] : 'no-highlight';
                for (t = 0, a = (i = i.split(/\s+/)).length; t < a; t++) if (u((n = i[t])) || M(n)) return n;
            })(e);
        u(s) ||
            (v.useBR
                ? ((t = document.createElementNS(
                      'http://www.w3.org/1999/xhtml',
                      'div'
                  )).innerHTML = e.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n'))
                : (t = e),
            (i = t.textContent),
            (a = s ? k(s, i, !0) : x(i)),
            (r = m(t)).length &&
                (((n = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')).innerHTML = a.value),
                (a.value = (function(e, t, r) {
                    var a = 0,
                        n = '',
                        i = [];
                    function s() {
                        return e.length && t.length
                            ? e[0].offset !== t[0].offset
                                ? e[0].offset < t[0].offset
                                    ? e
                                    : t
                                : 'start' === t[0].event
                                ? e
                                : t
                            : e.length
                            ? e
                            : t;
                    }
                    function c(e) {
                        n +=
                            '<' +
                            b(e) +
                            d.map
                                .call(e.attributes, function(e) {
                                    return ' ' + e.nodeName + '="' + y(e.value).replace('"', '&quot;') + '"';
                                })
                                .join('') +
                            '>';
                    }
                    function o(e) {
                        n += '</' + b(e) + '>';
                    }
                    function l(e) {
                        ('start' === e.event ? c : o)(e.node);
                    }
                    for (; e.length || t.length; ) {
                        var u = s();
                        if (((n += y(r.substring(a, u[0].offset))), (a = u[0].offset), u === e)) {
                            for (
                                i.reverse().forEach(o);
                                l(u.splice(0, 1)[0]), (u = s()) === e && u.length && u[0].offset === a;

                            );
                            i.reverse().forEach(c);
                        } else 'start' === u[0].event ? i.push(u[0].node) : i.pop(), l(u.splice(0, 1)[0]);
                    }
                    return n + y(r.substr(a));
                })(r, m(n), i))),
            (a.value = f(a.value)),
            (e.innerHTML = a.value),
            (e.className = (function(e, t, r) {
                var a = t ? c[t] : r,
                    n = [e.trim()];
                return e.match(/\bhljs\b/) || n.push('hljs'), -1 === e.indexOf(a) && n.push(a), n.join(' ').trim();
            })(e.className, s, a.language)),
            (e.result = { language: a.language, re: a.r }),
            a.second_best && (e.second_best = { language: a.second_best.language, re: a.second_best.r }));
    }
    function g() {
        if (!g.called) {
            g.called = !0;
            var e = document.querySelectorAll('pre code');
            d.forEach.call(e, s);
        }
    }
    function M(e) {
        return (e = (e || '').toLowerCase()), h[e] || h[c[e]];
    }
    function _(e) {
        var t = M(e);
        return t && !t.disableAutodetect;
    }
    return (
        (n.highlight = k),
        (n.highlightAuto = x),
        (n.fixMarkup = f),
        (n.highlightBlock = s),
        (n.configure = function(e) {
            v = p(v, e);
        }),
        (n.initHighlighting = g),
        (n.initHighlightingOnLoad = function() {
            addEventListener('DOMContentLoaded', g, !1), addEventListener('load', g, !1);
        }),
        (n.registerLanguage = function(t, e) {
            var r = (h[t] = e(n));
            i(r),
                r.aliases &&
                    r.aliases.forEach(function(e) {
                        c[e] = t;
                    });
        }),
        (n.listLanguages = function() {
            return o(h);
        }),
        (n.getLanguage = M),
        (n.autoDetection = _),
        (n.inherit = p),
        (n.IR = n.IDENT_RE = '[a-zA-Z]\\w*'),
        (n.UIR = n.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*'),
        (n.NR = n.NUMBER_RE = '\\b\\d+(\\.\\d+)?'),
        (n.CNR = n.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'),
        (n.BNR = n.BINARY_NUMBER_RE = '\\b(0b[01]+)'),
        (n.RSR = n.RE_STARTERS_RE =
            '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~'),
        (n.BE = n.BACKSLASH_ESCAPE = { b: '\\\\[\\s\\S]', r: 0 }),
        (n.ASM = n.APOS_STRING_MODE = { cN: 'string', b: "'", e: "'", i: '\\n', c: [n.BE] }),
        (n.QSM = n.QUOTE_STRING_MODE = { cN: 'string', b: '"', e: '"', i: '\\n', c: [n.BE] }),
        (n.PWM = n.PHRASAL_WORDS_MODE = {
            b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
        }),
        (n.C = n.COMMENT = function(e, t, r) {
            var a = n.inherit({ cN: 'comment', b: e, e: t, c: [] }, r || {});
            return a.c.push(n.PWM), a.c.push({ cN: 'doctag', b: '(?:TODO|FIXME|NOTE|BUG|XXX):', r: 0 }), a;
        }),
        (n.CLCM = n.C_LINE_COMMENT_MODE = n.C('//', '$')),
        (n.CBCM = n.C_BLOCK_COMMENT_MODE = n.C('/\\*', '\\*/')),
        (n.HCM = n.HASH_COMMENT_MODE = n.C('#', '$')),
        (n.NM = n.NUMBER_MODE = { cN: 'number', b: n.NR, r: 0 }),
        (n.CNM = n.C_NUMBER_MODE = { cN: 'number', b: n.CNR, r: 0 }),
        (n.BNM = n.BINARY_NUMBER_MODE = { cN: 'number', b: n.BNR, r: 0 }),
        (n.CSSNM = n.CSS_NUMBER_MODE = {
            cN: 'number',
            b: n.NR + '(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?',
            r: 0
        }),
        (n.RM = n.REGEXP_MODE = {
            cN: 'regexp',
            b: /\//,
            e: /\/[gimuy]*/,
            i: /\n/,
            c: [n.BE, { b: /\[/, e: /\]/, r: 0, c: [n.BE] }]
        }),
        (n.TM = n.TITLE_MODE = { cN: 'title', b: n.IR, r: 0 }),
        (n.UTM = n.UNDERSCORE_TITLE_MODE = { cN: 'title', b: n.UIR, r: 0 }),
        (n.METHOD_GUARD = { b: '\\.\\s*' + n.UIR, r: 0 }),
        n.registerLanguage('apache', function(e) {
            var t = { cN: 'number', b: '[\\$%]\\d+' };
            return {
                aliases: ['apacheconf'],
                cI: !0,
                c: [
                    e.HCM,
                    { cN: 'section', b: '</?', e: '>' },
                    {
                        cN: 'attribute',
                        b: /\w+/,
                        r: 0,
                        k: {
                            nomarkup:
                                'order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername'
                        },
                        starts: {
                            e: /$/,
                            r: 0,
                            k: { literal: 'on off all' },
                            c: [
                                { cN: 'meta', b: '\\s\\[', e: '\\]$' },
                                { cN: 'variable', b: '[\\$%]\\{', e: '\\}', c: ['self', t] },
                                t,
                                e.QSM
                            ]
                        }
                    }
                ],
                i: /\S/
            };
        }),
        n.registerLanguage('bash', function(e) {
            var t = { cN: 'variable', v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
                r = { cN: 'string', b: /"/, e: /"/, c: [e.BE, t, { cN: 'variable', b: /\$\(/, e: /\)/, c: [e.BE] }] };
            return {
                aliases: ['sh', 'zsh'],
                l: /\b-?[a-z\._]+\b/,
                k: {
                    keyword: 'if then else elif fi for while in do done case esac function',
                    literal: 'true false',
                    built_in:
                        'break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp',
                    _: '-ne -eq -lt -gt -f -d -e -s -l -a'
                },
                c: [
                    { cN: 'meta', b: /^#![^\n]+sh\s*$/, r: 10 },
                    {
                        cN: 'function',
                        b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                        rB: !0,
                        c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })],
                        r: 0
                    },
                    e.HCM,
                    r,
                    { cN: '', b: /\\"/ },
                    { cN: 'string', b: /'/, e: /'/ },
                    t
                ]
            };
        }),
        n.registerLanguage('coffeescript', function(e) {
            var t = {
                    keyword:
                        'in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not',
                    literal: 'true false null undefined yes no on off',
                    built_in: 'npm require console print module global window document'
                },
                r = '[A-Za-z$_][0-9A-Za-z$_]*',
                a = { cN: 'subst', b: /#\{/, e: /}/, k: t },
                n = [
                    e.BNM,
                    e.inherit(e.CNM, { starts: { e: '(\\s*/)?', r: 0 } }),
                    {
                        cN: 'string',
                        v: [
                            { b: /'''/, e: /'''/, c: [e.BE] },
                            { b: /'/, e: /'/, c: [e.BE] },
                            { b: /"""/, e: /"""/, c: [e.BE, a] },
                            { b: /"/, e: /"/, c: [e.BE, a] }
                        ]
                    },
                    {
                        cN: 'regexp',
                        v: [
                            { b: '///', e: '///', c: [a, e.HCM] },
                            { b: '//[gim]*', r: 0 },
                            { b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }
                        ]
                    },
                    { b: '@' + r },
                    { sL: 'javascript', eB: !0, eE: !0, v: [{ b: '```', e: '```' }, { b: '`', e: '`' }] }
                ];
            a.c = n;
            var i = e.inherit(e.TM, { b: r }),
                s = '(\\(.*\\))?\\s*\\B[-=]>',
                c = { cN: 'params', b: '\\([^\\(]', rB: !0, c: [{ b: /\(/, e: /\)/, k: t, c: ['self'].concat(n) }] };
            return {
                aliases: ['coffee', 'cson', 'iced'],
                k: t,
                i: /\/\*/,
                c: n.concat([
                    e.C('###', '###'),
                    e.HCM,
                    { cN: 'function', b: '^\\s*' + r + '\\s*=\\s*' + s, e: '[-=]>', rB: !0, c: [i, c] },
                    { b: /[:\(,=]\s*/, r: 0, c: [{ cN: 'function', b: s, e: '[-=]>', rB: !0, c: [c] }] },
                    {
                        cN: 'class',
                        bK: 'class',
                        e: '$',
                        i: /[:="\[\]]/,
                        c: [{ bK: 'extends', eW: !0, i: /[:="\[\]]/, c: [i] }, i]
                    },
                    { b: r + ':', e: ':', rB: !0, rE: !0, r: 0 }
                ])
            };
        }),
        n.registerLanguage('cpp', function(e) {
            var t = { cN: 'keyword', b: '\\b[a-z\\d_]*_t\\b' },
                r = {
                    cN: 'string',
                    v: [
                        { b: '(u8?|U|L)?"', e: '"', i: '\\n', c: [e.BE] },
                        { b: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\((?:.|\n)*?\)\1"/ },
                        { b: "'\\\\?.", e: "'", i: '.' }
                    ]
                },
                a = {
                    cN: 'number',
                    v: [
                        { b: "\\b(0b[01']+)" },
                        { b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" },
                        { b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
                    ],
                    r: 0
                },
                n = {
                    cN: 'meta',
                    b: /#\s*[a-z]+\b/,
                    e: /$/,
                    k: {
                        'meta-keyword': 'if else elif endif define undef warning error line pragma ifdef ifndef include'
                    },
                    c: [
                        { b: /\\\n/, r: 0 },
                        e.inherit(r, { cN: 'meta-string' }),
                        { cN: 'meta-string', b: /<[^\n>]*>/, e: /$/, i: '\\n' },
                        e.CLCM,
                        e.CBCM
                    ]
                },
                i = e.IR + '\\s*\\(',
                s = {
                    keyword:
                        'int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not',
                    built_in:
                        'std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr',
                    literal: 'true false nullptr NULL'
                },
                c = [t, e.CLCM, e.CBCM, a, r];
            return {
                aliases: ['c', 'cc', 'h', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'],
                k: s,
                i: '</',
                c: c.concat([
                    n,
                    {
                        b:
                            '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
                        e: '>',
                        k: s,
                        c: ['self', t]
                    },
                    { b: e.IR + '::', k: s },
                    {
                        v: [{ b: /=/, e: /;/ }, { b: /\(/, e: /\)/ }, { bK: 'new throw return else', e: /;/ }],
                        k: s,
                        c: c.concat([{ b: /\(/, e: /\)/, k: s, c: c.concat(['self']), r: 0 }]),
                        r: 0
                    },
                    {
                        cN: 'function',
                        b: '(' + e.IR + '[\\*&\\s]+)+' + i,
                        rB: !0,
                        e: /[{;=]/,
                        eE: !0,
                        k: s,
                        i: /[^\w\s\*&]/,
                        c: [
                            { b: i, rB: !0, c: [e.TM], r: 0 },
                            {
                                cN: 'params',
                                b: /\(/,
                                e: /\)/,
                                k: s,
                                r: 0,
                                c: [
                                    e.CLCM,
                                    e.CBCM,
                                    r,
                                    a,
                                    t,
                                    { b: /\(/, e: /\)/, k: s, r: 0, c: ['self', e.CLCM, e.CBCM, r, a, t] }
                                ]
                            },
                            e.CLCM,
                            e.CBCM,
                            n
                        ]
                    },
                    { cN: 'class', bK: 'class struct', e: /[{;:]/, c: [{ b: /</, e: />/, c: ['self'] }, e.TM] }
                ]),
                exports: { preprocessor: n, strings: r, k: s }
            };
        }),
        n.registerLanguage('cs', function(e) {
            var t = {
                    keyword:
                        'abstract as base bool break byte case catch char checked const continue decimal default delegate do double enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long nameof object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield',
                    literal: 'null false true'
                },
                r = {
                    cN: 'number',
                    v: [
                        { b: "\\b(0b[01']+)" },
                        { b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" },
                        { b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }
                    ],
                    r: 0
                },
                a = { cN: 'string', b: '@"', e: '"', c: [{ b: '""' }] },
                n = e.inherit(a, { i: /\n/ }),
                i = { cN: 'subst', b: '{', e: '}', k: t },
                s = e.inherit(i, { i: /\n/ }),
                c = { cN: 'string', b: /\$"/, e: '"', i: /\n/, c: [{ b: '{{' }, { b: '}}' }, e.BE, s] },
                o = { cN: 'string', b: /\$@"/, e: '"', c: [{ b: '{{' }, { b: '}}' }, { b: '""' }, i] },
                l = e.inherit(o, { i: /\n/, c: [{ b: '{{' }, { b: '}}' }, { b: '""' }, s] });
            (i.c = [o, c, a, e.ASM, e.QSM, r, e.CBCM]),
                (s.c = [l, c, n, e.ASM, e.QSM, r, e.inherit(e.CBCM, { i: /\n/ })]);
            var u = { v: [o, c, a, e.ASM, e.QSM] },
                d = e.IR + '(<' + e.IR + '(\\s*,\\s*' + e.IR + ')*>)?(\\[\\])?';
            return {
                aliases: ['csharp', 'c#'],
                k: t,
                i: /::/,
                c: [
                    e.C('///', '$', {
                        rB: !0,
                        c: [{ cN: 'doctag', v: [{ b: '///', r: 0 }, { b: '\x3c!--|--\x3e' }, { b: '</?', e: '>' }] }]
                    }),
                    e.CLCM,
                    e.CBCM,
                    {
                        cN: 'meta',
                        b: '#',
                        e: '$',
                        k: {
                            'meta-keyword':
                                'if else elif endif define undef warning error line region endregion pragma checksum'
                        }
                    },
                    u,
                    r,
                    { bK: 'class interface', e: /[{;=]/, i: /[^\s:,]/, c: [e.TM, e.CLCM, e.CBCM] },
                    {
                        bK: 'namespace',
                        e: /[{;=]/,
                        i: /[^\s:]/,
                        c: [e.inherit(e.TM, { b: '[a-zA-Z](\\.?\\w)*' }), e.CLCM, e.CBCM]
                    },
                    { cN: 'meta', b: '^\\s*\\[', eB: !0, e: '\\]', eE: !0, c: [{ cN: 'meta-string', b: /"/, e: /"/ }] },
                    { bK: 'new return throw await else', r: 0 },
                    {
                        cN: 'function',
                        b: '(' + d + '\\s+)+' + e.IR + '\\s*\\(',
                        rB: !0,
                        e: /\s*[{;=]/,
                        eE: !0,
                        k: t,
                        c: [
                            { b: e.IR + '\\s*\\(', rB: !0, c: [e.TM], r: 0 },
                            { cN: 'params', b: /\(/, e: /\)/, eB: !0, eE: !0, k: t, r: 0, c: [u, r, e.CBCM] },
                            e.CLCM,
                            e.CBCM
                        ]
                    }
                ]
            };
        }),
        n.registerLanguage('css', function(e) {
            var t = {
                b: /(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,
                rB: !0,
                e: ';',
                eW: !0,
                c: [
                    {
                        cN: 'attribute',
                        b: /\S/,
                        e: ':',
                        eE: !0,
                        starts: {
                            eW: !0,
                            eE: !0,
                            c: [
                                {
                                    b: /[\w-]+\(/,
                                    rB: !0,
                                    c: [{ cN: 'built_in', b: /[\w-]+/ }, { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] }]
                                },
                                e.CSSNM,
                                e.QSM,
                                e.ASM,
                                e.CBCM,
                                { cN: 'number', b: '#[0-9A-Fa-f]+' },
                                { cN: 'meta', b: '!important' }
                            ]
                        }
                    }
                ]
            };
            return {
                cI: !0,
                i: /[=\/|'\$]/,
                c: [
                    e.CBCM,
                    { cN: 'selector-id', b: /#[A-Za-z0-9_-]+/ },
                    { cN: 'selector-class', b: /\.[A-Za-z0-9_-]+/ },
                    { cN: 'selector-attr', b: /\[/, e: /\]/, i: '$' },
                    { cN: 'selector-pseudo', b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },
                    { b: '@(font-face|page)', l: '[a-z-]+', k: 'font-face page' },
                    {
                        b: '@',
                        e: '[{;]',
                        i: /:/,
                        c: [{ cN: 'keyword', b: /\w+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] }]
                    },
                    { cN: 'selector-tag', b: '[a-zA-Z-][a-zA-Z0-9_-]*', r: 0 },
                    { b: '{', e: '}', i: /\S/, c: [e.CBCM, t] }
                ]
            };
        }),
        n.registerLanguage('diff', function(e) {
            return {
                aliases: ['patch'],
                c: [
                    {
                        cN: 'meta',
                        r: 10,
                        v: [
                            { b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ },
                            { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
                            { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }
                        ]
                    },
                    {
                        cN: 'comment',
                        v: [
                            { b: /Index: /, e: /$/ },
                            { b: /={3,}/, e: /$/ },
                            { b: /^\-{3}/, e: /$/ },
                            { b: /^\*{3} /, e: /$/ },
                            { b: /^\+{3}/, e: /$/ },
                            { b: /\*{5}/, e: /\*{5}$/ }
                        ]
                    },
                    { cN: 'addition', b: '^\\+', e: '$' },
                    { cN: 'deletion', b: '^\\-', e: '$' },
                    { cN: 'addition', b: '^\\!', e: '$' }
                ]
            };
        }),
        n.registerLanguage('http', function(e) {
            var t = 'HTTP/[0-9\\.]+';
            return {
                aliases: ['https'],
                i: '\\S',
                c: [
                    { b: '^' + t, e: '$', c: [{ cN: 'number', b: '\\b\\d{3}\\b' }] },
                    {
                        b: '^[A-Z]+ (.*?) ' + t + '$',
                        rB: !0,
                        e: '$',
                        c: [{ cN: 'string', b: ' ', e: ' ', eB: !0, eE: !0 }, { b: t }, { cN: 'keyword', b: '[A-Z]+' }]
                    },
                    { cN: 'attribute', b: '^\\w', e: ': ', eE: !0, i: '\\n|\\s|=', starts: { e: '$', r: 0 } },
                    { b: '\\n\\n', starts: { sL: [], eW: !0 } }
                ]
            };
        }),
        n.registerLanguage('ini', function(e) {
            var t = {
                cN: 'string',
                c: [e.BE],
                v: [
                    { b: "'''", e: "'''", r: 10 },
                    { b: '"""', e: '"""', r: 10 },
                    { b: '"', e: '"' },
                    { b: "'", e: "'" }
                ]
            };
            return {
                aliases: ['toml'],
                cI: !0,
                i: /\S/,
                c: [
                    e.C(';', '$'),
                    e.HCM,
                    { cN: 'section', b: /^\s*\[+/, e: /\]+/ },
                    {
                        b: /^[a-z0-9\[\]_\.-]+\s*=\s*/,
                        e: '$',
                        rB: !0,
                        c: [
                            { cN: 'attr', b: /[a-z0-9\[\]_\.-]+/ },
                            {
                                b: /=/,
                                eW: !0,
                                r: 0,
                                c: [
                                    e.C(';', '$'),
                                    e.HCM,
                                    { cN: 'literal', b: /\bon|off|true|false|yes|no\b/ },
                                    { cN: 'variable', v: [{ b: /\$[\w\d"][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
                                    t,
                                    { cN: 'number', b: /([\+\-]+)?[\d]+_[\d_]+/ },
                                    e.NM
                                ]
                            }
                        ]
                    }
                ]
            };
        }),
        n.registerLanguage('java', function(e) {
            var t =
                    'false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do',
                r = {
                    cN: 'number',
                    b:
                        '\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?',
                    r: 0
                };
            return {
                aliases: ['jsp'],
                k: t,
                i: /<\/|#/,
                c: [
                    e.C('/\\*\\*', '\\*/', { r: 0, c: [{ b: /\w+@/, r: 0 }, { cN: 'doctag', b: '@[A-Za-z]+' }] }),
                    e.CLCM,
                    e.CBCM,
                    e.ASM,
                    e.QSM,
                    {
                        cN: 'class',
                        bK: 'class interface',
                        e: /[{;=]/,
                        eE: !0,
                        k: 'class interface',
                        i: /[:"\[\]]/,
                        c: [{ bK: 'extends implements' }, e.UTM]
                    },
                    { bK: 'new throw return else', r: 0 },
                    {
                        cN: 'function',
                        b:
                            '([À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(<[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*(\\s*,\\s*[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*)*>)?\\s+)+' +
                            e.UIR +
                            '\\s*\\(',
                        rB: !0,
                        e: /[{;=]/,
                        eE: !0,
                        k: t,
                        c: [
                            { b: e.UIR + '\\s*\\(', rB: !0, r: 0, c: [e.UTM] },
                            { cN: 'params', b: /\(/, e: /\)/, k: t, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] },
                            e.CLCM,
                            e.CBCM
                        ]
                    },
                    r,
                    { cN: 'meta', b: '@[A-Za-z]+' }
                ]
            };
        }),
        n.registerLanguage('javascript', function(e) {
            var t = '[A-Za-z$_][0-9A-Za-z$_]*',
                r = {
                    keyword:
                        'in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as',
                    literal: 'true false null undefined NaN Infinity',
                    built_in:
                        'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise'
                },
                a = { cN: 'number', v: [{ b: '\\b(0[bB][01]+)' }, { b: '\\b(0[oO][0-7]+)' }, { b: e.CNR }], r: 0 },
                n = { cN: 'subst', b: '\\$\\{', e: '\\}', k: r, c: [] },
                i = { b: 'html`', e: '', starts: { e: '`', rE: !1, c: [e.BE, n], sL: 'xml' } },
                s = { b: 'css`', e: '', starts: { e: '`', rE: !1, c: [e.BE, n], sL: 'css' } },
                c = { cN: 'string', b: '`', e: '`', c: [e.BE, n] };
            n.c = [e.ASM, e.QSM, i, s, c, a, e.RM];
            var o = n.c.concat([e.CBCM, e.CLCM]);
            return {
                aliases: ['js', 'jsx'],
                k: r,
                c: [
                    { cN: 'meta', r: 10, b: /^\s*['"]use (strict|asm)['"]/ },
                    { cN: 'meta', b: /^#!/, e: /$/ },
                    e.ASM,
                    e.QSM,
                    i,
                    s,
                    c,
                    e.CLCM,
                    e.CBCM,
                    a,
                    { b: /[{,]\s*/, r: 0, c: [{ b: t + '\\s*:', rB: !0, r: 0, c: [{ cN: 'attr', b: t, r: 0 }] }] },
                    {
                        b: '(' + e.RSR + '|\\b(case|return|throw)\\b)\\s*',
                        k: 'return throw case',
                        c: [
                            e.CLCM,
                            e.CBCM,
                            e.RM,
                            {
                                cN: 'function',
                                b: '(\\(.*?\\)|' + t + ')\\s*=>',
                                rB: !0,
                                e: '\\s*=>',
                                c: [
                                    {
                                        cN: 'params',
                                        v: [
                                            { b: t },
                                            { b: /\(\s*\)/ },
                                            { b: /\(/, e: /\)/, eB: !0, eE: !0, k: r, c: o }
                                        ]
                                    }
                                ]
                            },
                            { cN: '', b: /\s/, e: /\s*/, skip: !0 },
                            {
                                b: /</,
                                e: /(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,
                                sL: 'xml',
                                c: [
                                    { b: /<[A-Za-z0-9\\._:-]+\s*\/>/, skip: !0 },
                                    {
                                        b: /<[A-Za-z0-9\\._:-]+/,
                                        e: /(\/[A-Za-z0-9\\._:-]+|[A-Za-z0-9\\._:-]+\/)>/,
                                        skip: !0,
                                        c: [{ b: /<[A-Za-z0-9\\._:-]+\s*\/>/, skip: !0 }, 'self']
                                    }
                                ]
                            }
                        ],
                        r: 0
                    },
                    {
                        cN: 'function',
                        bK: 'function',
                        e: /\{/,
                        eE: !0,
                        c: [e.inherit(e.TM, { b: t }), { cN: 'params', b: /\(/, e: /\)/, eB: !0, eE: !0, c: o }],
                        i: /\[|%/
                    },
                    { b: /\$[(.]/ },
                    e.METHOD_GUARD,
                    { cN: 'class', bK: 'class', e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: 'extends' }, e.UTM] },
                    { bK: 'constructor get set', e: /\{/, eE: !0 }
                ],
                i: /#(?!!)/
            };
        }),
        n.registerLanguage('json', function(e) {
            var t = { literal: 'true false null' },
                r = [e.QSM, e.CNM],
                a = { e: ',', eW: !0, eE: !0, c: r, k: t },
                n = {
                    b: '{',
                    e: '}',
                    c: [{ cN: 'attr', b: /"/, e: /"/, c: [e.BE], i: '\\n' }, e.inherit(a, { b: /:/ })],
                    i: '\\S'
                },
                i = { b: '\\[', e: '\\]', c: [e.inherit(a)], i: '\\S' };
            return r.splice(r.length, 0, n, i), { c: r, k: t, i: '\\S' };
        }),
        n.registerLanguage('makefile', function(e) {
            var t = { cN: 'variable', v: [{ b: '\\$\\(' + e.UIR + '\\)', c: [e.BE] }, { b: /\$[@%<?\^\+\*]/ }] },
                r = { cN: 'string', b: /"/, e: /"/, c: [e.BE, t] },
                a = {
                    cN: 'variable',
                    b: /\$\([\w-]+\s/,
                    e: /\)/,
                    k: {
                        built_in:
                            'subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value'
                    },
                    c: [t]
                },
                n = { b: '^' + e.UIR + '\\s*[:+?]?=', i: '\\n', rB: !0, c: [{ b: '^' + e.UIR, e: '[:+?]?=', eE: !0 }] },
                i = { cN: 'section', b: /^[^\s]+:/, e: /$/, c: [t] };
            return {
                aliases: ['mk', 'mak'],
                k:
                    'define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath',
                l: /[\w-]+/,
                c: [
                    e.HCM,
                    t,
                    r,
                    a,
                    n,
                    { cN: 'meta', b: /^\.PHONY:/, e: /$/, k: { 'meta-keyword': '.PHONY' }, l: /[\.\w]+/ },
                    i
                ]
            };
        }),
        n.registerLanguage('xml', function(e) {
            var t = {
                eW: !0,
                i: /</,
                r: 0,
                c: [
                    { cN: 'attr', b: '[A-Za-z0-9\\._:-]+', r: 0 },
                    {
                        b: /=\s*/,
                        r: 0,
                        c: [
                            {
                                cN: 'string',
                                endsParent: !0,
                                v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }]
                            }
                        ]
                    }
                ]
            };
            return {
                aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'wsf'],
                cI: !0,
                c: [
                    { cN: 'meta', b: '<!DOCTYPE', e: '>', r: 10, c: [{ b: '\\[', e: '\\]' }] },
                    e.C('\x3c!--', '--\x3e', { r: 10 }),
                    { b: '<\\!\\[CDATA\\[', e: '\\]\\]>', r: 10 },
                    { cN: 'meta', b: /<\?xml/, e: /\?>/, r: 10 },
                    {
                        b: /<\?(php)?/,
                        e: /\?>/,
                        sL: 'php',
                        c: [
                            { b: '/\\*', e: '\\*/', skip: !0 },
                            { b: 'b"', e: '"', skip: !0 },
                            { b: "b'", e: "'", skip: !0 },
                            e.inherit(e.ASM, { i: null, cN: null, c: null, skip: !0 }),
                            e.inherit(e.QSM, { i: null, cN: null, c: null, skip: !0 })
                        ]
                    },
                    {
                        cN: 'tag',
                        b: '<style(?=\\s|>|$)',
                        e: '>',
                        k: { name: 'style' },
                        c: [t],
                        starts: { e: '</style>', rE: !0, sL: ['css', 'xml'] }
                    },
                    {
                        cN: 'tag',
                        b: '<script(?=\\s|>|$)',
                        e: '>',
                        k: { name: 'script' },
                        c: [t],
                        starts: {
                            e: '</script>',
                            rE: !0,
                            sL: ['actionscript', 'javascript', 'handlebars', 'xml', 'vbscript']
                        }
                    },
                    { cN: 'tag', b: '</?', e: '/?>', c: [{ cN: 'name', b: /[^\/><\s]+/, r: 0 }, t] }
                ]
            };
        }),
        n.registerLanguage('markdown', function(e) {
            return {
                aliases: ['md', 'mkdown', 'mkd'],
                c: [
                    { cN: 'section', v: [{ b: '^#{1,6}', e: '$' }, { b: '^.+?\\n[=-]{2,}$' }] },
                    { b: '<', e: '>', sL: 'xml', r: 0 },
                    { cN: 'bullet', b: '^\\s*([*+-]|(\\d+\\.))\\s+' },
                    { cN: 'strong', b: '[*_]{2}.+?[*_]{2}' },
                    { cN: 'emphasis', v: [{ b: '\\*.+?\\*' }, { b: '_.+?_', r: 0 }] },
                    { cN: 'quote', b: '^>\\s+', e: '$' },
                    {
                        cN: 'code',
                        v: [{ b: '^```w*s*$', e: '^```s*$' }, { b: '`.+?`' }, { b: '^( {4}|\t)', e: '$', r: 0 }]
                    },
                    { b: '^[-\\*]{3,}', e: '$' },
                    {
                        b: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
                        rB: !0,
                        c: [
                            { cN: 'string', b: '\\[', e: '\\]', eB: !0, rE: !0, r: 0 },
                            { cN: 'link', b: '\\]\\(', e: '\\)', eB: !0, eE: !0 },
                            { cN: 'symbol', b: '\\]\\[', e: '\\]', eB: !0, eE: !0 }
                        ],
                        r: 10
                    },
                    {
                        b: /^\[[^\n]+\]:/,
                        rB: !0,
                        c: [
                            { cN: 'symbol', b: /\[/, e: /\]/, eB: !0, eE: !0 },
                            { cN: 'link', b: /:\s*/, e: /$/, eB: !0 }
                        ]
                    }
                ]
            };
        }),
        n.registerLanguage('nginx', function(e) {
            var t = { cN: 'variable', v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: '[\\$\\@]' + e.UIR }] },
                r = {
                    eW: !0,
                    l: '[a-z/_]+',
                    k: {
                        literal:
                            'on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll'
                    },
                    r: 0,
                    i: '=>',
                    c: [
                        e.HCM,
                        { cN: 'string', c: [e.BE, t], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }] },
                        { b: '([a-z]+):/', e: '\\s', eW: !0, eE: !0, c: [t] },
                        {
                            cN: 'regexp',
                            c: [e.BE, t],
                            v: [
                                { b: '\\s\\^', e: '\\s|{|;', rE: !0 },
                                { b: '~\\*?\\s+', e: '\\s|{|;', rE: !0 },
                                { b: '\\*(\\.[a-z\\-]+)+' },
                                { b: '([a-z\\-]+\\.)+\\*' }
                            ]
                        },
                        { cN: 'number', b: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b' },
                        { cN: 'number', b: '\\b\\d+[kKmMgGdshdwy]*\\b', r: 0 },
                        t
                    ]
                };
            return {
                aliases: ['nginxconf'],
                c: [
                    e.HCM,
                    { b: e.UIR + '\\s+{', rB: !0, e: '{', c: [{ cN: 'section', b: e.UIR }], r: 0 },
                    { b: e.UIR + '\\s', e: ';|{', rB: !0, c: [{ cN: 'attribute', b: e.UIR, starts: r }], r: 0 }
                ],
                i: '[^\\s\\}]'
            };
        }),
        n.registerLanguage('objectivec', function(e) {
            var t = /[a-zA-Z@][a-zA-Z0-9_]*/,
                r = '@interface @class @protocol @implementation';
            return {
                aliases: ['mm', 'objc', 'obj-c'],
                k: {
                    keyword:
                        'int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN',
                    literal: 'false true FALSE TRUE nil YES NO NULL',
                    built_in: 'BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
                },
                l: t,
                i: '</',
                c: [
                    { cN: 'built_in', b: '\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+' },
                    e.CLCM,
                    e.CBCM,
                    e.CNM,
                    e.QSM,
                    {
                        cN: 'string',
                        v: [{ b: '@"', e: '"', i: '\\n', c: [e.BE] }, { b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" }]
                    },
                    {
                        cN: 'meta',
                        b: '#',
                        e: '$',
                        c: [{ cN: 'meta-string', v: [{ b: '"', e: '"' }, { b: '<', e: '>' }] }]
                    },
                    {
                        cN: 'class',
                        b: '(' + r.split(' ').join('|') + ')\\b',
                        e: '({|$)',
                        eE: !0,
                        k: r,
                        l: t,
                        c: [e.UTM]
                    },
                    { b: '\\.' + e.UIR, r: 0 }
                ]
            };
        }),
        n.registerLanguage('perl', function(e) {
            var t =
                    'getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when',
                r = { cN: 'subst', b: '[$@]\\{', e: '\\}', k: t },
                a = { b: '->{', e: '}' },
                n = {
                    v: [
                        { b: /\$\d/ },
                        { b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/ },
                        { b: /[\$%@][^\s\w{]/, r: 0 }
                    ]
                },
                i = [e.BE, r, n],
                s = [
                    n,
                    e.HCM,
                    e.C('^\\=\\w', '\\=cut', { eW: !0 }),
                    a,
                    {
                        cN: 'string',
                        c: i,
                        v: [
                            { b: 'q[qwxr]?\\s*\\(', e: '\\)', r: 5 },
                            { b: 'q[qwxr]?\\s*\\[', e: '\\]', r: 5 },
                            { b: 'q[qwxr]?\\s*\\{', e: '\\}', r: 5 },
                            { b: 'q[qwxr]?\\s*\\|', e: '\\|', r: 5 },
                            { b: 'q[qwxr]?\\s*\\<', e: '\\>', r: 5 },
                            { b: 'qw\\s+q', e: 'q', r: 5 },
                            { b: "'", e: "'", c: [e.BE] },
                            { b: '"', e: '"' },
                            { b: '`', e: '`', c: [e.BE] },
                            { b: '{\\w+}', c: [], r: 0 },
                            { b: '-?\\w+\\s*\\=\\>', c: [], r: 0 }
                        ]
                    },
                    {
                        cN: 'number',
                        b: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
                        r: 0
                    },
                    {
                        b: '(\\/\\/|' + e.RSR + '|\\b(split|return|print|reverse|grep)\\b)\\s*',
                        k: 'split return print reverse grep',
                        r: 0,
                        c: [
                            e.HCM,
                            { cN: 'regexp', b: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*', r: 10 },
                            { cN: 'regexp', b: '(m|qr)?/', e: '/[a-z]*', c: [e.BE], r: 0 }
                        ]
                    },
                    { cN: 'function', bK: 'sub', e: '(\\s*\\(.*?\\))?[;{]', eE: !0, r: 5, c: [e.TM] },
                    { b: '-\\w\\b', r: 0 },
                    { b: '^__DATA__$', e: '^__END__$', sL: 'mojolicious', c: [{ b: '^@@.*', e: '$', cN: 'comment' }] }
                ];
            return (r.c = s), { aliases: ['pl', 'pm'], l: /[\w\.]+/, k: t, c: (a.c = s) };
        }),
        n.registerLanguage('php', function(e) {
            var t = { b: '\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*' },
                r = { cN: 'meta', b: /<\?(php)?|\?>/ },
                a = {
                    cN: 'string',
                    c: [e.BE, r],
                    v: [
                        { b: 'b"', e: '"' },
                        { b: "b'", e: "'" },
                        e.inherit(e.ASM, { i: null }),
                        e.inherit(e.QSM, { i: null })
                    ]
                },
                n = { v: [e.BNM, e.CNM] };
            return {
                aliases: ['php', 'php3', 'php4', 'php5', 'php6', 'php7'],
                cI: !0,
                k:
                    'and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally',
                c: [
                    e.HCM,
                    e.C('//', '$', { c: [r] }),
                    e.C('/\\*', '\\*/', { c: [{ cN: 'doctag', b: '@[A-Za-z]+' }] }),
                    e.C('__halt_compiler.+?;', !1, { eW: !0, k: '__halt_compiler', l: e.UIR }),
                    {
                        cN: 'string',
                        b: /<<<['"]?\w+['"]?$/,
                        e: /^\w+;?$/,
                        c: [e.BE, { cN: 'subst', v: [{ b: /\$\w+/ }, { b: /\{\$/, e: /\}/ }] }]
                    },
                    r,
                    { cN: 'keyword', b: /\$this\b/ },
                    t,
                    { b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ },
                    {
                        cN: 'function',
                        bK: 'function',
                        e: /[;{]/,
                        eE: !0,
                        i: '\\$|\\[|%',
                        c: [e.UTM, { cN: 'params', b: '\\(', e: '\\)', c: ['self', t, e.CBCM, a, n] }]
                    },
                    {
                        cN: 'class',
                        bK: 'class interface',
                        e: '{',
                        eE: !0,
                        i: /[:\(\$"]/,
                        c: [{ bK: 'extends implements' }, e.UTM]
                    },
                    { bK: 'namespace', e: ';', i: /[\.']/, c: [e.UTM] },
                    { bK: 'use', e: ';', c: [e.UTM] },
                    { b: '=>' },
                    a,
                    n
                ]
            };
        }),
        n.registerLanguage('properties', function(e) {
            var t = '[ \\t\\f]*',
                r = '(' + t + '[:=]' + t + '|[ \\t\\f]+)',
                a = '([^\\\\\\W:= \\t\\f\\n]|\\\\.)+',
                n = '([^\\\\:= \\t\\f\\n]|\\\\.)+',
                i = { e: r, r: 0, starts: { cN: 'string', e: /$/, r: 0, c: [{ b: '\\\\\\n' }] } };
            return {
                cI: !0,
                i: /\S/,
                c: [
                    e.C('^\\s*[!#]', '$'),
                    { b: a + r, rB: !0, c: [{ cN: 'attr', b: a, endsParent: !0, r: 0 }], starts: i },
                    { b: n + r, rB: !0, r: 0, c: [{ cN: 'meta', b: n, endsParent: !0, r: 0 }], starts: i },
                    { cN: 'attr', r: 0, b: n + t + '$' }
                ]
            };
        }),
        n.registerLanguage('python', function(e) {
            var t = {
                    keyword:
                        'and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10',
                    built_in: 'Ellipsis NotImplemented',
                    literal: 'False None True'
                },
                r = { cN: 'meta', b: /^(>>>|\.\.\.) / },
                a = { cN: 'subst', b: /\{/, e: /\}/, k: t, i: /#/ },
                n = {
                    cN: 'string',
                    c: [e.BE],
                    v: [
                        { b: /(u|b)?r?'''/, e: /'''/, c: [e.BE, r], r: 10 },
                        { b: /(u|b)?r?"""/, e: /"""/, c: [e.BE, r], r: 10 },
                        { b: /(fr|rf|f)'''/, e: /'''/, c: [e.BE, r, a] },
                        { b: /(fr|rf|f)"""/, e: /"""/, c: [e.BE, r, a] },
                        { b: /(u|r|ur)'/, e: /'/, r: 10 },
                        { b: /(u|r|ur)"/, e: /"/, r: 10 },
                        { b: /(b|br)'/, e: /'/ },
                        { b: /(b|br)"/, e: /"/ },
                        { b: /(fr|rf|f)'/, e: /'/, c: [e.BE, a] },
                        { b: /(fr|rf|f)"/, e: /"/, c: [e.BE, a] },
                        e.ASM,
                        e.QSM
                    ]
                },
                i = {
                    cN: 'number',
                    r: 0,
                    v: [{ b: e.BNR + '[lLjJ]?' }, { b: '\\b(0o[0-7]+)[lLjJ]?' }, { b: e.CNR + '[lLjJ]?' }]
                },
                s = { cN: 'params', b: /\(/, e: /\)/, c: ['self', r, i, n] };
            return (
                (a.c = [n, i, r]),
                {
                    aliases: ['py', 'gyp', 'ipython'],
                    k: t,
                    i: /(<\/|->|\?)|=>/,
                    c: [
                        r,
                        i,
                        n,
                        e.HCM,
                        {
                            v: [{ cN: 'function', bK: 'def' }, { cN: 'class', bK: 'class' }],
                            e: /:/,
                            i: /[${=;\n,]/,
                            c: [e.UTM, s, { b: /->/, eW: !0, k: 'None' }]
                        },
                        { cN: 'meta', b: /^[\t ]*@/, e: /$/ },
                        { b: /\b(print|exec)\(/ }
                    ]
                }
            );
        }),
        n.registerLanguage('ruby', function(e) {
            var t = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?',
                r = {
                    keyword:
                        'and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor',
                    literal: 'true false nil'
                },
                a = { cN: 'doctag', b: '@[A-Za-z]+' },
                n = { b: '#<', e: '>' },
                i = [
                    e.C('#', '$', { c: [a] }),
                    e.C('^\\=begin', '^\\=end', { c: [a], r: 10 }),
                    e.C('^__END__', '\\n$')
                ],
                s = { cN: 'subst', b: '#\\{', e: '}', k: r },
                c = {
                    cN: 'string',
                    c: [e.BE, s],
                    v: [
                        { b: /'/, e: /'/ },
                        { b: /"/, e: /"/ },
                        { b: /`/, e: /`/ },
                        { b: '%[qQwWx]?\\(', e: '\\)' },
                        { b: '%[qQwWx]?\\[', e: '\\]' },
                        { b: '%[qQwWx]?{', e: '}' },
                        { b: '%[qQwWx]?<', e: '>' },
                        { b: '%[qQwWx]?/', e: '/' },
                        { b: '%[qQwWx]?%', e: '%' },
                        { b: '%[qQwWx]?-', e: '-' },
                        { b: '%[qQwWx]?\\|', e: '\\|' },
                        { b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ },
                        {
                            b: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
                            rB: !0,
                            c: [{ b: /<<[-~]?'?/ }, { b: /\w+/, endSameAsBegin: !0, c: [e.BE, s] }]
                        }
                    ]
                },
                o = { cN: 'params', b: '\\(', e: '\\)', endsParent: !0, k: r },
                l = [
                    c,
                    n,
                    {
                        cN: 'class',
                        bK: 'class module',
                        e: '$|;',
                        i: /=/,
                        c: [
                            e.inherit(e.TM, { b: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?' }),
                            { b: '<\\s*', c: [{ b: '(' + e.IR + '::)?' + e.IR }] }
                        ].concat(i)
                    },
                    { cN: 'function', bK: 'def', e: '$|;', c: [e.inherit(e.TM, { b: t }), o].concat(i) },
                    { b: e.IR + '::' },
                    { cN: 'symbol', b: e.UIR + '(\\!|\\?)?:', r: 0 },
                    { cN: 'symbol', b: ':(?!\\s)', c: [c, { b: t }], r: 0 },
                    {
                        cN: 'number',
                        b: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
                        r: 0
                    },
                    { b: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))' },
                    { cN: 'params', b: /\|/, e: /\|/, k: r },
                    {
                        b: '(' + e.RSR + '|unless)\\s*',
                        k: 'unless',
                        c: [
                            n,
                            {
                                cN: 'regexp',
                                c: [e.BE, s],
                                i: /\n/,
                                v: [
                                    { b: '/', e: '/[a-z]*' },
                                    { b: '%r{', e: '}[a-z]*' },
                                    { b: '%r\\(', e: '\\)[a-z]*' },
                                    { b: '%r!', e: '![a-z]*' },
                                    { b: '%r\\[', e: '\\][a-z]*' }
                                ]
                            }
                        ].concat(i),
                        r: 0
                    }
                ].concat(i);
            s.c = l;
            var u = [
                { b: /^\s*=>/, starts: { e: '$', c: (o.c = l) } },
                {
                    cN: 'meta',
                    b: '^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)',
                    starts: { e: '$', c: l }
                }
            ];
            return { aliases: ['rb', 'gemspec', 'podspec', 'thor', 'irb'], k: r, i: /\/\*/, c: i.concat(u).concat(l) };
        }),
        n.registerLanguage('shell', function(e) {
            return {
                aliases: ['console'],
                c: [{ cN: 'meta', b: '^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]', starts: { e: '$', sL: 'bash' } }]
            };
        }),
        n.registerLanguage('sql', function(e) {
            var t = e.C('--', '$');
            return {
                cI: !0,
                i: /[<>{}*]/,
                c: [
                    {
                        bK:
                            'begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with',
                        e: /;/,
                        eW: !0,
                        l: /[\w\.]+/,
                        k: {
                            keyword:
                                'as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek',
                            literal: 'true false null unknown',
                            built_in:
                                'array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varying void'
                        },
                        c: [
                            { cN: 'string', b: "'", e: "'", c: [e.BE, { b: "''" }] },
                            { cN: 'string', b: '"', e: '"', c: [e.BE, { b: '""' }] },
                            { cN: 'string', b: '`', e: '`', c: [e.BE] },
                            e.CNM,
                            e.CBCM,
                            t,
                            e.HCM
                        ]
                    },
                    e.CBCM,
                    t,
                    e.HCM
                ]
            };
        }),
        n.registerLanguage('yaml', function(e) {
            var t = 'true false yes no null',
                r = '^[ \\-]*',
                a = '[a-zA-Z_][\\w\\-]*',
                n = { cN: 'attr', v: [{ b: r + a + ':' }, { b: r + '"' + a + '":' }, { b: r + "'" + a + "':" }] },
                i = {
                    cN: 'string',
                    r: 0,
                    v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: /\S+/ }],
                    c: [e.BE, { cN: 'template-variable', v: [{ b: '{{', e: '}}' }, { b: '%{', e: '}' }] }]
                };
            return {
                cI: !0,
                aliases: ['yml', 'YAML', 'yaml'],
                c: [
                    n,
                    { cN: 'meta', b: '^---s*$', r: 10 },
                    { cN: 'string', b: '[\\|>] *$', rE: !0, c: i.c, e: n.v[0].b },
                    { b: '<%[%=-]?', e: '[%-]?%>', sL: 'ruby', eB: !0, eE: !0, r: 0 },
                    { cN: 'type', b: '!' + e.UIR },
                    { cN: 'type', b: '!!' + e.UIR },
                    { cN: 'meta', b: '&' + e.UIR + '$' },
                    { cN: 'meta', b: '\\*' + e.UIR + '$' },
                    { cN: 'bullet', b: '^ *-', r: 0 },
                    e.HCM,
                    { bK: t, k: { literal: t } },
                    e.CNM,
                    i
                ]
            };
        }),
        n
    );
});
