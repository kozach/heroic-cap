# Heroic Cap
This is page with a timer, after which the page will be reloaded.
Good with server-side file change based on date.

## Installation
First, ensure that you have the latest Node.js and npm installed.

```
git clone git@github.com:kozach/heroic-cap.git
cd heroic-cap
npm install
```
## Usage
Just change start and end date in the app.js file

```
gulp - generate files
gulp watch - watch for changes and auto generate files
gulp proxy - start sharing /build folder
```
The resulting files are in the folder /build