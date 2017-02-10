+++
chapter = true
date = "2017-02-12T10:00:00-00:00"
icon = "<b>3.2. </b>"
prev = "/03.authz.rs/01.imports"
next = "/03.authz.rs/03.variable_bindings"
title = "Global Statics"
weight = 50
+++

## <center>Global Statics</center>

```rust
static PART_DELIMETER: &'static str = ":";
static SUBPART_DELIMETER: &'static str = ",";
```

A string primitive is represented in Rust as ``&'static str``.  Declaring that string as [static](https://doc.rust-lang.org/book/const-and-static.html#static) makes the string accessible throughout the **authz** module and does not inline the variable upon use (it gets a fixed memory location).  Statics live for the entire lifetime of the Rust program.  Note the use of the single apostrophe following the ampersand:  this denotes the use of a [lifetime](https://doc.rust-lang.org/book/lifetimes.html).
