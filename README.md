# Timed URL Opener

Automatically open a specific URL at a scheduled time  in your browser 

![screencast](https://github.com/shufo/timed-url-opener/assets/1641039/6f2155e6-ab90-4921-a48c-297380c5e308)

## Features
- Open a specific URL at a scheduled time
  - Frequency by every xx minutes/hours/days, daily, weekday and One-time
- Open in Background option
- You can change Enbaled/Disabled per schedules
- You can change Color schemes (Dark Themes/Light Themes)

## Screenshot

<img height="300" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/a380ab13-39f5-4e26-a9a7-a328322eed57">
<img height="300" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/a311b23e-85cb-4e02-af2c-d57fead33d92">

## Installation

1. Go to [chrome webstore](https://chromewebstore.google.com/detail/timed-url-opener/calnlhiffgiakjlcfngkeljnplocbgpk) and install it.

## Usage

1. Press `Add Schedule` button.

    <img width="186" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/1ad56ead-c4a7-499a-985b-b76d92fb9623">

1. Enter URL you want to Open periodically.

    <img width="463" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/7b3a778f-508f-470f-9361-5d8dc983d516">

1. Specify time frequency and specific time.

    <img width="365" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/2e557347-5032-475a-9c89-ead2fff08a92">

1. If you want to delete schedule, press `Delete` button.

    <img width="393" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/591c0df2-e65d-4700-bffd-514bf3f30d80">

### Theme

You can change theme from sidebar settings

<img width="600" alt="image" src="https://github.com/shufo/timed-url-opener/assets/1641039/7f0f71ec-e7a9-4306-9451-ab2210523f45">

|Light|Nord|Valentine|Retro|Lofi|Cupcake|
|--|--|--|--|--|--|
|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/e8438d12-8561-4d53-b7d0-6973d1645b5e">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/ca933492-e14c-4983-813d-2e253af63f18">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/2c7961a9-7eb9-42bd-8e7e-a578adf52d38">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/2523d004-2077-44d2-bc28-a2cd3177752f">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/056f5c87-aded-4217-86ce-0d7e10f84cfd">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/1b3efe0b-074d-4430-a5a2-cd85c6d484a5">|

|Dark|Dracula|Dim|Synthwave|Sunset|Coffee|
|--|--|--|--|--|--|
|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/64e8cdda-fed7-4618-981b-b7a7a8883374">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/fac8fd35-bae8-425f-a673-ff4e6e09f601">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/5fd5db96-0c39-4825-b358-6454b5190c20">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/ba3a6a96-c322-45a9-858f-ba0c295a4369">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/5cc74561-2994-4c4c-9de0-bba7a85c0aef">|<img width="100" src="https://github.com/shufo/timed-url-opener/assets/1641039/7ed63eb7-d79b-46ff-b287-df2666a79966">|

## Development

```bash
$ npm install
# or 
$ yarn install
```

```bash
$ npm run dev
# or
$ yarn run dev
```

then Load `build/chrome-mv3-dev` directory on Extension manage page by enabling developer mode.

## production build

```bash
$ npm run build
# or
$ yarn run build
```

It will outputs production build to `build/chrome-mv3-prod` directory.

## Contributing

1.  Fork it
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Add some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create new Pull Request

## LICENSE

MIT
