+++
chapter = true
date = "2017-02-12T10:00:00-00:00"
icon = "<b>3.11. </b>"
prev = "/03.authz.rs/10.fn_part_from_str"
next = "/03.authz.rs/12.perms_from_buffer"
title = "fn is_permitted_from_str"
weight = 140
+++

## <center>fn is_permitted_from_str</center>
<hr/>

```rust
pub fn is_permitted_from_str<'a, I>(required_perm: &str, assigned_perms: I) -> i32
    where I: IntoIterator<Item = &'a str>
{
    let required_permission = Permission::new(&required_perm);

    for assigned in assigned_perms {
        let assigned_permission = Permission::new(assigned);
        if assigned_permission.implies_from_perm(&required_permission) {
            return 1;
        }
    }
    return 0;
}
```
*is_permitted_from_str* determines whether a required permission, expressed as a borrowed string, is satisfied by permissions assigned to a user, expressed as an iterator of borrowed strings.

*is_permitted_from_str* is a function that is generic over one type, I.  The where clause constrains (bounds) what type is accepted for I:  a type that implements IntoIterator and whose items are strings.  This approach is used so that the function that calls *is_permitted_from_str* doesn't have to convert its dataset into a collection prior to passing it.
