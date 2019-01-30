//
//  CDVMarket.h
//
// Created by Miguel Revetria miguel@xmartlabs.com on 2014-03-17.
// License Apache 2.0

#include "CDVMarket.h"

@implementation CDVMarket

- (void)pluginInitialize
{
}

- (void)open:(CDVInvokedUrlCommand *)command
{
    [self.commandDelegate runInBackground:^{
        NSArray *args = command.arguments;
        NSString *appId = [args objectAtIndex:0];
        
        CDVPluginResult *pluginResult;
        if (appId) {
            NSString *url = [NSString stringWithFormat:@"itms-apps://itunes.apple.com/app/%@", appId];
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid application id: null was found"];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end
