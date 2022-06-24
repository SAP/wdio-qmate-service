/*!
* SAP
* (c) Copyright 2015 SAP SE or an SAP affiliate company.
* Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@beautifier.io>
      https://beautifier.io/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@beautifier.io>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/

(function() {

    /* GENERATED_BUILD_OUTPUT */
    var legacy_beautify_js =
    /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
    /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
    /******/ 		}
    /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
    /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
    /******/ 		if(mode & 1) value = __webpack_require__(value);
    /******/ 		if(mode & 8) return value;
    /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /******/ 		var ns = Object.create(null);
    /******/ 		__webpack_require__.r(ns);
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    /******/ 		return ns;
    /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Beautifier = __webpack_require__(1).Beautifier,
      Options = __webpack_require__(5).Options;
    
    function js_beautify(js_source_text, options) {
      var beautifier = new Beautifier(js_source_text, options);
      return beautifier.beautify();
    }
    
    module.exports = js_beautify;
    module.exports.defaultOptions = function() {
      return new Options();
    };
    
    
    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Output = __webpack_require__(2).Output;
    var Token = __webpack_require__(3).Token;
    var acorn = __webpack_require__(4);
    var Options = __webpack_require__(5).Options;
    var Tokenizer = __webpack_require__(7).Tokenizer;
    var line_starters = __webpack_require__(7).line_starters;
    var positionable_operators = __webpack_require__(7).positionable_operators;
    var TOKEN = __webpack_require__(7).TOKEN;
    
    
    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }
    
    function ltrim(s) {
      return s.replace(/^\s+/g, '');
    }
    
    function generateMapFromStrings(list) {
      var result = {};
      for (var x = 0; x < list.length; x++) {
        // make the mapped names underscored instead of dash
        result[list[x].replace(/-/g, '_')] = list[x];
      }
      return result;
    }
    
    function reserved_word(token, word) {
      return token && token.type === TOKEN.RESERVED && token.text === word;
    }
    
    function reserved_array(token, words) {
      return token && token.type === TOKEN.RESERVED && in_array(token.text, words);
    }
    // Unsure of what they mean, but they work. Worth cleaning up in future.
    var special_words = ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async'];
    
    var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];
    
    // Generate map from array
    var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);
    
    var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];
    
    var MODE = {
      BlockStatement: 'BlockStatement', // 'BLOCK'
      Statement: 'Statement', // 'STATEMENT'
      ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
      ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
      ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
      Conditional: 'Conditional', //'(COND-EXPRESSION)',
      Expression: 'Expression' //'(EXPRESSION)'
    };
    
    function remove_redundant_indentation(output, frame) {
      // This implementation is effective but has some issues:
      //     - can cause line wrap to happen too soon due to indent removal
      //           after wrap points are calculated
      // These issues are minor compared to ugly indentation.
    
      if (frame.multiline_frame ||
        frame.mode === MODE.ForInitializer ||
        frame.mode === MODE.Conditional) {
        return;
      }
    
      // remove one indent from each line inside this section
      output.remove_indent(frame.start_line_index);
    }
    
    // we could use just string.split, but
    // IE doesn't like returning empty strings
    function split_linebreaks(s) {
      //return s.split(/\x0d\x0a|\x0a/);
    
      s = s.replace(acorn.allLineBreaks, '\n');
      var out = [],
        idx = s.indexOf("\n");
      while (idx !== -1) {
        out.push(s.substring(0, idx));
        s = s.substring(idx + 1);
        idx = s.indexOf("\n");
      }
      if (s.length) {
        out.push(s);
      }
      return out;
    }
    
    function is_array(mode) {
      return mode === MODE.ArrayLiteral;
    }
    
    function is_expression(mode) {
      return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }
    
    function all_lines_start_with(lines, c) {
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line.charAt(0) !== c) {
          return false;
        }
      }
      return true;
    }
    
    function each_line_matches_indent(lines, indent) {
      var i = 0,
        len = lines.length,
        line;
      for (; i < len; i++) {
        line = lines[i];
        // allow empty lines to pass through
        if (line && line.indexOf(indent) !== 0) {
          return false;
        }
      }
      return true;
    }
    
    
    function Beautifier(source_text, options) {
      options = options || {};
      this._source_text = source_text || '';
    
      this._output = null;
      this._tokens = null;
      this._last_last_text = null;
      this._flags = null;
      this._previous_flags = null;
    
      this._flag_store = null;
      this._options = new Options(options);
    }
    
    Beautifier.prototype.create_flags = function(flags_base, mode) {
      var next_indent_level = 0;
      if (flags_base) {
        next_indent_level = flags_base.indentation_level;
        if (!this._output.just_added_newline() &&
          flags_base.line_indent_level > next_indent_level) {
          next_indent_level = flags_base.line_indent_level;
        }
      }
    
      var next_flags = {
        mode: mode,
        parent: flags_base,
        last_token: flags_base ? flags_base.last_token : new Token(TOKEN.START_BLOCK, ''), // last token text
        last_word: flags_base ? flags_base.last_word : '', // last TOKEN.WORD passed
        declaration_statement: false,
        declaration_assignment: false,
        multiline_frame: false,
        inline_frame: false,
        if_block: false,
        else_block: false,
        do_block: false,
        do_while: false,
        import_block: false,
        in_case_statement: false, // switch(..){ INSIDE HERE }
        in_case: false, // we're on the exact line with "case 0:"
        case_body: false, // the indented case-action block
        indentation_level: next_indent_level,
        alignment: 0,
        line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
        start_line_index: this._output.get_line_number(),
        ternary_depth: 0
      };
      return next_flags;
    };
    
    Beautifier.prototype._reset = function(source_text) {
      var baseIndentString = source_text.match(/^[\t ]*/)[0];
    
      this._last_last_text = ''; // pre-last token text
      this._output = new Output(this._options, baseIndentString);
    
      // If testing the ignore directive, start with output disable set to true
      this._output.raw = this._options.test_output_raw;
    
    
      // Stack of parsing/formatting states, including MODE.
      // We tokenize, parse, and output in an almost purely a forward-only stream of token input
      // and formatted output.  This makes the beautifier less accurate than full parsers
      // but also far more tolerant of syntax errors.
      //
      // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
      // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
      // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
      // most full parsers would die, but the beautifier gracefully falls back to
      // MODE.BlockStatement and continues on.
      this._flag_store = [];
      this.set_mode(MODE.BlockStatement);
      var tokenizer = new Tokenizer(source_text, this._options);
      this._tokens = tokenizer.tokenize();
      return source_text;
    };
    
    Beautifier.prototype.beautify = function() {
      // if disabled, return the input unchanged.
      if (this._options.disabled) {
        return this._source_text;
      }
    
      var sweet_code;
      var source_text = this._reset(this._source_text);
    
      var eol = this._options.eol;
      if (this._options.eol === 'auto') {
        eol = '\n';
        if (source_text && acorn.lineBreak.test(source_text || '')) {
          eol = source_text.match(acorn.lineBreak)[0];
        }
      }
    
      var current_token = this._tokens.next();
      while (current_token) {
        this.handle_token(current_token);
    
        this._last_last_text = this._flags.last_token.text;
        this._flags.last_token = current_token;
    
        current_token = this._tokens.next();
      }
    
      sweet_code = this._output.get_code(eol);
    
      return sweet_code;
    };
    
    Beautifier.prototype.handle_token = function(current_token, preserve_statement_flags) {
      if (current_token.type === TOKEN.START_EXPR) {
        this.handle_start_expr(current_token);
      } else if (current_token.type === TOKEN.END_EXPR) {
        this.handle_end_expr(current_token);
      } else if (current_token.type === TOKEN.START_BLOCK) {
        this.handle_start_block(current_token);
      } else if (current_token.type === TOKEN.END_BLOCK) {
        this.handle_end_block(current_token);
      } else if (current_token.type === TOKEN.WORD) {
        this.handle_word(current_token);
      } else if (current_token.type === TOKEN.RESERVED) {
        this.handle_word(current_token);
      } else if (current_token.type === TOKEN.SEMICOLON) {
        this.handle_semicolon(current_token);
      } else if (current_token.type === TOKEN.STRING) {
        this.handle_string(current_token);
      } else if (current_token.type === TOKEN.EQUALS) {
        this.handle_equals(current_token);
      } else if (current_token.type === TOKEN.OPERATOR) {
        this.handle_operator(current_token);
      } else if (current_token.type === TOKEN.COMMA) {
        this.handle_comma(current_token);
      } else if (current_token.type === TOKEN.BLOCK_COMMENT) {
        this.handle_block_comment(current_token, preserve_statement_flags);
      } else if (current_token.type === TOKEN.COMMENT) {
        this.handle_comment(current_token, preserve_statement_flags);
      } else if (current_token.type === TOKEN.DOT) {
        this.handle_dot(current_token);
      } else if (current_token.type === TOKEN.EOF) {
        this.handle_eof(current_token);
      } else if (current_token.type === TOKEN.UNKNOWN) {
        this.handle_unknown(current_token, preserve_statement_flags);
      } else {
        this.handle_unknown(current_token, preserve_statement_flags);
      }
    };
    
    Beautifier.prototype.handle_whitespace_and_comments = function(current_token, preserve_statement_flags) {
      var newlines = current_token.newlines;
      var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);
    
      if (current_token.comments_before) {
        var comment_token = current_token.comments_before.next();
        while (comment_token) {
          // The cleanest handling of inline comments is to treat them as though they aren't there.
          // Just continue formatting and the behavior should be logical.
          // Also ignore unknown tokens.  Again, this should result in better behavior.
          this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
          this.handle_token(comment_token, preserve_statement_flags);
          comment_token = current_token.comments_before.next();
        }
      }
    
      if (keep_whitespace) {
        for (var i = 0; i < newlines; i += 1) {
          this.print_newline(i > 0, preserve_statement_flags);
        }
      } else {
        if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
          newlines = this._options.max_preserve_newlines;
        }
    
        if (this._options.preserve_newlines) {
          if (newlines > 1) {
            this.print_newline(false, preserve_statement_flags);
            for (var j = 1; j < newlines; j += 1) {
              this.print_newline(true, preserve_statement_flags);
            }
          }
        }
      }
    
    };
    
    var newline_restricted_tokens = ['async', 'break', 'continue', 'return', 'throw', 'yield'];
    
    Beautifier.prototype.allow_wrap_or_preserved_newline = function(current_token, force_linewrap) {
      force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;
    
      // Never wrap the first token on a line
      if (this._output.just_added_newline()) {
        return;
      }
    
      var shouldPreserveOrForce = (this._options.preserve_newlines && current_token.newlines) || force_linewrap;
      var operatorLogicApplies = in_array(this._flags.last_token.text, positionable_operators) ||
        in_array(current_token.text, positionable_operators);
    
      if (operatorLogicApplies) {
        var shouldPrintOperatorNewline = (
            in_array(this._flags.last_token.text, positionable_operators) &&
            in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
          ) ||
          in_array(current_token.text, positionable_operators);
        shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
      }
    
      if (shouldPreserveOrForce) {
        this.print_newline(false, true);
      } else if (this._options.wrap_line_length) {
        if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
          // These tokens should never have a newline inserted
          // between them and the following expression.
          return;
        }
        this._output.set_wrap_point();
      }
    };
    
    Beautifier.prototype.print_newline = function(force_newline, preserve_statement_flags) {
      if (!preserve_statement_flags) {
        if (this._flags.last_token.text !== ';' && this._flags.last_token.text !== ',' && this._flags.last_token.text !== '=' && (this._flags.last_token.type !== TOKEN.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) {
          var next_token = this._tokens.peek();
          while (this._flags.mode === MODE.Statement &&
            !(this._flags.if_block && reserved_word(next_token, 'else')) &&
            !this._flags.do_block) {
            this.restore_mode();
          }
        }
      }
    
      if (this._output.add_new_line(force_newline)) {
        this._flags.multiline_frame = true;
      }
    };
    
    Beautifier.prototype.print_token_line_indentation = function(current_token) {
      if (this._output.just_added_newline()) {
        if (this._options.keep_array_indentation &&
          current_token.newlines &&
          (current_token.text === '[' || is_array(this._flags.mode))) {
          this._output.current_line.set_indent(-1);
          this._output.current_line.push(current_token.whitespace_before);
          this._output.space_before_token = false;
        } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
          this._flags.line_indent_level = this._flags.indentation_level;
        }
      }
    };
    
    Beautifier.prototype.print_token = function(current_token) {
      if (this._output.raw) {
        this._output.add_raw_token(current_token);
        return;
      }
    
      if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN.COMMA &&
        this._output.just_added_newline()) {
        if (this._output.previous_line.last() === ',') {
          var popped = this._output.previous_line.pop();
          // if the comma was already at the start of the line,
          // pull back onto that line and reprint the indentation
          if (this._output.previous_line.is_empty()) {
            this._output.previous_line.push(popped);
            this._output.trim(true);
            this._output.current_line.pop();
            this._output.trim();
          }
    
          // add the comma in front of the next token
          this.print_token_line_indentation(current_token);
          this._output.add_token(',');
          this._output.space_before_token = true;
        }
      }
    
      this.print_token_line_indentation(current_token);
      this._output.non_breaking_space = true;
      this._output.add_token(current_token.text);
      if (this._output.previous_token_wrapped) {
        this._flags.multiline_frame = true;
      }
    };
    
    Beautifier.prototype.indent = function() {
      this._flags.indentation_level += 1;
      this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
    };
    
    Beautifier.prototype.deindent = function() {
      if (this._flags.indentation_level > 0 &&
        ((!this._flags.parent) || this._flags.indentation_level > this._flags.parent.indentation_level)) {
        this._flags.indentation_level -= 1;
        this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
      }
    };
    
    Beautifier.prototype.set_mode = function(mode) {
      if (this._flags) {
        this._flag_store.push(this._flags);
        this._previous_flags = this._flags;
      } else {
        this._previous_flags = this.create_flags(null, mode);
      }
    
      this._flags = this.create_flags(this._previous_flags, mode);
      this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
    };
    
    
    Beautifier.prototype.restore_mode = function() {
      if (this._flag_store.length > 0) {
        this._previous_flags = this._flags;
        this._flags = this._flag_store.pop();
        if (this._previous_flags.mode === MODE.Statement) {
          remove_redundant_indentation(this._output, this._previous_flags);
        }
        this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
      }
    };
    
    Beautifier.prototype.start_of_object_property = function() {
      return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (
        (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || (reserved_array(this._flags.last_token, ['get', 'set'])));
    };
    
    Beautifier.prototype.start_of_statement = function(current_token) {
      var start = false;
      start = start || reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD;
      start = start || reserved_word(this._flags.last_token, 'do');
      start = start || (!(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement)) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
      start = start || reserved_word(this._flags.last_token, 'else') &&
        !(reserved_word(current_token, 'if') && !current_token.comments_before);
      start = start || (this._flags.last_token.type === TOKEN.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional));
      start = start || (this._flags.last_token.type === TOKEN.WORD && this._flags.mode === MODE.BlockStatement &&
        !this._flags.in_case &&
        !(current_token.text === '--' || current_token.text === '++') &&
        this._last_last_text !== 'function' &&
        current_token.type !== TOKEN.WORD && current_token.type !== TOKEN.RESERVED);
      start = start || (this._flags.mode === MODE.ObjectLiteral && (
        (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || reserved_array(this._flags.last_token, ['get', 'set'])));
    
      if (start) {
        this.set_mode(MODE.Statement);
        this.indent();
    
        this.handle_whitespace_and_comments(current_token, true);
    
        // Issue #276:
        // If starting a new statement with [if, for, while, do], push to a new line.
        // if (a) if (b) if(c) d(); else e(); else f();
        if (!this.start_of_object_property()) {
          this.allow_wrap_or_preserved_newline(current_token,
            reserved_array(current_token, ['do', 'for', 'if', 'while']));
        }
        return true;
      }
      return false;
    };
    
    Beautifier.prototype.handle_start_expr = function(current_token) {
      // The conditional starts the statement if appropriate.
      if (!this.start_of_statement(current_token)) {
        this.handle_whitespace_and_comments(current_token);
      }
    
      var next_mode = MODE.Expression;
      if (current_token.text === '[') {
    
        if (this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === ')') {
          // this is array index specifier, break immediately
          // a[x], fn()[x]
          if (reserved_array(this._flags.last_token, line_starters)) {
            this._output.space_before_token = true;
          }
          this.print_token(current_token);
          this.set_mode(next_mode);
          this.indent();
          if (this._options.space_in_paren) {
            this._output.space_before_token = true;
          }
          return;
        }
    
        next_mode = MODE.ArrayLiteral;
        if (is_array(this._flags.mode)) {
          if (this._flags.last_token.text === '[' ||
            (this._flags.last_token.text === ',' && (this._last_last_text === ']' || this._last_last_text === '}'))) {
            // ], [ goes to new line
            // }, [ goes to new line
            if (!this._options.keep_array_indentation) {
              this.print_newline();
            }
          }
        }
    
        if (!in_array(this._flags.last_token.type, [TOKEN.START_EXPR, TOKEN.END_EXPR, TOKEN.WORD, TOKEN.OPERATOR])) {
          this._output.space_before_token = true;
        }
      } else {
        if (this._flags.last_token.type === TOKEN.RESERVED) {
          if (this._flags.last_token.text === 'for') {
            this._output.space_before_token = this._options.space_before_conditional;
            next_mode = MODE.ForInitializer;
          } else if (in_array(this._flags.last_token.text, ['if', 'while'])) {
            this._output.space_before_token = this._options.space_before_conditional;
            next_mode = MODE.Conditional;
          } else if (in_array(this._flags.last_word, ['await', 'async'])) {
            // Should be a space between await and an IIFE, or async and an arrow function
            this._output.space_before_token = true;
          } else if (this._flags.last_token.text === 'import' && current_token.whitespace_before === '') {
            this._output.space_before_token = false;
          } else if (in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === 'catch') {
            this._output.space_before_token = true;
          }
        } else if (this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
          // Support of this kind of newline preservation.
          // a = (b &&
          //     (c || d));
          if (!this.start_of_object_property()) {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else if (this._flags.last_token.type === TOKEN.WORD) {
          this._output.space_before_token = false;
    
          // function name() vs function name ()
          // function* name() vs function* name ()
          // async name() vs async name ()
          // In ES6, you can also define the method properties of an object
          // var obj = {a: function() {}}
          // It can be abbreviated
          // var obj = {a() {}}
          // var obj = { a() {}} vs var obj = { a () {}}
          // var obj = { * a() {}} vs var obj = { * a () {}}
          var peek_back_two = this._tokens.peek(-3);
          if (this._options.space_after_named_function && peek_back_two) {
            // peek starts at next character so -1 is current token
            var peek_back_three = this._tokens.peek(-4);
            if (reserved_array(peek_back_two, ['async', 'function']) ||
              (peek_back_two.text === '*' && reserved_array(peek_back_three, ['async', 'function']))) {
              this._output.space_before_token = true;
            } else if (this._flags.mode === MODE.ObjectLiteral) {
              if ((peek_back_two.text === '{' || peek_back_two.text === ',') ||
                (peek_back_two.text === '*' && (peek_back_three.text === '{' || peek_back_three.text === ','))) {
                this._output.space_before_token = true;
              }
            }
          }
        } else {
          // Support preserving wrapped arrow function expressions
          // a.b('c',
          //     () => d.e
          // )
          this.allow_wrap_or_preserved_newline(current_token);
        }
    
        // function() vs function ()
        // yield*() vs yield* ()
        // function*() vs function* ()
        if ((this._flags.last_token.type === TOKEN.RESERVED && (this._flags.last_word === 'function' || this._flags.last_word === 'typeof')) ||
          (this._flags.last_token.text === '*' &&
            (in_array(this._last_last_text, ['function', 'yield']) ||
              (this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))))) {
          this._output.space_before_token = this._options.space_after_anon_function;
        }
      }
    
      if (this._flags.last_token.text === ';' || this._flags.last_token.type === TOKEN.START_BLOCK) {
        this.print_newline();
      } else if (this._flags.last_token.type === TOKEN.END_EXPR || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.END_BLOCK || this._flags.last_token.text === '.' || this._flags.last_token.type === TOKEN.COMMA) {
        // do nothing on (( and )( and ][ and ]( and .(
        // TODO: Consider whether forcing this is required.  Review failing tests when removed.
        this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
      }
    
      this.print_token(current_token);
      this.set_mode(next_mode);
      if (this._options.space_in_paren) {
        this._output.space_before_token = true;
      }
    
      // In all cases, if we newline while inside an expression it should be indented.
      this.indent();
    };
    
    Beautifier.prototype.handle_end_expr = function(current_token) {
      // statements inside expressions are not valid syntax, but...
      // statements must all be closed when their container closes
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
    
      this.handle_whitespace_and_comments(current_token);
    
      if (this._flags.multiline_frame) {
        this.allow_wrap_or_preserved_newline(current_token,
          current_token.text === ']' && is_array(this._flags.mode) && !this._options.keep_array_indentation);
      }
    
      if (this._options.space_in_paren) {
        if (this._flags.last_token.type === TOKEN.START_EXPR && !this._options.space_in_empty_paren) {
          // () [] no inner space in empty parens like these, ever, ref #320
          this._output.trim();
          this._output.space_before_token = false;
        } else {
          this._output.space_before_token = true;
        }
      }
      this.deindent();
      this.print_token(current_token);
      this.restore_mode();
    
      remove_redundant_indentation(this._output, this._previous_flags);
    
      // do {} while () // no statement required after
      if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
        this._previous_flags.mode = MODE.Expression;
        this._flags.do_block = false;
        this._flags.do_while = false;
    
      }
    };
    
    Beautifier.prototype.handle_start_block = function(current_token) {
      this.handle_whitespace_and_comments(current_token);
    
      // Check if this is should be treated as a ObjectLiteral
      var next_token = this._tokens.peek();
      var second_token = this._tokens.peek(1);
      if (this._flags.last_word === 'switch' && this._flags.last_token.type === TOKEN.END_EXPR) {
        this.set_mode(MODE.BlockStatement);
        this._flags.in_case_statement = true;
      } else if (this._flags.case_body) {
        this.set_mode(MODE.BlockStatement);
      } else if (second_token && (
          (in_array(second_token.text, [':', ',']) && in_array(next_token.type, [TOKEN.STRING, TOKEN.WORD, TOKEN.RESERVED])) ||
          (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, [TOKEN.WORD, TOKEN.RESERVED]))
        )) {
        // We don't support TypeScript,but we didn't break it for a very long time.
        // We'll try to keep not breaking it.
        if (!in_array(this._last_last_text, ['class', 'interface'])) {
          this.set_mode(MODE.ObjectLiteral);
        } else {
          this.set_mode(MODE.BlockStatement);
        }
      } else if (this._flags.last_token.type === TOKEN.OPERATOR && this._flags.last_token.text === '=>') {
        // arrow function: (param1, paramN) => { statements }
        this.set_mode(MODE.BlockStatement);
      } else if (in_array(this._flags.last_token.type, [TOKEN.EQUALS, TOKEN.START_EXPR, TOKEN.COMMA, TOKEN.OPERATOR]) ||
        reserved_array(this._flags.last_token, ['return', 'throw', 'import', 'default'])
      ) {
        // Detecting shorthand function syntax is difficult by scanning forward,
        //     so check the surrounding context.
        // If the block is being returned, imported, export default, passed as arg,
        //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
        this.set_mode(MODE.ObjectLiteral);
      } else {
        this.set_mode(MODE.BlockStatement);
      }
    
      var empty_braces = !next_token.comments_before && next_token.text === '}';
      var empty_anonymous_function = empty_braces && this._flags.last_word === 'function' &&
        this._flags.last_token.type === TOKEN.END_EXPR;
    
      if (this._options.brace_preserve_inline) // check for inline, set inline_frame if so
      {
        // search forward for a newline wanted inside this block
        var index = 0;
        var check_token = null;
        this._flags.inline_frame = true;
        do {
          index += 1;
          check_token = this._tokens.peek(index - 1);
          if (check_token.newlines) {
            this._flags.inline_frame = false;
            break;
          }
        } while (check_token.type !== TOKEN.EOF &&
          !(check_token.type === TOKEN.END_BLOCK && check_token.opened === current_token));
      }
    
      if ((this._options.brace_style === "expand" ||
          (this._options.brace_style === "none" && current_token.newlines)) &&
        !this._flags.inline_frame) {
        if (this._flags.last_token.type !== TOKEN.OPERATOR &&
          (empty_anonymous_function ||
            this._flags.last_token.type === TOKEN.EQUALS ||
            (reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== 'else'))) {
          this._output.space_before_token = true;
        } else {
          this.print_newline(false, true);
        }
      } else { // collapse || inline_frame
        if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.COMMA)) {
          if (this._flags.last_token.type === TOKEN.COMMA || this._options.space_in_paren) {
            this._output.space_before_token = true;
          }
    
          if (this._flags.last_token.type === TOKEN.COMMA || (this._flags.last_token.type === TOKEN.START_EXPR && this._flags.inline_frame)) {
            this.allow_wrap_or_preserved_newline(current_token);
            this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
            this._flags.multiline_frame = false;
          }
        }
        if (this._flags.last_token.type !== TOKEN.OPERATOR && this._flags.last_token.type !== TOKEN.START_EXPR) {
          if (this._flags.last_token.type === TOKEN.START_BLOCK && !this._flags.inline_frame) {
            this.print_newline();
          } else {
            this._output.space_before_token = true;
          }
        }
      }
      this.print_token(current_token);
      this.indent();
    
      // Except for specific cases, open braces are followed by a new line.
      if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
        this.print_newline();
      }
    };
    
    Beautifier.prototype.handle_end_block = function(current_token) {
      // statements must all be closed when their container closes
      this.handle_whitespace_and_comments(current_token);
    
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
    
      var empty_braces = this._flags.last_token.type === TOKEN.START_BLOCK;
    
      if (this._flags.inline_frame && !empty_braces) { // try inline_frame (only set if this._options.braces-preserve-inline) first
        this._output.space_before_token = true;
      } else if (this._options.brace_style === "expand") {
        if (!empty_braces) {
          this.print_newline();
        }
      } else {
        // skip {}
        if (!empty_braces) {
          if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
            // we REALLY need a newline here, but newliner would skip that
            this._options.keep_array_indentation = false;
            this.print_newline();
            this._options.keep_array_indentation = true;
    
          } else {
            this.print_newline();
          }
        }
      }
      this.restore_mode();
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_word = function(current_token) {
      if (current_token.type === TOKEN.RESERVED) {
        if (in_array(current_token.text, ['set', 'get']) && this._flags.mode !== MODE.ObjectLiteral) {
          current_token.type = TOKEN.WORD;
        } else if (current_token.text === 'import' && this._tokens.peek().text === '(') {
          current_token.type = TOKEN.WORD;
        } else if (in_array(current_token.text, ['as', 'from']) && !this._flags.import_block) {
          current_token.type = TOKEN.WORD;
        } else if (this._flags.mode === MODE.ObjectLiteral) {
          var next_token = this._tokens.peek();
          if (next_token.text === ':') {
            current_token.type = TOKEN.WORD;
          }
        }
      }
    
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        if (reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD) {
          this._flags.declaration_statement = true;
        }
      } else if (current_token.newlines && !is_expression(this._flags.mode) &&
        (this._flags.last_token.type !== TOKEN.OPERATOR || (this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) &&
        this._flags.last_token.type !== TOKEN.EQUALS &&
        (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ['var', 'let', 'const', 'set', 'get']))) {
        this.handle_whitespace_and_comments(current_token);
        this.print_newline();
      } else {
        this.handle_whitespace_and_comments(current_token);
      }
    
      if (this._flags.do_block && !this._flags.do_while) {
        if (reserved_word(current_token, 'while')) {
          // do {} ## while ()
          this._output.space_before_token = true;
          this.print_token(current_token);
          this._output.space_before_token = true;
          this._flags.do_while = true;
          return;
        } else {
          // do {} should always have while as the next word.
          // if we don't see the expected while, recover
          this.print_newline();
          this._flags.do_block = false;
        }
      }
    
      // if may be followed by else, or not
      // Bare/inline ifs are tricky
      // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
      if (this._flags.if_block) {
        if (!this._flags.else_block && reserved_word(current_token, 'else')) {
          this._flags.else_block = true;
        } else {
          while (this._flags.mode === MODE.Statement) {
            this.restore_mode();
          }
          this._flags.if_block = false;
          this._flags.else_block = false;
        }
      }
    
      if (this._flags.in_case_statement && reserved_array(current_token, ['case', 'default'])) {
        this.print_newline();
        if (this._flags.last_token.type !== TOKEN.END_BLOCK && (this._flags.case_body || this._options.jslint_happy)) {
          // switch cases following one another
          this.deindent();
        }
        this._flags.case_body = false;
    
        this.print_token(current_token);
        this._flags.in_case = true;
        return;
      }
    
      if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
        if (!this.start_of_object_property()) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
      }
    
      if (reserved_word(current_token, 'function')) {
        if (in_array(this._flags.last_token.text, ['}', ';']) ||
          (this._output.just_added_newline() && !(in_array(this._flags.last_token.text, ['(', '[', '{', ':', '=', ',']) || this._flags.last_token.type === TOKEN.OPERATOR))) {
          // make sure there is a nice clean space of at least one blank line
          // before a new function definition
          if (!this._output.just_added_blankline() && !current_token.comments_before) {
            this.print_newline();
            this.print_newline(true);
          }
        }
        if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD) {
          if (reserved_array(this._flags.last_token, ['get', 'set', 'new', 'export']) ||
            reserved_array(this._flags.last_token, newline_restricted_tokens)) {
            this._output.space_before_token = true;
          } else if (reserved_word(this._flags.last_token, 'default') && this._last_last_text === 'export') {
            this._output.space_before_token = true;
          } else if (this._flags.last_token.text === 'declare') {
            // accomodates Typescript declare function formatting
            this._output.space_before_token = true;
          } else {
            this.print_newline();
          }
        } else if (this._flags.last_token.type === TOKEN.OPERATOR || this._flags.last_token.text === '=') {
          // foo = function
          this._output.space_before_token = true;
        } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode))) {
          // (function
        } else {
          this.print_newline();
        }
    
        this.print_token(current_token);
        this._flags.last_word = current_token.text;
        return;
      }
    
      var prefix = 'NONE';
    
      if (this._flags.last_token.type === TOKEN.END_BLOCK) {
    
        if (this._previous_flags.inline_frame) {
          prefix = 'SPACE';
        } else if (!reserved_array(current_token, ['else', 'catch', 'finally', 'from'])) {
          prefix = 'NEWLINE';
        } else {
          if (this._options.brace_style === "expand" ||
            this._options.brace_style === "end-expand" ||
            (this._options.brace_style === "none" && current_token.newlines)) {
            prefix = 'NEWLINE';
          } else {
            prefix = 'SPACE';
            this._output.space_before_token = true;
          }
        }
      } else if (this._flags.last_token.type === TOKEN.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
        // TODO: Should this be for STATEMENT as well?
        prefix = 'NEWLINE';
      } else if (this._flags.last_token.type === TOKEN.SEMICOLON && is_expression(this._flags.mode)) {
        prefix = 'SPACE';
      } else if (this._flags.last_token.type === TOKEN.STRING) {
        prefix = 'NEWLINE';
      } else if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD ||
        (this._flags.last_token.text === '*' &&
          (in_array(this._last_last_text, ['function', 'yield']) ||
            (this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))))) {
        prefix = 'SPACE';
      } else if (this._flags.last_token.type === TOKEN.START_BLOCK) {
        if (this._flags.inline_frame) {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
      } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
        this._output.space_before_token = true;
        prefix = 'NEWLINE';
      }
    
      if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
        if (this._flags.inline_frame || this._flags.last_token.text === 'else' || this._flags.last_token.text === 'export') {
          prefix = 'SPACE';
        } else {
          prefix = 'NEWLINE';
        }
    
      }
    
      if (reserved_array(current_token, ['else', 'catch', 'finally'])) {
        if ((!(this._flags.last_token.type === TOKEN.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) ||
            this._options.brace_style === "expand" ||
            this._options.brace_style === "end-expand" ||
            (this._options.brace_style === "none" && current_token.newlines)) &&
          !this._flags.inline_frame) {
          this.print_newline();
        } else {
          this._output.trim(true);
          var line = this._output.current_line;
          // If we trimmed and there's something other than a close block before us
          // put a newline back in.  Handles '} // comment' scenario.
          if (line.last() !== '}') {
            this.print_newline();
          }
          this._output.space_before_token = true;
        }
      } else if (prefix === 'NEWLINE') {
        if (reserved_array(this._flags.last_token, special_words)) {
          // no newline between 'return nnn'
          this._output.space_before_token = true;
        } else if (this._flags.last_token.text === 'declare' && reserved_array(current_token, ['var', 'let', 'const'])) {
          // accomodates Typescript declare formatting
          this._output.space_before_token = true;
        } else if (this._flags.last_token.type !== TOKEN.END_EXPR) {
          if ((this._flags.last_token.type !== TOKEN.START_EXPR || !reserved_array(current_token, ['var', 'let', 'const'])) && this._flags.last_token.text !== ':') {
            // no need to force newline on 'var': for (var x = 0...)
            if (reserved_word(current_token, 'if') && reserved_word(current_token.previous, 'else')) {
              // no newline for } else if {
              this._output.space_before_token = true;
            } else {
              this.print_newline();
            }
          }
        } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
          this.print_newline();
        }
      } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === ',' && this._last_last_text === '}') {
        this.print_newline(); // }, in lists get a newline treatment
      } else if (prefix === 'SPACE') {
        this._output.space_before_token = true;
      }
      if (current_token.previous && (current_token.previous.type === TOKEN.WORD || current_token.previous.type === TOKEN.RESERVED)) {
        this._output.space_before_token = true;
      }
      this.print_token(current_token);
      this._flags.last_word = current_token.text;
    
      if (current_token.type === TOKEN.RESERVED) {
        if (current_token.text === 'do') {
          this._flags.do_block = true;
        } else if (current_token.text === 'if') {
          this._flags.if_block = true;
        } else if (current_token.text === 'import') {
          this._flags.import_block = true;
        } else if (this._flags.import_block && reserved_word(current_token, 'from')) {
          this._flags.import_block = false;
        }
      }
    };
    
    Beautifier.prototype.handle_semicolon = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        // Semicolon can be the start (and end) of a statement
        this._output.space_before_token = false;
      } else {
        this.handle_whitespace_and_comments(current_token);
      }
    
      var next_token = this._tokens.peek();
      while (this._flags.mode === MODE.Statement &&
        !(this._flags.if_block && reserved_word(next_token, 'else')) &&
        !this._flags.do_block) {
        this.restore_mode();
      }
    
      // hacky but effective for the moment
      if (this._flags.import_block) {
        this._flags.import_block = false;
      }
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_string = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
        // One difference - strings want at least a space before
        this._output.space_before_token = true;
      } else {
        this.handle_whitespace_and_comments(current_token);
        if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.inline_frame) {
          this._output.space_before_token = true;
        } else if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
          if (!this.start_of_object_property()) {
            this.allow_wrap_or_preserved_newline(current_token);
          }
        } else {
          this.print_newline();
        }
      }
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_equals = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
      } else {
        this.handle_whitespace_and_comments(current_token);
      }
    
      if (this._flags.declaration_statement) {
        // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
        this._flags.declaration_assignment = true;
      }
      this._output.space_before_token = true;
      this.print_token(current_token);
      this._output.space_before_token = true;
    };
    
    Beautifier.prototype.handle_comma = function(current_token) {
      this.handle_whitespace_and_comments(current_token, true);
    
      this.print_token(current_token);
      this._output.space_before_token = true;
      if (this._flags.declaration_statement) {
        if (is_expression(this._flags.parent.mode)) {
          // do not break on comma, for(var a = 1, b = 2)
          this._flags.declaration_assignment = false;
        }
    
        if (this._flags.declaration_assignment) {
          this._flags.declaration_assignment = false;
          this.print_newline(false, true);
        } else if (this._options.comma_first) {
          // for comma-first, we want to allow a newline before the comma
          // to turn into a newline after the comma, which we will fixup later
          this.allow_wrap_or_preserved_newline(current_token);
        }
      } else if (this._flags.mode === MODE.ObjectLiteral ||
        (this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral)) {
        if (this._flags.mode === MODE.Statement) {
          this.restore_mode();
        }
    
        if (!this._flags.inline_frame) {
          this.print_newline();
        }
      } else if (this._options.comma_first) {
        // EXPR or DO_BLOCK
        // for comma-first, we want to allow a newline before the comma
        // to turn into a newline after the comma, which we will fixup later
        this.allow_wrap_or_preserved_newline(current_token);
      }
    };
    
    Beautifier.prototype.handle_operator = function(current_token) {
      var isGeneratorAsterisk = current_token.text === '*' &&
        (reserved_array(this._flags.last_token, ['function', 'yield']) ||
          (in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.COMMA, TOKEN.END_BLOCK, TOKEN.SEMICOLON]))
        );
      var isUnary = in_array(current_token.text, ['-', '+']) && (
        in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.START_EXPR, TOKEN.EQUALS, TOKEN.OPERATOR]) ||
        in_array(this._flags.last_token.text, line_starters) ||
        this._flags.last_token.text === ','
      );
    
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
      } else {
        var preserve_statement_flags = !isGeneratorAsterisk;
        this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
      }
    
      if (reserved_array(this._flags.last_token, special_words)) {
        // "return" had a special handling in TK_WORD. Now we need to return the favor
        this._output.space_before_token = true;
        this.print_token(current_token);
        return;
      }
    
      // hack for actionscript's import .*;
      if (current_token.text === '*' && this._flags.last_token.type === TOKEN.DOT) {
        this.print_token(current_token);
        return;
      }
    
      if (current_token.text === '::') {
        // no spaces around exotic namespacing syntax operator
        this.print_token(current_token);
        return;
      }
    
      // Allow line wrapping between operators when operator_position is
      //   set to before or preserve
      if (this._flags.last_token.type === TOKEN.OPERATOR && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
        this.allow_wrap_or_preserved_newline(current_token);
      }
    
      if (current_token.text === ':' && this._flags.in_case) {
        this.print_token(current_token);
    
        this._flags.in_case = false;
        this._flags.case_body = true;
        if (this._tokens.peek().type !== TOKEN.START_BLOCK) {
          this.indent();
          this.print_newline();
        } else {
          this._output.space_before_token = true;
        }
        return;
      }
    
      var space_before = true;
      var space_after = true;
      var in_ternary = false;
      if (current_token.text === ':') {
        if (this._flags.ternary_depth === 0) {
          // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
          space_before = false;
        } else {
          this._flags.ternary_depth -= 1;
          in_ternary = true;
        }
      } else if (current_token.text === '?') {
        this._flags.ternary_depth += 1;
      }
    
      // let's handle the operator_position option prior to any conflicting logic
      if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array(current_token.text, positionable_operators)) {
        var isColon = current_token.text === ':';
        var isTernaryColon = (isColon && in_ternary);
        var isOtherColon = (isColon && !in_ternary);
    
        switch (this._options.operator_position) {
          case OPERATOR_POSITION.before_newline:
            // if the current token is : and it's not a ternary statement then we set space_before to false
            this._output.space_before_token = !isOtherColon;
    
            this.print_token(current_token);
    
            if (!isColon || isTernaryColon) {
              this.allow_wrap_or_preserved_newline(current_token);
            }
    
            this._output.space_before_token = true;
            return;
    
          case OPERATOR_POSITION.after_newline:
            // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
            //   then print a newline.
    
            this._output.space_before_token = true;
    
            if (!isColon || isTernaryColon) {
              if (this._tokens.peek().newlines) {
                this.print_newline(false, true);
              } else {
                this.allow_wrap_or_preserved_newline(current_token);
              }
            } else {
              this._output.space_before_token = false;
            }
    
            this.print_token(current_token);
    
            this._output.space_before_token = true;
            return;
    
          case OPERATOR_POSITION.preserve_newline:
            if (!isOtherColon) {
              this.allow_wrap_or_preserved_newline(current_token);
            }
    
            // if we just added a newline, or the current token is : and it's not a ternary statement,
            //   then we set space_before to false
            space_before = !(this._output.just_added_newline() || isOtherColon);
    
            this._output.space_before_token = space_before;
            this.print_token(current_token);
            this._output.space_before_token = true;
            return;
        }
      }
    
      if (isGeneratorAsterisk) {
        this.allow_wrap_or_preserved_newline(current_token);
        space_before = false;
        var next_token = this._tokens.peek();
        space_after = next_token && in_array(next_token.type, [TOKEN.WORD, TOKEN.RESERVED]);
      } else if (current_token.text === '...') {
        this.allow_wrap_or_preserved_newline(current_token);
        space_before = this._flags.last_token.type === TOKEN.START_BLOCK;
        space_after = false;
      } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
        // unary operators (and binary +/- pretending to be unary) special cases
        if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR) {
          this.allow_wrap_or_preserved_newline(current_token);
        }
    
        space_before = false;
        space_after = false;
    
        // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
        // if there is a newline between -- or ++ and anything else we should preserve it.
        if (current_token.newlines && (current_token.text === '--' || current_token.text === '++')) {
          this.print_newline(false, true);
        }
    
        if (this._flags.last_token.text === ';' && is_expression(this._flags.mode)) {
          // for (;; ++i)
          //        ^^^
          space_before = true;
        }
    
        if (this._flags.last_token.type === TOKEN.RESERVED) {
          space_before = true;
        } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
          space_before = !(this._flags.last_token.text === ']' && (current_token.text === '--' || current_token.text === '++'));
        } else if (this._flags.last_token.type === TOKEN.OPERATOR) {
          // a++ + ++b;
          // a - -b
          space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(this._flags.last_token.text, ['--', '-', '++', '+']);
          // + and - are not unary when preceeded by -- or ++ operator
          // a-- + b
          // a * +b
          // a - -b
          if (in_array(current_token.text, ['+', '-']) && in_array(this._flags.last_token.text, ['--', '++'])) {
            space_after = true;
          }
        }
    
    
        if (((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame) || this._flags.mode === MODE.Statement) &&
          (this._flags.last_token.text === '{' || this._flags.last_token.text === ';')) {
          // { foo; --i }
          // foo(); --bar;
          this.print_newline();
        }
      }
    
      this._output.space_before_token = this._output.space_before_token || space_before;
      this.print_token(current_token);
      this._output.space_before_token = space_after;
    };
    
    Beautifier.prototype.handle_block_comment = function(current_token, preserve_statement_flags) {
      if (this._output.raw) {
        this._output.add_raw_token(current_token);
        if (current_token.directives && current_token.directives.preserve === 'end') {
          // If we're testing the raw output behavior, do not allow a directive to turn it off.
          this._output.raw = this._options.test_output_raw;
        }
        return;
      }
    
      if (current_token.directives) {
        this.print_newline(false, preserve_statement_flags);
        this.print_token(current_token);
        if (current_token.directives.preserve === 'start') {
          this._output.raw = true;
        }
        this.print_newline(false, true);
        return;
      }
    
      // inline block
      if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
        this._output.space_before_token = true;
        this.print_token(current_token);
        this._output.space_before_token = true;
        return;
      } else {
        this.print_block_commment(current_token, preserve_statement_flags);
      }
    };
    
    Beautifier.prototype.print_block_commment = function(current_token, preserve_statement_flags) {
      var lines = split_linebreaks(current_token.text);
      var j; // iterator for this case
      var javadoc = false;
      var starless = false;
      var lastIndent = current_token.whitespace_before;
      var lastIndentLength = lastIndent.length;
    
      // block comment starts with a new line
      this.print_newline(false, preserve_statement_flags);
    
      // first line always indented
      this.print_token_line_indentation(current_token);
      this._output.add_token(lines[0]);
      this.print_newline(false, preserve_statement_flags);
    
    
      if (lines.length > 1) {
        lines = lines.slice(1);
        javadoc = all_lines_start_with(lines, '*');
        starless = each_line_matches_indent(lines, lastIndent);
    
        if (javadoc) {
          this._flags.alignment = 1;
        }
    
        for (j = 0; j < lines.length; j++) {
          if (javadoc) {
            // javadoc: reformat and re-indent
            this.print_token_line_indentation(current_token);
            this._output.add_token(ltrim(lines[j]));
          } else if (starless && lines[j]) {
            // starless: re-indent non-empty content, avoiding trim
            this.print_token_line_indentation(current_token);
            this._output.add_token(lines[j].substring(lastIndentLength));
          } else {
            // normal comments output raw
            this._output.current_line.set_indent(-1);
            this._output.add_token(lines[j]);
          }
    
          // for comments on their own line or  more than one line, make sure there's a new line after
          this.print_newline(false, preserve_statement_flags);
        }
    
        this._flags.alignment = 0;
      }
    };
    
    
    Beautifier.prototype.handle_comment = function(current_token, preserve_statement_flags) {
      if (current_token.newlines) {
        this.print_newline(false, preserve_statement_flags);
      } else {
        this._output.trim(true);
      }
    
      this._output.space_before_token = true;
      this.print_token(current_token);
      this.print_newline(false, preserve_statement_flags);
    };
    
    Beautifier.prototype.handle_dot = function(current_token) {
      if (this.start_of_statement(current_token)) {
        // The conditional starts the statement if appropriate.
      } else {
        this.handle_whitespace_and_comments(current_token, true);
      }
    
      if (reserved_array(this._flags.last_token, special_words)) {
        this._output.space_before_token = false;
      } else {
        // allow preserved newlines before dots in general
        // force newlines on dots after close paren when break_chained - for bar().baz()
        this.allow_wrap_or_preserved_newline(current_token,
          this._flags.last_token.text === ')' && this._options.break_chained_methods);
      }
    
      // Only unindent chained method dot if this dot starts a new line.
      // Otherwise the automatic extra indentation removal will handle the over indent
      if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
        this.deindent();
      }
    
      this.print_token(current_token);
    };
    
    Beautifier.prototype.handle_unknown = function(current_token, preserve_statement_flags) {
      this.print_token(current_token);
    
      if (current_token.text[current_token.text.length - 1] === '\n') {
        this.print_newline(false, preserve_statement_flags);
      }
    };
    
    Beautifier.prototype.handle_eof = function(current_token) {
      // Unwind any open statements
      while (this._flags.mode === MODE.Statement) {
        this.restore_mode();
      }
      this.handle_whitespace_and_comments(current_token);
    };
    
    module.exports.Beautifier = Beautifier;
    
    
    /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function OutputLine(parent) {
      this.__parent = parent;
      this.__character_count = 0;
      // use indent_count as a marker for this.__lines that have preserved indentation
      this.__indent_count = -1;
      this.__alignment_count = 0;
      this.__wrap_point_index = 0;
      this.__wrap_point_character_count = 0;
      this.__wrap_point_indent_count = -1;
      this.__wrap_point_alignment_count = 0;
    
      this.__items = [];
    }
    
    OutputLine.prototype.clone_empty = function() {
      var line = new OutputLine(this.__parent);
      line.set_indent(this.__indent_count, this.__alignment_count);
      return line;
    };
    
    OutputLine.prototype.item = function(index) {
      if (index < 0) {
        return this.__items[this.__items.length + index];
      } else {
        return this.__items[index];
      }
    };
    
    OutputLine.prototype.has_match = function(pattern) {
      for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
        if (this.__items[lastCheckedOutput].match(pattern)) {
          return true;
        }
      }
      return false;
    };
    
    OutputLine.prototype.set_indent = function(indent, alignment) {
      if (this.is_empty()) {
        this.__indent_count = indent || 0;
        this.__alignment_count = alignment || 0;
        this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
      }
    };
    
    OutputLine.prototype._set_wrap_point = function() {
      if (this.__parent.wrap_line_length) {
        this.__wrap_point_index = this.__items.length;
        this.__wrap_point_character_count = this.__character_count;
        this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
        this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
      }
    };
    
    OutputLine.prototype._should_wrap = function() {
      return this.__wrap_point_index &&
        this.__character_count > this.__parent.wrap_line_length &&
        this.__wrap_point_character_count > this.__parent.next_line.__character_count;
    };
    
    OutputLine.prototype._allow_wrap = function() {
      if (this._should_wrap()) {
        this.__parent.add_new_line();
        var next = this.__parent.current_line;
        next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
        next.__items = this.__items.slice(this.__wrap_point_index);
        this.__items = this.__items.slice(0, this.__wrap_point_index);
    
        next.__character_count += this.__character_count - this.__wrap_point_character_count;
        this.__character_count = this.__wrap_point_character_count;
    
        if (next.__items[0] === " ") {
          next.__items.splice(0, 1);
          next.__character_count -= 1;
        }
        return true;
      }
      return false;
    };
    
    OutputLine.prototype.is_empty = function() {
      return this.__items.length === 0;
    };
    
    OutputLine.prototype.last = function() {
      if (!this.is_empty()) {
        return this.__items[this.__items.length - 1];
      } else {
        return null;
      }
    };
    
    OutputLine.prototype.push = function(item) {
      this.__items.push(item);
      var last_newline_index = item.lastIndexOf('\n');
      if (last_newline_index !== -1) {
        this.__character_count = item.length - last_newline_index;
      } else {
        this.__character_count += item.length;
      }
    };
    
    OutputLine.prototype.pop = function() {
      var item = null;
      if (!this.is_empty()) {
        item = this.__items.pop();
        this.__character_count -= item.length;
      }
      return item;
    };
    
    
    OutputLine.prototype._remove_indent = function() {
      if (this.__indent_count > 0) {
        this.__indent_count -= 1;
        this.__character_count -= this.__parent.indent_size;
      }
    };
    
    OutputLine.prototype._remove_wrap_indent = function() {
      if (this.__wrap_point_indent_count > 0) {
        this.__wrap_point_indent_count -= 1;
      }
    };
    OutputLine.prototype.trim = function() {
      while (this.last() === ' ') {
        this.__items.pop();
        this.__character_count -= 1;
      }
    };
    
    OutputLine.prototype.toString = function() {
      var result = '';
      if (this.is_empty()) {
        if (this.__parent.indent_empty_lines) {
          result = this.__parent.get_indent_string(this.__indent_count);
        }
      } else {
        result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
        result += this.__items.join('');
      }
      return result;
    };
    
    function IndentStringCache(options, baseIndentString) {
      this.__cache = [''];
      this.__indent_size = options.indent_size;
      this.__indent_string = options.indent_char;
      if (!options.indent_with_tabs) {
        this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
      }
    
      // Set to null to continue support for auto detection of base indent
      baseIndentString = baseIndentString || '';
      if (options.indent_level > 0) {
        baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
      }
    
      this.__base_string = baseIndentString;
      this.__base_string_length = baseIndentString.length;
    }
    
    IndentStringCache.prototype.get_indent_size = function(indent, column) {
      var result = this.__base_string_length;
      column = column || 0;
      if (indent < 0) {
        result = 0;
      }
      result += indent * this.__indent_size;
      result += column;
      return result;
    };
    
    IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
      var result = this.__base_string;
      column = column || 0;
      if (indent_level < 0) {
        indent_level = 0;
        result = '';
      }
      column += indent_level * this.__indent_size;
      this.__ensure_cache(column);
      result += this.__cache[column];
      return result;
    };
    
    IndentStringCache.prototype.__ensure_cache = function(column) {
      while (column >= this.__cache.length) {
        this.__add_column();
      }
    };
    
    IndentStringCache.prototype.__add_column = function() {
      var column = this.__cache.length;
      var indent = 0;
      var result = '';
      if (this.__indent_size && column >= this.__indent_size) {
        indent = Math.floor(column / this.__indent_size);
        column -= indent * this.__indent_size;
        result = new Array(indent + 1).join(this.__indent_string);
      }
      if (column) {
        result += new Array(column + 1).join(' ');
      }
    
      this.__cache.push(result);
    };
    
    function Output(options, baseIndentString) {
      this.__indent_cache = new IndentStringCache(options, baseIndentString);
      this.raw = false;
      this._end_with_newline = options.end_with_newline;
      this.indent_size = options.indent_size;
      this.wrap_line_length = options.wrap_line_length;
      this.indent_empty_lines = options.indent_empty_lines;
      this.__lines = [];
      this.previous_line = null;
      this.current_line = null;
      this.next_line = new OutputLine(this);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
      // initialize
      this.__add_outputline();
    }
    
    Output.prototype.__add_outputline = function() {
      this.previous_line = this.current_line;
      this.current_line = this.next_line.clone_empty();
      this.__lines.push(this.current_line);
    };
    
    Output.prototype.get_line_number = function() {
      return this.__lines.length;
    };
    
    Output.prototype.get_indent_string = function(indent, column) {
      return this.__indent_cache.get_indent_string(indent, column);
    };
    
    Output.prototype.get_indent_size = function(indent, column) {
      return this.__indent_cache.get_indent_size(indent, column);
    };
    
    Output.prototype.is_empty = function() {
      return !this.previous_line && this.current_line.is_empty();
    };
    
    Output.prototype.add_new_line = function(force_newline) {
      // never newline at the start of file
      // otherwise, newline only if we didn't just add one or we're forced
      if (this.is_empty() ||
        (!force_newline && this.just_added_newline())) {
        return false;
      }
    
      // if raw output is enabled, don't print additional newlines,
      // but still return True as though you had
      if (!this.raw) {
        this.__add_outputline();
      }
      return true;
    };
    
    Output.prototype.get_code = function(eol) {
      this.trim(true);
    
      // handle some edge cases where the last tokens
      // has text that ends with newline(s)
      var last_item = this.current_line.pop();
      if (last_item) {
        if (last_item[last_item.length - 1] === '\n') {
          last_item = last_item.replace(/\n+$/g, '');
        }
        this.current_line.push(last_item);
      }
    
      if (this._end_with_newline) {
        this.__add_outputline();
      }
    
      var sweet_code = this.__lines.join('\n');
    
      if (eol !== '\n') {
        sweet_code = sweet_code.replace(/[\n]/g, eol);
      }
      return sweet_code;
    };
    
    Output.prototype.set_wrap_point = function() {
      this.current_line._set_wrap_point();
    };
    
    Output.prototype.set_indent = function(indent, alignment) {
      indent = indent || 0;
      alignment = alignment || 0;
    
      // Next line stores alignment values
      this.next_line.set_indent(indent, alignment);
    
      // Never indent your first output indent at the start of the file
      if (this.__lines.length > 1) {
        this.current_line.set_indent(indent, alignment);
        return true;
      }
    
      this.current_line.set_indent();
      return false;
    };
    
    Output.prototype.add_raw_token = function(token) {
      for (var x = 0; x < token.newlines; x++) {
        this.__add_outputline();
      }
      this.current_line.set_indent(-1);
      this.current_line.push(token.whitespace_before);
      this.current_line.push(token.text);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = false;
    };
    
    Output.prototype.add_token = function(printable_token) {
      this.__add_space_before_token();
      this.current_line.push(printable_token);
      this.space_before_token = false;
      this.non_breaking_space = false;
      this.previous_token_wrapped = this.current_line._allow_wrap();
    };
    
    Output.prototype.__add_space_before_token = function() {
      if (this.space_before_token && !this.just_added_newline()) {
        if (!this.non_breaking_space) {
          this.set_wrap_point();
        }
        this.current_line.push(' ');
      }
    };
    
    Output.prototype.remove_indent = function(index) {
      var output_length = this.__lines.length;
      while (index < output_length) {
        this.__lines[index]._remove_indent();
        index++;
      }
      this.current_line._remove_wrap_indent();
    };
    
    Output.prototype.trim = function(eat_newlines) {
      eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;
    
      this.current_line.trim();
    
      while (eat_newlines && this.__lines.length > 1 &&
        this.current_line.is_empty()) {
        this.__lines.pop();
        this.current_line = this.__lines[this.__lines.length - 1];
        this.current_line.trim();
      }
    
      this.previous_line = this.__lines.length > 1 ?
        this.__lines[this.__lines.length - 2] : null;
    };
    
    Output.prototype.just_added_newline = function() {
      return this.current_line.is_empty();
    };
    
    Output.prototype.just_added_blankline = function() {
      return this.is_empty() ||
        (this.current_line.is_empty() && this.previous_line.is_empty());
    };
    
    Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
      var index = this.__lines.length - 2;
      while (index >= 0) {
        var potentialEmptyLine = this.__lines[index];
        if (potentialEmptyLine.is_empty()) {
          break;
        } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 &&
          potentialEmptyLine.item(-1) !== ends_with) {
          this.__lines.splice(index + 1, 0, new OutputLine(this));
          this.previous_line = this.__lines[this.__lines.length - 2];
          break;
        }
        index--;
      }
    };
    
    module.exports.Output = Output;
    
    
    /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Token(type, text, newlines, whitespace_before) {
      this.type = type;
      this.text = text;
    
      // comments_before are
      // comments that have a new line before them
      // and may or may not have a newline after
      // this is a set of comments before
      this.comments_before = null; /* inline comment*/
    
    
      // this.comments_after =  new TokenStream(); // no new line before and newline after
      this.newlines = newlines || 0;
      this.whitespace_before = whitespace_before || '';
      this.parent = null;
      this.next = null;
      this.previous = null;
      this.opened = null;
      this.closed = null;
      this.directives = null;
    }
    
    
    module.exports.Token = Token;
    
    
    /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /* jshint node: true, curly: false */
    // Parts of this section of code is taken from acorn.
    //
    // Acorn was written by Marijn Haverbeke and released under an MIT
    // license. The Unicode regexps (for identifiers and whitespace) were
    // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
    //
    // Git repositories for Acorn are available at
    //
    //     http://marijnhaverbeke.nl/git/acorn
    //     https://github.com/marijnh/acorn.git
    
    // ## Character categories
    
    
    
    
    // acorn used char codes to squeeze the last bit of performance out
    // Beautifier is okay without that, so we're using regex
    // permit # (23), $ (36), and @ (64). @ is used in ES7 decorators.
    // 65 through 91 are uppercase letters.
    // permit _ (95).
    // 97 through 123 are lowercase letters.
    var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a";
    
    // inside an identifier @ is not allowed but 0-9 are.
    var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a";
    
    // Big ugly regular expressions that match characters in the
    // whitespace, identifier, and identifier-start categories. These
    // are only applied when a character is found to actually have a
    // code point above 128.
    var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
    var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f";
    //var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    //var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    
    var identifierStart = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
    var identifierChars = "(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";
    
    exports.identifier = new RegExp(identifierStart + identifierChars, 'g');
    exports.identifierStart = new RegExp(identifierStart);
    exports.identifierMatch = new RegExp("(?:\\\\u[0-9a-fA-F]{4}|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");
    
    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
    
    // Whether a single character denotes a newline.
    
    exports.newline = /[\n\r\u2028\u2029]/;
    
    // Matches a whole line break (where CRLF is considered a single
    // line break). Used to count lines.
    
    // in javascript, these two differ
    // in python they are the same, different methods are called on them
    exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
    exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');
    
    
    /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var BaseOptions = __webpack_require__(6).Options;
    
    var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];
    
    function Options(options) {
      BaseOptions.call(this, options, 'js');
    
      // compatibility, re
      var raw_brace_style = this.raw_options.brace_style || null;
      if (raw_brace_style === "expand-strict") { //graceful handling of deprecated option
        this.raw_options.brace_style = "expand";
      } else if (raw_brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
        this.raw_options.brace_style = "collapse,preserve-inline";
      } else if (this.raw_options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse";
        // } else if (!raw_brace_style) { //Nothing exists to set it
        //   raw_brace_style = "collapse";
      }
    
      //preserve-inline in delimited string will trigger brace_preserve_inline, everything
      //else is considered a brace_style and the last one only will have an effect
    
      var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);
    
      this.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
      this.brace_style = "collapse";
    
      for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] === "preserve-inline") {
          this.brace_preserve_inline = true;
        } else {
          this.brace_style = brace_style_split[bs];
        }
      }
    
      this.unindent_chained_methods = this._get_boolean('unindent_chained_methods');
      this.break_chained_methods = this._get_boolean('break_chained_methods');
      this.space_in_paren = this._get_boolean('space_in_paren');
      this.space_in_empty_paren = this._get_boolean('space_in_empty_paren');
      this.jslint_happy = this._get_boolean('jslint_happy');
      this.space_after_anon_function = this._get_boolean('space_after_anon_function');
      this.space_after_named_function = this._get_boolean('space_after_named_function');
      this.keep_array_indentation = this._get_boolean('keep_array_indentation');
      this.space_before_conditional = this._get_boolean('space_before_conditional', true);
      this.unescape_strings = this._get_boolean('unescape_strings');
      this.e4x = this._get_boolean('e4x');
      this.comma_first = this._get_boolean('comma_first');
      this.operator_position = this._get_selection('operator_position', validPositionValues);
    
      // For testing of beautify preserve:start directive
      this.test_output_raw = this._get_boolean('test_output_raw');
    
      // force this._options.space_after_anon_function to true if this._options.jslint_happy
      if (this.jslint_happy) {
        this.space_after_anon_function = true;
      }
    
    }
    Options.prototype = new BaseOptions();
    
    
    
    module.exports.Options = Options;
    
    
    /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Options(options, merge_child_field) {
      this.raw_options = _mergeOpts(options, merge_child_field);
    
      // Support passing the source text back with no change
      this.disabled = this._get_boolean('disabled');
    
      this.eol = this._get_characters('eol', 'auto');
      this.end_with_newline = this._get_boolean('end_with_newline');
      this.indent_size = this._get_number('indent_size', 4);
      this.indent_char = this._get_characters('indent_char', ' ');
      this.indent_level = this._get_number('indent_level');
    
      this.preserve_newlines = this._get_boolean('preserve_newlines', true);
      this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);
      if (!this.preserve_newlines) {
        this.max_preserve_newlines = 0;
      }
    
      this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');
      if (this.indent_with_tabs) {
        this.indent_char = '\t';
    
        // indent_size behavior changed after 1.8.6
        // It used to be that indent_size would be
        // set to 1 for indent_with_tabs. That is no longer needed and
        // actually doesn't make sense - why not use spaces? Further,
        // that might produce unexpected behavior - tabs being used
        // for single-column alignment. So, when indent_with_tabs is true
        // and indent_size is 1, reset indent_size to 4.
        if (this.indent_size === 1) {
          this.indent_size = 4;
        }
      }
    
      // Backwards compat with 1.3.x
      this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));
    
      this.indent_empty_lines = this._get_boolean('indent_empty_lines');
    
      // valid templating languages ['django', 'erb', 'handlebars', 'php']
      // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
      // other values ignored
      this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php'], ['auto']);
    }
    
    Options.prototype._get_array = function(name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || [];
      if (typeof option_value === 'object') {
        if (option_value !== null && typeof option_value.concat === 'function') {
          result = option_value.concat();
        }
      } else if (typeof option_value === 'string') {
        result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
      }
      return result;
    };
    
    Options.prototype._get_boolean = function(name, default_value) {
      var option_value = this.raw_options[name];
      var result = option_value === undefined ? !!default_value : !!option_value;
      return result;
    };
    
    Options.prototype._get_characters = function(name, default_value) {
      var option_value = this.raw_options[name];
      var result = default_value || '';
      if (typeof option_value === 'string') {
        result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
      }
      return result;
    };
    
    Options.prototype._get_number = function(name, default_value) {
      var option_value = this.raw_options[name];
      default_value = parseInt(default_value, 10);
      if (isNaN(default_value)) {
        default_value = 0;
      }
      var result = parseInt(option_value, 10);
      if (isNaN(result)) {
        result = default_value;
      }
      return result;
    };
    
    Options.prototype._get_selection = function(name, selection_list, default_value) {
      var result = this._get_selection_list(name, selection_list, default_value);
      if (result.length !== 1) {
        throw new Error(
          "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" +
          selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }
    
      return result[0];
    };
    
    
    Options.prototype._get_selection_list = function(name, selection_list, default_value) {
      if (!selection_list || selection_list.length === 0) {
        throw new Error("Selection list cannot be empty.");
      }
    
      default_value = default_value || [selection_list[0]];
      if (!this._is_valid_selection(default_value, selection_list)) {
        throw new Error("Invalid Default Value!");
      }
    
      var result = this._get_array(name, default_value);
      if (!this._is_valid_selection(result, selection_list)) {
        throw new Error(
          "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" +
          selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
      }
    
      return result;
    };
    
    Options.prototype._is_valid_selection = function(result, selection_list) {
      return result.length && selection_list.length &&
        !result.some(function(item) { return selection_list.indexOf(item) === -1; });
    };
    
    
    // merges child options up with the parent options object
    // Example: obj = {a: 1, b: {a: 2}}
    //          mergeOpts(obj, 'b')
    //
    //          Returns: {a: 2}
    function _mergeOpts(allOptions, childFieldName) {
      var finalOpts = {};
      allOptions = _normalizeOpts(allOptions);
      var name;
    
      for (name in allOptions) {
        if (name !== childFieldName) {
          finalOpts[name] = allOptions[name];
        }
      }
    
      //merge in the per type settings for the childFieldName
      if (childFieldName && allOptions[childFieldName]) {
        for (name in allOptions[childFieldName]) {
          finalOpts[name] = allOptions[childFieldName][name];
        }
      }
      return finalOpts;
    }
    
    function _normalizeOpts(options) {
      var convertedOpts = {};
      var key;
    
      for (key in options) {
        var newKey = key.replace(/-/g, "_");
        convertedOpts[newKey] = options[key];
      }
      return convertedOpts;
    }
    
    module.exports.Options = Options;
    module.exports.normalizeOpts = _normalizeOpts;
    module.exports.mergeOpts = _mergeOpts;
    
    
    /***/ }),
    /* 7 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var InputScanner = __webpack_require__(8).InputScanner;
    var BaseTokenizer = __webpack_require__(9).Tokenizer;
    var BASETOKEN = __webpack_require__(9).TOKEN;
    var Directives = __webpack_require__(13).Directives;
    var acorn = __webpack_require__(4);
    var Pattern = __webpack_require__(12).Pattern;
    var TemplatablePattern = __webpack_require__(14).TemplatablePattern;
    
    
    function in_array(what, arr) {
      return arr.indexOf(what) !== -1;
    }
    
    
    var TOKEN = {
      START_EXPR: 'TK_START_EXPR',
      END_EXPR: 'TK_END_EXPR',
      START_BLOCK: 'TK_START_BLOCK',
      END_BLOCK: 'TK_END_BLOCK',
      WORD: 'TK_WORD',
      RESERVED: 'TK_RESERVED',
      SEMICOLON: 'TK_SEMICOLON',
      STRING: 'TK_STRING',
      EQUALS: 'TK_EQUALS',
      OPERATOR: 'TK_OPERATOR',
      COMMA: 'TK_COMMA',
      BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
      COMMENT: 'TK_COMMENT',
      DOT: 'TK_DOT',
      UNKNOWN: 'TK_UNKNOWN',
      START: BASETOKEN.START,
      RAW: BASETOKEN.RAW,
      EOF: BASETOKEN.EOF
    };
    
    
    var directives_core = new Directives(/\/\*/, /\*\//);
    
    var number_pattern = /0[xX][0123456789abcdefABCDEF]*|0[oO][01234567]*|0[bB][01]*|\d+n|(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/;
    
    var digit = /[0-9]/;
    
    // Dot "." must be distinguished from "..." and decimal
    var dot_pattern = /[^\d\.]/;
    
    var positionable_operators = (
      ">>> === !== " +
      "<< && >= ** != == <= >> || |> " +
      "< / - + > : & % ? ^ | *").split(' ');
    
    // IMPORTANT: this must be sorted longest to shortest or tokenizing many not work.
    // Also, you must update possitionable operators separately from punct
    var punct =
      ">>>= " +
      "... >>= <<= === >>> !== **= " +
      "=> ^= :: /= << <= == && -= >= >> != -- += ** || ++ %= &= *= |= |> " +
      "= ! ? > < : / ^ - + * & % ~ |";
    
    punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    // ?. but not if followed by a number 
    punct = '\\?\\.(?!\\d) ' + punct;
    punct = punct.replace(/ /g, '|');
    
    var punct_pattern = new RegExp(punct);
    
    // words which should always start on new line.
    var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
    var reserved_words = line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);
    var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$');
    
    // var template_pattern = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g;
    
    var in_html_comment;
    
    var Tokenizer = function(input_string, options) {
      BaseTokenizer.call(this, input_string, options);
    
      this._patterns.whitespace = this._patterns.whitespace.matching(
        /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
        /\u2028\u2029/.source);
    
      var pattern_reader = new Pattern(this._input);
      var templatable = new TemplatablePattern(this._input)
        .read_options(this._options);
    
      this.__patterns = {
        template: templatable,
        identifier: templatable.starting_with(acorn.identifier).matching(acorn.identifierMatch),
        number: pattern_reader.matching(number_pattern),
        punct: pattern_reader.matching(punct_pattern),
        // comment ends just before nearest linefeed or end of file
        comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
        //  /* ... */ comment ends with nearest */ or end of file
        block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
        html_comment_start: pattern_reader.matching(/<!--/),
        html_comment_end: pattern_reader.matching(/-->/),
        include: pattern_reader.starting_with(/#include/).until_after(acorn.lineBreak),
        shebang: pattern_reader.starting_with(/#!/).until_after(acorn.lineBreak),
        xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/),
        single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
        double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
        template_text: templatable.until(/[`\\$]/),
        template_expression: templatable.until(/[`}\\]/)
      };
    
    };
    Tokenizer.prototype = new BaseTokenizer();
    
    Tokenizer.prototype._is_comment = function(current_token) {
      return current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.BLOCK_COMMENT || current_token.type === TOKEN.UNKNOWN;
    };
    
    Tokenizer.prototype._is_opening = function(current_token) {
      return current_token.type === TOKEN.START_BLOCK || current_token.type === TOKEN.START_EXPR;
    };
    
    Tokenizer.prototype._is_closing = function(current_token, open_token) {
      return (current_token.type === TOKEN.END_BLOCK || current_token.type === TOKEN.END_EXPR) &&
        (open_token && (
          (current_token.text === ']' && open_token.text === '[') ||
          (current_token.text === ')' && open_token.text === '(') ||
          (current_token.text === '}' && open_token.text === '{')));
    };
    
    Tokenizer.prototype._reset = function() {
      in_html_comment = false;
    };
    
    Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
      var token = null;
      this._readWhitespace();
      var c = this._input.peek();
    
      if (c === null) {
        return this._create_token(TOKEN.EOF, '');
      }
    
      token = token || this._read_non_javascript(c);
      token = token || this._read_string(c);
      token = token || this._read_word(previous_token);
      token = token || this._read_singles(c);
      token = token || this._read_comment(c);
      token = token || this._read_regexp(c, previous_token);
      token = token || this._read_xml(c, previous_token);
      token = token || this._read_punctuation();
      token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
    
      return token;
    };
    
    Tokenizer.prototype._read_word = function(previous_token) {
      var resulting_string;
      resulting_string = this.__patterns.identifier.read();
      if (resulting_string !== '') {
        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
        if (!(previous_token.type === TOKEN.DOT ||
            (previous_token.type === TOKEN.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get'))) &&
          reserved_word_pattern.test(resulting_string)) {
          if (resulting_string === 'in' || resulting_string === 'of') { // hack for 'in' and 'of' operators
            return this._create_token(TOKEN.OPERATOR, resulting_string);
          }
          return this._create_token(TOKEN.RESERVED, resulting_string);
        }
        return this._create_token(TOKEN.WORD, resulting_string);
      }
    
      resulting_string = this.__patterns.number.read();
      if (resulting_string !== '') {
        return this._create_token(TOKEN.WORD, resulting_string);
      }
    };
    
    Tokenizer.prototype._read_singles = function(c) {
      var token = null;
      if (c === '(' || c === '[') {
        token = this._create_token(TOKEN.START_EXPR, c);
      } else if (c === ')' || c === ']') {
        token = this._create_token(TOKEN.END_EXPR, c);
      } else if (c === '{') {
        token = this._create_token(TOKEN.START_BLOCK, c);
      } else if (c === '}') {
        token = this._create_token(TOKEN.END_BLOCK, c);
      } else if (c === ';') {
        token = this._create_token(TOKEN.SEMICOLON, c);
      } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
        token = this._create_token(TOKEN.DOT, c);
      } else if (c === ',') {
        token = this._create_token(TOKEN.COMMA, c);
      }
    
      if (token) {
        this._input.next();
      }
      return token;
    };
    
    Tokenizer.prototype._read_punctuation = function() {
      var resulting_string = this.__patterns.punct.read();
    
      if (resulting_string !== '') {
        if (resulting_string === '=') {
          return this._create_token(TOKEN.EQUALS, resulting_string);
        } else if (resulting_string === '?.') {
          return this._create_token(TOKEN.DOT, resulting_string);
        } else {
          return this._create_token(TOKEN.OPERATOR, resulting_string);
        }
      }
    };
    
    Tokenizer.prototype._read_non_javascript = function(c) {
      var resulting_string = '';
    
      if (c === '#') {
        if (this._is_first_token()) {
          resulting_string = this.__patterns.shebang.read();
    
          if (resulting_string) {
            return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
          }
        }
    
        // handles extendscript #includes
        resulting_string = this.__patterns.include.read();
    
        if (resulting_string) {
          return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
        }
    
        c = this._input.next();
    
        // Spidermonkey-specific sharp variables for circular references. Considered obsolete.
        var sharp = '#';
        if (this._input.hasNext() && this._input.testChar(digit)) {
          do {
            c = this._input.next();
            sharp += c;
          } while (this._input.hasNext() && c !== '#' && c !== '=');
          if (c === '#') {
            //
          } else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
            sharp += '[]';
            this._input.next();
            this._input.next();
          } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
            sharp += '{}';
            this._input.next();
            this._input.next();
          }
          return this._create_token(TOKEN.WORD, sharp);
        }
    
        this._input.back();
    
      } else if (c === '<' && this._is_first_token()) {
        resulting_string = this.__patterns.html_comment_start.read();
        if (resulting_string) {
          while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
            resulting_string += this._input.next();
          }
          in_html_comment = true;
          return this._create_token(TOKEN.COMMENT, resulting_string);
        }
      } else if (in_html_comment && c === '-') {
        resulting_string = this.__patterns.html_comment_end.read();
        if (resulting_string) {
          in_html_comment = false;
          return this._create_token(TOKEN.COMMENT, resulting_string);
        }
      }
    
      return null;
    };
    
    Tokenizer.prototype._read_comment = function(c) {
      var token = null;
      if (c === '/') {
        var comment = '';
        if (this._input.peek(1) === '*') {
          // peek for comment /* ... */
          comment = this.__patterns.block_comment.read();
          var directives = directives_core.get_directives(comment);
          if (directives && directives.ignore === 'start') {
            comment += directives_core.readIgnored(this._input);
          }
          comment = comment.replace(acorn.allLineBreaks, '\n');
          token = this._create_token(TOKEN.BLOCK_COMMENT, comment);
          token.directives = directives;
        } else if (this._input.peek(1) === '/') {
          // peek for comment // ...
          comment = this.__patterns.comment.read();
          token = this._create_token(TOKEN.COMMENT, comment);
        }
      }
      return token;
    };
    
    Tokenizer.prototype._read_string = function(c) {
      if (c === '`' || c === "'" || c === '"') {
        var resulting_string = this._input.next();
        this.has_char_escapes = false;
    
        if (c === '`') {
          resulting_string += this._read_string_recursive('`', true, '${');
        } else {
          resulting_string += this._read_string_recursive(c);
        }
    
        if (this.has_char_escapes && this._options.unescape_strings) {
          resulting_string = unescape_string(resulting_string);
        }
    
        if (this._input.peek() === c) {
          resulting_string += this._input.next();
        }
    
        resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
    
        return this._create_token(TOKEN.STRING, resulting_string);
      }
    
      return null;
    };
    
    Tokenizer.prototype._allow_regexp_or_xml = function(previous_token) {
      // regex and xml can only appear in specific locations during parsing
      return (previous_token.type === TOKEN.RESERVED && in_array(previous_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
        (previous_token.type === TOKEN.END_EXPR && previous_token.text === ')' &&
          previous_token.opened.previous.type === TOKEN.RESERVED && in_array(previous_token.opened.previous.text, ['if', 'while', 'for'])) ||
        (in_array(previous_token.type, [TOKEN.COMMENT, TOKEN.START_EXPR, TOKEN.START_BLOCK, TOKEN.START,
          TOKEN.END_BLOCK, TOKEN.OPERATOR, TOKEN.EQUALS, TOKEN.EOF, TOKEN.SEMICOLON, TOKEN.COMMA
        ]));
    };
    
    Tokenizer.prototype._read_regexp = function(c, previous_token) {
    
      if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
        // handle regexp
        //
        var resulting_string = this._input.next();
        var esc = false;
    
        var in_char_class = false;
        while (this._input.hasNext() &&
          ((esc || in_char_class || this._input.peek() !== c) &&
            !this._input.testChar(acorn.newline))) {
          resulting_string += this._input.peek();
          if (!esc) {
            esc = this._input.peek() === '\\';
            if (this._input.peek() === '[') {
              in_char_class = true;
            } else if (this._input.peek() === ']') {
              in_char_class = false;
            }
          } else {
            esc = false;
          }
          this._input.next();
        }
    
        if (this._input.peek() === c) {
          resulting_string += this._input.next();
    
          // regexps may have modifiers /regexp/MOD , so fetch those, too
          // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
          resulting_string += this._input.read(acorn.identifier);
        }
        return this._create_token(TOKEN.STRING, resulting_string);
      }
      return null;
    };
    
    Tokenizer.prototype._read_xml = function(c, previous_token) {
    
      if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
        var xmlStr = '';
        var match = this.__patterns.xml.read_match();
        // handle e4x xml literals
        //
        if (match) {
          // Trim root tag to attempt to
          var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
          var isCurlyRoot = rootTag.indexOf('{') === 0;
          var depth = 0;
          while (match) {
            var isEndTag = !!match[1];
            var tagName = match[2];
            var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
            if (!isSingletonTag &&
              (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
              if (isEndTag) {
                --depth;
              } else {
                ++depth;
              }
            }
            xmlStr += match[0];
            if (depth <= 0) {
              break;
            }
            match = this.__patterns.xml.read_match();
          }
          // if we didn't close correctly, keep unformatted.
          if (!match) {
            xmlStr += this._input.match(/[\s\S]*/g)[0];
          }
          xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
          return this._create_token(TOKEN.STRING, xmlStr);
        }
      }
    
      return null;
    };
    
    function unescape_string(s) {
      // You think that a regex would work for this
      // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
      //         return String.fromCharCode(parseInt(val, 16));
      //     })
      // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
      var out = '',
        escaped = 0;
    
      var input_scan = new InputScanner(s);
      var matched = null;
    
      while (input_scan.hasNext()) {
        // Keep any whitespace, non-slash characters
        // also keep slash pairs.
        matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);
    
        if (matched) {
          out += matched[0];
        }
    
        if (input_scan.peek() === '\\') {
          input_scan.next();
          if (input_scan.peek() === 'x') {
            matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
          } else if (input_scan.peek() === 'u') {
            matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
          } else {
            out += '\\';
            if (input_scan.hasNext()) {
              out += input_scan.next();
            }
            continue;
          }
    
          // If there's some error decoding, return the original string
          if (!matched) {
            return s;
          }
    
          escaped = parseInt(matched[1], 16);
    
          if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
            // we bail out on \x7f..\xff,
            // leaving whole string escaped,
            // as it's probably completely binary
            return s;
          } else if (escaped >= 0x00 && escaped < 0x20) {
            // leave 0x00...0x1f escaped
            out += '\\' + matched[0];
            continue;
          } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
            // single-quote, apostrophe, backslash - escape these
            out += '\\' + String.fromCharCode(escaped);
          } else {
            out += String.fromCharCode(escaped);
          }
        }
      }
    
      return out;
    }
    
    // handle string
    //
    Tokenizer.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
      var current_char;
      var pattern;
      if (delimiter === '\'') {
        pattern = this.__patterns.single_quote;
      } else if (delimiter === '"') {
        pattern = this.__patterns.double_quote;
      } else if (delimiter === '`') {
        pattern = this.__patterns.template_text;
      } else if (delimiter === '}') {
        pattern = this.__patterns.template_expression;
      }
    
      var resulting_string = pattern.read();
      var next = '';
      while (this._input.hasNext()) {
        next = this._input.next();
        if (next === delimiter ||
          (!allow_unescaped_newlines && acorn.newline.test(next))) {
          this._input.back();
          break;
        } else if (next === '\\' && this._input.hasNext()) {
          current_char = this._input.peek();
    
          if (current_char === 'x' || current_char === 'u') {
            this.has_char_escapes = true;
          } else if (current_char === '\r' && this._input.peek(1) === '\n') {
            this._input.next();
          }
          next += this._input.next();
        } else if (start_sub) {
          if (start_sub === '${' && next === '$' && this._input.peek() === '{') {
            next += this._input.next();
          }
    
          if (start_sub === next) {
            if (delimiter === '`') {
              next += this._read_string_recursive('}', allow_unescaped_newlines, '`');
            } else {
              next += this._read_string_recursive('`', allow_unescaped_newlines, '${');
            }
            if (this._input.hasNext()) {
              next += this._input.next();
            }
          }
        }
        next += pattern.read();
        resulting_string += next;
      }
    
      return resulting_string;
    };
    
    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    module.exports.positionable_operators = positionable_operators.slice();
    module.exports.line_starters = line_starters.slice();
    
    
    /***/ }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');
    
    function InputScanner(input_string) {
      this.__input = input_string || '';
      this.__input_length = this.__input.length;
      this.__position = 0;
    }
    
    InputScanner.prototype.restart = function() {
      this.__position = 0;
    };
    
    InputScanner.prototype.back = function() {
      if (this.__position > 0) {
        this.__position -= 1;
      }
    };
    
    InputScanner.prototype.hasNext = function() {
      return this.__position < this.__input_length;
    };
    
    InputScanner.prototype.next = function() {
      var val = null;
      if (this.hasNext()) {
        val = this.__input.charAt(this.__position);
        this.__position += 1;
      }
      return val;
    };
    
    InputScanner.prototype.peek = function(index) {
      var val = null;
      index = index || 0;
      index += this.__position;
      if (index >= 0 && index < this.__input_length) {
        val = this.__input.charAt(index);
      }
      return val;
    };
    
    // This is a JavaScript only helper function (not in python)
    // Javascript doesn't have a match method
    // and not all implementation support "sticky" flag.
    // If they do not support sticky then both this.match() and this.test() method
    // must get the match and check the index of the match.
    // If sticky is supported and set, this method will use it.
    // Otherwise it will check that global is set, and fall back to the slower method.
    InputScanner.prototype.__match = function(pattern, index) {
      pattern.lastIndex = index;
      var pattern_match = pattern.exec(this.__input);
    
      if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
        if (pattern_match.index !== index) {
          pattern_match = null;
        }
      }
    
      return pattern_match;
    };
    
    InputScanner.prototype.test = function(pattern, index) {
      index = index || 0;
      index += this.__position;
    
      if (index >= 0 && index < this.__input_length) {
        return !!this.__match(pattern, index);
      } else {
        return false;
      }
    };
    
    InputScanner.prototype.testChar = function(pattern, index) {
      // test one character regex match
      var val = this.peek(index);
      pattern.lastIndex = 0;
      return val !== null && pattern.test(val);
    };
    
    InputScanner.prototype.match = function(pattern) {
      var pattern_match = this.__match(pattern, this.__position);
      if (pattern_match) {
        this.__position += pattern_match[0].length;
      } else {
        pattern_match = null;
      }
      return pattern_match;
    };
    
    InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
      var val = '';
      var match;
      if (starting_pattern) {
        match = this.match(starting_pattern);
        if (match) {
          val += match[0];
        }
      }
      if (until_pattern && (match || !starting_pattern)) {
        val += this.readUntil(until_pattern, until_after);
      }
      return val;
    };
    
    InputScanner.prototype.readUntil = function(pattern, until_after) {
      var val = '';
      var match_index = this.__position;
      pattern.lastIndex = this.__position;
      var pattern_match = pattern.exec(this.__input);
      if (pattern_match) {
        match_index = pattern_match.index;
        if (until_after) {
          match_index += pattern_match[0].length;
        }
      } else {
        match_index = this.__input_length;
      }
    
      val = this.__input.substring(this.__position, match_index);
      this.__position = match_index;
      return val;
    };
    
    InputScanner.prototype.readUntilAfter = function(pattern) {
      return this.readUntil(pattern, true);
    };
    
    InputScanner.prototype.get_regexp = function(pattern, match_from) {
      var result = null;
      var flags = 'g';
      if (match_from && regexp_has_sticky) {
        flags = 'y';
      }
      // strings are converted to regexp
      if (typeof pattern === "string" && pattern !== '') {
        // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
        result = new RegExp(pattern, flags);
      } else if (pattern) {
        result = new RegExp(pattern.source, flags);
      }
      return result;
    };
    
    InputScanner.prototype.get_literal_regexp = function(literal_string) {
      return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    };
    
    /* css beautifier legacy helpers */
    InputScanner.prototype.peekUntilAfter = function(pattern) {
      var start = this.__position;
      var val = this.readUntilAfter(pattern);
      this.__position = start;
      return val;
    };
    
    InputScanner.prototype.lookBack = function(testVal) {
      var start = this.__position - 1;
      return start >= testVal.length && this.__input.substring(start - testVal.length, start)
        .toLowerCase() === testVal;
    };
    
    module.exports.InputScanner = InputScanner;
    
    
    /***/ }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var InputScanner = __webpack_require__(8).InputScanner;
    var Token = __webpack_require__(3).Token;
    var TokenStream = __webpack_require__(10).TokenStream;
    var WhitespacePattern = __webpack_require__(11).WhitespacePattern;
    
    var TOKEN = {
      START: 'TK_START',
      RAW: 'TK_RAW',
      EOF: 'TK_EOF'
    };
    
    var Tokenizer = function(input_string, options) {
      this._input = new InputScanner(input_string);
      this._options = options || {};
      this.__tokens = null;
    
      this._patterns = {};
      this._patterns.whitespace = new WhitespacePattern(this._input);
    };
    
    Tokenizer.prototype.tokenize = function() {
      this._input.restart();
      this.__tokens = new TokenStream();
    
      this._reset();
    
      var current;
      var previous = new Token(TOKEN.START, '');
      var open_token = null;
      var open_stack = [];
      var comments = new TokenStream();
    
      while (previous.type !== TOKEN.EOF) {
        current = this._get_next_token(previous, open_token);
        while (this._is_comment(current)) {
          comments.add(current);
          current = this._get_next_token(previous, open_token);
        }
    
        if (!comments.isEmpty()) {
          current.comments_before = comments;
          comments = new TokenStream();
        }
    
        current.parent = open_token;
    
        if (this._is_opening(current)) {
          open_stack.push(open_token);
          open_token = current;
        } else if (open_token && this._is_closing(current, open_token)) {
          current.opened = open_token;
          open_token.closed = current;
          open_token = open_stack.pop();
          current.parent = open_token;
        }
    
        current.previous = previous;
        previous.next = current;
    
        this.__tokens.add(current);
        previous = current;
      }
    
      return this.__tokens;
    };
    
    
    Tokenizer.prototype._is_first_token = function() {
      return this.__tokens.isEmpty();
    };
    
    Tokenizer.prototype._reset = function() {};
    
    Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
      this._readWhitespace();
      var resulting_string = this._input.read(/.+/g);
      if (resulting_string) {
        return this._create_token(TOKEN.RAW, resulting_string);
      } else {
        return this._create_token(TOKEN.EOF, '');
      }
    };
    
    Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
      return false;
    };
    
    Tokenizer.prototype._is_opening = function(current_token) { // jshint unused:false
      return false;
    };
    
    Tokenizer.prototype._is_closing = function(current_token, open_token) { // jshint unused:false
      return false;
    };
    
    Tokenizer.prototype._create_token = function(type, text) {
      var token = new Token(type, text,
        this._patterns.whitespace.newline_count,
        this._patterns.whitespace.whitespace_before_token);
      return token;
    };
    
    Tokenizer.prototype._readWhitespace = function() {
      return this._patterns.whitespace.read();
    };
    
    
    
    module.exports.Tokenizer = Tokenizer;
    module.exports.TOKEN = TOKEN;
    
    
    /***/ }),
    /* 10 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function TokenStream(parent_token) {
      // private
      this.__tokens = [];
      this.__tokens_length = this.__tokens.length;
      this.__position = 0;
      this.__parent_token = parent_token;
    }
    
    TokenStream.prototype.restart = function() {
      this.__position = 0;
    };
    
    TokenStream.prototype.isEmpty = function() {
      return this.__tokens_length === 0;
    };
    
    TokenStream.prototype.hasNext = function() {
      return this.__position < this.__tokens_length;
    };
    
    TokenStream.prototype.next = function() {
      var val = null;
      if (this.hasNext()) {
        val = this.__tokens[this.__position];
        this.__position += 1;
      }
      return val;
    };
    
    TokenStream.prototype.peek = function(index) {
      var val = null;
      index = index || 0;
      index += this.__position;
      if (index >= 0 && index < this.__tokens_length) {
        val = this.__tokens[index];
      }
      return val;
    };
    
    TokenStream.prototype.add = function(token) {
      if (this.__parent_token) {
        token.parent = this.__parent_token;
      }
      this.__tokens.push(token);
      this.__tokens_length += 1;
    };
    
    module.exports.TokenStream = TokenStream;
    
    
    /***/ }),
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Pattern = __webpack_require__(12).Pattern;
    
    function WhitespacePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      if (parent) {
        this._line_regexp = this._input.get_regexp(parent._line_regexp);
      } else {
        this.__set_whitespace_patterns('', '');
      }
    
      this.newline_count = 0;
      this.whitespace_before_token = '';
    }
    WhitespacePattern.prototype = new Pattern();
    
    WhitespacePattern.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
      whitespace_chars += '\\t ';
      newline_chars += '\\n\\r';
    
      this._match_pattern = this._input.get_regexp(
        '[' + whitespace_chars + newline_chars + ']+', true);
      this._newline_regexp = this._input.get_regexp(
        '\\r\\n|[' + newline_chars + ']');
    };
    
    WhitespacePattern.prototype.read = function() {
      this.newline_count = 0;
      this.whitespace_before_token = '';
    
      var resulting_string = this._input.read(this._match_pattern);
      if (resulting_string === ' ') {
        this.whitespace_before_token = ' ';
      } else if (resulting_string) {
        var matches = this.__split(this._newline_regexp, resulting_string);
        this.newline_count = matches.length - 1;
        this.whitespace_before_token = matches[this.newline_count];
      }
    
      return resulting_string;
    };
    
    WhitespacePattern.prototype.matching = function(whitespace_chars, newline_chars) {
      var result = this._create();
      result.__set_whitespace_patterns(whitespace_chars, newline_chars);
      result._update();
      return result;
    };
    
    WhitespacePattern.prototype._create = function() {
      return new WhitespacePattern(this._input, this);
    };
    
    WhitespacePattern.prototype.__split = function(regexp, input_string) {
      regexp.lastIndex = 0;
      var start_index = 0;
      var result = [];
      var next_match = regexp.exec(input_string);
      while (next_match) {
        result.push(input_string.substring(start_index, next_match.index));
        start_index = next_match.index + next_match[0].length;
        next_match = regexp.exec(input_string);
      }
    
      if (start_index < input_string.length) {
        result.push(input_string.substring(start_index, input_string.length));
      } else {
        result.push('');
      }
    
      return result;
    };
    
    
    
    module.exports.WhitespacePattern = WhitespacePattern;
    
    
    /***/ }),
    /* 12 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Pattern(input_scanner, parent) {
      this._input = input_scanner;
      this._starting_pattern = null;
      this._match_pattern = null;
      this._until_pattern = null;
      this._until_after = false;
    
      if (parent) {
        this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
        this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
        this._until_pattern = this._input.get_regexp(parent._until_pattern);
        this._until_after = parent._until_after;
      }
    }
    
    Pattern.prototype.read = function() {
      var result = this._input.read(this._starting_pattern);
      if (!this._starting_pattern || result) {
        result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
      }
      return result;
    };
    
    Pattern.prototype.read_match = function() {
      return this._input.match(this._match_pattern);
    };
    
    Pattern.prototype.until_after = function(pattern) {
      var result = this._create();
      result._until_after = true;
      result._until_pattern = this._input.get_regexp(pattern);
      result._update();
      return result;
    };
    
    Pattern.prototype.until = function(pattern) {
      var result = this._create();
      result._until_after = false;
      result._until_pattern = this._input.get_regexp(pattern);
      result._update();
      return result;
    };
    
    Pattern.prototype.starting_with = function(pattern) {
      var result = this._create();
      result._starting_pattern = this._input.get_regexp(pattern, true);
      result._update();
      return result;
    };
    
    Pattern.prototype.matching = function(pattern) {
      var result = this._create();
      result._match_pattern = this._input.get_regexp(pattern, true);
      result._update();
      return result;
    };
    
    Pattern.prototype._create = function() {
      return new Pattern(this._input, this);
    };
    
    Pattern.prototype._update = function() {};
    
    module.exports.Pattern = Pattern;
    
    
    /***/ }),
    /* 13 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    function Directives(start_block_pattern, end_block_pattern) {
      start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
      end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
      this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
      this.__directive_pattern = / (\w+)[:](\w+)/g;
    
      this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
    }
    
    Directives.prototype.get_directives = function(text) {
      if (!text.match(this.__directives_block_pattern)) {
        return null;
      }
    
      var directives = {};
      this.__directive_pattern.lastIndex = 0;
      var directive_match = this.__directive_pattern.exec(text);
    
      while (directive_match) {
        directives[directive_match[1]] = directive_match[2];
        directive_match = this.__directive_pattern.exec(text);
      }
    
      return directives;
    };
    
    Directives.prototype.readIgnored = function(input) {
      return input.readUntilAfter(this.__directives_end_ignore_pattern);
    };
    
    
    module.exports.Directives = Directives;
    
    
    /***/ }),
    /* 14 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /*jshint node:true */
    /*
    
      The MIT License (MIT)
    
      Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.
    
      Permission is hereby granted, free of charge, to any person
      obtaining a copy of this software and associated documentation files
      (the "Software"), to deal in the Software without restriction,
      including without limitation the rights to use, copy, modify, merge,
      publish, distribute, sublicense, and/or sell copies of the Software,
      and to permit persons to whom the Software is furnished to do so,
      subject to the following conditions:
    
      The above copyright notice and this permission notice shall be
      included in all copies or substantial portions of the Software.
    
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
      NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
      BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
      ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    */
    
    
    
    var Pattern = __webpack_require__(12).Pattern;
    
    
    var template_names = {
      django: false,
      erb: false,
      handlebars: false,
      php: false
    };
    
    // This lets templates appear anywhere we would do a readUntil
    // The cost is higher but it is pay to play.
    function TemplatablePattern(input_scanner, parent) {
      Pattern.call(this, input_scanner, parent);
      this.__template_pattern = null;
      this._disabled = Object.assign({}, template_names);
      this._excluded = Object.assign({}, template_names);
    
      if (parent) {
        this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
        this._excluded = Object.assign(this._excluded, parent._excluded);
        this._disabled = Object.assign(this._disabled, parent._disabled);
      }
      var pattern = new Pattern(input_scanner);
      this.__patterns = {
        handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
        handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
        handlebars: pattern.starting_with(/{{/).until_after(/}}/),
        php: pattern.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
        erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
        // django coflicts with handlebars a bit.
        django: pattern.starting_with(/{%/).until_after(/%}/),
        django_value: pattern.starting_with(/{{/).until_after(/}}/),
        django_comment: pattern.starting_with(/{#/).until_after(/#}/)
      };
    }
    TemplatablePattern.prototype = new Pattern();
    
    TemplatablePattern.prototype._create = function() {
      return new TemplatablePattern(this._input, this);
    };
    
    TemplatablePattern.prototype._update = function() {
      this.__set_templated_pattern();
    };
    
    TemplatablePattern.prototype.disable = function(language) {
      var result = this._create();
      result._disabled[language] = true;
      result._update();
      return result;
    };
    
    TemplatablePattern.prototype.read_options = function(options) {
      var result = this._create();
      for (var language in template_names) {
        result._disabled[language] = options.templating.indexOf(language) === -1;
      }
      result._update();
      return result;
    };
    
    TemplatablePattern.prototype.exclude = function(language) {
      var result = this._create();
      result._excluded[language] = true;
      result._update();
      return result;
    };
    
    TemplatablePattern.prototype.read = function() {
      var result = '';
      if (this._match_pattern) {
        result = this._input.read(this._starting_pattern);
      } else {
        result = this._input.read(this._starting_pattern, this.__template_pattern);
      }
      var next = this._read_template();
      while (next) {
        if (this._match_pattern) {
          next += this._input.read(this._match_pattern);
        } else {
          next += this._input.readUntil(this.__template_pattern);
        }
        result += next;
        next = this._read_template();
      }
    
      if (this._until_after) {
        result += this._input.readUntilAfter(this._until_pattern);
      }
      return result;
    };
    
    TemplatablePattern.prototype.__set_templated_pattern = function() {
      var items = [];
    
      if (!this._disabled.php) {
        items.push(this.__patterns.php._starting_pattern.source);
      }
      if (!this._disabled.handlebars) {
        items.push(this.__patterns.handlebars._starting_pattern.source);
      }
      if (!this._disabled.erb) {
        items.push(this.__patterns.erb._starting_pattern.source);
      }
      if (!this._disabled.django) {
        items.push(this.__patterns.django._starting_pattern.source);
        items.push(this.__patterns.django_value._starting_pattern.source);
        items.push(this.__patterns.django_comment._starting_pattern.source);
      }
    
      if (this._until_pattern) {
        items.push(this._until_pattern.source);
      }
      this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
    };
    
    TemplatablePattern.prototype._read_template = function() {
      var resulting_string = '';
      var c = this._input.peek();
      if (c === '<') {
        var peek1 = this._input.peek(1);
        //if we're in a comment, do something special
        // We treat all comments as literals, even more than preformatted tags
        // we just look for the appropriate close tag
        if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
          resulting_string = resulting_string ||
            this.__patterns.php.read();
        }
        if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
          resulting_string = resulting_string ||
            this.__patterns.erb.read();
        }
      } else if (c === '{') {
        if (!this._disabled.handlebars && !this._excluded.handlebars) {
          resulting_string = resulting_string ||
            this.__patterns.handlebars_comment.read();
          resulting_string = resulting_string ||
            this.__patterns.handlebars_unescaped.read();
          resulting_string = resulting_string ||
            this.__patterns.handlebars.read();
        }
        if (!this._disabled.django) {
          // django coflicts with handlebars a bit.
          if (!this._excluded.django && !this._excluded.handlebars) {
            resulting_string = resulting_string ||
              this.__patterns.django_value.read();
          }
          if (!this._excluded.django) {
            resulting_string = resulting_string ||
              this.__patterns.django_comment.read();
            resulting_string = resulting_string ||
              this.__patterns.django.read();
          }
        }
      }
      return resulting_string;
    };
    
    
    module.exports.TemplatablePattern = TemplatablePattern;
    
    
    /***/ })
    /******/ ]);
    var js_beautify = legacy_beautify_js;
    /* Footer */
    if (typeof define === "function" && define.amd) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        define([], function() {
            return { js_beautify: js_beautify };
        });
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var js_beautify = require("beautify").js_beautify`.
        exports.js_beautify = js_beautify;
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.js_beautify = js_beautify;
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.js_beautify = js_beautify;
    }
    
    }());
    
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function () {
    'use strict';

    // ================================================================================
    // Main controller for 'UI5' tab in devtools
    // ================================================================================

    // ================================================================================
    // Bootstrap
    // ================================================================================

    // Components that need to be required and reference
    // ================================================================================
    var utils = require('../../../modules/utils/utils.js');
    var beautifier = require('../../../../html/lib/beautify.js');
    var TabBar = require('../../../modules/ui/TabBar.js');
    var ControlTree = require('../../../modules/ui/ControlTree.js');
    var DataView = require('../../../modules/ui/DataView.js');
    var Splitter = require('../../../modules/ui/SplitContainer.js');
    var deepExtend = require('deep-extend');

    // Apply theme
    // ================================================================================
    utils.applyTheme(chrome.devtools.panels.themeName);

    // Create a port with background page for continuous message communication
    // ================================================================================
    var port = chrome.extension.connect({name: 'devtools-tabId-' + chrome.devtools.inspectedWindow.tabId});

    // Bootstrap for 'Control inspector' tab
    // ================================================================================
    utils.setOSClassName();

    // Main tabbar inside 'UI5' devtools panel
    var UI5TabBar = new TabBar('ui5-tabbar');

    // Horizontal Splitter for 'Control Inspector' tab
    var controlInspectorHorizontalSplitter = new Splitter('horizontal-splitter', {
        isEndContainerClosable: true,
        hideEndContainer: false
        //endContainerWidth: '400px'
    });

    // Control tree
    var controlTree = new ControlTree('control-tree', {

        /**
         * Send message, that the a new element is selected in the ControlTree.
         * @param {string} selectedElementId
         */
        onSelectionChanged: function (selectedElementId) {
            port.postMessage({
                action: 'do-control-select',
                target: selectedElementId
            });
        },

        /**
         * Send message, that the a new element is hovered in the ControlTree.
         * @param {string} hoveredElementId
         */
        onHoverChanged: function (hoveredElementId) {
            port.postMessage({
                action: 'on-control-tree-hover',
                target: hoveredElementId
            });
        },

        /**
         * Fired at first rendering of the ControlTree.
         */
        onInitialRendering: function () {
            var controls = this.getData().controls;
            this.setSelectedElement(controls[0].id);
        }
    });

    // Tabbar for Controltree additional information (Properties, Binding and etc)
    var controlTreeTabBar = new TabBar('control-tree-tabbar');

    // Dataview for control properties
    var controlProperties = new DataView('control-properties', {

        /**
         * Send message, that an proprety in the DataView is changed.
         * @param {Object} changeData
         */
        onPropertyUpdated: function (changeData) {
            port.postMessage({
                action: 'do-control-property-change',
                data: changeData
            });
        }
    });

    // Vertical splitter for 'Bindings' tab
    var controlBindingsSplitter = new Splitter('control-bindings-splitter', {
        hideEndContainer: true,
        isEndContainerClosable: true,
        endContainerTitle: 'Model Information'
    });

    // Dataview for control aggregations
    var controlAggregations = new DataView('control-aggregations');

    // Dataview for control binding information
    var controlBindingInfoRightDataView = new DataView('control-bindings-right');

    // Dataview for control binding information - left part
    var controlBindingInfoLeftDataView = new DataView('control-bindings-left', {

        /**
         * Method fired when a clickable element is clicked.
         * @param {Object} event
         */
        onValueClick: function (event) {
            var dataFormatedForDataView = {
                modelInfo: {
                    options: {
                        title: 'Model Information',
                        expandable: false,
                        expanded: true,
                        hideTitle: true
                    },
                    data: event.data
                }
            };

            controlBindingInfoRightDataView.setData(dataFormatedForDataView);
            controlBindingsSplitter.showEndContainer();
        }
    });

    // Dataview for control events
    var controlEvents = new DataView('control-events', {

        /**
         * Method fired when a clickable element is clicked.
         * @param {Object} event
         */
        onValueClick: function (event) {
            port.postMessage({
                action: 'do-console-log-event-listener',
                data: event.data
            });
        }
    });

    // Bootstrap for 'Control inspector' tab
    // ================================================================================

    // Dataview for 'Application information' tab
    var appInfo = new DataView('app-info');
/////////////////////////Qmate//////////////////////////////////////////////////////////////
    var ReuseDictionary = {
        "no action": "ui5.element.getDisplayed",
        "click": "ui5.userInteraction.click",
        "clear": "ui5.userInteraction.clear",
        "clearAndRetry": "ui5.userInteraction.clearAndRetry",
        "fill": "ui5.userInteraction.fill",
        "fillAndRetry":"ui5.userInteraction.fillAndRetry",
        "clearAndFill": "ui5.userInteraction.clearAndFill",
        "clearAndFillAndRetry": "ui5.userInteraction.clearAndFillAndRetry"

    };
    var qmateButton = document.getElementById("runQmate");
    var qmateAction = document.getElementById("selectAction");
    var qmateSumElems = document.getElementById("sumOfElems");
    var oCurrentSelector = {};
    //Attach action changed
    qmateAction.addEventListener("change", function(){
        //Get editor instance
        if(!edt) {
            var edt = qmateEditor;
            if(!edt) {
                edtDom = document.querySelector('.CodeMirror');
                if(edtDom && edtDom.CodeMirror) {
                    edt = edtDom.CodeMirror;
                }
            }
        }

        let jsBeautifyExec = beautifier.js_beautify;
        var formCode = formatQmateCode(oCurrentSelector);
        let beautifiedJs = jsBeautifyExec(formCode);
        edt.setOption("value", beautifiedJs);
    });

    function tryParseJSON (jsonString){
        try {
            var o = JSON.parse(jsonString);
    
            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object",
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return o;
            }
        }
        catch (e) { }
    
        return false;
    };


    // Attach run qmate event
    qmateButton.addEventListener("click", function(){
        //Get editor instance
        if(!edt) {
            var edt = qmateEditor;
            if(!edt) {
                edtDom = document.querySelector('.CodeMirror');
                if(edtDom && edtDom.CodeMirror) {
                    edt = edtDom.CodeMirror;
                }
            }
        }
        // Get value of editor
        let strVal = edt.getValue();
        let jsonStr = "";
        let busyi = document.getElementById("busybox");
        busyi.style.display = "none";

        if(strVal && qmateAction.value && strVal.indexOf('{') !== -1) {
            try {
                jsonStr = strVal.substring(strVal.indexOf('{'), strVal.indexOf(';'));
                //let sel = JSON.parse(jsonStr);
                let sel = tryParseJSON(jsonStr);
                if(sel === false) {
                    let failedDom = document.getElementById("failed");
                    failedDom.innerText =  "Failed! Parsing issue with selector";
                    failedDom.style.display = "inline";
                    let successDom = document.getElementById("success");
                    successDom.style.display = "none";
                    return;
                }
                let idx = null;
                if(strVal.indexOf("index") !== -1 && strVal.split("index").length > 2) {
                    //Action  index
                    let idxStr = strVal.substring(strVal.indexOf("index"));
                    idxStr = idxStr.substring(idxStr.indexOf('=') + 1, idxStr.indexOf(';'))
                    if(idxStr && !Number.isNaN(parseInt(idxStr.trim()))){
                        try {
                            idx = parseInt(idxStr.trim());
                            if(idx < 0) {
                                let failedDom = document.getElementById("failed");
                                failedDom.innerText =  "Failed! Index should be a non-negative integer number";
                                failedDom.style.display = "inline";
                                let successDom = document.getElementById("success");
                                successDom.style.display = "none";
                                return;
                            }
                        } catch (error) {
                            let failedDom = document.getElementById("failed");
                            failedDom.innerText =  "Failed! Index should be an integer number";
                            failedDom.style.display = "inline";
                            let successDom = document.getElementById("success");
                            successDom.style.display = "none";
                            return;
                        }
                    } else {
                        let failedDom = document.getElementById("failed");
                        failedDom.innerText =  "Failed! Index should be an integer number";
                        failedDom.style.display = "inline";
                        let successDom = document.getElementById("success");
                        successDom.style.display = "none";
                        return;
                        
                    }
                }
                
                let sValEnter = "";
                if(qmateAction.value !== "click" && qmateAction.value !== "no action" && qmateAction.value !== "clear" && strVal.indexOf("valueToEnter") !== -1 && strVal.split("valueToEnter").length > 2){
                    // Get value
                    sValEnter = strVal.substring(strVal.indexOf("valueToEnter"));
                    sValEnter = sValEnter.substring(sValEnter.indexOf('"') + 1, sValEnter.indexOf('";'))
                } 

                //Send message
                port.postMessage({
                    action: 'do-run-qmate-script',
                    selector: sel,
                    methodVyp: {"method": qmateAction.value, "index": idx, "entValue": sValEnter}
                });
            } catch (error) {
                let failedDom = document.getElementById("failed");
                failedDom.innerText =  "Failed! Something went wrong with the parsing of the information";
                failedDom.style.display = "inline";
                let successDom = document.getElementById("success");
                successDom.style.display = "none";
                throw new Error("Something went wrong with the parsing of the information");
            }
        } else {
            // Nothing to run ignore...
        }
    });

    var formatQmateCode = function(sel) {
        if(!sel || isEmptyObj(sel))  return "No valid selector could be generated";
        let currSel = {};
        deepExtend(currSel, sel, {});
        let idx = null;
        if(currSel.elementProperties && currSel.elementProperties.index !== null && currSel.elementProperties.index !== undefined) {
            idx = currSel.elementProperties.index;
            delete currSel.elementProperties.index;
        } 
        var sSelector = JSON.stringify(currSel);
        var strSel = 'const selector = ' + sSelector + ';';
        if(qmateAction.value !== "click" && qmateAction.value !== "no action" && qmateAction.value !== "clear") {
            strSel = strSel + 'const valueToEnter = "myValue";';
        }
        if(idx !== null && idx !== undefined) {
            strSel = strSel + 'const index = '+ idx + ';';
        }

        if(qmateAction.value) {
            strSel = strSel +  'await ' + ReuseDictionary[qmateAction.value] + '(selector';
            if(qmateAction.value !== "click" && qmateAction.value !== "no action" && qmateAction.value !== "clear") {
                strSel = strSel + ', valueToEnter'; 
            }
            if(idx !== null && idx !== undefined) {
                strSel = strSel + ', index);'
            } else {
                strSel = strSel + ');'
            }
        }
        return strSel;
    }

    var isEmptyObj = function(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

 //////////////////////////////////////////////////////////////////////////////////////   
    // ================================================================================
    // Communication
    // ================================================================================

    // Name space for message handler functions.
    var messageHandler = {

        'on-qmate-req-progress': function(event) {
            let successDom = document.getElementById("success");
            let failedDom = document.getElementById("failed");
            successDom.style.display = "none";
            failedDom.style.display = "none";

            let isBusy = event.isBusy.value;
            let busyi = document.getElementById("busybox");
            if(busyi) {
                if(isBusy) {
                    busyi.style.display = "inline";
                    
                } else { 
                    busyi.style.display = "none";
                }
            } else {
                throw new Error("Busy indicator is undefined");
            }

            if(event.success !== undefined){
                let res = event.success.value;
                if(res.resnum > 0) {
                    qmateSumElems.innerText = "Total number of elements found (without index):" + res.num;
                    if(res.actionSuccess) {
                        successDom.innerText = "Success!";
                        successDom.style.display = "inline";
                        failedDom.style.display = "none";
                        if(res.controlId) {
                            port.postMessage({
                                action: 'on-control-tree-hover',
                                target: res.controlId
                            });
                        }
                    } else if(res.resnum === 0){
                        failedDom.innerText =  "Failed!";
                        successDom.style.display = "none";
                        failedDom.style.display = "inline";
                    } else {
                        if(res.resnum > 1) {
                            failedDom.innerText =  "Failed!";
                            successDom.style.display = "none";
                            failedDom.style.display = "inline";
                        } else {
                            failedDom.innerText =  "Action failed!";
                            successDom.style.display = "none";
                            failedDom.style.display = "inline";
                        }
                        if(res.controlId) {
                            port.postMessage({
                                action: 'on-control-tree-hover',
                                target: res.controlId
                            });
                        }
                    }
                } else { 
                    failedDom.innerText =  "Failed!";
                    successDom.style.display = "none";
                    failedDom.style.display = "inline";
                    qmateSumElems.innerText = "Total number of elements found (without index):" + 0;
                }
            }
        },

        'on-qmate-data': function(event) {
            let successDom = document.getElementById("success");
            let failedDom = document.getElementById("failed");
            qmateSumElems.innerText = "";
            qmateAction.value = "no action";
            successDom.style.display = "none";
            failedDom.style.display = "none";
            let sel = event.selector;
            if(!edt) {
                var edt = qmateEditor;
                if(!edt) {
                    edtDom = document.querySelector('.CodeMirror');
                    if(edtDom && edtDom.CodeMirror) {
                        edt = edtDom.CodeMirror;
                    }
                }
            }
            if(sel && beautifier && !isEmptyObj(sel)) {
                let jsBeautifyExec = beautifier.js_beautify;
                oCurrentSelector= sel;
                var formCode = formatQmateCode(sel);
                let beautifiedJs = jsBeautifyExec(formCode);
                edt.setOption("value", beautifiedJs);
            } else {
                oCurrentSelector = {};
                edt.setOption("value", "No valid selector could be generated");
            }
        },

        /**
         * Send object to background page.
         * @param {Object} message
         */
        'on-port-connection': function (message) {
            port.postMessage({action: 'do-ui5-detection'});
        },

        /**
         * Handler for UI5 detection on the current inspected page.
         * @param {Object} message
         */
        'on-ui5-detected': function (message) {
            var overlay = document.getElementById('supportability');
            var overlayNoUI5Section = overlay.querySelector('[no-ui5-version]');
            var overlayUnsupportedVersionSection = overlay.querySelector('[unsupported-version]');

            if (message.isVersionSupported) {
                overlay.setAttribute('hidden', true);
            } else {
                overlay.removeAttribute('hidden');
                overlayNoUI5Section.style.display = 'none';
                overlayUnsupportedVersionSection.style.display = 'inline';
            }
            port.postMessage({
                action: 'do-script-injection',
                tabId: chrome.devtools.inspectedWindow.tabId,
                file: '/scripts/content/main.js'
            });
        },

        /**
         * Get the initial needed information, when the main injected script is available.
         * @param {Object} message
         */
        'on-main-script-injection': function (message) {
            port.postMessage({
                action: 'get-initial-information'
            });
        },

        /**
         * Visualize the initial needed data for the extension.
         * @param {Object} message
         */
        'on-receiving-initial-data': function (message) {
            controlTree.setData(message.controlTree);
            appInfo.setData(message.applicationInformation);
        },

        /**
         * Updates the ControlTree, when the DOM in the inspected window is changed.
         * @param {Object} message
         */
        'on-application-dom-update': function (message) {
            controlTree.setData(message.controlTree);
        },

        /**
         * Handler for ControlTree element selecting.
         * @param {Object} message
         */
        'on-control-select': function (message) {
            controlProperties.setData(message.controlProperties);
            controlBindingInfoLeftDataView.setData(message.controlBindings);
            controlAggregations.setData(message.controlAggregations);
            controlEvents.setData(message.controlEvents);

            if(message.controlBindings){
                // Set bindings count
                document.querySelector('#tab-bindings count').innerHTML = '&nbsp;(' + Object.keys(message.controlBindings).length + ')';
            }

            // Close possible open binding info and/or methods info
            controlBindingsSplitter.hideEndContainer();
        },

        /**
         * Select ControlTree element, based on selection in the Element panel.
         * @param {Object} message
         */
        'on-select-ui5-control-from-element-tab': function (message) {
            controlTree.setSelectedElement(message.nearestUI5Control);
        },

        /**
         * Select ControlTree element, based on right click and context menu.
         * @param {Object} message
         */
        'on-contextMenu-control-select': function (message) {
            controlTree.setSelectedElement(message.target);
        },

        /**
         * Handler for UI5 none detection on the current inspected page.
         * @param {Object} message
         */
        'on-ui5-not-detected': function (message) {
            var overlay = document.getElementById('supportability');
            var overlayNoUI5Section = overlay.querySelector('[no-ui5-version]');
            var overlayUnsupportedVersionSection = overlay.querySelector('[unsupported-version]');

            overlay.removeAttribute('hidden');

            overlayNoUI5Section.style.display = 'inline';
            overlayUnsupportedVersionSection.style.display = 'none';
        }
    };

    // Listen for messages from the background page
    port.onMessage.addListener(function (message, messageSender, sendResponse) {
        // Resolve incoming messages
        utils.resolveMessage({
            message: message,
            messageSender: messageSender,
            sendResponse: sendResponse,
            actions: messageHandler
        });
    });

    // Restart everything when the URL is changed
    chrome.devtools.network.onNavigated.addListener(function () {
        port.postMessage({action: 'do-ui5-detection'});
    });
}());

},{"../../../../html/lib/beautify.js":1,"../../../modules/ui/ControlTree.js":3,"../../../modules/ui/DataView.js":4,"../../../modules/ui/SplitContainer.js":6,"../../../modules/ui/TabBar.js":7,"../../../modules/utils/utils.js":9,"deep-extend":12}],3:[function(require,module,exports){
'use strict';

/**
 * @typedef {Object} ControlTree
 * @property {Object} data - This property should contain objects described in ControlTreeOptions
 * @function onSelectionChanged
 * @function onHoverChanged

 */

/**
 * @typedef {Object} ControlTreeOptions
 * @property {Object} versionInfo - JSON object with the fowling format:
 *  {
 *      framework: 'string',
 *      version: 'string'
 *  }
 * @property {Object} controls - Array with JSON object in the following format:
 *  [{
 *      id: 'string',
 *      name: 'string',
 *      type: 'string',
 *      content: 'Array'
 *  }]
 */

/**
 * @typedef {Object} controlTreeRenderingOptions
 * @property {string} id - The id of the control.
 * @property {Array} attributes - HTML attributes.
 */

/**
 * Check for JS object.
 * @param {Object} data
 * @returns {boolean}
 * @private
 */
function _isObject(data) {
    return (typeof data === 'object' && !Array.isArray(data) && data !== null);
}

/**
 * Create tree element that shows framework name and version.
 * @param {Object} versionInfo
 * @returns {string}
 * @private
 */
function _createTreeHeader(versionInfo) {
    if (!versionInfo) {
        console.warn('There is no version information in the data model');
        return '';
    }

    return '<ul><li visible><version>&#60;!' + versionInfo.framework + ' v' + versionInfo.version + '&#62;</version></li></ul>';
}

/**
 * @param {controlTreeRenderingOptions} options
 * @returns {string}
 * @private
 */
function _startControlTreeList(options) {
    return '<ul ' + options.attributes.join(' ') + '>';
}

/**
 * @returns {string}
 * @private
 */
function _endControlTreeList() {
    return '</ul>';
}

/**
 * @param {controlTreeRenderingOptions.controls} options
 * @returns {string}
 * @private
 */
function _startControlTreeListItem(options) {
    return '<li id="' + options.id + '">';
}

/**
 * @returns {string}
 * @private
 */
function _endControlTreeListItem() {
    return '</li>';
}

/**
 * Create HTML for the left part of the ControlTree list item.
 * @param {ControlTreeOptions.controls} controls
 * @param {number} paddingLeft
 * @returns {string}
 * @private
 */
function _getControlTreeLeftColumnOfListItem(controls, paddingLeft) {
    var html = '<offset style="padding-left:' + paddingLeft + 'px" >';

    if (controls.content.length > 0) {
        html += '<arrow down="true"></arrow>';
    } else {
        html += '<place-holder></place-holder>';
    }

    html += '</offset>';

    return html;
}

/**
 * Create HTML for the right part of the ControlTree list item.
 * @param {Object} control - JSON object form {ControlTreeOptions.controls}
 * @returns {string}
 * @private
 */
function _getControlTreeRightColumnOfListItem(control) {
    var splitControlName = control.name.split('.');
    var name = splitControlName[splitControlName.length - 1];
    var nameSpace = control.name.replace(name, '');

    return '<tag data-search="' + control.name + control.id + '">' +
        '&#60;' +
        '<namespace>' + nameSpace + '</namespace>' +
        name +
        '<attribute>&#32;id="<attribute-value>' + control.id + '</attribute-value>"</attribute>' +
        '&#62;' +
        '</tag>';
}

/**
 * Search for the nearest parent Node.
 * @param {element} element - HTML DOM element that will be the root of the search
 * @param {string} parentNodeName - The desired HTML parent element nodeName
 * @returns {Object} HTML DOM element
 * @private
 */
function _findNearestDOMParent(element, parentNodeName) {
    while (element.nodeName !== parentNodeName) {
        if (element.nodeName === 'CONTROL-TREE') {
            break;
        }
        element = element.parentNode;
    }

    return element;
}

/**
 * ControlTree constructor.
 * @param {string} id - The id of the DOM container
 * @param {ControlTree} instantiationOptions
 * @constructor
 */
function ControlTree(id, instantiationOptions) {
    var areInstantiationOptionsAnObject = _isObject(instantiationOptions);
    var options;

    /**
     * Make sure that the options parameter is Object and
     * that the ControlTree can be instantiate without initial options.
     */
    if (areInstantiationOptionsAnObject) {
        options = instantiationOptions;
    } else {
        options = {};
    }

    // Save DOM reference
    this._controlTreeContainer = document.getElementById(id);

    /**
     * Method fired when the selected element in the ControlTree is changed.
     * @param {string} selectedElementId - The selected element id
     */
    this.onSelectionChanged = options.onSelectionChanged ? options.onSelectionChanged : function (selectedElementId) {
    };

    /**
     * Method fired when the hovered element in the ControlTree is changed.
     * @param {string} hoveredElementId - The hovered element id
     */
    this.onHoverChanged = options.onHoverChanged ? options.onHoverChanged : function (hoveredElementId) {
    };

    /**
     * Method fired when the initial ControlTree rendering is done.
     */
    this.onInitialRendering = options.onInitialRendering ? options.onInitialRendering : function () {
    };

    // Object with the tree model that will be visualized
    this.setData(options.data);
}

/**
 * Initialize Tree.
 */
ControlTree.prototype.init = function () {
    this._createHTML();
    this._initFocus();
    this._createHandlers();

    // Fire event to notify that the ControlTree is initialized
    this.onInitialRendering();
};

/**
 * Get the data model used for the tree.
 * @returns {ControlTreeOptions} the data that is used for the tree
 */
ControlTree.prototype.getData = function () {
    return this._data;
};

/**
 * Set the data model used for the tree.
 * @param {ControlTreeOptions} data
 * @returns {ControlTree}
 */
ControlTree.prototype.setData = function (data) {
    var oldData = this.getData();
    var isDataAnObject = _isObject(data);

    if (isDataAnObject === false) {
        console.warn('The parameter should be an Object');
        return;
    }

    // Make sure that the new data is different from the old one
    if (JSON.stringify(oldData) === JSON.stringify(data)) {
        return;
    }

    this._data = data;

    // Initialize ControlTree on first rendering
    // If it is a second rendering, render only the tree elements
    if (this._isFirstRendering === undefined) {
        this.init();
        this._isFirstRendering = true;
    } else {
        this._createTree();
    }

    return this;
};

/**
 * Returns the selected <li> element of the tree.
 * @returns {Element} HTML DOM element
 */
ControlTree.prototype.getSelectedElement = function () {
    return this._selectedElement;
};

/**
 * Set the selected <li> element of the tree.
 * @param {string} elementID - HTML DOM element id
 * @returns {ControlTree}
 */
ControlTree.prototype.setSelectedElement = function (elementID) {
    var selectedElement;

    if (typeof elementID !== 'string') {
        console.warn('Please use a valid string parameter');
        return;
    }

    selectedElement = this._controlTreeContainer.querySelector("[id='" + elementID  + "']");

    if (selectedElement === null) {
        console.warn('The selected element is not a child of the ControlTree');
        return;
    }

    this._selectedElement = selectedElement;
    this._selectTreeElement(selectedElement);

    return this;
};

/**
 * Create and places the ControlTree HTML.
 * @private
 */
ControlTree.prototype._createHTML = function () {
    var html;

    html = this._createFilter();
    html += this._createTreeContainer();

    this._controlTreeContainer.innerHTML = html;
    // Save reverences for future use
    this._setReferences();

    if (this.getData() !== undefined) {
        this._createTree();
    }
};

/**
 * Sets initial focus.
 * @private
 */
ControlTree.prototype._initFocus = function () {
    var searchInput = document.querySelector('input[type="search"]');
    searchInput && searchInput.focus();
};

/**
 * Create the HTML needed for filtering.
 * @returns {string}
 * @private
 */
ControlTree.prototype._createFilter = function () {
    return '<filter>' +
        '<start>' +
        '<input type="search" placeholder="Search" search/>' +
        '<label><input type="checkbox" filter />Filter results <results>(0)</results></label>' +
        '</start>' +
        '<end>' +
        '<label><input type="checkbox" namespaces checked/>Show Namespace</label>' +
        '<label><input type="checkbox" attributes checked/>Show Attributes</label>' +
        '</end>' +
        '</filter>';
};

/**
 * Create the HTML container for the tree.
 * @returns {string}
 * @private
 */
ControlTree.prototype._createTreeContainer = function () {
    return '<tree show-namespaces show-attributes></tree>';
};

/**
 * Create ControlTree HTML.
 */
ControlTree.prototype._createTree = function () {
    var versionInfo = this.getData().versionInfo;
    var controls = this.getData().controls;

    this._treeContainer.innerHTML = _createTreeHeader(versionInfo) + this._createTreeHTML(controls);
};

/**
 * Create HTML tree from JSON.
 * @param {ControlTreeOptions.controls} controls
 * @param {number} level - nested level
 * @returns {string} HTML ControlTree in form of a string
 * @private
 */
ControlTree.prototype._createTreeHTML = function (controls, level) {
    if (controls === undefined || controls.length === 0) {
        return '';
    }

    var html = '';
    var nestedLevel = level || 0;
    var paddingLeft = ++nestedLevel * 10;
    var that = this;

    controls.forEach(function (control) {
        html += _startControlTreeList({
            attributes: ['expanded="true"']
        });

        html += _startControlTreeListItem({
            id: control.id
        });

        html += _getControlTreeLeftColumnOfListItem(control, paddingLeft);

        html += _getControlTreeRightColumnOfListItem(control);

        html += _endControlTreeListItem();

        html += that._createTreeHTML(control.content, nestedLevel);

        html += _endControlTreeList();
    });

    return html;
};

/**
 * Hide/Show nested "<ul>" in "<li>" elements.
 * @param {Element} target - DOM element
 * @private
 */
ControlTree.prototype._toggleCollapse = function (target) {
    var targetParent = _findNearestDOMParent(target.parentNode, 'UL');

    if (target.getAttribute('right') === 'true') {
        target.removeAttribute('right');
        target.setAttribute('down', 'true');

        targetParent.setAttribute('expanded', 'true');
    } else if (target.getAttribute('down') === 'true') {
        target.removeAttribute('down');

        targetParent.removeAttribute('expanded');
        target.setAttribute('right', 'true');
    }
};

/**
 * Add visual selection to clicked "<li>" elements.
 * @param {Element} targetElement - DOM element
 * @private
 */
ControlTree.prototype._selectTreeElement = function (targetElement) {
    var selectedList = this._controlTreeContainer.querySelector('[selected]');
    var target = _findNearestDOMParent(targetElement, 'LI');

    // Prevent tree element selection for allowing proper multiple tree element selection for copy/paste
    if (target.id === this._controlTreeContainer.id) {
        return;
    }

    if (selectedList) {
        selectedList.removeAttribute('selected');
    }

    target.setAttribute('selected', 'true');

    this._scrollToElement(target);
    this.onSelectionChanged(target.id);
};

/**
 * Scroll to element in the ControlTree.
 * @param {Element} target - DOM element to which need to be scrolled
 */
ControlTree.prototype._scrollToElement = function (target) {
    var desiredViewBottomPosition = this._treeContainer.offsetHeight - this._treeContainer.offsetTop + this._treeContainer.scrollTop;

    if (target.offsetTop > desiredViewBottomPosition || target.offsetTop < this._treeContainer.scrollTop) {
        this._treeContainer.scrollTop = target.offsetTop - window.innerHeight / 6;
    }
};

/**
 * Search tree elements that match given criteria.
 * @param {string} userInput - Search criteria
 * @private
 */
ControlTree.prototype._searchInTree = function (userInput) {
    var searchableElements = this._controlTreeContainer.querySelectorAll('[data-search]');
    var searchInput = userInput.toLocaleLowerCase();
    var elementInformation;

    for (var i = 0; i < searchableElements.length; i++) {
        elementInformation = searchableElements[i].getAttribute('data-search').toLocaleLowerCase();

        if (elementInformation.indexOf(searchInput) !== -1) {
            searchableElements[i].parentNode.setAttribute('matching', true);
        } else {
            searchableElements[i].parentNode.removeAttribute('matching');
        }
    }
};

/**
 * Remove  "matching" attribute from the search.
 * @private
 */
ControlTree.prototype._removeAttributesFromSearch = function () {
    var elements = this._treeContainer.querySelectorAll('[matching]');

    for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('matching');
    }
};

/**
 * Visualize the number of elements which satisfy the search.
 * @private
 */
ControlTree.prototype._setSearchResultCount = function (count) {
    this._filterContainer.querySelector('results').innerHTML = '(' + count + ')';
};

/**
 * Event handler for mouse click on a tree element arrow.
 * @param {Object} event - click event
 * @private
 */
ControlTree.prototype._onArrowClick = function (event) {
    var target = event.target;

    if (target.nodeName === 'ARROW') {
        this._toggleCollapse(target);
    } else {
        this._selectTreeElement(target);
    }
};

/**
 * Event handler for user input in "search" input.
 * @param {Object} event - keyup event
 * @private
 */
ControlTree.prototype._onSearchInput = function (event) {
    var target = event.target;
    var searchResultCount;

    if (target.getAttribute('search') !== null) {

        if (target.value.length !== 0) {
            this._searchInTree(target.value);
        } else {
            this._removeAttributesFromSearch('matching');
        }

        searchResultCount = this._treeContainer.querySelectorAll('[matching]').length;
        this._setSearchResultCount(searchResultCount);
    }
};

/**
 * Event handler for onsearch event.
 * @param {Object} event - onsearch event
 * @private
 */
ControlTree.prototype._onSearchEvent = function (event) {
    var searchResultCount;

    if (event.target.value.length === 0) {
        this._removeAttributesFromSearch('matching');

        searchResultCount = this._treeContainer.querySelectorAll('[matching]').length;
        this._setSearchResultCount(searchResultCount);
    }

};

/**
 * Event handler for ControlTree options change.
 * @param {Object} event - click event
 * @private
 */
ControlTree.prototype._onOptionsChange = function (event) {
    var target = event.target;

    if (target.getAttribute('filter') !== null) {
        if (target.checked) {
            this._treeContainer.setAttribute('show-filtered-elements', true);
        } else {
            this._treeContainer.removeAttribute('show-filtered-elements');
        }
    }

    if (target.getAttribute('namespaces') !== null) {
        if (target.checked) {
            this._treeContainer.setAttribute('show-namespaces', true);
        } else {
            this._treeContainer.removeAttribute('show-namespaces');
        }
    }

    if (target.getAttribute('attributes') !== null) {
        if (target.checked) {
            this._treeContainer.setAttribute('show-attributes', true);
        } else {
            this._treeContainer.removeAttribute('show-attributes');
        }
    }

};

/**
 * Event handler for mouse hover on tree element.
 * @param {Object} event - mouse event
 * @private
 */
ControlTree.prototype._onTreeElementMouseHover = function (event) {
    var target = _findNearestDOMParent(event.target, 'LI');
    this.onHoverChanged(target.id);
};

/**
 * Create all event handlers for the ControlTree.
 * @private
 */
ControlTree.prototype._createHandlers = function () {
    this._treeContainer.onclick = this._onArrowClick.bind(this);
    this._filterContainer.onkeyup = this._onSearchInput.bind(this);
    this._filterContainer.onsearch = this._onSearchEvent.bind(this);
    this._filterContainer.onchange = this._onOptionsChange.bind(this);
    this._controlTreeContainer.onmouseover = this._onTreeElementMouseHover.bind(this);
};

/**
 * Save references to ControlTree different sections.
 * @private
 */
ControlTree.prototype._setReferences = function () {
    this._filterContainer = this._controlTreeContainer.querySelector(':scope > filter');
    this._treeContainer = this._controlTreeContainer.querySelector(':scope > tree');
};

module.exports = ControlTree;

},{}],4:[function(require,module,exports){
'use strict';

var JSONFormatter = require('../ui/JSONFormatter');
var DVHelper = require('../ui/helpers/DataViewHelper');

/** @property {Object} data - Object in the following format:
 *  {
 *      object1: {
            associations: 'Object' containing all the associations for the control
            options: 'Object' containing the configuration for dataview
 *                      controlId: 'string'
 *                      expandable:'boolean',
 *                      expanded:'boolean',
 *                      title:'string',
 *                      showTypeInfo:'boolean', default is false
 *                      showTitle: 'boolean' default is true
 *                      editableValues: 'boolean' default is true
 *           data:'Object' with all the data to be represented visually
 *      },
 *  }
 *
 * If there is an object in the data section you have to repeat the object1 structure to be properly represented
 */

/**
 * @param {string} target - id of the DOM container
 * @param {Object} options - initial configuration
 * @constructor
 */
function DataView(target, options) {

    this._DataViewContainer = document.getElementById(target);

    // Initialize event handlers for editable fields
    this._onClickHandler();
    this._onEnterHandler();

    // When the field is editable this flag shows whether the value should be selected
    this._selectValue = true;

    /**
     * Method fired when the clicked element is an editable.
     * @param {Object} changedData - with the id of the selected control, property name and the new value
     */
    this.onPropertyUpdated = function (changedData) {
    };

    /**
     * Method fired when a clickable element is clicked.
     * @param {Object} event
     */
    this.onValueClick = function (event) {
    };

    if (options) {

        this.onPropertyUpdated = options.onPropertyUpdated || this.onPropertyUpdated;

        this.onValueClick = options.onValueClick || this.onValueClick;

        options.data ? this.setData(options.data) : undefined;
    }
}

/**
 * @param {Object} data - object structure as HTML
 */
DataView.prototype.setData = function (data) {

    if (typeof data !== 'object') {
        return;
    }

    this._data = data;
    this._generateHTML();
};

/**
 * Get data model.
 * @returns {Object}
 */
DataView.prototype.getData = function () {
    return this._data;
};

/**
 * Checks if any of the view objects contain any data to present.
 * @returns {boolean}
 * @private
 */
DataView.prototype._isDataEmpty = function () {
    var viewObjects = this.getData();
    var isEmpty = true;

    if (!viewObjects) {
        return isEmpty;
    }

    for (var key in viewObjects) {
        if (DVHelper.getObjectLength(viewObjects[key].data)) {
            isEmpty = false;
            break;
        }
    }

    return isEmpty;
};

/**
 * Generates HTML string from an object.
 * @param {string} key
 * @param {Object|Array} currentElement
 * @returns {string}
 * @private
 */
DataView.prototype._generateHTMLFromObject = function (key, currentElement) {
    var html = '';
    var tag = 'key';

    var options = currentElement.options;

    if (options.title) {
        key = options.title;
        tag = 'section-title';
    }

    if (DVHelper.getObjectLength(currentElement) && options.expandable) {
        html += DVHelper.addArrow(options.expanded);
    }

    html += DVHelper.wrapInTag(tag, key, {});

    if (options.showTypeInfo) {

        if (!options.hideTitle) {
            html += ':&nbsp;';
        }

        html += DVHelper.addKeyTypeInfoBegin(currentElement.data);
    }

    return html;
};

/**
 * Appends or skips the closing bracket for Object type.
 * @param {Object} currentElement - current element to present
 * @returns {string}
 * @private
 */
DataView.prototype._generateHTMLForEndOfObject = function (currentElement) {
    var html = '';

    if (currentElement.options.showTypeInfo) {
        html += DVHelper.addKeyTypeInfoEnd(currentElement.data);
    }

    return html;
};

/**
 * Generates HTML string for a key value pair.
 * @param {string} key
 * @param {Object} currentView
 * @returns {string}
 * @private
 */
DataView.prototype._generateHTMLForKeyValuePair = function (key, currentView) {
    var html = '';
    var value = currentView.data[key];
    var options = currentView.options;
    var type = currentView.types ? currentView.types[key] : '';
    var attributes = {};
    var valueHTML;

    if (options && options.editableValues) {
        attributes = {
            'contentEditable': options.editableValues,
            'data-control-id': options.controlId,
            'data-property-name': key
        };
    }

    if (value && typeof value === 'object') {
        valueHTML = JSONFormatter.formatJSONtoHTML(value);
    } else if (typeof type === 'object') {
        valueHTML = DVHelper.wrapInSelectTag(value, attributes, type);
    } else if (type === 'boolean') {
        valueHTML = DVHelper.wrapInCheckBox(value, attributes);
    } else {
        valueHTML = DVHelper.valueNeedsQuotes(value, DVHelper.wrapInTag('value', value, attributes));
    }

    html += DVHelper.wrapInTag('key', key) + ':&nbsp;' + valueHTML;

    return html;
};

/**
 * Generates a HTML string for one of the sections in the supplied object to be viewed.
 * @param {Object} viewObject
 * @returns {string}
 * @private
 */
DataView.prototype._generateHTMLSection = function (viewObject) {
    var data = viewObject.data;
    var associations = viewObject.associations;
    var html = '';
    var options = viewObject.options;
    var isDataArray = Array.isArray(data);
    var lastArrayElement = data.length - 1;

    html += DVHelper.openUL(DVHelper.getULAttributesFromOptions(options));

    for (var key in data) {
        html += DVHelper.openLI();

        var currentElement = data[key];

        // Additional check for currentElement mainly to go around null values errors
        if (currentElement && currentElement.options) {
            html += this._generateHTMLFromObject(key, currentElement);
            html += this._generateHTMLSection(currentElement);
            html += this._generateHTMLForEndOfObject(currentElement);
        } else if (currentElement && currentElement._isClickableValueForDataView) {
            html += this._generateHTMLForKeyValuePair(key, DVHelper.formatValueForDataView(key, currentElement));
        } else {
            html += this._generateHTMLForKeyValuePair(key, viewObject);
        }

        if (isDataArray && key < lastArrayElement) {
            html += ',';
        }

        html += DVHelper.closeLI();
    }

    for (var name in associations) {
        var currentAssociation = associations[name];
        html += DVHelper.openLI();
        html += DVHelper.wrapInTag('key', name) + ':&nbsp;' + DVHelper.wrapInTag('value', currentAssociation);
        html += DVHelper.closeLI();
    }

    html += DVHelper.closeUL();
    return html;
};

/**
 * Transform predefined Object to HTML.
 * @private
 */
DataView.prototype._generateHTML = function () {
    var viewObjects = this.getData();
    var html = '';
    var noAvailableData = DVHelper.wrapInTag('no-data', 'No Available Data');

    if (this._isDataEmpty()) {
        this._DataViewContainer.innerHTML = noAvailableData;
        return;
    }

    // Go trough all the objects on the top level in the data structure and
    // skip the ones that does not have anything to display
    for (var key in viewObjects) {
        var currentObject = viewObjects[key];

        if (!DVHelper.getObjectLength(currentObject.data)) {
            html += this._addSectionTitle(currentObject, DVHelper.getNoDataHTML(noAvailableData));
            continue;
        }

        html += this._addSectionTitle(currentObject, this._generateHTMLSection(currentObject));
    }

    this._DataViewContainer.innerHTML = html;
};

/**
 * Adds a title to a section from a view object when transformed to HTML.
 * @param {Object} config
 * @param {string} htmlPart
 * @returns {string}
 * @private
 */
DataView.prototype._addSectionTitle = function (config, htmlPart) {
    var html = '';
    var options = config.options;

    if (options.hideTitle) {
        return htmlPart;
    }

    html += DVHelper.openUL(DVHelper.getULAttributesFromOptions(options));
    html += DVHelper.openLI();

    if (config.options.expandable) {
        html += DVHelper.addArrow(options.expanded);
    }

    html += DVHelper.wrapInTag('section-title', options.title);
    html += htmlPart;
    html += DVHelper.closeLI();
    html += DVHelper.closeUL();

    return html;
};

/**
 * @param {HTMLElement} element
 * @returns {boolean} if value is editable
 * @private
 */
DataView.prototype._isEditableValue = function (element) {
    return element.nodeName === 'VALUE' && element.contentEditable === 'true';
};

/**
 * Mouse click event handler for the editable values.
 * @private
 */
DataView.prototype._onClickHandler = function () {
    var that = this;

    /**
     * Handler for mouse click.
     * @param {Object} event
     */
    this._DataViewContainer.onclick = function (event) {
        var targetElement = event.target;
        var target = DVHelper.findNearestDOMElement(targetElement, 'LI');

        if (!target) {
            return;
        }

        DVHelper.toggleCollapse(target);

        if (that._isEditableValue(targetElement)) {
            that._onBlurHandler(targetElement);
            DVHelper.selectEditableContent(targetElement, that._selectValue);
            that._selectValue = false;
        }

        if (targetElement.nodeName === 'CLICKABLE-VALUE') {
            var attributes = event.target.attributes;
            var key = attributes.key.value;
            var parent = attributes.parent.value;
            var currData = that.getData();
            var eventData;

            if (currData[parent]) {
                eventData = DVHelper.getObjectProperty(currData[parent].data, key).eventData;
            } else {
                // In case of event listeners
                eventData = DVHelper.getObjectProperty(currData, parent + key).eventData;
            }

            that.onValueClick({
                target: key,
                data: eventData
            });
        }

        if (targetElement.nodeName === 'SELECT') {
            that._onChangeHandler(targetElement);
        }

        if (targetElement.nodeName === 'INPUT') {
            that._onCheckBoxHandler(targetElement);
        }
    };
};

/**
 * Enter button event handler for the editable values.
 * @private
 */
DataView.prototype._onEnterHandler = function () {
    var that = this;

    /**
     * Handler for key down.
     * @param {Object} e
     */
    this._DataViewContainer.onkeydown = function (e) {
        if (!that._isEditableValue(e.target)) {
            return;
        }

        that._onBlurHandler(e.target);
        DVHelper.selectEditableContent(e.target, that._selectValue);
        that._selectValue = false;

        if (e.keyCode === 13) {
            e.preventDefault();
            document.getSelection().empty();
            e.target.blur();
        }
    };
};

/**
 * Blur event handler for the editable values.
 * @param {element} target - HTML DOM element
 * @private
 */
DataView.prototype._onBlurHandler = function (target) {
    var that = this;

    if (!target) {
        return;
    }

    /**
     * Handler for blur event.
     * @param {Object} e
     */
    target.onblur = function (e) {
        var propertyData = {};
        var target = e.target;
        var propertyName;
        var value;

        propertyData.controlId = target.getAttribute('data-control-id');

        propertyName = target.getAttribute('data-property-name');
        propertyData.property = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

        value = target.textContent.trim();
        propertyData.value = DVHelper.getCorrectedValue(value);

        that.onPropertyUpdated(propertyData);

        target.removeEventListener('onblur', this);
        that._selectValue = true;
    };
};

/**
 * Change event handler for the selectable values.
 * @param {element} target - HTML DOM element
 * @private
 */
DataView.prototype._onChangeHandler = function (target) {
    var that = this;

    if (!target) {
        return;
    }

    /**
     * Handler for change event.
     * @param {Object} e
     */
    target.onchange = function (e) {
        var propertyData = {};
        var target = e.target;
        var propertyName;
        var value;

        propertyData.controlId = target.getAttribute('data-control-id');

        propertyName = target.getAttribute('data-property-name');
        propertyData.property = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

        value = target.selectedOptions[0].value;
        propertyData.value = DVHelper.getCorrectedValue(value);

        that.onPropertyUpdated(propertyData);

        target.removeEventListener('onchange', this);
        that._selectValue = true;
    };
};

/**
 * Change event handler for the boolean values.
 * @param {element} target - HTML DOM element
 * @private
 */
DataView.prototype._onCheckBoxHandler = function (target) {
    var that = this;

    if (!target) {
        return;
    }

    /**
     * Handler for change event.
     * @param {Object} e
     */
    target.onchange = function (e) {
        var propertyData = {};
        var propertyName;
        var target = e.target;

        propertyData.controlId = target.getAttribute('data-control-id');

        propertyName = target.getAttribute('data-property-name');
        propertyData.property = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

        propertyData.value = target.checked;

        that.onPropertyUpdated(propertyData);

        target.removeEventListener('onchange', this);
        that._selectValue = true;
    };
};

module.exports = DataView;

},{"../ui/JSONFormatter":5,"../ui/helpers/DataViewHelper":8}],5:[function(require,module,exports){
'use strict';

/**
 * Sample usage
 * JSONView = require('../../../modules/ui/JSONFormatter.js');
 * JSONViewFormater.formatJSONtoHTML(sampleJSONData);
 */

/**
 *
 * @param {Object} json
 * @returns {string|HTML}
 * @private
 */
function _syntaxHighlight(json) {
    json = JSON.stringify(json, undefined, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var tagName = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                tagName = 'key';
            } else {
                tagName = 'string';
            }
        } else if (/true|false/.test(match)) {
            tagName = 'boolean';
        } else if (/null/.test(match)) {
            tagName = 'null';
        }
        return '<' + tagName + '>' + match + '</' + tagName + '>';
    });
}

module.exports = {

    /**
     * Create HTML from a json object.
     * @param {Object} json
     * @returns {string}
     */
    formatJSONtoHTML: function (json) {
        return '<pre json>' + _syntaxHighlight(json) + '</pre>';
    }
};

},{}],6:[function(require,module,exports){
'use strict';

/**
 * Returns the HTML for the divider.
 * @returns {string}
 * @private
 */
function _getResizeHolderHTML() {
    return '<divider><handler class="resize-handler"></handler></divider>';
}

/**
 * Manage the display style of the start container.
 * @param {elements} _splitterInstance
 * @param {boolean} skipSizing
 * @private
 */
function _applyInlineStylesForStartContainer(_splitterInstance, skipSizing) {
    var $start = _splitterInstance.$this.querySelector('start');

    $start.style.display = _splitterInstance._hideStartContainer ? 'none' : '';
    if (!skipSizing) {
        $start.style.width = _splitterInstance._startContainerWidth || undefined;
        $start.style.height = _splitterInstance._startContainerHeight || undefined;
    }
}

/**
 * Manage the display style of the end container.
 * @param {elements} _splitterInstance
 * @param {boolean} skipSizing
 * @private
 */
function _applyInlineStylesForEndContainer(_splitterInstance, skipSizing) {
    var $end = _splitterInstance.$this.querySelector('end');

    $end.style.display = _splitterInstance._hideEndContainer ? 'none' : '';
    if (!skipSizing) {
        //$end.style.width = _splitterInstance._endContainerWidth || undefined;
        $end.style.height = _splitterInstance._endContainerHeight || undefined;
    }
}

/**
 * Manage the display style of a close button.
 * @param {element} _splitterInstance
 * @private
 */
function _applyInlineStylesForCloseButton(_splitterInstance) {
    var $closeButton = _splitterInstance.$this.querySelector('close-button');

    if ($closeButton) {
        if (_splitterInstance._hideEndContainer) {
            $closeButton.style.display = 'none';
        } else {
            $closeButton.style.display = 'block';
        }
    }
}

/**
 *
 * @param {element} _splitterInstance
 * @param {boolean} _skipSizing
 * @private
 */
function _applyInlineStyles(_splitterInstance, _skipSizing) {
    var that = _splitterInstance;
    var $end = that.$this.querySelector('end');
    var skipSizing = _skipSizing || false;

    if (that._isEndContainerClosable) {
        $end.setAttribute('verticalScrolling', 'true');
    }

    if (that._endContainerTitle) {
        $end.setAttribute('withHeader', 'true');
    }

    _applyInlineStylesForStartContainer(_splitterInstance, skipSizing);
    _applyInlineStylesForEndContainer(_splitterInstance, skipSizing);
    _applyInlineStylesForCloseButton(_splitterInstance);
}

/**
 *
 * @param {element} splitterInstance
 * @private
 */
function _createEndContainerHeader(splitterInstance) {
    var endContainerHeader = document.createElement('header');
    endContainerHeader.innerHTML = splitterInstance._endContainerTitle;

    splitterInstance.$this.querySelector('end').appendChild(endContainerHeader);
}

/**
 *
 * @param {element} splitterInstance
 * @private
 */
function _createCloseButton(splitterInstance) {
    var closeButtonElement = document.createElement('close-button');
    splitterInstance.$this.querySelector('end').appendChild(closeButtonElement);

    closeButtonElement.onclick = splitterInstance.hideEndContainer.bind(splitterInstance);
}

/**
 * The complete Splitter Options.
 * @typedef {Object} splitterOptions
 * @property {boolean} hideStartContainer - the start dom element will not be rendered (display: none)
 * @property {boolean} hideEndContainer - the end dom element will not be rendered (display: none)
 * @property {boolean} isEndContainerClosable - additional close-button for closing the end element
 * @property {string} startContainerWidth - custom width of the start element
 * @property {string} startContainerHeight - custom height of the start element
 * @property {string} endContainerWidth - custom width of the end element
 * @property {string} endContainerHeight - custom height of the end element
 */

/**
 * Splitter component.
 * @param {string} domId
 * @param {splitterOptions} options
 * @constructor
 */
function SplitContainer(domId, options) {
    this._setReferences(domId);

    /**
     * If options is given and hideStartContainer is true the start (dom) element of the splitter will be hidden (display: none).
     * @type {boolean}
     * @private
     */
    this._hideStartContainer = options && options.hideStartContainer;
    /**
     * If options is given and hideStartContainer is true the end (dom) element of the splitter will be hidden (display: none).
     * @type {boolean}
     * @private
     */
    this._hideEndContainer = options && options.hideEndContainer;
    /**
     * Shows a close button for the end (dom) element of the splitter.
     * @type {boolean}
     * @private
     */
    this._isEndContainerClosable = options && options.isEndContainerClosable;
    /**
     * Set the width and height of the splitter start and end elements.
     */
    this._startContainerWidth = options && options.startContainerWidth ? options.startContainerWidth : undefined;
    this._startContainerHeight = options && options.startContainerHeight ? options.startContainerHeight : undefined;
    this._endContainerWidth = options && options.endContainerWidth ? options.endContainerWidth : undefined;
    this._endContainerHeight = options && options.endContainerHeight ? options.endContainerHeight : undefined;
    this._endContainerTitle = options && options.endContainerTitle ? options.endContainerTitle : undefined;

    _applyInlineStyles(this);

    if (this._endContainerTitle) {
        _createEndContainerHeader(this);
    }

    if (this._isEndContainerClosable) {
        _createCloseButton(this);
    }

    /** @type {boolean}*/
    this.isVerticalSplitter = this.$this.getAttribute('orientation') === 'vertical';

    /**
     * Place the resize holder HTML right after the 'start' element
     */
    this.$this.querySelector(':scope > start').insertAdjacentHTML('afterend', _getResizeHolderHTML());

    this.$this.querySelector('handler').onmousedown = this._mouseDownHandler.bind(this);
}

/**
 * Hide end container.
 */
SplitContainer.prototype.hideEndContainer = function () {
    this._hideEndContainer = true;
    _applyInlineStyles(this, true);
};

/**
 * Show end container.
 */
SplitContainer.prototype.showEndContainer = function () {
    this._hideEndContainer = false;
    _applyInlineStyles(this, true);
};

/**
 * Handler for mousemove.
 * @param {Object} event
 * @private
 */
SplitContainer.prototype._mouseMoveHandler = function (event) {
    var splitContainerRect = this.$this.getBoundingClientRect();

    if (this.isVerticalSplitter) {
        this._$endElement.style.height = (splitContainerRect.top + splitContainerRect.height - event.clientY) + 'px';
    } else {
        this._$endElement.style.width = (splitContainerRect.left + splitContainerRect.width - event.clientX) + 'px';
    }
};

/**
 * Handler for onmouseup.
 * @private
 */
SplitContainer.prototype._mouseUpHandler = function () {
    this.$this.onmousemove = null;
    document.body.classList.remove('user-is-resizing-vertically');
    document.body.classList.remove('user-is-resizing-horizontally');
};

/**
 * Handler for onmousedown.
 * @param {Object} event
 * @private
 */
SplitContainer.prototype._mouseDownHandler = function (event) {
    var that = this;

    event.preventDefault();
    event.stopPropagation();

    // Add class to disable selection of dom elements while dragging
    if (that.isVerticalSplitter) {
        document.body.classList.add('user-is-resizing-vertically');
    } else {
        document.body.classList.add('user-is-resizing-horizontally');
    }

    /**
     * Handler for onmousemove.
     * @param {Object} event
     */
    that.$this.onmousemove = function (event) {
        window.requestAnimationFrame(that._mouseMoveHandler.bind(that, event));
    };

    that.$this.onmouseup = that._mouseUpHandler.bind(that);
};

/**
 * Save references for SplitContainer different HTML elements.
 * @private
 */
SplitContainer.prototype._setReferences = function (domId) {
    this.$this = document.getElementById(domId);
    this._$endElement = this.$this.querySelector(':scope > end');
    this._$startElement = this.$this.querySelector(':scope > start');
};

module.exports = SplitContainer;

},{}],7:[function(require,module,exports){
'use strict';

/**
 * TabBar.
 * @param {string} containerId
 * @constructor
 */
function TabBar(containerId) {
    this._container = document.getElementById(containerId);
    this._contentsContainer = this._container.querySelector('contents');
    this._tabsContainer = this._container.querySelector('tabs');
    this.init();
}

/**
 * Initialize TabBar.
 */
TabBar.prototype.init = function () {
    this.setActiveTab(this.getActiveTab());

    // Add event handler on the tab container
    this._tabsContainer.onclick = this._onTabsClick.bind(this);
};

/**
 * Get current active tab ID.
 * @returns {string}
 */
TabBar.prototype.getActiveTab = function () {
    return this._activeTabId ? this._activeTabId : this._tabsContainer.querySelector('[selected]').id;
};

/**
 * Set active tab ID.
 * @param {string} newActiveTabId
 * @returns {TabBar}
 */
TabBar.prototype.setActiveTab = function (newActiveTabId) {
    if (!newActiveTabId) {
        return;
    }

    if (typeof newActiveTabId !== 'string') {
        console.warn('parameter error: The parameter must be a string');
        return;
    }

    if (!this._tabsContainer.querySelector('#' + newActiveTabId)) {
        console.warn('parameter error: The parameter must be a valid ID of a child tab element');
        return;
    }

    // Check for double clicking on active tab
    if (newActiveTabId === this.getActiveTab()) {
        var activeContent = this._contentsContainer.querySelector('[for="' + this.getActiveTab() + '"]');

        if (activeContent.getAttribute('selected')) {
            return;
        }
    }

    this._changeActiveTab(newActiveTabId);
    this._activeTabId = newActiveTabId;

    return this;
};

/**
 * Event handler for mouse click on a tabs.
 * @param {Object} event - click event
 * @private
 */
TabBar.prototype._onTabsClick = function (event) {
    var targetID = event.target.id;
    this.setActiveTab(targetID);
};

/**
 * Change visible tab and content.
 * @param {string} tabId - The Id of the desired tab
 */
TabBar.prototype._changeActiveTab = function (tabId) {
    var currentActiveTab = this._tabsContainer.querySelector('[selected]');
    var currentActiveContent = this._contentsContainer.querySelector('[for="' + this.getActiveTab() + '"]');
    var newActiveTab = this._tabsContainer.querySelector('#' + tabId);
    var newActiveContent = this._contentsContainer.querySelector('[for="' + tabId + '"]');

    currentActiveTab.removeAttribute('selected');
    currentActiveContent.removeAttribute('selected');

    newActiveTab.setAttribute('selected', 'true');
    newActiveContent.setAttribute('selected', 'true');
};

module.exports = TabBar;

},{}],8:[function(require,module,exports){
'use strict';

/**
 * Generates attributes in HTML.
 * @param {Object} attributes
 * @returns {string}
 * @private
 */
function _generateTagAttributes(attributes) {

    var html = '';
    if (attributes) {
        for (var key in attributes) {
            html += ' ' + key + '="' + attributes[key] + '"';
        }
    }
    return html;
}

/**
 * @param {Object} attributes
 * @returns {string}
 * @private
 */
function _openUL(attributes) {
    var html = '';
    var attributesHTML = _generateTagAttributes(attributes);

    html = '<ul' + attributesHTML + '>';
    return html;
}

/**
 * Create "ul" closing tag.
 * @returns {string}
 * @private
 */
function _closeUL() {
    return '</ul>';
}

/**
 * Create "li" opening tag.
 * @returns {string}
 * @private
 */
function _openLI() {
    return '<li>';
}

/**
 * Create "li" closing tag.
 * @returns {string}
 * @private
 */
function _closeLI() {
    return '</li>';
}

/**
 * @param {Object|Array} element
 * @returns {number}
 * @private
 */
function _getObjectLength(element) {

    if (element && typeof element === 'object') {
        return Object.keys(element).length;
    }

    return 0;
}

/**
 * @param {boolean} isExpanded - configures the direction of the arrow
 * @returns {string}
 * @private
 */
function _addArrow(isExpanded) {
    var direction = isExpanded ? 'down' : 'right';
    return '<arrow ' + direction + '="true"></arrow>';
}

/**
 * Adding 'select' HTML Element options with data for the property variations.
 * @param {string} value
 * @param {Object} type
 * @returns {string}
 * @private
 */
function _generateValueOptions(value, type) {
    var html = '';
    var types;
    var i;

    if (Object.keys(type).length)
    {
        types = Object.keys(type);

        for (i = 0; i < types.length; i++) {
            html += '<option value="' + type[types[i]] + '"' + (type[types[i]] === value ? ' selected' : '') + '>' +
                types[i] + '</option>';
        }

    }

    return html;
}

/**
 * @param {string} tag - name of HTML tag
 * @param {string|number|boolean} value
 * @param {Object} attributes
 * @returns {string}
 * @private
 */
function _wrapInTag(tag, value, attributes) {
    var html = '';

    if (!tag || typeof tag !== 'string') {
        return html;
    }

    html += '<' + tag;
    html += _generateTagAttributes(attributes);
    html += '>' + value + '</' + tag + '>';
    return html;
}

/**
 * @param {string|number|boolean} value
 * @param {Object} attributes
 * @param {Object} type - predefined type
 * @returns {string}
 * @private
 */
function _wrapInSelectTag (value, attributes, type) {
    var html = '';

    html += '<select';
    html += _generateTagAttributes(attributes);
    html += '>' + (type ? _generateValueOptions(value, type) : value) + '</select>';
    return html;
}

/**
 * @param {boolean} value
 * @param {Object} attributes
 * @returns {string}
 * @private
 */
function _wrapInCheckBox (value, attributes) {
    var html = '';

    attributes.id = attributes['data-property-name'];

    html = '<input verical-aligment type="checkbox"';
    html += _generateTagAttributes(attributes);
    html += value ? ' checked />' : ' />';
    html += '<label verical-aligment for="';
    html += attributes.id;
    html += '" gray>';
    html += value;
    html += '</label>';

    return html;
}

/**
 * Check if property value needs quotes.
 * @param {string|boolean|number|null} value
 * @param {string} valueWrappedInHTML
 * @returns {string|boolean|number|null}
 * @private
 */
function _valueNeedsQuotes(value, valueWrappedInHTML) {

    if (typeof value === 'string') {
        return '&quot;' + valueWrappedInHTML + '&quot;';
    }

    return valueWrappedInHTML;
}

/**
 * @param {Array|Object} element
 * @returns {string}
 * @private
 */
function _addKeyTypeInfoBegin(element) {

    if (Array.isArray(element)) {
        return '[';
    }

    return '{';
}

/**
 * @param {Array|Object} element
 * @returns {string}
 * @private
 */
function _addKeyTypeInfoEnd(element) {
    var html = '';
    var noOfElements = _getObjectLength(element);
    var collapsedInfo = Array.isArray(element) ? noOfElements : '...';

    if (noOfElements) {
        html += _wrapInTag('collapsed-typeinfo', collapsedInfo);
    }

    if (Array.isArray(element)) {
        html += ']';
    } else {
        html += '}';
    }

    return html;
}

/**
 * Search for the nearest parent Node within the bounds of the DATA-VIEW parent.
 * @param {element} element - HTML DOM element that will be the root of the search
 * @param {string} targetElementName - The desired HTML parent element nodeName
 * @returns {Object} HTML DOM element
 * @private
 */
function _findNearestDOMElement(element, targetElementName) {
    while (element.nodeName !== targetElementName) {
        if (element.nodeName === 'DATA-VIEW') {
            element = undefined;
            break;
        }
        element = element.parentNode;
    }

    return element;
}

/**
 * @param {element} target - HTML DOM element
 * @returns {boolean}
 * @private
 */
function _toggleCollapse(target) {
    var expandableLIChild = target.querySelector(':scope > ul');
    var arrow = target.querySelector(':scope > arrow');

    if (!arrow) {
        return false;
    }

    if (arrow.getAttribute('right') === 'true') {
        arrow.removeAttribute('right');
        arrow.setAttribute('down', 'true');

        expandableLIChild.setAttribute('expanded', 'true');
    } else if (arrow.getAttribute('down') === 'true') {
        arrow.removeAttribute('down');
        arrow.setAttribute('right', 'true');

        expandableLIChild.removeAttribute('expanded');
    }

    return true;
}

/**
 * Get the needed attributes for an opening UL tag.
 * @param {Object} options
 * @returns {Object}
 * @private
 */
function _getULAttributesFromOptions(options) {
    var attributes = {};

    if (options.expandable) {
        attributes.expandable = 'true';
    }

    if (options.expanded) {
        attributes.expanded = 'true';
    }

    return attributes;
}

/**
 * Appropriately wraps in HTML the No Available Data text.
 * @param {string} html
 * @returns {string}
 * @private
 */
function _getNoDataHTML(html) {
    var htmlString = '';
    htmlString += _openUL({
        'expanded': 'true'
    });
    htmlString += _openLI();
    htmlString += html;
    htmlString += _closeLI();
    htmlString += _closeUL();

    return htmlString;
}

/**
 * This function selects the content of an editable value holder.
 * @param {HTMLElement} element
 * @param {boolean} shouldSelect
 * @returns {Range} range the range that is selected
 * @private
 */
function _selectEditableContent(element, shouldSelect) {
    if (shouldSelect) {
        var range = document.createRange();
        range.selectNodeContents(element);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        return range;
    }
}

/**
 *
 * @param {string} key
 * @param {Object} currentElement
 * @returns {Object}
 * @private
 */
function _formatValueForDataView(key, currentElement) {
    var requiredFormat = {
        data: {}
    };
    requiredFormat.data[key] = currentElement.value;

    return requiredFormat;
}

/**
 * Determines if value is boolean, number or string.
 * @param {string|number|boolean} value
 * @returns {boolean|string|number}
 * @private
 */
function _getCorrectedValue(value) {

    if (value === 'true' || value === 'false') {
        value = (value === 'true');
    } else if (value === '') {
        value = null;
    } else if (!isNaN(+value) && value !== null) {
        value = +value;
    }

    return value;
}
/**
 * Access (nested) object properties by a full path similar to.
 * @param {Object} sourceObject
 * @param {string} path
 * @returns {any}
 * @private
 */
function _getObjectProperty(sourceObject, path) {
    if (path === undefined || path === null) {
        return undefined;
    }
    // Strip leading slash.
    path = path.replace(/^\//, '');
    return path.split('/').reduce(function (currentObject, currentPath) {
        return currentObject ? currentObject[currentPath] : undefined;
    }, sourceObject);
}

module.exports = {
    addArrow: _addArrow,
    addKeyTypeInfoBegin: _addKeyTypeInfoBegin,
    addKeyTypeInfoEnd: _addKeyTypeInfoEnd,
    closeLI: _closeLI,
    closeUL: _closeUL,
    findNearestDOMElement: _findNearestDOMElement,
    formatValueForDataView: _formatValueForDataView,
    getCorrectedValue: _getCorrectedValue,
    getObjectLength: _getObjectLength,
    getObjectProperty:_getObjectProperty,
    getULAttributesFromOptions: _getULAttributesFromOptions,
    getNoDataHTML: _getNoDataHTML,
    openUL: _openUL,
    openLI: _openLI,
    selectEditableContent: _selectEditableContent,
    toggleCollapse: _toggleCollapse,
    wrapInTag: _wrapInTag,
    wrapInSelectTag: _wrapInSelectTag,
    wrapInCheckBox: _wrapInCheckBox,
    valueNeedsQuotes: _valueNeedsQuotes
};

},{}],9:[function(require,module,exports){
'use strict';

/**
 * @typedef {Object} resolveMessageOptions
 * @property {Object} message - port.onMessage.addListener parameter
 * @property {Object} messageSender - port.onMessage.addListener parameter
 * @property {Object} sendResponse - port.onMessage.addListener parameter
 * @property {Object} actions - Object with all the needed actions as methods
 */

/**
 * Calls the needed message action.
 * @param {resolveMessageOptions} options
 * @private
 */
function _resolveMessage(options) {
    if (!options) {
        return;
    }

    var message = options.message;
    var messageSender = options.messageSender;
    var sendResponse = options.sendResponse;
    var actions = options.actions;
    var messageHandlerFunction = actions[message.action];

    if (messageHandlerFunction) {
        messageHandlerFunction(message, messageSender, sendResponse);
    }
}

/**
 * Convert UI5 timestamp to readable date.
 * @param {string} timeStamp  - timestamp in UI5 format ("20150427-1201")
 * @returns {string|undefined}
 * @private
 */
function _convertUI5TimeStampToHumanReadableFormat(timeStamp) {
    var formattedTime = '';

    if (!timeStamp) {
        return;
    }

    // Year
    formattedTime += timeStamp.substr(0, 4) + '/';
    // Month
    formattedTime += timeStamp.substr(4, 2) + '/';
    // Date
    formattedTime += timeStamp.substr(6, 2);

    formattedTime += ' ';

    // Hour
    formattedTime += timeStamp.substr(9, 2) + ':';
    // Minutes
    formattedTime += timeStamp.substr(11, 2) + 'h';

    return formattedTime;
}

/**
 * Set specific class for each OS.
 * @private
 */
function _setOSClassNameToBody() {
    // Set a body attribute for detecting and styling according the OS
    var osName = '';
    if (navigator.appVersion.indexOf('Win') !== -1) {
        osName = 'windows';
    }
    if (navigator.appVersion.indexOf('Mac') !== -1) {
        osName = 'mac';
    }
    if (navigator.appVersion.indexOf('Linux') !== -1) {
        osName = 'linux';
    }

    document.querySelector('body').setAttribute('os', osName);
}

/**
 * Applies the theme. Default is light.
 * @private
 */
function _applyTheme(theme) {
    var oldLink = document.getElementById('ui5inspector-theme');
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    var url = '/styles/themes/light/light.css';

    if (oldLink) {
        oldLink.remove();
    }

    if (theme === 'dark') {
        url = '/styles/themes/dark/dark.css';
    }

    link.id = 'ui5inspector-theme';
    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
}

module.exports = {
    formatter: {
        convertUI5TimeStampToHumanReadableFormat: _convertUI5TimeStampToHumanReadableFormat
    },
    resolveMessage: _resolveMessage,
    setOSClassName: _setOSClassNameToBody,
    applyTheme: _applyTheme
};

},{}],10:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],11:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":10,"buffer":11,"ieee754":13}],12:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

function isSpecificValue(val) {
	return (
		val instanceof Buffer
		|| val instanceof Date
		|| val instanceof RegExp
	) ? true : false;
}

function cloneSpecificValue(val) {
	if (val instanceof Buffer) {
		var x = Buffer.alloc
			? Buffer.alloc(val.length)
			: new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

function safeGetProperty(object, property) {
	return property === '__proto__' ? undefined : object[property];
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = safeGetProperty(target, key); // source value
			val = safeGetProperty(obj, key); // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":11}],13:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[2]);
