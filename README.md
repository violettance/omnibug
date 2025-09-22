Omnibug (Fork with Dataroid Support)
=====================================

This is a fork of the original [Omnibug](https://github.com/MisterPhilip/omnibug) project with added support for **Dataroid Analytics** tracking.

## What's New in This Fork

- ✅ **Dataroid Analytics Provider**: Full support for `api.dataroid.com` tracking requests
- ✅ **Enhanced Event Parsing**: Human-friendly field labels for Dataroid events
- ✅ **Session Data Support**: Complete session tracking and analysis
- ✅ **Custom Attributes**: Intelligent mapping of Dataroid-specific attributes

## About Omnibug

Ensuring the seamless performance of your MarTech tools should be a breeze, yet the reality is often quite the opposite. Many vendors fall short in providing user-friendly solutions, leaving businesses grappling with technical complexities, poor documentation, and a plethora of outdated browser extensions. Enter Omnibug – your simplified quality assurance partner, designed to effortlessly streamline the process and put the power back in your hands.

For further details, see the [main project page](https://omnibug.io/).

## Dataroid Integration

This fork specifically adds support for Dataroid analytics, allowing you to:

- **Track Dataroid Events**: Monitor all `api.dataroid.com/collector/collect/event` requests
- **Parse Event Data**: View event names, IDs, customer IDs, and custom attributes
- **Session Analysis**: Track session IDs, start times, and duration
- **Human-Readable Labels**: All Dataroid fields are displayed with friendly names

### Dataroid Provider Features

- **URL Pattern**: `api.dataroid.com.*/collector/collect/event`
- **Provider Type**: Analytics
- **Data Groups**: General, Event Data, Session Data, Attributes
- **Event Parsing**: eventName, eventId, customerId
- **Session Data**: sessionId, startDateTime
- **Custom Attributes**: Page URL, Client Creation Date, and more

## Get it
[Chrome](https://chrome.google.com/webstore/detail/omnibug/bknpehncffejahipecakbfkomebjmokl?utm_source=githubo&utm_medium=readme&utm_campaign=omnibug.io-2020), 
[Edge](https://microsoftedge.microsoft.com/addons/detail/omnibug/eideoafecdnkjfiomaaplogicinmmlee?utm_source=githubo&utm_medium=readme&utm_campaign=omnibug.io-2020), 
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/omnibug/?utm_source=githubo&utm_medium=readme&utm_campaign=omnibug.io-2020)

## Installation & Usage

### Building from Source

1. **Clone this fork**:
   ```bash
   git clone https://github.com/violettance/omnibug.git
   cd omnibug
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

4. **Load in browser**:
   - Chrome: Load `platform/chromium` folder as unpacked extension
   - Edge: Load `platform/edge` folder as unpacked extension
   - Firefox: Load `platform/firefox` folder as temporary add-on

### Using with Dataroid

1. Install the extension using the steps above
2. Open DevTools (F12) on any website using Dataroid
3. Navigate to the "Omnibug" tab
4. Look for requests to `api.dataroid.com/collector/collect/event`
5. Click on any Dataroid request to see parsed event data

## Contributing

This is a fork of the original [Omnibug project](https://github.com/MisterPhilip/omnibug). 

- **Original Project**: [MisterPhilip/omnibug](https://github.com/MisterPhilip/omnibug)
- **This Fork**: [violettance/omnibug](https://github.com/violettance/omnibug)

If you'd like to contribute to the main project, please visit the [original repository](https://github.com/MisterPhilip/omnibug) and follow their [contributing guidelines](https://github.com/MisterPhilip/omnibug/blob/master/CONTRIBUTING.md).

For issues specific to this fork (Dataroid support), please open an issue in this repository.
