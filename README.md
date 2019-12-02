# TeachLA Flappy Bird Clone

Welcome! This repository aims to create a **modular** Flappy Bird Clone that is **easily extendable** and **accessible** to use as a tool to inspire others to code. 

## Design Goals

1. The game MUST run without additional software installation.
2. It must be easy to tweak values and add features to give a sense of control and progress (no more than a line of code or two).
3. It must foster engagement with students.

We address our goals as follows:

1. The game is build entirely with vanilla HTML, CSS, and JS - no Node installation required
2. Develop a carefully constructed API modeled off of other game libraries as well as exposing constants and additional functionality in a discrete, easy to edit file.
3. It's Flappy Bird! Students are able to play the game that they create.

## Contributing

**Lifecycle**

These are the current lifecycle methods:
- `load()`
- `pregame()`
- `start()`
- `run()`
- `gameover()`


***`load()`***

This is the entry point into the game and where assets are loaded and sprites are created. `load()` exits when all assets are loaded and then calls `pregame()`.

***`pregame()`***

This is the portion of the game before the main game loop. Here, the game exists in a paused state to allow to player to gather their bearings before starting the game. This method attaches an event listener to enter into the `start()` lifecycle method.

***`start()`***

`start()` should contain code that runs only on the first iteration of the game loop. Here, event listeners and intervals should be set. Most notably, `start()` should set the frequency of the game loop. Immediately afterwards, `start()` calls `run()`.

***`run()`***

The main game loop. This executes at a frequency specified in `start()`, during which the user plays the game. Things such as updating physics, checking collisions, and drawing should occur in this lifecycle method.

***`gameOver()`***

Can be called at any time in `run()`. `gameOver()` in this game happens when the bird retires (hits the ground or hits a pipe). Event listeners and intervals should be cleared as well as any cleanup that is necessary.

**Engine**

Currently, the engine (`engine.js`) contains the `PhysicalSprite` class, which is basically an upgraded sprite that can do physics.

***`PhysicalSprite`***

At its simplest, a `PhysicalSprite` object is just a bounding box that leaves its children to define how it's drawn. **You must overload the `draw()` method!** `draw()` takes zero parameters and returns nothing.

***What can `PhysicalSprite` do?***

`PhysicalSprite`'s strongest attribute is the ability to *do physics*. Specifically, it is able to perform kinematics on itself and also comes with built in collision detection. Use `PhysicalSprite` to create visible entities such as the player, enemies, environment, etc. as well as invisible objects such as scoreboxes or "kill planes". 

**Contribution Guidelines**

Please keep in mind browser compatibility: currently, we are supporting *Chrome*, *Firefox*, *Edge*, and *IE* (possibly).

***Current Known Compatibility Issues:***
- Promises in `load()` in `game.js` (IE)

These can either be polyfilled or replaced with more compatible code.

If there is a feature you would like to add or an issue that needs fixing, please send us a pull request! Remember, we're not trying to build the best game ever, we're tying to create a tool to help inspire others to begin their own coding adventures.