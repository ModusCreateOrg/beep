package com.xmartlabs.cordova.market;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.ComponentName;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

/**
 * Interact with Google Play.
 *
 * @author Miguel Revetria <miguel@xmartlabs.com>
 * @license Apache 2.0
 */
public class Market extends CordovaPlugin
{
    /**
     * Executes the request and returns PluginResult.
     *
     * @param action
     *          Action to perform.
     * @param args
     *          Arguments to the action.
     * @param callbackId
     *          JavaScript callback ID.
     * @return A PluginResult object with a status and message.
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            if (action.equals("open")) {
                if (args.length() == 1) {
                    String appId = args.getString(0);
                    this.openGooglePlay(appId);

                    callbackContext.success();
                    return true;
                }
            }else if (action.equals("search")) {
                if (args.length() == 1) {
                    String key = args.getString(0);
                    this.searchGooglePlay(key);

                    callbackContext.success();
                    return true;
                }
            }
        } catch (JSONException e) {
            Log.d("CordovaLog","Plugin Market: cannot parse args.");
            e.printStackTrace();
        } catch (android.content.ActivityNotFoundException e) {
            Log.d("CordovaLog","Plugin Market: cannot open Google Play activity.");
            e.printStackTrace();
        }

        return false;
    }

    /**
     * Open the appId details on Google Play .
     *
     * @param appId
     *            Application Id on Google Play.
     *            E.g.: com.google.earth
     */
    private void openGooglePlay(String appId) throws android.content.ActivityNotFoundException {
        Context context = this.cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + appId));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    /**
     * search the details on Google Play .
     *
     * @param searchKeyword
     *            Application Id on Google Play.
     *            E.g.: earth
     */
    private void searchGooglePlay(String key) throws android.content.ActivityNotFoundException {
        Context context = this.cordova.getActivity().getApplicationContext();
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://search?q=" + key));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
}
