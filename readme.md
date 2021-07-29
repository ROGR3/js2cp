# JS2CP

A Javascript to C++ "Translator", built from Node.js!

# Installation

#### Install globally

    npm install -g js2cp

#### Local install

    npm install js2cp

# Usage

Trust me, use Global package, it's easier and more stable.

#### Global usage

    js2cp <your file> // js2cp test.js

PS: You can you the path too.

    js2cp C:\BestUser\js2cp\is\the\best\test.js

#### Local usage

Do **NOT** use, unless you have to.

    const js2cp = require("js2cp")
    js2cp.execute("Path to js program") //js2cp.execute("test.js")

# Examples

---

Let's assume u have your extra powerful hello world program.

> helloWorld.js

With insane "Hello World!" code inside

    console.log("Hello World!")

#### How to translate

    js2cp helloWorld

This will create a new folder **dist/** In our case **dist/helloWorld.cpp**

#### The output should be in the folder **dist/**

> dist/helloWorld.cpp

    #include <iostream>

    int main(){

    std::cout <<"Hello World!"<< std::endl;

    // If you want to pause the program at the end just uncomment line below
    // system("pause>0")
    };

# Info

Translator does not support the "frontend technologies", like document.querySelector etc. So please, don't even try it, ir will compile with bugs.

Translator is build for "competetive programming" applications. That means, not so huge file with minimum of prebuild js functions.

PS: js2cp is still under development, so use it wisely.

PSS: If you have any questions, complaints please send them to robingrundel@seznam.cz
