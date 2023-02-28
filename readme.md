# JS2CP

A Javascript to C++ "Translator", built from Node.js!

# Installation

#### Local install

    npm install js2cp

# Usage
#### Local usage

    const js2cp = require("js2cp")
    js2cp.translate("Path to js program") //js2cp.translate("test.js")

# Examples

---

Let's assume u have your extra powerful hello world program.

> helloWorld.js

With insane "Hello World!" code inside

    console.log("Hello World!")

#### How to translate

```Javascript
const js2cp = require("js2cp")
js2cp.translate("./helloWorld.js")
```


This will create a new file.In our case **helloWorld.cpp**

> ./helloWorld.cpp

    #include <iostream>

    int main(){

    std::cout <<"Hello World!"<< std::endl;

    // If you want to pause the program at the end just uncomment line below
    // system("pause>0")
    };

# Info

Translator does not support the "frontend technologies", like document.querySelector etc. So please, don't even try it, it will compile with bugs.

JS2CP is build for "competetive programming" applications. That means, with logic of complexity in js functions.

JS2CP is still under development, so use it wisely.

PSS: If you have any questions or complaints, please open issue on the GitHub https://github.com/borecjeborec1/
