this project toggles the theme of the site between light and dark mode, using variables in css and replacing classes for the whole html page.
this project also focuses on storing the state of the theme, be it light or dark, in a local storage cache, so that even after it resets, it will still stick to the last theme that was selected. However, the local storage is only tied to localhost.3000, if we decided to run a new instance of this project, it will load the default, which is the light-theme.

finally, we deal with a javascript date library, Moment.js, that eases the setting of the date of the post, in that specific format, since the Date() is already inside data.js, and we just use Moment.js to tweak the format of it.
