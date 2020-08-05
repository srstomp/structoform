# Structoform
A form builder for React

## Installation
```sh
# yarn
yarn add structoform
# npm
npm install structoform
```

## Supported form elements
* Checkbox
* DateField
* SelectField
* Radio Button
* TextArea
* TextField

## Steps for local developement
* run `npm link`
* run `npm run prepare` to build the package

## Api documentation

### `<Form>`

#### `jsonConfig={ string }`
An optional string containing a JSON parsable object. The contents of this object may override the `className`, `layout`, `layoutDirection` or `initValues` prop.

#### `className={ string }`
A className string to append to the `<form>` wrapper className.

#### `layout={ object }`
An object containing all the form fields, indexed by a unique key.
```js
const layout = {
    name: {
        // field props
    },
    organisation: {
        // field props
    },
    email: {
        // field props
    },
}
```

#### `layoutDirection={ string }`
Determines how labels should position themselves relative to their respective form element. Specify either `"row"` or `"column"`.

#### `submitButton={ node }`
A react element consisting of or containing a `<button>`, to trigger the form `onSubmit` logic.

#### `onSubmit={ func }`
Callback function for submit logic

## Things todo
- [ ] Write documentation
- [ ] Add test
- [ ] Password Field
- [ ] Phone Field
- [ ] Autosuggest / Autocomplete
- [ ] Restrict input of DateField
- [ ] Support multiple languages
