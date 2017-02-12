+++
chapter = true
date = "2017-02-12T10:00:00-00:00"
icon = "<b>3.6. </b>"
prev = "/03.authz.rs/05.deserializable_permission"
next = "/03.authz.rs/07.lifetimes"
title = "Permission Implementation"
weight = 90
+++

## <center>Permission Implementation</center>
<hr/>

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
