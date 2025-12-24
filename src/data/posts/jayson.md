---
title: Jayson - Parsing JSON naively
description: Notes on writing a naive JSON parser in Rust
date: "2025-12-24"
categories:
  - rust
  - json
  - parser
  - compiler
published: true
---

A certain GingerBill, in one of his various interviews, once said that every programmer should write
a JSON parser at least once in their career. This was later reinforced by Casey Muratori in his
Performance Aware Programming course. Given that my latest obsession is getting back to basics with
as a programmer, these statements resonated strongly with me, for I was already motivated to improve
the foundation of my craft; writing a "low-level" program to peek under the hook of `JSON.parse` was
the catalyst to get my hands dirty with Rust and do just that. I did my best to write pure Rust,
with no dependencies or external help other than googling "what is a lexer" and similar questions. I
did leverage AI to create a set of `.json` files with the major constructs, edge cases, and common
pitfalls to help me test my implementation as I went. This proved enormously helpful in iterating
from the simplest empty object `{}` up to a nested mess of arrays and objects with escape sequences
and uncommon numbers.

> [!NOTE] Repository  
> The results can be found in <https://github.com/lucasvienna/jayson>

## Blind Attempt

As self-described, [JSON](https://www.json.org/json-en.html) is "a lightweight data-interchange
format" based on a subset of JavaScript 1999. Its grammar is extremely simple and comprised of two
element types, objects and arrays, as well as primitive values such as numbers and strings. There is
a wonderful [McKeeman Form](https://www.crockford.com/mckeeman.html) representation of this grammar
on the right hand-side of the page that makes implementing structs for JSON relatively simple.

I only learned of this formal definition _after_ a blind attempt based on previous knowledge of
JavaScript and JSON, which started with a function tuple of `tokenize` and `parse` to perform
lexical analysis followed by a token parsing pass that transformed the monodimensional list of
tokens into my own `JsonValue` struct:

```rust
fn tokenize(string: &str) -> Vec<Token> { ... }
fn parse<'a, I>(tokens: &mut std::iter::Peekable<I>) -> NodeValue
where
    I: Iterator<Item = &'a Token>,
{ ... }
```

`NodeValue` is a simple enum with the potential values:

```rust
enum NodeValue {
    String(String),
    Boolean(bool),
    Number(f64),
    List(Vec<NodeValue>),
    Object(Vec<(String, NodeValue)>),
    Null,
    Empty,
}
```

I also created a `Token` enum with the basic grammar lexicon. I opted for a single `String` token,
since a member is nothing more than `string : element`, where `element` might also be a string. They
only differ in semantics due to context and surrounding tokens.

```rust
enum Token {
    CurlyOpen,
    CurlyClose,
    ArrayOpen,
    ArrayClose,
    Colon,
    Comma,
    String(String),
    Number(f64),
    Boolean(bool),
    Null,
}
```

My initial lexer was a simple, ~30 line loop that iterated over the stringified JSON file and did
some simple mappings based on my idea of value tokens vs syntactic tokens. While minimal, it did
handle the simplest of JSON objects rather well! I had positive integers, strings, booleans, and
null values all working correctly.

```rust
fn tokenize(string: &str) -> Vec<Token> {
    let mut chars = string.chars();
    let mut lex: Vec<Token> = vec![];
    let mut word: Vec<char> = vec![];
    let mut in_word = false;

    loop {
        let char = chars.next();
        if let Some(ch) = char {
            match ch {
                '{' | '}' | '[' | ']' | ':' | ',' => {
                    if !in_word && !word.is_empty() {
                        lex.push(word.iter().collect());
                        word.clear();
                    }
                    lex.push(ch.into());
                }
                '"' => in_word = !in_word,
                _ if ch.is_whitespace() => {
                    if in_word {
                        word.push(ch);
                    }
                    continue;
                }
                _ => {
                    word.push(ch);
                    continue;
                }
            }
        } else {
            break;
        }
    }
    lex
}
```

This initial lexer also taught me how to use match guards in idiomatic fashion. The whitespace
checker ensures that only while inside running words do whitespace characters get added. Another
learning opportunity was the iterator collection that aggregates words into proper value tokens.

This initial implementation was a great starter for me. It showed just how simple the JSON spec
really is, and that anyone can cobble together a passable parser. In this stage, only the basic test
were passing; no negative/scientific numbers, no escape sequences, and no complex constructs.
However, I did have nested objects and arrays. I wrote a short to-do with next steps and left it at
that.

Unfortunately, life took over and the project fell by the wayside. It would be three months before I
picked it back up.

## Second Iteration

Holidays tend to present me with plenty of downtime to read, learn, and code. This year's (2025)
Christmas season, during annual closing, was the perfect time to pick Jayson back up. Reinvigorated
and full of energy, I set to finishing the implementation. Negative and scientific numbers were
first on the block.

My existing method of parsing numbers was based on the iteration collector and string parsing into
`f64`. Mind you, I am aware of `char::is_numeric` and `char::is_digit` with radix 10, but I would
still need to check the negative symbol, as well as others like the decimal separator `.` and
scientific exponent `e`.

```rust
const NUMERIC_CHARS: [char; 10] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

impl<'character> FromIterator<&'character char> for Token {
    fn from_iter<T: IntoIterator<Item = &'character char>>(iter: T) -> Self {
        let string: String = iter.into_iter().collect();
        match string.as_ref() {
            "true" => Token::Boolean(true),
            "false" => Token::Boolean(false),
            "null" => Token::Null,
            "," => Token::Comma,
            ":" => Token::Colon,
            "{" => Token::CurlyOpen,
            "}" => Token::CurlyClose,
            "[" => Token::ArrayOpen,
            "]" => Token::ArrayClose,
            num if num.chars().all(|c| NUMERIC_CHARS.contains(&c) || c == '.') => {
                Token::Number(num.parse().unwrap())
            }
            string => Token::String(string.into()),
        }
    }
}
```

My second iteration did just that, replacing that `|| c == '.'` conditional branch with array
elements describing all possible characters that make up a JSON number value. I also improved
parsing a little with more descriptive panic messages:

```rust
const NUMERIC_CHARS: [char; 15] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '.', 'e', 'E',
];

impl<'character> FromIterator<&'character char> for Token {
    fn from_iter<T: IntoIterator<Item = &'character char>>(iter: T) -> Self {
        let string: String = iter.into_iter().collect();
        match string.as_ref() {
            "true" => Token::Boolean(true),
            "false" => Token::Boolean(false),
            "null" => Token::Null,
            "," => Token::Comma,
            ":" => Token::Colon,
            "{" => Token::CurlyOpen,
            "}" => Token::CurlyClose,
            "[" => Token::ArrayOpen,
            "]" => Token::ArrayClose,
            num if num.chars().all(|c| NUMERIC_CHARS.contains(&c)) => match num.parse() {
                Ok(n) => Token::Number(n),
                Err(e) => {
                    println!("Failed to parse number: {}", e);
                    panic!("{} is an invalid number.", num);
                }
            },
            string => Token::String(string.into()),
        }
    }
}
```

This naive implementation does work, surprisingly. I don't think an array is the best data structure
here, as a set with O(1) lookups or a RegEx based on the specification might be better. That said, I
haven't benchmarked anything, and so this stays for now. Simple isn't necessarily wrong, after all.

## Escape Sequences

The real challenge came when implementing escape sequences. Basic escapes were somewhat simple, even
if my initial solution didn't parse them correctly. It would create a string token whose value
included the literal characters. For example, the end of line control character `\n` would be parsed
as the actual characters `\` and `n`, instead of `0x0A`.

I started by adding an escape sequence flag and a match arm for `'\\'`:

```rust
  '\\' => {
      if in_word && !escape {
          escape = true;
      } else if in_word && escape {
          word.push(ch);
          escape = false;
      }
  }
  'b' | 'f' | 'n' | 'r' | 't' if escape => {
      word.push('\\');
      word.push(ch);
      escape = false;
  }
```

On match, it sets the `escape` flag and moves on. By ignoring Unicode sequences for now, I could add
a check for `escape` in other arms and push the character to the word vector, as seen in this arm's
`else if` branch (which escapes the `\` character). As you can see by the second match arm, I
naively thought that simply pushing the two characters individually would end up giving me the
desired escape sequence. Obviously not, in retrospect.

The solution here was a helper function, since there is no `std` function that magically parses the
literal characters into escape sequences. The other match arms for `"` and `\` already handle those
escaped characters, so I focused on the remaining ones as specified by the grammar:

```rust
fn escape_control_char(ch: char) -> char {
    match ch {
        'b' => '\x08',
        'f' => '\x0C',
        'n' => '\n',
        'r' => '\r',
        't' => '\t',
        _ => ch, // handles \\ and \" which map to themselves
    }
}
// [...]
word.push(escape_control_char(ch));
```

Lastly, Unicode. In JSON, these are always `\uXXXX`, where `X` is a hexadecimal digit. I added an
extra flag for Unicode escape sequences, `unicode`, and a little array to hold the hex digits as
`[char; 4]`. Actually translating this to a proper codepoint was beyond me, and was only solved by
good old StackOverflow. In the end, I opted not to nest loops inside the main lexer loop. As such, a
new catch-all branch arm with a `unicode` guard was the go-to solution.

```rust
// other flags...
let mut uni_chars: [char; 4] = ['0'; 4];
let mut uni_idx = 0;
// [...]
_ if unicode => {
    if uni_idx < 3 && ch.is_ascii_hexdigit() {
        uni_chars[uni_idx] = ch;
        uni_idx += 1;
    } else if uni_idx == 3 {
        uni_chars[uni_idx] = ch;
        uni_idx = 0;
        unicode = false;
        let num: String = uni_chars.iter().collect();
        let code = u32::from_str_radix(&num, 16).unwrap_or(0);
        word.push(char::from_u32(code).unwrap_or('\\u{FFFD}'));
    } else {
        panic!(
            "Not a correct unicode sequence, found {} but expected an ASCII hexdigit.",
            ch
        );
    }
}
```

I'm not sure whether this `else` block is even required, but I haven't tested invalid Unicode escape
sequences yet.

## Afterthoughts

Learning about the very basics of compilers and lexical analysis was lovely. It demystified a
notoriously complex topic for me, causing me to lose some of the fear and reverence reserved for the
almighty "compiler engineers" that we are so used to. That isn't to say I am suddenly one of them,
or that this branch of engineering is easier, but it certainly became approachable.

My JSON parser is what you'd call a single-pass compiler, if you want to treat `NodeValue` as some
sort of AST. I originally intended to lex and parse it at the same time, but this split makes the
program easier to write and reason about (at least for me).

Further, it is neither complete, nor does it handle errors very well. I do not keep track of line
number or column position, start and end, and so on. My token is only its value, with no metadata
whatsoever. This massively simplifies the lexer and subsequent parser, but it does mean that, when
it fails to parse and panics, I get a really bad message and practically no means of debugging other
than stepping through the loop at runtime.
