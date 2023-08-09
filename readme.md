# Introduction

Collection of trazit components

# Running an element's demo
To demoing them :

```
$ cd <component_directory>
<component_directory>$ ./install.sh
<component_directory>$ npm run start
```

For example, to demoing platform-login component :

```
$ cd platform-login
platform-login$ ./install.sh
platform-login$ npm run start
```

# Publish the components
We use yalc tools to pubish and manage the local components. They will be placed on a global directory here ```~/.yalc/packages/```

First of all, install the yalc tools to your system:

$ npm i yalc -g

For further, just follow this link https://www.npmjs.com/package/yalc

To publish them, just run this command :

$ ./yalclink.sh

# Push Update
To sync the latest component updates with the dependent projects, run this command :

```
component_directory$ ../push.sh
```

For example, to push the platform-login update :

```
$ cd platform-login
platform-login$ ../push.sh
```