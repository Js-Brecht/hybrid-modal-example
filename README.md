## Gatsby Hybrid Data-Fetching w/ Modal Example


### Getting started

* Clone repo

```sh
git clone https://github.com/Js-Brecht/hybrid-modal-example
```

* Download dependencies

```sh
cd hybrid-modal-example
yarn
```

### Unsplash Setup

I used `unsplash` in this example, so that I could mimic retrieving data from an external server.

Because of that, their API guidelines must be followed, which will require an API key.  It's free
so no worries.

You will first need an account, which you can make [here](https://unsplash.com/join).

Then you will need to make an app, which you can do [here](https://unsplash.com/oauth/applications/new).

Once you've made an app, go to it, and scroll down to where it says Keys.  Copy the Access Key.

Now, in the root directory of the project, create a file called `.env`, and put in a line that reads

```sh
GATSBY_UNSPLASH_ACCESS_KEY=<UnsplashKey>
```

_(replace "\<UnsplashKey\>" with the key you copied in the previous step)_

### Run the app

```sh
yarn develop
```
