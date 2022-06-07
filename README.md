# gimme-food

A mock API to get food based images &amp; videos from unplash.

## Getting Started

All the code runs from inside the `functions` folder. This configuration is intentional.
You need the local `.env` file and you can ping `WrathOfZombies` for the same.
Also make sure to install the recommended vscode extensions.

### Installation

First off you need access to `firebase-tools`. So you can get that using:

```sh
npm i -g firebase-tools
```

Once you have that, go to the functions folder and call `firebase init`. Choose the option to setup emulators and follow the on screen instructions. Then choose `yes` when asked to download the emulators. Once the emulators are setup, you can now get cracking.

### Running the code locally

Go head and run the following scripts to get the typescript built out

```sh
cd functions
yarn install
yarn build:watch

# In a separate terminal
# Starts the emulators
firebase emulators:start
```

At some point you should see a status that the emulators are running.
Now open `api.http` and if you the rest client, you should be able to send requests in the right order.

### Port issues

If your port gets blocked run:

```
lsof -ti tcp:9199 | xargs kill -9
lsof -ti tcp:5001 | xargs kill -9
```
