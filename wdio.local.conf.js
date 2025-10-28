import { config as sharedConfig } from './wdio.shared.conf.js';
export const config = {
    ...sharedConfig,
    ...{
        capabilities: [{
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['headless', 'disable-gpu']
                }
            }]
    }
};
