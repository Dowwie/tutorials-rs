# Overview

This project teaches Rust concepts using Permission-based authorization as its case study. A Permission states what behavior can be performed in an application but not who can perform it. Permissions are modeled such that a developer may choose an appropriate level of detail (granularity) that suits the authorization policy governing a software
application. For more information about permission-based authorization, read the [Yosai documentation about authorization](https://yosaiproject.github.io/yosai/authorization).

Permission-based authorization is made possible through interaction with a Permission data type.  A Permission type is evaluated and compared with another Permission type, determining whether one implies the other.  Authorization is granted when the Permission(s) assigned to a user imply the Permission(s) that are required to perform a
behavior in a system.  Consequently, the Permission struct and its implementation are the subject of this project.

------------------------------------------------------------


## crate imports

```rust
extern crate serde;
extern crate serde_json;
```
The **serde** crate is used for serialization and deserialization.  We import
the main library and its json subsidiary with these lines:


------------------------------------------------------------

## data structure imports
```rust
use std::str;
use std::error::Error;
use std::collections::HashSet;
```

``use crate::module::etc`` is the standard convention to import specific "objects" from a crate/module

------------------------------------------------------------

##  Global Constants Declaration
```rust
static PART_DELIMETER: &'static str = ":";
static SUBPART_DELIMETER: &'static str = ",";
```

A string primitive is represented in Rust as ``&'static str``.  Declaring that string as [static](https://doc.rust-lang.org/book/const-and-static.html#static) makes the string accessible throughout the **authz** module and does not inline the variable upon use (it gets a fixed memory location).  Statics live for the entire lifetime of the Rust program.

------------------------------------------------------------

## The Permission Struct

A [struct](https://doc.rust-lang.org/book/structs.html) is the construct used in Rust to create more complex data types.  It allows a developer to manage state and associated behaviors, similar to the role of a class in object oriented languages.

A Permission type is modeled as a 3-field struct:
```rust
pub struct Permission {
    pub domain: String,
    pub actions: HashSet<String>,
    pub targets: HashSet<String>
}
```

Suppose we were to model a permission that describes a bank account withdrawal from a particular bank account: ``bankaccount:withdrawal:account12345``.  In this example, our Permission's domain is ``bankaccount`` , actions is a HashSet (of Strings) containing the ``withdraw`` String, and targets is a HashSet (of Strings) containing the ``account12345`` String.

This struct definition would have sufficed had we not needed to be able to (de)serialize instances of a Permission.  However, since Permissions are serializable, we must update the struct definition accordingly.

------------------------------------------------------------

# A (De)Serializable Permission Struct

```rust
#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct Permission {
    #[serde(default = "default_part")]
    domain: String,

    #[serde(default = "default_hash_part")]
    actions: HashSet<String>,

    #[serde(default = "default_hash_part")]
    targets: HashSet<String>
}

## Attributes

```
Notice how Permission and its three fields are each decorated by a line beginning with "#[...]".  This hash-bracket syntax denotes the use of Rust [Attributes](https://doc.rust-lang.org/book/attributes.html).
An Attribute is used in a declarative style of programming, decorating its target below.


```rust
#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct Permission {
    ...
}
```

The *derive* Attribute automatically generates traits for data structures. This particular declaration derives 4 traits for Permission: Debug, PartialEq, Serialize, and Deserialize.


### Custom Attributes

```rust
#[serde(default = "default_part")]
domain: String,

#[serde(default = "default_hash_part")]
actions: HashSet<String>,

#[serde(default = "default_hash_part")]
targets: HashSet<String>
```

These are customized Attributes in that they are not sourced from Rust's standard library of Attributes.
Rust supports customized Attributes only under one condition:  that the custom Attribute(s) is for "something" being derived.  In this example, our custom ``#[serde(...)]`` Attribute is allowed by the Rust compiler because the Attribute is decorating a field that is part of a struct that is having a Deserialize trait derived for it.  The Deserialize trait makes use of the ``#[serde(...)]`` attribute when it needs to obtain a default value for the decorated field.  In this example, we are declaring a function to call for a default field value.  For instance, the "default_hash_part" function is called by serde during deserialization when no value is available for the ``actions`` field.


## Default-Value Functions for Serde Deserialization

Serde calls the following functions to obtain default values for fields unpresented in serialized messages.

```rust
fn default_part() -> String {
    "*".to_string()
}
```
The function ``default_part`` is a very basic function that converts a string primitive to a String and returns the String.  There are [two types of strings](http://rustbyexample.com/std/str.html) in Rust:  ``&str`` and ``String``.  ``"*"`` is a string primitive, represented in Rust as ``&str``.  We convert this
primitive to a String type by calling the to_string() method of the str primitive.

```rust
fn default_hash_part() -> HashSet<String> {
    ["*"].into_iter().map(|s| s.to_string()).collect()
}
```
The function ``default_hash_part`` returns a HashSet (of Strings).
["*"] is a single-string array, represented as ```[&str; 1]``.  It is converted *into* an iterator that has, as part of its api, a ``map`` function that executes a string conversion closure for each element of the iterator.  Once the mapping finishes, the collect function gathers all of the elements of the iterator together and stores the Strings into a HashSet<String>.

------------------------------------------------------------

# Permission Implementation

```rust
impl<'a> Permission{
    pub fn new(wildcard_perm: &str) -> Permission { ... }
    fn part_from_str(s: Option<&str>) -> HashSet<String> {
    fn init_parts(wildcard_perm: &str) -> (String, HashSet<String>, HashSet<String>) {
    pub fn implies_from_str(&self, wildcard_permission: &str) -> bool {
    pub fn implies_from_perm(&self, permission: &Permission) -> bool {
}
```
``impl Permission`` begins the implementation of the Permission struct.  This particular implementation includes *associated functions* and *methods*.

## Associated Functions
    A function within a type implementation that doesn't accept ``self`` as a parameter is considered an *associated function*.  There are *three* associated functions implemented for Permission:

    1. new(wildcard_perm: &str)
    2. part_from_str(s: Option<&str>)
    3. init_parts(wildcard_perm: &str)


    The syntax for calling associated function is ``Permission::function(...)``.  For example:
```rust
    let p: Permission = Permission::new("domain:action1,action2");
```

## Methods
    Methods are function that include a reference to ``self`` as the first argument.  There are *two* methods implemented for Permission:

    1. implies_from_str(&self, wildcard_permission: &str)
    2. implies_from_perm(&self, permission: &Permission)

    The syntax for calling methods requires a Permission instance.  For example,
    we call ``implies_from_perm`` from instance ``permission_1``:
```rust
    let permission_1: Permission = Permission::new("domain:action1,action2");
    let permission_2: Permission = Permission::new("domain:action1");

    permission1.implies_from_perm(permission2);
```


------------------------------------------------------------

```rust
impl<'a> Permission
```
------------------------------------------------------------


Notice how ``impl`` is proceeded by ``<'a>``.  This is the convention used to define a [lifetime parameter](https://doc.rust-lang.org/book/lifetimes.html), which we have named ``a``.  Rust forces programmers to take ownership of how long their objects will exist in memory when the compiler cannot infer object lifetime on its own.  We use the single apostrophe followed by the name of the lifetime when we scope our activities within a lifetime.

------------------------------------------------------------

## Permission Constructor

pub fn new(wildcard_perm: &str) -> Permission {
    let (domain, actions, targets) = Permission::init_parts(wildcard_perm);
    let perm = Permission {
        domain: domain,
        actions: actions,
        targets: targets,
    };
    perm
}



------------------------------------------------------------

## Lifetimes
Types sharing a lifetime

<dowwie> is it simply that the fields of my poorly named struct Fields all share a lifetime
<dowwie> qhris:  in other words, how do you describe this to someone who isn't familiar with lifetimes
<qhris> dowwie: from what i understand, it's saying that you expect the references to be valid for the lifetime 'a
<qhris> and in this case rust assign the 'a lifetime to the scope of your function, saying the Fields struct should live at least that long
<qhris> and since the string literals are 'static, it works out fine
<qhris> that's the way I understand it, but I might be wrong since I'm still pretty new to this as well.
<zaphar_ps-M> specifically they must be valid for *at least* the lifetime 'a
<zaphar_ps-M> but they are certainly free to be valid for longer.
<zaphar_ps-M> and since 'static is longer all is good.
<qhris> ^ yea
<Arnavion> Specifically, the borrows must live atleast as long as 'a. That the struct also has a lifetime of 'a is because of the fact that it has fields with lifetime 'a
<dowwie> Arnavion:  interesting, I'd have assumed it was the other way around (fields use 'a because Struct does)
<zaphar_ps-M> well the struct because it has a reference to something with a lifetime 'a must also live at least as long as lifetime 'a
<Arnavion> 'a on the struct definition is just a lifetime parameter. It doesn't say anything about what it means
<Arnavion> You could have Fields<'a, 'b, 'c>. Just from that it doesn't say anything about Field's lifetime wrt 'a or 'b or 'c. It matters how they're used
<zaphar_ps-M> the parameters just define the relationship between the lifetimes though right?
<Arnavion> (That was in response to dowwie's question)
<zaphar_ps-M> you can be explicit about it or you can let the compiler infer it.
<zaphar_ps-M> but everything has a lifetime.
<Arnavion> zaphar_ps-M: In definitions you need to explicitly annotate lifetimes for borrows
<Arnavion> ie   struct Foo { bar: &Bar }   is an error
<zaphar_ps-M> right because that's one the cases were it can't be inferred.
<Arnavion> Eh, it can be inferred. The compiler just chooses not to
<zaphar_ps-M> sure.
<Arnavion> It could have elision rules similar to how functions have them
<zaphar_ps-M> the code to infer it has not been written.
<zaphar_ps-M> therefore the compiler can not infer it.
the useful rule of thumb is a lifetime defines the minimum something must be valid for in relation to the other lifetimes but not the maximum.
lifetimes: https://doc.rust-lang.org/beta/nomicon/lifetimes.html
lifetime elision: https://doc.rust-lang.org/beta/nomicon/lifetime-elision.html

- The borrow checker always tries to minimize the extent of a lifetime

```rust
fn as_str(data: &u32) -> &str {
    let s = format!("{}", data);
    &s
}
```

desugars to:

```rust
fn as_str<'a>(data: &'a u32) -> &'a str {
    'b: {
        let s = format!("{}", data);
        return &'a s;
    }
}
```
