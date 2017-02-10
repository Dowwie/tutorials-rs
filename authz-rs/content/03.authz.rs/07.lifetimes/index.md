+++
chapter = true
date = "2017-02-12T10:00:00-00:00"
icon = "<b>3.7. </b>"
prev = "/03.authz.rs/06.permission_impl"
next = "/03.authz.rs/08.permission_constructor"
title = "Lifetimes"
weight = 100
+++

## <center>Lifetimes</center>
<hr/>

```rust
impl<'a> Permission
```

We begin the implementation for the Permission struct with the ***impl*** keyword.

Notice how *impl* is proceeded by ***<'a>***.  This is the convention used to define a [lifetime parameter](https://doc.rust-lang.org/book/lifetimes.html), which we have named *a*.  Rust forces programmers to take ownership of how long their objects will exist in memory when the compiler cannot infer object lifetime on its own.  We use the single apostrophe followed by the name of the lifetime when we scope our activities within a lifetime.

When a type reference is annotated with a lifetime parameter (in this case, 'a), we are declaring that the reference (borrow) is to remain valid (live) for *at least* the lifetime of 'a, if not longer.  In other words, we are declaring the minimum lifespan of a variable in memory.  The compiler's borrow checker keeps objects alive in memory for only as long as it needs to.  In the case of this project, ``impl<'a> Permission`` is *required* by the compiler because borrows within the implementation use lifetime 'a and since they exist within the scope of the implemntation, the implementation must also live for at least as long as it's constituents' lifetime 'a.

Everything in Rust has a lifetime.  The reason that you don't see them everywhere is that they are often inferred by the compiler.  However, *borrows* required explicit annotation of lifetimes because the compiler cannot infer an appropriate lifetime for them.
