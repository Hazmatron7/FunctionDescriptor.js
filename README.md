# FunctionDescriptor.js
A function that returns an object with information describing the function. This works with user and non-user defined functions.



# Usage:
```javascript

function test(name) {
  return "hello " + name;
}

//parameter MUST be a function or otherwise it will throw a TypeError
let info = describeFunction(test);

info.name; // => "test"
info.params; // => ["name"];
info.type; // => "function";



// This below will throw a TypeError because the parameter is not a "function"
describeFunction(null);
```


# return value

```describeFunction()``` returns an object with these properties: 
| Property  | Value  | Description |
| :----     | :----: | :---------: |
| .name     | String | Returns the name of the function. |
| .type     | String | Returns a string with the type of defined function with one of these values: "function", "class", "arrow", "getter", "setter". |
| .params   | String[] | Returns an Array with the names of the parameters. This does <strong>not</strong> return the parameter value! However, this can return an empty array as it only collects named parameters in the function code. |
| .isNative | Boolean | Returns a boolean indicating it has only *native code* in the function. |
| .isBound | Boolean  | Returns a boolean indicating that the function is a bind function that was created from ```.bind()```. |
| .isBindable | Boolean | Returns a boolean indicating that this function can be used with ```.bind()```. |
| .isAsync | Boolean | Returns a boolean indicating that this function is an AsyncFunction. |
| .isGenerator | Boolean | Returns a boolean indication thatthis function is a GeneratorFunction


# Example:

This example below checks if the function is an AsyncGeneratorFunciton Object
```javascript

funciton isAsyncGenerator(fn) {
  let info = describeFunction(fn);
  return info.isAsync && info.isGenerator;
}

async function* myAsync() {}


isAsyncGenerator(myAsync); // expected output: true

```

