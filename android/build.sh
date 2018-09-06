fastlane unsigned

/usr/local/share/android-sdk/build-tools/27.0.3/zipalign -v -p 4 app/build/outputs/apk/release/app-release-unsigned.apk app/build/outputs/apk/release/app-release-unsigned-aligned.apk
/usr/local/share/android-sdk/build-tools/27.0.3/apksigner sign --ks signing/beep.keystore --out app/build/outputs/apk/release/app-release-signed.apk app/build/outputs/apk/release/app-release-unsigned-aligned.apk
